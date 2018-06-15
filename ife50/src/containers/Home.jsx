import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as QuestionnaireActions from '../redux/actions/questionnaires'
import * as DialogActions  from '../redux/actions/dialog'
import {RADIO, CHECKBOX, TEXT} from "../constants/QuestionTypes"
import {UNRELEASED, CLOSED, RELEASED} from "../constants/QuestionnaireStatusTypes"
import style from '../style/Home.less'
import {isArray, isInteger, cloneObject} from "../common/util"
import {addQuestionnaire} from "../redux/actions/questionnaires";

const mapStateToProps = (state) => {
    return{
        state,
        questionnaires: state.questionnaires,
        dialog: state.dialog
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        actions: Object.assign(
            {},
            bindActionCreators(QuestionnaireActions, dispatch),
            bindActionCreators(DialogActions, dispatch)
        )
    }
}

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        	isShow: false
		}
		this.addQuestionnaire = this.addQuestionnaire.bind(this)
    }

    componentWillMount() {
        const {questionnaires: {list}, actions:{closeQuestionnaire}} = this.props
        console.log('--------------')
        console.log(this.props)
        const now = new Date().getTime() - 86400000
        list.forEach((questionnaire, questionnaireIndex) => {
            questionnaire.status === RELEASED && questionnaire.time < now && closeQuestionnaire(questionnaireIndex)
        })
    }
    componentDidMount () {
        this.table = this.refs['table']
    }
	addQuestionnaire() {
    	console.log('go')
    	this.props.history.push("/add")
	}
    render() {
        return(
            <div className={style.container}>
                <table width="100%" cellPadding="0" cellSpacing="0" ref="table">
                    <thead>
                    <tr>
                        <th width="30%">标题</th>
                        <th width="15%">时间</th>
                        <th width="15%">状态</th>
                        <th width="27%">操作<button className={style.new} onClick={this.addQuestionnaire}><span>+</span>新建问卷</button></th>
                    </tr>
                    </thead>
                    <tbody className={style.content}>
                    <tr>
                        <td><span className={style.lspan}></span>这是我的第一份问卷</td>
                        <td>2018-01-12</td>
                        <td>已结束</td>
                        <td>
                            <button>删除</button>
                            <button>查看数据</button>
                        </td>
                    </tr>
                    <tr>
                        <td><span className={style.lspan}></span>这是我的第二份问卷</td>
                        <td>2018-01-12</td>
                        <td>未发布</td>
                        <td>
                            <button>编辑</button>
                            <button>删除</button>
                            <button>查看数据</button>
                        </td>
                    </tr>
                    <tr>
                        <td><span className={style.lspan}></span>这是我的第三份问卷</td>
                        <td>2018-01-12</td>
                        <td>发布中</td>
                        <td>
                            <button>编辑</button>
                            <button>删除</button>
                            <button>查看数据</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className={style.wrap}>
                    <div className={style.del}><span className={style.all}></span>全选
                        <button className={style.btn}>删除</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home