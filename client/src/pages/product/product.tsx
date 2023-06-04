import React, { useCallback, useEffect, useState } from 'react'
import './product.css'
import { LoadingFrame } from 'component/loading-frame/loadingFrame';
import { Offer, Properties } from './component/dropdown';
import { AiFillCaretDown, AiFillEdit } from 'react-icons/ai';
import { CgPlayListRemove } from 'react-icons/cg'
import { IoLogoUsd } from 'react-icons/io'
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Messages, ProductModal, StoreInfoModal } from 'modal/index';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastMessage } from 'component/toast-message';
import QueryLoading from 'component/query-loading/query-loading';
import { Modal } from 'antd';
import { UpdateModal } from './component/modal/update-modal';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';

function Product() {
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { storeId, productId } = useParams();
  const [storeInfo, setStoreInfo] = useState<StoreInfoModal>();
  const [productInfo, setProductInfo] = useState<ProductModal>();
  const user = localStorage.getItem('userId') ?? ''
  const [isloading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<Messages>({ title: null, status: null, description: null });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [refetch, setRefetch] = useState(0)
  const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);
  const history = useNavigate();

  const fetchData = async () => {
    setLoadingDetail(true);
    if (storeId && productId) {
      try {
        const store = await axios.get(`https://marketplace-3lqw.onrender.com/api/stores/${storeId}`);
        const product = await axios.get(`https://marketplace-3lqw.onrender.com/api/products/${productId}`)
        setProductInfo(product.data);
        setStoreInfo(store.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingDetail(false);
      }
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, productId, refetch])

  const buyProduct = async () => {
    setIsLoading(true);
    const buyer = user;
    const products = [
      { _id: productInfo?._id, quantity: 1 }
    ]
    try {
      await axios.post('https://marketplace-3lqw.onrender.com/api/products/buy', { buyer, products }).then(res => setMessage({
        title: res.data.message,
        description: res.data.message,
        status: res.data.status
      }))
      setVisible(true);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const callbackOpenCart = (callbackData: any) => {
    setRefetch(callbackData.refetch)
    setOpen(callbackData.closeModal)
  }

  const Item = useCallback(() => {
    if (productInfo) {
      return <UpdateModal propsCallback={callbackOpenCart} data={productInfo} />;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === true]);


  const showModalRemove = () => {
    setIsModalOpenRemove(true);
  };

  const handleOkRemove = async () => {
    setVisible(false);
    setIsLoading(true);
    try {
      await axios.delete(`https://marketplace-3lqw.onrender.com/api/products/${productId}`).then(res => setMessage({
        title: res.data.message,
        description: res.data.message,
        status: res.data.status
      }))
      setVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsModalOpenRemove(false);
      history('/')
    }
  };

  const handleCancelRemove = () => {
    setIsModalOpenRemove(false);
  };
  return (
    <div className="container">
      <Sidebar />
      <div className="main" >
        <Header />
        <div className='class-collection-detail' id='collection-detail'>
          {visible === true ? <ToastMessage
            {...message}
          /> : ''}
          {isloading === true && <QueryLoading />}
          <div className='content-page'>
            <div className='collection-detail-left'>
              {
                loadingDetail === true
                  ?
                  <LoadingFrame divWidth={"100%"} divHeight={"480px"} />
                  :
                  <img src={productInfo?.productIMG} alt='' />
              }
              {
                loadingDetail === true
                  ?
                  <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                  :
                  (
                    <Properties />
                  )
              }
            </div>
            <div className='collection-detail-right'>
              <div className='chakra-stack'>
                <AiFillCaretDown className='svg-down-edit' />
                <div className='chakra-stack-header'>
                  <div className='chakra-stack-header-left'>
                    <span className='header-left-span'>
                      <p>Certified</p>
                      <p className='check'><BsPatchCheckFill /></p>
                    </span>
                    <div className='floor-type'>
                      {
                        loadingDetail === true
                          ?
                          <LoadingFrame divWidth={"100px"} divHeight={"24px"} />
                          :
                          <>
                            <p className="volumn">Volumn</p>
                            <p style={{ overflow: "hidden" }}>
                              12 USD</p>
                          </>
                      }
                    </div>
                  </div>
                  <div className='chakra-stack-header-right'>
                    {user && user === productInfo?.owner
                      ? <span><AiFillEdit onClick={showModal} /></span>
                      : null
                    }
                    {user && user === productInfo?.owner
                      ? <span><CgPlayListRemove onClick={showModalRemove} /></span>
                      : null
                    }
                    <Link to={'/collection'}>
                      <span><FaHome /></span>
                    </Link>
                    <span><BiDotsVerticalRounded /></span>
                  </div>
                </div>
                <div className='class-info-chakra-stack'>
                  {loadingDetail === true
                    ?
                    <LoadingFrame divWidth={"100%"} divHeight={"24px"} />
                    :
                    <h3>{productInfo?.productName}</h3>
                  }

                </div>
                <div className='class-info-chakra-stack'>
                  <div className='class-info-owner'>
                    {
                      loadingDetail === true
                        ?
                        <LoadingFrame divWidth={"40px"} divHeight={"40px"} />
                        :
                        <img src={storeInfo?.storeAvatar} alt='' />
                    }

                    {loadingDetail === true
                      ?
                      <LoadingFrame divWidth={"240px"} divHeight={"40px"} />
                      :
                      <div className='owner-name'>
                        <span>Owner</span>
                        <p>{storeInfo?._id}</p>
                      </div>}
                  </div>
                </div>
                {
                  loadingDetail === true
                    ?
                    <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                    :
                    (
                      <div className='class-info-chakra-stack'>
                        <div className='class-offer'>
                          <div className='class-offer-content'>
                            <div className='offer-info'>
                              <span>Price</span>
                              <IoLogoUsd />
                              <p>{productInfo?.productPrice} USD</p>

                            </div>
                          </div>
                          <div className='class-offer-content'>
                            <div className='offer-info'>
                              {user && user === productInfo?.owner
                                ? <span className='handle-buy'>You are the owner</span>
                                : <button className='handle-buy' onClick={buyProduct}>Buy now</button>
                              }

                            </div>
                          </div>
                        </div>
                      </div>
                    )
                }

                {
                  loadingDetail === true
                    ?
                    <LoadingFrame divWidth={"100%"} divHeight={"60px"} spacing={"32px 0"} />
                    :
                    (
                      <Offer />
                    )
                }
              </div>
            </div>
          </div>
          <Modal
            title="Update product"
            open={open}
            // onOk={handleOk}
            footer={''}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            className='update-modal'
          >
            {<Item /> ?? null}
          </Modal>
          <Modal className='remove-modal' title="Remove product" open={isModalOpenRemove} onOk={handleOkRemove} onCancel={handleCancelRemove}>
            <p>Are you sure you want to delete {productInfo?.productName}</p>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Product