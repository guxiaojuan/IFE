import React from 'react'
import style from '../style/add.less'

export default class Add  extends React.Component {
	constructor(props) {
		super(props);
		this.addQuestion = this.addQuestion.bind(this)
	}
	addQuestion () {
		this.props.history.push('/edit/new')
	};
	render () {
		return (
			<div className={style.container} >
				<button onClick={this.addQuestion}><span>+</span>新建问卷</button>
			</div>
		)
	}
}