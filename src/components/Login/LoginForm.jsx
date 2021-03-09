import React from 'react'
import s from './LoginForm.module.css'
import { Field, reduxForm } from "redux-form";
import { required } from "../../validators/validators";
import { useState } from "react";
import { Input, CheckBoxLogin } from "../Common/FormControl/FormControl";

export const LoginForm = (props) => {
   const [checked, setChecked] = useState(false)
   const [activeCheckbox, setActiveCheckbox] = useState(`${s.login__checkbox}`)
   return (
      <form className={s.login__form} onSubmit={props.handleSubmit}>
         <div className={s.login__item}><Field className={s.login__input} component={Input} type={'input'} name={'email'} validate={required} /></div>
         <div className={s.login__item}><Field className={s.login__input} component={Input} type={'password'} name={'password'} validate={required} /></div>
         <div className={s.login__item}>
            {!checked
               ? <label>
                  <div className={s.login__checkboxBlock} onClick={() => { setActiveCheckbox(`${s.login__checkbox} ${s.checkbox__active}`); setChecked(true); }} >
                     <div className={activeCheckbox}></div>
                     <span>Remember me</span>
                  </div>
                  <Field className={s.checkboxLogin} component={'input'} type={'checkbox'} name={'rememberMe'} checked={checked} />
               </label>
               : <label>
                  <div className={s.login__checkboxBlock} onClick={() => { setActiveCheckbox(`${s.login__checkbox}`); setChecked(false); }} >
                     <div className={activeCheckbox}></div>
                     <span>Remember me</span>
                  </div>
                  <Field className={s.checkboxLogin} component={'input'} type={'checkbox'} name={'rememberMe'} checked={checked} />
               </label>
            }
         </div>
         <div>
            {props.isCaptcha && <img className={s.login__captcha} src={props.urlCaptcha} />}
            {props.isCaptcha && <div className={s.login__item}><Field className={s.login__input} component={'input'} type={'input'} name={'captcha'} /></div>}
         </div>
         <button className={s.login__button} type={'submit'}>To come in</button>
      </form>
   )
}
export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)