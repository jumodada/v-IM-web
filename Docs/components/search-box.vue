<template>
    <div class="search-box">
        <ul v-if="!(boxLists[0]&&boxLists[0].userList)" class="search-box-lists">
            <li :class="{active:list._isActive}" @click="toChat(list)" v-for="list in boxLists">
                <img width="30px" :src="`http://127.0.0.1:8080${list.avatar}`" alt="">
                {{list.name}}
            </li>
        </ul>
        <ul v-else style="color: #545c64">
            <ul class="search-box-lists" v-for="list in boxLists">
                <span style="margin: 10px">{{list.name}}</span>
                <li :class="{active:li._isActive}" @click="toChat(li)" v-for="li in list.userList">
                    <img width="30px" :src="`http://127.0.0.1:8080${li.avatar}`" alt="">
                    {{li.name}}
                </li>
            </ul>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    const listsName = {
        '1': 'chatLists',
        '2': 'friendLists',
        '3': 'groupLists',
    }
    export default {
        name: "search-box",
        data() {
            return {
                chatLists: [],
                friendLists: [],
                groupLists: [],

            }
        },
        computed: {
            ...mapGetters([
                'getPage',
                'IM'
            ]),
            boxLists() {
                return this[listsName[this.getPage]]
            }
        },
        methods: {
            toChat(data) {
                if (this.getPage !== '1') {
                    this.$store.commit('setPage', '1')
                }
                this.IM.activeChat(data)
            },
            watchIM() {
                this.IM.watcher.chatList((val) => this.chatLists = val)
                this.IM.watcher.friendsList(val => this.friendLists = val)
                this.IM.watcher.groupLists(val => this.groupLists = val)
                this.IM.watcher.currentChat(val => this.$store.commit('setActiveChat', val))
                this.IM.onmessage((e) => {

                })
            }
        },
        mounted() {

        },
        watch: {
            IM() {
                this.watchIM()
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

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            color: #545c64;
            list-style: none;
            width: 200px;
            font-size: 14px;
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-bottom: 1px solid #dcdcdc;

            img {
                margin-right: 30px;
            }

            &.active {
                background-color: #e3e3e3;
            }
        }
    }
</style>
