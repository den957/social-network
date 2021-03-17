import React, { ChangeEvent, useState } from 'react'
import s from './Profile.module.css'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faHome } from '@fortawesome/free-solid-svg-icons'
import { ProfileReduxPost } from './ProfilePostCreate/ProfilePost'
import ProfilePostList from './ProfilePostList/ProfilePostList'
import { InfoType, PostType } from '../../redux/profile.reducer'

type PropsType = {
   setProfileImage: (image: File) => void,
   addProfilePost: (dataPost: PostType) => void,
   profileInfo: InfoType,
   isOwner: boolean,
   profileStatus: string,
   editModalStatus: (el: boolean) => void,
   isAuth: boolean,
   profileMeInfo: InfoType,
   profilePosts: Array<PostType>,
   removeProfilePost: (id: string) => void,
   modalPost: boolean,
   setModalPost: (el: boolean) => void
}
const Profile: React.FC<PropsType> = ({ setProfileImage, addProfilePost, profileInfo, isOwner, profileStatus, editModalStatus, isAuth, ...props }) => {
   const [modalPost, setModalPost] = useState<boolean>(false)
   const [isShowDetails, editIsShowDetails] = useState<boolean>(false)
   const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         setProfileImage(e.target.files[0])
      }
   }
   const generateDate = () => {
      return new Date()
   }
   const onSubmit = (dataPosts: PostType) => {
      setModalPost(false)
      let id = `f${(+new Date).toString(16)}`;
      let date = `${generateDate().toLocaleDateString()} at ${generateDate().toLocaleTimeString()}`
      const dataPost = {
         id: id,
         post: dataPosts.post,
         date: date
      }
      addProfilePost(dataPost)
   }
   return (
      <div className={s.profile}>
         <div className={s.profile__row}>
            {/* NARROW COLUMN */}
            <div className={s.profile__narrow}>
               <div className={s.profile__me}>
                  <div className={s.meProfile__photo}><img src={profileInfo.photos.small ? profileInfo.photos.small : logo} />
                     {isOwner &&
                        <div className={s.meProfile__block}>
                           <div className={s.meProfile__refresh}>
                              <label className={s.refreshProfile__fake} htmlFor={'avatar-img'}><FontAwesomeIcon icon={faArrowAltCircleUp} className={s.refreshProfile__arrowTop} /><span>Refresh photo</span></label>
                              <input className={s.refreshProfile__input} type='file' id={'avatar-img'} name='avatar-img' onChange={(e) => { onChangeAvatar(e) }} />
                           </div>
                        </div>
                     }
                  </div>
               </div>
               {isOwner
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
                     <h4>{profileInfo.fullName}</h4>
                  </div>
                  {isOwner
                     ? <>
                        {profileStatus
                           ? <div className={s.infoProfile__status} >
                              <div onClick={(e) => { editModalStatus(true) }}>{profileStatus}</div>
                           </div>
                           : <div className={s.infoProfile__status} >
                              <div className={s.infoProfile__fakeStatus} onClick={() => { editModalStatus(true) }}>status</div>
                           </div>
                        }
                     </>
                     : <>
                        {profileStatus
                           ? <div className={s.statusProfile__user}>
                              <div>{profileStatus}</div>
                           </div>
                           : <div className={s.statusProfile__empty}></div>
                        }
                     </>
                  }
                  <div className={s.infoProfile__line}></div>
                  <div className={s.infoProfile__information}>
                     <div className={cn(s.informationProfile__row, s.informationProfile)}>
                        <span className={s.informationProfile__title}>About me: </span>
                        {profileInfo.aboutMe
                           ? <span className={s.informationProfile__answer} >{profileInfo.aboutMe}</span>
                           : <span className={s.informationProfile__answer}>not specified</span>
                        }
                        <span className={s.informationProfile__title}>Town: </span>
                        {profileInfo.lookingForAJobDescription
                           ? <span className={s.informationProfile__answer}>{profileInfo.lookingForAJobDescription}</span>
                           : <span className={s.informationProfile__answer}>not specified</span>
                        }
                        <span className={s.informationProfile__title}>Family status: </span>
                        {profileInfo.lookingForAJob
                           ? <span className={s.informationProfile__answer}>married</span>
                           : <span className={s.informationProfile__answer}>not married</span>
                        }
                     </div>
                  </div>
                  {isShowDetails
                     ? <>
                        <div className={s.infoProfile__showDetails} onClick={() => editIsShowDetails(false)}>
                           <span>Hide detailed information</span>
                        </div>
                        <div className={s.infoProfile__information}>
                           <div className={s.infoProfile__line}></div>
                           <div className={cn(s.informationProfile__row, s.informationProfile)}>
                              <span className={s.informationProfile__title}>YouTube: </span>
                              {profileInfo.contacts.youtube
                                 ? <span className={s.informationProfile__answer}>{profileInfo.contacts.youtube}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>Facebook: </span>
                              {profileInfo.contacts.facebook
                                 ? <span className={s.informationProfile__answer}>{profileInfo.contacts.facebook}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>LinkedIn: </span>
                              {profileInfo.contacts.website
                                 ? <span className={s.informationProfile__answer}>{profileInfo.contacts.website}</span>
                                 : <span className={s.informationProfile__answer}>not specified</span>
                              }
                              <span className={s.informationProfile__title}>GitHub: </span>
                              {profileInfo.contacts.github
                                 ? <span className={s.informationProfile__answer}>{profileInfo.contacts.github}</span>
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
               {isOwner && isAuth &&
                  <>
                     <div className={s.profile__addPost}>
                        <div className={s.addPostProfile__row}>
                           <div className={s.addPostProfile__logo}>
                              <img src={props.profileMeInfo.photos.small as string} />
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
export default Profile