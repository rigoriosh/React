import { Button, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { StoreContext } from '../../App';
import { ListGeomProye } from './ListGeomProye';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenTextProy } from '../../components/DialogContenTextProy';
import { deleteEndPoint, findAll } from '../../api/apis';
import enviroment from '../../helpers/enviroment';
import { useSnackbar } from 'notistack';
import { menu } from '../../helpers/constantes';

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
    const { enqueueSnackbar } = useSnackbar();
    const { store, setStore, login } = useContext(StoreContext);
    const {subMenuSelected}=store;
    const [projectSelected, setProjectSelected] = useState({proyecto:'',ID_PREDIO:''});
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
      });
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
        { field: 'nombre', headerName:'Proyecto', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.nombre}</strong>
                }>
                    <p>{params.row.nombre}</p>
                </Tooltip>
            )
        },
        { field: 'FECHA_CAPTURA', headerName:'Fecha', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.fechaCreacion}</strong>}>
                    <p>{params.row.fechaCreacion}</p>
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
    
    const eliminarProyecto = async() => {
        setStore({...store, openBackop:true})
        console.log(projectSelected);
        debugger
        const responseDelete = await deleteEndPoint(enviroment.delete, projectSelected.id)
        console.log(responseDelete);
        actualizarProyectos()


        // setTimeout(() => {
        //     const newArray = rows.filter(r => r.id != projectSelected.id)
        //     setRows(newArray)
        //     // actualizarProyectos()
        //     setStore({...store, openBackop:false})
        // }, 2000);
    }

    const handleResponseConfirmation = (response)=>{
        setOpenConfirmationDialog(false);
        if(response)eliminarProyecto();
    }

    const actualizarProyectos = async()=>{
        console.log("....actualizarProyectos....");
        debugger
        const response = await findAll(enviroment.obtenerproyectosxUsuario, login.userId);
        console.log(response);
        if (response.message == 'Failed to fetch' || response.message == "Unexpected end of JSON input") {
            const variant = "warning" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Presentamos inconvenientes de red, intenta mas tarde o contacta con el administrador',{variant});
            setStore({...store, menuSelected:menu[2].nameMenu, subMenuSelected:'', openBackop:false})
            console.error({response});
        } else {
            setRows(response)
            setStore({...store, openBackop:false})
        }

        /* setTimeout(() => {
            setRows(registrosPrueba)
            setStore({...store, openBackop:false})
        }, 1000); */
    }
   useEffect(() => {
    setTimeout(() => {
        actualizarProyectos();
    }, 1000);
   
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
                pageSizeOptions={[10]}
                density="compact"
                hideFooter={false}
                hideFooterSelectedRowCount
                /* initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                        page
                      },
                    },
                  }} */
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                // pageSize={5}
                // scrollbarSize={10}
                loading={rows.length <= 0}
                disableColumnMenu
                paginationMode="client"
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
