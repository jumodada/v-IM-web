export interface UserInfo {
    friend:any[]//考虑后面结构可能变，先这样
    groups:any[]
    me:{
        id:string
        avatar:string
        sign:string
        name:string
        loginName:string
    }
}
