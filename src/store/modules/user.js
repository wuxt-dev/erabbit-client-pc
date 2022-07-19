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
      },
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息，payload是用户信息对象
    setUser(state, payload) {
      state.profile = payload
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    }
  }
}
