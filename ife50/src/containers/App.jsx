import React from 'react'
import Edit from './Edit.jsx'
import Home from './Home.jsx'
import Add from './add.jsx'
import Statistic from './Statistic.jsx'
import style from '../style/Header.less'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'


export default class App extends React.Component{
    render() {
        return (
            <Router>
                <div className={style.wrapper}>
                    <div className={style.header}>
                        <h1 className={style.title}>问卷管理</h1>
                        <Link to="/statistic" className={style.link}><h2 className={style.tab}>我的问卷</h2></Link>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/edit" component={Edit}/>
                        <Route path="/add" component={Add}/>
                        <Route path="/statistic" component={Statistic}/>
                    </Switch>
                </div>
            </Router>
        )
    }

}