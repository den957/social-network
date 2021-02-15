import { Redirect } from "react-router-dom"
import React from 'react'
import { connect } from "react-redux"

let mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth
   }
}
export const withAuthRedirect = (Component) => {
   class ComponentContainerRedirect extends React.Component {
      render() {
         if (this.props.isAuth === false) {
            return <Redirect to='/login' />
         }
         return <Component {...this.props} />
      }
   }
   let ConnectedComponentContainerRedirect = connect(mapStateToProps)(ComponentContainerRedirect)
   return ConnectedComponentContainerRedirect
}