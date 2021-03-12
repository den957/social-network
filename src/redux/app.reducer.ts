import { getInfoAuthTC } from "./auth.reducer"

const initializeSuccessType = 'INITIALIZE_SUCCESS'

const initialState = {
   initializer: false
}
type initialStateType = typeof initialState
const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
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
type initializeSuccessACType = {
   type: typeof initializeSuccessType
}
const initializeSuccess = (): initializeSuccessACType => ({ type: initializeSuccessType })

export const initializeTC = () => {
   return (dispatch: any) => {
      let promiseOne = dispatch(getInfoAuthTC())
      Promise.all([promiseOne]).then((data) => {
         dispatch(initializeSuccess())
      })
   }
}