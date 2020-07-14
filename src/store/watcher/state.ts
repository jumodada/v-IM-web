const  mapInstance = new Map()
export default class InitState {
    url:string
    token:string
    user: any
    ws: any
    // 内存中的聊天记录
    messageListMap: typeof mapInstance
    // 聊天群的映射 id->chat
    chatMap: typeof mapInstance
    messageList: any[]
    // 当前聊天窗口
    currentChat: any
    // 所有的聊天窗口
    chatList: any[]
    // 好友列表
    userFriendList: any[]
    // 刷新token 定时器
    flushTokenTimerId: null
    // 群组列表
    chatGroupList: any[]
    constructor() {
        this.url = ''
        this.token = ''
        this.userFriendList = []
        this.chatList = []
        this.chatGroupList = []
        this.messageList = []
        this.chatMap = new Map()
        this.messageListMap = new Map()
    }
}
