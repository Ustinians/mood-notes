import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Toast } from 'antd-mobile';
import Captcha from "react-captcha-code";
import { reqRegister, reqLogin, reqUserDetail } from '../../api';
import cookie from 'react-cookies'; // 引入Cookie用于存储用户登录后的token
import userUtil from "../../utils/userUtil.js";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  const token = cookie.load("token");
  if(token) {
    navigate("/");
  }
  const [type, setType] = useState("login"); // 登录or注册
  const [verify, setVerify] = useState(""); // 输入的验证码
  const [captcha, setCaptcha] = useState(""); // 验证码
  const userRef = useRef();
  // 提交表单成功
  const onFinish = async (values) => {
    const { username, password, isAgree } = values;
    if(!username || username === "") {
      Toast.show({
        icon: 'fail',
        content: '用户名不能为空!',
      });
      return ;
    }
    else if(!password || password === "") {
      Toast.show({
        icon: 'fail',
        content: '密码不能为空!',
      });
      return ;
    }
    else if(!verify || verify === "") {
      Toast.show({
        icon: 'fail',
        content: '验证码不能为空!',
      });
      return ;
    }
    else if(!isAgree) {
      Toast.show({
        icon: 'fail',
        content: '密码不能为空!',
      });
      return ;
    }
    else if(verify !== captcha) {
      Toast.show({
        icon: 'fail',
        content: '验证码错误!',
      });
      return ;
    }
    if(type === "login") {
      const result = await reqLogin(username, password);
      if(result.code === 200) {
        Toast.show({
          icon: 'success',
          content: '登录成功',
        });
        console.log(result.data.token);
        cookie.save("token", result.data.token); // 存储用户的token
        navigate("/");
        const userResult = await reqUserDetail(); // 获取用户详细信息
        if(userResult.code === 200) {
          userUtil.saveUser(userResult.data); // 将用户信息存储到localStorage中
        }
        else {
          Toast.show({
            icon: 'fail',
            content: '获取用户信息失败!',
          });
        }
      }
      else {
        Toast.show({
          icon: 'fail',
          content: '登录失败',
        });
      }
      userRef.current.resetFields();
    }
    else {
      const result = await reqRegister(username, password);
      if(result.code === 200) {
        Toast.show({
          icon: 'success',
          content: '注册成功',
        });
        setType("login"); // 跳转到登录
        console.log(result.data);
      }
      else {
        Toast.show({
          icon: 'fail',
          content: '注册失败',
        });
        userRef.current.resetFields();
      }
    }
  }
  // 提交表单失败
  const onFinishFailed = (err) => {
    console.log("提交表单失败: ", err);
  }
  // 点击刷新验证码的回调方法
  const handleCatpchaChange = useCallback((captcha) => {
    console.log("验证码: ", captcha);
    setCaptcha(captcha);
  }, [])
  return (
    <div className='auth'>
      <div className='head' />
        <div className="tab">
          <span className={ type === 'login' ? "avtive" : "" } onClick={() => {
            setType('login');
            userRef.current.resetFields();
          }}>登录</span>
          <span className={ type === 'register' ? "avtive" : "" } onClick={() => {
            setType('register')
            userRef.current.resetFields();  
          }}>注册</span>
        </div>
      <div className='form'>
        <Form 
          ref={userRef}
          layout='horizontal' 
          mode='card'
          footer={
            <Button block type='submit' color='primary' size='large'>
              {type === 'login' ? '登录' : '注册'}
            </Button>
          }  
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label='账号' name="username">
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item label='密码' name="password">
            <Input placeholder='请输入密码' type="password" />
          </Form.Item>
          <Form.Item label='验证码' className='login-verify' name="verify">
            <Input placeholder='请输入验证码' onChange={value => setVerify(value)} />
          </Form.Item>
          <div className='login-captcha'>
            <Captcha charNum={4} onChange={handleCatpchaChange} />
          </div>
          <Form.Item name="isAgree">
            <Checkbox value='isAgree'>阅读并同意<a href='javascrip:;'>《随心手札条款》</a></Checkbox>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
