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
    export default {
        name: "Main",
        components:{slider,boxContent,searchBox},
        mounted() {
            this.getToken()
            this.IMInit()
            this.getUserData()
        },
        data(){
            return {
                token:''
            }
        },
        methods:{
            getToken(){
                axios.post('http://127.0.0.1:8080/oauth/token',{
                    client_id: 'v-client',
                    client_secret: 'v-client-ppp',
                    grant_type: 'password',
                    scope: 'select',
                    username: 'wangwu',
                    password: 123456
                }).then(res=>{
                    console.log(res)
                })
            },
            IMInit(){
                let ke = new IM('ws://127.0.0.1:9326','7cd9ba2c-22e7-4df5-ab29-33fbe8e989ed',{friends:{},me:{},groups:{}})
                this.$store.commit('setIM',ke)
                ke()
            },
            getUserData(){
                let data = new FormData()
                data.append('access_token','7cd9ba2c-22e7-4df5-ab29-33fbe8e989ed')
                axios.post('http://127.0.0.1:8080/api/user/init',data).then(res=>{
                    let {data} = res
                    console.log(data)
                    this.$store.commit('setFriend',data.friends)
                    this.$store.commit('setGroups',data.groups)
                    this.$store.commit('setPage','1')
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
