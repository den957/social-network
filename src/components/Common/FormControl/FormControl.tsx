import React, { LegacyRef, useEffect, useRef, useState } from 'react'
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
export const AutoHeightTextarea: React.FC<WrappedFieldProps> = ({ input, ...props }) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null)
   const [currentValue, setCurrentValue] = useState<string>("")
   useEffect(() => {
      if (textareaRef && textareaRef.current) {
         textareaRef.current.style.height = '2.8em'
         const scrollHeight = textareaRef.current.scrollHeight
         textareaRef.current.style.height = `${scrollHeight}px`
      }
   }, [currentValue]);
   return (
      <textarea {...input}{...props} ref={textareaRef} autoFocus={true} className={s.addPost__textarea} value={currentValue} onChange={e => setCurrentValue(e.target.value)} placeholder={'Anything new?'} />
   )
}