import React, { useEffect } from 'react'
import s from './Profile.module.css'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import Profile from './Profile'
import Preloader from '../Common/Preloader/Preloader'
import { addProfilePost, getProfileInfo, getProfileMeInfo, getProfileStatus, InfoType, PostType, removeProfilePost, setProfileImage } from '../../redux/profile.reducer'
import { AppReducerType } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

type MapStateToPropsType = {
   userId: number | null,
   profileInfo: InfoType | null,
   profileStatus: string,
   isAuth: boolean,
   profileMeInfo: InfoType | null,
   profilePosts: Array<PostType>,
   profileImage: string | null
}
type MapDispatchToPropsType = {
   getProfileInfo: (userId: number) => void,
   getProfileMeInfo: (userId: number) => void,
   getProfileStatus: (userId: number) => void,
   setProfileImage: (image: File) => void,
   addProfilePost: (dataPost: PostType) => void,
   removeProfilePost: (id: string) => void,
}
type OwnPropsType = {
   editModalStatus: (el: boolean) => void,
   setModalPost: (el: boolean) => void,
   modalPost: boolean,
}
type MathParamsType = {
   userId: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouteComponentProps<MathParamsType>
export const ProfileContainer: React.FC<PropsType> = ({ match, history, userId, getProfileInfo, getProfileMeInfo, getProfileStatus, profileImage, ...props }) => {
   useEffect(() => {
      let id: number | null = +match.params.userId
      if (!id) {
         if (!userId) {
            history.push('/login')
         }
         else {
            getProfileInfo(userId)
            getProfileMeInfo(userId)
            getProfileStatus(userId)
         }
      }
      else {
         getProfileInfo(id)
         getProfileStatus(id)
      }
   }, [match.params.userId, profileImage, props.isAuth])

   return (
      <>
         {props.profileInfo && props.profileMeInfo
            ? <Profile removeProfilePost={props.removeProfilePost} modalPost={props.modalPost} setModalPost={props.setModalPost} profilePosts={props.profilePosts} addProfilePost={props.addProfilePost} profileMeInfo={props.profileMeInfo} editModalStatus={props.editModalStatus} profileInfo={props.profileInfo} setProfileImage={props.setProfileImage} isOwner={!match.params.userId} profileStatus={props.profileStatus} isAuth={props.isAuth} />
            : <div className={s.preloader__profileWrapper}>
               <div className={s.preloader__profileBlock}>
                  <Preloader />
               </div>
            </div >
         }
      </>
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToPropsType => {
   return {
      userId: state.auth.id,
      isAuth: state.auth.isAuth,
      profileInfo: state.profile.profileInfo,
      profileStatus: state.profile.profileStatus,
      profileMeInfo: state.profile.profileMeInfo,
      profilePosts: state.profile.profilePosts,
      profileImage: state.profile.profileImage
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToPropsType => {
   return {
      getProfileInfo: (userId: number) => { dispatch(getProfileInfo(userId)) },
      setProfileImage: (image: File) => { dispatch(setProfileImage(image)) },
      getProfileStatus: (userId: number) => { dispatch(getProfileStatus(userId)) },
      getProfileMeInfo: (userId: number) => { dispatch(getProfileMeInfo(userId)) },
      addProfilePost: (dataPost: PostType) => { dispatch(addProfilePost(dataPost)) },
      removeProfilePost: (id: string) => { dispatch(removeProfilePost(id)) }
   }
}
let withRouterUrlUserId = withRouter(ProfileContainer)
export default connect(mapStateToProps, mapDispatchToProps)(withRouterUrlUserId)