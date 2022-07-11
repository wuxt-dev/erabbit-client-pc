import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPersistedState({
      // 本地存储名字
      key: 'erabbit-client-pc',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
