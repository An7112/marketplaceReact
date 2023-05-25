import React, { useEffect, useState } from 'react'
import './storeDetails.css'
import { useParams } from 'react-router-dom';
import { DiReact } from 'react-icons/di'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { ProductModal } from 'modal/index';
import axios from 'axios';
import { LoadingFrame } from 'component/loading-frame/loadingFrame';
import { useDispatch } from 'react-redux';
import { setCountInCart } from 'store/reducers/state';
import { addToCart, removeFromCart } from 'util/cart/cart';

function StoreDetails() {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const [storeProducts, setStoreProducts] = useState<ProductModal[]>([]);
  const [isloading, setIsLoading] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [count, setCount] = useState(0);

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
  }, [storeId])

  const handleAddToCart = (_id: string, owner: string) => {
    addToCart({ owner: owner, id: _id, qty: 1 });
    setCartItems([...cartItems, { owner: owner, id: _id, qty: 1 }]);
    setCount(prev => prev + 1)
  };
  const handleRemoveFromCart = (_id: string, owner: string) => {
    removeFromCart({ owner: owner, id: _id, qty: 1 });
    const newCartItems = cartItems.filter((ele) => ele.id !== _id);
    setCartItems(newCartItems);
    setCount(prev => prev - 1)
  };
  const isInCart = (_id: string) => {
    if (cartItems.filter((ele: any) => ele.id === _id).length) {
      return true
    }
  };

  return (
    <>
      <h3 className='title-page'>Products</h3>
      <div className='list-item'>
        {storeProducts.map((element: ProductModal) => (
          isloading === true
            ? <LoadingFrame divWidth={'240px'} divHeight={'244px'} spacing={'0.5rem'} />
            : <div className='item'>
              {isInCart(element._id)
                ? <button className='add-to-cart' onClick={() => handleRemoveFromCart(element._id, element.owner)}>
                  <AiFillHeart/>
                </button>
                : <button className='add-to-cart' onClick={() => handleAddToCart(element._id, element.owner)}>
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
        ))}
      </div>
    </>

  )
}

export default StoreDetails