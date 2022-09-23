import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from "antd-mobile";

export default function ArticlesByTag() {
  const navigate = useNavigate();
  const location = useLocation();
  const tag = location.state;
  console.log(tag);
  // 返回前一个页面
  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className='articles-by-tag'>
      <NavBar onBack={goBack} style={{backgroundColor: "#339999"}}>{tag.name}</NavBar>
    </div>
  )
}
