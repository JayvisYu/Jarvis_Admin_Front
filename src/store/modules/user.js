import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Notification } from 'element-ui'

const getDefaultState = () => {
    return {
        token: getToken(),
        email: '',
        avatar: '',
        introduction: '',
        roles: [],
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                console.log(response)
                commit('SET_TOKEN', response.data.access_token)
                setToken(response.data.access_token)
                resolve()
            }).catch(error => {
                // console.log('111', error);
                reject(error)
                Notification.error({
                    title: '错误',
                    message: '请输入正确的用户名或密码!'
                })
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                Notification.success({
                    title: '登陆成功',
                    message: '欢迎你,' + ' ' + data.username + '!'
                })
                const { email, roles, avatar, introduction } = data
                console.log('data', data);
                commit('SET_EMAIL', email)
                commit('SET_ROLES', roles)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken() // must remove  token  first
                resetRouter()
                dispatch('tagsView/delAllViews', null, { root: true })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken() // must remove  token  first
            resolve()
        })
    },

    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
