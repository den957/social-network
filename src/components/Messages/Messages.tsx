import React, { useEffect } from 'react'
import s from './Messages.module.css'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { connect } from 'react-redux'
import { Form, Formik, Field } from 'formik'
import { sendMessageTC, startMessageListeningTC, stopMessageListeningTC } from '../../redux/message.reducer'
import { MessageType } from '../../api/api'
import { AppReducerType } from '../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

type MapDispatchToPropsType = {
   startMessageListeningTC: () => void,
   stopMessageListeningTC: () => void,
   sendMessageTC: (message: string) => void
}
type MapStateToPropsType = {
   messages: Array<MessageType>,
   isReady: boolean
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

export const MessagesPage: React.FC<PropsType> = ({ startMessageListeningTC, stopMessageListeningTC, ...props }) => {
   useEffect(() => {
      startMessageListeningTC()
      return () => {
         stopMessageListeningTC()
      }
   }, [])
   return (
      <>
         <Messages {...props} />
         <AddMessage {...props} />
      </>
   )
}
type AddMessagePropsType = {
   sendMessageTC: (message: string) => void,
   isReady: boolean
}
const AddMessage: React.FC<AddMessagePropsType> = ({ sendMessageTC, isReady }) => {
   const initialValues = {
      message: ''
   }
   const onSubmit = (data: { message: string }) => {
      sendMessageTC(data.message)
   }
   return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
         <Form>
            <Field type="text" name="message" />
            <button disabled={isReady} type="submit">Send</button>
         </Form>
      </Formik>
   )
}
type MessagesPropsType = {
   messages: Array<MessageType>
}
const Messages: React.FC<MessagesPropsType> = ({ messages }) => {
   console.log(messages)
   return (
      <>
         {messages.map((el, index) => <Message message={el} key={index} />)}
      </>
   )
}
type MessagePropsType = {
   message: MessageType
}
const Message: React.FC<MessagePropsType> = ({ message }) => {
   return (
      <>
         {message.userName}
      </>
   )
}

const mapStateToProps = (state: AppReducerType): MapStateToPropsType => {
   return {
      isReady: state.dialogs.isReady,
      messages: state.dialogs.messages
   }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToPropsType => {
   return {
      startMessageListeningTC: () => { dispatch(startMessageListeningTC()) },
      stopMessageListeningTC: () => { dispatch(stopMessageListeningTC()) },
      sendMessageTC: (message) => { dispatch(sendMessageTC(message)) }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(MessagesPage))
