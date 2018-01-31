import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as QuestionnaireActions from '../redux/actions/questionnaires'
import * as DialogActions  from '../redux/actions/dialog'
import {RADIO, CHECKBOX, TEXT} from "../constants/QuestionTypes"
import {UNRELEASED, CLOSED, RELEASED} from "../constants/QuestionnaireStatusTypes"
import style from '../style/Home.less'
import {isArray, isInteger} from "../common/util"
import questionnaires from "../redux/reducers/questionnaires"
import dialog from "../redux/reducers/dialog";


const testOptions = (props, propName, componentName) => {
    if(props.type !== TEXT && !(props.options && isArray(props.options)) && props.options.every((key) => typeof key === 'string')){
        return new Error(`Invalid prop ${propName} supplied to ${componentName}`)
    }
}
const testIsRequired = (props, propName, componentName) => {
    if(props.type === TEXT && typeof props.isRequired !== 'boolean'){
        return new Error(`Invalid prop ${propName} supplied to ${componentName}`)

    }
}
const testIndex = (props, propName, componentName) => {
    if(!(isInteger(props[propName]) && props[propName] >= -1)){
        return new Error(`Invalid prop ${propName} supplied to ${componentName}`)
    }
}
const mapStateToProps = (state) => {
    return{
        questionnaires: state.questionnaires,
        dialog: state.dialog
    }
}
const mapDispatchToProps =(dispatch) =>{

}

export default class Home extends React.Component{
    render() {
        return (
            <div className={style.container}>
                <table width="100%" cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        <th width="30%">标题</th>
                        <th width="15%">时间</th>
                        <th width="15%">状态</th>
                        <th width="27%">操作<button className={style.new}><span>+</span>新建问卷</button></th>
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