import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
       page:'1'
    },
    getters:{
      getPage:state => state.page
    },
    mutations: {
        setPage(state,data){
            state.page = data
        }
    }
})
