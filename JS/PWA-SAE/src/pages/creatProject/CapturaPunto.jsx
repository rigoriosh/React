import { Box, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';

export const CapturaPunto = ({setTipoGeometrias}) => {
  return (
    <Box
            component="form"
            sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '90%' },
            padding: '0px 10px',
            fontSize:'10px',
            backgroundColor:'orangered',
            gridTemplateColumns: { sm: '1fr 1fr' }, gap: 0.1,
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="Proyecto" label="Proyecto" variant="outlined" fullWidth size='small' margin='normal'/>
            <TextField id="ID_PREDIO" label="ID_PREDIO" color='success' variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="ACOMPANANTE" label="ACOMPANANTE" variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="DESCRIPCION" label="DESCRIPCION" variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="DESCRIPCION" label="DESCRIPCION" variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="FECHA_CAPTURA" label="FECHA_CAPTURA" variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="FUNCIONARIO_SAE" label="FUNCIONARIO_SAE" variant="outlined" fullWidth size='small' margin='dense'/>
            <TextField id="FIRMA" label="FIRMA" variant="outlined" fullWidth size='small' margin='dense'/>
            
        </Box>
  )
}
