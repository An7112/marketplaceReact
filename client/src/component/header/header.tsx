import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { AiOutlineCaretDown } from 'react-icons/ai'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithGoogle } from 'store/actions/auth'

export default function Header() {
    const dispatch = useDispatch();
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null)
    const { user, loading, error } = useSelector((state: any) => state.auth);

    const handleLoginWithGoogle = () => {
        dispatch(loginWithGoogle() as any);
    };
    const toggleUserInfoVisible = () => {
        setUserInfoVisible(prev => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setUserInfoVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalRef, userInfoVisible]);


    return (
        <>
            <div className='header'>
                {userInfoVisible === true
                    && <div className='dropdown' ref={modalRef}>
                        <AiOutlineCaretDown className='down-icon' />
                        <div className='frame-balance'>
                            <h5>Balance: </h5>
                            <h5>HCMA</h5>
                        </div>
                    </div>
                }
                <div className='frame-header'>
                    <div className='frame-input'>
                        <BiSearch className='icon-search-header' />
                        <input className='input-header' placeholder='Search or type a command' />
                    </div>
                    <div className='frame-info'>
                        <div className='class-icon-header'>
                            <MdOutlineAttachMoney className='icon-header' />
                        </div>
                        <div className='class-icon-header'>
                            <BsFillCartCheckFill className='icon-header' />
                            <p className='cart-count'>0</p>
                        </div>
                        <div className='class-avatar' >
                            <span className='span-frame' onClick={toggleUserInfoVisible}>
                                <img className='img-avatar' alt='' src='/media/avatar.avif' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
