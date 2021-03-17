import React from 'react'
import s from './UsersAll.module.css'
import cn from 'classnames'
import userIcon from '../../../assets/images/userIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import PreloaderLine from '../../Common/Preloader/PreloaderLine/PreloaderLine'
import { UsersType } from '../../../redux/users.reducer'

type PropsType = {
   isAuth: boolean,
   usersUnfollowed: Array<UsersType>,
   readyToggle: Array<number>,
   followUserTC: (userId: number) => void,
}
export const UsersAll: React.FC<PropsType> = ({ usersUnfollowed, isAuth, readyToggle, followUserTC }) => {
   return (
      <div className={s.usersAll}>
         <div className={s.usersAll__title}>
            Find friends
         </div>
         <div className={s.usersAll__body}>
            <div className={s.bodyUsersAll__row}>
               {usersUnfollowed.map((user) => {
                  return (
                     <div className={s.bodyUsersAll__item} key={user.id}>
                        <NavLink className={s.bodyUsersAll__image} to={`/profile/${user.id}`}>
                           {user.photos.small
                              ? <img src={user.photos.small} />
                              : <img src={userIcon} />
                           }
                        </NavLink>
                        <div className={s.bodyUsersAll__body}>
                           <div className={cn(s.bodyUsersAll__row, s.bodyUsersAll)}>
                              <NavLink className={s.bodyUsersAll__name} to={`/profile/${user.id}`}>
                                 <span>{user.name}</span>
                              </NavLink>
                              <div className={s.bodyUsersAll__subscribe}>
                                 {!user.followed && isAuth
                                    ? <button className={s.bodyUsersAll__abled} disabled={readyToggle.some((userId) => userId === user.id)} onClick={(e) => { followUserTC(user.id) }}><FontAwesomeIcon icon={faUserPlus} /></button>
                                    : <button className={s.bodyUsersAll__disabled} disabled={true}><FontAwesomeIcon icon={faUserPlus} /></button>
                                 }
                              </div>
                           </div>
                        </div>
                     </div>
                  )
               })
               }
               {
                  function () {
                     return (
                        <div className={s.preloader__UsersAllWrapper}>
                           <div className={s.preloader__UsersAllBlock}>
                              <PreloaderLine />
                           </div>
                        </div >
                     )
                  }()
               }
            </div>
         </div>
      </div>
   )
}