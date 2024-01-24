import request from '@/utils/request'

export function login(data) { 
    data = JSON.stringify(data); 
    return request({   url: '/login',   method: 'post',   data  });
}

export function changeUser(data) { 
    data = JSON.stringify(data); 
    return request({   url: '/manager/updateManagerPassword',   method: 'post',   data  });
}

export function judgeToken(data) { 
    // data = JSON.stringify(data); 
    return request({   
        url: '/Judge/judgeToken',   
        method: 'get',   
        params:{
         'token':data
        }
    });
}

export function logout(data) { 
    // data = JSON.stringify(data); 
    return request({   
        url: '/logout',   
        method: 'get',   
        params:{
         'token':data
        }
    });
}