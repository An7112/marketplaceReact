import React, { useEffect, useMemo, useState } from 'react'
import './storeDetails.css'
import { Link, useParams } from 'react-router-dom';
import { DiReact } from 'react-icons/di'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { CartModal, ProductModal } from 'modal/index';
import axios from 'axios';
import { LoadingFrame } from 'component/loading-frame/loadingFrame';
import { useDispatch, useSelector } from 'react-redux';
import { setCountInCart } from 'store/reducers/state';
import { addToCart, removeFromCart } from 'util/cart/cart';

function StoreDetails() {
  const dispatch = useDispatch();
  const { countInCart, searchItem } = useSelector((state: any) => state.state);
  const { storeId } = useParams();
  const [storeProducts, setStoreProducts] = useState<ProductModal[]>([]);
  const [isloading, setIsLoading] = useState(false);

  const [cartItems, setCartItems] = useState<CartModal[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const productsInCart: CartModal[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(productsInCart);
  }, [countInCart]);

  useEffect(() => {
    dispatch(setCountInCart(count))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => {
    const getStoreProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:9000/api/products?owner=${storeId}`)
        setStoreProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getStoreProducts();
  }, [searchItem, storeId])

  const handleAddToCart = (_id: string, owner: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart({ owner: owner, id: _id, qty: 1 });
    setCartItems([...cartItems, { owner: owner, id: _id, qty: 1 }]);
    setCount(prev => prev + 1)
  };
  const handleRemoveFromCart = (_id: string, owner: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFromCart({ owner: owner, id: _id, qty: 1 });
    const newCartItems = cartItems.filter((ele) => ele.id !== _id);
    setCartItems(newCartItems);
    setCount(prev => prev - 1)
  };
  const isInCart = (_id: string) => {
    if (cartItems.filter((ele: CartModal) => ele.id === _id).length) {
      return true
    }
  };

  const filteredProducts = useMemo(() => {
    const lowercasedTerm = searchItem.toLowerCase();
    return storeProducts.filter((item: ProductModal) =>
      item.productName.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchItem, storeProducts]);

  return (
    <>
      <h3 className='title-page store'>Products</h3>
      <div className='list-item'>
        {isloading === true
          ? <LoadingFrame divWidth={'240px'} divHeight={'344px'} spacing={'0.5rem'} />
          : filteredProducts.map((element: ProductModal) => (
            <Link to={`/product/${element.owner}/${element._id}`}>
              <div className='item'>
                {isInCart(element._id)
                  ? <button className='add-to-cart' onClick={(event) => handleRemoveFromCart(element._id, element.owner, event)}>
                    <AiFillHeart />
                  </button>
                  : <button className='add-to-cart' onClick={(event) => handleAddToCart(element._id, element.owner, event)}>
                    <AiOutlineHeart />
                  </button>
                }

                <div className='frame-img'>
                  <span className='span-frame'>
                    <img src={element.productIMG} className='product-img' alt='' />
                  </span>
                </div>
                <h5 className='item-name'>{element.productName}</h5>
                <h5 className='item-name blur'>{element.owner}</h5>
                <span className='product-price'><DiReact /> {element.productPrice}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </>

  )
}

export default StoreDetails