import React from 'react'
import './collection.css'
import { useSelector } from 'react-redux';
import PaginatedList from 'util/pagination/paginated-list';

function Collection() {
    const { user } = useSelector((state: any) => state.auth);
    return (
        <div className='overview-main'>
            {user && <h3>Welcome back, {user.displayName}</h3>}
            <span className='paginated-title'>All stores</span>
            <PaginatedList/>
        </div>
    )
}

export default Collection;