<template>
    <div class="content">
        <div class="content-header">
            {{activeChat.name}}
        </div>
        <el-divider content-position="center"></el-divider>
        <div class="content-chat-box">
            {{currentChatLists}}
        </div>
        <div class="content-send-box">
            <div class="content-send-box-toolbar">
                <span class="icon-group">
                    <f-icon font-size="23px" name="xiaolian"></f-icon>
                    <f-icon font-size="23px" name="tupian"></f-icon>
                    <f-icon font-size="23px" name="wenjian"></f-icon>
                </span>
                <el-button @click="openDrawer" size="mini">聊天记录</el-button>
            </div>
            <div class="content-send-box-input">
                <el-input
                        v-model="chatMsg"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        :autosize="{minRows: 4, maxRows: 4}"
                        @keyup.enter.native="onEnter"
                >
                </el-input>
            </div>
        </div>
        <el-drawer

                :visible.sync="drawerShow"
                v-loading="drawerLoading"
                direction="rtl"
        >
            <div class="chatLists">
                <li :class="{right:user.id===list.fromid}" v-for="list in chatLists">
                    <img :src="`http://127.0.0.1:8080${list.avatar}`">
                    <div class="">
                        <div class="header">
                            {{transformDate(list.timestamp)}}
                        </div>
                        <div class="content">
                            {{list.content}}
                        </div>
                    </div>
                </li>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import dayjs from 'dayjs'
    import axios from 'axios'

    export default {
        name: "boxContent",
        computed: {
            ...mapGetters([
                'getPage',
                'activeChat',
                'IM',
                'user'
            ])
        },
        data() {
            return {
                chatMsg: '',
                drawerShow: false,
                drawerLoading: false,
                chatLists: [],
                currentChatLists: [],
            }
        },
        methods: {
            openDrawer() {
                this.drawerShow = true
                this.getChatRecordData()
            },
            transformDate(date) {
                return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
            },
            getChatRecordData() {
                let data = new FormData()
                let token = this.IM.getToken()
                data.append('chatId', this.activeChat.id)
                data.append('chatType', this.activeChat.type)
                data.append('fromId', this.user.id)
                data.append('pageNo', 1)
                data.append('access_token', token)
                this.drawerLoading = true
                axios.post('http://127.0.0.1:8080/api/message/list', data).then(res => {
                    let {messageList} = res.data
                    this.chatLists = messageList.reverse()
                    console.log(messageList)
                }).finally(() => this.drawerLoading = false)
            },
            onEnter() {
                this.IM.send(this.chatMsg)
                this.chatMsg = ''
            },
            watchIM(){
                this.IM.onCurrentChat((list)=>{
                    console.log(list)
                    this.currentChatLists = list
                })
            }
        },
        watch:{
            IM(){
                this.watchIM()
            }
        }
    }
</script>

<style lang="scss">
    .content {
        width: 100%;
        color: #545c64;

        &-header {
            display: flex;
            align-items: flex-end;
            height: 55px;
            padding-left: 20px;
        }

        &-chat-box {
            height: calc(100vh - 300px);
            border-bottom: 1px solid #DCDFE6;
        }

        &-send-box {
            &-toolbar {
                position: relative;
                padding: 7px;
                height: 35px;

                .icon-group {
                    margin-left: 5px;

                    svg {
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }

                button {
                    position: absolute;
                    right: 10px;
                }
            }

            &-input {
                margin-top: 10px;
                margin-left: 10px;

                textarea {
                    border: none;
                    background-color: inherit;
                }
            }
        }

        .chatLists {
            overflow: auto;
            height: calc(100vh - 100px);
            padding: 5px 15px;

            li {
                display: flex;
                font-size: 12px;
                color: #96989c;
                align-items: flex-start;
                list-style: none;
                margin-bottom: 23px;

                img {
                    width: 33px;
                }

                .content {
                    word-break: break-word;
                    max-width: 280px;
                    margin-left: 9px;
                    padding: 10px 8px;
                    text-align: left;
                    background-color: #cbdcf1;
                    color: #181818;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    border-radius: 6px;
                    position: relative;

                    &::after {
                        content: "";
                        position: absolute;
                        left: -10px;
                        top: 13px;
                        width: 0;
                        height: 0;
                        border-style: solid dashed dashed;
                        border-color: #e2e2e2 transparent transparent;
                        overflow: hidden;
                        border-width: 10px;
                        right: -10px;
                        border-top-color: #cbdcf1;
                    }
                }
            }

            .right {
                justify-content: flex-start;
                flex-direction: row-reverse;

                .content {
                    margin-left: -9px;

                    &::after {
                        left: auto;
                    }
                }
            }
        }
    }

    .el-divider {
        margin: 6px 0 !important;
    }
</style>
