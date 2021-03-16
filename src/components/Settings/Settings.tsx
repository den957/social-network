import React, { useState } from 'react'
import s from './Settings.module.css'
import { SettingsReduxForm } from './SettingsForm'
import { connect } from 'react-redux'
import { setProfileContactInfo } from '../../redux/profile.reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { Redirect } from 'react-router-dom'
import { AppReducerType } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export type DataContactType = {
   fullName: string,
   aboutMe: string,
   lookingForAJobDescription: string,
   married: boolean,
   youtube: string,
   facebook: string,
   github: string,
   website: string
}
type MapStateToProps = {
   userId: number | null,
}
type MapDispatchToProps = {
   setProfileContactInfo: (fullName: string, aboutMe: string, lookingForAJobDescription: string, isMarried: boolean, youtube: string, website: string, facebook: string, github: string, userId: number | null) => void
}
type PropsType = MapDispatchToProps & MapStateToProps

export const Settings: React.FC<PropsType> = ({ userId, setProfileContactInfo }) => {
   const [isLoad, setIsLoad] = useState<boolean>(false)
   const onSubmit = (dataContact: DataContactType): void => {
      const
         [
            fullName,
            aboutMe,
            lookingForAJobDescription,
            isMarried,
            youtube,
            facebook,
            github,
            website,
            id
         ] = [
               dataContact.fullName,
               dataContact.aboutMe,
               dataContact.lookingForAJobDescription,
               dataContact.married,
               dataContact.youtube,
               dataContact.facebook,
               dataContact.github,
               dataContact.website,
               userId
            ]
      setProfileContactInfo(fullName, aboutMe, lookingForAJobDescription, isMarried, youtube, website, facebook, github, id)
      setIsLoad(true)
   }
   if (isLoad) {
      return <Redirect to={'/profile'} />
   }
   return (
      <div className={s.settings}>
         <div className={s.settings__title}>
            Settings
         </div>
         <div className={s.settings__body}>
            <SettingsReduxForm onSubmit={onSubmit} />
         </div>
      </div>
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToProps => {
   return {
      userId: state.auth.id,
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToProps => {
   return {
      setProfileContactInfo: (fullName: string,
         aboutMe: string,
         lookingForAJobDescription: string,
         isMarried: boolean,
         youtube: string,
         website: string,
         facebook: string,
         github: string,
         userId: number | null): void => {
         dispatch(setProfileContactInfo(fullName,
            aboutMe,
            lookingForAJobDescription,
            isMarried,
            youtube,
            website,
            facebook,
            github,
            userId))
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Settings))