import React, {useState, useEffect, useRef} from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';

function Traininglist(){

    const [trainings, setTrainings] = useState('');

    const gridRef = useRef();

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: 'Date', field: 'date', cellRendererFramework: params => moment.utc(params).format('DD.MM.YYYY hh:mm a') , sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true}
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
            </div>
        </div>
    )
}

export default Traininglist;
