import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { formateTime } from '../../utils/timeUtil';
import "./index.css";

export default function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const {article, tag} = location.state;
    // 跳转到前一个页面
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className='article'>
            <NavBar onBack={goBack} style={{backgroundColor: "#339999"}} />
            <div className='container'>
                <h1 className='title'>{article.title}</h1>
                <div className='time-tag'>
                    <span className='tag'>
                        <i className='iconfont icon-tag' />
                        {tag.name}
                    </span>
                </div>
                <p className='description'>{article.description}</p>
                <div className='content'>{article.content}</div>
                <p className='update-time'>上次修改: {formateTime(article.updateTime)}</p>
                <p className='update'>
                    <i className='iconfont icon-bianji' />
                    <a href='javascrip:;'>修改</a>
                </p>
            </div>
        </div>
    )
}
