import {UserInfo} from "../types/user"
import {updateLocalState, setState} from "../store"



export default class websocketIm {
    url:string
    token:string
    userInfo:UserInfo
    constructor(url:string,token:string,userInfo:UserInfo) {
        this.url = url
        this.token = token
        this.userInfo = userInfo
        this.init()
    }
    init() {
        updateLocalState()
        setState('token',this.token)
        setState('url',this.url)
        setState('user',this.userInfo)
    }
    create(url:string,token:string,userInfo:UserInfo){
        return function () {

        }
    }
    update(){

    }
    destroyed(){

    }
}
