import React, { useEffect, useState } from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import logoImg from '../../assets/images/logoImg.png'
import cn from 'classnames'
import { connect } from 'react-redux'
import { logOutServerTC } from '../../redux/auth.reducer'
import Preloader from '../Common/Preloader/Preloader'
import { getProfileMeInfo } from '../../redux/profile.reducer'

export const Header = (props) => {
   let [modal, editModal] = useState(false)
   return (
      <div className={s.header} >
         <div className={s.header__container}>
            <div className={s.header__row}>
               <div className={cn(s.header__logo, s.logoHeader)}>
                  <div className={s.logoHeader__row}>
                     <div className={s.logoHeader__img}>
                        <img src={logoImg} />
                     </div>
                     <div className={s.logoHeader__name}>
                        vkontakte
                     </div>
                  </div>
               </div>
               {props.isAuth
                  ? <>
                     {!modal
                        ? <div className={cn(s.header__body, s.bodyHeader)} onClick={() => editModal(true)}>
                           <div className={s.bodyHeader__row}>
                              <div className={s.bodyHeader__fullName}>{props.isAuth && props.profileMeInfo.fullName}</div>
                              <div className={s.bodyHeader__logo}>{props.isAuth && <img src={props.profileMeInfo.photos.small} />}</div>
                              <div className={s.bodyHeader__arrow}><FontAwesomeIcon icon={faChevronDown} /></div>
                           </div>
                        </div>
                        : <div className={s.header__body, s.bodyHeader} onClick={() => editModal(false)}>
                           <div className={s.bodyHeader__row}>
                              <div className={s.bodyHeader__fullName}>{props.isAuth && props.profileMeInfo.fullName}</div>
                              <div className={s.bodyHeader__logo}>{props.isAuth && <img src={props.profileMeInfo.photos.small} />}</div>
                              <div className={s.bodyHeader__arrow}><FontAwesomeIcon icon={faChevronDown} /></div>
                           </div>
                        </div>
                     }
                  </>
                  : <div className={s.header__login}>
                     <NavLink className={s.loginHeader__link} to={'/login'}>Login</NavLink>
                  </div>
               }
            </div>
            {modal &&
               <div className={s.header__modal}>
                  <div className={s.modalHeader__item} onClick={() => editModal(false)}>
                     <NavLink to={'/settings'} className={s.modalHeader__link}>Settings</NavLink>
                  </div>
                  <div className={s.modalHeader__line}></div>
                  <div className={s.modalHeader__link} onClick={() => { props.logOutServerTC(); editModal(false) }}>
                     <span>Log Out</span>
                  </div>
               </div>
            }
         </div>
      </div >
   )
}

const HeaderContainer = (props) => {
   useEffect(() => {
      if (props.isAuth) {
         props.getProfileMeInfo(props.userId)
      }
   }, [props.isAuth])
   if (props.isAuth) {
      if (!props.profileMeInfo) {
         return (
            <div className={s.preloader__headerWrapper}>
               <div className={s.preloader__headerBlock}>
                  <Preloader />
               </div>
            </div >
         )
      }
   }
   return (
      <Header profileMeInfo={props.profileMeInfo} userId={props.userId} login={props.login} isAuth={props.isAuth} logOutServerTC={props.logOutServerTC} getProfileMeInfo={props.getProfileMeInfo} />
   )
}
const mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth,
      login: state.auth.login,
      userId: state.auth.id,
      profileMeInfo: state.profile.profileMeInfo,
      profileImage: state.profile.profileImage,
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      logOutServerTC: () => { dispatch(logOutServerTC()) },
      getProfileMeInfo: (userId) => { dispatch(getProfileMeInfo(userId)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)