/**
 *
 */
import http from '../../httpApi.js'

export function importPositionAdjustmentPersonInfo(data) {
  return http.$http.post('ers/eps/adjust/importByExcel', data)
}
