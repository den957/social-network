import React from 'react'
import s from './ProfilePostList.module.css'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ProfilePostList = (props) => {
   let posts = props.profilePosts.map((post) => {
      return (
         <div key={post.id} className={s.profile__newPost}>
            <div className={cn(s.newPostProfile__row, s.newPostProfile)}>
               <div className={s.newPostProfile__logo}>
                  <img src={props.profileMeInfo.photos.small} />
               </div>
               <div className={s.newPostProfile__body}>
                  <div className={s.newPostProfile__name}>
                     {props.profileMeInfo.fullName}
                  </div>
                  <div className={s.newPostProfile__date}>
                     {post.date}
                  </div>
               </div>
            </div>
            <div className={s.newPostProfileContent}>
               {post.post}
            </div>
            <div className={s.newPostProfileRemove} onClick={(e) => { props.removeProfilePost(post.id) }}>
               <FontAwesomeIcon icon={faTimes} />
            </div>
         </div>
      )
   })
   return (
      <>
         {posts}
      </>
   )
}
export default ProfilePostList