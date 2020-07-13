import Vue from 'vue'
import App from './app'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
Vue.use(elementUI)
new Vue({
   ...App,
   store,
   router
}).$mount('#app')
