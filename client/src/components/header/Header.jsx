import React, { useState } from 'react'
import './header.scss'
import Logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { getFiles, searchFiles } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'
import { Search } from './search/Search'

export const Header = () => {
   const isAuth = useSelector(state => state.user.isAuth)
   const currentDir = useSelector(state => state.files.currentDir)
   const currentUser = useSelector(state => state.user.currentUser)
   const dispatch = useDispatch()
   const [searchName, setSearchName] = useState('');
   const [searchTimeout, setSearchTimeout] = useState(false);
   const avatar = currentUser?.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

   const searchChangeHandler = e => {
      setSearchName(e.target.value)
      if (searchTimeout != false) {
         clearTimeout(searchTimeout)
      }
      dispatch(showLoader())
      if (e.target.value !== '') {
         setSearchTimeout(setTimeout((value) => {
            dispatch(searchFiles(value))
         }, 500, e.target.value))
      } else {
         dispatch(getFiles(currentDir))
      }

   }

   return (
      <header className='header'>
         <div className="header__container">
            <div className="header__body">
               <img src={Logo} alt="Logo" />
               <div className="header__header">Mern Cloud</div>
               {isAuth &&
                  <Search
                     defaultValue={searchName}
                     onChange={searchChangeHandler}
                     className='header__search'
                     type='text'
                     placeholder='Назва файлу...'
                  />
                  // <input
                  //    defaultValue={searchName}
                  //    onChange={(e) => searchChangeHandler(e)}
                  //    className='header__search'
                  //    type='text'
                  //    placeholder='Назва файлу...'
                  // />
               }
               <ul className="header__list">
                  {!isAuth && <li className="header__button"><NavLink to='/login'>Вхід</NavLink></li>}
                  {!isAuth && <li className="header__button"><NavLink to='/registration'>Реєстрація</NavLink></li>}
                  {isAuth && <li className="header__button" onClick={() => dispatch(logout())}>Вихід</li>}
                  {isAuth && <NavLink to='/profile'>
                     <img src={avatar} alt="" />
                  </NavLink>}
               </ul>
            </div>
         </div>
      </header>
   )
}
