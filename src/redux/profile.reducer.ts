import { AppReducerType } from './store';
import { ThunkAction } from "redux-thunk"
import { profileApi, ResultCode } from "../api/api"
import { InfoContactsPhotoType } from "../types/types"

const getProfileInfoSuccessType = 'GET_PROFILE_INFO_SUCCESS'
const setProfileImageSuccessType = 'SET_PROFILE_IMAGE_SUCCESS'
const getProfileStatusSuccessType = 'GET_PROFILE_STATUS_SUCCESS'
const getProfileMeInfoSuccessType = 'GET_PROFILE_ME_INFO_SUCCESS'
const addProfilePostType = "ADD_PROFILE_POST_TYPE"
const removeProfilePostType = "REMOVE_PROFILE_POST_TYPE"

type InfoContactsType = {
   github: string,
   facebook: string,
   twitter: string,
   website: string,
   youtube: string,
   mainLink: string
}
export type InfoType = {
   userId: number,
   lookingForAJob: boolean,
   lookingForAJobDescription: string,
   fullName: string,
   contacts: InfoContactsType,
   photos: InfoContactsPhotoType

}
type PostType = {
   id: string,
   data: string,
   post: string
}

const initialState = {
   profileMeInfo: null as InfoType | null,
   profileInfo: null as InfoType | null,
   profileImage: null as string | null,
   profileStatus: '' as string,
   profilePosts: [] as Array<PostType>
}

type InitialStateType = typeof initialState
type ActionsType = GetProfileInfoSuccessType | SetProfileImageSuccessType | GetProfileStatusSuccess | GetProfileMeInfoSuccessType | AddProfilePost | RemoveProfilePost
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            ...state.profilePosts.push(action.dataPost) as {}
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
type GetProfileInfoSuccessType = {
   type: typeof getProfileInfoSuccessType,
   data: InfoType
}
type SetProfileImageSuccessType = {
   type: typeof setProfileImageSuccessType,
   img: string
}
type GetProfileStatusSuccess = {
   type: typeof getProfileStatusSuccessType,
   status: string
}
type GetProfileMeInfoSuccessType = {
   type: typeof getProfileMeInfoSuccessType,
   dataMe: InfoType
}
type AddProfilePost = {
   type: typeof addProfilePostType,
   dataPost: PostType
}
type RemoveProfilePost = {
   type: typeof removeProfilePostType,
   id: string
}
export const getProfileInfoSuccess = (data: InfoType): GetProfileInfoSuccessType => ({ type: getProfileInfoSuccessType, data })
export const setProfileImageSuccess = (img: string): SetProfileImageSuccessType => ({ type: setProfileImageSuccessType, img })
export const getProfileStatusSuccess = (status: string): GetProfileStatusSuccess => ({ type: getProfileStatusSuccessType, status })
export const getProfileMeInfoSuccess = (dataMe: InfoType): GetProfileMeInfoSuccessType => ({ type: getProfileMeInfoSuccessType, dataMe })
export const addProfilePost = (dataPost: PostType): AddProfilePost => ({ type: addProfilePostType, dataPost })
export const removeProfilePost = (id: string): RemoveProfilePost => ({ type: removeProfilePostType, id })

type ThunkType = ThunkAction<Promise<void>, AppReducerType, unknown, ActionsType>

export const getProfileInfo = (userId: number): ThunkType =>
   async dispatch => {
      let data = await profileApi.getProfile(userId)
      dispatch(getProfileInfoSuccess(data))
   }
export const getProfileMeInfo = (userId: number): ThunkType =>
   async dispatch => {
      let data = await profileApi.getProfile(userId)
      dispatch(getProfileMeInfoSuccess(data))
   }
export const setProfileImage = (image: string): ThunkType =>
   async dispatch => {
      let data = await profileApi.setImage(image)
      if (data.resultCode === ResultCode.Success) {
         dispatch(setProfileImageSuccess(data.data.photos.small))
      }
   }
export const getProfileStatus = (userId: number): ThunkType =>
   async dispatch => {
      let response = await profileApi.getStatus(userId)
      if (!response.data) {
         dispatch(getProfileStatusSuccess(response.data))
      }
      dispatch(getProfileStatusSuccess(response.data))
   }
export const setProfileStatus = (status: string): ThunkType =>
   async dispatch => {
      let data = await profileApi.setStatus(status)
      if (data.resultCode === ResultCode.Success) {
         dispatch(getProfileStatusSuccess(status))
      }
   }
export const setProfileContactInfo = (fullName: string, aboutMe: string, lookingForAJobDescription: string, isMarried: boolean, youtube: string, website: string, facebook: string, github: string, userId: number): ThunkType =>
   async dispatch => {
      let data = await profileApi.setContactInfo(fullName, aboutMe, lookingForAJobDescription, isMarried, youtube, website, facebook, github)
      if (data.resultCode === ResultCode.Success) {
         dispatch(getProfileMeInfo(userId))
         dispatch(getProfileInfo(userId))
      }
   }