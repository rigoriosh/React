import { Box, Button, Card, CardActions, CardContent, FormControlLabel, InputLabel, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';
import Punto from '../../assets/btnsIcons/Punto.png'
import Linea from '../../assets/btnsIcons/Linea.png'
import Poligono from '../../assets/btnsIcons/Poligono.png'
import { useSnackbar } from 'notistack';
import { NameProject } from './NameProject';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { DialogContenTextGeom } from '../../components/DialogContenTextGeom';
import { Modal_1 } from '../../components/Modal_1';


export const FormCrearGeom = ({geometriesCreated, setGeometriesCreated, nomProject, setNomProject,
    typeGeometry, setTypeGeometrySelected
}) => {
    const { store, setStore } = useContext(StoreContext);
    const {menuSelected, subMenuSelected}=store;
    const { enqueueSnackbar } = useSnackbar();
    const [geometriaSelected, setGeometriaSelected] = useState({ id:0,typeGeometry:'',FECHA_CAPTURA: ''});
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const geometrySelected = (row, openModal) => {
        console.log("row => ", row);
        setGeometriaSelected(row);
        if (openModal) {
            // flujo elminar geometria
            setOpenConfirmationDialog(openModal) 
        }else{
            // flujo ver geometria
            setOpenModal(true);
        }
    }
    const columns = [
        { field: 'id', headerName:'Id', hide:false, maxWidth:50, minWidth:20},
        { field: 'typeGeometry', headerName:'Tipo', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.typeGeometry}</strong>
                }>
                    <p>{params.row.typeGeometry}</p>
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
            headerName:'Acciones',
            type: 'actions',
            align:'center',
            flex:0.2,
            renderCell: ({row}) => [
            <div key={row.id}>
                <VisibilityIcon key={row.id+"see"} onClick={()=>geometrySelected(row,false)}/>
                <DeleteForeverRoundedIcon key={row.id} onClick={()=>geometrySelected(row, true)}/>
            </div>
            ],
        },    
    ];

    const controlVistas = (subMenu) => {
        console.log(nomProject);
        if (nomProject == '') {
            const variant = "warning" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Recuerda el nombre del proyecto es obligatorio',{variant});
        } else {
            setTypeGeometrySelected(subMenu)
            setStore({...store, subMenuSelected:subMenu})
        }
    }

    const finalizar = () => {
        console.log(finalizar);
        setStore({...store, openBackop:true})
        setTimeout(() => {
            const variant = "success" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Proyecto creado con exito',{variant});
            setNomProject('');
            setGeometriesCreated([]);
            setStore({...store, openBackop:false})
        }, 2000);
    }

    const eliminarGeometry = () => {
        setStore({...store, openBackop:true})
        console.log(geometriaSelected);
        const newArray = geometriesCreated.filter(r => r.id != geometriaSelected.id)
        // console.log(newArray);
        setTimeout(() => {
            setGeometriesCreated(newArray)
            // actualizarProyectos()
            setStore({...store, openBackop:false})
        }, 2000);
    }

    const handleResponseConfirmation = (response)=>{
        setOpenConfirmationDialog(false);
        if(response)eliminarGeometry();
    }
    const closeModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
      console.log("FormCrearGeom");
    
      return () => {}
    }, [])
    
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { /* width: '90%' */ },
                padding: '0px 10px',
                fontSize:'10px',
                // backgroundColor:'orangered',
                gridTemplateColumns: { sm: '1fr 1fr' }, gap: 0.1,
            }}
            noValidate
            autoComplete="off"
        >        
        
            <NameProject label={"Ingrese nombre del proyecto"} setField={setNomProject} key={"formCreate"}
                value={nomProject}
            />

            <InputLabel htmlFor="usuario" style={{fontWeight:'bold', color:'white',
                marginTop:geometriesCreated.length>4?'5px':'30px'}}>Seleccione geometrías del proyecto</InputLabel>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                <CardActions style={{justifyContent:'space-around'}}>
                    <img src={Punto} alt="Punto" style={{cursor:'pointer', width:'50px', alignSelf:'center'}}
                        onClick={()=>controlVistas(tiposGeometrias.Punto)}/>
                    <img src={Linea} alt="Línea" style={{cursor:'pointer', width:'50px', alignSelf:'center'}}
                        onClick={()=>controlVistas(tiposGeometrias.Linea)}/>
                    <img src={Poligono} alt="Polígono" style={{cursor:'pointer', width:'50px', alignSelf:'center'}}
                        onClick={()=>controlVistas(tiposGeometrias.Poligono)}/>
                </CardActions>
            </Card>

            {
                geometriesCreated.length > 0 && (
                    <>
                        <DataGrid
                            className='datag'
                            columns={columns}
                            rows={geometriesCreated}
                            autoHeight
                            density="compact"
                            hideFooter={false}
                            hideFooterSelectedRowCount
                            initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 5,
                                  },
                                },
                              }}
                            pageSizeOptions={[5]}
                            scrollbarSize={10}
                            loading={geometriesCreated.length <= 0}
                            disableColumnMenu
                        />
                        <Button variant="contained" size="small" onClick={finalizar} style={{marginTop:'5px'}}>
                            Finalizar
                        </Button>
                    </>
                )
            }



            {/*
             <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue=""
                >
                <FormControlLabel
                    value={tiposGeometrias.Punto}
                    control={<Radio />}
                    label={tiposGeometrias.Punto}
                    labelPlacement="top"
                    onChange={()=>controlVistas(tiposGeometrias.Punto)}
                />
                <FormControlLabel
                    value={tiposGeometrias.Linea}
                    control={<Radio />}
                    label={tiposGeometrias.Linea}
                    labelPlacement="bottom"
                    onChange={()=>controlVistas(tiposGeometrias.Linea)}
                />
                <FormControlLabel
                    value={tiposGeometrias.Poligono}
                    control={<Radio />}
                    label={tiposGeometrias.Poligono}
                    labelPlacement="top"
                    onChange={()=>controlVistas(tiposGeometrias.Poligono)}
                />
                </RadioGroup> 
            */}
            <Modal_1 open={openModal} closeModal={closeModal} data={geometriaSelected} geometriaSelected={geometriaSelected}/>
            <ConfirmationDialog
                openConfirmationDialog={openConfirmationDialog}
                setOpenConfirmationDialog={setOpenConfirmationDialog}
                handleResponseConfirmation={handleResponseConfirmation}
                dialogContenText={<DialogContenTextGeom geometriaSelected={geometriaSelected}/>}
            />
        </Box>
    )
}
