<template>
    <div class="slider">
        <img style="width: 60px;margin: 0" src="http://127.0.0.1:8080/img/user (3).png" alt="">
        <el-menu  background-color="#545c64"
                  text-color="#fffff"
                  active-text-color="#ffd04b" @select="handleSelect" class="el-menu-vertical-demo" :collapse="true">
            <el-menu-item index="1">
                <i class="el-icon-s-comment"></i>
                <span slot="title">聊天</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-user-solid"></i>
                <span slot="title">好友</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-s-custom"></i>
                <span slot="title">群组</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "slider",
        methods:{
            handleSelect(key){
                this.$store.commit('setPage',key)
            }
        }
    }
</script>

<style lang="scss">
    .slider {
        background: #545c64;
        height:100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul{
            height:100vh;
        }
    }
    .el-menu{
        border: none !important;
    }
</style>
