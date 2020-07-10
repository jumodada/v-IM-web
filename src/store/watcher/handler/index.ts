import {
    watchToken,
    watchUser,
    watchWebsocket,
    watchMessageListMap,
    watchChatMap,
    watchMessageList,
    watchCurrentChat,
    watchChatList,
    watchUserFriendList,
    watchFlushTokenTimerId,
    watchChatGroupList
} from "./methods"
import nextTick from "../../../utils/nexttick"
import {updateLocalState} from "../../index"

const keys: any = {
    token: watchToken,
    user: watchUser,
    websocket: watchWebsocket,
    messageListMap: watchMessageListMap,
    chatMap: watchChatMap,
    messageList: watchMessageList,
    currentChat: watchCurrentChat,
    chatList: watchChatList,
    userFriendList: watchUserFriendList,
    flushTokenTimerId: watchFlushTokenTimerId,
    chatGroupList: watchChatGroupList,
}
export default {
    get(target: any, key: any, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: any, value: any, receiver: any) {
        nextTick(() => updateLocalState()) // 更新localstorage
        keys[key] && keys[key](value, target)
        return Reflect.set(target, key, value, receiver)
    }
}
