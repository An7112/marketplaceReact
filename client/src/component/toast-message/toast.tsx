
import React, { useEffect, useState } from 'react';
import { MdOutlineError } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import './toast.css'

type Messages = {
  title: string | null,
  description?: string | null,
  status: boolean | null,
}

export function ToastMessage(props: Messages) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='toast-main' style={{ display: visible === false ? 'none' : 'flex' }}>
      {props.status === false
        ? <div className='toast-class error' >
          <MdOutlineError style={{ fontSize: '20px' }} /> <span>{props.title}</span>
        </div>
        : <div className='toast-class' >
          <TiTick style={{ fontSize: '20px', color: "white" }} /> <span>{props.title}</span>
        </div>
      }
    </div>
  )
}
