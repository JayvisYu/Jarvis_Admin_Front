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
						<span
							style="font-size:40px;font-weight: 500;"
							v-bind:class="{'RedStyle': now_year_profit >= 0,
                                           'GreenStyle': now_year_profit < 0}"
						>{{now_year_profit}}%</span>
						<el-button
							@click="chgParameterData"
							type="primary"
							round
							style="float: right;height: 100%;"
						>
							选择周期: {{select_num}},
							<span v-if="select_circle==='W'">周</span>
							<span v-if="select_circle==='M'">月</span>
						</el-button>
					</p>
					<el-row>
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
					</el-row>
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
							cellpadding="1"
							style="margin-top:2px"
						>
							<caption>风险分析(2007年初至今)</caption>
							<tbody>
								<tr>
									<td>累计净值</td>
									<td>{{comments_dict['accumulated_net']}}</td>
								</tr>
								<tr>
									<td>最大收益</td>
									<td>{{comments_dict['max_return']}}</td>
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
									<td>平均涨幅</td>
									<td>{{comments_dict['average_range']}}</td>
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
									<td>最大连续上涨天数</td>
									<td>{{comments_dict['max_continuous_rise_days']}}</td>
								</tr>
								<tr>
									<td>最大连续下跌天数</td>
									<td>{{comments_dict['max_continuous_down_days']}}</td>
								</tr>
								<tr>
									<td>最大单周期涨幅</td>
									<td>{{comments_dict['max_single_circle_rise_range']}}</td>
								</tr>
								<tr>
									<td>最大单周期跌幅</td>
									<td>{{comments_dict['max_single_circle_down_range']}}</td>
								</tr>
								<tr>
									<td>收益波动率</td>
									<td>{{comments_dict['profit_volatility']}}</td>
								</tr>
								<tr>
									<td>基准累计净值</td>
									<td>{{comments_dict['base_accumulated_net']}}</td>
								</tr>
								<tr>
									<td>基准年化收益率</td>
									<td>{{comments_dict['base_annualized_yield']}}</td>
								</tr>
								<tr>
									<td>alpha</td>
									<td>{{comments_dict['alpha']}}</td>
								</tr>
								<tr>
									<td>beta</td>
									<td>{{comments_dict['beta']}}</td>
								</tr>
								<tr>
									<td>夏普比率</td>
									<td>{{comments_dict['sharp_ratio']}}</td>
								</tr>
								<tr>
									<td>特雷诺比率</td>
									<td>{{comments_dict['treynor_ratio']}}</td>
								</tr>
								<tr>
									<td>信息比率</td>
									<td>{{comments_dict['inf_ratio']}}</td>
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
				<div class="select_content_left">
					<div class="last_select_stock">
						<el-card
							class="box-card"
							v-loading="last_select_stock_loading"
						>
							<div
								slot="header"
								class="clearfix"
							>
								<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;最新选股结果</span>
							</div>
							<div class="new_select_stocks">
								<template v-for="(item, index) in select_stocks_code">
									<el-tag size="small">{{item}}-{{select_stocks_name[index]}}</el-tag>
								</template>
							</div>
							<!-- 以下时间需要计算传参 -->
							<span style="font-size:12px;font-weight:300;color:rgb(126, 132, 138);float: right;">选股选股时间：2021-05-28收盘后</span>
							<el-divider></el-divider>
							<div class="opration_introduce">
								<p>操作说明:</p>
								<p>1.买入时间: 2021-05-31开盘时</p>
								<p>2.卖出时间: 2021-06-04收盘时</p>
								<p>3.下次选股时间: 2021-06-04收盘后</p>
							</div>
						</el-card>
					</div>
					<div class="history_select_stock">
						<el-card class="box-card">
							<div
								slot="header"
								class="clearfix"
							>
								<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;历史选股记录</span>
							</div>
							<el-table
								:data="hisResultData"
								border
								style="width: 100%;"
							>
								<el-table-column
									prop="trade_date"
									label="选股时间"
									width="100"
									align="center"
								>
									<template slot-scope="scope">
										<span>{{getForMateDate(scope.row['trade_date'])}}</span>
									</template>
								</el-table-column>
								<el-table-column
									label="选股"
									align="center"
								>
									<template slot-scope="scope">
										<template v-for="(item, index) in scope.row['select_stock_code']">
											<span style="font-weight: 200;font-size: 10px;margin-right:3px;">
												<el-tag size="mini">{{item}}-{{scope.row['select_stock_name'][index]}}</el-tag>
											</span>
										</template>
									</template>
								</el-table-column>
								<el-table-column
									prop="select_stock_range"
									label="下周期收益"
									width="100px"
									align="center"
								>
									<template slot-scope="scope">
										<span v-bind:class="{'RedStyle': scope.row['select_stock_range'] >= 0,
                                           'GreenStyle': scope.row['select_stock_range'] < 0}">
											{{getSliceData(scope.row['select_stock_range'])}}%</span>
									</template>
								</el-table-column>
							</el-table>
						</el-card>
					</div>
				</div>
				<div class="select_content_right">
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
								style="width: 100%;height: 869px"
								v-loading="year_profit_chart_loading"
							></div>
						</div>
					</el-card>
				</div>
			</div>
			<div class="analysis_content">
				<div class="analysis_content_left">
					<el-card class="box-card">
						<div
							slot="header"
							class="clearfix"
						>
							<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;收益日历</span>
						</div>
						<div class="block">
							<el-date-picker
								v-model="value"
								type="month"
								@change="getNewMonthData"
								placeholder="请选择选择月"
							>
							</el-date-picker>
						</div>
						<el-calendar
							id="calendar"
							v-model="value"
							v-loading="calendar_data_loading"
						>
							<template
								slot="dateCell"
								slot-scope="{date, data}"
							>
								<div v-if="date.toDateString().indexOf(value.toDateString().split(' ')[1])!=-1">
									<div
										class="table_cell"
										v-bind:class="{'profit': handleSelected(data.day) > 0, 'loss': handleSelected(data.day) < 0}"
									>
										<div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
										<div
											class="status"
											v-if="data.day.split('-').slice(1)[0] == now_month"
										>
											<p v-if="handleSelected(data.day) !== 0 ">
												{{getSliceData(handleSelected(data.day).toString())}}%</p>
											<p v-else></p>
										</div>
									</div>
								</div>
							</template>
						</el-calendar>
					</el-card>
				</div>
				<div class="analysis_content_right">
					<div class="analysis_content_radar">
						<el-card class="box-card">
							<div
								slot="header"
								class="clearfix"
							>
								<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;策略评价</span>
							</div>
							<div>
								<div
									id="radar_perform_chart"
									style="width: 100%;height: 380px"
									v-loading="radar_perform_chart_loading"
								></div>
							</div>
						</el-card>
					</div>
					<div class="analysis_content_pie">
						<el-card class="box-card">
							<div
								slot="header"
								class="clearfix"
							>
								<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;涨跌分布图</span>
							</div>
							<div>
								<div
									id="pie_perform_chart"
									style="width: 100%;height: 380px"
									v-loading="pie_perform_chart_loading"
								></div>
							</div>
						</el-card>
					</div>
				</div>
			</div>
			<div class="robustness_content">
				<el-card class="box-card">
					<div
						slot="header"
						class="clearfix"
					>
						<span class="main_title"><i class="el-icon-s-data"></i>&nbsp;稳健性分析</span>
					</div>
					<div>
						<div
							id="robustness_perform_chart"
							style="width: 100%;height: 580px"
							v-loading="robustness_perform_chart_loading"
						></div>
					</div>
				</el-card>
			</div>
		</div>
		<el-dialog
			title="策略参数"
			:visible.sync="showParameterVisible"
			width="30%"
			:close-on-click-modal="false"
		>
			<p style="font-size:20px;font-weight:600;">换仓周期</p>
			<div>
				<el-radio
					v-model="select_circle"
					label="W"
					border
				>周</el-radio>
				<el-radio
					v-model="select_circle"
					label="M"
					border
				>月</el-radio>
			</div>
			<p style="font-size:20px;font-weight:600;">选股个数</p>
			<div>
				<el-radio-group v-model="select_num">
					<el-radio
						:label="3"
						border
					>3</el-radio>
					<el-radio
						:label="5"
						border
					>5</el-radio>
					<el-radio
						:label="10"
						border
					>10</el-radio>
				</el-radio-group>
			</div>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="showParameterVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="sureChgParameter"
				>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Axios } from '@/api/axios'
