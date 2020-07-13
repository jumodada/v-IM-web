<template>
    <div>
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

<style scoped>

</style>
