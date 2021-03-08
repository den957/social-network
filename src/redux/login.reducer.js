const loginFormFailType = 'AUTH_LOGIN_FAIL'

const loginReducer = (state, action) => {
   switch (action.type) {
      case loginFormFailType: {
         return {
            ...state,
            values: {
               ...state.values,
               email: undefined,
               password: undefined,
               captcha: undefined
            }
         }
      }
      default:
         return state
   }
}
export default loginReducer
export const loginFormFailAC = () => ({ type: loginFormFailType })