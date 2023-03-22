import request from '@/utils/request'

export function apiDemo(data, showLoading=true) {
  return request({
    url: `/api/api-test/getTableList`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading,
    data
  })
}
