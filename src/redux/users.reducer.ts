import { userApi } from '../api/api'
import { ReadyToggleType, UsersType } from '../types/types'

const getUsersFollowedSuccessType = "GET_USERS_FOLLOWED__SUCCESS"
const getUsersUnfollowedSuccessType = "GET_USERS_UNFOLLOWED__SUCCESS"
const getOnceUnfollowedSuccessType = "GET_ONCE_UNFOLLOWED__SUCCESS"
const unfollowUserSuccessType = 'UNFOLLOW_USER_SUCCESS_TYPE'
const followUserSuccessType = 'FOLLOW_USER_SUCCESS_TYPE'
const setReadyToggleType = 'SET_READY_TOGGLE'
const isFetchingUsersType = 'IS_FETCHING_USERS'

const initialState = {
   countFollowed: 5, //count of items on one portion
   countUnfollowed: 24,
   pageFollowed: 1, //number of touched portions; default:1
   usersFollowed: [] as Array<UsersType>,
   usersUnfollowed: [] as Array<UsersType>,
   pageUnfollowed: 1,
   totalCount: null as number | null, //count all of items 
   isReadyPage: false, //all thunks in container are finished
   readyToggle: [] as Array<ReadyToggleType>,
   isFetching: false
}
type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: any): InitialStateType => {
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
            ...state.usersUnfollowed.push(...action.usersUnfollowed) as any,
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
   usersFollowed: UsersType,
   totalCount: number,
   pageFollowed: number,
   follower: boolean
}
type GetUserUnfollowedSuccessType = {
   type: typeof getUsersUnfollowedSuccessType,
   usersUnfollowed: UsersType,
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
const getUsersFollowedSuccess = (usersFollowed: UsersType, totalCount: number, pageFollowed: number, follower: boolean): GetUserFollowedSuccessType => ({ type: getUsersFollowedSuccessType, usersFollowed, totalCount, pageFollowed, follower })
const getUsersUnfollowedSuccess = (usersUnfollowed: UsersType, totalCount: number, pageUnfollowed: number, follower: boolean): GetUserUnfollowedSuccessType => ({ type: getUsersUnfollowedSuccessType, usersUnfollowed, totalCount, pageUnfollowed, follower })
const getOnceUnfollowedSuccess = (): GetOnceUnfollowedSuccessType => ({ type: getOnceUnfollowedSuccessType })
const unfollowUserSuccess = (userId: number): UnfollowUserSuccessType => ({ type: unfollowUserSuccessType, userId })
const followUserSuccess = (userId: number): FollowUserSuccessType => ({ type: followUserSuccessType, userId })
const setReadyToggle = (value: boolean, userId: number): SetReadyToggleType => ({ type: setReadyToggleType, value, userId })
export const isFetchingUsers = (bool: boolean): IsFetchingUsersType => ({ type: isFetchingUsersType, bool })

export const getUsersFollowedTC = (count: number, page: number, follower: boolean) => {
   return (dispatch: any) => {
      userApi.getUsers(count, page, follower)
         .then((data) => {
            const users = data.items
            let totalCount = data.totalCount
            dispatch(getUsersFollowedSuccess(users, totalCount, page, follower))
         })
   }
}

export const getUsersUnfollowedTC = (count: number, page: number, follower: boolean) => {
   return (dispatch: any) => {
      userApi.getUsers(count, page, follower)
         .then((data) => {
            page++
            dispatch(getUsersUnfollowedSuccess(data.items, data.totalCount, page, follower))
         })
         .finally(() => {
            dispatch(isFetchingUsers(false))
         })
   }
}
export const getOnceUnfollowedTC = () => {
   return (dispatch: any) => {
      dispatch(getOnceUnfollowedSuccess())
      dispatch(isFetchingUsers(true))
   }
}
export const unfollowUserTC = (userId: number) => {
   return (dispatch: any) => {
      dispatch(setReadyToggle(true, userId))
      userApi.unfollow(userId)
         .then((data) => {
            if (data.resultCode === 0) {
               dispatch(unfollowUserSuccess(userId))
               dispatch(setReadyToggle(false, userId))
            }
         })
   }
}
export const followUserTC = (userId: number) => {
   return (dispatch: any) => {
      dispatch(setReadyToggle(true, userId))
      userApi.follow(userId)
         .then((data) => {
            if (data.resultCode === 0) {
               dispatch(followUserSuccess(userId))
               dispatch(setReadyToggle(false, userId))
            }
         })
   }
}
