export class Chat {
    id: string
    name: string
    avatar: string
    unReadCount: number
    lastMessage: any
    mobile: string
    email: string
    type: number

    constructor(
        id: string, name: string,
        avatar: string, unReadCount: number,
        lastMessage: any, mobile: string,
        email: string, type: number) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.unReadCount = unReadCount;
        this.lastMessage = lastMessage;
        this.mobile = mobile;
        this.email = email;
        this.type = type;
    }
}
