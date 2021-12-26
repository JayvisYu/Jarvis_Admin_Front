import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data,
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }

    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}


export function getForm() {
    return request({
        url: '/user/get_form',
        method: 'get'
    })
}
