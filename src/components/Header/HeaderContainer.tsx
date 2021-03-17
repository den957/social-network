import React, { useEffect } from 'react'
import s from './Header.module.css'
import { connect } from 'react-redux'
import { logOutServerTC } from '../../redux/auth.reducer'
import Preloader from '../Common/Preloader/Preloader'
import { getProfileMeInfo, InfoType } from '../../redux/profile.reducer'
import { AppReducerType } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Header from './Header'

type PropsType = MapStateToProps & MapDispatchToProps
type MapStateToProps = {
   isAuth: boolean,
   userId: number | null,
   profileMeInfo: InfoType | null,
}
type MapDispatchToProps = {
   logOutServerTC: () => void,
   getProfileMeInfo: (userId: number) => void
}
const HeaderContainer: React.FC<PropsType> = ({ getProfileMeInfo, userId, ...props }) => {
   useEffect(() => {
      if (props.isAuth) {
         getProfileMeInfo(userId as number)
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
      <Header {...props} />
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToProps => {
   return {
      isAuth: state.auth.isAuth,
      userId: state.auth.id,
      profileMeInfo: state.profile.profileMeInfo,
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
   return {
      logOutServerTC: () => { dispatch(logOutServerTC()) },
      getProfileMeInfo: (userId: number) => { dispatch(getProfileMeInfo(userId)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)