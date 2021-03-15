import axios from 'axios'

export const state = () => ({
    sidebar: false,
    authUser: null
})

export const mutations = {
    toggleSidebar: function(state) {
        console.log("toggleSidebar");
        state.sidebar = !state.sidebar
    },
    LOGIN: function(state, user) {
        console.log("LOGIN");
        console.log(state + ", " + user)
        state.authUser = user
    },
    LOGOUT: function() {
        console.log("LOGOUT");
        state.authUser = null
    },
    SET_USER: function(state, user) {
        console.log("SET_USER");
        state.authUser = user
    },
    SET_MENU: function(state, data) {
        console.log("SET_MENU");
        state.topMenu = data.topMenu
        state.aside = data.aside
    }
}

export const actions = {
    // nuxtServerInit는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
    async nuxtServerInit({ commit }, { req }) {
        console.log("nuxtServerInit");
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
    },
    async login({ commit }, { id, pw }) {

        console.log("LOGIN2");
        let { data } = await axios.post('/api/login', { id, pw })
        if (!data.id) {
            throw new Error('로그인에 실패했습니다.')
        }
        commit('LOGIN', data.id)
    },
    async logout({ commit }) {
        console.log("logout2");
        await axios.post('/api/logout').then(() => commit('LOGOUT'))
    }
}