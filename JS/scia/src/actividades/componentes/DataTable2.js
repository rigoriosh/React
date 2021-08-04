import React from 'react'

import { DataGrid } from '@material-ui/data-grid';

const columns = [
  /* { field: 'id', headerName: 'ID', width: 90 }, */
  {
    field: 'recurso',
    headerName: 'RECURSOS',
    width: 135,
    editable: true,
  },
  {
    field: 'fecha',
    headerName: 'FECHA',
    width: 110,
    editable: true,
  },
  {
    field: 'cantidad',
    headerName: 'CANTIDAD',
    //type: 'number',
    width: 128,
    editable: true,
  },
  /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  }, */
];

const rows = [
  { id: 1, recurso: 'Ayudante Civil',       fecha: '2021-07-08',      cantidad: 3 },
  { id: 2, recurso: 'Cadenero',  fecha: '2021-07-08',   cantidad: 4 },
  { id: 3, recurso: 'Grua 30',  fecha: '2021-07-08',   cantidad: 1 },
  { id: 4, recurso: 'Stark',      fecha: '2021-07-08',   cantidad: 16 },
  { id: 5, recurso: 'Targaryen',  fecha: '2021-07-08',   cantidad: 5 },
  { id: 6, recurso: 'Melisandre', fecha: '2021-07-08',   cantidad: 150 },
  { id: 7, recurso: 'Clifford',   fecha: '2021-07-08',   cantidad: 44 },
  { id: 8, recurso: 'Frances',    fecha: '2021-07-08',   cantidad: 36 },
  { id: 9, recurso: 'Roxie',      fecha: '2021-07-08',   cantidad: 65 },
];




export const DataTable2 = () => {
    
    
    return (
        <div style={{ height: 400 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                /* checkboxSelection */
                disableSelectionOnClick
                density='compact'
                onRowClick={(e)=>console.log(e.row)}
                autoPageSize={true}
                
                scrollbarSize={30}
            />
        </div>

    )
}
