import React, { useEffect, useRef, useState } from "react"
import s from './ProfilePost.module.css'
import { Field, reduxForm } from 'redux-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ProfilePost = (props) => {
   const AutoHeightTextarea = ({ input, ...props }) => {
      const textareaRef = useRef()
      const [currentValue, setCurrentValue] = useState("")
      useEffect(() => {
         textareaRef.current.style.height = '2.8em'
         const scrollHeight = textareaRef.current.scrollHeight
         textareaRef.current.style.height = `${scrollHeight}px`
      }, [currentValue]);
      return (
         <textarea {...input}{...props} ref={textareaRef} autoFocus={true} className={s.addPost__textarea} value={currentValue} onChange={e => setCurrentValue(e.target.value)} placeholder={'Anything new?'} />
      )
   }
   return (
      !props.modalPost
         ? <form onSubmit={props.handleSubmit} className={s.addPost__form}>
            <Field component={'input'} name={'posts'} className={s.addPost__input} placeholder={'Anything new?'} onClick={() => props.setModalPost(true)} readOnly />
         </form >
         : <>
            <form onSubmit={props.handleSubmit} className={s.addPost__form}>
               <Field component={AutoHeightTextarea} className={s.addPost__textarea} name={'post'} />
               <button className={s.addPost__button} type={'submit'}>Publish</button>
            </form >
            <div onClick={() => props.setModalPost(false)} className={s.addPost__close}>
               <FontAwesomeIcon icon={faTimes} />
            </div>
         </>
   )
}
export const ProfileReduxPost = reduxForm({ form: 'profilePost' })(ProfilePost)