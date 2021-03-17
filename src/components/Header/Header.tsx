import React, { useState } from 'react'
import s from './Header.module.css'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import logoImg from '../../assets/images/logoImg.png'
import { InfoType } from '../../redux/profile.reducer'

type PropsType = {
   isAuth: boolean,
   profileMeInfo: InfoType | null,
   logOutServerTC: () => void
}
const Header: React.FC<PropsType> = ({ isAuth, profileMeInfo, logOutServerTC }) => {
   let [modal, editModal] = useState<boolean>(false)
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
               {isAuth
                  ? <>
                     {!modal
                        ? <div className={cn(s.header__body, s.bodyHeader)} onClick={() => editModal(true)}>
                           <div className={s.bodyHeader__row}>
                              <div className={s.bodyHeader__fullName}>{isAuth && profileMeInfo?.fullName}</div>
                              <div className={s.bodyHeader__logo}>{isAuth && <img src={(profileMeInfo as InfoType).photos.small as string} />}</div>
                              <div className={s.bodyHeader__arrow}><FontAwesomeIcon icon={faChevronDown} /></div>
                           </div>
                        </div>
                        : <div className={cn(s.header__body, s.bodyHeader)} onClick={() => editModal(false)}>
                           <div className={s.bodyHeader__row}>
                              <div className={s.bodyHeader__fullName}>{isAuth && profileMeInfo?.fullName}</div>
                              <div className={s.bodyHeader__logo}>{isAuth && <img src={(profileMeInfo as InfoType).photos.small as string} />}</div>
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
                  <div className={s.modalHeader__link} onClick={() => { logOutServerTC(); editModal(false) }}>
                     <span>Log Out</span>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}
export default Header