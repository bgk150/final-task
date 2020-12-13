import React, {useState, useEffect, useRef} from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist(){

    const [customers, setCustomers] = useState('');

    const gridRef = useRef();

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: 'First Name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Post Code', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true}, 
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true}
        
    ]

    useEffect(() => {
        getCustomers();
    }, [])

    return(
        <div>
            <div className = 'ag-theme-material' style={{height:'700px', width: '95%', margin: 'auto'}} >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }} 
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                ></AgGridReact>
            </div>
        </div>
    )
}

export default Customerlist;
