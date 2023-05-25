import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './pagination';
import './pagination.css'
import { StoreInfoModal } from 'modal/index';
import { Link } from 'react-router-dom';

interface Props {
  storeInfo: StoreInfoModal[];
}


const PaginatedList: React.FC<Props> = ({ storeInfo }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, _] = useState(10);
  const [checkDatalength, setCheckDatalength] = useState(false);

  useEffect(() => {
    if (storeInfo.length < 6) {
      setCheckDatalength(true);
    }
  }, [storeInfo])
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const pagedItems = useMemo(() => {
    const startIndex = offset;
    const endIndex = offset + itemsPerPage;
    return storeInfo.slice(startIndex, endIndex);
  }, [offset, itemsPerPage, storeInfo]);

  return (
    <>
      <div className='paginated-main'>
        <div className='paginated-column'>
          <div className='paginated-item paginated-header'>
            <span className='item-name'>
              Store
            </span>
            <span className='item-3'>
              Gross product
            </span>
            <span className='item-3'>
              Store creation date
            </span>
          </div>
          {pagedItems.slice(
            0,
            checkDatalength ? Math.ceil(pagedItems.length / 2) : 5)
            .map((element: StoreInfoModal, index: number) => (
              <Link to={`/store/${element._id}`}>
                <div className='paginated-item items'>
                  <div className='item-name'>
                    <div className='class-img'>
                      <span className='span-frame'>
                        <img className='img-avatar' alt='' src={element.storeAvatar} />
                      </span>
                    </div>
                    <span className='item-name-store'>{element.storeName}</span>
                  </div>
                  <span className='item-3'>
                    {element.storeProductLength}
                  </span>
                  <span className='item-3'>
                    {element.date}
                  </span>
                </div>
              </Link>
            ))}
        </div>

        <div className='paginated-column'>
          <div className='paginated-item paginated-header'>
            <span className='item-name'>
              Store
            </span>
            <span className='item-3'>
              Gross product
            </span>
            <span className='item-3'>
              Store creation date
            </span>
          </div>
          {pagedItems.slice(
            checkDatalength ? Math.ceil(pagedItems.length / 2) : 5, 10)
            .map((element: StoreInfoModal) => (
              <Link to={`/store/${element._id}`}>
                <div className='paginated-item items'>
                  <div className='item-name'>
                    <div className='class-img'>
                      <span className='span-frame'>
                        <img className='img-avatar' alt='' src={element.storeAvatar} />
                      </span>
                    </div>
                    <span className='item-name-store'>{element.storeName}</span>
                  </div>
                  <span className='item-3'>
                    {element.storeProductLength}
                  </span>
                  <span className='item-3'>
                    {element.date}
                  </span>
                </div>
              </Link>

            ))}
        </div>

      </div>
      <Pagination
        pageCount={Math.ceil(storeInfo.length / itemsPerPage)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </>
  );
};
export default PaginatedList;
