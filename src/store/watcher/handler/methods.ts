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

export function watchCurrentChat() {
// todo
}

export function watchChatList(val:any) {
    let newVal = Object.assign({},val)
    getWatchFN('watchChatList')(newVal)
}

export function watchUserFriendList() {
    // todo
}

export function watchFlushTokenTimerId() {
    // todo
}

export function watchChatGroupList() {
    // todo
}


