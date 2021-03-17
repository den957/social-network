import React from "react"
import s from './ProfilePost.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { AutoHeightTextarea } from "../../Common/FormControl/FormControl"
import { PostType } from "../../../redux/profile.reducer"
type OwnPropsType = {
   modalPost: boolean,
   setModalPost: (el: boolean) => void
}
const ProfilePost: React.FC<InjectedFormProps<PostType, OwnPropsType> & OwnPropsType> = ({ modalPost, handleSubmit, setModalPost }) => {
   return (
      !modalPost
         ? <form onSubmit={handleSubmit} className={s.addPost__form}>
            <Field component={'input'} name={'posts'} className={s.addPost__input} placeholder={'Anything new?'} onClick={() => setModalPost(true)} readOnly />
         </form >
         : <>
            <form onSubmit={handleSubmit} className={s.addPost__form}>
               <Field component={AutoHeightTextarea} className={s.addPost__textarea} name={'post'} />
               <button className={s.addPost__button} type={'submit'}>Publish</button>
            </form >
            <div onClick={() => setModalPost(false)} className={s.addPost__close}>
               <FontAwesomeIcon icon={faTimes} />
            </div>
         </>
   )
}
export const ProfileReduxPost = reduxForm<PostType, OwnPropsType>({ form: 'profilePost' })(ProfilePost)