/**
 *
 */
import http from '../httpApi.js'

export function importPositionAdjustmentPersonInfo(data) {
  return http.$cloud.post('ers/eps/adjust/importByExcel', data)
}
