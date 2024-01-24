import request from '@/utils/request';
import qs from 'qs';

export function findModelByName(data) {
    // let params = qs.stringify(data);
    let params = qs.parse(data);
    return request({
        url: '/exhibit/findModelByName',
        method: 'get',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        params: params,
        // data,
    })
}
//

export function findModelByNameCount(data) {
  // let params = qs.stringify(data);
  let params = qs.parse(data);
  return request({
      url: '/exhibit/findModelByNameCount',
      method: 'get',
      headers: {
          // 'Content-Type': 'application/json',
          'Accept': '*/*',
          // 'Access-Control-Allow-Origin':'*',
          // 'Origin':'http://10.5.98.242:7788',
      },
      params: params,
      // data,
  })
}