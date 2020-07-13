<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: "app",
        components: {
        },
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }

    * {
        box-sizing: border-box;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    }

    #app {
        width: 100%;
        height: 100vh;
        scroll-behavior: smooth;
        overflow-x: hidden;
    }
</style>
