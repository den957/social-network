import React, { useCallback, useState } from 'react'
import s from './UsersSearch.module.css'
import { Field, Form, Formik } from "formik";
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import userIcon from '../../../assets/images/userIcon.png'
import { NavLink } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';


export const UsersSearch = ({ isUserSelected, getUsersSelectTC, usersUnfollowed }) => {
   const [isOnChange, setIsOnChange] = useState(false)
   const initialValues = {
      name: ''
   }
   const debounceSave = useCallback(debounce((value) => getUsersSelectTC(10, 1, false, value), [1000]))
   const onHandleChange = (event) => {
      let value = event.target.value
      debounceSave(value)
      setIsOnChange(true)
   }
   return (
      <>
         <div className={s.users__searchTitle}>
            Find friends
         </div>
         <div className={s.users__searchForm}>
            <div className={s.users__searchForm__row}>
               <div className={s.searchForm__icon}>
                  <FontAwesomeIcon icon={faSearch} />
               </div>
               <div className={s.searchForm__form}>
                  <Formik initialValues={initialValues}>
                     {({
                        handleChange
                     }) => (
                        <Form>
                           <Field className={s.searchForm__search} type="text" name="name" onChange={(event) => { onHandleChange(event); handleChange(event) }} placeholder={'Enter your request'} />
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         </div>
         <div className={s.users__searchItems}>
            {isUserSelected
               ? <>{usersUnfollowed.length > 0
                  ? usersUnfollowed.map((user) => {
                     return (
                        <div className={s.users__searchItem}>
                           <div className={s.users__searchItem__row}>
                              <NavLink className={s.searchItem__photo} to={`/profile/${user.id}`}>
                                 <img src={user.photos.small ? user.photos.small : userIcon} alt />
                              </NavLink>
                              <NavLink className={s.searchItem__name} to={`/profile/${user.id}`}>
                                 {user.name}
                              </NavLink>
                           </div>
                        </div>)
                  })
                  : <div className={s.users__error}>Not found</div>}
               </>
               : <>{isOnChange &&
                  <div className={s.preloader__usersWrapper}>
                     <div className={s.preloader__usersBlock}>
                        <Preloader />
                     </div>
                  </div >
               }</>
            }
         </div>
      </>
   )
}
