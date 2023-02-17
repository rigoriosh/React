import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';

// import GestiondeUS_Eliminar_Icon from '../../../assets/Iconos/GestiondeUS_Eliminar_Icon.png'
import GestiondeUS_NOHabilitado_Icon from '../../../assets/Iconos/GestiondeUS_NOHabilitado_Icon.png'
import GestiondeUS_Habilitado_Icon from '../../../assets/Iconos/GestiondeUS_Habilitado_Icon.png'
import { StoreContext } from '../../../App';
import { getInfoGET } from '../../../api';
import enviroment from '../../../helpers/enviroment';
import { textosInfoWarnig } from '../../../helpers/utils';
import { Tooltip } from '@mui/material';




export const GestionarUsuarios = () => {

    const { store, updateStore } = useContext(StoreContext);
    const {dialogTool} = store;
    const [deleteUser, setDeleteUser] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [columns, setColumns] = useState([
        { field: 'id', headerName:'ID', hide:true, },
        { field: 'nombre', headerName:'Nombres', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={
                    <strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.nombre}</strong>
                }>
                    <p>{params.row.nombre}</p>
                </Tooltip>
            )
        },
        { field: 'apellido', headerName:'Apellidos', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.apellido}</strong>}>
                    <p>{params.row.apellido}</p>
                </Tooltip>
            )
        },
        { field: 'nombreUsuario', headerName: 'Usuario', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.nombreUsuario}</strong>}>
                    <p>{params.row.nombreUsuario}</p>
                </Tooltip>
            )
        },
        { field: 'tipoUsuario', headerName: 'Tipo de usuario', flex:0.2,
            renderCell: (params) => (
                <Tooltip title={<strong style={{fontSize:"12px", lineHeight:'10px'}}>{params.row.tipoUsuario}</strong>}>
                    <p>{params.row.tipoUsuario}</p>
                </Tooltip>
            )
        },
        {
            field: 'Habilitar',
            // type: 'actions',
            align:'center',
            flex:0.2,
            renderCell: ({row}) => [
                <img onClick={()=>{abilitarDesabilitarUsuario(row)}} className="imgWidth" src={row.estado === "A" ? GestiondeUS_Habilitado_Icon : GestiondeUS_NOHabilitado_Icon} alt="" style={{width:'15px', cursor:'pointer'}}/>
            ],
        },
        /* {
            field: 'Eliminar',
            align:'center',
            flex:0.2,
            renderCell: ({row}) => [
                <img onClick={()=>{
                    setDeleteUser(true);
                    eliminarUsuario(row);
                }} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'15px', cursor:'pointer'}}/>
            ],
        }, */
    ]);
    const [rows, setRows] = useState([
        /* {
            id: 0,
            tipoUsuario:'Interno',
            nombre: 'Damien',
            apellido: '25apellido',
            nombreUsuario: 'user123',
            estado: "A",
          },
        {
            id: 1,
            tipoUsuario:'Externo',
            nombre: 'Nicolas',
            apellido: '36apellido',
            nombreUsuario: 'user123',
            estado: "A",
        },
        {
            id: 2,
            tipoUsuario:'Interno',
            nombre: 'Kate',
            apellido: '19apellido',
            nombreUsuario: 'user123',
            estado: "D",
        }, */
    ]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

    const abilitarDesabilitarUsuario = async(row) => {
        updateStore({ ...store, openBackDrop: true, llama:"L105FGestionarUsuarios" });
        try {
            const headers = {token: store.user.token, estado:row.estado === "A" ? "I" : "A"};
            const response = await getInfoGET(headers, enviroment.disableUser + row.idUsuario, 'POST');
            if (response.resultado.mensaje.includes("exitosamente")) {
                setRows([])
                consultarUsuarios();
                updateStore({
                    ...store,
                    snackBar:{ openSnackBar:true, messageSnackBar: row.estado === "A" ? "El usuario ha sido deshabilitado ! " : "El usuario ha sido habilitado !", severity:'success', }
                    , llama:"L112FGestionarUsuarios"
                });
            }
        } catch (error) {
            falloLaPeticion();
        }
    }
    const eliminarUsuario = async(row=usuarioSeleccionado, elimnar=false ) => {
        if (!elimnar) {
            setUsuarioSeleccionado(row);
            updateStore({
                ...store,
                openBackDrop:false,
                dialogTool:{
                    open:true,
                    msg: textosInfoWarnig.elimnarUsuario,
                    tittle:'Confirmación',
                    response:false,
                    actions:true
                },
                snackBar:{
                    openSnackBar: false,
                    messageSnackBar:'',
                    tiempoExpiracion:'',
                    severity: "success"/*  | "error" | "warning" | "info" */,
                }, llama:"L125FGestionarUsuarios"
            })
        } else if(deleteUser){
            setDeleteUser(false);
            updateStore({ ...store, openBackDrop: true, dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L144FGestionarUsuarios" });
            const headers = {token: store.user.token };
            try {
                const response = await getInfoGET(headers, enviroment.deleteUser + usuarioSeleccionado.idUsuario, 'DELETE');
                if (response.resultado.mensaje.includes("exitosamente")) {
                    setRows([])
                    consultarUsuarios();
                    updateStore({
                        ...store,
                        snackBar:{ openSnackBar:true, messageSnackBar: response.resultado.mensaje, severity:'success', }, llama:"L151FGestionarUsuarios"
                    });
                }
            } catch (error) {
                falloLaPeticion();
            }
        }
    }

    const falloLaPeticion = () => {
        updateStore({
            ...store,
            snackBar:{ openSnackBar:true, messageSnackBar:textosInfoWarnig.falloComunicacion, severity:'warning', },
            dialogTool:{open:false, msg :'',tittle:'', response:false},
            openBackDrop:false, llama:"L163FGestionarUsuarios"
        });
    }

    const consultarUsuarios = async() => {
        try {
            updateStore({ ...store, openBackDrop: true, llama:"L173FGestionarUsuarios" });
            const headers = {token: store.user.token};
            const response = await getInfoGET(headers, enviroment.getUsers, 'GET');
            let messageSnackBar = '', severity = 'warning', openSnackBar = false;
            const rows = [];
            if (response.resultado) {
                // ajusta la data response para renderizar en la tabla
                const users = response.resultado.users;
                users.forEach((user, item) => {
                    rows.push(
                        {
                            id:item,
                            ...user,
                            tipoUsuario: user.tipoUsuario === 'I' ? 'Interno' : 'Externo'
                        }
                    )
                });
            } else {
                messageSnackBar = textosInfoWarnig.falloComunicacion;
                openSnackBar= true;
            }
            updateStore({
                ...store,
                snackBar:{ openSnackBar, messageSnackBar, severity, },
                openBackDrop:false, llama:"L194FGestionarUsuarios"
            });
            setRows(rows)
        } catch (error) {
            falloLaPeticion()
        }
    }

    useEffect(() => {
        if (dialogTool.response) {
            eliminarUsuario(usuarioSeleccionado, true);
            updateStore({
                ...store,
                dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L208FGestionarUsuarios"
            });
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogTool])

    useEffect(() => {
        updateStore({ ...store, openBackDrop: true, llama:"L218FGestionarUsuarios" });
        consultarUsuarios();
        return () => {
            updateStore({ ...store, dialogTool:{open:false, msg :'',tittle:'', response:false}, llama:"L221FGestionarUsuarios"});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <div style={{ height: 300, width: '100%', marginTop:'15px' }}>
            <DataGrid
             columns={columns}
             rows={rows}
             autoHeight
             density="compact"
             hideFooter={false}
             hideFooterSelectedRowCount
             pageSize={6}
             scrollbarSize={10}
             loading={rows.length <= 0}
            />
        </div>
    )
}
