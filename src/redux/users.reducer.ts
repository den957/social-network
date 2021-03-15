import { ThunkAction } from 'redux-thunk'
import { userApi } from '../api/api'
import { UsersType } from '../types/types'
import { AppReducerType } from './store'

const getUsersFollowedSuccessType = "GET_USERS_FOLLOWED__SUCCESS"
const getUsersUnfollowedSuccessType = "GET_USERS_UNFOLLOWED__SUCCESS"
const getOnceUnfollowedSuccessType = "GET_ONCE_UNFOLLOWED__SUCCESS"
const unfollowUserSuccessType = 'UNFOLLOW_USER_SUCCESS_TYPE'
const followUserSuccessType = 'FOLLOW_USER_SUCCESS_TYPE'
const setReadyToggleType = 'SET_READY_TOGGLE'
const isFetchingUsersType = 'IS_FETCHING_USERS'

const initialState = {
   countFollowed: 5, //count of items on one portion in Users component
   countUnfollowed: 24,//count of items on one portion in UsersAll component
   pageFollowed: 1, //number of touched portions; default:1
   pageUnfollowed: 1, //number of touched portions; default:1
   usersFollowed: [] as Array<UsersType>, //data of users in Users component
   usersUnfollowed: [] as Array<UsersType>, //data of users in UsersAll component
   totalCount: null as number | null, //count all of items 
   isReadyPage: false, //all thunks in container are finished
   readyToggle: [] as Array<number>, //array of id users 
   isFetching: false // are we ready to call new request for UsersAll data
}
type InitialStateType = typeof initialState
type ActionsType = GetUserFollowedSuccessType | GetUserUnfollowedSuccessType | GetOnceUnfollowedSuccessType | UnfollowUserSuccessType | FollowUserSuccessType | SetReadyToggleType | IsFetchingUsersType
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case getUsersFollowedSuccessType: {
         return {
            ...state,
            usersFollowed: action.usersFollowed,
            pageFollowed: action.pageFollowed,
            isReadyPage: true,
            totalCount: action.totalCount,
         }
      }
      case getUsersUnfollowedSuccessType: {
         return {
            ...state,
            ...state.usersUnfollowed.push(...action.usersUnfollowed) as {},
            pageUnfollowed: action.pageUnfollowed,
            totalCount: action.totalCount,
         }
      }
      case getOnceUnfollowedSuccessType: {
         return {
            ...state,
            usersUnfollowed: [],
            pageUnfollowed: 1,
         }
      }
      case unfollowUserSuccessType: {
         return {
            ...state,
            usersFollowed: state.usersFollowed.map((user) => {
               if (user.id === action.userId) {
                  return { ...user, followed: false }
               }
               return user
            })
         }
      }
      case followUserSuccessType: {
         return {
            ...state,
            usersUnfollowed: state.usersUnfollowed.map((user) => {
               if (user.id === action.userId) {
                  return { ...user, followed: true }
               }
               return user
            })
         }
      }
      case setReadyToggleType: {
         return {
            ...state,
            readyToggle: action.value
               ? [...state.readyToggle, action.userId]
               : state.readyToggle.filter(id => id !== action.userId)
         }
      }
      case isFetchingUsersType: {
         return {
            ...state,
            isFetching: action.bool
         }
      }
      default: {
         return state
      }
   }
}
export default usersReducer
type GetUserFollowedSuccessType = {
   type: typeof getUsersFollowedSuccessType,
   usersFollowed: Array<UsersType>,
   totalCount: number,
   pageFollowed: number,
   follower: boolean
}
type GetUserUnfollowedSuccessType = {
   type: typeof getUsersUnfollowedSuccessType,
   usersUnfollowed: Array<UsersType>,
   totalCount: number,
   pageUnfollowed: number,
   follower: boolean
}
type GetOnceUnfollowedSuccessType = {
   type: typeof getOnceUnfollowedSuccessType
}
type UnfollowUserSuccessType = {
   type: typeof unfollowUserSuccessType,
   userId: number
}
type FollowUserSuccessType = {
   type: typeof followUserSuccessType,
   userId: number
}
type SetReadyToggleType = {
   type: typeof setReadyToggleType,
   value: boolean,
   userId: number
}
type IsFetchingUsersType = {
   type: typeof isFetchingUsersType,
   bool: boolean
}
const getUsersFollowedSuccess = (usersFollowed: Array<UsersType>, totalCount: number, pageFollowed: number, follower: boolean): GetUserFollowedSuccessType => ({ type: getUsersFollowedSuccessType, usersFollowed, totalCount, pageFollowed, follower })
const getUsersUnfollowedSuccess = (usersUnfollowed: Array<UsersType>, totalCount: number, pageUnfollowed: number, follower: boolean): GetUserUnfollowedSuccessType => ({ type: getUsersUnfollowedSuccessType, usersUnfollowed, totalCount, pageUnfollowed, follower })
const getOnceUnfollowedSuccess = (): GetOnceUnfollowedSuccessType => ({ type: getOnceUnfollowedSuccessType })
const unfollowUserSuccess = (userId: number): UnfollowUserSuccessType => ({ type: unfollowUserSuccessType, userId })
const followUserSuccess = (userId: number): FollowUserSuccessType => ({ type: followUserSuccessType, userId })
const setReadyToggle = (value: boolean, userId: number): SetReadyToggleType => ({ type: setReadyToggleType, value, userId })
export const isFetchingUsers = (bool: boolean): IsFetchingUsersType => ({ type: isFetchingUsersType, bool })

type ThunkType = ThunkAction<Promise<void>, AppReducerType, unknown, ActionsType>

export const getUsersFollowedTC = (count: number, page: number, follower: boolean): ThunkType =>
   async (dispatch) => {
      let data = await userApi.getUsers(count, page, follower)
      dispatch(getUsersFollowedSuccess(data.items, data.totalCount, page, follower))
   }

export const getUsersUnfollowedTC = (count: number, page: number, follower: boolean): ThunkType =>
   async dispatch => {
      let data = await userApi.getUsers(count, page, follower)
      page++
      dispatch(getUsersUnfollowedSuccess(data.items, data.totalCount, page, follower))
      dispatch(isFetchingUsers(false))
   }
export const getOnceUnfollowedTC = (): ThunkAction<void, AppReducerType, unknown, ActionsType> =>
   dispatch => {
      dispatch(getOnceUnfollowedSuccess())
      dispatch(isFetchingUsers(true))
   }
export const unfollowUserTC = (userId: number): ThunkType =>
   async (dispatch) => {
      dispatch(setReadyToggle(true, userId))
      let data = await userApi.unfollow(userId)
      if (data.resultCode === 0) {
         dispatch(unfollowUserSuccess(userId))
         dispatch(setReadyToggle(false, userId))
      }
   }
export const followUserTC = (userId: number): ThunkType =>
   async (dispatch) => {
      dispatch(setReadyToggle(true, userId))
      let data = await userApi.follow(userId)
      if (data.resultCode === 0) {
         dispatch(followUserSuccess(userId))
         dispatch(setReadyToggle(false, userId))
      }
   }