import { Notification } from 'element-ui'
import echarts from 'echarts'


export default {
	name: 'StockDetail',
	data () {
		return {
			tactic_name: {},
			select_num: 3,
			select_circle: 'W',
			showParameterVisible: false,
			comments_dict: {},
			comments_list: [],
			curve_dict: {},
			now_year_profit: '',
			year_profit_dict: {},
			select_stocks_code: [],
			select_stocks_name: [],
			selected_stocks_result: [],
			hisResultData: [],
			range_pie_list: [
				{ value: 0, name: '小于7.5%' },
				{ value: 0, name: '-7.5%到-3.5%' },
				{ value: 0, name: '-3.5%到0%' },
				{ value: 0, name: '0%到3.5%' },
				{ value: 0, name: '3.5%到7.5%' },
				{ value: 0, name: '大于7.5%' }
			],
			robustness_result: [],
			robustness_result_list: [],
			now_month: '',
			value: new Date(),
			calendarData: [],
			recently_profit: '',
			recently_circle_profit: '',
			dateRange: ['2020-11-01', '2021-01-31'],
			risk_analysis_table_loading: false,
			equity_curve_chart_loading: false,
			last_select_stock_loading: false,
			year_profit_chart_loading: false,
			calendar_data_loading: false,
			radar_perform_chart_loading: false,
			pie_perform_chart_loading: false,
			robustness_perform_chart_loading: false,
			myChart_1: null,
			myChart_2: null,
			myChart_3: null,
			myChart_4: null,
			myChart_5: null,
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
			// this.risk_analysis_table_loading = true;
			// this.equity_curve_chart_loading = true;
			// this.last_select_stock_loading = true;
			// this.year_profit_chart_loading = true;
			// this.calendar_data_loading = true;
			// this.radar_perform_chart_loading = true;
			// this.pie_perform_chart_loading = true;
			// this.robustness_perform_chart_loading = true;
			// this.tactic_name = this.tacticinfo['EName'];
			this.getMonthData();
			this.getTableData();
			this.getCurveChartData();
			this.getYearProfitData();
			this.getLastSelectData();
			this.getHisResultData();
			this.getDailyProfitData();
			this.getRobustnessData();
			this.paintingData();
			// setTimeout(() => {
			//     this.risk_analysis_table_loading = false;
			//     this.equity_curve_chart_loading = false;
			//     this.last_select_stock_loading = false;
			//     this.year_profit_chart_loading = false;
			//     this.calendar_data_loading = false;
			//     this.radar_perform_chart_loading = false;
			//     this.pie_perform_chart_loading = false;
			//     this.robustness_perform_chart_loading = false;
			// }, 2000)
		},
		getTableData () {
			Axios({
				url: '/stock/get_stock_risk_analysis_data',
				method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
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
				url: '/stock/get_stock_curve_chart_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
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
				url: '/stock/get_stock_year_profit_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
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
		getLastSelectData () {
			Axios({
				url: '/stock/get_last_select_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
				}
			}).then(
				res => {
					this.select_stocks_code = res.data.select_stocks_code;
					this.select_stocks_name = res.data.select_stocks_name;
				}
			).catch(err => {
				console.log(err)
			})
		},
		getHisResultData () {
			Axios({
				url: '/stock/get_his_result_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
				}
			}).then(
				res => {
					// console.log(res);
					this.selected_stocks_result = res.data.selected_stocks_result;
					this.hisResultData = res.data.selected_stocks_result.slice(-5).reverse();
					this.recently_circle_profit = this.getSliceData(this.hisResultData[0]['select_stock_range']);
					this.range_pie_list = [
						{ value: 0, name: '小于7.5%' },
						{ value: 0, name: '-7.5%到-3.5%' },
						{ value: 0, name: '-3.5%到0%' },
						{ value: 0, name: '0%到3.5%' },
						{ value: 0, name: '3.5%到7.5%' },
						{ value: 0, name: '大于7.5%' }
					];
					for (let i = 0; i < this.selected_stocks_result.length; i++) {
						let temp_value = Number(this.selected_stocks_result[i]['select_stock_range']) * 100;
						if (temp_value < -7.5) {
							this.range_pie_list[0]['value'] += 1;
						} else if (-7.5 <= temp_value && temp_value < -3.5) {
							this.range_pie_list[1]['value'] += 1;
						} else if (-3.5 <= temp_value && temp_value < 0) {
							this.range_pie_list[2]['value'] += 1;
						} else if (0 <= temp_value && temp_value < 3.5) {
							this.range_pie_list[3]['value'] += 1;
						} else if (3.5 <= temp_value && temp_value < 7.5) {
							this.range_pie_list[4]['value'] += 1;
						} else {
							this.range_pie_list[5]['value'] += 1;
						}
					}
				}
			).catch(err => {
				console.log(err)
			})
		},
		getDailyProfitData () {
			Axios({
				url: '/stock/get_daily_profit_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
				}
			}).then(
				res => {
					this.calendarData = res.data.daily_profit_list;
					this.recently_profit = this.getSliceData(this.calendarData.slice(-1)[0]['number']);
				}
			).catch(err => {
				console.log(err)
			})
		},
		getRobustnessData () {
			Axios({
				url: '/stock/get_robustness_result_data', method: 'get',
				params: {
					'tactic_name': this.tactic_name.EName,
					'select_num': this.select_num,
					'select_circle': this.select_circle
				}
			}).then(
				res => {
					this.robustness_result = res.data.robustness_result;
					this.robustness_result_list = [];
					for (let i = 0; i < this.robustness_result.length; i++) {
						this.robustness_result_list.push(this.robustness_result[i]['robustness_value'])
					}
				}
			).catch(err => {
				console.log(err)
			})
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

			// 策略评价图
			setTimeout(() => {
				if (this.myChart_3 != null && this.myChart_3 != "" && this.myChart_3 != undefined) {
					this.myChart_3.dispose();//销毁
				}
				this.myChart_3 = echarts.init(document.getElementById('radar_perform_chart'));

				var option = {
					title: {
						text: ''
					},
					tooltip: {},
					legend: {
						data: ['策略'],
						x: 'left',
						y: 'top'

					},
					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: [
							{ name: '稳定性', max: 100 },  // 最大回撤
							{ name: '选股能力', max: 100 },  // 胜率
							{ name: '绝对收益', max: 2 },  // 年化收益回撤比
							{ name: '盈利能力', max: 200 },  // 年化收益
							{ name: '抗风险能力', max: 4 },  // 夏普比率
						]
					},
					series: [{
						name: '策略结果',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [
							{
								value: this.comments_list,
								name: '策略'
							}
						]
					}]
				};
				this.myChart_3.setOption(option)
			}, 1000);

			// 涨跌分布图
			setTimeout(() => {
				if (this.myChart_4 != null && this.myChart_4 != "" && this.myChart_4 != undefined) {
					this.myChart_4.dispose();//销毁
				}
				this.myChart_4 = echarts.init(document.getElementById('pie_perform_chart'));

				var option = {
					title: {
						text: '',
						subtext: '',
						left: 'left'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 10,
						top: 20,
						bottom: 20,
						data: ['小于7.5%', '-7.5%到-3.5%', '-3.5%到0%', '0%到3.5%', '3.5%到7.5%', '大于7.5%'],
						selected: []
					},
					series: [
						{
							name: '涨跌幅:',
							type: 'pie',
							radius: '55%',
							center: ['40%', '50%'],
							data: this.range_pie_list,
							emphasis:
							{
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX:
										0,
									shadowColor:
										'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};
				this.myChart_4.setOption(option)
			}, 1000);

			// 稳健性分析作图
			setTimeout(() => {
				if (this.myChart_5 != null && this.myChart_5 != "" && this.myChart_5 != undefined) {
					this.myChart_5.dispose();//销毁
				}
				this.myChart_5 = echarts.init(document.getElementById('robustness_perform_chart'));
				var option = {
					title: {
						text: '稳健性测试',
						subtext: '柱状图越依次往下，策略稳健性越好。'
					},
					color: ['#e17055'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['策略']
					},
					grid: {
						left: '1%',
						right: '1%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						position: 'bottom',
						data: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
						axisTick: {
							alignWithLabel: true
						}
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '策略',
						data: this.robustness_result_list,
						type: 'bar',
						label: {
							show: true,
							position: 'top'
						},
					}]
				};
				this.myChart_5.setOption(option)
			}, 1000);

		},
		chgParameterData () {
			this.showParameterVisible = true;
		},
		sureChgParameter () {
			this.getAllData();
			this.showParameterVisible = false;
			setTimeout(() => {
				this.risk_analysis_table_loading = false;
				this.equity_curve_chart_loading = false;
				this.last_select_stock_loading = false;
				this.year_profit_chart_loading = false;
				this.calendar_data_loading = false;
				this.radar_perform_chart_loading = false;
				this.pie_perform_chart_loading = false;
				this.robustness_perform_chart_loading = false;
			}, 2000)
		},
		getSliceData (val) {
			val *= 100;
			val = val.toFixed(2);
			return val
		},
		getForMateDate (date) {
			var new_date = new Date(date);
			var YY = new_date.getFullYear() + '-'
			var MM = (new_date.getMonth() + 1 < 10 ? '0' + (new_date.getMonth() + 1) : new_date.getMonth() + 1) + '-';
			var DD = (new_date.getDate() < 10 ? '0' + (new_date.getDate()) : new_date.getDate());
			return YY + MM + DD
		},
		handleSelected (day) {
			let flag = 0; //默认显示为0
			this.calendarData.forEach(item => { //this.attendanceDetailsData是后台返回的数据
				if (item.time == day) {  //判断显示数据
					flag = item.number;
					return
				}
			})
			return flag
		},
		getNewMonthData (val) {
			console.log(val);
			this.now_month = val.getMonth() + 1;
		},
		getMonthData () {
			var date = new Date();
			var month = date.getMonth() + 1;
			this.now_month = month;
		},
		getLastParam (val) {
			// let end = val[val.length - 1];
			let end = val.slice(-1)[0];
			// console.log(end);
			return end
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
	background-color: #3a8ee6;
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
	width: 68%;
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
	width: 100%;
	height: 1000px;
}

.select_content_left {
	width: 40%;
	height: 1050px;
	float: left;
	margin-left: 2%;
	margin-right: 1.8%;
	/*background-color: green;*/
	margin-top: 10px;
}

.select_content_left .last_select_stock {
	width: 100%;
	height: 320px;
	/*background-color: red;*/
}

.select_content_left .last_select_stock .el-card {
	width: 100%;
	height: 320px;
}

.select_content_left .last_select_stock .new_select_stocks {
	width: 100%;
}

.select_content_left .last_select_stock .new_select_stocks .el-tag {
	margin-right: 10px;
	margin-bottom: 5px;
}

.select_content_left .history_select_stock {
	width: 100%;
	height: 720px;
	/*background-color: red;*/
	overflow: hidden;
}

.select_content_left .history_select_stock .el-card {
	width: 100%;
	height: 695px;
	margin-top: 15px;
}

.select_content_right {
	width: 55%;
	height: 1050px;
	float: left;
	/*background-color: red;*/
	margin-top: 10px;
}

.select_content_right .el-card {
	height: 1030px;
}

.analysis_content {
	width: 100%;
	height: 960px;
	/*background-color: red;*/
	padding: 0;
}

.analysis_content_left {
	width: 44%;
	height: 880px;
	float: left;
	margin-left: 2%;
	margin-right: 1.8%;
	/*background-color: green;*/
}

.analysis_content_left .el-card {
	width: 100%;
	height: 100%;
}

.analysis_content_right {
	width: 51%;
	height: 880px;
	float: left;
	/*background-color: yellow;*/
}

.analysis_content_right .analysis_content_radar {
	width: 100%;
	height: 435px;
	/*background-color: pink;*/
}

.analysis_content_right .analysis_content_radar .el-card {
	width: 100%;
	height: 100%;
}

.analysis_content_right .analysis_content_pie {
	width: 100%;
	height: 435px;
	margin-top: 10px;
	/*background-color: orange;*/
}

.analysis_content_right .analysis_content_pie .el-card {
	width: 100%;
	height: 100%;
}

.el-calendar {
	width: 100%;
	height: 700px;
	margin-top: 55px;
}

.el-calendar-table thead th {
	text-align: center;
}

.el-calendar-table .el-calendar-day {
	padding: 5px;
	width: 75px;
}

.el-calendar__button-group {
	display: none;
}

.table_cell {
	width: 100%;
	height: 100%;
}

.status p {
	margin-top: 35px;
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

.robustness_content {
	width: 96.7%;
	height: 680px;
	/*background-color: red;*/
	float: left;
	margin-left: 2%;
	padding-bottom: 20px;
	// margin-bottom: 20px;
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
