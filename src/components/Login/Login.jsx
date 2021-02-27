import React from 'react'
import s from './Login.module.css'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logInServerTC } from "../../redux/auth.reducer"
import { LoginReduxForm } from "./LoginForm"

export const Login = (props) => {
   const onSubmit = (dataForm) => {
      let [email, password, rememberMe, captcha] = [dataForm.email, dataForm.password, dataForm.rememberMe, dataForm.captcha]
      props.logInServerTC(email, password, rememberMe, captcha)
   }
   if (props.isAuth) {
      return <Redirect to={'/profile'} />
   }
   return (
      <div className={s.login}>
         <div className={s.login__title}>
            Login
         </div>
         <div className={s.login__warning}>
            To view this page, you need to go to the site.
         </div>
         <LoginReduxForm isCaptcha={props.isCaptcha} onSubmit={onSubmit} urlCaptcha={props.urlCaptcha} />
      </div>
   )
}
const mapDispatchToProps = (dispatch) => {
   return {
      logInServerTC: (email, password, rememberMe, captcha) => { dispatch(logInServerTC(email, password, rememberMe, captcha)) }
   }
}
const mapStateToProps = (state) => {
   return {
      isCaptcha: state.auth.isCaptcha,
      urlCaptcha: state.auth.urlCaptcha,
      isAuth: state.auth.isAuth
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)