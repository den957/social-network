import React from 'react'
import s from './Login.module.css'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logInServerTC } from "../../redux/auth.reducer"
import { LoginReduxForm } from "./LoginForm"
import { AppReducerType } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export type DataFormLoginType = {
   email: string,
   password: string,
   rememberMe: boolean,
   captcha: string
}
type MapDispatchToProps = {
   logInServerTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStateToProps = {
   isCaptcha: boolean,
   isAuth: boolean,
   urlCaptcha: string | null
}
type PropsType = MapStateToProps & MapDispatchToProps
export const Login: React.FC<PropsType> = ({ isAuth, logInServerTC, ...props }) => {
   const onSubmit = (dataForm: DataFormLoginType) => {
      let [email, password, rememberMe, captcha] = [dataForm.email, dataForm.password, dataForm.rememberMe, dataForm.captcha]
      logInServerTC(email, password, rememberMe, captcha)
   }
   if (isAuth) {
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
         <LoginReduxForm onSubmit={onSubmit} urlCaptcha={props.urlCaptcha} isCaptcha={props.isCaptcha} />
      </div>
   )
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToProps => {
   return {
      logInServerTC: (email: string, password: string, rememberMe: boolean, captcha: string) => { dispatch(logInServerTC(email, password, rememberMe, captcha)) }
   }
}
const mapStateToProps = (state: AppReducerType): MapStateToProps => {
   return {
      isCaptcha: state.auth.isCaptcha,
      urlCaptcha: state.auth.urlCaptcha,
      isAuth: state.auth.isAuth,
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)