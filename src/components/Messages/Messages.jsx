import React from 'react'
import s from './Messages.module.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { connect } from 'react-redux'

const Messages = () => {
   return (
      <div className={s.messages}>
         Messages
      </div>
   )
}
const mapStateToProps = (state) => {
   return {

   }
}
const mapDispatchToProps = (dispatch) => {
   return {

   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Messages))
