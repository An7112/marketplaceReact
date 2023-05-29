import { PaginatedModal } from 'modal/index';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
type IProps = {
    paginatedData: PaginatedModal[],
    url?: string,
    currentPage: number
}
export const CustomListView: React.FC<IProps> = (props) => {
    
    console.log(props);

    return (
        <>
            <div className='paginated-column'>
                Custom
            </div>
        </>

    )
}