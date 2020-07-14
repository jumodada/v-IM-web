import {UserInfo} from "../types/user"
import {updateLocalState, setState, unshiftChatLists, getState} from "../store"
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
        setState('user', this.userInfo)
    }

    create(url: string, token: string) {
        let _t = this
        this.ws = new WebsocketBeat(url, token)
        return function () {
            _t.ws.create()
        }
    }

    addChatList(data:any) {
        unshiftChatLists(data)
    }

    getChatList():any[] {
       return getState('chatList')
    }


    destroyed() {
        // todo
    }
}
