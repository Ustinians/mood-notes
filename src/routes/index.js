/* eslint-disable import/no-anonymous-default-export */
/**
 * @ 该文件用于配置路由数组
 */

// 引入路由组件
import Login from "../pages/Login";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import User from "../pages/User";
import Article from "../pages/Article";
import AddArticle from "../pages/AddArticle";
import ArticlesByTag from "../pages/ArticlesByTag";

// 编写路由数组
export default [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/articles",
        element: <Articles />
    },
    {
        path: "/user",
        element: <User />
    },
    {
        path: "/article/:id",
        element: <Article />
    },
    {
        path: "/add/article",
        element: <AddArticle />
    },
    {
        path: "/tag-articles/:id",
        element: <ArticlesByTag />
    }
]