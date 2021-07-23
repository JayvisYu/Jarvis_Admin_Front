<template>
	<el-form>
		<el-form-item label="Name">
			<el-input v-model.trim="user.name" />
		</el-form-item>
		<el-form-item label="Email">
			<el-input v-model.trim="user.email" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				@click="submit"
			>Update</el-button>
			<!-- Admin can see this -->
			<el-tag v-permission="['admin']">admin</el-tag>

			<!-- Editor can see this -->
			<el-tag v-permission="['editor']">editor</el-tag>
		</el-form-item>
	</el-form>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
	directives: { permission },
	props: {
		user: {
			type: Object,
			default: () => {
				return {
					name: '',
					email: ''
				}
			}
		}
	},
	methods: {
		submit () {
			this.$message({
				message: 'User information has been updated successfully',
				type: 'success',
				duration: 5 * 1000
			})
		}
	}
}
</script>
