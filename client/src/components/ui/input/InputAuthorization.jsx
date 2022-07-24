import React from 'react'
import './input.scss'

export const InputAuthorization = ({ value, type, placeholder, name, onChange, onBlur, errors }) => {

   return (
      <div className="line-input">
         {value && errors && <div className="line-input__error">{errors}</div>}
         {value && <div className="line-input__dirty"></div>}
         <input id={name} value={value} onChange={onChange} type={type} className='line-input__input input' autoComplete="none" />
         <label htmlFor={name} onBlur={onBlur} className="line-input__label">{placeholder}</label>
      </div >
   )
}
