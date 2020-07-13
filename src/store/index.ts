import initState from "./watcher"
import {StateKeys} from "../types/state"
import {transform} from "../utils/transform"
import {IMMessage} from "../types/IM"
import {Chat} from "../utils/Chat"
import {ChatListUtils} from "../utils/ChatListUtils"

const Store = (function () {
    let state = initState()

    function getStore() {
        return state
    }

    function _getState(key: StateKeys): any {
        return state[key]
    }

    function _updateLocalStore() {
        localStorage.setItem('WEBImSTORE', JSON.stringify(state))
    }

    function _setState(key: StateKeys, data: any): void {
        ;(state[key] as any) = data
    }

    function _addMessage(message: IMMessage) {
        message.content = transform(message.content)
        state.messageList.push(message)
        ;(state.messageListMap as any)[message.id] = state.messageList
    }

    function _setUnReadCount(message: IMMessage) {
        // 未读消息条数
        let tempChatList = []
        let tempChat: any = {}

        for (let chat of state.chatList) {
            if (
                String(chat.id) === String(message.fromid) &&
                message.type === 0
            ) {
                if (!chat["unReadCount"]) {
                    chat["unReadCount"] = 0
                }
                chat["unReadCount"] = chat["unReadCount"] + 1
                tempChat = chat
            }
            // 群组聊天
            else if (
                String(chat.id) === String(message.id) &&
                message.type === 1
            ) {
                if (!chat["unReadCount"]) {
                    chat["unReadCount"] = 0;
                }
                chat["unReadCount"] = chat["unReadCount"] + 1;
                chat.avatar = getState('url') + getState('chatMap')[message.id].avatar
                tempChat = chat;
            } else {
                tempChatList.push(chat);
            }
        }
        // 聊天列表没有此人的chat
        if (!tempChat.id && message.type === 0) {
            tempChat = new Chat(
                message.fromid,
                message.username,
                message.avatar,
                1,
                message.content,
                state.user.mobile,
                state.user.email,
                0
            );
        } else if (
            !tempChat.id &&
            message.type === 1
        ) {
            let groupChat = (state.chatMap as any)[message.id];
            tempChat = new Chat(
                message.id,
                groupChat.name,
                getState('url') + groupChat.avatar,
                1,
                message.content,
                state.user.mobile,
                state.user.email,
                1
            );
        }
        // 添加到聊天室列表的第一个
        tempChatList.unshift(tempChat)
        // 重新设置chatList
        state.chatList = tempChatList
        // 放入缓存
        ChatListUtils.setChatList(state.user.id, tempChatList)
    }

    function _addUnreadMessage(message: IMMessage) {
        message.content = transform(message.content)
        if (message.type === 0) {
            // 从内存中取聊天信息
            let cacheMessages = (state.messageListMap as any)[message.fromid]
            if (cacheMessages) {
                cacheMessages.push(message)
            } else {
                cacheMessages = []
                cacheMessages.push(message)
                ;(state.messageListMap as any)[message.fromid] = cacheMessages
            }
        } else {
            // 从内存中取聊天信息
            let cacheMessages = (state.messageListMap as any)[message.id]
            if (cacheMessages) {
                cacheMessages.push(message)
            } else {
                cacheMessages = []
                cacheMessages.push(message)
                ;(state.messageListMap as any)[message.id] = cacheMessages
            }
        }
    }

    function _setLastMessage(message:IMMessage) {
        let list = ChatListUtils.getChatList(state.user.id);
        let tempChatList = list.map(function (chat:any) {
            if (
                String(chat.id) === String(message.fromid) &&
                message.type === "0"
            ) {
                chat.sign = message.content;
            } else if (
                String(chat.id) === String(message.id) &&
                message.type === "1"
            ) {
                chat.sign = message.content;
            }
            return chat;
        });
        // 放入缓存
        ChatListUtils.setChatList(state.user.id, tempChatList);
        state.chatList = tempChatList;
    }

    return {
        getStore,
        _getState,
        _setState,
        _updateLocalStore,
        _addMessage,
        _setUnReadCount,
        _addUnreadMessage,
        _setLastMessage
    }
})()

export const getStore = Store.getStore
export const getState = Store._getState
export const setState = Store._setState
export const updateLocalState = Store._updateLocalStore
export const addMessage = Store._addMessage
export const setUnReadCount = Store._setUnReadCount
export const addUnreadMessage = Store._addUnreadMessage
export const setLastMessage = Store._setLastMessage
