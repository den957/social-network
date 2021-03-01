import React from "react"
import s from './ModalStatusForm.module.css'
import { Field, reduxForm } from "redux-form"

const ModalStatusForm = (props) => {
   return (
      <form className={s.form__modalStatus} onSubmit={props.handleSubmit}>
         <Field autoFocus initialValue={props.profileStatus} className={s.modalStatus__input} component={'input'} type={'text'} name={'status'} />
         <button className={s.modalStatus__button} type={'submit'}>Save</button>
      </form>
   )
}
const ModalStatusReduxForm = reduxForm({ form: 'profileStatus' })(ModalStatusForm)
export default ModalStatusReduxForm