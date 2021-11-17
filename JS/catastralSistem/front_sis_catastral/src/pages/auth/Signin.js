import React, { useContext, useEffect, useState } from 'react'
import { /* useParams, */ useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

import IconButton from '@mui/material/IconButton';
import enviroment from '../../helpers/enviroment';
import { getInfo, getInfoGET } from '../../api';
import { StoreContext } from '../../App';
import { pwdEncripted, textosInfoWarnig } from '../../helpers/utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const Signin = () => {
    const {store, updateStore} = useContext(StoreContext);
    const navigate = useNavigate();
    const initForm = {
        nombre:{
            value:'',
            messageValidate:'',
            label:'Nombre'
        },
        apellido:{
            value:'',
            messageValidate:'',
            label:'Apellido'
        },
        tipoDocumento:{
            value:'seleccione',
            messageValidate:'',
            label:'Tipo de documento'
        },
        numeroDocumento:{
            value:'',
            messageValidate:'',
            label:'Numero de documento'
        },
        departamento:{
            value:'',
            messageValidate:'',
            label:'Departamento'
        },
        municipio:{
            value:'',
            messageValidate:'',
            label:'Municipio'
        },
        direccionResidencia:{
            value:'',
            messageValidate:'',
            label:'Dirección de residencia'
        },
        // numeroContacto:{
        //     value:'',
        //     messageValidate:'',
        //     label:'Número de contacto'
        // },
        telefonoContacto:{
            value:'',
            messageValidate:'',
            label:'Teléfono de contacto'
        },
        email:{
            value:'',
            messageValidate:'',
            label:'email'
        },
        confirmaremail:{
            value:'',
            messageValidate:'',
            label:'Confirmar email'
        },
        pass:{
            value:'',
            messageValidate:'',
            label:'Contraseña'
        },
        confPass:{
            value:'',
            messageValidate:'',
            label:'Confirmar contraseña'
        }
    }
    const [form, setForm] = useState(initForm);
    const [tiposDocumento, setTiposDocumento] = useState([
        {
            descripcionValor: 'Seleccione ...',
            idValorLista: 1,
            valor: 'seleccione',
            nombreLista: 'seleccione'
        },
        {
            descripcionValor: 'Cedula de ciudadanía',
            idValorLista: 1,
            valor: 'CC',
            nombreLista: 'TIPO_DOCUMENTO'
        },
        {
            descripcionValor: 'Cédula de extranjería',
            idValorLista: 6,
            valor: 'CE',
            nombreLista: 'TIPO_DOCUMENTO'
        },
        {
            descripcionValor: 'Pasaporte',
            idValorLista: 7,
            valor: 'PA',
            nombreLista: 'TIPO_DOCUMENTO'
        },
      ])
    const [showPass, setShowPass] = useState(false);
    const {nombre, apellido, tipoDocumento, numeroDocumento, /* departamento, municipio, */ direccionResidencia,
        /* numeroContacto, */ telefonoContacto, email, confirmaremail, pass, confPass} = form;
    const [openDialog, setOpenDialog] = useState({open:false, msg :'',tittle:''});
    useEffect(() => {
        // get Tipos documentos
        if (store.tiposDocumento.length === 0) {
            getTiposDocumento();
        } else {
            setTiposDocumento(store.tiposDocumento);
        }
        return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleFormChange = ({target:{name, value}}) => {
        console.log(name, value)
        if ((name === 'numeroDocumento' && value.length < 11)
            || (name !== 'numeroDocumento' && name !== 'telefonoContacto' && value.length < 30)
            || (name === 'telefonoContacto' && value.length < 15) 
        ) {
            setForm({...form, [name]:{value, messageValidate:'', label: form[name].label}})
        }
    }

    const getTiposDocumento = async() => {
        const token = '';
        const headers = {token, /* nombreDominio:'TIPO_DOCUMENTO' */};
        const getTiposDocumento = await getInfoGET(headers, enviroment.getTiposDocumento)
        // let getTiposDocumento = {"resultado":{"dominios":[{"descripcionValor":"Cedula de ciudadanía","idValorLista":1,"valor":"CC","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Cédula de extranjería","idValorLista":6,"valor":"CE","nombreLista":"TIPO_DOCUMENTO"},{"descripcionValor":"Pasaporte","idValorLista":7,"valor":"PA","nombreLista":"TIPO_DOCUMENTO"}]}}
        if (!getTiposDocumento.resultado) {
            updateStore({
                ...store,
                snackBar:{
                    openSnackBar: true,
                    messageSnackBar:textosInfoWarnig.falloComunicacion,
                    severity: 'error'
                  },
            });
        } else {
            // ajusta tipos de documentos a ser renderizados
            const tiposDocumento = [
                {
                    descripcionValor: 'Seleccione ...',
                    idValorLista: 1,
                    valor: 'seleccione',
                    nombreLista: 'seleccione'
                }
            ];
            getTiposDocumento.resultado.dominios.forEach(dominio => {
                tiposDocumento.push(dominio);
            });
            setTiposDocumento(tiposDocumento);
            updateStore({ ...store, tiposDocumento, });
        }
    }


    const crearUsuario = async() => {
        if (validateForm()) {
            updateStore({ ...store, openBackDrop:true, });
            const token = '';
            const headers = {token, 'Content-Type': 'application/json'};
            const body = {
                "nombreUsuario": form.numeroDocumento.value,
                "nombre": form.nombre.value,
                "apellido": form.apellido.value,
                "tipoDocumento": form.tipoDocumento.value,
                "numeroDocumento": form.numeroDocumento.value,
                "numeroCelular": form.telefonoContacto.value,
                "contrasena": pwdEncripted(form.pass.value),
                "email": form.email.value,
                "roles": [
                    {
                        "idRol": 2
                    }
                ],
                "tipoUsuario": "E"
            }
            // const body = `nombreUsuario=${form.numeroDocumento.value}&nombre=${form.nombre.value}&apellido=${form.apellido.value}&tipoDocumento=${form.tipoDocumento.value}&numeroDocumento=${form.numeroDocumento.value}&numeroCelular=${form.telefonoContacto.value}&contrasena=${form.pass.value}&email=${form.email.value}&tipoUsuario:"E"&roles:[{"idRol": 2}]`;
            const crearUsuarioExterno = await getInfo(headers, enviroment.crearUsuarioExterno, 'POST', JSON.stringify(body))
            // const crearUsuarioExterno = {resultado:{mensaje:'ok creado'}}
            if (!crearUsuarioExterno.resultado) {
                updateStore({
                    ...store,
                    snackBar:{
                        openSnackBar: true,
                        messageSnackBar: crearUsuarioExterno.error 
                        ? crearUsuarioExterno.error.descripcion
                            ?  crearUsuarioExterno.error.descripcion
                            : crearUsuarioExterno.error
                        : textosInfoWarnig.falloComunicacion,
                        severity: 'error'
                      },
                    openBackDrop:false,
                });
            } else {
                updateStore({ ...store, snackBar:{
                    openSnackBar: true,
                    messageSnackBar:crearUsuarioExterno.resultado.mensaje,
                    severity: 'success'
                }, openBackDrop:false, });
                setOpenDialog({open:true, msg :`El usuario ha sido creado exitosamente.`, tittle:''})
            }
        }
    }

    const validateForm = () => {
        const formOk = true;
        const keysForm = Object.keys(form);
        keysForm.forEach(field => {
            if (form) {
                
            } else {
                
            }
        });

        return formOk;
    }
    return (
        <div style={{display:'flex', alignItems:'center', flexDirection:'column', backgroundColor:'white', width:'50%', margin: '20px 0 20px 25%',
                    borderRadius:'20px', padding:'10px 0', height:'92vh'}}>
            <div style={{height:'100%', overflowY:'scroll'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <TextField
                        fullWidth
                        required
                        id="nombre"
                        label={nombre.label}
                        error={nombre.messageValidate?true:false}
                        name="nombre"
                        // defaultValue="Hello World"
                        value={nombre.value}
                        onChange={handleFormChange}
                        size="small"
                        // margin="dense"
                        variant="outlined"
                    />
                    {
                        nombre.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{nombre.messageValidate}</Alert>
                    }
                    <TextField
                        fullWidth
                        required
                        id="apellido"
                        label={apellido.label}
                        error={apellido.messageValidate?true:false}
                        name="apellido"
                        // defaultValue="Hello World"
                        value={apellido.value}
                        onChange={handleFormChange}
                        size="small"
                        margin="dense"
                    />
                    {
                        apellido.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{apellido.messageValidate}</Alert>
                    }
                    <div style={{display:'flex'}}>
                        <div>
                            <TextField
                                fullWidth
                                required
                                id="tipoDocumento"
                                label={tipoDocumento.label}
                                error={tipoDocumento.messageValidate?true:false}
                                name="tipoDocumento"
                                // defaultValue="Hello World"
                                value={tipoDocumento.value}
                                onChange={handleFormChange}
                                size="small"
                                select
                                // helperText="Seleccione tipo de documento"
                                margin="dense"
                            >
                                {tiposDocumento.map((option) => (
                                    <MenuItem key={option.valor} value={option.valor}>
                                    {option.descripcionValor}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {
                                tipoDocumento.messageValidate && 
                                    <Alert severity="error" sx={{
                                        //   bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        //   borderRadius: 1,
                                        p: '0 20px',
                                        minWidth: 300,
                                        fontSize:'12px'
                                        }}>{tipoDocumento.messageValidate}</Alert>
                            }

                        </div>
                        <TextField
                            fullWidth
                            required
                            id="numeroDocumento"
                            label={numeroDocumento.label}
                            error={numeroDocumento.messageValidate?true:false}
                            name="numeroDocumento"
                            type="number"
                            max="10"
                            // defaultValue="Hello World"
                            value={numeroDocumento.value}
                            onChange={handleFormChange}
                            size="small"
                            margin="dense"
                        />
                        {
                        numeroDocumento.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{numeroDocumento.messageValidate}</Alert>
                    }
                    </div>
                    <TextField
                        fullWidth
                        required
                        id="direccionResidencia"
                        label={direccionResidencia.label}
                        error={direccionResidencia.messageValidate?true:false}
                        name="direccionResidencia"
                        // defaultValue="Hello World"
                        value={direccionResidencia.value}
                        onChange={handleFormChange}
                        size="small"
                        margin="dense"
                    />
                    {
                        direccionResidencia.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{direccionResidencia.messageValidate}</Alert>
                    }
                    
                    <TextField
                        fullWidth
                        required
                        id="telefonoContacto"
                        label={telefonoContacto.label}
                        error={telefonoContacto.messageValidate?true:false}
                        name="telefonoContacto"
                        // defaultValue="Hello World"
                        value={telefonoContacto.value}
                        onChange={handleFormChange}
                        size="small"
                        margin="dense"
                        type="number"
                    />
                    {
                        telefonoContacto.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{telefonoContacto.messageValidate}</Alert>
                    }
                    <TextField
                        fullWidth
                        required
                        id="email"
                        label={email.label}
                        error={email.messageValidate?true:false}
                        name="email"
                        // defaultValue="Hello World"
                        value={email.value}
                        onChange={handleFormChange}
                        size="small"
                        margin="dense"
                    />
                    {
                        email.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{email.messageValidate}</Alert>
                    }
                    <TextField
                        fullWidth
                        required
                        id="confirmaremail"
                        label={confirmaremail.label}
                        error={confirmaremail.messageValidate?true:false}
                        name="confirmaremail"
                        // defaultValue="Hello World"
                        value={confirmaremail.value}
                        onChange={handleFormChange}
                        size="small"
                        margin="dense"
                    />
                    {
                        confirmaremail.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{confirmaremail.messageValidate}</Alert>
                    }
                    <FormControl sx={{ p:'10px 0'  }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{pass.label}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPass ? 'text' :'password'}
                            value={pass.value}
                            onChange={handleFormChange}
                            error={pass.messageValidate?true:false}
                            name="pass"
                            // label={pass.label}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>setShowPass(!showPass)}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                        </FormControl>
                    {
                        pass.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{pass.messageValidate}</Alert>
                    }
                    <FormControl sx={{  }} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment">{confPass.label}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            type={showPass ? 'text' :'password'}
                            value={confPass.value}
                            onChange={handleFormChange}
                            error={confPass.messageValidate?true:false}
                            name="confPass"
                            // label={confPass.label}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>setShowPass(!showPass)}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                        </FormControl>
                    {
                        confPass.messageValidate && 
                            <Alert severity="error" sx={{
                                //   bgcolor: 'background.paper',
                                boxShadow: 1,
                                //   borderRadius: 1,
                                p: '0 20px',
                                minWidth: 300,
                                fontSize:'12px'
                                }}>{confPass.messageValidate}</Alert>
                    }
                </div>
                <div style={{display:'flex', width:'50%', justifyContent:'space-around', marginTop:'20px'}}>
                    <button onClick={()=>crearUsuario()}>Crear</button>
                    <button onClick={()=>{navigate("/");}}>Cancelar</button>
                </div>
            </div>
            <Dialog
                open={openDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDialog({...openDialog, open:false})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{openDialog.tittle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>{openDialog.msg}</p>
                        <p style={{textAlign:'center',marginTop:'20px', fontWeight:'bold'}}>{`Usuario: ${numeroDocumento.value}`}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        setOpenDialog({...openDialog, open:false});
                        setForm(initForm);
                        navigate("/");
                        }}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
