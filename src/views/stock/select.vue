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
							<span>小市值策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getSmallMarket"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>筛选出市值最小的几只股票</p>
								<p>每周期开始开盘买入</p>
								<p>每周期结束收盘卖出</p>
							</div>
						</el-card>
					</div>
				</div>
				<div class="outside">
					<div class="back_img">
						<el-card
							class="box-card"
							id="little_value"
						>
							<span class="ordinary_degree"></span>
							<span>反转策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getReverseStrategy"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>筛选出市值最小的几只股票</p>
								<p>每周期开始开盘买入</p>
								<p>每周期结束收盘卖出</p>
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
				<div class="outside">
					<div class="back_img">
						<el-card
							class="box-card"
							id="little_value"
						>
							<span class="rare_degree"></span>
							<span>小市值策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getSmallMarket"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>筛选出市值最小的几只股票</p>
								<p>每周期开始开盘买入</p>
								<p>每周期结束收盘卖出</p>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
		<div
			class="epic"
			v-permission="['admin', 'super_admin']"
		>
			<div class="epic_body">
				<div class="outside">
					<div class="back_img">
						<el-card
							class="box-card"
							id="little_value"
						>
							<span class="epic_degree"></span>
							<span>小市值策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getSmallMarket"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>筛选出市值最小的几只股票</p>
								<p>每周期开始开盘买入</p>
								<p>每周期结束收盘卖出</p>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
		<div
			class="legend"
			v-permission="['super_admin']"
		>
			<div class="legend_body">
				<div class="outside">
					<div class="back_img">
						<el-card
							class="box-card"
							id="little_value"
						>
							<span class="legend_degree"></span>
							<span>小市值策略</span>
							<el-button
								style="float: right; padding: 3px 0"
								type="text"
								@click="getSmallMarket"
							>
								查看详情
							</el-button>
							<el-divider>
							</el-divider>
							<div>
								<p>筛选出市值最小的几只股票</p>
								<p>每周期开始开盘买入</p>
								<p>每周期结束收盘卖出</p>
							</div>
						</el-card>
					</div>
				</div>
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
			'message': '选股',
			Small_Market_Value_Strategy: '',
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
		getSmallMarket () {
			this.$router.push({ name: 'select_stock', params: { EName: 'small_market_value', CName: '小市值策略' } })
		},
		getReverseStrategy () {
			this.$router.push({ name: 'select_stock', params: { EName: 'reverse_strategy', CName: '反转策略' } })
		}
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
	background-color: rgba(7, 175, 97, 0.2);
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
