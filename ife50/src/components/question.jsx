import React from 'react'
import style from '../style/question.less'

export default class Question extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount () {
		console.log('--------question-------------');
		console.log(this.props.questionList);
	}

	renderList () {
		let questionList = this.props.questionList;
		let arr = [];
		for (let i=0; i<questionList.length; i++) {
			if (questionList[i].type === 'single') {
				arr.push(<List key={i} idx={i} question={questionList[i].question} answer1={questionList[i].answer1} answer2={questionList[i].answer2} type={questionList[i].type}/>)
			}else if(questionList[i].type === 'multi') {
				arr.push(<List key={i} idx={i} question={questionList[i].question} answer1={questionList[i].answer1} answer2={questionList[i].answer2} answer3={questionList[i].answer3}
							   answer4={questionList[i].answer4} type={questionList[i].type}/>)
			}else if(questionList[i].type === 'text') {
				arr.push(<List key={i} idx={i} question={questionList[i].question}/>)
			}
		}
		return arr;
	}
	render () {
		return(
			<div>
				{this.renderList()}
			</div>
		)
	}
}

class List extends React.Component {
	goUp (idx) {
		this.props.onUp(idx);
	}
	goDown (idx) {
		this.props.onDown(idx);
	}
	goReuse (idx) {
		this.props.onReuse(idx);
	}
	goDel (idx) {
		this.props.onDel(idx);
	}
	componentDidMount () {
		console.log('--------single-------------')
		console.log(this.props)
	}
	renderAnswer () {
		let tmp = []
		let answer1, answer2, answer3, answer4
		if (this.props.type === 'single') {
			answer1 = this.props.answer1;
			answer2 = this.props.answer2;
			tmp.push(<div className={style["answer1"]}>{answer1}</div>)
			tmp.push(<div className={style["answer2"]}>{answer2}</div>)
		}else if(this.props.type === 'multi') {
			answer1 = this.props.answer1;
			answer2 = this.props.answer2;
			answer3 = this.props.answer3;
			answer4 = this.props.answer4;
			tmp.push(<div className={style["answer1"]}>{answer1}</div>);
			tmp.push(<div className={style["answer2"]}>{answer2}</div>);
			tmp.push(<div className={style["answer2"]}>{answer3}</div>);
			tmp.push(<div className={style["answer2"]}>{answer4}</div>);
		}else {
			tmp.push(<textarea/>)
		}

		return tmp
	}
	render () {
		let idx = this.props.idx;
		let question = this.props.question;
		return (
			<div>
				<div className={style.title}>
					<span>Q{idx+1}</span>
					<span>{question}</span>
				</div>
				{this.renderAnswer()}
				<ul className={style.bottom}>
					<li onClick={this.goUp.bind(this, idx)}>上移</li>
					<li onClick={this.goDown.bind(this, idx)}>下移</li>
					<li onClick={this.goReuse.bind(this, idx)}>复用</li>
					<li onClick={this.goDel.bind(this, idx)}>删除</li>
				</ul>
			</div>
		)
	}
}
