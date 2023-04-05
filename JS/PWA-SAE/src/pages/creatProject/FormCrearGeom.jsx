import { Box, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { menu, tiposGeometrias } from '../../helpers/constantes'
import { StoreContext } from '../../App';

export const FormCrearGeom = (/* {changeView} */) => {
    const { store, setStore } = useContext(StoreContext);
    const {menuSelected, subMenuSelected}=store;

    const controlVistas = (subMenu) => {
        // changeView(subMenu);
        // setStore({...store, menuSelected: vista})
        setStore({...store, subMenuSelected:subMenu})
    }

    useEffect(() => {
      console.log("FormCrearGeom");
    
      return () => {}
    }, [])
    
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
        </Box>
    )
}
