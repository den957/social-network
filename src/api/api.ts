import { InfoType } from './../redux/profile.reducer';
import { UsersType } from './../redux/users.reducer';
import axios from 'axios'

export enum ResultCode {
   Success = 0,
   Failure = 1
}
export enum ResultCodeCaptcha {
   Captcha = 10
}
type DataResponseType = {
   resultCode: ResultCode
   messages: Array<string>,
   data: {}
}
const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   withCredentials: true,
   headers: {
      "API-KEY": "f2f743b9-9231-4544-9bd3-51aae1b3e9f4"
   }
})
type MeResponseType = {
   data: { id: number, email: string, login: string }
   resultCode: ResultCode,
   messages: Array<string>,
}
type LoginResponseType = {
   resultCode: ResultCode | ResultCodeCaptcha
   messages: Array<string>,
   data: {
      userId: number
   }
}
type GetCaptchaResponseType = {
   url: string
}
export const authApi = {
   me() {
      return instance.get<MeResponseType>('auth/me').then(response => response.data)
   },
   logIn(email: string, password: string, rememberMe: boolean, captcha: string) {
      return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
         .then(response => response.data)
   },
   logOut() {
      return instance.delete<DataResponseType>('auth/login')
         .then(response => response.data)
   },
   getCaptcha() {
      return instance.get<GetCaptchaResponseType>('/security/get-captcha-url')
         .then(response => response.data)
   }
}
type GetUsersResponseType = {
   items: Array<UsersType>,
   totalCount: number,
   error: string
}
export const userApi = {
   getUsers(count: number, page: number, follower: boolean) {
      return instance.get<GetUsersResponseType>(`/users?count=${count}&page=${page}&friend=${follower}`)
         .then(response => response.data)
   },
   unfollow(userId: number) {
      return instance.delete<DataResponseType>(`/follow/${userId}`)
         .then(response => response.data)
   },
   follow(userId: number) {
      return instance.post<DataResponseType>(`/follow/${userId}`)
         .then(response => response.data)
   }
}
type GetProfileResponseType = InfoType
type SetImageResponseType = {
   resultCode: ResultCode
   messages: Array<string>,
   data: {
      photos: {
         small: string,
         large: string
      }
   }
}
export const profileApi = {
   getProfile(userId: number) {
      return instance.get<GetProfileResponseType>(`/profile/${userId}`)
         .then(response => response.data)
   },
   setImage(image: File) {
      const formData = new FormData()
      formData.append('image', image)
      return instance.post<SetImageResponseType>('/profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(response => response.data)
   },
   getStatus(userId: number) {
      return instance.get<string>(`/profile/status/${userId}`)
   },
   setStatus(status: string) {
      return instance.put<DataResponseType>('/profile/status', { status })
         .then(response => response.data)
   },
   setContactInfo(fullName: string, aboutMe: string, lookingForAJobDescription: string, lookingForAJob: boolean, youtube: string, website: string, facebook: string, github: string) {
      return instance.put<DataResponseType>('/profile', {
         fullName: fullName,
         aboutMe: aboutMe,
         lookingForAJobDescription: lookingForAJobDescription,
         lookingForAJob: lookingForAJob,
         contacts: {
            youtube: youtube,
            website: website,
            facebook: facebook,
            github: github
         }
      })
         .then(response => response.data)
   }
}