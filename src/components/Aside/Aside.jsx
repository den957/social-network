import React from 'react'
import s from './Aside.module.css'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faUsers, faCogs } from '@fortawesome/free-solid-svg-icons'
// create aside block with links
const Aside = () => {
   return (
      <div className={s.aside__menu}>
         <NavLink className={s.aside__item} to={'/profile'}><FontAwesomeIcon icon={faUser} className={cn(s.aside__icon, s.iconAside__profile)} /> <span className={s.aside__name}>Profile</span></NavLink>
         <NavLink className={s.aside__item} to={'/messages'}><FontAwesomeIcon icon={faComment} className={cn(s.aside__icon, s.iconAside__messages)} /><span className={s.aside__name}>Messages</span></NavLink>
         <NavLink className={s.aside__item} to={'/users'}><FontAwesomeIcon icon={faUsers} className={cn(s.aside__icon, s.iconAside__users)} /><span className={s.aside__name}>Users</span></NavLink>
         <NavLink className={s.aside__item} to={'/settings'}><FontAwesomeIcon icon={faCogs} className={cn(s.aside__icon, s.iconAside__settings)} /><span className={s.aside__name}>Settings</span></NavLink>
      </div>
   )
}
export default Aside