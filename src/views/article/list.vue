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
				width="300"
				align="center"
				label="Date"
			>
				<template slot-scope="scope">
					<!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
					<span>{{ scope.row.timestamp }}</span>
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
						v-for="n in +scope.row.importance"
						:key="n"
						icon-class="star"
						class="meta-item__icon"
					/>
				</template>
			</el-table-column>

			<el-table-column
				class-name="status-col"
				label="Status"
				width="140"
				align="center"
			>
				<template slot-scope="{row}">
					<el-tag :type="row.status | statusFilter">
						{{ row.status }}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				min-width="350px"
				label="Title"
				align="center"
			>
				<template slot-scope="{row}">
					<router-link
						:to="'/article/edit/'+row.id"
						class="link-type"
					>
						<span>{{ row.title }}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				label="Actions"
				width="300"
			>
				<template slot-scope="scope">
					<el-row v-permission="['admin']">
						<el-col
							:span="8"
							:offset="0"
						>
							<el-button
								type="primary"
								size="mini"
								icon="el-icon-document"
								@click="getDetailData(scope.row)"
							>
								查看
							</el-button>
						</el-col>
						<el-col
							:span="8"
							:offset="0"
						>
            <router-link :to="'/article/edit/'+ scope.row.id">
							<el-button
								type="warning"
								size="mini"
								icon="el-icon-edit"
							>
								修改
							</el-button>
            </router-link>
						</el-col>
						<el-col
							:span="8"
							:offset="0"
						>
							<el-button
								type="danger"
								size="mini"
								icon="el-icon-delete"
								@click="deleteData(scope.row.id)"
							>
								删除
							</el-button>
						</el-col>
					</el-row>
					<el-row v-permission="['editor']">
						<el-col
							:span="24"
							:offset="0"
						>
							<el-button
								type="primary"
								size="mini"
								icon="el-icon-document"
								@click="getDetailData(scope.row)"
							>
								查看
							</el-button>
						</el-col>
					</el-row>
				</template>
			</el-table-column>

		</el-table>

		<pagination
			v-show="total>0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			:page-sizes="[10, 20, 30, 50]"
			:page-size="20"
			@pagination="getList"
		/>

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
				<el-button @click="detailArticleVisible = false">返 回</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
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
			listQuery: {
				page: 1,
				limit: 20
			},
			detailArticleVisible: false,
			detailForm: {},
		}
	},
	computed: {
		contentShortLength () {
			return this.detailForm.content_short.length
		},
	},
	created () {
		this.getList()
	},
	methods: {
		getList () {
			this.listLoading = true
			Axios({
				url: '/get_article_list',
				method: 'post',
				data: this.listQuery
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.$message({
						message: '获取数据成功',
						type: 'success',
						showClose: true,
						duration: 1000
					})
					this.list = res.data.article_list
					this.total = res.data.total
					this.listLoading = false
				} else {
					this.$message({
						message: '获取数据失败',
						type: 'error',
						showClose: true,
						duration: 1000
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
		editData (val) {
			console.log(val);
		},
		deleteData (val) {
			const id = val
			Axios({
				url: '/delete_article_data',
				method: 'get',
				params: { id }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					this.$message({
						message: '删除文章成功',
						type: 'success',
						showClose: true,
						duration: 1000
					})
				} else {
					this.$message({
						message: '删除文章失败',
						type: 'error',
						showClose: true,
						duration: 1000
					})
				}
				this.getList()
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
</style>
