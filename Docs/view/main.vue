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
            let ke = new IM('ws://127.0.0.1:9326','5cf756d7-7863-4a76-ba2f-7f382069ce2f',{friends:{},me:{},groups:{}})
            ke()
            let data = new FormData()
            data.append('access_token','5cf756d7-7863-4a76-ba2f-7f382069ce2f')
            axios.post('http://127.0.0.1:8080/api/user/init',data).then(res=>{
                console.log(res)
            })
        }
    }
</script>

<style scoped lang="scss">
    .im-box{
        display: flex;
        height: 100vh;
    }
</style>
