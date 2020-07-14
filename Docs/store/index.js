import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        im:null,
        page: '1',
        groups:[],
        friends:[],
        activeChat:{}
    },
    getters: {
        IM: state => state.im,
        getPage: state => state.page,
        getGroups: state => state.groups,
        getFriends: state => state.friends[0].userList,
        activeChat: state => state.activeChat
    },
    mutations: {
        setPage(state, data) {
            state.page = data
        },
        setGroups(state, data) {
            state.groups = data
        },
        setFriend(state, data) {
            state.friends = data
        },
        setIM(state, data) {
            state.im = data
        },
        setActiveChat(state,data){
            state.activeChat = data
        }

    }
})
