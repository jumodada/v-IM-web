import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        im:null,
        page: '1',
        groups:[],
        friends:[]
    },
    getters: {
        IM: state => state.im,
        getPage: state => state.page,
        getGroups: state => state.groups,
        getFriends: state => state.friends[0].userList,
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

    }
})
