/**
 * 用于在localStorage中存取user用户信息
 */
import store from "store";
const USER_INFO = "user_info";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // 保存user信息
    saveUser(user) {
        store.set(USER_INFO, user);
    },

    // 读取用户信息
    getUser() {
        return store.get(USER_INFO) || {};
    },

    // 删除用户信息
    removeUser() {
        store.remove(USER_INFO);
    }
}