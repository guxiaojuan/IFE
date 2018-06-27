import React from 'react'
import {connect} from 'react-redux'
import Question from '../components/question.jsx'
import style from '../style/Edit.less'
import edit from "../redux/reducers/edit";


class Edit extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			isPop: false,
			questionList: [],
			type: ''
		};
		this.onAdd = this.onAdd.bind(this)
		this.changeHandle = this.changeHandle.bind(this)
		this.renderSelect = this.renderSelect.bind(this)
		this.onSelectedType = this.onSelectedType.bind(this)
		this.onCancel = this.onCancel.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.onUp = this.onUp.bind(this)
		this.onDown = this.onDown.bind(this)
		this.onReuse = this.onReuse.bind(this)
		this.onDel = this.onDel.bind(this)
	}
	changeHandle (e) {
		console.log(this.inputValue.value)
	};
	onAdd (e) {
		this.setState({
			isShow: true
		});
	};
	onCancel () {
		this.setState ({
			type: '',
			isPop: false
		})
	}
	onConfirm () {
		let list = {}
		list.type = this.state.type
		list.question = this.questionVal.value
		if (this.state.type === 'single') {
			list.answer1 = this.answer1.value
			list.answer2 = this.answer2.value
		}else if(this.state.type === 'multi') {
			list.answer1 = this.answer1.value
			list.answer2 = this.answer2.value
			list.answer3 = this.answer3.value
			list.answer4 = this.answer4.value
		}
		let arr = this.state.questionList
		arr.push(list)
		this.setState ({
			type: '',
			isPop: false
		})
	}
	onSelectedType (e) {
		this.setState({
			isShow: false,
			isPop: true,
			type: e.target.dataset.type,
		})
	}
	renderSelect () {
		if(this.state.isShow) {
			return (
				<ul className={style.select_ul}>
					<li onClick={this.onSelectedType} data-type="single">单选</li>
					<li onClick={this.onSelectedType} data-type="multi">多选</li>
					<li onClick={this.onSelectedType} data-type="text">文本题</li>
				</ul>
			)
		}
	};
	onUp (idx) {
		if(idx === 0) {
			return;
		}
		let tmp = this.state.questionList[idx-1];
		this.state.questionList[idx-1] = this.state.questionList[idx];
		this.state.questionList[idx] = tmp;
	}
	onDown (idx) {
		if (idx === this.state.questionList.length -1) {
			return;
		}
		let tmp = this.state.questionList[idx+1];
		this.state.questionList[idx+1] = this.state.questionList[idx];
		this.state.questionList[idx] = tmp;
	}
	onReuse (idx) {
		let tmp = this.state.questionList;
		tmp.push(this.state.questionList[idx]);
	}
	onDel (idx) {
		let tmp = this.state.questionList;
		tmp.splice(idx, 1)
	}
	renderQuestionList () {
		return (
			<Question questionList={this.state.questionList} onUp={this.onUp} onDown={this.onDown} onReuse={this.onReuse} onDel={this.onDel}/>
		)
	}
	onPop () {
		if (this.state.isPop) {
			if(this.state.type === 'single') {
				return(
					<div className={style.full}>
						<div className={style.pop}></div>
						<div className={style.dialog}>
							<div className={style.topic}>单选题</div>
							<div className={style.question}>
								<textarea placeholder="输入你的问题" ref={(el) =>this.questionVal = el} />
							</div>
							<div className={style.answer}>
								<span>选项1:</span>
								<textarea ref={(el) => this.answer1 = el}/>
							</div>
							<div className={style.answer}>
								<span>选项2:</span>
								<textarea ref={(el) => this.answer2 = el}/>
							</div>
							<div className={style.btn}>
								<button className={style.cancel} onClick={this.onCancel}>取消</button>
								<button className={style.confirm} onClick={this.onConfirm}>确认</button>
							</div>
						</div>
					</div>
				)
			}else if(this.state.type === 'multi') {
				return (
					<div className={style.full}>
						<div className={style.pop}></div>
						<div className={style.dialog}>
							<div className={style.topic}>多选题</div>
							<div className={style.question}>
								<textarea placeholder="输入你的问题" ref={(el) =>this.questionVal = el}/>
							</div>
							<div className={style.answer}>
								<span>选项1:</span>
								<textarea ref={(el) => this.answer1 = el}/>
							</div>
							<div className={style.answer}>
								<span>选项2:</span>
								<textarea ref={(el) => this.answer2 = el}/>
							</div>
							<div className={style.answer}>
								<span>选项3:</span>
								<textarea ref={(el) => this.answer3 = el}/>
							</div>
							<div className={style.answer}>
								<span>选项4:</span>
								<textarea ref={(el) => this.answer4 = el}/>
							</div>
							<div className={style.btn}>
								<button className={style.cancel} onClick={this.onCancel}>取消</button>
								<button className={style.confirm} onClick={this.onConfirm}>确认</button>
							</div>
						</div>
					</div>
				)
			}else if (this.state.type === 'text') {
				return (
					<div className={style.full}>
						<div className={style.pop}></div>
						<div className={style.dialog}>
							<div className={style.topic}>文本题</div>
							<div className={style.question}>
								<textarea placeholder="输入你的问题" ref={(el) =>this.questionVal = el}/>
							</div>

							<div className={style.btn}>
								<button className={style.cancel} onClick={this.onCancel}>取消</button>
								<button className={style.confirm} onClick={this.onConfirm}>确认</button>
							</div>
						</div>
					</div>
				)
			}
		}
	}

    render(){
        return(
            <div className={style.container}>
				<div className={style.main}>
					<div className={style.title}>
						<input placeholder="这里是标题" type="text" onChange={this.changeHandle} ref={(el) =>this.inputValue = el}/>
					</div>
					<div className={style.list}>
						{this.renderQuestionList()}
					</div>

					<div className={style.content}>
						{this.renderSelect()}
						<button onClick={this.onAdd}>
							<span className={style.add}>添加问题</span>
						</button>
					</div>

					<div className={style.footer}>
						<div className={style.left}>
							<span>问卷截止日期</span>
							<span className={style.date}>2018-06-15</span>
						</div>

						<div className={style.right}>
							<button>保存问卷</button>
							<button>发布问卷</button>
						</div>
					</div>

					{this.onPop()}
				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => {
	console.log('----------mapStateTo----')
	console.log(state)
	return {
		state,
	}
}
const mapDispatchToProps = (dispatch) => {
	console.log(dispatch)
	return {
		dispatch
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)