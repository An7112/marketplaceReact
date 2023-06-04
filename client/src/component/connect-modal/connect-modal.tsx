import React from 'react'
import {TbPlugConnected} from 'react-icons/tb'
import './modal.css'

export function ModalConnect() {
  return (
    <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className='modal-frame'>
            <div className='modal'>
              <TbPlugConnected className='icon-connect'/>
              <p>Oh, please check your internet connection!</p>
            </div>
        </div>
    </div>
  )
}