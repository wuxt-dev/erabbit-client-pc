export default {
  namespaced: true,
  state() {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息，payload是用户信息对象
    setUser(state, payload) {
      state.profile = payload
    }
  }
}
