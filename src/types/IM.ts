import {UserInfo} from "./user"

interface IMConfig<T=string> {
    url:T
    token:T
    userInfo:UserInfo
}

export interface IM {
    new(config:IMConfig):any
}

export interface IMInstance {
    create:()=>void
    update:()=>void
    destroy:()=>void
}


export interface IMMessage {
    avatar: string
    username: string
    fromid: any
    type:number
    id:string
    content:string
}
