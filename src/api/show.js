import request from '@/utils/request';
import qs from 'qs';



export function exhibitTop(data){
    return request({
        url:'/exhibit/isTop',
        method:'post',
        data
    })
}

export function exhibitProduct(data) {
    // let params = qs.stringify(data);
    let params = qs.parse(data);
    return request({
        url: '/exhibit/exhibitProduct',
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
//添加品名
export function saveProduct(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/saveProduct',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        // data: params,
        data,
    })
}
//修改品名
export function updateProduct(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/updateProduct',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        // data: params,
        data,
    })
}
//删除品名
export function deleteProduct(data) {
    let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/deleteProduct',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params,
        // data,
    })
}

export function exhibitModel(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/exhibitModel',
        method: 'get',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        params: data,
        // data,
    })
}

export function getModelCountByProductId(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/getModelCountByProductId',
        method: 'get',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        params: data,
        // data,
    })
}
//删除型号
export function deleteModel(data) {
    let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/deleteModel',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        data: params,
    })
}
//修改型号
export function updateModel(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/updateModel',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        // data: params,
        data,
    })
}
//添加型号
export function saveModel(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/saveModel',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        // data: params,
        data,
    })
}
//复制模型
export function copyModel(data) {
    // let params = qs.stringify(data);
    // let params = qs.parse(data);
    return request({
        url: '/exhibit/copyModel',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            // 'Access-Control-Allow-Origin':'*',
            // 'Origin':'http://10.5.98.242:7788',
        },
        // data: params,
        data,
    })
}

//上下移动商品
export function updownMove(data){
    return request({
        url: '/exhibit/modelMoveUpOrMoveDown',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data,
    })
}


//拉动修改顺序
export function updateProductSortId(categoryId,productIds) {
    return request({
      url: "/exhibit/updateProductSortId",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
        data: {
            categoryId,
            productIds
        },
    });
  }
  