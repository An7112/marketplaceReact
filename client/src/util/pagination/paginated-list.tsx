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
  count?: number,
  objectKeys?: Record<string, any>,
  schema?: {
    header: string,
    gridSpan: string,
  }[],
  RowList?: React.ComponentType<any>
}

const PaginatedList = (props: Props) => {

  const { paginatedData, isloading, url, count, schema, column } = props;
  const RowListComponent = props.RowList;

  const { searchItem } = useSelector((state: any) => state.state);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, _] = useState(10);
  const existingColumn = column ?? 1;
  const paginatedColumn = [];
  for (let i = 0; i < existingColumn; i++) {
    paginatedColumn.push(i);
  }

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
        <div className='paginated-row paginated-header' style={{gridTemplateColumns: paginatedColumn.length > 1 ? '' : '1fr'}}>
          {paginatedColumn.map((ele) => (
            Array.isArray(schema) && schema.length > 0
              ?
              <div className='paginated-item'
                style={{
                  gridTemplateColumns: `repeat(18, minmax(0, 1fr))`
                }}>
                {schema.map((element: Record<string, string>) => (
                  <div className='item-paginated-key'
                    style={{
                      gridColumn: element.gridSpan
                    }}>
                    <span>{element.header}</span>
                  </div>
                ))}
              </div>
              : <div className='paginated-item'>
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
          ))}
        </div>
        {
          RowListComponent
            ? <RowListComponent currentPage={currentPage} />
            : <div className='paginated-row grid-container'>
              {
                isloading === true
                  ? <>
                    {paginatedColumn.map((ele) => (
                      <LoadingFrame divHeight={'87px'} divWidth={'100%'} spacing={'0.5rem'} borderRadius={0} />
                    ))}
                  </>
                  : pagedItems
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
                          <div className='line'></div>
                        </Link>
                      </>
                    ))
              }
            </div>
        }

      </div>
      <Pagination
        pageCount={count ? Math.ceil(count / itemsPerPage) : Math.ceil(paginatedData.length / itemsPerPage)}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </>
  );
};
export default PaginatedList;
