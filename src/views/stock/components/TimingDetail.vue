<template>
	<div class="main_body">
		<div class="head_content">
			<div class="title">
				<span>{{tactic_name['CName']}}</span>
				<div class="subtitle">
					<span>
						跌宕起伏的金融市场, 惊险刺激的资本冒险; <br>
						探索挑选股票的技术, 研究战胜贝塔的策略; <br>
						资本无眠夜, 究学无止境; <br>
						投资是一种艺术, 也是一种生活态度!
					</span>
				</div>
			</div>
			<div class="right_card">
				<el-card class="box-card">
					<span class="right_card_topic_font">2021年至今收益</span>
					<p class="right_card_profit_font">
						<!--<span>[{year_profit_dict['tactic_year_profit'].slice(-1)[0]}]%</span>-->
						<!-- <span
							style="font-size:40px;font-weight: 500;"
							v-bind:class="{'RedStyle': now_year_profit >= 0,
                                           'GreenStyle': now_year_profit < 0}"
						>1111%</span> -->
					</p>
					<!-- <el-row>
						<el-col :span="8">
							<p>年化收益</p>
							<p>{{comments_dict['annualized_yield']}}</p>
						</el-col>
						<el-col :span="8">
							<p>最近交易日</p>
							<p>{{recently_profit}}%</p>
						</el-col>
						<el-col :span="8">
							<p>当前周期</p>
							<p>{{recently_circle_profit}}%</p>
						</el-col>
					</el-row> -->
				</el-card>
			</div>
		</div>
		<div class="body_content">
			<div class="perform_content">
				<div class="perform_content_left">
					<el-card class="box-card">
						<table
							class="risk_analysis_table"
							v-loading="risk_analysis_table_loading"
							border="1"
							cellspacing="0"
							cellpadding="4"
							style="margin-top:2px"
						>
							<caption>风险分析(2007年初至今)</caption>
							<tbody>
								<tr>
									<td>累计净值</td>
									<td>{{comments_dict['accumulated_net']}}</td>
								</tr>
								<tr>
									<td>年化收益率</td>
									<td>{{comments_dict['annualized_yield']}}</td>
								</tr>
								<tr>
									<td>最大回撤</td>
									<td>{{comments_dict['max_drawdown']}}</td>
								</tr>
								<tr>
									<td>年化收益回撤比</td>
									<td>{{comments_dict['annualized_yield_drawdown_ratio']}}</td>
								</tr>
								<tr>
									<td>最大回撤开始时间</td>
									<td>{{getForMateDate(comments_dict['drawdown_start_time'])}}</td>
								</tr>
								<tr>
									<td>最大回撤结束时间</td>
									<td>{{getForMateDate(comments_dict['drawdown_end_time'])}}</td>
								</tr>
								<tr>
									<td>每笔交易平均盈亏</td>
									<td>{{comments_dict['average_range']}}</td>
								</tr>
								<tr>
									<td>盈亏收益比</td>
									<td>{{comments_dict['profit_loss_ratio']}}</td>
								</tr>
								<tr>
									<td>盈利次数</td>
									<td>{{comments_dict['profit_times']}}</td>
								</tr>
								<tr>
									<td>亏损次数</td>
									<td>{{comments_dict['loss_times']}}</td>
								</tr>
								<tr>
									<td>胜率</td>
									<td>{{comments_dict['win_rate']}}</td>
								</tr>
								<tr>
									<td>最大连续盈利笔数</td>
									<td>{{comments_dict['max_continuous_rise_days']}}</td>
								</tr>
								<tr>
									<td>最大连续亏损笔数</td>
									<td>{{comments_dict['max_continuous_down_days']}}</td>
								</tr>
								<tr>
									<td>单笔最大盈利</td>
									<td>{{comments_dict['max_single_circle_rise_range']}}</td>
								</tr>
								<tr>
									<td>单笔最大亏损</td>
									<td>{{comments_dict['max_single_circle_down_range']}}</td>
								</tr>
								<tr>
									<td>单笔最长持有时间</td>
									<td>{{comments_dict['max_holding_duration']}}</td>
								</tr>
								<tr>
									<td>单笔最短持有时间</td>
									<td>{{comments_dict['min_holding_duration']}}</td>
								</tr>
								<tr>
									<td>平均持仓周期</td>
									<td>{{comments_dict['average_holding_duration']}}</td>
								</tr>
							</tbody>
						</table>
					</el-card>
				</div>
				<div class="perform_content_right">
					<el-card class="box-card">
						<div
							slot="header"
							class="clearfix"
						>
							<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;历史表现</span>
						</div>
						<div class="chart_subtitle">
							<p>初始资金1元，从07年起按照策略定期买卖最新结果的资金曲线</p>
							<!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
							<div
								id="equity_curve_chart"
								style="width: 100%;height: 430px;"
								v-loading="equity_curve_chart_loading"
							></div>
						</div>
					</el-card>
				</div>
			</div>
			<div class="select_content">
				<el-card class="box-card">
					<div
						slot="header"
						class="clearfix"
					>
						<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;历年收益</span>
					</div>
					<div>
						<!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
						<div
							id="year_profit_chart"
							style="width: 100%;height: 800px"
							v-loading="year_profit_chart_loading"
						></div>
					</div>
				</el-card>
			</div>
			<div
				class="kline_detail"
				id="k_line_chart"
				style="width: 100%;height: 850px"
				v-loading="kline_chart_loading"
			></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Axios } from '@/api/axios'
