import s from './PreloaderLine.module.css'
import cn from 'classnames'
import React from 'react'
const PreloaderLine = () => {
   return (
      <div className={s.loader}>
         <div className={cn(s.loaderOne, s.loader__item)}></div>
         <div className={cn(s.loaderTwo, s.loader__item)}></div>
         <div className={cn(s.loaderThree, s.loader__item)}></div>
         <div className={cn(s.loaderFour, s.loader__item)}></div>
         <div className={cn(s.loaderFive, s.loader__item)}></div>
         <div className={cn(s.loaderSix, s.loader__item)}></div>
         <div className={cn(s.loaderSeven, s.loader__item)}></div>
         <div className={cn(s.loaderEight, s.loader__item)}></div>
      </div>
   )
}
export default PreloaderLine 