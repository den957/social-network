import React, { useEffect, useState } from 'react'
import s from './Profile.module.css'
import cn from 'classnames'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { addProfilePost, getProfileInfo, getProfileMeInfo, getProfileStatus, removeProfilePost, setProfileImage, setProfileStatus } from '../../redux/profile.reducer'
import Preloader from '../Common/Preloader/Preloader'
import logo from '../../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faHome } from '@fortawesome/free-solid-svg-icons'
import { ProfileReduxPost } from './ProfilePostCreate/ProfilePost'
import ProfilePostList from './ProfilePostList/ProfilePostList'

const Profile = (props) => {
   const [modalPost, setModalPost] = useState(false)
   const [isShowDetails, editIsShowDetails] = useState(false)
   const onChangeAvatar = (e) => {
      let image = e.target.files[0]
      props.setProfileImage(image)
   }
   const generateDate = () => {
      return new Date()
   }
   const onSubmit = (dataPosts) => {
      setModalPost(false)
      let id = `f${(+new Date).toString(16)}`;
      let date = `${generateDate().toLocaleDateString()} at ${generateDate().toLocaleTimeString()}`
      const dataPost = {
         id: id,
         post: dataPosts.post,
         date: date
      }
      props.addProfilePost(dataPost)
   }
   return (
      <div className={s.profile}>
         <div className={s.profile__row}>
            {/* NARROW COLUMN */}
            <div className={s.profile__narrow}>
               <div className={s.profile__me}>
                  <div className={s.meProfile__photo}><img src={props.profileInfo.photos.small ? props.profileInfo.photos.small : logo} />
                     {props.isOwner &&
                        <div className={s.meProfile__block}>
                           <div className={s.meProfile__refresh}>
                              <label className={s.refreshProfile__fake} for={'avatar-img'}><FontAwesomeIcon icon={faArrowAltCircleUp} className={s.refreshProfile__arrowTop} /><span>Refresh photo</span></label>
                              <input className={s.refreshProfile__input} type='file' id={'avatar-img'} name='avatar-img' onChange={(e) => { onChangeAvatar(e) }} />
                           </div>
                        </div>
                     }
                  </div>
               </div>
               {props.isOwner
                  ? <>
                     <div className={s.profile__edit}>
                        <NavLink className={s.editProfile__settings} to={'/settings'}>Edit</NavLink>
                     </div>
                     <div className={s.profile__enter}>
                        <NavLink to={'/settings'}><span><FontAwesomeIcon icon={faHome} className={s.enterProfile__link} />Enter your contacts</span></NavLink>
                     </div>
                  </>
                  : < div className={s.profile__edit}>
                     <NavLink className={s.editProfile__messages} to={'/messages'}>Write a message</NavLink>
                  </div>
               }
            </div>
            {/* WIDE COLUMN */}
            <div className={s.profile__wide}>
               <div className={s.profile__info}>
                  <div className={s.infoProfile__fullName}>
                     <h4>{props.profileInfo.fullName}</h4>
                  </div>
                  {props.isOwner
                     ? <div className={s.infoProfile__status} >
                        <div onClick={(e) => { props.editModalStatus(true) }}>{props.profileStatus}</div>
                     </div>
                     : <>
                        {props.profileStatus
                           ? <div className={s.statusProfile__user}>
                              <div>{props.profileStatus}</div>
                           </div>
                           : <div className={s.statusProfile__empty}></div>
                        }
                     </>
                  }
                  <div className={s.infoProfile__line}></div>
                  <div className={s.infoProfile__information}>
                     <div className={cn(s.informationProfile__row, s.informationProfile)}>
                        <span className={s.informationProfile__title}>About me: </span>
                        {props.profileInfo.aboutMe
                           ? <span className={s.informationProfile__answer} >{props.profileInfo.aboutMe}</span>
                           : <span className={s.informationProfile__answer}>not specified</span>
                        }
                        <span className={s.informationProfile__title}>Town: </span>
                        {props.profileInfo.lookingForAJobDescription
                           ? <span className={s.informationProfile__answer}>{props.profileInfo.lookingForAJobDescription}</span>
                           : <span className={s.informationProfile__answer}>not specified</span>
                        }
                        <span className={s.informationProfile__title}>Family status: </span>
                        {props.profileInfo.lookingForAJob
                           ? <span className={s.informationProfile__answer}>married</span>
                           : <span className={s.informationProfile__answer}>not married</span>
                        }
                     </div>
                  </div>
                  {isShowDetails
                     ? <>
                        <div className={s.infoProfile__showDetails} onClick={(e) => editIsShowDetails(false)}>
                           <span>Hide detailed information</span>
                        </div>
                        <div className={s.infoProfile__information}>
                           <div className={s.infoProfile__line}></div>
                           <div className={cn(s.informationProfile__row, s.informationProfile)}>
                              <span className={s.informationProfile__title}>YouTube: </span>
                              {props.profileInfo.contacts.youtube
                                 ? <span className={s.informationProfile__answer}>{props.profileInfo.contacts.youtube}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>Facebook: </span>
                              {props.profileInfo.contacts.facebook
                                 ? <span className={s.informationProfile__answer}>{props.profileInfo.contacts.facebook}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>LinkedIn: </span>
                              {props.profileInfo.contacts.website
                                 ? <span className={s.informationProfile__answer}>{props.profileInfo.contacts.website}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>GitHub: </span>
                              {props.profileInfo.contacts.github
                                 ? <span className={s.informationProfile__answer}>{props.profileInfo.contacts.github}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                           </div>
                        </div>
                     </>
                     : <>
                        <div className={s.infoProfile__showDetails} onClick={(e) => editIsShowDetails(true)}>
                           <span>Show details</span>
                        </div>
                        <div></div>
                     </>
                  }
                  <div className={s.infoProfile__line}></div>
               </div>
               {props.isOwner && props.isAuth &&
                  <>
                     <div className={s.profile__addPost}>
                        <div className={s.addPostProfile__row}>
                           <div className={s.addPostProfile__logo}>
                              <img src={props.profileMeInfo.photos.small} />
                           </div>
                           <ProfileReduxPost onSubmit={onSubmit} setModalPost={setModalPost} modalPost={modalPost} />
                        </div>
                     </div>
                     {props.profilePosts.length > 0 &&
                        <ProfilePostList removeProfilePost={props.removeProfilePost} profileMeInfo={props.profileMeInfo} profilePosts={props.profilePosts} />
                     }
                  </>
               }
            </div>
         </div>
      </div >
   )
}
export const ProfileContainer = (props) => {
   useEffect(() => {
      let userId = props.match.params.userId
      if (!userId) {
         userId = props.userId
         if (!userId) {
            props.history.push('/login')
         }
         else {
            props.getProfileInfo(userId)
            props.getProfileMeInfo(userId)
            props.getProfileStatus(userId)
         }
      }
      else {
         props.getProfileInfo(userId)
         props.getProfileStatus(userId)
      }
   }, [props.match.params.userId, props.profileImage, props.isAuth])


   return (
      <>
         {props.isAuth
            ? props.profileInfo && props.profileMeInfo
               ? <Profile removeProfilePost={props.removeProfilePost} profilePosts={props.profilePosts} addProfilePost={props.addProfilePost} profileMeInfo={props.profileMeInfo} modalStatus={props.modalStatus} editModalStatus={props.editModalStatus} profileInfo={props.profileInfo} birthday={props.birthday} lookingForAJobDescription={props.lookingForAJobDescription} setProfileImage={props.setProfileImage} isOwner={!props.match.params.userId} profileStatus={props.profileStatus} profileImage={props.profileImage} setProfileStatus={props.setProfileStatus} lookingForAJob={props.lookingForAJob} isAuth={props.isAuth} />
               : <div className={s.preloader__profileWrapper}>
                  <div className={s.preloader__profileBlock}>
                     <Preloader />
                  </div>
               </div >
            : props.profileInfo
               ? <Profile removeProfilePost={props.removeProfilePost} profilePosts={props.profilePosts} addProfilePost={props.addProfilePost} modalStatus={props.modalStatus} editModalStatus={props.editModalStatus} profileInfo={props.profileInfo} birthday={props.birthday} lookingForAJobDescription={props.lookingForAJobDescription} setProfileImage={props.setProfileImage} isOwner={!props.match.params.userId} profileStatus={props.profileStatus} profileImage={props.profileImage} setProfileStatus={props.setProfileStatus} lookingForAJob={props.lookingForAJob} />
               : <div className={s.preloader__profileWrapper}>
                  <div className={s.preloader__profileBlock}>
                     <Preloader />
                  </div>
               </div >
         }
      </>
   )
}
const mapStateToProps = (state) => {
   return {
      userId: state.auth.id,
      isAuth: state.auth.isAuth,
      profileInfo: state.profile.profileInfo,
      profileImage: state.profile.profileImage,
      profileStatus: state.profile.profileStatus,
      profileMeInfo: state.profile.profileMeInfo,
      profilePosts: state.profile.profilePosts

   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      getProfileInfo: (userId) => { dispatch(getProfileInfo(userId)) },
      setProfileImage: (image) => { dispatch(setProfileImage(image)) },
      getProfileStatus: (userId) => { dispatch(getProfileStatus(userId)) },
      setProfileStatus: (status) => { dispatch(setProfileStatus(status)) },
      getProfileMeInfo: (userId) => { dispatch(getProfileMeInfo(userId)) },
      addProfilePost: (dataPost) => { dispatch(addProfilePost(dataPost)) },
      removeProfilePost: (id) => { dispatch(removeProfilePost(id)) }
   }
}
let withRouterUrlUserId = withRouter(ProfileContainer)
export default connect(mapStateToProps, mapDispatchToProps)(withRouterUrlUserId)