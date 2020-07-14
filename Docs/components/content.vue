<template>
    <div class="content" >
        <div class="content-header">

        </div>
        <el-divider content-position="center"></el-divider>
        <div class="content-chat-box">

        </div>
        <div class="content-send-box">
            <div class="content-send-box-toolbar">
                <span class="icon-group">
                    <f-icon font-size="23px" name="xiaolian"></f-icon>
                    <f-icon font-size="23px" name="tupian"></f-icon>
                    <f-icon font-size="23px" name="wenjian"></f-icon>
                </span>
                <el-button  size="mini">聊天记录</el-button>
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
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "boxContent",
        computed: {
            ...mapGetters([
                'getPage',
            ])
        },
        data(){
            return {
                chatMsg:''
            }
        },
        methods:{
            onEnter(){
                console.log(123)
            }
        }
    }
</script>

<style lang="scss">
    .content {
        width: 100%;
        color: #545c64;
        &-header{
            display: flex;
            align-items: flex-end;
            height: 55px;
            padding-left: 20px;
        }
        &-chat-box{
            height: calc(100vh - 300px);
            border-bottom: 1px solid #DCDFE6;
        }
        &-send-box{
            &-toolbar{
                position: relative;
                padding: 7px;
                height: 35px;
                .icon-group{
                    margin-left: 5px;
                    svg{
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }
                button{
                    position: absolute;
                    right: 10px;
                }
            }
            &-input{
                margin-top: 10px;
                margin-left: 10px;
                textarea{
                    border: none;
                    background-color: inherit;
                }
            }
        }
    }
    .el-divider{
        margin: 6px 0 !important;
    }
</style>
