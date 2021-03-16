import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import s from './FormControls.module.css'
export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
   return (
      <div className={meta.touched && meta.error ? s.input__validate : ''} >
         <input {...input}{...props} />
         {meta.touched && meta.error ? <span>{meta.error}</span> : ''}
      </div>
   )
}