import { Notification } from 'element-ui'
import echarts from 'echarts'


export default {
	name: 'timingDetail',
	data () {
		return {
			tactic_name: {},
			risk_analysis_table_loading: false,
			equity_curve_chart_loading: false,
			year_profit_chart_loading: false,
			kline_chart_loading: false,
			comments_dict: {},
			comments_list: [],
			curve_dict: {},
			now_year_profit: '',
			year_profit_dict: {},
			myChart_1: null,
			myChart_2: null,
			myChart_3: null,
			k_line_dict: {},
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
		this.tactic_name = this.$route.params;
		console.log(this.tactic_name);
		console.log(this.$route.path);
		if (Object.keys(this.tactic_name).length === 0) {
			this.tactic_name['EName'] = this.$route.path.split('/')[-1]
			console.log('', this.tactic_name);
		}
		this.getAllData();
	},
	mounted () {
		this.paintingData();
	},
	methods: {
		getAllData () {
			this.getTableData();
			this.getCurveChartData();
			this.getYearProfitData();
			this.getKLineData();
			setTimeout(() => { this.paintingData(); }, 1000)

		},
		getTableData () {
			Axios({
				url: '/stock/get_timing_risk_analysis_data',
				method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
				}
			}).then(
				res => {
					this.comments_dict = res.data.comments_dict;
					this.comments_list = [];
					let max_drawdown_value = Number(parseFloat(this.comments_dict['max_drawdown']).toFixed(2)) + 100;
					this.comments_list.push(Number(max_drawdown_value.toFixed(2)));
					this.comments_list.push(parseFloat(this.comments_dict['win_rate']));
					this.comments_list.push(parseFloat(this.comments_dict['annualized_yield_drawdown_ratio']));
					this.comments_list.push(parseFloat(this.comments_dict['annualized_yield']));
					this.comments_list.push(parseFloat(this.comments_dict['sharp_ratio']));
				}
			).catch(err => {
				console.log(err)
			})
		},
		getCurveChartData () {
			Axios({
				url: '/stock/get_timing_curve_chart_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
				}
			}).then(
				res => {
					this.curve_dict = res.data.curve_dict;
					for (let i = 0; i < this.curve_dict['curve_date'].length; i++) {
						this.curve_dict['curve_date'][i] = this.getForMateDate(this.curve_dict['curve_date'][i]);
					}
				}
			).catch(err => {
				console.log(err)
			})
		},
		getYearProfitData () {
			Axios({
				url: '/stock/get_timing_year_profit_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
				}
			}).then(
				res => {
					this.year_profit_dict = res.data.year_profit_dict;
					this.now_year_profit = this.year_profit_dict['tactic_year_profit'].slice(-1)[0];
				}
			).catch(err => {
				console.log(err)
			})
		},
		getKLineData () {
			Axios({
				url: '/stock/get_timing_kline_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
				}
			}).then(
				res => {
					if (res.code === 200) {
						console.log(res);
						this.k_line_dict = res.data.k_line_dict;
					}
				}
			).catch(err => {
				console.log(err)
			})
		},
		getMarkData () {
			const mark_list = []
			const signal_list = this.k_line_dict.signal_list;
			console.log('signal_list', signal_list);
			for (let i = 0; i < signal_list.length; i++) {
				mark_list.push({
					coord: [signal_list[0], signal_list[1]],
					itemStyle: {
						color: signal_list[3],
					}
				})
			}
			return signal_list
		},
		calculateMA (dayCount, data) {
			console.log('data', data);
			var result = [];
			for (var i = 0, len = data.values.length; i < len; i++) {
				if (i < dayCount) {
					result.push('-');
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += +data.values[i - j][1];
				}
				result.push(sum / dayCount);
			}
			return result;
		},
		paintingData () {
			// 历史表现作图
			setTimeout(() => {
				if (this.myChart_1 != null && this.myChart_1 != "" && this.myChart_1 != undefined) {
					this.myChart_1.dispose();//销毁
				}

				this.myChart_1 = echarts.init(document.getElementById("equity_curve_chart"));

				// 4.准备数据和配置项
				var option = {
					title: {
						text: ''
					},
					tooltip: {},
					color: ['#ff4683', '#0984e3', '#a29bfe', '#CC8F33'],
					legend: {
						data: ['策略', '沪深300', '策略最大回撤', '沪深300最大回撤']
					},
					dataZoom: [
						{
							show: true,
							realtime: true,
							start: 65,
							end: 85
						},
						{
							type: 'inside',
							realtime: true,
							start: 65,
							end: 85
						}
					],
					grid: {
						left: '4%',
						right: '5%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: this.curve_dict['curve_date']
					}],
					yAxis: [{
						name: '资金量',
						type: 'value'
					},
					{
						name: '最大回撤',
						nameLocation: 'start',
						max: 0,
						type: 'value',
						inverse: true
					},
					],
					series: [{
						name: '策略',
						type: 'line',
						smooth: true,
						lineStyle: {
							normal: {
								color: "#ff4683",
								width: 2,
							}
						},
						icon: 'rect',
						data: this.curve_dict['tactic_curve']
					},
					{
						name: '沪深300',
						type: 'line',
						smooth: true,
						lineStyle: {
							normal: {
								color: "#0984e3",
								width: 2,
							}
						},
						data: this.curve_dict['index_curve']
					},
					{
						name: '策略最大回撤',
						type: 'line',
						yAxisIndex: 1,
						smooth: true,
						lineStyle: {
							normal: {
								color: "#a29bfe",
								width: 1,
							}
						},
						data: this.curve_dict['tactic_max_drawdown']
					},
					{
						name: '沪深300最大回撤',
						type: 'line',
						yAxisIndex: 1,
						smooth: true,
						lineStyle: {
							normal: {
								color: "#CC8F33",
								width: 1,
							}
						},
						data: this.curve_dict['index_max_drawdown']
					}
					]
				};

				// 5.展示数据
				this.myChart_1.setOption(option);

			}, 1000);

			// 历年收益作图
			setTimeout(() => {
				if (this.myChart_2 != null && this.myChart_2 != "" && this.myChart_2 != undefined) {
					this.myChart_2.dispose();//销毁
				}
				this.myChart_2 = echarts.init(document.getElementById('year_profit_chart'));

				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					color: ['#90a8f8', '#fbe792'],
					legend: {
						data: ['策略', '沪深300']
					},
					grid: {
						left: '3%',
						right: '2%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLabel: {
							show: true,
							interval: 'auto',
							// formatter: function (value) {
							//     value = value * 100
							//     return value + '%'
							// }
						},
						show: true
					}],
					yAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: this.year_profit_dict['year_data']
					}],
					series: [{
						name: '策略',
						type: 'bar',
						label: {
							show: true,
							position: 'inside',
							normal: {
								show: true,
								position: 'inside',
								formatter: '{c}%',
								color: '#292934'
							},
							color: '#90a8f8'
						},
						data: this.year_profit_dict['tactic_year_profit'],
						color: ['#90a8f8']
					},
					{
						name: '沪深300',
						type: 'bar',
						label: {
							show: true,
							position: 'inside',
							normal: {
								show: true,
								position: 'inside',
								formatter: '{c}%',
								color: '#292934'
							},
							color: '#fbe792'
						},
						data: this.year_profit_dict['index_year_profit'],
						color: ['#fbe792']
					}
					]
				};
				this.myChart_2.setOption(option)
			}, 1000);

			// K线开平仓作图
			setTimeout(() => {
				if (this.myChart_3 != null && this.myChart_3 != "" && this.myChart_3 != undefined) {
					this.myChart_3.dispose();//销毁
				}
				this.myChart_3 = echarts.init(document.getElementById('k_line_chart'));
				const upColor = '#ec0000';
				const upBorderColor = '#8A0000';
				const downColor = '#00da3c';
				const downBorderColor = '#008F28';
				// console.log('aaa', this.k_line_dict);
				var option = {
					title: {
						text: '当前策略: ' + this.tactic_name.EName,
						left: 0
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
					},
					axisPointer: {
						link: [
							{
								xAxisIndex: 'all'
							}
						],
						label: {
							backgroundColor: '#777'
						}
					},
					brush: {
						xAxisIndex: 'all',
						brushLink: 'all',
						outOfBrush: {
							colorAlpha: 0.1
						}
					},
					visualMap: {
						show: false,
						seriesIndex: 5,
						dimension: 2,
						pieces: [
							{
								value: 1,
								color: upColor
							},
							{
								value: -1,
								color: downColor
							}
						]
					},
					grid: [{
						left: '10%',
						right: '10%',
						bottom: '20%'
					}, {
						left: '10%',
						right: '10%',
						height: '10%',
						bottom: '6%'
					}
					],
					xAxis: [{
						type: 'category',
						data: this.k_line_dict.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: { onZero: false },
						splitLine: { show: false },
						min: 'dataMin',
						max: 'dataMax',
						axisPointer: {
							z: 100
						}
					}, {
						//成交量柱状图的设置
						type: 'category',
						gridIndex: 1,
						data: this.k_line_dict.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: { onZero: false },
						axisTick: { show: false },
						splitLine: { show: false },
						axisLabel: { show: false },
						min: 'dataMin',
						max: 'dataMax'
					}
					],
					yAxis: [{
						scale: true,
						splitArea: {
							show: true
						}
					}, {
						scale: true,
						gridIndex: 1,
						splitNumber: 2,
						axisLabel: { show: false },
						axisLine: { show: false },
						axisTick: { show: false },
						splitLine: { show: false }
					}],
					dataZoom: [
						{
							type: 'inside',
							xAxisIndex: [0, 1],
							start: 10,
							end: 100
						},
						{
							show: true,
							xAxisIndex: [0, 1],
							type: 'slider',
							bottom: 3,
							start: 10,
							end: 100
						}
					],
					series: [
						{
							name: 'candle',
							type: 'candlestick',
							data: this.k_line_dict.values,
							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: upBorderColor,
								borderColor0: downBorderColor
							},
							markPoint: {
								label: {
									formatter: function (param) {
										return param != null ? Math.round(param.value) + '' : '';
									}
								},
								data: this.k_line_dict.signal_list,
								label: {
									formatter: function (params) {
										// console.log(params)
										return params.data.coord[2]
									},
								},
								tooltip: {
									formatter: function (param) {
										return param.name + '<br>' + (param.data.coord || '');
									}
								}
							},
						},
						{
							name: 'MA5',
							type: 'line',
							data: this.calculateMA(5, this.k_line_dict),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA10',
							type: 'line',
							data: this.calculateMA(10, this.k_line_dict),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA20',
							type: 'line',
							data: this.calculateMA(20, this.k_line_dict),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{
							name: 'MA30',
							type: 'line',
							data: this.calculateMA(30, this.k_line_dict),
							smooth: true,
							lineStyle: {
								opacity: 0.5
							}
						},
						{//成交量柱状图的设置
							name: 'Volume',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							// large: true,
							data: this.k_line_dict.volume_list
						}
					]
				};
				this.myChart_3.setOption(option)
			}, 1000)
		},
		getForMateDate (date) {
			var new_date = new Date(date);
			var YY = new_date.getFullYear() + '-'
			var MM = (new_date.getMonth() + 1 < 10 ? '0' + (new_date.getMonth() + 1) : new_date.getMonth() + 1) + '-';
			var DD = (new_date.getDate() < 10 ? '0' + (new_date.getDate()) : new_date.getDate());
			return YY + MM + DD
		},

	}
}
</script>

