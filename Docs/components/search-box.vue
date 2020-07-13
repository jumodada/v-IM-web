<template>
    <div class="search-box">
        <ul  class="search-box-lists">
            <li @click="toChat(list)" v-for="list in boxLists">
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
                this.IM.addChatList(data)
            }
        },
        mounted() {
          this.$nextTick(()=>{
              console.log(this.IM.watcher)
              this.IM.watcher.chatList((a)=>{
                  console.log(a)
              })
          })
        },
        watch:{

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
            margin: 0 0 15px;
            border-bottom: 1px solid #dcdcdc;
            img{
                margin-right: 30px;
            }
        }
    }
</style>
