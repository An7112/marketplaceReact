import React, { useState, useEffect, useRef } from 'react'
import { BiRename } from 'react-icons/bi'
import { IoPricetagsOutline } from 'react-icons/io5'
import { TbFileDescription } from 'react-icons/tb'
import { VscGitPullRequestCreate } from 'react-icons/vsc'
import { AiOutlineClear, AiOutlineLoading, AiOutlineDatabase } from 'react-icons/ai'
import { client } from "util/infura-ipfs/ipfs";
import { ToastMessage } from 'component/toast-message'
import { Messages } from 'modal/index'
import './create.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import QueryLoading from 'component/query-loading/query-loading'
import { Select } from 'antd'

export default function CreateItem() {
  const [imageURL, setImageURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [formInput, updateFormInput] = useState<any>({
    productName: '',
    productPrice: '',
    productDescription: '',
    quantity: 0,
    productType: 'shirts',
  })
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<Messages>({ title: null, status: null, description: null });
  const user = useSelector((state: any) => state.auth.user) ?? '';
  const [isloading, setIsLoading] = useState(false);

  const inputRef = useRef<any>(null);

  function clearContent() {
    setImageURL('');
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  }

  async function onChangeImage(e?: any) {
    setLoading(true)
    const file = e.target.files[0]
    try {
      const { cid } = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.io/ipfs/${cid.toString()}`
      setImageURL(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    } finally {
      setLoading(false)
    }
  }


  async function handleSubmit() {
    setVisible(false);
    setIsLoading(true);
    if (user) {
      const { productName, productPrice, productDescription, quantity, productType } = formInput;
      const createData = new FormData()
      createData.append("owner", user.uid)
      createData.append("productName", productName)
      createData.append("productPrice", productPrice)
      createData.append("productDescription", productDescription)
      createData.append("quantity", quantity)
      createData.append("productIMG", imageURL)
      createData.append("productType", productType)
      try {
        await axios.post('https://marketplace-3lqw.onrender.com/api/products', createData).then(res => setMessage({
          title: res.data.message,
          description: res.data.message,
          status: res.data.status
        }))
        setVisible(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className='create-main'>
      {visible === true ? <ToastMessage
        {...message}
      /> : ''}
      {isloading === true && <QueryLoading />}
      <div className='create-nft-body'>
        <div className='div-form'>
          <div className='grid-form'>
            <div className='information-form'>
              <div className='title-page'>
                <p>Create item</p>
                <VscGitPullRequestCreate />
              </div>
              <div className='infomation-form-content'>
                <h3>Information</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat optio debitis beatae mollitia qui dolorem deleniti nam et,
                  tenetur quisquam? Tenetur eius, provident amet quam corrupti nemo ab voluptates quasi!
                </p>
              </div>
            </div>
            <div className='box-form'>
              <div className='form'>
                <div className='content-form'>
                  <div className='content-form-top'>
                    <div className='content-form-top-grid'>
                      <div className='div-label-input'>
                        <label htmlFor="Name">NAME <BiRename className='icons' /></label>
                        <input className='input' id='Name' type="text" placeholder="Name" pattern='.{1,}' required
                          onChange={e => updateFormInput({ ...formInput, productName: e.target.value })}
                        />
                      </div>
                      <div className='div-label-input'>
                        <label htmlFor="Price">PRICE <IoPricetagsOutline className='icons' /></label>
                        <input className='input' id='Price' type="Number" placeholder="Price" pattern='.{1,}' required
                          onChange={e => updateFormInput({ ...formInput, productPrice: e.target.value })}
                        />
                      </div>
                      <div className='div-label-input full'>
                        <label htmlFor="Description">Description <TbFileDescription className='icons' /></label>
                        <textarea id='Description' rows={2} placeholder='Asset Description...'
                          onChange={e => updateFormInput({ ...formInput, productDescription: e.target.value })}
                        />
                      </div>
                      <div className='div-label-input grid2'>
                        <label htmlFor="Price">QUANTITY <AiOutlineDatabase className='icons' /></label>
                        <input className='input' id='Quantity' type="Number" placeholder="Quantity" pattern='.{1,}' required
                          onChange={e => updateFormInput({ ...formInput, quantity: e.target.value })}
                        />
                      </div>
                      <div className='div-label-input grid2'>
                      <label htmlFor="product-type">Product Type <TbFileDescription className='icons' /></label>
                        <Select
                          labelInValue
                          className='select'
                          id='product-type'
                          defaultValue={{ value: 'shirts', label: 'Shirts' }}
                          onChange={(value) =>  updateFormInput({ ...formInput, productType: value.value })}
                          options={[
                            { value: 'shirts', label: 'Shirts' },
                            { value: 'shoes', label: 'Shoes' },
                            { value: 'bags', label: 'Bags' },
                            { value: 'jewelry', label: 'Jewelry' },
                            { value: 'electronics', label: 'Electronics' },
                          ]}
                        />
                      </div>
                      <div className='div-img'>
                        {
                          loading === true
                            ? <div className='div-loading'>
                              <AiOutlineLoading className='animate-spin' />
                            </div>
                            : <>
                              {imageURL
                                ?
                                <>
                                  <img className='img-url' src={imageURL} alt="" />
                                  <button className='clear-button' onClick={clearContent}><AiOutlineClear /></button>
                                </>
                                :
                                (
                                  <label htmlFor="Img">
                                    <div className='div-child-label'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16" style={{ width: '40px', height: '40px', marginBottom: '12px', color: '#9ca3af' }}>
                                        <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                        <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                      </svg>
                                      <p className='click-to-upload'><span style={{ fontWeight: "600" }}>Click to upload</span> or drag and drop</p>
                                      <p className="format-text">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                  </label>
                                )}
                            </>
                        }
                        <input id='Img' ref={inputRef} type="file" name="Asset" style={{ display: "none" }}
                          onChange={onChangeImage}
                        />
                      </div>
                      {formInput.name !== ''
                        && formInput.price !== 0
                        && formInput.quantity !== 0
                        && formInput.description !== ''
                        && imageURL !== ''
                        && user
                        ? <button className='button-not-empty' type='submit' onClick={handleSubmit}>Create item</button>
                        : <button type='button' className='button-empty' style={{ cursor: 'default' }}>Data cannot be empty</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
