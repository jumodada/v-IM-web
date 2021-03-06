import {formatDateTime} from "../../utils/formatDateTime"
import {getState, updateLocalState} from "../../store";

export default class WebsocketBeat {
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
    pingMsg = '{"code":0}'

    constructor(url: string, token: string) {
        this.url = url
        this.token = token
    }

    onopen() {
        this.ws.send('{"code":1}')
    }

    onReconnect() {
        console.log("reconnecting...")
    }

    create() {
        try {
            let URL = this.url + "?token=" + this.token
            console.log(URL)
            this.ws = new WebSocket(URL)
            this.eventListener()
        } catch (e) {
            this.reconnect()
            throw e
        }
    }

    handleMessage(event: MessageEvent) {
        if(event.data==='{"code":0}')return
        let data = JSON.parse(event.data).message
        getState('onMessage')(event)
        let watcher = getState('onCurrentChat')
        let lists = data.type==='1'?getState('chatGroupList'):getState('userFriendList').reduce((concatLists:any,list:any)=>{
            return concatLists.concat(list.userList)
        },[])
        let isExist = false
        let findList = lists.find((list:any)=>{
            return list.id===(data.type==='1'?data.id:data.fromid)
        })
        if(findList){
            if(!findList.chatLists)findList.chatLists = []
            findList.chatLists.forEach((list:any)=>{
                if(list.timestamp===data.timestamp) isExist = true
            })
            if(isExist)return
            findList.chatLists.push(data)
            if(findList.id===getState('currentChat').id){
                watcher(findList.chatLists  ,findList.id)
            }
            updateLocalState()
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
