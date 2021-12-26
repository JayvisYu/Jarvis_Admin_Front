<template>
	<div class="role-container">
		<el-card class="box-card">
			<div
				slot="header"
				class="clearfix"
			>
				<el-button
					style="float: left;"
					type="primary"
					@click="addRolesVisible = true"
				>创建用户</el-button>
			</div>
			<el-table
				:data="tableData"
				border
				style="width: 100%"
			>
				<el-table-column
					prop="username"
					label="用户名"
					width="160"
				>
				</el-table-column>
				<el-table-column
					prop="email"
					label="邮箱"
					width="250"
				>
				</el-table-column>
				<el-table-column
					prop="introduction"
					label="介绍"
				>
				</el-table-column>
				<el-table-column
					prop="roles"
					label="角色"
					width="180"
				>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="180"
				>
					<template slot-scope="scope">
						<el-button
							@click="editRolesData(scope.row)"
							type="primary"
							size="small"
						>编辑权限</el-button>
						<el-button
							@click="delRolesData(scope.row)"
							type="danger"
							size="small"
						>删除</el-button>
					</template>
				</el-table-column>
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
		</el-card>
		<el-dialog
			title="添加用户"
			:visible.sync="addRolesVisible"
			v-el-drag-dialog
			width="30%"
			center
			:close-on-click-modal="false"
			@dragDialog="handleDrag"
		>
			<el-form
				:model="addRolesForm"
				:rules="addRolesFormRules"
				ref="addRolesForm"
				label-width="120px"
			>
				<el-form-item
					label="用户名"
					prop="username"
				>
					<el-input
						v-model="addRolesForm.username"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="密码"
					prop="password"
				>
					<el-input
						type="password"
						v-model="addRolesForm.password"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="邮箱"
					prop="email"
				>
					<el-input
						v-model="addRolesForm.email"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="角色"
					prop="roles"
				>
					<el-select
						v-model="addRolesForm.roles"
						clearable
						placeholder="请选择"
						style="width: 300px"
					>
						<el-option
							v-for="item in rolesOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="介绍"
					prop="introduction"
				>
					<el-input
						type="textarea"
						v-model="addRolesForm.introduction"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="头像"
					prop="avatar"
				>
					<el-input
						v-model="addRolesForm.avatar"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitAddForm('addRolesForm')"
					>立即创建</el-button>
					<el-button @click="resetAddForm('addRolesForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
			title="修改用户"
			:visible.sync="editRolesVisible"
			v-el-drag-dialog
			width="30%"
			center
			:close-on-click-modal="false"
			@dragDialog="handleDrag"
		>
			<el-form
				:model="editRolesForm"
				:rules="editRolesFormRules"
				ref="editRolesForm"
				label-width="120px"
			>
				<el-form-item
					label="用户名"
					prop="username"
				>
					<el-input
						v-model="editRolesForm.username"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="密码"
					prop="password"
				>
					<el-input
						type="password"
						v-model="editRolesForm.password"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="邮箱"
					prop="email"
				>
					<el-input
						v-model="editRolesForm.email"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="角色"
					prop="roles"
				>
					<el-select
						v-model="editRolesForm.roles"
						clearable
						placeholder="请选择"
						style="width: 300px"
					>
						<el-option
							v-for="item in rolesOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="介绍"
					prop="introduction"
				>
					<el-input
						type="textarea"
						v-model="editRolesForm.introduction"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="头像"
					prop="avatar"
				>
					<el-input
						v-model="editRolesForm.avatar"
						style="width: 300px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitEditForm('editRolesForm')"
					>提交修改</el-button>
					<el-button @click="resetEditForm('editRolesForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Axios } from '@/api/axios'
import { Notification } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { validUsername, validEmail } from '@/utils/validate'
import { deepClone } from '@/utils'

