import { Button, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { StoreContext } from '../../App';
import { Modal_1 } from '../../components/Modal_1';

const registrosPrueba = [
    {
        id: 0,        
        // ID_PUNTO:"ID_PUNTO",
        proyecto: 'Verdeyaco',        
        ID_PREDIO:"ID_PREDIO",
        ACOMPANANTE:"ACOMPANANTE",
        DESCRIPCION:"DESCRIPCION",
        OBSERVACIONES:"OBSERVACIONES",
        FECHA_CAPTURA:"01/04/2023",
        FUNCIONARIO_SAE:"FUNCIONARIO_SAE",
        FIRMA:"FIRMA",
    },
    {
        id: 1,        
        // ID_PUNTO:"ID_PUNTO",
        proyecto: 'Caliyaco',        
        ID_PREDIO:"ID_PREDIO",
        ACOMPANANTE:"ACOMPANANTE",
        DESCRIPCION:"DESCRIPCION",
        OBSERVACIONES:"OBSERVACIONES",
        FECHA_CAPTURA:"21/03/2019",
        FUNCIONARIO_SAE:"FUNCIONARIO_SAE",
        FIRMA:"FIRMA",
    },
    {
        id: 2,        
        // ID_PUNTO:"ID_PUNTO",
        proyecto: 'Rumiyaco',        
        ID_PREDIO:"ID_PREDIO",
        ACOMPANANTE:"ACOMPANANTE",
        DESCRIPCION:"DESCRIPCION",
        OBSERVACIONES:"OBSERVACIONES",
        FECHA_CAPTURA:"15/05/2021",
        FUNCIONARIO_SAE:"FUNCIONARIO_SAE",
        FIRMA:"FIRMA",
    },
    ];

export const ListarProyectos = () => {
    const { store, setStore } = useContext(StoreContext);
    const [openModal, setOpenModal] = useState(false);
    const [projectSelected, setProjectSelected] = useState({});

    const columns = [
        { field: 'id', headerName:'ID', hide:false, maxWidth:50, minWidth:20},
        { field: 'proyecto', headerName:'Proyecto', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.proyecto}</strong>
                }>
                    <p>{params.row.proyecto}</p>
                </Tooltip>
            )
        },
        { field: 'FECHA_CAPTURA', headerName:'Fecha', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.FECHA_CAPTURA}</strong>}>
                    <p>{params.row.FECHA_CAPTURA}</p>
                </Tooltip>
            )
        },    
        {
            field: 'Acciones',
            // type: 'actions',
            align:'center',
            flex:0.2,
            renderCell: ({row}) => [
            <div key={row.id}>
                <VisibilityIcon key={row.id+"see"} onClick={()=>{
                    setProjectSelected(row);
                    setOpenModal(true);
                    }}/>
                <DeleteForeverRoundedIcon key={row.id} onClick={()=>eliminarProyecto(row)}/>
            </div>
                // <img onClick={()=>{abilitarDesabilitarUsuario(row)}} className="imgWidth" src={""} alt="" style={{width:'15px', cursor:'pointer'}}/>
            ],
        },    
    ];
    const [rows, setRows] = useState([]);
    const verAtributos = (selected) => {
        console.log(selected);
    }
    const eliminarProyecto = (selected) => {
        setStore({...store, openBackop:true})
        console.log(selected);
        const newArray = rows.filter(r => r.id != selected.id)
        // console.log(newArray);
        setTimeout(() => {
            setRows(newArray)
            setStore({...store, openBackop:false})
        }, 2000);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };
    

   useEffect(() => {
     
    setTimeout(() => {
        setRows(registrosPrueba)
        setStore({...store, openBackop:false})
    }, 3000);
   
     return () => {}
   }, [])
   
  return (
    <div style={{ height: 300, width: '100%', marginTop:'15px' }}>
            
            <DataGrid
                className='datag'
                columns={columns}
                rows={rows}
                autoHeight
                density="compact"
                hideFooter={false}
                hideFooterSelectedRowCount
                pageSize={6}
                scrollbarSize={10}
                loading={rows.length <= 0}
                disableColumnMenu
            />
            {/* <Button variant="outlined" onClick={handleOpenModal}>
                Open responsive dialog
            </Button> */}
            <Modal_1 open={openModal} closeModal={closeModal} data={projectSelected}/>
        </div>
  )
}
