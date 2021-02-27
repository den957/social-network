import React, { useEffect, useState } from 'react'
import s from './UsersAll.module.css'
import cn from 'classnames'
import { connect } from 'react-redux'
import { followUserTC, getOnceUnfollowedTC, getUsersUnfollowedTC, isFetchingUsers, unfollowUserTC } from '../../redux/users.reducer'
import Preloader from '../Common/Preloader/Preloader'
import userIcon from '../../assets/images/userIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import PreloaderLine from '../Common/Preloader/PreloaderLine/PreloaderLine'

export const UsersAll = (props) => {
   return (
      <div className={s.usersAll}>
         <div className={s.usersAll__title}>
            Find friends
         </div>
         <div className={s.usersAll__body}>
            <div className={s.bodyUsersAll__row}>
               {props.usersUnfollowed.map((user) => {
                  return (
                     <div className={s.bodyUsersAll__item}>
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
                                 {!user.followed && props.isAuth
                                    ? <button className={s.bodyUsersAll__abled} disabled={props.isReadyToggle.some((userId) => userId === user.id)} onClick={(e) => { props.followUserTC(user.id) }}><FontAwesomeIcon icon={faUserPlus} /></button>
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
const UserAllContainer = (props) => {
   const [isFetchingOnce, setIsFetchingOnce] = useState(false)
   let [page, count] = [props.pageUnfollowed, props.countUnfollowed]
   useEffect(() => {
      if (!isFetchingOnce) {
         props.getOnceUnfollowedTC()
         setIsFetchingOnce(true)
      }
   }, [])
   useEffect(() => {
      if (props.isFetching) {
         props.getUsersUnfollowedTC(count, page, false)
      }
   }, [props.isFetching])
   useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return () => {
         document.removeEventListener('scroll', scrollHandler)
      }
   }, [])
   const scrollHandler = (e) => {
      const [scrollHeight, scrollTop, innerHeight] = [e.target.documentElement.scrollHeight, e.target.documentElement.scrollTop, window.innerHeight]
      if (scrollTop + 100 >= scrollHeight - innerHeight) {
         props.isFetchingUsers(true)
      }
   }
   return (
      <>
         {isFetchingOnce
            ? <UsersAll isAuth={props.isAuth} unfollowUserTC={props.unfollowUserTC} usersUnfollowed={props.usersUnfollowed} isReadyToggle={props.isReadyToggle} followUserTC={props.followUserTC} />
            : <div className={s.preloader__UsersAllContainerWrapper}>
               <div className={s.preloader__UsersAllContainerBlock}>
                  <Preloader />
               </div>
            </div >
         }
      </>
   )
}
const mapStateToProps = (state) => {
   return {
      usersFollowed: state.users.usersFollowed,
      usersUnfollowed: state.users.usersUnfollowed,
      countUnfollowed: state.users.countUnfollowed,
      pageUnfollowed: state.users.pageUnfollowed,
      isFetching: state.users.isFetching,
      isReadyToggle: state.users.isReadyToggle,
      isAuth: state.auth.isAuth
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      getUsersUnfollowedTC: (count, pageUnfollowed, follower) => { dispatch(getUsersUnfollowedTC(count, pageUnfollowed, follower)) },
      isFetchingUsers: (bool) => { dispatch(isFetchingUsers(bool)) },
      followUserTC: (userId) => { dispatch(followUserTC(userId)) },
      unfollowUserTC: (userId) => { dispatch(unfollowUserTC(userId)) },
      getOnceUnfollowedTC: () => { dispatch(getOnceUnfollowedTC()) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAllContainer)