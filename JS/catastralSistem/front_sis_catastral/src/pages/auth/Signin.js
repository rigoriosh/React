import React, { useEffect, useState } from 'react'
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
import IconButton from '@mui/material/IconButton';

export const Signin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
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
        numeroContacto:{
            value:'',
            messageValidate:'',
            label:'Número de contacto'
        },
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
    });
    const [tiposDocumento, setTiposDocumento] = useState([
        {
            value: 'seleccione',
            label: 'Seleccione ...',
        },
        {
          value: 'cc',
          label: 'Cédula de ciudadania',
        },
        {
          value: 'ti',
          label: 'Tarjeta de identidad',
        },
        {
          value: 'ce',
          label: 'Cédula de extrangeria',
        },
        {
          value: 'pasport',
          label: 'Pasaporte',
        },
      ])
    const [showPass, setShowPass] = useState(false);
    const {nombre, apellido, tipoDocumento, numeroDocumento, /* departamento, municipio, */ direccionResidencia,
        /* numeroContacto, */ telefonoContacto, email, confirmaremail, pass, confPass} = form;

    useEffect(() => {
        // get Tipos documentos
        return () => {}
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


    const crearUsuario = async() => {
        if (validateForm()) {
            // TODO: ENVIAR AL BACK
            try {
                const url = 'https://api.themoviedb.org/3/movie/550?api_key=568f0c60273063c49307f18b57ce33fd';
                const response = await fetch(url);
                const respoJson = await response.json();
                console.log(respoJson);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const validateForm = () => {
debugger
        const formOk = false;
        const keysForm = Object.keys(form);
        keysForm.forEach(field => {
            
        });

        return formOk;
    }
    return (
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h1>Registrarse</h1>
            <div style={{display:'flex', flexDirection:'column', marginTop:'20px'}}>
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
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                    // type="number"
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
    )
}
