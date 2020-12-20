import React, {useState, useEffect, useRef} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Snackbar } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Customerlist(){

    const [customers, setCustomers] = useState('');

    const [open, setOpen] = useState('');

    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (custTwo) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(custTwo)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer was added successfully')
        })
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT', 
            headers: {'Content-type':'application/json'}, 
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg("Customer was updated successfully")
        })
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm("Are you sure?")){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}) )
            .then(_ => {
                setMsg('Customer was deleted successfully');
            })
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Training was added successfully')
        })
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: '', field: 'links.0.href', cellRendererFramework: params => <IconButton aria-label="delete" size="small" onClick={() => deleteCustomer(params.value)}><DeleteIcon/></IconButton>},
        {headerName: '', field: 'links.0.href', width:300, cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />},
        {headerName: 'First Name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Post Code', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true}, 
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {headerName: '', field: 'links.0.href', width: 300,  cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params}/>}
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
                <Snackbar 
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
                <AddCustomer addCustomer={addCustomer}/>
            </div>
        </div>
    )
}

export default Customerlist;
