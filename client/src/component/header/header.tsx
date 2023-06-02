import React, { useEffect, useRef, useState } from 'react'
import { BiSearch, BiUser } from 'react-icons/bi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithGoogle, logoutUser, restoreUser } from 'store/actions/auth'
import ShoppingCart from 'component/shopping-cart/shopping-cart'
import { CartModal } from 'modal/index'
import { Link } from 'react-router-dom'
import { setSearchValue } from 'store/reducers/state'

export default function Header() {
    const dispatch = useDispatch();
    const { countInCart } = useSelector((state: any) => state.state);
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null)
    const [cartCount, setCartCount] = useState(0);
    const user = useSelector((state: any) => state.auth.user) ?? '';

    useEffect(() => {
        const productsInCart: CartModal[] = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(productsInCart.length);
    }, [countInCart])
    const handleLoginWithGoogle = () => {
        dispatch(loginWithGoogle() as any);
    };

    const handleLogout = () => {
        dispatch(logoutUser() as any);
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


    useEffect(() => {
        const action = restoreUser();
        if (action) {
            dispatch(action);
        }
    }, [dispatch]);
    const callbackOpenCart = (callbackData: boolean) => {
        setOpenCart(callbackData)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const existingValue = event.target.value;
        dispatch(setSearchValue(existingValue))
    }
    return (
        <>
            <div className='header'>
                {
                    openCart === true
                        ?
                        <ShoppingCart propsCallback={callbackOpenCart} />
                        : ''
                }
                {userInfoVisible === true
                    && <div className='dropdown' ref={modalRef}>
                        <AiOutlineCaretDown className='down-icon' />
                        <div className='dropdown-frame'>
                            <Link to={'/profile'}>
                                <div className='dropdown-item'>
                                    <BiUser />
                                    <p>Profile</p>
                                </div>
                            </Link>
                            <div className='line'></div>
                            <div className='dropdown-item'>
                                <IoSettingsOutline />
                                <p>Settings</p>
                            </div>
                            <div className='line'></div>
                            {user
                                ?
                                <div className='dropdown-item' onClick={handleLogout}>
                                    <IoLogOutOutline />
                                    <p>Logout</p>
                                </div>
                                : <div className='dropdown-item' onClick={handleLoginWithGoogle}>
                                    <RiLoginCircleLine />
                                    <p>Login</p>
                                </div>
                            }
                        </div>
                    </div>
                }
                <div className='frame-header'>
                    <div className='frame-input'>
                        <BiSearch className='icon-search-header' />
                        <input onChange={handleSearch} className='input-header' placeholder='Search or type a command' />
                    </div>
                    <div className='frame-info'>
                        <div className='class-icon-header'>
                            <MdOutlineAttachMoney className='icon-header' />
                        </div>
                        <div className='class-icon-header' onClick={() => setOpenCart(true)}>
                            <BsFillCartCheckFill className='icon-header' />
                            <p className='cart-count'>{cartCount}</p>
                        </div>
                        <div className='class-avatar' >
                            <span className='span-frame' onClick={toggleUserInfoVisible}>
                                <img className='img-avatar' alt='user' src={user ? user.photoURL : '/media/avatar.avif'} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
