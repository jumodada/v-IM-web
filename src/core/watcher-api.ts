import {setWatchFN} from "../store";

export default {
    chatList(fn:any){
        setWatchFN('watchChatList',fn)
    },
    token(fn:any){
        setWatchFN('watchToken',fn)
    },
    user(fn:any){
        setWatchFN('watchUser',fn)
    },
    websocket(fn:any){
        setWatchFN('watchWebsocket',fn)
    },
    messageListMap(fn:any){
        setWatchFN('watchMessageListMap',fn)
    },
    chatMap(fn:any){
        setWatchFN('watchChatMap',fn)
    },
    MessageList(fn:any){
        setWatchFN('watchMessageList',fn)
    },
    currentChat(fn:any){
        setWatchFN('watchCurrentChat',fn)
    },
    userFriendList(fn:any){
        setWatchFN('watchUserFriendList',fn)
    },
    flushTokenTimerId(fn:any){
        setWatchFN('watchFlushTokenTimerId',fn)
    },
    chatGroupList(fn:any){
        setWatchFN('watchChatGroupList',fn)
    },
}
