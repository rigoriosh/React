import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import ConsultarTramite_Icon from '../../../assets/Iconos/ConsultarTramite_Icon.png'
import SeguimientoaTramite_Icon from '../../../assets/Iconos/SeguimientoaTramite_Icon.png'



export const TablaTramites = ({getDetalleTramite, tipoTramite, registrosGetSolicitudesUsuario}) => {


    // eslint-disable-next-line no-unused-vars
    const [columnsTablaConsultarTramite, setColumnsTablaConsultarTramite] = useState(
        [
            // { field: 'id', headerName:'ID', hide:true, },
            { field: 'numeroRadicado', headerName:'N° de Solicitud',   flex:0.2, },
            { field: 'nombreTramite',  headerName:'Nombre Trámite',    flex:0.2, },
            { field: 'tipoTramite',    headerName:'Tipo de Solicitud', flex:0.2, },
            { field: 'estado',         headerName:'Estado',            flex:0.2, },
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

    return (
        <div>
            {
                (tipoTramite === 'Consulta')
                ?
                    <div className="row" style={{justifyContent:'center', margin:'5px 0 10px 0', alignItems:'center'}}>
                        <img src={ConsultarTramite_Icon} className="bgc1" alt="" srcSet="" style={{width:'50px', borderRadius:'20px', padding:'5px'}}/>
                        <p className="color2" style={{fontSize:'35px', marginLeft:'10px'}}>Consultar Trámite</p>
                    </div>
                : (tipoTramite === 'Seguimiento')
                    ?
                        <div className="row" style={{justifyContent:'center', margin:'5px 0 10px 0', alignItems:'center'}}>
                            <img src={SeguimientoaTramite_Icon} className="bgc1" alt="" srcSet="" style={{width:'50px', borderRadius:'20px', padding:'5px'}}/>
                            <p className="color2" style={{fontSize:'35px', marginLeft:'10px'}}>Seguimiento a Trámite</p>
                        </div>
                    : <h1>Other component</h1>
            }
            <DataGrid
                columns={columnsTablaConsultarTramite}
                rows={registrosGetSolicitudesUsuario}
                autoHeight
                density="compact"
                hideFooter={false}
                hideFooterSelectedRowCount
                pageSize={10}
                pageSizeOptions
                // scrollbarSize={10}
                loading={registrosGetSolicitudesUsuario.length <= 0}
                // rowsPerPageOptions={titularesDeDerecho.length}
                key={Math.random()}
            />
        </div>
    )
}
