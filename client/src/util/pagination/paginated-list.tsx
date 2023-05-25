import React, { useState, useMemo } from 'react';
import Pagination from './pagination';
import './pagination.css'
import { StoreInfoModal } from 'modal/index';

interface Props {
  storeInfo: StoreInfoModal[];
}


const PaginatedList: React.FC<Props> = ({ storeInfo }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, _] = useState(10);

  // const fetchData = [{
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 1",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // },
  // {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 2",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // },
  // {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 3",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // },
  // {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 4",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // },
  // {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 5",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // },
  // {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 6",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store MOc 7",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 8",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 9",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 10",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 11",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 12",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 13",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 14",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 15",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 16",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 17",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }, {
  //   "_id": "N9OxajUMdsQEwKT7xE28JAuKtyQ2",
  //   "storeName": "store 18",
  //   "storeDescription": "Lorem",
  //   "storeAvatar": "https://ipfs.io/ipfs/QmQX6tYEJZqYQWWEDib2BXRKygaLR41pHfqU6gZTxgRfq3",
  //   "storeBanner": "https://ipfs.io/ipfs/QmU1J77UYUsAwWpAbfXDyoPsHMzrCQsPaR24WJ7qPCmBCt",
  //   "storeProductLength": 0,
  //   "date": "2023-05-25T06:10:26.918Z",
  // }]
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
          {pagedItems.slice(0, 5).map((element: StoreInfoModal, index:number) => (
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
          {pagedItems.slice(5, 10).map((element: StoreInfoModal) => (
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
