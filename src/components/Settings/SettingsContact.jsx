import React from 'react'
import s from './SettingsContact.module.css'
import { SettingsContactReduxForm } from './SettingsContactForm'
import { connect } from 'react-redux'
import { setProfileContactInfo } from '../../redux/profile.reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

export const SettingsContact = (props) => {
   const onSubmit = (dataContact) => {
      const
         [
            fullName,
            aboutMe,
            lookingForAJobDescription,
            lookingForAJob,
            youtube,
            facebook,
            github,
            website,
            userId
         ] = [
               dataContact.fullName,
               dataContact.aboutMe,
               dataContact.lookingForAJobDescription,
               dataContact.lookingForAJob,
               dataContact.youtube,
               dataContact.facebook,
               dataContact.github,
               dataContact.website,
               props.userId
            ]
      props.setProfileContactInfo(fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github, userId)
   }
   return (
      <div className={s.settings}>
         <div className={s.settings__title}>
            Settings
         </div>
         <div className={s.settings__body}>
            <SettingsContactReduxForm onSubmit={onSubmit} />
         </div>
      </div>
   )
}
const mapStateToProps = (state) => {
   return {
      userId: state.auth.id
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      setProfileContactInfo: (fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github, userId) => { dispatch(setProfileContactInfo(fullName, aboutMe, lookingForAJobDescription, lookingForAJob, youtube, website, facebook, github, userId)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(SettingsContact))