import request from "@/utils/request";
import qs from "qs";

//查询类别
export function exhibitCategory(data) {
  // let params = qs.stringify(data);
  let params = qs.parse(data);
  return request({
    url: "/exhibit/exhibitCategory",
    method: "get",
    headers: {
      // 'Content-Type': 'application/json',
      Accept: "*/*",
      // 'Access-Control-Allow-Origin':'*',
      // 'Origin':'http://10.5.98.242:7788',
    },
    params: params,
  });
}
//增加类别
export function saveCategory(data) {
  // let params = qs.stringify(data);
  // let params = qs.parse(data);
  console.log(data);
  return request({
    url: "/exhibit/saveCategory",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      // 'Access-Control-Allow-Origin':'*',
      // 'Origin':'http://10.5.98.242:7788',
    },
    // data:params,
    data,
  });
}
//更新类别
export function updateCategory(data) {
  // let params = qs.stringify(data);
  // let params = qs.parse(data);
  console.log(data);
  return request({
    url: "/exhibit/updateCategory",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      // 'Access-Control-Allow-Origin':'*',
      // 'Origin':'http://10.5.98.242:7788',
    },
    // data:params,
    data,
  });
}
//删除类别
export function deleteCategory(data) {
  console.log(data);
  let params = qs.stringify(data);
  console.log(params);
  return request({
    url: "/exhibit/deleteCategory",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      // 'Access-Control-Allow-Origin':'*',
      // 'Origin':'http://10.5.98.242:7788',
    },
    data: params,
    // data,
  });
}

//
export function updateAllCategories(arr) {
  console.log("1111", arr);
  return request({
    url: "/exhibit/updateAllCategories",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data: { categoryIds: arr },
  });
}
