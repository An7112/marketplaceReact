import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading, AiOutlineClear, AiOutlineCloud } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'
import { TbFileDescription } from 'react-icons/tb'
import { client } from "util/infura-ipfs/ipfs";
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios';
import { Messages, PaginatedModal, ProductModal, StoreInfoModal } from 'modal/index'
import { useSelector } from "react-redux";
import { ToastMessage } from 'component/toast-message'
import QueryLoading from "component/query-loading/query-loading";
import './profile.css'
import PaginatedList from "util/pagination/paginated-list";

export default function Profile() {
  const [storeAvatar, setStoreAvatar] = useState('')
  const [storeBanner, setStoreBanner] = useState('')
  const [loadingAvatar, setloadingAvatar] = useState(false)
  const [loadingBanner, setloadingBanner] = useState(false)
  const [formInput, updateFormInput] = useState<any>({ storeName: '', storeDescription: '' })
  const avatarRef = useRef<any>(null);
  const bannerRef = useRef<any>(null);
  const [storeInfo, setStoreInfo] = useState<StoreInfoModal>()
  const [visible, setVisible] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [message, setMessage] = useState<Messages>({ title: null, status: null, description: null });
  const [refetch, setRefetch] = useState(0);
  const [myProducts, setMyProducts] = useState<PaginatedModal[]>([]);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);
  const [paginatedCount, setPaginatedCount] = useState(0);

  const user = useSelector((state: any) => state.auth.user);
  const { limit } = useSelector((state: any) => state.state);

  useEffect(() => {
    async function getStoreInfo() {
      if (user) {
        const store = await axios.get(`http://localhost:9000/api/stores/${user.uid}`)
        setStoreInfo(store.data);
      }
    }
    getStoreInfo()
  }, [user, refetch])

  useEffect(() => {
    async function getProducs() {
      setIsLoadingQuery(true)
      if (user) {
        try {
          const products = await axios.get(
            `http://localhost:9000/api/products?owner=${user.uid}&limit=${limit}`
          )
          const productsCount = await axios.get(
            `http://localhost:9000/api/products?owner=${user.uid}&productCount`
          )
          const convertPaginatedData: PaginatedModal[] = products.data.map((item: ProductModal) => {
            return {
              _id: item._id,
              img: item.productIMG,
              name: item.productName,
              quantity: item.quantity,
              createdDate: item.date,
            }
          })
          setMyProducts(convertPaginatedData);
          setPaginatedCount(productsCount.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingQuery(false)
        }
      }
    }
    getProducs();
  }, [limit, user])

  async function onChangeImageAvatar(e?: any) {
    setloadingAvatar(true)
    const file = e.target.files[0]
    try {
      const { cid } = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.io/ipfs/${cid.toString()}`
      setStoreAvatar(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    } finally {
      setloadingAvatar(false)
    }
  }

  async function onChangeImageBanner(e?: any) {
    setloadingBanner(true)
    const file = e.target.files[0]
    try {
      const { cid } = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.io/ipfs/${cid.toString()}`
      setStoreBanner(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    } finally {
      setloadingBanner(false)
    }
  }
  async function createStore(e: any) {
    e.preventDefault()
    setisLoading(true)
    setVisible(false)
    const { storeName, storeDescription } = formInput;
    if (user != null) {
      if (storeName && storeDescription) {
        const createData = new FormData()
        createData.append("storeId", user.uid)
        createData.append("storeName", storeName)
        createData.append("storeDescription", storeDescription)
        createData.append("storeAvatar", storeAvatar)
        createData.append("storeBanner", storeBanner)
        try {
          await axios.post('http://localhost:9000/api/stores', createData).then(res => setMessage({
            title: res.data.message,
            description: res.data.message,
            status: true
          }));
          setTimeout(() => {
            setVisible(true);
          }, 0);
        } catch (error) {
          console.log(error);
        } finally {
          setRefetch(prev => prev + 1);
          setisLoading(false)
        }
      } else {
        setTimeout(() => {
          setVisible(true);
        }, 0);
        setisLoading(false);
        setMessage({
          title: "Data cannot be empty.",
          description: "Data cannot be empty.",
          status: false
        })
      }
    } else {
      setTimeout(() => {
        setVisible(true);
      }, 0);
      setMessage({
        title: "You need to login to use this function.",
        description: "You need to login to use this function.",
        status: false
      })
    }
  }
  function clearContentAvatar() {
    setStoreAvatar('')
    if (avatarRef.current) {
      avatarRef.current.value = null;
    }
  }

  function clearContentBanner() {
    setStoreBanner('')
    if (bannerRef.current) {
      bannerRef.current.value = null;
    }
  }

  return (
    <div className='profile-main'>
      {visible === true ? <ToastMessage
        {...message}
      /> : ''}
      {isloading === true && <QueryLoading />}
      <h3 className='title-page'>Profile</h3>
      <div className='profile-container'>
        <div className='container-flex-full'>
          <div className='grid-w-full top'>
            <div className='grid-col-span-4'>
              <div className='frame-user'>
                <div className='banner-user'>
                  <img className="store-banner" src={user && storeInfo?.storeBanner ? storeInfo.storeBanner : 'media/banner.jpg'} alt="" />
                  <div className='user'>
                    <img src={user && storeInfo?.storeAvatar ? storeInfo.storeAvatar : 'media/avatar.avif'} alt='' />
                  </div>
                </div>
                <div className='frame-username'>
                  <h4>{user && user.displayName}</h4>
                  <p className='text-base'>{user && user.email}</p>
                </div>
                <div className='frame-username-dsc'>
                  <div className='dsc-item'>
                    <h4>{user && storeInfo?.storeProductLength ? storeInfo?.storeProductLength : 0}</h4>
                    <p className='text-base'>Products</p>
                  </div>
                  <div className='dsc-item'>
                    <h4>1</h4>
                    <p className='text-base'>Purchased</p>
                  </div>
                  <div className='dsc-item'>
                    <h4>1</h4>
                    <p className='text-base'>Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid-col-span-3'>
              <div className='frame-span-3'>
                <div className="margin-left">
                  <button className="dot-button">
                    <BsThreeDots />
                  </button>
                </div>
                <div className="class-flex-col">
                  <button className="cloud-button">
                    <AiOutlineCloud />
                  </button>
                  <h3>Your storage</h3>
                  <p>Supervise your drive space in the easiest way</p>
                </div>
                <div className="class-flex-col-bottom">
                  <div className="flex-between">
                    <span>26 GB</span>
                    <span>50 GB</span>
                  </div>
                  <div className="line-percent">
                    <div className="percent" style={{
                      gridColumn: `span 26 / span 26`,
                      backgroundColor: '#55B9A9'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid-col-span-5'>
              <div className='grid-span-11'>
                <div className="grid-span-full">
                  <div className='upload-frame avatar'>
                    {
                      loadingAvatar === true
                        ? <div className='div-loading'>
                          <AiOutlineLoading className='animate-spin' />
                        </div>
                        :
                        <>
                          {storeAvatar
                            ?
                            <>
                              <img className='img-url' src={storeAvatar} alt="" />
                              <button className='clear-button' onClick={clearContentAvatar}><AiOutlineClear /></button>
                            </>
                            :
                            <>
                              <label htmlFor="Img">
                                <div className='div-child-label'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16" style={{ width: '40px', height: '40px', marginBottom: '12px', color: '#9ca3af' }}>
                                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                    <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                  </svg>
                                  <p className='click-to-upload'><span style={{ fontWeight: "600" }}>Avatar</span></p>
                                </div>
                              </label>
                              <input ref={avatarRef} id='Img' type="file" name="Asset" style={{ display: "none" }}
                                onChange={onChangeImageAvatar}
                              />
                            </>
                          }
                        </>
                    }
                  </div>
                  <div className='upload-frame banner'>
                    {
                      loadingBanner === true
                        ? <div className='div-loading'>
                          <AiOutlineLoading className='animate-spin' />
                        </div>
                        :
                        <>
                          {storeBanner
                            ?
                            <>
                              <img className='img-url' src={storeBanner} alt="" />
                              <button className='clear-button' onClick={clearContentBanner}><AiOutlineClear /></button>
                            </>
                            :
                            <>
                              <label htmlFor="ImgBanner">
                                <div className='div-child-label'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16" style={{ width: '40px', height: '40px', marginBottom: '12px', color: '#9ca3af' }}>
                                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                    <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                  </svg>
                                  <p className='click-to-upload'><span style={{ fontWeight: "600" }}>Click to upload</span> or drag and drop (banner)</p>
                                  <p className="format-text">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                              </label>
                              <input ref={bannerRef} id='ImgBanner' type="file" name="Asset" style={{ display: "none" }}
                                onChange={onChangeImageBanner}
                              />
                            </>
                          }
                        </>
                    }
                  </div>
                </div>
                <div className='upload-dsc'>
                  <div className="form-user-info">
                    <div className='div-label-input'>
                      <label htmlFor="Name">NAME STORE <BiRename className='icons' /></label>
                      <input className='input' id='Name' type="text" placeholder="Name" pattern='.{1,}' required
                        onChange={e => updateFormInput({ ...formInput, storeName: e.target.value })}
                      />
                    </div>
                    <div className='div-label-input'>
                      <label htmlFor="Chain">STORE ID <BiRename className='icons' /></label>
                      <input defaultValue={user && user.uid} className='input' id='Chain' type="text" placeholder="id" required
                        value={user ? user.uid : null}
                        readOnly
                      />
                    </div>
                    <div className='div-label-input full'>
                      <label htmlFor="Description">DESCRIPTION <TbFileDescription className='icons' /></label>
                      <textarea id='Description' rows={2} placeholder='Asset Description...'
                        onChange={e => updateFormInput({ ...formInput, storeDescription: e.target.value })}
                      />
                    </div>
                  </div>
                  <button className='button-publish' onClick={createStore}>Create your store</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="title-row">My products</h3>
      <PaginatedList
        count={paginatedCount}
        url={`product/${user?.uid}`}
        isloading={isLoadingQuery}
        paginatedData={myProducts} />
    </div>
  )
}
