import { authApi } from '../api/api'


const setIsAuthType = 'SET_IS_AUTH_TYPE'
const getCaptchaSuccessType = 'GET_CAPTCHA_SUCCESS'
const initialState = {
   isAuth: false,
   login: null,
   id: null,
   email: null,
   isCaptcha: false,
   urlCaptcha: null
}
const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case setIsAuthType: {
         return {
            ...state,
            ...action.data

         }
      }
      case getCaptchaSuccessType: {
         return {
            ...state,
            urlCaptcha: action.urlCaptcha,
            isCaptcha: action.isCaptcha
         }
      }
      default: {
         return state
      }
   }
}
const setIsAuthAC = (login, id, email, isAuth) => ({ type: setIsAuthType, data: { login, id, email, isAuth } })
const getCaptchaSuccess = (urlCaptcha, isCaptcha) => ({ type: getCaptchaSuccessType, urlCaptcha, isCaptcha })

export const getInfoAuthTC = () => {
   return (dispatch) => {
      return authApi.me()
         .then((data) => {
            if (data.resultCode === 0) {
               let [login, id, email, isAuth] = [data.data.login, data.data.id, data.data.email, true]
               dispatch(setIsAuthAC(login, id, email, isAuth))
               return id
            }
         })
   }
}
export const logInServerTC = (email, password, rememberMe, captcha) => {
   return (dispatch) => {
      authApi.logIn(email, password, rememberMe, captcha).then((data) => {
         if (data.resultCode === 0) {
            dispatch(getInfoAuthTC())
            dispatch(getCaptchaSuccess(null, false))
         }
         else if (data.resultCode === 10) {
            dispatch(getCaptchaTC())
         }
      })
   }
}
export const logOutServerTC = () => {
   return (dispatch) => {
      authApi.logOut().then((data) => {
         if (data.resultCode === 0) {
            dispatch(setIsAuthAC(null, null, null, false))
         }
      })
   }
}
export const getCaptchaTC = () => {
   return (dispatch) => {
      authApi.getCaptcha().then((data) => {
         let urlCaptcha = data.url
         dispatch(getCaptchaSuccess(urlCaptcha, true))
      })
   }
}
export default authReducer