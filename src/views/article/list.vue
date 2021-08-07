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
				width="80"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>

			<el-table-column
				width="180px"
				align="center"
				label="Date"
			>
				<template slot-scope="scope">
					<!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
					<span>{{ scope.row.timestamp }}</span>
				</template>
			</el-table-column>

			<el-table-column
				width="120px"
				align="center"
				label="Author"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.author }}</span>
				</template>
			</el-table-column>

			<el-table-column
				width="100px"
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
				width="110"
			>
				<template slot-scope="{row}">
					<el-tag :type="row.status | statusFilter">
						{{ row.status }}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				min-width="300px"
				label="Title"
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
						<el-row>
							<el-col
								:span="8"
								:offset="0"
							>
								<el-button
									type="primary"
									size="mini"
									icon="el-icon-document"
									v-permission="['editor', 'admin']"
                  @click="getDetailData(scope.row)"
								>
									查看
								</el-button>
							</el-col>
							<el-col
								:span="8"
								:offset="0"
							>
								<el-button
									type="warning"
									size="mini"
									icon="el-icon-edit"
									v-permission="['admin']"
                  @click="editData(scope.row)"
								>
									修改
								</el-button>
							</el-col>
							<el-col
								:span="8"
								:offset="0"
							>
								<el-button
									type="danger"
									size="mini"
									icon="el-icon-delete"
									v-permission="['admin']"
                  @click="deleteData(scope.row.id)"
								>
									删除
								</el-button>
							</el-col>
						</el-row>
           <!-- <router-link :to="'/article/edit/'+scope.row.id"></router-link> -->
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
	</div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { Axios } from '@/api/axios'

export default {
	directives: { permission },
	name: 'ArticleList',
	components: { Pagination },
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
			}
		}
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
				if (res.data.msg === 'success') {
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
		}
	}
}
</script>

<style scoped>
.edit-input {
	padding-right: 100px;
}
.cancel-btn {
	position: absolute;
	right: 15px;
	top: 10px;
}
</style>
