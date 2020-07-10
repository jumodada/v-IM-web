import state from './state'
import handler from './handler'
import {State} from "../../types/state"
export default function initState():State {
    return new Proxy( new state(), handler)
}
