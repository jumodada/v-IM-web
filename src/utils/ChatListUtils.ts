import {Chat} from "./Chat";
import {getState} from "../store";

export const ChatListUtils = {
    listKey: "_chatList",
    setChatList(userId:string, chatList:any[]) {
        localStorage.setItem(userId + this.listKey, JSON.stringify(chatList))
    },
    // 从缓存中获取已经保存的会话
    getChatList(userId:string) {
        let str = localStorage.getItem(userId + this.listKey);
        if (!str) {
            return [];
        }
        return JSON.parse(str)
    },
    // 删除聊天会话框
    delChat(userId:string, chat:any) {
        let tempChatList = [];
        for (let item of this.getChatList(userId)) {
            if (String(item.id) !== String(chat.id)) {
                tempChatList.push(item)
            }
        }
        // 放入缓存
        this.setChatList(userId, tempChatList)
        return tempChatList
    },
    /**
     * 刷新会话列表
     * @param self 当前对象
     * @param user 用户
     * @param host 主机名
     * @param type 0 单聊 1 群聊
     * @returns {Chat} 当前会话
     */
    resetChatList(user:any, host:string, type:number) {
        let {id} = getState('user')
        let chatList = this.getChatList(id)
        // 删除当前用户已经有的会话
        let newChatList = chatList.filter(function(element:any) {
            return String(element.id) !== String(user.id)
        })

        let avatar = user.avatar
        if (user.avatar.indexOf(host) === 0) {
            avatar = user.avatar
        } else {
            avatar = host + user.avatar
        }
        // 重新添加会话，放到第一个
        let chat = new Chat(
            user.id,
            user.name,
            avatar,
            0,
            "",
            user.mobile,
            user.email,
            type
        )
        newChatList.unshift(chat)
        // 存储到localStorage 的 chatList
        this.setChatList(id, chatList)
        // self.$store.commit("setChatList", newChatList);
        return chat
    }
}
