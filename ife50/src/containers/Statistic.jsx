import React from 'react'

export default class Statistic extends React.Component {
	constructor(props) {
		super(props);
	};

	componentDidMount () {
		console.log('---------路由--------')
		console.log(this.props)
	}

	render () {
		return (
			<div  style={{marginTop: '10rem'}}>我的问卷部分Echats</div>
		)
	}
}