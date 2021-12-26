<template>
	<div class="body_content">
		<div
			class="ordinary"
			v-permission="['visitor', 'editor', 'admin', 'super_admin']"
		>
			<div class="ordinary_body">
				<div class="outside">
					<div class="back_img">
						<el-card
							class="box-card"
							id="little_value"
						>
							<span class="ordinary_degree"></span>
							<span>巧克力择时策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getChocolateTiming"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>依据市场运行规律</p>
								<p>出看多信号时买入</p>
								<p>出看空信号时卖出</p>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
		<div
			class="rare"
			v-permission="['editor', 'admin', 'super_admin']"
		>
			<div class="rare_body">
			</div>
		</div>
		<div
			class="epic"
			v-permission="['admin', 'super_admin']"
		>
			<div class="epic_body">
			</div>
		</div>
		<div
			class="legend"
			v-permission="['super_admin']"
		>
			<div class="legend_body">
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import permission from '@/directive/permission/index.js' // 权限判断指令


export default {
	directives: { permission },
	name: 'Stock',
	data () {
		return {
			'message': '择时选股',
		}
	},
	components: {

	},
	computed: {
		...mapGetters([
			'name'
		])
	},
	created () {

	},
	methods: {
		getChocolateTiming () {
			this.$router.push({ name: 'stock_timing', params: { EName: 'chocolate_timing', CName: '巧克力择时策略' } })
		},
	},
}
</script>

<style lang="scss" scoped>
.body_content {
	width: 100%;
	height: 100%;
}

.ordinary,
.rare,
.epic,
.legend {
	width: 100%;
	height: 270px;
	padding: 0;
	background-color: rgb(245, 247, 250);
	display: flex;
}

.ordinary_body {
	width: 98%;
	height: 240px;
	margin: 0 auto;
	margin-top: 15px;
	background-color: rgb(230, 233, 236);
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow-y: scroll;
}

#little_value {
	background-color: rgba(5, 23, 187, 0.2);
	background-repeat: no-repeat; //不重复
	background-size: 100% 100%; // 满
}

.rare_body {
	width: 98%;
	height: 240px;
	margin: 0 auto;
	margin-top: 15px;
	background-color: rgb(230, 233, 236);
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow-y: scroll;
}

.epic_body {
	width: 98%;
	margin: 0 auto;
	height: 240px;
	margin-top: 15px;
	background-color: rgb(230, 233, 236);
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow-y: scroll;
}

.legend_body {
	width: 99%;
	height: 240px;
	margin: 0 auto;
	margin-top: 15px;
	background-color: rgb(230, 233, 236);
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow-y: scroll;
}

.el-card {
	height: 200px;
	margin: 20px 20px;
}

.ordinary_degree {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-bottom: 4px solid rgb(189, 189, 189);
	position: relative;
	top: -10px;
	display: inline-block;
	margin-right: 5px;
}

.ordinary_degree:after {
	content: "";
	position: absolute;
	left: -10px;
	top: 4px;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top: 14px solid rgb(189, 189, 189);
}

.rare_degree {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-bottom: 4px solid rgb(78, 144, 242);
	position: relative;
	top: -10px;
	display: inline-block;
	margin-right: 5px;
}

.rare_degree:after {
	content: "";
	position: absolute;
	left: -10px;
	top: 4px;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top: 14px solid rgb(78, 144, 242);
}

.epic_degree {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-bottom: 4px solid rgb(153, 62, 194);
	position: relative;
	top: -10px;
	display: inline-block;
	margin-right: 5px;
}

.epic_degree:after {
	content: "";
	position: absolute;
	left: -10px;
	top: 4px;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top: 14px solid rgb(153, 62, 194);
}

.legend_degree {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-bottom: 4px solid rgb(241, 157, 59);
	position: relative;
	top: -10px;
	display: inline-block;
	margin-right: 5px;
}

.legend_degree:after {
	content: "";
	position: absolute;
	left: -10px;
	top: 4px;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top: 14px solid rgb(241, 157, 59);
}

.outside {
	width: 25%;
	height: 100%;
	// cursor: pointer;
	position: relative;
	/*卡片的父元素使用相对定位 perspective: 500;*/
	position: relative;
	perspective: 500;
	-webkit-perspective: 1000;
	display: inline-block;
}

.outside img {
	max-width: 220px;
}
</style>
