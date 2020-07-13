import {UserInfo} from "../types/user"
import {updateLocalState, setState} from "../store"
import WebsocketBeat from "./websocket"

export default class WebsocketIm {
    url: string
    token: string
    userInfo: UserInfo
    ws: any

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

    update() {
        // todo
    }

    destroyed() {
        // todo
    }
}
