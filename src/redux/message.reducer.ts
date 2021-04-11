import { ThunkAction } from 'redux-thunk';
import { chatApi, MessageType } from "../api/api"
import { AppReducerType } from "./store"

const setMessageSuccessType = 'SET_MESSAGE_SUCCESS_TYPE'
const setStatusSuccessType = 'SET_STATUS_SUCCESS_TYPE'
const initializeStateSuccessType = 'INITIALIZE_STATE_SUCCESS_TYPE'

const initialState = {
   messages: [] as Array<MessageType>,
   isReady: true
}
export type InitialStateType = typeof initialState
type ActionsType = SetMessageSuccessType | SetStatusSuccessType | InitializeStateSuccessType
const messageReducer = (state = initialState, actions: ActionsType): InitialStateType => {
   switch (actions.type) {
      case setMessageSuccessType: {
         return {
            ...state,
            messages: [...state.messages, ...actions.message]
         }
      }
      case setStatusSuccessType: {
         return {
            ...state,
            isReady: actions.status
         }
      }
      case initializeStateSuccessType: {
         return {
            ...state,
            isReady: true,
            messages: []
         }
      }
      default: {
         return state
      }
   }
}
export default messageReducer

type SetMessageSuccessType = {
   type: typeof setMessageSuccessType,
   message: Array<MessageType>
}
type SetStatusSuccessType = {
   type: typeof setStatusSuccessType,
   status: boolean
}
type InitializeStateSuccessType = {
   type: typeof initializeStateSuccessType,
}
const setMessageSuccess = (message: Array<MessageType>): SetMessageSuccessType => ({ type: setMessageSuccessType, message })
const setIsReadySuccess = (status: boolean): SetStatusSuccessType => ({ type: setStatusSuccessType, status })
const initializeStateSuccess = (): InitializeStateSuccessType => ({ type: initializeStateSuccessType })

type ThunkType = ThunkAction<Promise<void>, AppReducerType, unknown, ActionsType>
export const startMessageListeningTC = (): ThunkType =>
   async dispatch => {
      chatApi.createChannel()
      chatApi.messageSubscribe((message: MessageType[]) => {
         dispatch(setMessageSuccess(message))
      })
      chatApi.statusSubscribe((status: boolean) => {
         dispatch(setIsReadySuccess(status))
      })
   }
export const stopMessageListeningTC = (): ThunkType =>
   async dispatch => {
      chatApi.removeChannel()
      dispatch(initializeStateSuccess())
   }
export const sendMessageTC = (message: string): ThunkType =>
   async dispatch => {
      chatApi.setMessage(message)
   }
