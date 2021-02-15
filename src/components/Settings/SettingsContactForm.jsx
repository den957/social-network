import s from './SettingsContactForm.module.css'
import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../validators/validators'
import { Input } from '../Common/FormControl/FormControl'

const SettingsContactForm = (props) => {
   const [activeCheckbox, setActiveCheckbox] = useState(`${s.bodySettings__checkbox}`)
   const [checked, setChecked] = useState(false)
   return (
      <form className={s.settings__form} onSubmit={props.handleSubmit}>
         <div className={s.settings__main}>
            <div className={s.settings__title}>
               <div className={s.titleSettings__row}>
                  <div className={s.titleSettings__title}>Main</div>
                  <div className={s.titleSettings__line}></div>
               </div>
            </div>
            <div className={s.settings__body}>
               <div className={s.bodySettings__row}>
                  <div className={s.bodySettings__span}>Name:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'fullName'} validate={[required, maxLengthCreator(8)]} /></div>
                  <div className={s.bodySettings__span}>Birthday:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'aboutMe'} validate={[required]} /></div>
                  <div className={s.bodySettings__span}>Town:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'lookingForAJobDescription'} validate={[required]} /></div>
                  {!checked
                     ? <>
                        <div className={s.bodySettings__span}>Married:</div>
                        <div className={s.bodySettings__input}><div onClick={() => { setActiveCheckbox(`${s.bodySettings__checkbox} ${s.bodySettings__checkboxActive}`); setChecked(true) }} className={activeCheckbox}><Field className={s.bodySettings__elCheckbox} component={'input'} type={'checkbox'} name={'rememberMe'} validate={required} checked={checked} /></div></div>
                     </>
                     : <>
                        <div className={s.bodySettings__span}>Married:</div>
                        <div className={s.bodySettings__input}><div onClick={() => { setActiveCheckbox(`${s.bodySettings__checkbox}`); setChecked(false) }} className={activeCheckbox}><Field className={s.bodySettings__elCheckbox} component={'input'} type={'checkbox'} name={'rememberMe'} validate={required} checked={checked} /></div></div>
                     </>
                  }
               </div>
            </div>
         </div>
         <div className={s.settings__main}>
            <div className={s.settings__title}>
               <div className={s.titleSettings__row}>
                  <div className={s.titleSettings__title}>Contacts</div>
                  <div className={s.titleSettings__line}></div>
               </div>
            </div>
            <div className={s.settings__body}>
               <div className={s.bodySettings__row}>
                  <div className={s.bodySettings__span}>Facebook:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'facebook'} validate={[required]} /></div>
                  <div className={s.bodySettings__span}>Linkedin:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'website'} validate={[required]} /></div>
                  <div className={s.bodySettings__span}>GitHub:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'github'} validate={[required]} /></div>
                  <div className={s.bodySettings__span}>YouTube:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'youtube'} validate={[required]} /></div>
               </div>
            </div>
            <div className={s.settings__line}></div>
         </div>
         <div className={s.settings__button}>
            <button type={'submit'}>Save</button>
         </div>
      </form>
   )
}
export const SettingsContactReduxForm = reduxForm({ form: 'settingsContact' })(SettingsContactForm)
