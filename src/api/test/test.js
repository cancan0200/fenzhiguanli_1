
import {GET, POST, DEL} from '../requestFunc'

const ENTRY_API = {
    guideAdd: param => { // 办事指南新增
        return POST('hrp/web/operationGuide/add', param)
    },
}

export {ENTRY_API}
