<template>
	<div class="createPost-container">
		<el-form
			ref="postForm"
			:model="postForm"
			:rules="rules"
			class="form-container"
		>

			<div class="createPost-main-container">
				<el-row>
					<!-- <Warning /> -->
					<el-col :span="24">
						<el-form-item
							style="margin-bottom: 40px;"
							prop="title"
						>
							<MDinput
								v-model="postForm.title"
								:maxlength="100"
								name="name"
								required
							>
								Title
							</MDinput>
						</el-form-item>

						<div class="postInfo-container">
							<el-row>
								<el-col :span="8">
									<el-form-item
										label-width="60px"
										label="Author:"
										class="postInfo-container-item"
									>
										<el-select
											v-model="postForm.author"
											:remote-method="getRemoteUserList"
											filterable
											default-first-option
											remote
											allow-create
											placeholder="Search user"
										>
											<el-option
												v-for="(item,index) in userListOptions"
												:key="item+index"
												:label="item"
												:value="item"
											/>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="10">
									<el-form-item
										label-width="120px"
										label="Publish Time:"
										class="postInfo-container-item"
									>
										<el-date-picker
											v-model="postForm.display_time"
											type="datetime"
											value-format="yyyy-MM-dd HH:mm:ss"
											placeholder="Select date and time"
										/>
									</el-form-item>
								</el-col>

								<el-col :span="6">
									<el-form-item
										label-width="90px"
										label="Importance:"
										class="postInfo-container-item"
									>
										<el-rate
											v-model="postForm.importance"
											:max="5"
											:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
											style="display:inline-block"
										/>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>

				<el-form-item
					style="margin-bottom: 40px;"
					label-width="70px"
					label="Summary:"
				>
					<el-input
						v-model="postForm.content_short"
						:rows="1"
						type="textarea"
						class="article-textarea"
						autosize
						placeholder="Please enter the content"
					/>
					<span
						v-show="contentShortLength"
						class="word-counter"
					>{{ contentShortLength }}words</span>
				</el-form-item>

				<el-form-item
					prop="content"
					style="margin-bottom: 30px;"
				>
					<Tinymce
						ref="editor"
						v-model="postForm.content"
						:height="400"
					/>
				</el-form-item>

				<!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item> -->
			</div>
		</el-form>
		<sticky
			:z-index="10"
			:class-name="'sub-navbar '+ postForm.status"
			style="margin-left:45px"
		>
			<!-- <CommentDropdown v-model="postForm.comment_disabled" />
						<PlatformDropdown v-model="postForm.platforms" />
						<SourceUrlDropdown v-model="postForm.source_uri" /> -->
			<template v-if="this.isEdit === false">
				<el-button
					v-loading="loading"
					type="warning"
					@click="draftForm"
				>
					设为草稿
				</el-button>
				<el-button
					v-loading="loading"
					style="margin-left: 10px;"
					type="success"
					@click="submitForm"
				>
					直接发表
				</el-button>
			</template>
			<template v-else>
				<el-button
					v-loading="loading"
					type="primary"
					@click="submitEditForm"
				>
					提交修改
				</el-button>
			</template>

		</sticky>
	</div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { Notification } from 'element-ui'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { Axios } from '@/api/axios'
import { debounce } from '@/utils/debounce'


const defaultForm = {
	status: 'draft',
	title: '', // 文章题目
	content: '', // 文章内容
	content_short: '', // 文章摘要
	// source_uri: '', // 文章外链
	// image_uri: '', // 文章图片
	display_time: undefined, // 前台展示时间
	id: undefined,
	uuid: undefined,
	// platforms: ['a-platform'],
	// comment_disabled: false,
	importance: 0
}

