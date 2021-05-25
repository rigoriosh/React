
import Icon from '@material-ui/core/Icon';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Button from '@material-ui/core/Button';
import '../../css/cargueCuadroDeAreas.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mostrarMensaje } from '../../Redux-actions/alertasMensajes_action';
import DataTable from "../../components/DataTable";


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

              const validaciones = validacionesIniciales(resp.rows);
              if (!!validaciones) {
                  //Generar mensaje de error
                  dispatch(mostrarMensaje('warning', `${validaciones}`));
                  history.replace(history.location.pathname);
              }else{
                  //resp.rows[0].unshift('No Registro');
                  //resp.cols.unshift({name: 'No Registro', key: 0});
                  const updateCols = resp.rows[0].map((e,i) => {
                      return {
                          field: e.split(' ').join(''), 
                          headerName: e,
                          width: e.length * 20
                        }
                  })                  
                  const namesCols = updateCols.map(nc => (nc.field));
                  const updateRows = resp.rows.slice(1, resp.rows.length);
                  const filasTemporales = [];
                  updateRows.forEach((fila,itemFila)=>{
                        const objTemp = {id: itemFila};
                        fila.forEach((campoFila,itemCampoFila)=>{
                            objTemp[namesCols[itemCampoFila]] = campoFila;
                        })
                        filasTemporales.push(objTemp)
                  });
                  setData({
                    cols: updateCols,
                    rows: filasTemporales
                  });
              }              
          }
        });               
        
      }
      
      const validacionesIniciales = (registros)=>{
            let eco = validarNombreDeColumnas(registros[0]);
            if(!!eco)  return eco 
            eco = validarRegistros(registros.slice(1, registros.length))
            if(!!eco) {
                return eco;
            }
            return null
      }
      const validarNombreDeColumnas = (columnsNames) => {
          let estadoValidacion = null;
          columnsNames.forEach(nombreCol => {
              if(!nombresColumnas.includes(nombreCol)){
                  estadoValidacion = 'El nombre de las columnas del archivo no cumple con el formato'
              }
          });
          return estadoValidacion
      }
      const validarRegistros = (registros) => {

      }

    return (
        <>
            <h3 id="idCuadroDeAreas" className="no-margen-inferior animate__animated animate__bounce texto-centrado">Cargue cuadro de áreas</h3>
           

            <input
                style={{display: 'none'}}
                accept=".xls, .xlsx"                
                id="contained-button-file"
                /* multiple */
                type="file"
                
                onChange={(e)=>fileHandler(e)}
            />
            <label htmlFor="contained-button-file" >
                <Button variant="contained"  component="span" className="boton mt-10">
                    <Icon>add_circle</Icon> Examinar
                </Button>
            </label>

            {
                (data.rows.length > 0) && (<DataTable columns={data.cols} rows={data.rows} />)
            }
            
            {/* <OutTable data={data.rows} columns={data.cols} tableClassName="tableSimple" tableHeaderRowClass="heading" /> */}
        </>
        
    )
}
