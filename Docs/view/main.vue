<template>
    <div>

    </div>
</template>

<script>
    import IM from '../../src'
    export default {
        name: "Main",
        mounted() {
            IM('127.0.0.1','ebf6f243-4c8f-4bef-8b35-c344ddbac76f',{friends:{},me:{},groups:{}})
        }
    }
</script>

<style scoped>

</style>
