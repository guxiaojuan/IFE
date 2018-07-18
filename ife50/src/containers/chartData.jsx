import React from 'react'
import style from '../style/chartData.less';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

export default class ChartData extends React.Component {
	constructor(props) {
		super(props);
		let questionnaire = JSON.parse(localStorage.getItem('questionnaire'));
		let tab = this.props.match.params.tab;
		let single = 0;   //单选题个数
		let multi = 0;    //多选题个数
		let text = 0;     //文本题个数

		function toPercent(point){
			let str=Number(point*100).toFixed(2);
			str+="%";
			return str;
		}

		questionnaire[tab] && questionnaire[tab]['questionList'].forEach((item) => {
			if (item.type === 'single') {
				single ++;
			}else if(item.type === 'multi') {
				multi ++;
			}else {
				text++;
			}
		})

		let all = single + multi + text;
		single = single/all;
		multi = multi/all;
		text = text/all;
		this.state = {
			question: questionnaire[tab],
			single: single,
			multi: multi,
			text: text
		};
	};

	componentDidMount () {
		// console.log('---------路由--------')
		// console.log(this.props);
		// console.log(this.props.match.params.tab)
		let myBar = echarts.init(document.querySelector('#bar'));

		let barArr = [this.state.single, this.state.multi, this.state.text];
		let barOptions = {
			title: {
				text: '数据占比_柱状图'
			},
			xAxis: {
				type: 'category',
				data: ['单选题', '多选题', '文本题']
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%']
			},
			series: [{
				data: barArr,
				type: 'bar'
			}]
		}
		myBar.setOption(barOptions);
		console.log('============图表===============')
		console.log(myBar)
	};

	componentWillUnmount () {
		// if (this.echart && this.echart.dispose) {
		// 	console.log('dispose')
		// 	this.echart.dispose()
		// }

	};

	render () {
		return(
			<div className={style.container}>
				<div className={style.main}>
					<div className={style.box}>
						<header className={style.title}>
							<div onClick={() => this.props.history.push('/')} className={style.return}>
								<span className={style.char}>返回</span>
							</div>
							<h1 className={style.topic1}>{this.state.question['questionTitle']}</h1>
							<h3 className={style.topic3}>此统计分析只包含完整回收的数据</h3>
						</header>
						<div className={style.content}>
							<div>数据图表_数据占比</div>

							<div className={style.bar} id="bar"/>
							<div className={style.pie} id="pie"/>
						</div>
						<footer className={style.foot} onClick={() => this.props.history.push('/')}>返回</footer>
					</div>
				</div>
			</div>
		)
	}
}