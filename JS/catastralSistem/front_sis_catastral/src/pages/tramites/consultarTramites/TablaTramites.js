import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DataGrid } from '@mui/x-data-grid';
import { getInfoGET } from '../../../api';

import ConsultarTramite_Icon from '../../../assets/Iconos/ConsultarTramite_Icon.png'
import SeguimientoaTramite_Icon from '../../../assets/Iconos/SeguimientoaTramite_Icon.png'
// import { setTextPagTables } from '../../../helpers/utils';
import { useContext } from 'react';
import { StoreContext } from '../../../App';
import { FieldTextWidtLabel } from '../../../componets/FieldTextWidtLabel';
import enviroment from '../../../helpers/enviroment';



export const TablaTramites = ({getDetalleTramite, tipoTramite, registrosGetSolicitudesUsuario, getTramite, paginado, setPaginado, setRegistrosGetSolicitudesUsuario}) => {

    const { store, updateStore } = useContext(StoreContext);

    // eslint-disable-next-line no-unused-vars
    const [columnsTablaConsultarTramite, setColumnsTablaConsultarTramite] = useState(
        [
            { field: 'idSolicitud', headerName:'ID', hide:false, },
            { field: 'numeroRadicado', headerName:'N° de Solicitud',   flex:0.2,
                renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.numeroRadicado}</strong>
                }>
                    <p>{params.row.numeroRadicado}</p>
                </Tooltip>
                ),
             },
            { field: 'nombreTramite',  headerName:'Nombre Trámite',    flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.nombreTramite}</strong>
                }>
                    <p>{params.row.nombreTramite}</p>
                </Tooltip>
                ),
             },
            { field: 'tipoTramite',    headerName:'Tipo de Solicitud', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.tipoTramite}</strong>
                }>
                    <p>{params.row.tipoTramite}</p>
                </Tooltip>
                ),
             },
            { field: 'estado',         headerName:'Estado',            flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.estado}</strong>
                }>
                    <p>{params.row.estado}</p>
                </Tooltip>
                ),
             },
            {
                field: (tipoTramite === 'Consulta') ? 'Consultar' : 'Editar Solicitud',
                // type: 'actions',
                align:'center',
                width: 100,
                renderCell: ({row}) => [
                    <div style={{display:'flex', alignItems:'center'}}>
                        {
                            (tipoTramite === 'Consulta')
                            ?
                                <Tooltip title="Ver detalle del tramite">
                                    <CheckCircleIcon 
                                        onClick={()=>{getDetalleTramite(row)}}
                                        sx={{color:'green'}}
                                    />
                                </Tooltip>
                            : (tipoTramite === 'Seguimiento')
                                ?
                                    <Tooltip title="Editar Solicitud">
                                        <EditIcon 
                                            onClick={()=>{getDetalleTramite(row)}}
                                            sx={{color:'green'}}
                                        />
                                    </Tooltip>
                                : <h1>Other component</h1>
                        }
                        
                        
                    </div>
                ],
            },
        ]
    );

    const [page, setPage] = useState(0);
    const [paginaActual, setPaginaActual] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCountState, setRowCountState] = useState(paginado?.totalPaginas);
    const [consTraId, setConsTraId] = useState('');
    const [consultando, setConsultando] = useState(true);//controla el icono de lupa y limpiar consulta por Id

    useEffect(() => {
        
        const solicitudesSession = JSON.parse(sessionStorage.getItem('solicitudes'))
        // console.log("solicitudesSession => ", solicitudesSession)
        // console.log("registrosGetSolicitudesUsuario => ", solicitudesSession)
        if (solicitudesSession) {
            if (solicitudesSession.length < 2) {
                setConsultando(false);
                setConsTraId(solicitudesSession[0].idSolicitud)
            }
        }
      return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        
        /* console.log(`
            paginado        => ${JSON.stringify(paginado)}
            page            => ${page}
            pageSize        => ${pageSize}
            rowCountState   => ${rowCountState}

        `); */

        setRowCountState(paginado.totalRegistros);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [paginado, setRowCountState]);
    

      useEffect(() => {
        /* console.log("paginado => ", paginado)
        console.log("page => ", page)
        console.log("pageSize => ", pageSize)
        console.log("paginaActual => ", paginaActual)
        console.log(registrosGetSolicitudesUsuario) */

        if (page > paginaActual) {
            getTramite(page, pageSize);
            setPaginaActual(page);
        }
      return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginado, page])

    const consultaTramiteID = (e) => {
        // console.log(e);
        if (e==="query") {
            if (consTraId) {
                paso2ConsultaTramiteID(consTraId);
            }
        } else if (e==="noQuery") {
            setConsultando(true);
            setConsTraId('');
            setPaginaActual(0);
            // setRegistrosGetSolicitudesUsuario([]);
            getTramite(0,10,"nuevaConsulta");
        } else {
            e.preventDefault();
            if (consTraId) {
                paso2ConsultaTramiteID(consTraId)                
            }
        }
        // console.log("on submit", consTraId)
    }

    const paso2ConsultaTramiteID = async(consTraId) => {
        setConsultando(false);
        updateStore({...store, openBackDrop: true, llama:"L180FConsultarTramite"});
        let parametro2 = 'idSolicitud';
        let datoIn = consTraId;
        datoIn = datoIn.split('-')
        datoIn.includes('RASOGC')
        if(datoIn.includes('RASOGC'))parametro2='nRadicado';
        // console.log(parametro2);
        const headers = {token: store.user.token};
        const response = await getInfoGET(headers, enviroment.getSolicitudId+`/?idUsuario=${store.user.infoUser.idUsuario}&${parametro2}=${consTraId}`);
        
        const solicitudes = [...response.resultado.solicitudes];
        solicitudes.map((solicitud, item) => solicitud.id = item);
        setRegistrosGetSolicitudesUsuario(solicitudes);
        setPaginado(response.resultado.paginacion);
        updateStore({...store, openBackDrop: false,llama:"L364FConsultarTramite"});
        // console.log(response);
    }
    
    return (
        <div>
            
            <div className="row" style={{/* justifyContent:'space-evenly',  */margin:'5px 0 10px 0', alignItems:'center', marginLeft:'10pxC'}}>
                <form onSubmit={consultaTramiteID} style={{display:'flex', marginRight:'10%'}}>
                    <FieldTextWidtLabel
                        label={'Consultar Trámite por ID'}
                        value={consTraId} 
                        name={"consTraId"}
                        // messageValidate={tipoTramite.validation}
                        // required={true}
                        handleChange={({value})=>{
                            setConsTraId(value.trim());
                            setConsultando(true)
                        }}
                        type="text"
                        whitIconRight={false}
                        disabled={false}
                    />
                    {
                        consultando 
                        ? <IconButton onClick={()=>consultaTramiteID("query")} color="success" aria-label="upload picture" component="label">
                            {/* <input hidden accept="image/*" type="file" /> */}
                            <SearchIcon />
                        </IconButton>
                        : <IconButton onClick={()=>consultaTramiteID("noQuery")} color="success" aria-label="upload picture" component="label">
                            {/* <input hidden accept="image/*" type="file" /> */}
                            <CleaningServicesIcon />
                        </IconButton>
                    }
                    
                </form>
                <img src={tipoTramite === 'Consulta'?ConsultarTramite_Icon:SeguimientoaTramite_Icon} className="bgc1" alt="" srcSet="" style={{width:'50px', borderRadius:'20px', padding:'5px'}}/>
                <p className="color2" style={{fontSize:'35px', marginLeft:'10px'}}>{tipoTramite === 'Seguimiento'?'Seguimiento a Trámite':'Consultar Trámite'}</p>
            </div>
               
            
            <DataGrid
                // key={"TablaTramites"}
                rows={registrosGetSolicitudesUsuario}
                rowCount={rowCountState}
                pageSize={pageSize}
                rowsPerPageOptions={[10 ]}
                // loading={isLoading}
                pagination
                page={page}
                // paginationMode="server"
                onPageChange={(newPage) => {
                    // console.log("onPageChange => ", newPage);
                    setPage(newPage)
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                columns={columnsTablaConsultarTramite}
                // initialState={initialState}

                density="compact"
                autoHeight
                // hideFooter={false}
                // hideFooterSelectedRowCount
                // pageSizeOptions
                // scrollbarSize={10}
                // loading={registrosGetSolicitudesUsuario.length <= 0}
                key={Math.random()}
            />
        </div>
    )
}
