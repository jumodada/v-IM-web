<template>
    <div class="im-box">
        <slider></slider>
        <searchBox></searchBox>
        <boxContent></boxContent>
    </div>
</template>

<script>
    import IM from '../../src'
    import slider from "../components/slider"
    import boxContent  from '../components/content'
    import searchBox from '../components/search-box'
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    export default {
        name: "Main",
        components:{slider,boxContent,searchBox},
        computed:{
          ...mapGetters([
              'IM'
          ])
        },
        mounted() {
            this.getToken()
        },
        data(){
            return {
                token:''
            }
        },
        methods:{
            getToken(){
                let data = new FormData()
                data.append('client_id','v-client')
                data.append('client_secret','v-client-ppp')
                data.append('grant_type','password')
                data.append('scope','select')
                data.append('username','wangwu')
                data.append('password','123456')
                axios.post('http://127.0.0.1:8080/oauth/token',data).then(res=>{
                    let {access_token} = res.data
                    this.token = access_token
                    this.IMInit()
                    this.getUserData()
                })
            },
            IMInit(){
                let ke = new IM('ws://127.0.0.1:9326',this.token)
                this.$store.commit('setIM',ke)
                ke()
            },
            getUserData(){
                let data = new FormData()
                data.append('access_token',this.token)
                axios.post('http://127.0.0.1:8080/api/user/init',data).then(res=>{
                    let {data} = res
                    this.$store.commit('setPage','1')
                    this.IM.init(data)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .im-box{
        display: flex;
        height: 100vh;
    }
</style>
