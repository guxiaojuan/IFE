import React from 'react'
import style from '../style/chartData.less';

export default class ChartData extends React.Component {
	constructor(props) {
		super(props);
		let questionnaire = JSON.parse(localStorage.getItem('questionnaire'));
		let tab = this.props.match.params.tab;
		this.state = {
			question: questionnaire[tab],
		};
	};

	componentDidMount () {
		console.log('---------路由--------')
		console.log(this.props);
		console.log(this.props.match.params.tab)
	}

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
						<div className={style.content}>图表</div>
						<footer className={style.foot} onClick={() => this.props.history.push('/')}>返回</footer>
					</div>
				</div>
			</div>
		)
	}
}