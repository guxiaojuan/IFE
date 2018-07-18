import React, {PropTypes} from 'react';
import style from '../style/Home.less';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        	isShow: false,
			questionnaire: JSON.parse(localStorage.getItem('questionnaire')) || []
		}
		this.addQuestionnaire = this.addQuestionnaire.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentWillMount() {
    }
    componentDidMount () {
    }
	addQuestionnaire() {
    	this.props.history.push("/add")
	}
	formatDate (questionDate){
		let date = new Date(questionDate);
		let year = date.getFullYear();
		let month = parseInt(date.getMonth());
		let day = parseInt(date.getDay());
		let str = year + '-' + (month >= 10?month: '0'+month) + '-' + (day >= 10?day: '0'+day);
		return str;
	}
	edit (i) {
    	this.props.history.push("/edit/" + i);
	};
    delete (i) {
		let questionnaire = this.state.questionnaire;
		questionnaire.splice(i,1);
		this.setState({
			questionnaire: questionnaire
		})
		localStorage.setItem('questionnaire', JSON.stringify(questionnaire));
	};
    goChart (i) {
    	console.log(i)
    	this.props.history.push("/chartData/" + i);
	};
	renderList () {
    	let questionnaire = this.state.questionnaire
    	let len = questionnaire.length;
		let arr = [];
    	if (len > 0) {
    		for(let i=0; i<len; i++) {
    			let deadline = questionnaire[i].questionDate;
    			let now = new Date().getTime();
    			if (now <= deadline) {   //问卷还未截止
					if (questionnaire[i].isPublish) {   //已发布
						arr.push(
							<tr>
								<td><span className={style.lspan}></span>{questionnaire[i].questionTitle}</td>
								<td>{this.formatDate(deadline)}</td>
								<td>已发布</td>
								<td>
									<button onClick={this.edit.bind(this, i)}>编辑</button>
									<button onClick={this.delete.bind(this,i)}>删除</button>
									<button onClick={this.goChart.bind(this,i)}>查看数据</button>
								</td>
							</tr>
						)
					}else {              //未发布
						arr.push(
							<tr>
								<td><span className={style.lspan}></span>{questionnaire[i].questionTitle}</td>
								<td>{this.formatDate(deadline)}</td>
								<td>未发布</td>
								<td>
									<button onClick={this.edit.bind(this, i)}>编辑</button>
									<button onClick={this.delete.bind(this,i)}>删除</button>
									<button onClick={this.goChart.bind(this,i)}>查看数据</button>
								</td>
							</tr>
						)
					}

				}else {
    				arr.push(
    					<tr>
							<td><span className={style.lspan}></span>{questionnaire[i].questionTitle}</td>
							<td>{this.formatDate(deadline)}</td>
							<td>已结束</td>
							<td>
								<button onClick={this.delete.bind(this,i)}>删除</button>
								<button onClick={this.goChart.bind(this,i)}>查看数据</button>
							</td>
						</tr>
					)
				}

			}
		}
		return arr;
	}
    render() {
		let questionnaire = this.state.questionnaire
		let len = questionnaire.length;
        return len > 0 ?(
            <div className={style.container}>
                <table width="100%" cellPadding="0" cellSpacing="0" ref="table">
                    <thead>
                    <tr>
                        <th width="30%">标题</th>
                        <th width="16%">截止时间</th>
                        <th width="12%">状态</th>
                        <th width="29%">操作<button className={style.new} onClick={this.addQuestionnaire}><span>+</span>新建问卷</button></th>
                    </tr>
                    </thead>
                    <tbody className={style.content}>
					{this.renderList()}
                    </tbody>
                </table>

                <div className={style.wrap}>
                    <div className={style.del}><span className={style.all}></span>全选
                        <button className={style.btn}>删除</button>
                    </div>
                </div>
            </div>
        ):(
			<div className={style.container}>
				<div className={style.empty}>
					<Link to="/edit/new" >暂无问卷信息, 快去新建问卷</Link>
				</div>
			</div>
		)
    }
}
