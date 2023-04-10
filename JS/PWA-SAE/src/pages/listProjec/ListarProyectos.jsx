import { Button, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { StoreContext } from '../../App';
import { ListGeomProye } from './ListGeomProye';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenTextProy } from '../../components/DialogContenTextProy';

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
        FUNCIONARIO:"Luis Dias",
        FIRMA:"FIRMA",
        longitud:33.5,
        GEOMETRIAS:[
            {
                id:0,
                typeGeometry:'Punto',
                fecha: '05/04/2023'
            },
            {
                id:1,
                typeGeometry:'Punto',
                fecha: '05/04/2023'
            },
            {
                id:2,
                typeGeometry:'Punto',
                fecha: '05/04/2023'
            }
        ]
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
        FUNCIONARIO:"Ana Florez",
        FIRMA:"FIRMA",
        longitud:120,
        GEOMETRIAS:[
            {
                id:0,
                typeGeometry:'Punto',
                fecha: '05/04/2023'
            },
            {
                id:1,
                typeGeometry:'Linea',
                fecha: '05/04/2023'
            },
            {
                id:2,
                typeGeometry:'Poligono',
                fecha: '05/04/2023'
            }
        ]
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
        FUNCIONARIO:"Luisa Diaz",
        FIRMA:"FIRMA",
        longitud:555,
        GEOMETRIAS:[
            {
                id:0,
                typeGeometry:'Poligono',
                fecha: '05/04/2023'
            },
            {
                id:1,
                typeGeometry:'Poligono',
                fecha: '05/04/2023'
            },
            {
                id:2,
                typeGeometry:'Poligono',
                fecha: '05/04/2023'
            }
        ]
    },
    ];

export const ListarProyectos = () => {
    const { store, setStore } = useContext(StoreContext);
    const {subMenuSelected}=store;
    const [projectSelected, setProjectSelected] = useState({proyecto:'',ID_PREDIO:''});
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const proyectSelected = (row, openModal) => {
        console.log("row => ", row);
        setProjectSelected(row);
        if (openModal) {
            setOpenConfirmationDialog(openModal)
        }else{
            setStore({...store, subMenuSelected:"proyectedSelected"})
        }
    }
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
            type: 'actions',
            align:'center',
            flex:0.2,
            renderCell: ({row}) => [
            <div key={row.id}>
                <VisibilityIcon key={row.id+"see"} onClick={()=>proyectSelected(row,false)}/>
                <DeleteForeverRoundedIcon key={row.id} onClick={()=>proyectSelected(row, true)}/>
            </div>
            ],
        },    
    ];
    const [rows, setRows] = useState([]);
    
    const eliminarProyecto = () => {
        setStore({...store, openBackop:true})
        console.log(projectSelected);
        const newArray = rows.filter(r => r.id != projectSelected.id)
        // console.log(newArray);
        setTimeout(() => {
            setRows(newArray)
            // actualizarProyectos()
            setStore({...store, openBackop:false})
        }, 2000);
    }

    const handleResponseConfirmation = (response)=>{
        setOpenConfirmationDialog(false);
        if(response)eliminarProyecto();
    }

    const actualizarProyectos = ()=>{
        console.log("....actualizarProyectos....");
        setTimeout(() => {
            setRows(registrosPrueba)
            setStore({...store, openBackop:false})
        }, 1000);
    }
   useEffect(() => {
     actualizarProyectos();
   
     return () => {}
   }, [])

   
  return (
    <div style={{ height: 300, width: 'auto', margin:'10px 5px 5px 5px' }}>
        {
            !subMenuSelected ?
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
            :   <ListGeomProye projectSelected={projectSelected}
                    actualizarProyectos={actualizarProyectos}
                />
        }
        <ConfirmationDialog
            openConfirmationDialog={openConfirmationDialog}
            setOpenConfirmationDialog={setOpenConfirmationDialog}
            handleResponseConfirmation={handleResponseConfirmation}
            dialogContenText={<DialogContenTextProy projectSelected={projectSelected}/>}
        />
    </div>
  )
}
