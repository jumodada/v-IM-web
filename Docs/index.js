import Vue from 'vue'
import App from './app'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Icon from './components/icon'
Vue.use(elementUI)
Vue.use(Icon)
new Vue({
   ...App,
   store,
   router
}).$mount('#app')
