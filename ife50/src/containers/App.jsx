import React from 'react'
import Edit from './Edit.jsx'
import Home from './Home.jsx'
import Add from './add.jsx'
import chartData from './chartData.jsx'
import style from '../style/Header.less'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import 'antd/dist/antd.css'


export default class App extends React.Component{
    render() {
        return (
            <Router>
                <div className={style.wrapper}>
                    <div className={style.header}>
                        <div className={style.title}>问卷管理</div>
                        <div className={style.link}>我的问卷</div>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/edit/:idx" component={Edit}/>
                        <Route path="/add" component={Add}/>
                        <Route path="/chartData/:tab" component={chartData}/>
                    </Switch>
                </div>
            </Router>
        )
    }

}