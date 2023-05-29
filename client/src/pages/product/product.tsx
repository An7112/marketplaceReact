import React, { useEffect, useState } from 'react'
import './product.css'
import { LoadingFrame } from 'component/loading-frame/loadingFrame';
import { Offer, Properties } from './component/dropdown';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoLogoUsd } from 'react-icons/io'
import { BsPatchCheckFill, BsShare } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { GiSelfLove } from 'react-icons/gi'
import { Link, useParams } from 'react-router-dom';
import { ProductModal, StoreInfoModal } from 'modal/index';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Product() {
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { storeId, productId } = useParams();
  const [storeInfo, setStoreInfo] = useState<StoreInfoModal>();
  const [productInfo, setProductInfo] = useState<ProductModal>();
  const user = useSelector((state: any) => state.auth.user)

  const fetchData = async () => {
    setLoadingDetail(true);
    if (storeId && productId) {
      try {
        const store = await axios.get(`http://localhost:9000/api/stores/${storeId}`);
        const product = await axios.get(`http://localhost:9000/api/products/${productId}`)
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
  }, [storeId, productId])


  return (
    <div className='class-collection-detail' id='collection-detail'>
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
                <span><GiSelfLove /></span>
                <span><BsShare /></span>
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
                          {user && user.uid === productInfo?.owner
                            ? <span className='handle-buy'>You are the owner</span>
                            : <button className='handle-buy'>Buy now</button>
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
    </div>
  )
}

export default Product