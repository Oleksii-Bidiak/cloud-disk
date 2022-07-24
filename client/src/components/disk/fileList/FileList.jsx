import React from 'react'
import { useSelector } from 'react-redux'
import { File } from './file/File'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './fileList.scss'

export const FileList = () => {

   const files = useSelector(state => state.files.files)
   const fileView = useSelector(state => state.files.view)

   if (files.lenght === 0) {
      return (
         <div className='loader'>Файли не знайдено</div>
      )
   }

   if (fileView === 'plate') {
      return (
         <div className="files">
            <div className='fileplate'>
               {files.map(file =>
                  <File file={file} key={file._id} />
               )}
            </div>
         </div>
      )
   }

   if (fileView === 'list') {
      return (
         <div className="files">
            <div className='file-list'>
               <div className="file-list__header">
                  <div className="file-list__name">Назва</div>
                  <div className="file-list__date">Дата</div>
                  <div className="file-list__size">Розмір</div>
               </div>
               <TransitionGroup>
                  {files.map(file =>
                     <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                     >
                        <File file={file} />
                     </CSSTransition>
                  )}
               </TransitionGroup>
            </div>
         </div>
      )
   }
}
