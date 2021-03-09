import { profileApi } from "../api/api"

const getProfileInfoSuccessType = 'GET_PROFILE_INFO_SUCCESS'
const setProfileImageSuccessType = 'SET_PROFILE_IMAGE_SUCCESS'
const getProfileStatusSuccessType = 'GET_PROFILE_STATUS_SUCCESS'
const getProfileMeInfoSuccessType = 'GET_PROFILE_ME_INFO_SUCCESS'
const addProfilePostType = "ADD_PROFILE_POST_TYPE"
const removeProfilePostType = "REMOVE_PROFILE_POST_TYPE"
const initialState = {
   profileMeInfo: null,
   profileInfo: null,
   profileImage: null,
   profileStatus: null,
   profilePosts: []
}
const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case getProfileInfoSuccessType: {
         return {
            ...state,
            profileInfo: action.data
         }
      }
      case setProfileImageSuccessType: {
         return {
            ...state,
            profileImage: action.img,
         }
      }
      case getProfileStatusSuccessType: {
         return {
            ...state,
            profileStatus: action.status
         }
      }
      case getProfileMeInfoSuccessType: {
         return {
            ...state,
            profileMeInfo: action.dataMe,
         }
      }
      case addProfilePostType: {
         return {
            ...state,
            ...state.profilePosts.push(action.dataPost)
         }
      }
      case removeProfilePostType: {
         return {
            ...state,
            profilePosts: state.profilePosts.filter((post) => {
               if (post.id !== action.id) {
                  return true
               }
            })
         }
      }
      default: {
         return state
      }
   }
}
export default profileReducer

export const getProfileInfoSuccess = (data) => ({ type: getProfileInfoSuccessType, data })
export const setProfileImageSuccess = (img) => ({ type: setProfileImageSuccessType, img })
export const getProfileStatusSuccess = (status) => ({ type: getProfileStatusSuccessType, status })
export const getProfileMeInfoSuccess = (dataMe) => ({ type: getProfileMeInfoSuccessType, dataMe })
export const addProfilePost = (dataPost) => ({ type: addProfilePostType, dataPost })
export const removeProfilePost = (id) => ({ type: removeProfilePostType, id })

export const getProfileInfo = (userId) => {
   return (dispatch) => {
      return profileApi.getProfile(userId).then((data) => {
         dispatch(getProfileInfoSuccess(data))
      })
   }
}
export const getProfileMeInfo = (userId) => {
   return (dispatch) => {
      return profileApi.getProfile(userId).then((data) => {
         dispatch(getProfileMeInfoSuccess(data))
      })
   }
}
export const setProfileImage = (image) => {
   return (dispatch) => {
      profileApi.setImage(image).then((data) => {
         if (data.resultCode === 0) {
            let img = data.data.photos.small
            dispatch(setProfileImageSuccess(img))
         }
      })
   }
}
export const getProfileStatus = (userId) => {
   return (dispatch) => {
      profileApi.getStatus(userId).then((response) => {
         if (!response.data) {
            dispatch(getProfileStatusSuccess(response.data))
         }
         dispatch(getProfileStatusSuccess(response.data))
      })
   }
}
export const setProfileStatus = (status) => {
   return (dispatch) => {
      profileApi.setStatus(status).then((data) => {
         console.log(data)
         if (data.resultCode === 0) {
            dispatch(getProfileStatusSuccess(status))
         }
      })
   }
}
export const setProfileContactInfo = (fullName, aboutMe, lookingForAJobDescription, isMarried, youtube, website, facebook, github, userId) => {
   return (dispatch) => {
      profileApi.setContactInfo(fullName, aboutMe, lookingForAJobDescription, isMarried, youtube, website, facebook, github).then((data) => {
         if (data.resultCode === 0) {
            dispatch(getProfileMeInfo(userId))
            dispatch(getProfileInfo(userId))
         }
      })
   }
}
