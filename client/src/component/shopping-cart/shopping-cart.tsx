import React, { useState, useEffect, useCallback, useRef } from 'react'
import { AiFillExclamationCircle, AiFillRest } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { TbShoppingCartDiscount } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux';
import { CartModal, ProductModal } from 'modal/index'
import { setCountInCart } from 'store/reducers/state'
import { removeFromCart } from 'util/cart/cart'
import axios from 'axios'
import { LoadingFrame } from 'component/loading-frame/loadingFrame'
import './shopping.css'

export default function ShoppingCart({ propsCallback }: any) {

    const dispatch = useDispatch();
    const { countInCart } = useSelector((state: any) => state.state);
    const [shoppingCart, setShoppingCart] = useState<ProductModal[]>([])
    const [cartItems, setCartItems] = useState<CartModal[]>([]);
    const modalRef = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState<number>(countInCart);
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        const productsInCart: CartModal[] = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(productsInCart);
    }, [countInCart])

    useEffect(() => {
        dispatch(setCountInCart(count))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const closeCart = () => {
        propsCallback(false)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeCart();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalRef]);

    const totalPrice = shoppingCart.reduce((a: any, c: any) =>
        a + (c.productPrice * 1), 0
    );

    function clearAllItem() {
        localStorage.removeItem('cart')
        setCount(prev => prev - 1)
    }

    const handleRemoveFromCart = (_id: string, owner: string) => {
        removeFromCart({ owner: owner, id: _id, qty: 1 });
        const newCartItems = cartItems.filter((ele: CartModal) => ele.id !== _id);
        setCartItems(newCartItems);
        setCount(prev => prev - 1)
    };

    const fetchProducts = useCallback(async () => {
        setIsloading(true)
        try {
            const promises = cartItems.map(async (ele: CartModal) => {
                const response = await axios.get(`http://localhost:9000/api/products/${ele.id}`);
                const product = response.data;
                return {
                    _id: product._id,
                    owner: product.owner,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    productDescription: product.productDescription,
                    productIMG: product.productIMG,
                    quantity: product.quantity,
                    date: product.date,
                };
            });

            const products = await Promise.allSettled(promises);
            const filteredProducts: Array<ProductModal> = products
                .filter(({ status }) => status === 'fulfilled')
                .map(({ value }: any) => value)
            setShoppingCart(filteredProducts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className='cart-frame'>
            <aside className='cart-main' ref={modalRef}>
                <div className='cart-outer'>
                    <div className='shopping-cart'>
                        <header>
                            <div className='fresnel-greater'>
                                <div className='cart-inner'>
                                    <div className='shopping-cart-name'>
                                        <h4>Your cart</h4>
                                        <AiFillExclamationCircle />
                                    </div>
                                    <button type='button' onClick={closeCart}>
                                        <IoMdClose />
                                    </button>
                                </div>
                                <hr />
                                <div className='count-item'>
                                    <span>{shoppingCart.length} item</span>
                                    <button type='button' onClick={clearAllItem}>
                                        <span>
                                            Clear all
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        <ul className='list-item'>
                            {
                                isloading
                                    ? <LoadingFrame divHeight={'78.38px'} divWidth={'336px'} />
                                    : shoppingCart.map((ele: ProductModal) => (
                                        <div className='shopping-cart-item'>
                                            <div className='box-img-item'>
                                                <span>
                                                    <img src={ele.productIMG} alt='' />
                                                </span>
                                            </div>
                                            <div className='content-item'>
                                                <div className='content-item-inner'>
                                                    <span className='item-name'>
                                                        {ele.productName} #{ele._id}
                                                        <span className='item-name qty'><TbShoppingCartDiscount /> 1</span>
                                                    </span>
                                                    <span className='item-owner'>
                                                        {ele.owner}
                                                    </span>
                                                    <span className='item-sub'>
                                                        Creation fee: 0.0001 ether
                                                    </span>

                                                </div>
                                            </div>
                                            <div className='item-price'>
                                                <span>{ele.productPrice} USD</span>
                                                <AiFillRest onClick={() => handleRemoveFromCart(ele._id, ele.owner)} />
                                            </div>
                                        </div>
                                    ))
                            }
                        </ul>
                        <div style={{ marginBottom: '16px' }}></div>
                        <hr />
                        <footer>
                            <div className='footer-inner'>
                                <span className='footer-title'>Total price</span>
                                <span>{totalPrice} USD</span>
                            </div>
                        </footer>
                        <div className='class-button'>
                            <button>
                                Complete purchase
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
