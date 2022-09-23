/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import cookie from 'react-cookies'; // 引入Cookie用于存储用户登录后的token
import routes from "./routes"; // 引入路由数组
import NavBar from './components/NavBar';
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const token = cookie.load("token");
  if(!token) {
    navigate("/login");
  }
  const location = useLocation(); // 获取路径信息
  const { pathname } = location; // 获取当前路径
  const navList = ["/", "/articles", "/user"]; // 需要底部导航栏的路径列表
  const [showNav, setShowNav] = useState(false); // 是否展示底部导航栏
  const elements = useRoutes(routes); // 根据路由列表构建路由
  useEffect(() => {
    // 当路径信息发生变化的时候,动态设置showNav
    setShowNav(navList.includes(pathname)); // 看当前路径是否属于navList
  }, [pathname])
  return (
    <div className='app'>
      {elements}
      <NavBar showNav={showNav} pathname={pathname} />
    </div>
  )
}
