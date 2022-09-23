import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { TabBar } from "antd-mobile";
import "./index.css";

export default function NavBar(props) {
  const navigate = useNavigate(); // 用于路由跳转
  const [activeKey, setActiveKey] = useState(props.pathname);
  // 路由跳转
  const changeTab = (path) => {
    setActiveKey(path);
    navigate(path);
  }
  const tabs = [ // 底部导航栏列表
    {
      key: "/",
      title: "首页",
      icon: <i className="iconfont icon-shouye" />
    },
    {
      key: "/articles",
      title: "文章",
      icon: <i className="iconfont icon-24" />
    },
    {
      key: "/user",
      title: "我的",
      icon: <i className="iconfont icon-yonghu" />
    },
  ];
  // 当showNav为false的时候,隐藏底部导航栏
  return props.showNav ? (<TabBar activeKey={activeKey} onChange={changeTab} className="tab-bar">
    {tabs.map(item => (
      <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
    ))}
  </TabBar>) : null;
}
