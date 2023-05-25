import React, { useEffect, useState } from 'react'
import './storeDetails.css'
import { useParams } from 'react-router-dom';
import { DiReact } from 'react-icons/di'
import { AiOutlineHeart } from 'react-icons/ai'
import { ProductModal } from 'modal/index';
import axios from 'axios';

function StoreDetails() {
  const { storeId } = useParams();
  const [storeProducts, setStoreProducts] = useState<ProductModal[]>([]);

  useEffect(() => {
    const getStoreProducts = async () => {
      const response = await axios.get(`http://localhost:9000/api/products?owner=${storeId}`)
      setStoreProducts(response.data);
    }
    getStoreProducts();
  }, [storeId])
  return (
    <>
      <h3 className='title-page'>Products</h3>
      <div className='list-item'>
        {storeProducts.map((element: ProductModal) => (
          <div className='item'>
            <button className='add-to-cart'>
              <AiOutlineHeart />
            </button>
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