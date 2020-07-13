import {UserInfo} from "./types/user"
import WebIm from './core'
import {extend} from './utils/extend'

function createInstance():any {
    return function(url:string,token:string,userInfo:UserInfo){
        const context = new WebIm(url,token,userInfo)
        const instance = WebIm.prototype.create.call(context,url,token)
        extend(context,instance)
        return instance
    }
}
const IM = createInstance()
export default IM
