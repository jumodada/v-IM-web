<template>
    <div class="search-box">
        <ul  class="search-box-lists">
            <li :class="{active:list._isActive}" @click="toChat(list)" v-for="list in boxLists">
                <img width="30px" :src="`http://127.0.0.1:8080${list.avatar}`" alt="">
                {{list.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    const listsName = {
        '1':'chatLists',
        '2':'getFriends',
        '3':'getGroups',
    }
    export default {
        name: "search-box",
        data(){
            return {
                chatLists:[]
            }
        },
        computed:{
            ...mapGetters([
                'getGroups',
                'getPage',
                'getFriends',
                'IM'
            ]),
            boxLists(){
                return this[listsName[this.getPage]]
            }
        },
        methods:{
            toChat(data){
                if(this.getPage!=='1'){
                    this.$store.commit('setPage','1')
                }
                this.IM.activeChat(data)
                this.$store.commit('setActiveChat',data)
            },
            watchChatLists(){
                this.$nextTick(()=>{
                    this.chatLists = this.IM.getChatList()
                    this.IM.watcher.chatList((val)=>{
                        this.chatLists = val
                        console.log(this.chatLists)
                    })
                })
            }
        },
        mounted() {

        },
        watch:{
            IM(){
                this.watchChatLists()
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-box {
        width: 200px;
        max-width: 200px;
        min-width: 200px;
        background: #f8f8f8;
        height: 100vh;
        box-shadow: 3px 0 4px 2px rgba(0, 0, 0, 0.15);
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        ul{
            list-style: none;
            padding: 0;
        }
        li{
            color: #545c64;
            list-style: none;
            width: 200px;
            font-size: 14px;
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-bottom: 1px solid #dcdcdc;
            img{
                margin-right: 30px;
            }
            &.active{
                background-color: #e3e3e3;
            }
        }
    }
</style>
