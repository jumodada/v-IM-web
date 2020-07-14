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
        this.init()
    }

    init() {
        updateLocalState()
        setState('token', this.token)
        setState('url', this.url)
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

    getChatList(): any[] {
        return getState('chatList')
    }

    setUser(data: any) {
        setState('user', data)
    }

    send(data: any) {

    }


    destroyed() {
        // todo
    }
}
