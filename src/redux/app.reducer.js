import { getInfoAuthTC } from "./auth.reducer"

const initializeSuccessType = 'INITIALIZE_SUCCESS'
const initialState = {
   initializer: false
}
const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case initializeSuccessType: {
         return {
            ...state,
            initializer: true
         }
      }
      default:
         return state
   }
}
export default appReducer
const initializeSuccess = () => ({ type: initializeSuccessType })
export const initializeTC = () => {
   return (dispatch) => {
      let promiseOne = dispatch(getInfoAuthTC())
      Promise.all([promiseOne]).then((data) => {
         dispatch(initializeSuccess())
      })
   }
}