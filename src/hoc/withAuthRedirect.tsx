import { AppReducerType } from '../redux/store';
import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

type MapStateToPropsType = {
   isAuth: boolean
}
type PropsType = MapStateToPropsType

let mapStateToProps = (state: AppReducerType) => {
   return {
      isAuth: state.auth.isAuth
   }
}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
   const ComponentContainerRedirect: React.FC<PropsType> = (props) => {
      let { isAuth, ...restProps } = props
      if (!isAuth) {
         return <Redirect to='/login' />
      }
      return <WrappedComponent {...restProps as WCP} />
   }
   let ConnectedComponentContainerRedirect = connect(mapStateToProps)(ComponentContainerRedirect)
   return ConnectedComponentContainerRedirect
}