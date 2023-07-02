/* 标准api调用函数库,严格与后端接口一致 */
// aiops backend api

/* eslint-disable camelcase */

import { axiosAiops } from 'boot/axios'

export default {
  login: {
    alert: {
      getOriginAlertUrl (payload: {
        query: {
          // clientUrl: string;
          // type?: string;
          start: number
          end: number
          offset?: number
          limit?: number
          alert_type?: string
          monitor_cluster?: string
          alertname?: string
        }
      }) {
        const config = {
          params: payload.query
        }
        return axiosAiops.get('/v1/alert/origin-alert/', config)
      }
    }
  }
}
