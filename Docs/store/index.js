import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        im:null,
        page: '1'
    },
    getters: {
        IM: state => state.im,
        getPage: state => state.page,
    },
    mutations: {
        setPage(state, data) {
            state.page = data
        },
        setIM(state, data) {
            state.im = data
        }

    }
})
