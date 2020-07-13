import {addMessage, addUnreadMessage, getState, setLastMessage, setState, setUnReadCount} from "../../store"
import {formatDateTime} from "../../utils/formatDateTime"

class WebsocketBeat {
    url: string
    ws: any
    pingTimeoutId: any
    pongTimeoutId: any
    token: string
    pingTimeout = 20000
    pongTimeout = 15000
    reconnectTimeout = 5000
    reconnectDisabled = false
    reconnecting = false
    pingMsg = '{"code":0"}'

    constructor(url: string, token: string) {
        this.url = url
        this.token = token
    }

    onopen() {
        this.ws.send('{"code":0}"')
    }

    onReconnect() {
        console.log("reconnecting...")
    }

    create() {
        try {
            let URL = this.url + "?token=" + this.token
            this.ws = new WebSocket(URL)
            this.eventListener()
        } catch (e) {
            this.reconnect()
            throw e
        }
    }

    handleMessage(event: MessageEvent) {
        let data = event.data;
        let sendInfo = JSON.parse(data);
        // 真正的消息类型
        let currentChatID = getState('currentChat').id
        if (sendInfo.code === 2) {
            let message = sendInfo.message;
            // 如果图片不带域名，加上域名
            if (message.avatar && message.avatar.indexOf("http") === -1) {
                message.avatar = getState('url') + message.avatar
            }
            message.timestamp = formatDateTime(new Date(message.timestamp))
            // 发送给个人
            if (message.type === 0) {
                // 接受人是当前的聊天窗口
                if (
                    String(message.fromid) === String(currentChatID)
                ) {
                    addMessage(message)
                } else {
                    setUnReadCount(message)
                    addUnreadMessage(message)
                }
            } else if (message.type === 1) {
                // message.avatar = self.$store.state.chatMap.get(message.id);
                // 接受人是当前的聊天窗口
                if (String(message.id) === String(currentChatID)) {
                    if (String(message.fromid) !== currentChatID) {
                        addMessage(message);
                    }
                } else {
                    setUnReadCount(message)
                    addUnreadMessage(message)
                }
            }
            setLastMessage(message)
        }
    }

    eventListener() {
        this.ws.onclose = () => {
            this.close()
            this.reconnect()
        }
        this.ws.onerror = (error: Error) => {
            console.log(error)
            this.reconnect()
        }
        this.ws.onopen = () => {
            this.onopen();
            // 心跳检测重置
            this.heartCheck()
        }
        this.ws.onmessage = (event: MessageEvent) => {
            this.handleMessage(event)
            this.heartCheck()
        }
    }

    send(msg: any) {
        this.ws.send(msg)
    }

    reconnect() {
        if (this.reconnecting || this.reconnectDisabled) return
        this.reconnecting = true
        this.onReconnect()
        setTimeout(() => {
            this.create()
            this.reconnecting = false
        }, this.reconnectTimeout)
    }

    heartCheck() {
        this.heartReset()
        this.heartBeat()
    }

    heartReset() {
        clearTimeout(this.pingTimeoutId)
        clearTimeout(this.pongTimeoutId)
    }

    heartBeat() {
        this.pingTimeoutId = setTimeout(() => {
            this.ws.send(this.pingMsg)
            this.pongTimeoutId = setTimeout(() => {
                this.ws.close()
            }, this.pongTimeout)
        }, this.pingTimeout)
    }

    close() {
        this.reconnectDisabled = true
        this.ws.close()
    }
}
