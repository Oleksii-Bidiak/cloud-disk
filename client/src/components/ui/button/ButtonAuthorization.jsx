import React from 'react'
import './buttonAuthorization.scss'

export const ButtonAuthorization = ({ nameClass, value, type, onClick, disabled }) => {
   return (
      <button
         type={type}
         className={`${nameClass}__button button-authorization`}
         onClick={onClick}
         disabled={disabled}
      >
         {value}
      </button>
   )
}
