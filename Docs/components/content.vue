<template>
    <div class="content">
    {{getPage}}
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "boxContent",
        computed:{
            ...mapGetters([
                'getPage'
            ])
        }
    }
</script>

<style scoped lang="scss">
    .content{
        width: 100%;
    }
</style>
