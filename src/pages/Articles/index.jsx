import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, List, Toast } from 'antd-mobile';
import { reqTags } from '../../api';
import { formateTime } from '../../utils/timeUtil';
import "./index.css";

export default function Articles() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getTags();
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
  // 跳转到tag的文章页面
  const goTagArticles = (tag) => {
    navigate(`/tag-articles/${tag._id}`, {replace: false,state: tag});
  }
  return (
    <div className='articles'>
      <NavBar style={{backgroundColor: "#339999"}} back={null}>文章</NavBar>
      <div className='container'>
        <List>
          {
            tags.map(item => <List.Item>
              <div className='ont-tag' onClick={() => goTagArticles(item)}>
                <h1 className='name'>{item.name}</h1>
                <p className='description'>{item.description}</p>
                <div className='detail'>
                  <span className='create-time'>创建时间: {formateTime(item.createTime)}</span>
                </div>
              </div>
            </List.Item>)
          }
        </List>
      </div>
    </div>
  )
}
