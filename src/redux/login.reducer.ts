const loginFormFailType = 'AUTH_LOGIN_FAIL'

const initialState = {
   values: {
      email: null as null | string,
      password: null as null | string,
      rememberMe: false,
      captcha: null as null | string
   }
}
type InitialStateType = typeof initialState
type ActionsType = LoginFormFailACType
const loginReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case loginFormFailType: {
         return {
            ...state,
            values: {
               ...state.values,
               email: null,
               password: null,
               captcha: null,
               rememberMe: false
            }
         }
      }
      default:
         return state
   }
}
export default loginReducer
export type LoginFormFailACType = {
   type: typeof loginFormFailType
}
export const loginFormFailAC = (): LoginFormFailACType => ({ type: loginFormFailType })