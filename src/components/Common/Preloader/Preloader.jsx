import React from 'react'
import loadingImage from '../../../assets/images/loading.svg'
import s from './Preloader.module.css'

let Preloader = (props) => {
   return (
      <img src={loadingImage} className={s.preloader__img} />
   )
}
export default Preloader