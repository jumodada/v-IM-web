import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        im: null,
        page: '1',
        user:{},
        activeChat: {}
    },
    getters: {
        IM: state => state.im,
        getPage: state => state.page,
        user:state => state.user,
        activeChat: state => state.activeChat
    },
    mutations: {
        setPage(state, data) {
            state.page = data
        },
        setIM(state, data) {
            state.im = data
        },
        setActiveChat(state, data) {
            state.activeChat = data
        },
        setUser(state,data){
            state.user = data
        }

    }
})
