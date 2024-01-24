//设置token
export function setItem(name,token){
  window.localStorage.setItem(name,token);
}

//获取token
export function getItem(name){
 return window.localStorage.getItem(name);
}

//删除token
export function removeToken(name){
  //根据key,删除指定的值
  window.localStorage.removeItem(name);
}
