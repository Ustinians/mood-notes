import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddOutline } from 'antd-mobile-icons';
import { Toast, List } from 'antd-mobile';
import { reqArticles, reqTags } from '../../api';
import { formateTime } from '../../utils/timeUtil';
import "./index.css";

export default function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getTags();
    getArticles();
  }, [])
  // 获取标签列表
  const getTags = async () => {
    const result = await reqTags(); 
    if(result.code === 200) {
      setTags(result.data);
    }
    else {
      Toast.show({
        icon: "fail",
        content: "获取文章标签失败!"
      });
    }
  }
  // 获取文章列表
  const getArticles = async () => {
    const result = await reqArticles(); 
    console.log(result);
    if(result.code === 200) {
      setArticles(result.data);
    }
    else {
      Toast.show({
        icon: "fail",
        content: "获取文章列表失败!"
      });
    }
  }
  // 跳转到文章页面
  const goArticle = (id, article, tag) => {
    navigate(`/article/${id}`, {replace: false,state:{article, tag}});
  }
  // 添加文章
  const addArticle = () => {
    navigate("/add/article")
  }
  return (
    <div className='home'>
      {
        articles.map(item => {
          return <List header={item.date} key={item.date}>
          {
            item.articles.map(cItem => {
              const curTag = tags.find(item => item._id === cItem.tag_id);
              return (<List.Item key={cItem._id}>
                <div onClick={() => goArticle(cItem._id, cItem, curTag)}>
                  <p className='title'>{cItem.title}</p>
                  <p className='description'>{cItem.description}</p>
                  <span className='last-time'>上次更新时间: {formateTime(cItem.updateTime)}</span>
                  <span className='tag'>
                    <i className='iconfont icon-tag' />
                    {curTag ? curTag.name : ""}
                  </span>
                </div>
              </List.Item>);
            })
          }
        </List>
        })
      }
      <div className='add-article' onClick={addArticle}>
        <AddOutline className='add-icon' />
      </div>
    </div>
  )
}
