import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import React, { useContext, useState } from 'react'
import { Modal_1 } from '../../components/Modal_1';
import { StoreContext } from '../../App';
import { Tooltip } from '@mui/material';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenTextGeom } from '../../components/DialogContenTextGeom';

export const ListGeomProye = ({projectSelected, actualizarProyectos}) => {
    const { store, setStore } = useContext(StoreContext);
    console.log("projectSelected => ", projectSelected);
    const [geometriaSelected, setGeometriaSelected] = useState({ id:0,typeGeometry:'',fecha: ''});
    const [openModal, setOpenModal] = useState(false);
    const [rows, setRows] = useState(projectSelected.GEOMETRIAS);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);


    const closeModal = () => {
        setOpenModal(false);
    };

    const geomtrySelected = (row, openModal) => {
        console.log("row => ", row);
        setGeometriaSelected(row);
        if (openModal) {
            setOpenConfirmationDialog(openModal)
        }else{
            // setStore({...store, subMenuSelected:"proyectedSelected"})
            setOpenModal(true);
        }
    }

    const eliminarGeometria = () => {
        setStore({...store, openBackop:true})
        console.log(geometriaSelected);
        const newArray = rows.filter(r => r.id != geometriaSelected.id)
        // console.log(newArray);
        setTimeout(() => {
            setRows(newArray)
            setStore({...store, openBackop:false})
            // actualizarProyectos()
        }, 2000);
    }
    const handleResponseConfirmation = (response)=>{
        setOpenConfirmationDialog(false);
        if(response)eliminarGeometria();
    }
    const columns = [
        { field: 'id', headerName:'ID', hide:false, maxWidth:50, minWidth:20},
        { field: 'typeGeometry', headerName:'Tipo', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.typeGeometry}</strong>
                }>
                    <p>{params.row.typeGeometry}</p>
                </Tooltip>
            )
        },
        { field: 'fecha', headerName:'Fecha', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.fecha}</strong>}>
                    <p>{params.row.fecha}</p>
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
                    <VisibilityIcon key={row.id+"see"} onClick={()=>geomtrySelected(row, false)}/>
                    <DeleteForeverRoundedIcon key={row.id} onClick={()=>geomtrySelected(row, true)}/>
                </div>
            ],
        },    
    ];
    
  return (
    <div style={{ height: 300, width: '100%', marginTop:'15px' }}>
        {
            <p className='tituloBtnCenter titulo3 ' style={
                {height:'30px', margin:'5px 5px 5px 5px', width:'auto'}
            }>{projectSelected.proyecto}</p>
        }
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
            <Modal_1 open={openModal} closeModal={closeModal} data={projectSelected} geometriaSelected={geometriaSelected}/>
            <ConfirmationDialog
                openConfirmationDialog={openConfirmationDialog}
                setOpenConfirmationDialog={setOpenConfirmationDialog}
                handleResponseConfirmation={handleResponseConfirmation}
                dialogContenText={<DialogContenTextGeom geometriaSelected={geometriaSelected}/>}
            />
        </div>
  )
}
