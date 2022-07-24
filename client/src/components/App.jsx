import React, { useEffect, useLayoutEffect } from 'react'
import { Header } from './header/Header.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Registration } from './authorization/Registration'
import { Login } from './authorization/Login'
import { useDispatch, useSelector } from 'react-redux'
import { check } from '../actions/user.js'

import './app.scss'
import { Disk } from './disk/Disk.jsx'
// import { Profile } from './profile/Profile.jsx'

function MyComponent() {
  const [dimensions, setDimensions] = React.useState({
    height: document.querySelector('header'),
    width: window.innerWidth
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: document.querySelector('header'),
        width: window.innerWidth
      })

    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }
  })
  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>
}

export const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(check())
  }, []);

  const clickHandler = (e) => {
    const targetElement = e.target
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active');
    } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
      document.querySelector('.search-form').classList.remove('_active');
    }
  }


  return (
    <BrowserRouter>
      <main onClick={e => clickHandler(e)} className='app'>
        <Header />
        <div className="app__body">
          {
            !isAuth
              ?
              <Routes>
                <Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path="*"
                  element={<Navigate to="/login" replace />}
                />
              </Routes>
              :
              <Routes>
                <Route path='/' element={<Disk />} />
                {/* <Route path='/profile' element={<Profile />} /> */}
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
          }
        </div>
      </main>
    </BrowserRouter>
  )
}
