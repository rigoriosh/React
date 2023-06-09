import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { Modal_1 } from '../../components/Modal_1';
import { StoreContext } from '../../App';
import { Tooltip } from '@mui/material';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenTextGeom } from '../../components/DialogContenTextGeom';
import { findAll, postDeleteGeomtry } from '../../api/apis';
import enviroment, { urlPost_deleteFeatures_PuntosLineasPoligonos } from '../../helpers/enviroment';

export const ListGeomProye = ({projectSelected, actualizarProyectos}) => {
    const { store, setStore } = useContext(StoreContext);
    const { enqueueSnackbar } = useSnackbar();

    console.log("projectSelected => ", projectSelected);
    const [geometriaSelected, setGeometriaSelected] = useState({ id:0,typeGeometry:'',fecha: ''});
    const [openModal, setOpenModal] = useState(false);
    // const [rows, setRows] = useState(projectSelected.GEOMETRIAS);
    const [rows, setRows] = useState([]);
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

    const eliminarGeometria = async() => {
        setStore({...store, openBackop:true})
        console.log(geometriaSelected);
        const url = geometriaSelected.typeGeometry === "Punto" ? urlPost_deleteFeatures_PuntosLineasPoligonos.punto
        : geometriaSelected.typeGeometry === "Linea" ? urlPost_deleteFeatures_PuntosLineasPoligonos.linea
        : urlPost_deleteFeatures_PuntosLineasPoligonos.poligono
        debugger
        // const responseDelete = await deleteEndPoint(url, geometriaSelected.id)
        const data = {
            objectIds: geometriaSelected.id,
            where : `ID_PROYECT = '${geometriaSelected.idProyecto}'`
          }
        const responseDelete = await postDeleteGeomtry(url, data)
        console.log(responseDelete);
        consultarGeomtrias();
        // console.log(newArray);
        // setTimeout(() => {
        //     const newArray = rows.filter(r => r.id != geometriaSelected.id)
        //     setRows(newArray)
        //     setStore({...store, openBackop:false})
        //     // actualizarProyectos()
        // }, 2000);
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
        { field: 'fechaCreacion', headerName:'Fecha', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.fechaCreacion}</strong>}>
                    <p>{params.row.fechaCreacion}</p>
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
    const agregarTipo = (geometrias, typeGeometry) => {
        const fixData = []
        geometrias.forEach(el => {
            fixData.push({...el, typeGeometry})
        });
        return fixData;
    }
    const consultarGeomtrias = async() => {
        debugger
        const responsePuntos = await findAll(enviroment.FindByIdProyecto, projectSelected.id)
        console.log("responsePuntos => ", responsePuntos);
        // let nuevosRegistros = [...rows]
        let nuevosRegistros = []
        if (responsePuntos.length > 0 && responsePuntos !== "Sin registros") {
            let fixData = agregarTipo(responsePuntos, "Punto")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...fixData]
            // setRows(nuevosRegistros)
        }
        debugger
        const responseLineas = await findAll(enviroment.findByIdProyectoLinea, projectSelected.id)
        console.log("responseLineas => ", responseLineas);
        if (responseLineas.length > 0 && responseLineas !== "Sin registros") {
            let fixData = agregarTipo(responseLineas, "Linea")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...nuevosRegistros, ...fixData]
            // setRows(nuevosRegistros)
        }
        debugger
        const responsePoligon = await findAll(enviroment.findByIdProyectoPoligono, projectSelected.id)
        console.log("responsePoligon => ", responsePoligon);
        if (responsePoligon.length > 0 && responsePoligon !== "Sin registros") {
            let fixData = agregarTipo(responsePoligon, "Poligono")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...nuevosRegistros, ...fixData]
        }
        if (nuevosRegistros.length>0) {
            setRows(nuevosRegistros)            
            setStore({...store, openBackop:false})
        }else{
            const variant = "info" // variant could be success, error, warning, info, or default
            enqueueSnackbar(`El proyecto "${projectSelected.nombre}" no presenta geometrías creadas`,{variant});
            setStore({...store, subMenuSelected:""})
        }

        /*  
        debugger
        const responsePuntos = await findAll(enviroment.FindByIdProyecto, projectSelected.id)
        console.log("responsePuntos => ", responsePuntos);
        // let nuevosRegistros = [...rows]
        let nuevosRegistros = []
        if (responsePuntos.length > 0 && responsePuntos !== "Sin registros") {
            let fixData = agregarTipo(responsePuntos, "Punto")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...fixData]
            // setRows(nuevosRegistros)
        }
        debugger
        const responseLineas = await findAll(enviroment.findByIdProyectoLinea, projectSelected.id)
        console.log("responseLineas => ", responseLineas);
        if (responseLineas.length > 0 && responseLineas !== "Sin registros") {
            let fixData = agregarTipo(responseLineas, "Linea")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...nuevosRegistros, ...fixData]
            // setRows(nuevosRegistros)
        }
        debugger
        const responsePoligon = await findAll(enviroment.findByIdProyectoPoligono, projectSelected.id)
        console.log("responsePoligon => ", responsePoligon);
        if (responsePoligon.length > 0 && responsePoligon !== "Sin registros") {
            let fixData = agregarTipo(responsePoligon, "Poligono")
            fixData = fixData.map(e => {return{...e, fechaCreacion:new Date(e.fechaCreacion).toLocaleDateString()}})
            nuevosRegistros = [...nuevosRegistros, ...fixData]
        }
        if (nuevosRegistros.length>0) {
            setRows(nuevosRegistros)            
            setStore({...store, openBackop:false})
        }else{
            const variant = "info" // variant could be success, error, warning, info, or default
            enqueueSnackbar(`El proyecto "${projectSelected.nombre}" no presenta geometrías creadas`,{variant});
            setStore({...store, subMenuSelected:""})
        }
        */
    }
    useEffect(() => {
      console.log("Consultar geometrias segun tipo y por Id proyecto");
      console.log(projectSelected);
      consultarGeomtrias();
    
      return () => {}
    }, [])
    
    
  return (
    <div style={{ height: 300, width: '100%', marginTop:'15px' }}>
        {
            <p className='tituloBtnCenter titulo3 ' style={
                {height:'30px', margin:'5px 5px 5px 5px', width:'auto'}
            }>{projectSelected.nombre}</p>
        }
            <DataGrid
                className='datag'
                columns={columns}
                rows={rows}
                autoHeight
                density="compact"
                hideFooter={false}
                hideFooterSelectedRowCount
                initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                        page:0
                      },
                    },
                  }}
                pageSizeOptions={[10]}
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
