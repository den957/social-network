import React from 'react'
import s from './ModalStatus.module.css'
import { connect } from 'react-redux'
import { setProfileStatus } from '../../../redux/profile.reducer'
import ModalStatusReduxForm from './ModalStatusForm'

export const ModalStatus = (props) => {
   const onSubmit = (dataForm) => {
      let status = dataForm.status
      props.setProfileStatus(status)
      props.editModalStatus(false)
   }
   return (
      <div className={s.modalStatus} onClick={() => props.editModalStatus(false)}>
         <div className={s.modalStatus__window} onClick={(e) => e.stopPropagation()}>
            <ModalStatusReduxForm profileStatus={props.profileStatus} onSubmit={onSubmit} profileStatus={props.profileStatus} />
         </div>
      </div>
   )
}
const mapStateToProps = (state) => {
   return {
      profileStatus: state.profile.profileStatus
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      setProfileStatus: (status) => { dispatch(setProfileStatus(status)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalStatus)