import React, { useState, useMemo } from 'react';
import Pagination from './pagination';
import './pagination.css'

const PaginatedList = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, _] = useState(22);
  const [owner, setOwner] = useState(false);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const pagedItems = useMemo(() => {
    const startIndex = offset;
    const endIndex = offset + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [offset, itemsPerPage, data]);

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
          <div className='paginated-item items'>
            <div className='item-name'>
              <div className='class-img'>
                <span className='span-frame'>
                  <img className='img-avatar' alt='' src='/media/avatar.avif' />
                </span>
              </div>
              <span className='item-name-store'>Store 1</span>
            </div>
            <span className='item-3'>
              Gross product
            </span>
            <span className='item-3'>
              Store creation date
            </span>
          </div>
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
          <div className='paginated-item items'>
            <div className='item-name'>
              <div className='class-img'>
                <span className='span-frame'>
                  <img className='img-avatar' alt='' src='/media/avatar.avif' />
                </span>
              </div>
              <span className='item-name-store'>Store 1</span>
            </div>
            <span className='item-3'>
              Gross product
            </span>
            <span className='item-3'>
              Store creation date
            </span>
          </div>

        </div>
      </div>
      <Pagination
        pageCount={6}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </>
  );
};
export default PaginatedList;
