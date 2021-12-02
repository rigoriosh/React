import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GrEdit } from "react-icons/gr";
import { GrFormTrash } from "react-icons/gr";


export const TablaPredios = ({registros, handleEvents}) => {

    const [columns, setColumns] = useState([
        { field: 'id', headerName:'ID', hide:true, },
        { field: 'fichaCatastral', headerName:'Ficha catastral', flex:0.2, },
        { field: 'matricula', headerName:'Matrícula', flex:0.2, },
        {
            field: '',
            // type: 'actions',
            align:'center',
            width: 70,
            renderCell: ({row}) => [
                <div style={{display:'flex', alignItems:'center'}}>
                    <GrEdit onClick={()=>{handleEvents({row})}} style={{width:'17px', height:'15px', cursor:'pointer'}}/>
                    <GrFormTrash onClick={()=>{handleEvents({row, eliminarYa:false})}} style={{width:'24px', height:'22px', cursor:'pointer'}}/>
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
                pageSize={2}
                // scrollbarSize={10}
                loading={registros.length <= 0}
                // rowsPerPageOptions={registros.length}
                key={Math.random()}
            />
    )
}
