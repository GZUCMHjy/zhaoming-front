import request from '@/utils/request';
import qs from 'qs';

export function upPicture(data) {
    let params = qs.stringify(data);
    //   let params = qs.parse(data);
    return request({
        url: '/exhibit/uploadPicture',
        method: 'post',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params,
    })
}
export function deletePicture(data) {
    // let params = qs.stringify(data);
    let params = qs.parse(data);
    return request({
        url: '/exhibit/deletePicture',
        method: 'post',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params,
    })
}