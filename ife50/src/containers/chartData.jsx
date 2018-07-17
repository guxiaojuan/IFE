import React from 'react'
import style from '../style/chartData.less';

export default class Statistic extends React.Component {
	constructor(props) {
		super(props);
	};

	componentDidMount () {
		console.log('---------路由--------')
		console.log(this.props)
	}

	render () {
		// return (
		// 	<div  style={{marginTop: '10rem'}}>我的问卷部分Echats</div>
		// )
		return(
			<div className={style.container}>
				<div className={style.main}>
					<div className={style.box}>
						<div></div>
					</div>
				</div>
			</div>
		)
	}
}