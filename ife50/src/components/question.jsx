import React from 'react';
import style from '../style/question.less';

export default class Question extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount () {
		// console.log('--------question-------------');
		// console.log(this.props.questionList);
	}

	renderList () {
		let questionList = this.props.questionList;
		let arr = [];
		for (let i=0; i<questionList.length; i++) {
			if (questionList[i].type === 'single') {
				arr.push(<List key={i} idx={i} question={questionList[i].question} answer1={questionList[i].answer1} answer2={questionList[i].answer2}
							   type={questionList[i].type} onUp={this.props.onUp} onDown={this.props.onDown} onReuse={this.props.onReuse} onDel={this.props.onDel}/>)
			}else if(questionList[i].type === 'multi') {
				arr.push(<List key={i} idx={i} question={questionList[i].question} answer1={questionList[i].answer1} answer2={questionList[i].answer2}
							   answer3={questionList[i].answer3} answer4={questionList[i].answer4} type={questionList[i].type} onUp={this.props.onUp}
							   onDown={this.props.onDown} onReuse={this.props.onReuse} onDel={this.props.onDel}/>)
			}else if(questionList[i].type === 'text') {
				arr.push(<List key={i} idx={i} question={questionList[i].question} onUp={this.props.onUp} onDown={this.props.onDown}
							   onReuse={this.props.onReuse} onDel={this.props.onDel}/>)
			}
		}
		return arr;
	}
	render () {
		return(
			<div className={style.render}>
				{this.renderList()}
			</div>
		)
	}
}

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			single1: false,
			single2: false,
			multi1: false,
			multi2: false,
			multi3: false,
			multi4: false,
		}
	}
	goUp (idx) {
		console.log('--------------------')
		console.log(idx)
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
	onSelect (type) {
		console.log(this.state[type]);
		let tmp = !this.state[type];
		switch(type) {
			case 'single1': {
				this.setState({
					single1: tmp
				});
				break;
			}
			case 'single2': {
				this.setState({
					single2: tmp
				});
				break;
			}
			case 'multi1': {
				this.setState({
					multi1: tmp
				});
				break;
			}
			case 'multi2': {
				this.setState({
					multi2: tmp
				});
				break;
			}
			case 'multi3': {
				this.setState({
					multi3: tmp
				});
				break;
			}
			case 'multi4': {
				this.setState({
					multi4: tmp
				});
				break;
			}
		}
	}
	componentDidMount () {
	}
	renderAnswer () {
		let tmp = [];
		let answer1, answer2, answer3, answer4;

		if (this.props.type === 'single') {
			answer1 = this.props.answer1;
			answer2 = this.props.answer2;
			tmp.push(<div className={style["answer"]}><em className={[style["no_select"], this.state.single1 && style['select']].join(' ')}
														  onClick={this.onSelect.bind(this, 'single1')}/>{answer1}</div>)
			tmp.push(<div className={style["answer"]}><em className={[style["no_select"], this.state.single2 && style['select']].join(' ')}
														  onClick={this.onSelect.bind(this, 'single2')}/>{answer2}</div>)
		}else if(this.props.type === 'multi') {
			answer1 = this.props.answer1;
			answer2 = this.props.answer2;
			answer3 = this.props.answer3;
			answer4 = this.props.answer4;
			tmp.push(<div className={style["answer"]} onClick={this.onSelect}><em className={style["no_select"]}/>{answer1}</div>);
			tmp.push(<div className={style["answer"]}><em className={style["no_select"]}/>{answer2}</div>);
			tmp.push(<div className={style["answer"]}><em className={style["no_select"]}/>{answer3}</div>);
			tmp.push(<div className={style["answer"]}><em className={style["no_select"]}/>{answer4}</div>);
		}else {
			tmp.push(<textarea className={style["textarea"]}/>);
		}
		
		return tmp;
	}
	render () {
		let idx = this.props.idx;
		let question = this.props.question;
		return (
			<div className={style.list}>
				<div className={style.title}>
					<span className={style.num}>Q{idx+1}</span>
					<span className={style.question}>{question}</span>
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
