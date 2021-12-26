<template>
	<div class="app-container">
		<el-table
			v-loading="listLoading"
			:data="list"
			border
			fit
			highlight-current-row
			style="width: 100%"
		>
			<el-table-column
				align="center"
				label="ID"
				width="120"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column
				min-width="200px"
				label="Title"
				align="center"
			>
				<!-- <template slot-scope="{row}">
					<router-link
						:to="'/article/edit/'+row.id"
						class="link-type"
					>
						<span>{{ row.title }}</span>
					</router-link>
				</template> -->
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column
				width="160px"
				align="center"
				label="Author"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.author }}</span>
				</template>
			</el-table-column>
			<el-table-column
				width="150"
				align="center"
				label="Importance"
			>
				<template slot-scope="scope">
					<svg-icon
						v-for="n in + scope.row.importance"
						:key="n"
						icon-class="star"
						class="meta-item__icon"
					/>
				</template>
			</el-table-column>
			<el-table-column
				class-name="status-col"
				label="Status"
				width="100"
				align="center"
			>
				<template slot-scope="{row}">
					<el-tag :type="row.status | statusFilter">
						{{ row.status }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				width="200"
				align="center"
				label="Date"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.timestamp.replace('T', ' ') }}</span>
				</template>
			</el-table-column>
			<template>
				<el-table-column
					align="center"
					label="Actions"
					width="200"
				>
					<template slot-scope="scope">
						<el-row>
							<el-col
								:span="12"
								:offset="0"
							>
								<el-button
									type="primary"
									size="mini"
									icon="el-icon-edit"
									@click="getDetailData(scope.row)"
								>
									编辑
								</el-button>
							</el-col>
							<el-col
								:span="12"
								:offset="0"
							>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-delete"
									@click="deleteData(scope.row.uuid)"
								>
									删除
								</el-button>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
			</template>
		</el-table>

		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="limit"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>

		<!-- 文章详情 -->
		<el-dialog
			title="文章详情"
			:visible.sync="detailArticleVisible"
			:close-on-click-modal='false'
			:showClose="false"
			width="85%"
		>
			<el-form
				ref="detailForm"
				:model="detailForm"
				class="form-container"
			>

				<div class="createPost-main-container">
					<el-row>
						<el-col :span="24">
							<el-form-item
								style="margin-bottom: 40px;"
								prop="title"
							>
								<MDinput
									v-model="detailForm.title"
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
											label-width="80px"
											label="Author:"
											class="postInfo-container-item"
										>
											<el-input
												v-model="detailForm.author"
												placeholder="Search user"
												width="300px"
											>
											</el-input>
										</el-form-item>
									</el-col>

									<el-col :span="10">
										<el-form-item
											label-width="120px"
											label="Publish Time:"
											class="postInfo-container-item"
										>
											<el-date-picker
												v-model="detailForm.timestamp"
												type="datetime"
												value-format="yyyy-MM-dd HH:mm:ss"
												placeholder="Select date and time"
											/>
										</el-form-item>
									</el-col>

									<el-col :span="6">
										<el-form-item
											label-width="100px"
											label="Importance:"
											class="postInfo-container-item"
										>
											<el-rate
												v-model="detailForm.importance"
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
						label-width="80px"
						label="Summary:"
					>
						<el-input
							v-model="detailForm.content_short"
							:rows="1"
							type="textarea"
							class="article-textarea"
							autosize
							placeholder="Please enter the content"
						/>
					</el-form-item>

					<el-form-item
						prop="content"
						style="margin-bottom: 30px;"
					>
						<Tinymce
							ref="editor"
							v-model="detailForm.content"
							:height="400"
						/>
					</el-form-item>
				</div>
			</el-form>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					@click="submitDetailForm"
					type="primary"
				>提 交</el-button>
				<el-button @click="detailArticleVisible = false">返 回</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { Notification } from 'element-ui'
import { Axios } from '@/api/axios'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件

export default {
	directives: { permission },
	name: 'ArticleList',
	components: { Tinymce, MDinput, Upload, Sticky, Pagination },
	filters: {
		statusFilter (status) {
			const statusMap = {
				published: 'success',
				draft: 'info',
				deleted: 'danger'
			}
			return statusMap[status]
		}
	},
	data () {
		return {
			list: null,
			total: 0,
			listLoading: true,
			page: 1,
			limit: 10,
			detailArticleVisible: false,
			detailForm: {},
		}
	},
	computed: {
		contentShortLength () {
			return this.detailForm.content_short.length
		},
	},
	watch: {
		'$route': "getList"
	},
	created () {
		this.getList();
	},
	mounted () {

	},
	methods: {
		checkPermission,
		getList () {
			this.listLoading = true
			Axios({
				url: '/article/get_article_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.list = res.data.article_list
					this.total = res.data.total
					this.listLoading = false
				} else {
					Notification.error({
						title: '失败',
						message: '获取文章列表失败!'
					})
					this.listLoading = false
				}
			}).catch(err => {
				console.log(err);
			})
		},
		handleSizeChange (val) {
			this.limit = val
			this.listLoading = true
			Axios({
				url: '/article/get_article_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.list = res.data.article_list
					this.total = res.data.total
					this.listLoading = false
				} else {
					Notification.error({
						title: '失败',
						message: '获取文章列表失败!'
					})
					this.listLoading = false
				}
			}).catch(err => {
				console.log(err);
			})
		},
		handleCurrentChange (val) {
			this.page = val
			this.listLoading = true
			Axios({
				url: '/article/get_article_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.list = res.data.article_list
					this.total = res.data.total
					this.listLoading = false
				} else {
					Notification.error({
						title: '失败',
						message: '获取文章列表失败!'
					})
					this.listLoading = false
				}
			}).catch(err => {
				console.log(err);
			})
		},
		getDetailData (val) {
			console.log(val)
			this.detailForm = val
			this.detailArticleVisible = true
		},
		deleteData (val) {
			const uuid = val
			console.log(uuid);
			Axios({
				url: '/article/delete_article_data',
				method: 'get',
				params: { uuid }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '删除文章成功!'
					})
				} else {
					Notification.error({
						title: '失败',
						message: '删除文章失败!'
					})
				}
				this.getList()
			}).catch(err => {
				console.log(err);
			})
		},
		submitDetailForm () {
			console.log(this.detailForm);
			if (this.detailForm.content.length === 0 || this.detailForm.title.length === 0) {
				this.$message({
					message: '请填写必要的标题和内容',
					type: 'warning'
				})
				return
			}
			console.log(typeof (this.detailForm.timestamp));
			Axios({
				url: '/article/edit_article_data',
				method: 'post',
				data: JSON.stringify(this.detailForm)
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '文章修改成功!'
					})
					this.detailArticleVisible = false
				} else {
					Notification.error({
						title: '失败',
						message: '文章修改失败!'
					})
					this.detailArticleVisible = false
				}

				this.getList();
			}).catch(err => {
				console.log(err);
			})
		}
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

.edit-input {
	padding-right: 100px;
}

.cancel-btn {
	position: absolute;
	right: 15px;
	top: 10px;
}

.el-form {
	.el-input {
		width: 350px;
	}
}

.el-pagination {
	text-align: center;
	margin-top: 15px;
}
</style>
