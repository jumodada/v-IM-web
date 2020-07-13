<template>
    <div>

    </div>
</template>

<script>
    import IM from '../../src'
    export default {
        name: "Main",
        mounted() {
            let ke = new IM('ws://127.0.0.1:9326','cde6e6c1-1015-4a72-a60b-a0717048338b',{friends:{},me:{},groups:{}})
            ke()

        }
    }
</script>

<style scoped>

</style>
