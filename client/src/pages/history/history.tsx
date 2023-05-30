import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TbCloudDownload } from 'react-icons/tb'
import { CustomListView } from "./component/customListView";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './history.css'
import { PurchaseModal } from 'modal/index';
import PaginatedList from 'util/pagination/paginated-list';
import axios from 'axios';
import { historySchema } from './component/shema';

export const OrderHistory = () => {
    const user = useSelector((state: any) => state.auth.user)
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseModal[]>([])
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            if (user) {
                setIsloading(true);
                try {
                    const response = await axios.get(`http://localhost:9000/api/history?owner=${user.uid}`)
                    setPurchaseHistory(response.data);
                } catch (error) {

                } finally {
                    setIsloading(false)
                }
            }
        }
        fetchHistory();
    }, [user])

    const Item = useCallback((props: any) => {
        return <CustomListView {...props} paginatedData={purchaseHistory} />;
    }, [purchaseHistory]);


    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(purchaseHistory);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'myHistory.xlsx');
    };

    return (
        <div className='history-main'>
            <div className='history-header'>
                <div className='header-top left'>
                    <h3 className='header-title'>Order history</h3>
                    <span className='header-dsc'>Manage your recent orders and invoices.</span>
                </div>
                <div className='header-top right'>
                    <button className='header-button' onClick={exportToExcel}>
                        <TbCloudDownload />
                        Download documents
                    </button>
                    <button className='header-button order'>
                        New Order
                    </button>
                </div>
            </div>
            <span className="paginated-title">View all</span>
            <PaginatedList
                isloading={isloading}
                RowList={Item}
                paginatedData={[]}
                schema={historySchema}
                column={1}
            />
        </div>
    )
}