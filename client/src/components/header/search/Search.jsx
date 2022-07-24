import React from 'react'
import './search.scss'

export const Search = ({ placeholder, onChange, defaultValue }) => {


   return (
      <div className="header__search">
         <div className="search-form">
            <button type="button" className="search-form__icon icon-search"></button>
            <form className="search-form__item">
               <button type="button" className="search-form__btn icon-search"></button>
               <input defaultValue={defaultValue} onChange={e => onChange(e)} autocomplete="off" type="text" name="form[]" placeholder={placeholder} className="search-form__input" />
            </form>
         </div>
      </div>
   )
}
