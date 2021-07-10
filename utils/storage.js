/*
 * @Descripttion: 统一的本地存储
 * @Author: pujianguo
 * @Date: 2021-04-02 14:00:14
 */

const TOKEN = 'token'
const USERINFO = 'userinfo'

export default {
  // token
  setToken: token => {
    window.localStorage.setItem(TOKEN, token)
  },
  getToken: () => {
    return window.localStorage.getItem(TOKEN)
  },
  rmToken: () => {
    window.localStorage.removeItem(TOKEN)
  },

  // userinfo
  setUserInfo: info => {
    window.localStorage.setItem(USERINFO, JSON.stringify(info))
  },
  getUserInfo: () => {
    const i = window.localStorage.getItem(USERINFO)
    return i ? JSON.parse(i) : null
  },
  rmUserInfo: () => {
    window.localStorage.removeItem(USERINFO)
  },
}
