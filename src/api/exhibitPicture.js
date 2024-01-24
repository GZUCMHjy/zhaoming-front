import request from '@/utils/request';
import qs from 'qs';

export function exhibitCarouselPictures(data) {
    // let params = qs.stringify(data);
    let params = qs.parse(data);
    return request({
        url: '/exhibitPicture/exhibitCarouselPictures',
        method: 'get',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params,
    })
}

export function updateCarouselPictures(data) {
    console.log(data);
    //   let params = qs.stringify(data);
    let params = qs.parse(data);
    console.log(params);
    return request({
        url: '/exhibitPicture/updateCarouselPictures',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params
    })
}