/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: 2021-06-29 11:02:31
 */

import storage from 'lisa/utils/storage'

const state = {
  token: '',
  pageOption: {},
}

export default {
  namespaced: true,
  state,
  actions: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.setToken(token)
    },

    // 设置初始数据
    SET_INITDATA_FROM_STORAGE (state, { token }) {
      if (token) {
        state.token = token
      }
    },
  },
}
