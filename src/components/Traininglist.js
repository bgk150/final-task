import React, {useState, useEffect, useRef} from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Snackbar } from '@material-ui/core';

function Traininglist(){

    const [trainings, setTrainings] = useState('');

    const [open, setOpen] = useState('');

    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    const handleClose = () => {
        setOpen(false);
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if(window.confirm("Are you sure?")){
            fetch("https://customerrest.herokuapp.com/api/trainings/"+id, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}) )
            .then(_ => {
                setMsg('Training was deleted successfully');
            })
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
    }


    const columns = [
        {headerName: 'Date', field: 'date', cellRendererFramework: params => moment.utc(params).format('DD.MM.YYYY hh:mm a') , sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true}, 
        {headerName: 'Customer', field: 'customer.lastname', sortable: false},
        {headerName: 'Delete', width: 500 , field: 'id', cellRendererFramework: params => <IconButton aria-label="delete" size="small" onClick={() => deleteTraining(params.value)}><DeleteIcon /></IconButton>}
    ]

    useEffect(() => {
        getTrainings();
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
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                ></AgGridReact>
                <Snackbar        
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />  
            </div>
        </div>
    )
}

export default Traininglist;
