import React from 'react'
import { useSelector } from 'react-redux'
import { TbCloudDownload } from 'react-icons/tb'
import './history.css'

export const OrderHistory = () => {
    const user = useSelector((state: any) => state.auth.user)

    return (
        <div className='history-main'>
            <div className='history-header'>
                <div className='header-top left'>
                    <h3 className='header-title'>Order history</h3>
                    <span className='header-dsc'>Manage your recent orders and invoices.</span>
                </div>
                <div className='header-top right'>
                    <button className='header-button'>
                        <TbCloudDownload />
                        Download documents
                    </button>
                    <button className='header-button order'>
                        New Order
                    </button>
                </div>
            </div>
            <span className="paginated-title">View all</span>
        </div>
    )
}