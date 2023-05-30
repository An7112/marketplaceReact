import { PurchaseModal } from 'modal/index';
import moment from 'moment';
import React, { useMemo, useState } from 'react'
import './customListView.css'
import { useSelector } from 'react-redux';

type IProps = {
    paginatedData: PurchaseModal[],
    url?: string,
    currentPage: number
}
export const CustomListView: React.FC<IProps> = (props) => {
    const { paginatedData, currentPage } = props;
    const [itemsPerPage, _] = useState(10);
    const { searchItem } = useSelector((state: any) => state.state);
    
    const offset = currentPage * itemsPerPage;
    const pagedItemsDefault = useMemo(() => {
        const startIndex = offset;
        const endIndex = offset + itemsPerPage;
        const lowercasedTerm = searchItem ? searchItem.toLowerCase() : '';
        const filteredData = paginatedData?.filter((item:PurchaseModal) =>
          item.productName && item.productName.toLowerCase().includes(lowercasedTerm)
        ) ?? [];
        return filteredData.slice(startIndex, endIndex);
      }, [offset, itemsPerPage, searchItem, paginatedData]);
      
    return (
        <>
            {pagedItemsDefault.map((element) => (
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