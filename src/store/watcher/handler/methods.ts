import {getWatchFN} from "../../index";

export function watchToken() {
// todo
}

export function watchUser() {
// todo
}

export function watchWebsocket() {
// todo
}

export function watchMessageListMap() {
// todo
}

export function watchChatMap() {
// todo
}

export function watchMessageList() {
// todo
}

export function watchCurrentChat(val:any) {
    let newVal = Object.assign({}, val)
    getWatchFN('watchCurrentChat')(newVal)
}

export function watchChatList(val: any) {
    let newVal = Object.assign({}, val)
    getWatchFN('watchChatList')(newVal)
}

export function watchUserFriendList(val: any) {
    val = val[0].userList
    let newVal = Object.assign({}, val)
    getWatchFN('watchUserFriendList')(newVal)
}

export function watchFlushTokenTimerId() {
    // todo
}

export function watchChatGroupList(val:any) {
    let newVal = Object.assign({}, val)
    getWatchFN('watchChatGroupList')(newVal)
}


