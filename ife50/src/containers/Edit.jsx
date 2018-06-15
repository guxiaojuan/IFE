import React from 'react'
import style from '../style/Edit.less'


export default class Edit extends React.Component{
	constructor(props) {
		super(props);
		this.addSelection = this.addSelection.bind(this)
	}
	addSelection () {

	}
    render(){
        return(
            <div className={style.container}>
				<div className={style.title}>
					<input placeholder="这里是标题"/>
				</div>

				<div className={style.content}>
					<ul></ul>
					<button>
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
			</div>
        )
    }
}