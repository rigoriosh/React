import { InputLabel, TextField } from '@mui/material'

export const NameProject = ({label, setField, value}) => {
  return (
    <div style={{marginTop:'20px'}}>
        <InputLabel htmlFor="usuario" style={{fontWeight:'bold'}}>{label}</InputLabel>
        <TextField id="Proyecto" onChange={({target})=>setField(target.value.trim())} label="" 
            variant="outlined" value={value} fullWidth size='small' margin='none' style={{marginBottom:'10px'}}
        />
    </div>
  )
}
