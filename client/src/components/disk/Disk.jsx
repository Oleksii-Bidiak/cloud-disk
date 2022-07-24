import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../../actions/file'
import { FileList } from './fileList/FileList'
import '../../utils/fonts/icons.scss'

import './disk.scss'
import { setCurrentDir, setPopupDisplay, setView } from '../../reducers/fileReducer'
import { Popup } from './Popup'
import { uploadFile } from '../../actions/file'
import { Uploader } from './uploader/Uploader'
import Back from '../../assets/img/back.svg'
import { Button } from '../ui/button/Button'


export const Disk = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const dirStack = useSelector(state => state.files.dirStack)
   const loader = useSelector(state => state.app.loader)
   const [dragEnter, setDragEnter] = useState(false);
   const [sort, setSort] = useState('type');

   useEffect(() => {
      dispatch(getFiles(currentDir, sort))
   }, [currentDir, sort]);

   const showPopupHandler = () => {
      dispatch(setPopupDisplay('flex'))
   }

   const backClickHandler = () => {
      const backDirId = dirStack.pop()
      dispatch(setCurrentDir(backDirId))
   }

   const fileUploadHandler = (event) => {
      const files = [...event.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
   }

   const onDragEnterHendler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(true)
   }

   const onDragLeaveHendler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(false)
   }

   const dropHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      let files = [...e.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDragEnter(false)
   }

   if (loader) {
      return (
         <div className="loader">
            <div className="lds-dual-ring"></div>
         </div>
      )
   }

   return (
      !dragEnter
         ?
         <div className='disk' onDragEnter={onDragEnterHendler} onDragLeave={onDragLeaveHendler} onDragOver={onDragEnterHendler}>
            <div className="disk__container">
               <div className="disk__body">
                  <div className="disk__controls">
                     <Button nameClass='disk__back icon-back' onClick={backClickHandler} />
                     {/* <button className="disk__back" onClick={() => backClickHandler()}><img src={Back} alt="" /></button> */}
                     <button className="disk__create" onClick={() => showPopupHandler()}>Створити папку</button>
                     <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id="disk__upload-input" className="disk__upload-input" />
                     </div>
                     <select defaultValue={'DEFAULT'} value={sort} className='disk__select' onChange={(e) => setSort(e.target.value)} >
                        <option value="DEFAULT" disabled>Виберіть тип сортування...</option>
                        <option value="name">По імені документу</option>
                        <option value="type">По типу документу</option>
                        <option value="date">По даті створення документу</option>
                     </select>
                     <div className="disk__buttons-view">
                        <button className="disk__plate" onClick={() => dispatch(setView('plate'))} />
                        <button className="disk__list" onClick={() => dispatch(setView('list'))} />
                     </div>
                  </div>
                  <FileList />
               </div>
               <Popup />
               <Uploader />
            </div>
         </div>
         :
         <div className='drop-area' onDrop={dropHandler} onDragEnter={onDragEnterHendler} onDragLeave={onDragLeaveHendler} onDragOver={onDragEnterHendler}>
            Перетягніть файли сюди
         </div>
   )
}
