
import Icon from '@material-ui/core/Icon';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Button from '@material-ui/core/Button';
import '../../css/cargueCuadroDeAreas.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mostrarMensaje } from '../../Redux-actions/alertasMensajes_action';


const nombresColumnas = ["Tipo de Inmueble", "Nomenclatura", "Interior", "Etapa", "Area Mt2"];

export const CargueCuadroDeAreas = ({history}) => {

    const dispatch = useDispatch();
    
    const [data, setData] = useState({
        cols: [],
        rows: []
      });


    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        
        console.log(event);
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
              const validaciones = validarNombreDeColumnas(resp.rows[0]);
              if (!validaciones) {
                  //Generar mensaje de error
                  dispatch(mostrarMensaje('warning', `El nombre de las columnas no cumple con el formato`));
                  history.replace(history.location.pathname);
              }else{
                  resp.rows[0].unshift('No Registro');
                  resp.cols.unshift({name: 'No Registro', key: 0});
                  const updateCols = resp.cols.map((e,i) => {
                      return {
                          key: i,
                          name: resp.rows[0][i]
                      }
                  })
                  console.log(updateCols);
                  const updateRows = resp.rows.slice(1, resp.rows.length);
                  setData({
                    cols: updateCols,
                    rows: updateRows
                  });
              }              
          }
        });               
        
      }

      const validarNombreDeColumnas = (columnsNames) => {
          let estadoValidacion = true;
          columnsNames.forEach(nombreCol => {
              if(!nombresColumnas.includes(nombreCol)){
                  estadoValidacion = nombresColumnas.includes(nombreCol)
              }
          });
          return estadoValidacion
      }

    return (
        <>
            <h3 id="idCuadroDeAreas" className="no-margen-inferior animate__animated animate__bounce texto-centrado">Cargue cuadro de áreas</h3>
           

            <input
                style={{display: 'none'}}
                accept=".xls, .xlsx"                
                id="contained-button-file"
                multiple
                type="file"
                
                onChange={(e)=>fileHandler(e)}
            />
            <label htmlFor="contained-button-file" >
                <Button variant="contained"  component="span" className="boton mt-10">
                    <Icon>add_circle</Icon> Examinar
                </Button>
            </label>

            <OutTable data={data.rows} columns={data.cols} tableClassName="tableSimple" tableHeaderRowClass="heading" />
        </>
        
    )
}
