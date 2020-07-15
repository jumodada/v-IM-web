import initState from "./watcher"
import {StateKeys} from "../types/state"
import {transform} from "../utils/transform"
import {IMMessage} from "../types/IM"
import {Chat} from "../utils/Chat"

const Store = (function () {
    let state = initState()
    let watcherFn = {
        watchToken: new Function(),
        watchUser: new Function(),
        watchWebsocket: new Function(),
        watchMessageListMap: new Function(),
        watchChatMap: new Function(),
        watchMessageList: new Function(),
        watchCurrentChat: new Function(),
        watchChatList: new Function(),
        watchUserFriendList: new Function(),
        watchFlushTokenTimerId: new Function(),
        watchChatGroupList: new Function()
    }

    function getWatchFN(name: string): any {
        return (watcherFn as any)[name]
    }

    function setWatchFN(name: string, fn: any): any {
        (watcherFn as any)[name] = fn
    }


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

    function _unshiftChatLists(data: any) {
        if (!data) return console.error('聊天列表新增的不能为空')
        let copy = JSON.parse(JSON.stringify(state.chatList))
        let idx = state.chatList.findIndex(list => list.id === data.id)
        if (idx > -1) {
            copy.splice(idx, 1)
        }
        copy.unshift(data)
        state.chatList = copy
    }

    function _activeChatLists(data: any) {
        let idx = state.chatList.findIndex(list => list.id === data.id)
        if (idx === -1) {
            _unshiftChatLists(data)
            idx = 0
        }
        state.chatList.forEach((list, index) => list._isActive = index === idx)
        state.currentChat = data
        if(!data.chatLists)data.chatLists = []
        return data.chatLists
    }

    function _sendMsg(content: string) {
        if (!state.ws) return console.error('websocket实例不存在')
        let timestamp = new Date().getTime()
        let {avatar, name, id} = getState('user')
        let message = {
            mine: true,
            avatar,
            username: name,
            timestamp,
            content,
            fromid: id,
            id: state.currentChat.id,
            type: state.currentChat.type
        }
        let msg = {
            code: 2,
            message
        }
        state.ws.ws.send(JSON.stringify(msg))
        addChat(message)
    }

    function addChat(data:any) {
        if(!state.currentChat)return console.error('当前聊天框不存在')
        state.currentChat.chatLists.push(data)
    }

    return {
        getStore,
        _getState,
        _setState,
        _updateLocalStore,
        _addMessage,
        _unshiftChatLists,
        _activeChatLists,
        addChat,
        getWatchFN,
        setWatchFN,
        _sendMsg
    }
})()

export const getStore = Store.getStore
export const getState = Store._getState
export const setState = Store._setState
export const updateLocalState = Store._updateLocalStore
export const addMessage = Store._addMessage
export const unshiftChatLists = Store._unshiftChatLists
export const activeChatLists = Store._activeChatLists
export const getWatchFN = Store.getWatchFN
export const setWatchFN = Store.setWatchFN
export const sendMsg = Store._sendMsg
export const addChat = Store.addChat
