import { AppReducerType } from './store';
import { ThunkAction } from 'redux-thunk'
import { authApi } from '../api/api'
import { loginFormFailAC, LoginFormFailACType } from './login.reducer'


const setIsAuthType = 'SET_IS_AUTH_TYPE'
const getCaptchaSuccessType = 'GET_CAPTCHA_SUCCESS'

const initialState = {
   isAuth: false,
   login: null as null | string,
   id: null as null | number,
   email: null as null | string,
   isCaptcha: false,
   urlCaptcha: null as null | string
}
type InitialStateType = typeof initialState
type ActionsType = SetIsAuthACType | GetCaptchaSuccessACType | LoginFormFailACType
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
type SetIsAuthACDataType = {
   login: string | null,
   id: number | null,
   email: string | null,
   isAuth: boolean
}
type SetIsAuthACType = {
   type: typeof setIsAuthType,
   data: SetIsAuthACDataType
}
type GetCaptchaSuccessACType = {
   type: typeof getCaptchaSuccessType,
   urlCaptcha: string | null,
   isCaptcha: boolean
}
const setIsAuthAC = (login: string | null, id: number | null, email: string | null, isAuth: boolean): SetIsAuthACType => ({ type: setIsAuthType, data: { login, id, email, isAuth } })
const getCaptchaSuccess = (urlCaptcha: string | null, isCaptcha: boolean): GetCaptchaSuccessACType => ({ type: getCaptchaSuccessType, urlCaptcha, isCaptcha })

type ThunkType = ThunkAction<Promise<void>, AppReducerType, unknown, ActionsType>
export const getInfoAuthTC = (): ThunkType =>
   async dispatch => {
      let data = await authApi.me()
      if (data.resultCode === 0) {
         let [login, id, email, isAuth] = [data.data.login, data.data.id, data.data.email, true]
         dispatch(setIsAuthAC(login, id, email, isAuth))
         return id
      }
   }
export const logInServerTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
   async dispatch => {
      let data = await authApi.logIn(email, password, rememberMe, captcha)
      if (data.resultCode === 0) {
         dispatch(getInfoAuthTC())
         dispatch(getCaptchaSuccess(null, false))
      }
      else if (data.resultCode === 10) {
         dispatch(getCaptchaTC())
         dispatch(loginFormFailAC())
      }
      else {
         dispatch(loginFormFailAC())
      }
   }
export const logOutServerTC = (): ThunkType =>
   async dispatch => {
      let data = await authApi.logOut()
      if (data.resultCode === 0) {
         dispatch(setIsAuthAC(null, null, null, false))
      }
   }
export const getCaptchaTC = (): ThunkType =>
   async dispatch => {
      let data = await authApi.getCaptcha()
      let urlCaptcha = data.url
      dispatch(getCaptchaSuccess(urlCaptcha, true))
   }
export default authReducer