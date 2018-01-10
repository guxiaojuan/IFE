import React from 'react'
import Header from './Header.jsx'
import Home from './Home.jsx'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


export default class App extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">问卷管理</Link></li>
                        <li><Link to="/my">我的问卷</Link></li>
                    </ul>

                    <Route exact path="/" component={Header}/>
                    <Route path="/my" component={Header}/>
                </div>
            </Router>
        )
    }

}