<style lang="scss" scoped>
.main_body {
	width: 100%;
	height: auto;
	background-color: #eff2f5;
}

.main_body a {
	text-decoration: none;
}

.head_content {
	width: 100%;
	height: 240px;
	background-color: #a74e90;
	padding: 30px 30px;
	/*background-image: url('../../../static/images/select_stock_fm.jpeg');*/
	/*background-repeat: no-repeat;*/
	/*background-size: 100% 100%;*/
	/*background-attachment: fixed;*/
}

.head_content .title {
	width: 300px;
	height: 240px;
	float: left;
}

.head_content .title span {
	font-size: 42px;
	font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑,
		Arial, sans-serif;
	/*color: red;*/
}

.head_content .subtitle {
	margin-top: 10px;
}

.head_content .subtitle span {
	font-size: 18px;
	font-family: "STXingkai", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑,
		Arial, sans-serif;
	font-style: italic;
}

.right_card {
	width: 360px;
	height: 200px;
	background-color: #fff;
	float: right;
	margin-right: 80px;
	margin-top: 20px;
	// display: inline-block;
	border-radius: 5px;
}

.right_card .el-card {
	width: 100%;
	height: 100%;
}

.right_card_topic_font {
	font-size: 18px;
	font-weight: 300;
}

.right_card_profit_font {
	font-size: 30px;
	font-weight: 400;
	/*ling-height: 60px;*/
	margin: 20px 0 20px 0;
}

