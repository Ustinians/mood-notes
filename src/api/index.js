import ajax from "./ajax";

// 用户注册
export const reqRegister = (username, password) => ajax("/api/register", { username, password }, "POST");

// 用户登录
export const reqLogin = (username, password) => ajax("/api/login", { username, password }, "POST");

// 获取当前登录用户的详细新信息
export const reqUserDetail = () => ajax("/api/user/info");

// 获取文章列表
export const reqArticles = () => ajax("/api/article/list", {} , "POST");

// 获取标签列表
export const reqTags = () => ajax("/api/tag/list");