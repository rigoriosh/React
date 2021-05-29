import Icon from "@material-ui/core/Icon";
import { /* OutTable, */ ExcelRenderer } from "react-excel-renderer";
import Button from "@material-ui/core/Button";
import "../../css/cargueCuadroDeAreas.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mostrarMensaje } from "../../Redux-actions/alertasMensajes_action";
import DataTable from "../../components/DataTable";
import { setCargueCuadroDeAreas } from "../../Redux-actions/cargueCuadroDeAreas_action";
import { subirScrollBar } from "../../helpers/helperUtil";

const nombresColumnas = [
  "Tipo de Inmueble",
  "Nomenclatura",
  "Interior",
  "Etapa",
  "Area Mt2",
];
const initialState = {
  cols: [],
  rows: [],
  nombreArchivo: "",
  cantidadRegistros: 0,
};

export const CargueCuadroDeAreas = ({ history }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(initialState);

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const validaciones = validacionesIniciales(resp.rows);
        if (!!validaciones) {
          dispatch(mostrarMensaje("warning", `${validaciones}`)); //Genera mensaje de error
          history.replace(history.location.pathname); //limpie la memoria del onchage y pueda cargar el mismo archivo con el mismo nombre
        } else {
          const updateCols = resp.rows[0].map((e, i) => {//contrulle el objeto columnas para ser renderizado
            return {
              field: e.split(" ").join(""),
              headerName: e,
              width: e.length * 20,
            };
          });
          const namesCols = updateCols.map((nc) => nc.field);//capatura el nombre de las columnas en un array
          const updateRows = resp.rows.slice(1, resp.rows.length); // elimina la primer fila del array de registros
          const filasTemporales = []; //construlle los registro con el formato especifico para poder ser renderizado en la tabla.
          updateRows.forEach((fila, itemFila) => {
            const objTemp = { id: itemFila };
            fila.forEach((campoFila, itemCampoFila) => {
              objTemp[namesCols[itemCampoFila]] = campoFila;
            });
            filasTemporales.push(objTemp);
          });
          setData({
            ...data,
            nombreArchivo: fileObj.name,
            cantidadRegistros: updateRows.length,
            cols: updateCols,
            rows: filasTemporales,
          });
        }
      }
    });
  };

  const validacionesIniciales = (registros) => {
    let eco = validarNombreDeColumnas(registros[0]);
    if (!!eco) return eco;
    eco = validarRegistros(registros.slice(1, registros.length));
    if (!!eco) {
      return eco;
    }
    return null;
  };
  const validarNombreDeColumnas = (columnsNames) => {
    let estadoValidacion = null;
    columnsNames.forEach((nombreCol) => {
      if (!nombresColumnas.includes(nombreCol)) {
        estadoValidacion =
          "El nombre de las columnas del archivo no cumple con el formato";
      }
    });
    return estadoValidacion;
  };
  const validarRegistros = (registros) => {
    console.log(registros); // pendiente por si se debe realizar valdiaciones de cada registro desde el front
  };
  
  useEffect(() => {
      // eviar al store
      dispatch(setCargueCuadroDeAreas(data));
      return () => { }
  }, [data])

  useEffect(() => {
    subirScrollBar();    
    return () => {}
  }, [])

  return (
    <>
      <h3
        id="idCuadroDeAreas"
        className="no-margen-inferior animate__animated animate__bounce texto-centrado"
      >
        Cargue cuadro de áreas
      </h3>

      {data.rows.length > 0 ? (
        <Button
          onClick={() => {
            setData(initialState);
          }}
          variant="contained"
          component="span"
          className="boton mt-10"
        >
          Limpiar
        </Button>
      ) : (
        <>
          <input
            style={{ display: "none" }}
            accept=".xls, .xlsx"
            id="contained-button-file"
            /* multiple */
            type="file"
            onChange={(e) => fileHandler(e)}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className="boton mt-10"
            >
              <Icon>add_circle</Icon> Examinar
            </Button>
          </label>
        </>
      )}

      <div className="grid col-2">
        <div className="">
          {data.rows.length > 0 && (
            <DataTable columns={data.cols} rows={data.rows} />
          )}
        </div>
        {data.cantidadRegistros > 0 && (
          <div className="card">
            <p>Se importó el archivo {data.nombreArchivo}</p>
            <p>Se ingresaron {data.cantidadRegistros} inmuebles</p>
          </div>
        )}
      </div>

      {/* <OutTable data={data.rows} columns={data.cols} tableClassName="tableSimple" tableHeaderRowClass="heading" /> */}
    </>
  );
};
