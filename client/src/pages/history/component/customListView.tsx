import { PurchaseModal } from 'modal/index';
import moment from 'moment';
import React from 'react'
import './customListView.css'

type IProps = {
    paginatedData: PurchaseModal[],
    url?: string,
    currentPage: number
}
export const CustomListView: React.FC<IProps> = (props) => {
    const { paginatedData } = props;

    return (
        <>
            {paginatedData.map((element) => (
                <div className='custom-purchase-history'>
                    <div className='purchase-item-name'>
                        <div className='class-img'>
                            <span className='span-frame'>
                                <img className='img-avatar' alt='' src={element.productIMG} />
                            </span>
                        </div>
                        <span className='item-name-store'>{element.productName}</span>
                    </div>
                    <div className='purchase-item col-4'>
                        <span>
                            {element.ownerProduct}
                        </span>
                    </div>
                    <div className='purchase-item'>
                       <span>{element.productPrice}</span>
                    </div>
                    <div className='purchase-item'>
                        <span>{element.quantity}</span>
                    </div>
                    <div className='purchase-item col-3'>
                        <span>{moment(element.purchaseDate).format("DD-MM-YYYY")}</span>
                    </div>
                    <div className='purchase-item'>
                        <span>{element.status}</span>
                    </div>
                </div>
            ))}
        </>
    )
}