import React, { useState } from 'react'
import s from './SettingsForm.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { DataContactType } from './Settings'
import { minLengthCreator, required, validUrlFormat, validDateFormat } from '../../validators/validators'
import { Input } from '../Common/FormControl/FormControl'

const minLength8 = minLengthCreator(8)
const validUrl = validUrlFormat()
const validDate = validDateFormat()
const SettingsForm: React.FC<InjectedFormProps<DataContactType>> = ({ handleSubmit }) => {
   const [activeCheckbox, setActiveCheckbox] = useState<string>(`${s.bodySettings__checkbox}`)
   const [checked, setChecked] = useState<boolean>(false)
   return (
      <form className={s.settings__form} onSubmit={handleSubmit}>
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
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'fullName'} validate={[required, minLength8]} /></div>
                  <div className={s.bodySettings__span}>Birthday:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'aboutMe'} placeholder={'dd.mm.yyyy'} validate={[required, validDate]} /></div>
                  <div className={s.bodySettings__span}>Town:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'lookingForAJobDescription'} validate={[required]} /></div>
                  <div className={s.bodySettings__span}>Married:</div>
                  <div className={s.bodySettings__input}>
                     {!checked
                        ? <label>
                           <div onClick={(): void => { setActiveCheckbox(`${s.bodySettings__checkbox} ${s.bodySettings__checkboxActive}`); setChecked(true); }} className={activeCheckbox}></div>
                           <Field className={s.bodySettings__elCheckbox} component={'input'} type={'checkbox'} name={'married'} checked={checked} />
                        </label>
                        : <label>
                           <div onClick={(): void => { setActiveCheckbox(`${s.bodySettings__checkbox}`); setChecked(false); }} className={activeCheckbox}></div>
                           <Field className={s.bodySettings__elCheckbox} component={'input'} type={'checkbox'} name={'married'} checked={checked} />
                        </label>
                     }
                  </div>
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
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'facebook'} placeholder={'https://www.'} validate={[required, validUrl]} /></div>
                  <div className={s.bodySettings__span}>Linkedin:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'website'} placeholder={'https://www.'} validate={[required, validUrl]} /></div>
                  <div className={s.bodySettings__span}>GitHub:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'github'} placeholder={'https://www.'} validate={[required, validUrl]} /></div>
                  <div className={s.bodySettings__span}>YouTube:</div>
                  <div className={s.bodySettings__input}><Field className={s.bodySettings__el} component={Input} type={'text'} name={'youtube'} placeholder={'https://www.'} validate={[required, validUrl]} /></div>
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
export const SettingsReduxForm = reduxForm<DataContactType>({ form: 'settings' })(SettingsForm)