.right_card .el-row .el-col:not(:last-child) {
	/*width: 100%;*/
	height: 64px;
	border-right: 1px solid rgb(223, 226, 230);
}

.right_card .el-row .el-col p {
	text-align: center;
	vertical-align: middle;
}

.head_content .clear {
	clear: both;
}

.body_content {
	width: 100%;
	height: auto;
	/*background-color: pink;*/
}

.perform_content {
	width: 100%;
	height: 600px;
	/*background-color: yellow;*/
}

.perform_content_left {
	width: 26.5%;
	height: 575px;
	margin-left: 2%;
	margin-right: 15px;
	float: left;
	margin-top: 15px;
}

.perform_content_left .el-card {
	width: 100%;
	height: 100%;
}

.risk_analysis_table {
	width: 100%;
}

.risk_analysis_table caption {
	font-size: 20px;
	font-weight: 600;
	color: #000;
}

.risk_analysis_table tr td {
	text-align: center;
	vertical-align: middle;
}

.risk_analysis_table tr:nth-child(2n) {
	background-color: rgb(255, 255, 255);
}

.risk_analysis_table tr:nth-child(2n + 1) {
	background-color: rgb(242, 242, 242);
}

.perform_content_right {
	width: 67%;
	height: 580px;
	float: left;
	margin-left: 20px;
	margin-top: 15px;
}

.perform_content_right .chart_subtitle p {
	font-weight: 200;
	font-size: 14px;
}

.select_content {
	width: 96%;
	height: 950px;
	margin: 0 auto;
}

.kline_detail {
	width: 96%;
	height: auto;
	margin: 0 auto;
}

.profit {
	width: 100%;
	height: 100%;
	background-color: #c7586f;
}

.loss {
	width: 100%;
	height: 100%;
	background-color: #6bae8e;
}

.RedStyle {
	color: #c7586f;
	font-size: 15px;
	font-weight: 300;
}

.GreenStyle {
	color: #6bae8e;
	font-size: 15px;
	font-weight: 300;
}

.main_title {
	font-size: 20px;
	font-weight: 600;
	color: #000;
}
</style>
