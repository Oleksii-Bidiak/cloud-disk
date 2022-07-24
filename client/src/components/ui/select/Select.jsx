import React from 'react'
import { SelectConstructor } from './selectConstructor'
// import './select.scss'



export const Select = () => {
   new SelectConstructor({})
   return (
      <select name="form[]" class="form">
         <option value="1" selected>Пункт №1</option>
         <option value="2">Пункт №2</option>
         <option value="3">Пункт №3</option>
         <option value="4">Пункт №4</option>
      </select>
   )
}
