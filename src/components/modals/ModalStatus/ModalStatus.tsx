import React from 'react'
import s from './ModalStatus.module.css'
import { connect } from 'react-redux'
import { InfoType, setProfileStatus } from '../../../redux/profile.reducer'
import ModalStatusReduxForm from './ModalStatusForm'
import { AppReducerType } from '../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
export type DataFormStatusType = {
   status: string
}
type MapStateToProps = {
   profileStatus: string
}
type MapDispatchToProps = {
   setProfileStatus: (status: string) => void
}
type OwnProps = {
   editModalStatus: (text: boolean) => void
}
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps
export const ModalStatus: React.FC<PropsType> = ({ editModalStatus, setProfileStatus, ...props }) => {
   const onSubmit = (dataForm: DataFormStatusType): void => {
      if (Object.getOwnPropertyNames(dataForm).length > 0) {
         setProfileStatus(dataForm.status)
         editModalStatus(false)
      }
      else {
         setProfileStatus('')
         editModalStatus(false)
      }
   }
   return (
      <div className={s.modalStatus} onClick={() => editModalStatus(false)}>
         <div className={s.modalStatus__window} onClick={(e) => e.stopPropagation()}>
            <ModalStatusReduxForm onSubmit={onSubmit} profileStatus={props.profileStatus} />
         </div>
      </div>
   )
}
const mapStateToProps = (state: AppReducerType): MapStateToProps => {
   return {
      profileStatus: state.profile.profileStatus
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToProps => {
   return {
      setProfileStatus: (status: string) => { dispatch(setProfileStatus(status)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalStatus)