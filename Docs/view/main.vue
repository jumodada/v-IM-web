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
            this.IMInit()
            this.getUserData()
        },
        methods:{
            IMInit(){
                let ke = new IM('ws://127.0.0.1:9326','908ef1dc-5830-4808-b44a-92adf4b64d80',{friends:{},me:{},groups:{}})
                this.$store.commit('setIM',ke)
                ke()
            },
            getUserData(){
                let data = new FormData()
                data.append('access_token','908ef1dc-5830-4808-b44a-92adf4b64d80')
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
