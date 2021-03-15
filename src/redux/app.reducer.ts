import { AppReducerType } from './store';
import { ThunkAction } from "redux-thunk"
import { getInfoAuthTC } from "./auth.reducer"

const initializeSuccessType = 'INITIALIZE_SUCCESS'

const initialState = {
   initializer: false
}
type InitialStateType = typeof initialState
type ActionsType = InitializeSuccessACType
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ThunkType = ThunkAction<Promise<void>, AppReducerType, unknown, ActionsType>

export const initializeTC = (): ThunkType =>
   async dispatch => {
      let promiseOne = dispatch(getInfoAuthTC())
      await Promise.all([promiseOne])
      dispatch(initializeSuccess())
   }