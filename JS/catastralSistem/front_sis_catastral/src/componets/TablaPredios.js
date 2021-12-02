import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';


export const TablaPredios = ({registros, handleEvents}) => {

    const [columns, setColumns] = useState([
        { field: 'id', headerName:'ID', hide:true, },
        { field: 'numeroPredial', headerName:'FICHA CATASTRAL', flex:0.2, },
        { field: 'matriculaInmobiliaria', headerName:'MATRÍCULA', flex:0.2, },
        {
            field: '',
            // type: 'actions',
            align:'center',
            width: 70,
            renderCell: ({row}) => [
                <div style={{display:'flex', alignItems:'center'}}>
                    <Tooltip title="Modificar información del predio ">
                        <EditIcon 
                            onClick={()=>{handleEvents({action: 'edit', register: row})}}
                            sx={{color:'green'}}
                        />
                    </Tooltip>
                     <Tooltip title="Retirar predio ">
                        <DeleteForeverIcon 
                            onClick={()=>{handleEvents({action: 'delete', register: row, eliminarYa:false})}}
                            sx={{color:'red'}}
                        />
                    </Tooltip>
                </div>
            ],
        },
    ]);

    return (
            <DataGrid
                columns={columns}
                rows={registros}
                autoHeight
                density="compact"
                hideFooter={false}
                hideFooterSelectedRowCount
                pageSize={3}
                // scrollbarSize={10}
                loading={registros.length <= 0}
                rowsPerPageOptions={[]}
                key={Math.random()}
            />
    )
}
