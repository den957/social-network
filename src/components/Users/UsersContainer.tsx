import React, { useEffect, useState } from 'react'
import s from './Users.module.css'
import { connect } from 'react-redux'
import { AppReducerType } from '../../redux/store'
import { getOnceUnfollowedTC, getUsersFollowedTC, getUsersSelectTC, getUsersUnfollowedTC, unfollowUserTC } from '../../redux/users.reducer'
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
   usersUnfollowed: Array<UsersType>,
   isUserSelected: boolean
}
type MapDispatchToPropsType = {
   unfollowUserTC: (userId: number) => void,
   getUsersFollowedTC: (count: number, pageFollowed: number, boolean: boolean, term: string) => void,
   getOnceUnfollowedTC: () => void,
   getUsersSelectTC: (count: number, pageUnfollowed: number, follower: boolean, term: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const UsersContainer: React.FC<PropsType> = ({ getOnceUnfollowedTC, countFollowed, isReadyPage, getUsersFollowedTC, ...props }) => {
   const [isFetchingOnce, setIsFetchingOnce] = useState(false)
   useEffect(() => {
      if (!isFetchingOnce) {
         getOnceUnfollowedTC()
         setIsFetchingOnce(true)
      }
   }, [])
   useEffect(() => {
      let [page, count] = [1, countFollowed]
      getUsersFollowedTC(count, page, true, '')
   }, [])
   let onPageChange = (pageFollowed: number) => {
      let count = countFollowed
      getUsersFollowedTC(count, pageFollowed, true, '')
   }
   return (
      <>
         {isReadyPage
            ? <Users isUserSelected={props.isUserSelected} getUsersSelectTC={props.getUsersSelectTC} isAuth={props.isAuth} usersUnfollowed={props.usersUnfollowed} pageFollowed={props.pageFollowed} usersFollowed={props.usersFollowed} countFollowed={countFollowed} totalCount={props.totalCount} onPageChange={onPageChange} unfollowUserTC={props.unfollowUserTC} readyToggle={props.readyToggle} />
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
      isAuth: state.auth.isAuth,
      usersUnfollowed: state.users.usersUnfollowed,
      isUserSelected: state.users.isUserSelected
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToPropsType => {
   return {
      getUsersSelectTC: (count: number, pageUnfollowed: number, follower: boolean, term: string): void => { dispatch(getUsersSelectTC(count, pageUnfollowed, follower, term)) },
      getUsersFollowedTC: (count: number, pageFollowed: number, follower: boolean, term: string) => { dispatch(getUsersFollowedTC(count, pageFollowed, follower, term)) },
      unfollowUserTC: (userId: number) => { dispatch(unfollowUserTC(userId)) },
      getOnceUnfollowedTC: (): void => { dispatch(getOnceUnfollowedTC()) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)