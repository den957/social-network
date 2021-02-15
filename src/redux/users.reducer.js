import { userApi } from '../api/api'

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
   usersFollowed: null,
   usersUnfollowed: null,
   pageUnfollowed: 1,
   totalCount: null, //count all of items 
   isReadyPage: false, //all thunks in container are finished
   isReadyToggle: [],
   isFetching: false
}
const usersReducer = (state = initialState, action) => {
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
            ...state.usersUnfollowed.push(...action.usersUnfollowed),
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
            ...state.users,
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
            ...state.users,
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
            isReadyToggle: action.value
               ? [...state.isReadyToggle, action.userId]
               : state.isReadyToggle.filter(id => id !== action.userId)
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

const getUsersFollowedSuccess = (usersFollowed, totalCount, pageFollowed, follower) => ({ type: getUsersFollowedSuccessType, usersFollowed, totalCount, pageFollowed, follower })
const getUsersUnfollowedSuccess = (usersUnfollowed, totalCount, pageUnfollowed, follower) => ({ type: getUsersUnfollowedSuccessType, usersUnfollowed, totalCount, pageUnfollowed, follower })
const getOnceUnfollowedSuccess = () => ({ type: getOnceUnfollowedSuccessType })
const unfollowUserSuccess = (userId) => ({ type: unfollowUserSuccessType, userId })
const followUserSuccess = (userId) => ({ type: followUserSuccessType, userId })
const setReadyToggle = (value, userId) => ({ type: setReadyToggleType, value, userId })
export const isFetchingUsers = (bool) => ({ type: isFetchingUsersType, bool })

export const getUsersFollowedTC = (count, page, follower) => {
   return (dispatch) => {
      userApi.getUsers(count, page, follower)
         .then((data) => {
            const users = data.items
            let totalCount = data.totalCount
            dispatch(getUsersFollowedSuccess(users, totalCount, page, follower))
         })
   }
}

export const getUsersUnfollowedTC = (count, page, follower) => {
   return (dispatch) => {
      userApi.getUsers(count, page, follower)
         .then((data) => {
            const users = data.items
            let totalCount = data.totalCount
            page++
            dispatch(getUsersUnfollowedSuccess(users, totalCount, page, follower))
         })
         .finally(() => {
            dispatch(isFetchingUsers(false))
         })
   }
}
export const getOnceUnfollowedTC = () => {
   return (dispatch) => {
      dispatch(getOnceUnfollowedSuccess())
      dispatch(isFetchingUsers(true))
   }
}
export const unfollowUserTC = (userId) => {
   return (dispatch) => {
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
export const followUserTC = (userId) => {
   return (dispatch) => {
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
