import React from 'react'
import style from '../style/Home.less'

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
                        <th width="27%">操作<button>新建问卷</button></th>
                    </tr>
                    </thead>
                    <tbody className={style.content}>
                    <tr>
                        <td>这是我的第一份问卷</td>
                        <td>2018-01-12</td>
                        <td>已结束</td>
                        <td>
                            <button>删除</button>
                            <button>查看数据</button>
                        </td>
                    </tr>
                    <tr>
                        <td>这是我的第二份问卷</td>
                        <td>2018-01-12</td>
                        <td>未发布</td>
                        <td>
                            <button>编辑</button>
                            <button>删除</button>
                            <button>查看数据</button>
                        </td>
                    </tr>
                    <tr>
                        <td>这是我的第三份问卷</td>
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
            </div>
        )
    }
}