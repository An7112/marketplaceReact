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
import { Select, Slider } from 'antd';

interface Filters {
  [key: string]: {
    key: string,
    value: string | number
  };
}

function StoreDetails() {
  const dispatch = useDispatch();
  const { countInCart, searchItem } = useSelector((state: any) => state.state);
  const user = useSelector((state: any) => state.auth.user);
  const { storeId } = useParams();
  const [storeProducts, setStoreProducts] = useState<ProductModal[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const [priceValue, setPriceValue] = useState(0);

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

  const handleFilterChange = (value: { value: string, label: string }, filterKey: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: {
        key: value.value,
        value: value.value
      },
    }));
  };

  const onChange = (newValue: number) => {
    setPriceValue(newValue)
    setFilters((prevFilters) => ({
      ...prevFilters,
      'productPrice': {
        key: newValue === 0 ? 'default' : '',
        value: newValue
      },
    }));
  };

  const filteredProducts = useMemo(() => {
    const lowercasedTerm = searchItem.toLowerCase();
    const data = storeProducts.filter((item: ProductModal) =>
      item.productName.toLowerCase().includes(lowercasedTerm)
    )
    if (Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        const itemValue = item[key as keyof ProductModal];
        const checkKey = value.key;
        const filterValue = value.value;
        if (checkKey === 'default') {
          return itemValue;
        }
        if (typeof (itemValue) === 'number') {
          return itemValue === filterValue
        } else {
          return itemValue.includes(filterValue);
        }
      });
    });
  }, [searchItem, storeProducts, filters]);

  return (
    <div className='main-class'>
      <div className='class-filter'>
        <h3 className='title-page store'>Filter</h3>
        <div className='frame-filter-item'>
          <span className='category-select'>Product Type</span>
          <Select
            labelInValue
            className='select'
            defaultValue={{ value: 'default', label: 'All' }}
            onChange={(value) => handleFilterChange(value, 'productType')}
            options={[
              { value: 'default', label: 'All' },
              { value: 'shirts', label: 'Shirts' },
              { value: 'shoes', label: 'Shoes' },
              { value: 'bags', label: 'Bags' },
              { value: 'jewelry', label: 'Jewelry' },
              { value: 'electronics', label: 'Electronics' },
            ]}
          />
        </div>
        <div className='frame-filter-item'>
          <span className='category-select'>Product Price</span>
          <Slider
            min={0}
            max={20}
            onChange={onChange}
            value={typeof priceValue === 'number' ? priceValue : 0}
          />
        </div>
      </div>
      <div className='class-item'>
        <h3 className='title-page store'>Products</h3>
        <div className='list-item'>
          {isloading === true
            ? <LoadingFrame divWidth={'240px'} divHeight={'344px'} spacing={'0.5rem'} />
            : filteredProducts.map((element: ProductModal) => (
              <Link to={`/product/${element.owner}/${element._id}`}>
                <div className='item'>
                  {user.uid !== storeId ? isInCart(element._id)
                    ? <button className='add-to-cart' onClick={(event) => handleRemoveFromCart(element._id, element.owner, event)}>
                      <AiFillHeart />
                    </button>
                    : <button className='add-to-cart' onClick={(event) => handleAddToCart(element._id, element.owner, event)}>
                      <AiOutlineHeart />
                    </button>
                    : null
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
      </div>
    </div>

  )
}

export default StoreDetails