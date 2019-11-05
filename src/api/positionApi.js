/**
 *
 */
import http from '../httpApi.js'

export function importPositionAdjustmentPersonInfo(data) {
  return http.$cloud.get('shakespeare/notes/2975c25e4d71/recommendations', data)
}
