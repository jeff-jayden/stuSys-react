import React from 'react'
import {useState, useRef} from "react";
import './App.css'
import orderBy from 'lodash/orderBy'
import {v4 as uuid} from 'uuid'
import dayjs from "dayjs";

const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: 'hyh',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    }
]

const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar: '',
    // 用户昵称
    uname: 'hyh',
}

const tabs = [
    {
        type: 'hot', text: '最热'
    },
    {
        type: 'time', text: '最新'
    }
]


function Comment() {

    const [activeTab, setActiveTab] = useState('hot')
    const [list, setList] = useState(defaultList)

    //删除评论
    const onDelete = rpid => {
        setList(list.filter(item => item.rpid !== rpid))
    }

    //Tab高亮切换
    const onToggle = type => {
        setActiveTab(type)
        let newList
        if (type === 'time') {
            newList = orderBy(list, 'ctime', 'desc')
        } else {
            newList = orderBy(list, 'like', 'desc')
        }
        setList(newList)
    }

    //发表评论
    const [content, setContent] = useState('')
    const inputRef = useRef(null)
    const handlePublish = () => {
        setList([
            ...defaultList,
            {
                rpid: uuid(),
                user: {
                    uid: '30009257',
                    avatar,
                    uname: 'hyh',
                },
                content: content,
                ctime: dayjs(new Date()).format('MM-DD hh:mm'),
                like: 66,
            }
        ])
        setContent('')
        inputRef.current.focus()
    }

    return (
        <div className="app">
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{list.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map(item => {
                            return (
                                <div
                                    key={item.type}
                                    className={
                                        item.type === activeTab ? 'nav-item active' : 'nav-item'
                                    }
                                    onClick={() => onToggle(item.type)}
                                >
                                    {item.text}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            ref={inputRef}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handlePublish}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {list.map(item => {
                        return (
                            <div key={item.rpid} className="reply-item">
                                {/* 头像 */}
                                <div className="root-reply-avatar">
                                    <div className="bili-avatar">
                                        <img
                                            className="bili-avatar-img"
                                            src={item.user.avatar}
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div className="content-wrap">
                                    {/* 用户名 */}
                                    <div className="user-info">
                                        <div className="user-name">{item.user.uname}</div>
                                    </div>
                                    {/* 评论内容 */}
                                    <div className="root-reply">
                                        <span className="reply-content">{item.content}</span>
                                        <div className="reply-info">
                                            {/* 评论时间 */}
                                            <span className="reply-time">{item.ctime}</span>
                                            {/* 评论数量 */}
                                            <span className="reply-time">点赞数:{item.like}</span>
                                            {user.uid === item.user.uid && (
                                                <span
                                                    className="delete-btn"
                                                    onClick={() => {
                                                        onDelete(item.rpid)
                                                    }}
                                                >删除</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );


    //修改对象状态
    /*const [form, setFrom] = useState({
        name: 'jack'
    })

    const handleChangeName = () => {
        setFrom({
            ...form,
            name: 'john'
        })
    }*/

    //状态的修改规则
    /*const [count, setCount] = useState(0);

    const handClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={handleChangeName}>{form.name}</button>
            <button onClick={handClick}>{count}</button>
        </div>
    );
*/
    /* return (
         <div>
             <Button/>
         </div>
     );*/

    /* const clickHandl = (name,e) => {
         console.log('函数',name,e)
     }
     return (
         <button onClick={(e)=>{clickHandl('zs',e)}}>click</button>
     );*/
}

export default Comment;
