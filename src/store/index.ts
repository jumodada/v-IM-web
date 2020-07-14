import initState from "./watcher"
import {StateKeys} from "../types/state"
import {transform} from "../utils/transform"
import {IMMessage} from "../types/IM"
import {Chat} from "../utils/Chat"

const Store = (function () {
    let state = initState()
    let watcherFn = {
        watchToken:new Function(),
        watchUser:new Function(),
        watchWebsocket:new Function(),
        watchMessageListMap:new Function(),
        watchChatMap:new Function(),
        watchMessageList:new Function(),
        watchCurrentChat:new Function(),
        watchChatList:new Function(),
        watchUserFriendList:new Function(),
        watchFlushTokenTimerId:new Function(),
        watchChatGroupList:new Function()
    }

    function getWatchFN(name:string):any{
        return (watcherFn as any)[name]
    }

    function setWatchFN(name:string,fn:any):any{
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

    function _unshiftChatLists(data:any) {
        if(!data)return console.error('聊天列表新增的不能为空')
        let copy = JSON.parse(JSON.stringify(state.chatList))
        let idx = state.chatList.findIndex(list=>list.id===data.id)
        if(idx>-1){
            copy.splice(idx,1)
        }
        copy.unshift(data)
        state.chatList = copy
    }

    function _setUnReadCount(message: IMMessage) {

    }

    function _addUnreadMessage(message: IMMessage) {

    }

    function _setLastMessage(message:IMMessage) {

    }

    return {
        getStore,
        _getState,
        _setState,
        _updateLocalStore,
        _addMessage,
        _setUnReadCount,
        _addUnreadMessage,
        _setLastMessage,
        _unshiftChatLists,
        getWatchFN,
        setWatchFN
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
export const unshiftChatLists = Store._unshiftChatLists
export const getWatchFN = Store.getWatchFN
export const setWatchFN = Store.setWatchFN
