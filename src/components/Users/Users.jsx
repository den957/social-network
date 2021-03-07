import React, { useEffect } from 'react'
import s from './Users.module.css'
import { connect } from 'react-redux'
import { getUsersFollowedTC, unfollowUserTC } from '../../redux/users.reducer'
import PreloaderLine from '../Common/Preloader/PreloaderLine/PreloaderLine'
import Paginator from '../Common/Paginator/Paginator'
import { NavLink } from 'react-router-dom'
import userIcon from '../../assets/images/userIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'


export const Users = (props) => {
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
            {props.isAuth
               ? < div className={s.users__request}>
                  {props.usersFollowed.map((user) => {
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
                                          <button disabled={props.isReadyToggle.some((userId) => userId === user.id)} onClick={(e) => { props.unfollowUserTC(user.id) }}><FontAwesomeIcon icon={faUserMinus} /></button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={s.requestUsers__line}></div>
                        </div>
                     )
                  })}
                  <Paginator pageFollowed={props.pageFollowed} countFollowed={props.countFollowed} totalCount={props.totalCount} onPageChange={props.onPageChange} page={props.page} />
               </div>
               : <div className={s.login__warning}>
                  To view this page, you need to go to the site.
               </div>
            }
         </div>
      </>
   )
}
const UsersContainer = (props) => {
   useEffect(() => {
      let [page, count] = [1, props.countFollowed]
      props.getUsersFollowedTC(count, page, true)
   }, [props.isFollowed])
   let onPageChange = (pageFollowed) => {
      let count = props.countFollowed
      props.getUsersFollowedTC(count, pageFollowed, true)
   }
   return (
      <>
         {props.isReadyPage
            ? <Users isAuth={props.isAuth} pageFollowed={props.pageFollowed} usersFollowed={props.usersFollowed} countFollowed={props.countFollowed} totalCount={props.totalCount} onPageChange={onPageChange} page={props.page} unfollowUserTC={props.unfollowUserTC} followUserTC={props.followUserTC} isReadyToggle={props.isReadyToggle} />
            : <div className={s.preloader__usersWrapper}>
               <div className={s.preloader__usersBlock}>
                  <PreloaderLine />
               </div>
            </div >
         }
      </>
   )
}
const mapStateToProps = (state) => {
   return {
      countFollowed: state.users.countFollowed,
      pageFollowed: state.users.pageFollowed,
      totalCount: state.users.totalCount,
      usersFollowed: state.users.usersFollowed,
      isReadyPage: state.users.isReadyPage,
      isReadyToggle: state.users.isReadyToggle,
      isAuth: state.auth.isAuth
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      getUsersFollowedTC: (count, pageFollowed, follower) => { dispatch(getUsersFollowedTC(count, pageFollowed, follower)) },
      unfollowUserTC: (userId) => { dispatch(unfollowUserTC(userId)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)