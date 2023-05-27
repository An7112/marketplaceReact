import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './pagination';
import './pagination.css'
import { PaginatedModal } from 'modal/index';
import { Link } from 'react-router-dom';
import { LoadingFrame } from 'component/loading-frame/loadingFrame';
import moment from 'moment';
import { useSelector } from 'react-redux';
interface Props {
  paginatedData: PaginatedModal[];
  isloading: boolean,
  column?: number,
  url?: string,
}

const PaginatedList: React.FC<Props> = ({ paginatedData, isloading, url }) => {

  const { searchItem } = useSelector((state: any) => state.state);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, _] = useState(10);
  const [checkDatalength, setCheckDatalength] = useState(false);

  useEffect(() => {
    if (paginatedData.length < 6) {
      setCheckDatalength(true);
    }
  }, [paginatedData])
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const pagedItems = useMemo(() => {
    const startIndex = offset;
    const endIndex = offset + itemsPerPage;
    const lowercasedTerm = searchItem.toLowerCase();
    const filteredData = paginatedData.filter((item: PaginatedModal) =>
      item.name.toLowerCase().includes(lowercasedTerm)
    )
    return filteredData.slice(startIndex, endIndex);
  }, [offset, itemsPerPage, searchItem, paginatedData]);

  return (
    <>
      <div className='paginated-main'>
        <div className='paginated-column'>
          <div className='paginated-item paginated-header'>
            <span className='item-name'>
              Name
            </span>
            <span className='item-3'>
              Quantity
            </span>
            <span className='item-3'>
              Date created
            </span>
          </div>
          {
            isloading === true
              ? <LoadingFrame divHeight={'87px'} divWidth={'100%'} spacing={'0.5rem'} />
              : pagedItems.slice(
                0,
                checkDatalength ? Math.ceil(pagedItems.length / 2) : 5)
                .map((element: PaginatedModal, index: number) => (
                  <>
                    <Link to={`/${url}/${element._id}`}>
                      <div className='paginated-item items'>
                        <div className='item-name'>
                          <div className='class-img'>
                            <span className='span-frame'>
                              <img className='img-avatar' alt='' src={element.img} />
                            </span>
                          </div>
                          <span className='item-name-store'>{element.name}</span>
                        </div>
                        <span className='item-3'>
                          {element.quantity}
                        </span>
                        <span className='item-3'>
                          {moment(element.createdDate).format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </Link>
                    <div className='line'></div>
                  </>
                ))
          }
        </div>

        <div className='paginated-column'>
          <div className='paginated-item paginated-header'>
            <span className='item-name'>
              Name
            </span>
            <span className='item-3'>
              Quantity
            </span>
            <span className='item-3'>
              Date created
            </span>
          </div>
          {
            isloading === true
              ? <LoadingFrame divHeight={'87px'} divWidth={'100%'} />
              : pagedItems.slice(
                checkDatalength ? Math.ceil(pagedItems.length / 2) : 5, 10)
                .map((element: PaginatedModal) => (
                  <>
                    <Link to={`/${url}/${element._id}`}>
                      <div className='paginated-item items'>
                        <div className='item-name'>
                          <div className='class-img'>
                            <span className='span-frame'>
                              <img className='img-avatar' alt='' src={element.img} />
                            </span>
                          </div>
                          <span className='item-name-store'>{element.name}</span>
                        </div>
                        <span className='item-3'>
                          {element.quantity}
                        </span>
                        <span className='item-3'>
                          {moment(element.createdDate).format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </Link>
                    <div className='line'></div>
                  </>
                ))
          }

        </div>

      </div>
      <Pagination
        pageCount={Math.ceil(paginatedData.length / itemsPerPage)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </>
  );
};
export default PaginatedList;
