import React, { useState, useEffect } from 'react'
import './collection.css'
import { useSelector } from 'react-redux';
import PaginatedList from 'util/pagination/paginated-list';
import { StoreInfoModal } from 'modal/index';
import axios from 'axios';

function Collection() {
    const { user } = useSelector((state: any) => state.auth);
    const { limit } = useSelector((state: any) => state.state)
    const [storeInfo, setStoreInfo] = useState<StoreInfoModal[]>([]);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getStoreInfo() {
            setIsLoading(true);
            try {
                const store = await axios.get(`http://localhost:9000/api/stores?limit=${limit}`)
                setStoreInfo(store.data);
            }catch(error){
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        getStoreInfo()
    }, [limit])

    return (
        <div className='overview-main'>
            {user && <h3>Welcome back, {user.displayName}</h3>}
            <span className='paginated-title'>All stores</span>
            <PaginatedList isloading={isloading} storeInfo={storeInfo} />
        </div>
    )
}

export default Collection;