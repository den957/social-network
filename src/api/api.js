import axios from 'axios'


const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   withCredentials: true,
   headers: {
      "API-KEY": "f2f743b9-9231-4544-9bd3-51aae1b3e9f4"
   }
})
export const authApi = {
   me() {
      return instance.get('auth/me')
         .then(response => response.data)
   },
   logIn(email, password, rememberMe, captcha) {
      return instance.post('auth/login', { email, password, rememberMe, captcha })
         .then(response => response.data)
   },
   logOut() {
      return instance.delete('auth/login')
         .then(response => response.data)
   },
   getCaptcha() {
      return instance.get('/security/get-captcha-url')
         .then(response => response.data)
   }
}
export const userApi = {
   getUsers(count, page, follower) {
      return instance.get(`/users?count=${count}&page=${page}&friend=${follower}`)
         .then(response => response.data)
   },
   unfollow(userId) {
      return instance.delete(`/follow/${userId}`)
         .then(response => response.data)
   },
   follow(userId) {
      return instance.post(`/follow/${userId}`)
         .then(response => response.data)
   }
}
export const profileApi = {
   getProfile(userId) {
      return instance.get(`/profile/${userId}`)
         .then(response => response.data)
   },
   setImage(image) {
      const formData = new FormData()
      formData.append('image', image)
      return instance.post('/profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
         .then(response => response.data)
   },
   getStatus(userId) {
      return instance.get(`/profile/status/${userId}`)
   },
   setStatus(status) {
      return instance.put('/profile/status', { status })
         .then(response => response.data)
   },
   setContactInfo(fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github) {
      return instance.put('/profile', {
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