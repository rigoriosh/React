import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import GestiondeUS_Eliminar_Icon from '../../../assets/Iconos/GestiondeUS_Eliminar_Icon.png'
import GestiondeUS_NOHabilitado_Icon from '../../../assets/Iconos/GestiondeUS_NOHabilitado_Icon.png'
import GestiondeUS_Habilitado_Icon from '../../../assets/Iconos/GestiondeUS_Habilitado_Icon.png'
import { StoreContext } from '../../../App';
import { getInfoGET } from '../../../api';
import enviroment from '../../../helpers/enviroment';
import { textosInfoWarnig } from '../../../helpers/utils';




export const GestionarUsuarios = () => {

    const { store, updateStore } = useContext(StoreContext);
    const {dialogTool} = store;
    const [deleteUser, setDeleteUser] = useState(false);

    const [columns, setColumns] = useState([
        { field: 'nombre', headerName:'Nombres', flex:0.2, },
        { field: 'apellido', headerName:'Apellidos', flex:0.2, },
        { field: 'nombreUsuario', headerName: 'Usuario', flex:0.2, },
        {
            field: 'Habilitar',
            // type: 'actions',
            align:'center',
            width: 70,
            renderCell: ({row}) => [
                <img onClick={()=>{abilitarDesabilitarUsuario(row)}} className="imgWidth" src={row.estado === "A" ? GestiondeUS_Habilitado_Icon : GestiondeUS_NOHabilitado_Icon} alt="" style={{width:'15px', cursor:'pointer'}}/>
            ],
        },
        {
            field: 'Eliminar',
            align:'center',
            width: 70,
            renderCell: ({row}) => [
                <img onClick={()=>{setDeleteUser(true); eliminarUsuario(row); }} className="imgWidth" src={GestiondeUS_Eliminar_Icon} alt="" style={{width:'15px', cursor:'pointer'}}/>
            ],
        },
    ]);
    const [rows, setRows] = useState([
        // {
        //     id: 0,
        //     nombre: 'Damien',
        //     apellido: '25apellido',
        //     nombreUsuario: 'user123',
        //     estado: "A",
        //   },
        // {
        //     id: 1,
        //     nombre: 'Nicolas',
        //     apellido: '36apellido',
        //     nombreUsuario: 'user123',
        //     estado: "A",
        // },
        // {
        //     id: 2,
        //     nombre: 'Kate',
        //     apellido: '19apellido',
        //     nombreUsuario: 'user123',
        //     estado: "D",
        // },
    ]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

    const abilitarDesabilitarUsuario = async(row) => {
        console.log(row);
        updateStore({ ...store, openBackDrop: true });
        try {
            const headers = {token: store.user.token, estado:row.estado === "A" ? "D" : "I"};
            const response = await getInfoGET(headers, enviroment.disableUser + row.idUsusario, 'POST');
            if (response.resultado.mensaje.includes("exitosamente")) {
                setRows([])
                consultarUsuarios();
                updateStore({
                    ...store,
                    snackBar:{ openSnackBar:true, messageSnackBar: row.estado === "A" ? "El usuario ha sido deshabilitado ! " : "El usuario ha sido habilitado !", severity:'success', },
                });
            }
        } catch (error) {
            falloLaPeticion();
        }
    }
    const eliminarUsuario = async(row=usuarioSeleccionado, elimnar=false ) => {
        if (!elimnar) {
            setUsuarioSeleccionado(row);
            updateStore({...store, dialogTool:{open:true, msg: textosInfoWarnig.elimnarUsuario, tittle:'Confirmación', response:false}})
        } else if(deleteUser){
            setDeleteUser(false);
            updateStore({ ...store, openBackDrop: true, dialogTool:{open:false, msg :'',tittle:'', response:false} });
            const headers = {token: store.user.token };
            try {
                const response = await getInfoGET(headers, enviroment.deleteUser + usuarioSeleccionado.idUsusario, 'DELETE');
                if (response.resultado.mensaje.includes("exitosamente")) {
                    setRows([])
                    consultarUsuarios();
                    updateStore({
                        ...store,
                        snackBar:{ openSnackBar:true, messageSnackBar: response.resultado.mensaje, severity:'success', },
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
            dialogTool:{open:false, msg :'',tittle:'', response:false}
        });
    }

    const consultarUsuarios = async() => {
        try {
            updateStore({ ...store, openBackDrop: true });
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
                            ...user
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
                openBackDrop:false,
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
                dialogTool:{open:false, msg :'',tittle:'', response:false}
            });
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogTool])

    useEffect(() => {
        updateStore({ ...store, openBackDrop: true });
        consultarUsuarios();
        return () => {
            updateStore({ ...store, dialogTool:{open:false, msg :'',tittle:'', response:false}, });
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
