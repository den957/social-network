import React from 'react'
import s from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import { NavLink } from 'react-router-dom'
import userIcon from '../../assets/images/userIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { UsersType } from '../../redux/users.reducer'

type PropsType = {
   isAuth: boolean,
   usersFollowed: Array<UsersType>,
   readyToggle: Array<number>,
   totalCount: number | null,
   countFollowed: number,
   pageFollowed: number,
   onPageChange: (pageFollowed: number) => void
   unfollowUserTC: (userId: number) => void,
}
const Users: React.FC<PropsType> = ({ isAuth, usersFollowed, readyToggle, unfollowUserTC, ...props }) => {
   return (
      <>
         <div className={s.users}>
            <div className={s.users__title}>
               Users
            </div>
            <div className={s.users__menu}>
               <div className={s.menuUsers__row}>
                  <div className={s.menuUsers__title}>
                     My requests
                  </div>
                  <NavLink className={s.menuUsers__button} to={'/users/all'}>Find more</NavLink>
               </div>
            </div>
            {isAuth
               ? < div className={s.users__request}>
                  {usersFollowed.map((user) => {
                     return (
                        user.followed &&
                        <div className={s.requestUsers__item} key={user.id}>
                           <div className={s.itemUsers__row}>
                              <NavLink className={s.itemUsers__image} to={`/profile/${user.id}`}>
                                 {!user.photos.small
                                    ? <img src={userIcon} />
                                    : <img src={user.photos.small} />
                                 }
                              </NavLink>
                              <div className={s.itemUsers__body}>
                                 <NavLink className={s.bodyUsers__name} to={`/profile/${user.id}`}>{user.name}</NavLink>
                                 <div className={s.bodyUsers__navigation}>
                                    <div className={s.navigationUsers__row}>
                                       <NavLink className={s.navigationUsers__message} to={'/messages'}>Write a message</NavLink>
                                       <div className={s.navigationUsers__subscribe}>
                                          <button disabled={readyToggle.some((userId) => userId === user.id)} onClick={(e) => { unfollowUserTC(user.id) }}><FontAwesomeIcon icon={faUserMinus} /></button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={s.requestUsers__line}></div>
                        </div>
                     )
                  })}
                  <Paginator pageFollowed={props.pageFollowed} countFollowed={props.countFollowed} totalCount={props.totalCount} onPageChange={props.onPageChange} />
               </div>
               : <div className={s.login__warning}>
                  To view this page, you need to go to the site.
               </div>
            }
         </div>
      </>
   )
}
export default Users
