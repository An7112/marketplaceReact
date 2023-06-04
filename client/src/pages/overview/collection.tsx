import React, { useState, useEffect } from 'react'
import './collection.css'
import { useSelector } from 'react-redux';
import PaginatedList from 'util/pagination/paginated-list';
import { PaginatedModal, StoreInfoModal } from 'modal/index';
import axios from 'axios';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';

function Collection() {
    const { user } = useSelector((state: any) => state.auth);
    const { limit } = useSelector((state: any) => state.state)
    const [storeInfo, setStoreInfo] = useState<PaginatedModal[]>([]);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getStoreInfo() {
            setIsLoading(true);
            try {
                const store = await axios.get(`https://marketplace-3lqw.onrender.com/api/stores?limit=${limit}`)
                const convertPaginatedData: PaginatedModal[] = store.data.map((item: StoreInfoModal) => {
                    return {
                        _id: item._id,
                        img: item.storeAvatar,
                        name: item.storeName,
                        quantity: item.storeProductLength,
                        createdDate: item.date,
                    }
                })
                console.log(store);
                setStoreInfo(convertPaginatedData);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getStoreInfo()
    }, [limit])

    return (
        <div className="container">
            <Sidebar />
            <div className="main" >
                <Header />
                <div className='overview-main'>
                    {user && <h3>Welcome back, {user.displayName}</h3>}
                    <span className='paginated-title'>All stores</span>
                    <PaginatedList
                        url='store'
                        isloading={isloading}
                        paginatedData={storeInfo}
                        column={2}
                    />
                </div>
            </div>
        </div>
    )
}

export default Collection;