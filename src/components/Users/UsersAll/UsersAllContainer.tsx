import React, { useEffect, useState } from 'react'
import s from './UsersAll.module.css'
import { connect } from 'react-redux'
import { followUserTC, getOnceUnfollowedTC, getUsersUnfollowedTC, isFetchingUsers } from '../../../redux/users.reducer'
import Preloader from '../../Common/Preloader/Preloader'
import { ReadyToggleType, UsersType } from '../../../types/types'
import { AppReducerType } from '../../../redux/store'
import { UsersAll } from './UsersAll'

type MapStateToPropsType = {
   isAuth: boolean,
   readyToggle: Array<ReadyToggleType>,
   usersUnfollowed: Array<UsersType>,
   countUnfollowed: number,
   pageUnfollowed: number,
   isFetching: boolean,
}
type MapDispatchToPropsType = {
   followUserTC: (userId: number) => void,
   getUsersUnfollowedTC: (count: number, page: number, boolean: boolean) => void,
   getOnceUnfollowedTC: () => void,
   isFetchingUsers: (bool: boolean) => void,
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const UserAllContainer: React.FC<PropsType> = ({ isFetchingUsers, pageUnfollowed, isFetching, countUnfollowed, getOnceUnfollowedTC, getUsersUnfollowedTC, ...props }) => {
   const [isFetchingOnce, setIsFetchingOnce] = useState(false)
   let [page, count] = [pageUnfollowed, countUnfollowed]
   useEffect(() => {
      if (!isFetchingOnce) {
         getOnceUnfollowedTC()
         setIsFetchingOnce(true)
      }
   }, [])
   useEffect(() => {
      if (isFetching) {
         getUsersUnfollowedTC(count, page, false)
      }
   }, [isFetching])
   useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return () => {
         document.removeEventListener('scroll', scrollHandler)
      }
   }, [])
   const scrollHandler = (e: any): void => {
      const [scrollHeight, scrollTop, innerHeight] = [e.target.documentElement.scrollHeight as number, e.target.documentElement.scrollTop as number, window.innerHeight as number]
      if (scrollTop + 100 >= scrollHeight - innerHeight) {
         isFetchingUsers(true)
      }
   }
   return (
      <>
         {isFetchingOnce
            ? <UsersAll isAuth={props.isAuth} followUserTC={props.followUserTC} usersUnfollowed={props.usersUnfollowed} readyToggle={props.readyToggle} />
            : <div className={s.preloader__UsersAllContainerWrapper}>
               <div className={s.preloader__UsersAllContainerBlock}>
                  <Preloader />
               </div>
            </div >
         }
      </>
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToPropsType => {
   return {
      usersUnfollowed: state.users.usersUnfollowed,
      countUnfollowed: state.users.countUnfollowed,
      pageUnfollowed: state.users.pageUnfollowed,
      isFetching: state.users.isFetching,
      readyToggle: state.users.readyToggle,
      isAuth: state.auth.isAuth
   }
}
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
   return {
      getUsersUnfollowedTC: (count: number, pageUnfollowed: number, follower: boolean): void => { dispatch(getUsersUnfollowedTC(count, pageUnfollowed, follower)) },
      isFetchingUsers: (bool: boolean): void => { dispatch(isFetchingUsers(bool)) },
      followUserTC: (userId: number): void => { dispatch(followUserTC(userId)) },
      getOnceUnfollowedTC: (): void => { dispatch(getOnceUnfollowedTC()) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAllContainer)