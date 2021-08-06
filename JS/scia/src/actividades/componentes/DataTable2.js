import React from 'react'

import { DataGrid } from '@material-ui/data-grid';






export const DataTable2 = ({columnas, filas, filaSeleccionada}) => {
    
    
    return (
        <div style={{ height: 400 }}>
            <DataGrid
                rows={filas}
                columns={columnas}
                pageSize={5}
                /* checkboxSelection */
                /* disableSelectionOnClick */
                density='compact'
                onRowClick={(e)=>filaSeleccionada(e.row)}
                autoPageSize={true}
                /* onRowLeave={()=>filaSeleccionada(null)} */
                scrollbarSize={30}
            />
        </div>

    )
}
