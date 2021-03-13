import { getInfoAuthTC } from "./auth.reducer"

const initializeSuccessType = 'INITIALIZE_SUCCESS'

const initialState = {
   initializer: false
}
type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializeSuccessACType = {
   type: typeof initializeSuccessType
}
const initializeSuccess = (): InitializeSuccessACType => ({ type: initializeSuccessType })

export const initializeTC = () => {
   return (dispatch: any) => {
      let promiseOne = dispatch(getInfoAuthTC())
      Promise.all([promiseOne]).then((data) => {
         dispatch(initializeSuccess())
      })
   }
}