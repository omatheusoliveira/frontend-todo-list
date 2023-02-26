import Vue from 'vue'

export const baseApiUrl = process.env.VUE_APP_API_BASE

export function showError(e) {
    if(e && e.data && e.data.mensagem) {
        Vue.toasted.global.defaultError({ mensagem : e.data.mensagem })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ mensagem : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showSuccess(e) {
    if(e && e.data && e.data.mensagem) {
        Vue.toasted.global.defaultSuccess({ mensagem : e.data.mensagem })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultSuccess({ mensagem : e })
    } else {
        Vue.toasted.global.defaultSuccess()
    }
}

export default {showError, showSuccess, baseApiUrl}