import React, { useEffect } from 'react'
import s from './Users.module.css'
import { connect } from 'react-redux'
import { AppReducerType } from '../../redux/store'
import { getUsersFollowedTC, unfollowUserTC } from '../../redux/users.reducer'
import { UsersType } from '../../redux/users.reducer'
import PreloaderLine from '../Common/Preloader/PreloaderLine/PreloaderLine'
import Users from './Users'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

type MapStateToPropsType = {
   isAuth: boolean,
   usersFollowed: Array<UsersType>,
   readyToggle: Array<number>,
   totalCount: number | null,
   countFollowed: number,
   pageFollowed: number,
   isReadyPage: boolean,
}
type MapDispatchToPropsType = {
   unfollowUserTC: (userId: number) => void,
   getUsersFollowedTC: (count: number, pageFollowed: number, boolean: boolean) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const UsersContainer: React.FC<PropsType> = ({ countFollowed, isReadyPage, getUsersFollowedTC, ...props }) => {
   useEffect(() => {
      let [page, count] = [1, countFollowed]
      getUsersFollowedTC(count, page, true)
   }, [])
   let onPageChange = (pageFollowed: number) => {
      let count = countFollowed
      getUsersFollowedTC(count, pageFollowed, true)
   }
   return (
      <>
         {isReadyPage
            ? <Users isAuth={props.isAuth} pageFollowed={props.pageFollowed} usersFollowed={props.usersFollowed} countFollowed={countFollowed} totalCount={props.totalCount} onPageChange={onPageChange} unfollowUserTC={props.unfollowUserTC} readyToggle={props.readyToggle} />
            : <div className={s.preloader__usersWrapper}>
               <div className={s.preloader__usersBlock}>
                  <PreloaderLine />
               </div>
            </div >
         }
      </>
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToPropsType => {
   return {
      countFollowed: state.users.countFollowed,
      pageFollowed: state.users.pageFollowed,
      totalCount: state.users.totalCount,
      usersFollowed: state.users.usersFollowed,
      isReadyPage: state.users.isReadyPage,
      readyToggle: state.users.readyToggle,
      isAuth: state.auth.isAuth
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToPropsType => {
   return {
      getUsersFollowedTC: (count: number, pageFollowed: number, follower: boolean) => { dispatch(getUsersFollowedTC(count, pageFollowed, follower)) },
      unfollowUserTC: (userId: number) => { dispatch(unfollowUserTC(userId)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)