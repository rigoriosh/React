import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from "prop-types";

const DataTable = ({ columns, rows, setRegistroSeleccionado }) => {
    /* 
    const columns = [
      { field: "id",        headerName: "Tipo de Identificación",         width: 200 },
      { field: "lastName",  headerName: "Código del proyecto",            width: 180 },
      { field: "firstName", headerName: "Identificación del constructor", width: 200 },
      { field: "age",       headerName: "Nombre del proyecto",            width: 200,   type: "number",  },    
    ];

    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
 */


    return (

        < DataGrid rows = { rows } columns = { columns } pageSize = { 5 } checkboxSelection = { false } autoHeight 
          onCellClick = {
            ({row }) => {
              setRegistroSeleccionado(row);
            }
          }
        />

    );
};

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    setRegistroSeleccionado: PropTypes.func.isRequired
};

export default DataTable;