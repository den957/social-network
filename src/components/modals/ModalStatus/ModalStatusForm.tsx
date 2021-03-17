import React from "react"
import s from './ModalStatusForm.module.css'
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { DataFormStatusType } from "./ModalStatus"
type OwnPropsType = {
   profileStatus: string
}
const ModalStatusForm: React.FC<InjectedFormProps<DataFormStatusType, OwnPropsType> & OwnPropsType> = ({ profileStatus, handleSubmit }) => {
   return (
      <form className={s.form__modalStatus} onSubmit={handleSubmit}>
         <Field autoFocus initialValue={profileStatus} className={s.modalStatus__input} component={'input'} type={'text'} name={'status'} />
         <button className={s.modalStatus__button} type={'submit'}>Save</button>
      </form>
   )
}
const ModalStatusReduxForm = reduxForm<DataFormStatusType, OwnPropsType>({ form: 'profileStatus' })(ModalStatusForm)
export default ModalStatusReduxForm