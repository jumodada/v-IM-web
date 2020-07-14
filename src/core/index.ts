import {UserInfo} from "../types/user"
import {updateLocalState, setState, unshiftChatLists, getState, activeChatLists} from "../store"
import WebsocketBeat from "./websocket"
import watcherAPI from './watcher-api'

export default class WebsocketIm {
    url: string
    token: string
    userInfo: UserInfo
    ws: any
    watcher = watcherAPI

    constructor(url: string, token: string, userInfo: UserInfo) {
        this.url = url
        this.token = token
        this.userInfo = userInfo
        this._init()
    }

    private _init() {
        updateLocalState()
        setState('token', this.token)
        setState('url', this.url)
    }
    init(userInfo:any){
        let {me,friends,groups} = userInfo
        friends.forEach((friend:any)=>{friend.type= '0'})
        groups.forEach((group:any)=>{group.type= '1'})
        setState('user', me)
        setState('chatGroupList', groups)
        setState('userFriendList', friends)
    }

    create(url: string, token: string) {
        let _t = this
        this.ws = new WebsocketBeat(url, token)
        setState('ws', this.ws)
        return function () {
            _t.ws.create()
        }
    }

    addChatList(data: any) {
        unshiftChatLists(data)
    }

    activeChat(data: any) {
        activeChatLists(data)
    }

    getChatLists(): any[] {
        return getState('chatList')
    }
    getCurrentChat(){
        return getState('currentChat')
    }
    getFriends(){
        return getState('userFriendList')||[]
    }
    getGroups(){
        return getState('chatGroupList')||[]
    }


    send(data: any) {

    }


    destroyed() {
        // todo
    }
}