export default {
	name: 'DigitalCurrency',
	directives: { elDragDialog },
	data () {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error('请输入正确的用户名'))
			} else {
				callback()
			}
		}
		const validatePassword = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请输入密码'))
			}
			else if (value.length < 6) {
				callback(new Error('请输入正确的密码'))
			} else {
				callback()
			}
		}
		const validateEmail = (rule, value, callback) => {
			if (!validEmail(value)) {
				callback(new Error('请输入正确的邮箱'))
			} else {
				callback()
			}
		}
		return {
			'message': '角色管理',
			tableData: [],
			page: 1,
			limit: 5,
			total: 0,
			addRolesVisible: false,
			addRolesForm: {
				username: '',
				password: '',
				email: '',
				roles: '',
				introduction: '',
				avatar: ''
			},
			addRolesFormRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }],
				email: [
					{ required: true, trigger: 'blur', validator: validateEmail }
				],
				roles: [
					{ required: true, message: '请选择角色', trigger: 'change' }
				]
			},
			rolesOptions: [{ label: '游客', value: 'visitor' },
			{ label: '初级用户', value: 'editor' }, { label: '管理员', value: 'admin' }, { label: '超级管理员', value: 'super_admin' }],
			editRolesVisible: false,
			editRolesForm: {},
			editRolesFormRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }],
				email: [
					{ required: true, trigger: 'blur', validator: validateEmail }
				],
				roles: [
					{ required: true, message: '请选择角色', trigger: 'change' }
				]
			},
		}
	},
	components: {

	},
	computed: {
		...mapGetters([
			'roles'
		])
	},
	watch: {
		'$route': "getList"
	},
	created () {
		this.getTableData()
	},
	methods: {
		async getTableData () {
			await Axios({
				url: '/user/fetch_roles_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					// Notification.success({
					// 	title: '成功',
					// 	message: '获取用户列表成功!'
					// })
					this.tableData = res.data.user_table;
					this.total = res.data.total
				} else {
					Notification.error({
						title: '错误',
						message: '获取用户列表失败!'
					})
				}
			}).catch(err => {
				console.log(err);
			})
		},
		async handleSizeChange (val) {
			this.limit = val
			await Axios({
				url: '/user/fetch_roles_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					// Notification.success({
					// 	title: '成功',
					// 	message: '获取用户列表成功!'
					// })
					this.tableData = res.data.user_table;
					this.total = res.data.total
				} else {
					Notification.error({
						title: '错误',
						message: '获取用户列表失败!'
					})
				}
			}).catch(err => {
				console.log(err);
			})
		},
		async handleCurrentChange (val) {
			this.page = val
			await Axios({
				url: '/user/fetch_roles_list',
				method: 'get',
				params: { limit: this.limit, page: this.page }
			}).then(res => {
				console.log(res);
				if (res.code === 200) {
					// Notification.success({
					// 	title: '成功',
					// 	message: '获取用户列表成功!'
					// })
					this.tableData = res.data.user_table;
					this.total = res.data.total
				} else {
					Notification.error({
						title: '错误',
						message: '获取用户列表失败!'
					})
				}
			}).catch(err => {
				console.log(err);
			})
		},
		handleDrag () {
			this.$refs.select.blur()
		},
		submitAddForm (formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					await Axios({ url: '/user/add_user_data', method: 'post', data: JSON.stringify(this.addRolesForm) }).then(res => {
						console.log(res)
						this.addRolesVisible = false
						if (res.code === 200) {
							Notification.success({
								title: '成功',
								message: '添加用户成功!'
							})
							this.resetAddForm(formName)
							this.getTableData()
						} else {
							Notification.error({
								title: '失败',
								message: '添加用户失败!'
							})
						}
					})
				} else {
					Notification.error({
						title: '错误',
						message: '请填写必要的表单!'
					})
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetAddForm (formName) { this.$refs[formName].resetFields(); },
		editRolesData (val) {
			this.editRolesForm = deepClone(val)
			this.editRolesVisible = true
		},
		submitEditForm (formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					console.log(this.editRolesForm);
					await Axios({ url: '/user/edit_user_data', method: 'post', data: JSON.stringify(this.editRolesForm) }).then(res => {
						console.log(res)
						this.editRolesVisible = false
						if (res.code === 200) {
							Notification.success({
								title: '成功',
								message: '修改用户成功!'
							})
							this.resetEditForm(formName)
							this.getTableData()
						} else {
							Notification.error({
								title: '失败',
								message: '修改用户失败!'
							})
						}
					})
				} else {
					Notification.error({
						title: '错误',
						message: '请填写必要的表单!'
					})
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetEditForm (formName) { this.$refs[formName].resetFields(); },
		async delRolesData (val) {
			console.log(val);
			await Axios({ url: '/user/delete_user_data', method: 'get', params: { 'uuid': val.uuid } }).then(res => {
				console.log(res);
				if (res.code === 200) {
					Notification.success({
						title: '成功',
						message: '删除用户成功!'
					})
					this.getTableData()
				} else {
					Notification.error({
						title: '失败',
						message: '删除用户失败!'
					})
					this.getTableData()
				}
			}).catch(err => {
				console.log(err);
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.el-dialog {
	.el-form {
		margin: 0 auto;
	}
}

.el-pagination {
	text-align: center;
	margin-top: 15px;
}
</style>