export default {
	name: 'ArticleDetail',
	components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
	props: {
		isEdit: {
			type: Boolean,
			default: false
		}
	},
	data () {
		const validateRequire = (rule, value, callback) => {
			if (value === '') {
				this.$message({
					message: rule.field + '为必传项',
					type: 'error'
				})
				callback(new Error(rule.field + '为必传项'))
			} else {
				callback()
			}
		}
		const validateSourceUri = (rule, value, callback) => {
			if (value) {
				if (validURL(value)) {
					callback()
				} else {
					this.$message({
						message: '外链url填写不正确',
						type: 'error'
					})
					callback(new Error('外链url填写不正确'))
				}
			} else {
				callback()
			}
		}
		return {
			postForm: Object.assign({}, defaultForm),
			loading: false,
			userListOptions: [],
			rules: {
				image_uri: [{ validator: validateRequire }],
				title: [{ validator: validateRequire }],
				content: [{ validator: validateRequire }],
				source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
			},
			tempRoute: {}
		}
	},
	computed: {
		contentShortLength () {
			return this.postForm.content_short.length
		},
		displayTime: {
			// set and get is useful when the data
			// returned by the back end api is different from the front end
			// back end return => "2013-06-25 06:59:25"
			// front end need timestamp => 1372114765000
			get () {
				return (+new Date(this.postForm.display_time))
			},
			set (val) {
				this.postForm.display_time = new Date(val)
			}
		}
	},
	created () {
		if (this.isEdit) {
			const uuid = this.$route.params && this.$route.params.uuid
			console.log(uuid)
			this.fetchEditData(uuid)
		}
		this.tempRoute = Object.assign({}, this.$route)
	},
	methods: {
		fetchData (uuid) {
			fetchArticle(uuid).then(response => {
				this.postForm = response.data

				// just for test
				this.postForm.title += `   Article Id:${this.postForm.uuid}`
				this.postForm.content_short += `   Article Id:${this.postForm.uuid}`

				// set tagsview title
				this.setTagsViewTitle()

				// set page title
				this.setPageTitle()
			}).catch(err => {
				console.log(err)
			})
		},
		// 获取修改文章信息
		fetchEditData (uuid) {
			Axios({
				url: '/article/get_detail_data',
				method: 'get',
				params: { uuid }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.postForm = res.data.result_dict
					// just for test
					this.postForm.title = res.data.result_dict.title
					this.postForm.content_short = res.data.result_dict.content_short
					this.postForm.display_time = res.data.result_dict.timestamp
					// set tagsview title
					this.setTagsViewTitle()
					// set page title
					this.setPageTitle()
				} else {

				}
			}).catch(err => {
				console.log(err);
			})
		},
		setTagsViewTitle () {
			const title = 'Edit Article'
			const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.uuid}` })
			this.$store.dispatch('tagsView/updateVisitedView', route)
		},
		setPageTitle () {
			const title = 'Edit Article'
			document.title = `${title} - ${this.postForm.uuid}`
		},
		// 提交文章
		submitForm2 () {
			if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
				this.$message({
					message: '请填写必要的标题和内容',
					type: 'warning'
				})
				return
			}
			this.postForm.status = 'published'
			Axios({
				url: '/article/post_article_form',
				method: 'post',
				data: this.postForm
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '文章提交成功!'
					})
				} else {
					Notification.error({
						title: '失败',
						message: '文章提交失败!'
					})
				}
				this.postForm = Object.assign({}, defaultForm)
				this.$refs.editor.setContent("");
			}).catch(err => {
				console.log(err);
			})
		},
		draftForm () {
			if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
				this.$message({
					message: '请填写必要的标题和内容',
					type: 'warning'
				})
				return
			}
			this.postForm.status = 'draft'
			Axios({
				url: '/article/post_article_form',
				method: 'post',
				data: this.postForm
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '文章提交成功!'
					})
				} else {
					Notification.error({
						title: '失败',
						message: '文章提交失败!'
					})
				}
				this.postForm = Object.assign({}, defaultForm)
				this.$refs.editor.setContent("");
			}).catch(err => {
				console.log(err);
			})

		},
		getRemoteUserList (query) {
			searchUser(query).then(response => {
				if (!response.data.items) return
				this.userListOptions = response.data.items.map(v => v.name)
			})
		},
		submitForm: debounce(function () {
			if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
				// this.$message({
				// 	message: '请填写必要的标题和内容',
				// 	type: 'warning'
				// })
				Notification.warning({
					title: '失败',
					message: '请填写必要的标题和内容!'
				})
				return
			}
			this.postForm.status = 'published'
			Axios({
				url: '/article/post_article_form',
				method: 'post',
				data: this.postForm
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '文章提交成功!'
					})
				} else {
					Notification.error({
						title: '失败',
						message: '文章提交失败!'
					})
				}
				this.postForm = Object.assign({}, defaultForm)
				this.$refs.editor.setContent("");
			}).catch(err => {
				console.log(err);
			})
		}, 2000)
	}
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
	position: relative;

	.createPost-main-container {
		padding: 40px 45px 20px 50px;

		.postInfo-container {
			position: relative;
			@include clearfix;
			margin-bottom: 10px;

			.postInfo-container-item {
				float: left;
			}
		}
	}

	.word-counter {
		width: 40px;
		position: absolute;
		right: 10px;
		top: 0px;
	}
}

.article-textarea ::v-deep {
	textarea {
		padding-right: 40px;
		resize: none;
		border: none;
		border-radius: 0px;
		border-bottom: 1px solid #bfcbd9;
	}
}
</style>
