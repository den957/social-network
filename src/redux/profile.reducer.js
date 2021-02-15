import { profileApi } from "../api/api"

const getProfileInfoSuccessType = 'GET_PROFILE_INFO_SUCCESS'
const setProfileImageSuccessType = 'SET_PROFILE_IMAGE_SUCCESS'
const getProfileStatusSuccessType = 'GET_PROFILE_STATUS_SUCCESS'
const getProfileMeInfoSuccessType = 'GET_PROFILE_ME_INFO_SUCCESS'
const initialState = {
   profileMeInfo: null,
   profileInfo: null,
   profileImage: null,
   profileStatus: null,
   profilePosts: null
}
const ProfileReducer = (state = initialState, action) => {
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
            profileMeInfo: action.dataMe
         }
      }
      default: {
         return state
      }
   }
}
export default ProfileReducer

const getProfileInfoSuccess = (data) => ({ type: getProfileInfoSuccessType, data })
const setProfileImageSuccess = (img) => ({ type: setProfileImageSuccessType, img })
const getProfileStatusSuccess = (status) => ({ type: getProfileStatusSuccessType, status })
const getProfileMeInfoSuccess = (dataMe) => ({ type: getProfileMeInfoSuccessType, dataMe })

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
export const setProfileContactInfo = (fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github, userId) => {
   return (dispatch) => {
      profileApi.setContactInfo(fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github).then((data) => {
         if (data.resultCode === 0) {
            dispatch(getProfileMeInfo(userId))
            dispatch(getProfileInfo(userId))
         }
      })
   }
}
