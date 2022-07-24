import React from 'react'
import { useDispatch } from 'react-redux'
import { registration } from '../../actions/user'
import { useFormik } from 'formik'
import { validate } from '../../utils/validator'
import './authorization.scss'
import { InputAuthorization } from '../ui/input/InputAuthorization'
import { ButtonAuthorization } from '../ui/button/ButtonAuthorization'

export const Registration = () => {
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validate,
      onsubmit
   });

   return (
      <div className='authorization'>
         <div className="authorization__wrapper">
            <div className="authorization__container">
               <div className="authorization__body">
                  <div className="authorization__header">Реєстрація</div>
                  <form onSubmit={formik.handleSubmit} className='authorization__form'>
                     <InputAuthorization
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.email}
                        errors={formik.errors.email}
                        placeholder='Введіть email'
                     />
                     <InputAuthorization
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.password}
                        errors={formik.errors.password}
                        placeholder='Введіть пароль'
                     />
                     <ButtonAuthorization
                        type="submit"
                        className="authorization__button"
                        onClick={() => dispatch(registration(formik.values.email, formik.values.password))}
                        disabled={formik.isSubmitting}
                        nameClass='authorization'
                        value='Зареєструватись'
                     />
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}


//
//
//
// 