import React from 'react'
import './button.scss'

export const Button = ({ value, nameClass, onClick }) => {
   return (
      <button className={`${nameClass} button`} onClick={onClick}>{value}</button>
   )
}
