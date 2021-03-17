import React from 'react'
import s from './LoginForm.module.css'
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../validators/validators"
import { useState } from "react"
import { Input } from "../Common/FormControl/FormControl"
import { DataFormLoginType } from './Login'

type OwnPropsType = {
   isCaptcha: boolean,
   urlCaptcha: string | null
}

export const LoginForm: React.FC<InjectedFormProps<DataFormLoginType, OwnPropsType> & OwnPropsType> = ({ handleSubmit, isCaptcha, urlCaptcha }) => {
   const [checked, setChecked] = useState<boolean>(false)
   const [activeCheckbox, setActiveCheckbox] = useState<string>(`${s.login__checkbox}`)
   return (
      <form className={s.login__form} onSubmit={handleSubmit}>
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
            {isCaptcha && <img className={s.login__captcha} src={urlCaptcha as string} />}
            {isCaptcha && <div className={s.login__item}><Field className={s.login__input} component={'input'} type={'input'} name={'captcha'} /></div>}
         </div>
         <button className={s.login__button} type={'submit'}>To come in</button>
      </form>
   )
}
export const LoginReduxForm = reduxForm<DataFormLoginType, OwnPropsType>({ form: 'login' })(LoginForm)