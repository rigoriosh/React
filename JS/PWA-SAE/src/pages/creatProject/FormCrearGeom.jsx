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
import { insertProjecGeometry} from '../../api/apis';
import { fechaActual, formarJsonToPersistir, getNorteEste, traer_idProyecto } from '../../helpers/utils';


export const FormCrearGeom = ({geometriesCreated, setGeometriesCreated, nomProject, setNomProject,
    typeGeometry, setTypeGeometrySelected
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const { store, setStore, openBackDrop, login } = useContext(StoreContext);
    // const {menuSelected, subMenuSelected}=store;
    const [geometriaSelected, setGeometriaSelected] = useState({ id:0,typeGeometry:'',fecha_captura: ''});
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
        { field: 'fecha_captura', headerName:'Fecha', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.fecha_captura}</strong>}>
                    <p>{params.row.fecha_captura}</p>
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
        console.log("navigator.onLine  => ", navigator.onLine );

        if (nomProject == '') {
            const variant = "warning" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Recuerda el nombre del proyecto es obligatorio',{variant});
        } else {
            setTypeGeometrySelected(subMenu)
            setStore({...store, subMenuSelected:subMenu})
        }
    }

    const finalizar_1 = () => {
        console.log("finalizar_1");
        // setStore({...store, openBackop:true})
        openBackDrop()
        console.log("navigator.onLine  => ", navigator.onLine );
        console.log("geometriesCreated => ", geometriesCreated);
        let features = [];
        geometriesCreated.forEach(g => { 
            features.push({
                type:"Feature",
                geometry:{
                    type: g.typeGeometry == "Punto"
                        ?"Point": g.typeGeometry == "Línea"
                        ? 'LineString'
                        : 'Polygon',
                    coordinates: g.typeGeometry == "Punto"
                        ? [g.longitudPunto, g.latitudPunto]
                            : g.typeGeometry == "Línea" 
                                ?[[g.puntoInicial.longitud, g.puntoInicial.latitud],[g.puntoFinal.longitud,g.puntoFinal.latitud]]
                                : [g.poligon],              
                },
                properties:
                g.typeGeometry == "Polígono" ?
                    {
                        "ID_INICIO":g.id_inicio,
                        "ID_FINAL":g.id_final,
                        "DESCRIPCIO":g.descripcion,
                        "ID_PREDIO":g.id_predio, // por user
                        "ACOMPANIAN":g.acompaniante,
                        "OBSERVACIO":g.observaciones,
                        "FUNCIONARI":g.funcionario,
                        "AREA_M2":g.area_m2,
                        "FIRMA":g.firma
                        //"FECHA_CAPT":g.fecha_captura,
                    }  
                    : g.typeGeometry == "Punto" 
                        ? {
                            "OBJECTID": Number(new Date()),
                            "ID_PUNTO":g.ID_PUNTO,// por user
                            "DESCRIPCIO":g.descripcion,
                            "ID_PREDIO":g.id_predio, // por user
                            "ACOMPANIAN":g.acompaniante,
                            "OBSERVACIO":g.observaciones,
                            "FUNCIONARI":g.funcionario,
                            "FIRMA":g.firma
                        }
                        : g.typeGeometry == "Línea" 
                            ? {
                                "ID_PREDIO":g.id_predio, // por user
                                "ACOMPANIAN":g.acompaniante,
                                "OBSERVACIO":g.observaciones,
                                "FUNCIONARI":g.funcionario,
                                "LONGITUD":g.longitud,
                                "FIRMA":g.firma
                            }
                            :{}
                
            })
        });
        const dataToSend = {
            "proyecto":{
                "Nombre_Proyecto": nomProject,
                "IdUsuario":"123"
            },
            "type":"FeatureCollection",
            features
        }
        if (!navigator.onLine) {
            let dbLocal = JSON.parse(localStorage.getItem("dbLocal"))?JSON.parse(localStorage.getItem("dbLocal")):[]
            dbLocal.push(dataToSend);
            localStorage.setItem("dbLocal",JSON.stringify(dbLocal))
            const variant = "info" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Proyecto creado y almacenado localmente con exito',{variant});
            setNomProject('');
            setGeometriesCreated([]);
            setStore({...store, openBackop:false})
        }else{
            console.log("dataToSend => ", dataToSend);
            console.log(JSON.stringify(dataToSend));
            insertarProyectoGeometrias(dataToSend);
            
        }
    }
    const finalizar = async() => {
        console.log("finalizar");
        openBackDrop()
        const idProyecto = await traer_idProyecto(nomProject, login);
        console.log({idProyecto});

        console.log("navigator.onLine  => ", navigator.onLine );
        console.log("geometriesCreated => ", geometriesCreated);
        let puntos=[], lineas=[], poligonos=[];
        debugger
        geometriesCreated.forEach(g => { 
            if (g.typeGeometry == "Punto") {
                debugger
                const {norte,este} = getNorteEste(g.longitudPunto, g.latitudPunto);
                puntos.push(
                    {
                        "attributes": {
                            "ID_PROYECT": idProyecto?idProyecto:'isOffline',
                            "ID_PREDIO":g.id_predio,
                            "ACOMPANIAN":g.acompaniante,
                            "OBSERVACIO":g.observaciones,
                            "FUNCIONARI":g.funcionario,
                            "FIRMA":g.firma,
                            "FECHA_CAPTURA":fechaActual(),
                            "ID_PUNTO":g.id_punto,
                            "DESCRIPCIO": g.descripcion
                        },
                        "geometry": {
                            "x": norte,
                            // "x": g.latitudPunto,
                            // "x": 1.0274075,
                            // "x": 4597688.575,
                            "y": este,
                            // "y": g.longitudPunto,
                            // "y": -76.6150806,
                            // "y": 1671791.415,
                            
                            "spatialReference": {
                                // "wkid": 4326
                                "wkid": 9377,
                                "lateswkid": 4326 
                            }
                        }
                    }                        
                )
            } else if (g.typeGeometry == "Línea") {
                debugger
                const {norte:norteInicial, este:esteInicial} = getNorteEste(g.puntoInicial.longitud, g.puntoInicial.latitud);
                const {norte:norteFinal, este:esteFinal} = getNorteEste(g.puntoFinal.longitud, g.puntoFinal.latitud);
                lineas.push(                        
                    {
                        "attributes": {
                            "ID_PROYECT": idProyecto?idProyecto:'isOffline',
                            "ID_PREDIO": g.id_predio,
                            "ACOMPANIAN": g.acompaniante,
                            "OBSERVACIO": g.observaciones,
                            "FUNCIONARI": g.funcionario,
                            "FIRMA": g.firma,
                        //   "FECHA_CAPTURA": "2023-06-21",
                            "FECHA_CAPTURA": fechaActual(),
                            "LONGITUD": g.longitud
                        },
                        "geometry": {
                            "paths": [
                            [
                                [
                                    /* -76.6097141, // to testing
                                    1.0220083, */
                                    // g.puntoInicial.latitud,
                                    // g.puntoInicial.longitud
                                    norteInicial,
                                    esteInicial
                                ],
                                [
                                    /* -77.6097141, // to testing
                                    1.7220083, */
                                    // g.puntoFinal.latitud,
                                    // g.puntoFinal.longitud
                                    norteFinal,
                                    esteFinal
                                ]
                            ]
                            ],
                        //   "_path": 0,
                            "spatialReference": {
                                "wkid": 9377,
                                "lateswkid": 4326
                            }
                        }
                        }
                )
            } else if(g.typeGeometry == "Polígono") {
                debugger
                console.log(g.poligon);
                let poligon = [];
                g.poligon.forEach(e => { // convierte coordenas del poli a referencia nacional norte este
                    const {norte,este} = getNorteEste(e[0], e[1]);
                    poligon.push([norte,este])
                })
                poligonos.push(
                    [
                        {
                            "attributes": {
                                "ID_PROYECT": idProyecto?idProyecto:'isOffline',
                                "ID_PREDIO": g.id_predio,
                                "ACOMPANIAN": g.acompaniante,
                                "OBSERVACIO": g.observaciones,
                                "FUNCIONARI": g.funcionario,
                                "FIRMA": g.firma,
                                "FECHA_CAPTURA": fechaActual(),
                                "ID_INICIO": g.id_inicio,
                                "ID_FINAL": g.id_final,
                                "DESCRIPCIO": g.descripcion,
                                "AREA_M2": g.area_m2
                            },
                            "geometry": {
                                "rings": 
                                [
                                // g.poligon
                                poligon
                                /* 
                                    [
                                        [
                                            -76.6097141, // to testing
                                            1.0220083
                                        ],
                                        [
                                            -77.7097141, // to testing
                                            2.1220083
                                        ],
                                        [
                                            -79.8097141, // to testing
                                            2.5220083
                                        ],
                                        [
                                            -75.9097141, // to testing
                                            1.3220083
                                        ],
                                        [
                                            -80.0097141, // to testing
                                            3.4220083
                                        ],
                                        [
                                            -76.6097141, // to testing
                                            1.0220083
                                        ]
                                    ]
                                */
                                ]
                                ,
                                "_ring": 0,
                                "spatialReference": {
                                    "wkid": 9377,
                                    "lateswkid": 4326
                                }
                            }
                            }
                        ]
                    
                )
            }
        })

        if (!navigator.onLine) {
            debugger
            let dbLocal = JSON.parse(localStorage.getItem("dbLocal"))?JSON.parse(localStorage.getItem("dbLocal")):[]
            dbLocal.push({nomProject, puntos, lineas, poligonos});
            localStorage.setItem("dbLocal",JSON.stringify(dbLocal))
            const variant = "info" // variant could be success, error, warning, info, or default
            enqueueSnackbar('Proyecto creado y almacenado localmente con exito',{variant});
            setNomProject('');
            setGeometriesCreated([]);
        }else if(idProyecto){
            console.log("dataToSend => ", puntos, lineas, poligonos);
            // insertarProyectoGeometrias(dataToSend);
            const estadoProceso = await formarJsonToPersistir(puntos, lineas, poligonos);
            console.log({estadoProceso});
            setStore({...store, openBackop:false})
            const variant = "success" // variant could be success, error, warning, info, or default
            enqueueSnackbar(`El proyecto ${idProyecto} se creó de forma correcta`,{variant});       
        }else{
            msgFalloCOmunicacion();
        }
        if(idProyecto || !navigator.onLine) setStore({...store, openBackop:false, subMenuSelected:"", menuSelected: menu[2].nameMenu})     
    }

    const msgFalloCOmunicacion = () => {
        const variant = "warning" // variant could be success, error, warning, info, or default
        setStore({...store, openBackop:false})
        enqueueSnackbar('Problemas con la comunicación, porfavor intentalo mas tarde',{variant});
    }

    const insertarProyectoGeometrias = async(dataToSend) => {
        try {
            debugger
            const response = await insertProjecGeometry(JSON.stringify(dataToSend), enviroment.create);
            console.log({response});
            /* if (response.status == 0) {
                const variant = "warning" // variant could be success, error, warning, info, or default
                enqueueSnackbar(textosInfoWarnig.falloComunicacion,{variant});
            } else { */
                const variant = "success" // variant could be success, error, warning, info, or default
                enqueueSnackbar('Proyecto creado con exito',{variant});
                setNomProject('');
                setGeometriesCreated([]);
            // }
            setStore({...store, openBackop:false})
        } catch (error) {
            falloLaPeticion(error);
            setStore({...store, openBackop:false})
        }
    }

    const falloLaPeticion = (error) => {        
        console.error(error);
        openBackDrop();
        const variant = "error" // variant could be success, error, warning, info, or default
        enqueueSnackbar('Estamos presentando inconvenientes en la comunicación, porfavor intentalo mas tarde, gracias',{variant});
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

            <Modal_1 open={openModal} closeModal={closeModal} geometriaSelected={geometriaSelected}/>
            <ConfirmationDialog
                openConfirmationDialog={openConfirmationDialog}
                setOpenConfirmationDialog={setOpenConfirmationDialog}
                handleResponseConfirmation={handleResponseConfirmation}
                dialogContenText={ <DialogContenTextGeom geometriaSelected={geometriaSelected} /> }
            />


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
            
        </Box>
    )
}
