import React, { useEffect, useState } from 'react'
import '../../css/cuadroProrratas.css';
import DataTable from '../../components/DataTable';
import { InformaciónDelProyecto } from './InformaciónDelProyecto'
import { ubicarScrollBar } from '../../helpers/helperUtil';

export const CuadroDeProrratas = () => {

    const [filasSeleccionada, setFilasSeleccionada] = useState();
    const columns = [
        /* { field: "id", headerName: "id", width: 100 }, */
        { field: "tipoInmueble", headerName: "Tipo inmueble", width: 120 },
        { field: "nomenclatura", headerName: "Nomenclatura", width: 120 },
        { field: "etapa", headerName: "Etapa", width: 100, },
        { field: "interior", headerName: "Interior", width: 100, },
        { field: "area", headerName: "Área", width: 100, },
        { field: "areaPendienteLiberar", headerName: "Área pendiente por liberar", width: 160, },
        { field: "areaLiberada", headerName: "Área liberada", width: 120, },
        { field: "valorProrratPesos", headerName: "Valor prorrata en pesos", width: 150, },
        { field: "estado", headerName: "Estado", width: 90, },
        { field: "estadoLiberacion", headerName: "Estado liberación", width: 140, },
        { field: "migrado", headerName: "Migrado", width: 100, },
      ];
    
      const rows = [
          {
              id: 1,
              tipoInmueble: 'sdfsf',
              nomenclatura: 'sdfsf',
              etapa: 'sdfsf',
              interior: 'sdfsf',
              area: 'sdfsf',
              areaPendienteLiberar: 'sdfsf',
              areaLiberada: 'sdfsf',
              valorProrratPesos: 'sdfsf',
              estado: 'sdfsf',
              estadoLiberacion: 'sdfsf',
              migrado: 'sdfsf',
          },
          {
              id: 2,
              tipoInmueble: 'sdfsf',
              nomenclatura: 'sdfsf',
              etapa: 'sdfsf',
              interior: 'sdfsf',
              area: 'sdfsf',
              areaPendienteLiberar: 'sdfsf',
              areaLiberada: 'sdfsf',
              valorProrratPesos: 'sdfsf',
              estado: 'sdfsf',
              estadoLiberacion: 'sdfsf',
              migrado: 'sdfsf',
          },
          {
            id: 3,
            tipoInmueble: 'sdfsf',
            nomenclatura: 'sdfsf',
            etapa: 'sdfsf',
            interior: 'sdfsf',
            area: 'sdfsf',
            areaPendienteLiberar: 'sdfsf',
            areaLiberada: 'sdfsf',
            valorProrratPesos: 'sdfsf',
            estado: 'sdfsf',
            estadoLiberacion: 'sdfsf',
            migrado: 'sdfsf',
        },
      ]

      useEffect(() => {
          ubicarScrollBar();
          return () => {}
      }, [])
    return (
        <>
            <InformaciónDelProyecto/>  
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Inmuebles</h3>

            <DataTable columns={columns} rows={rows} setRegistroSeleccionado={setFilasSeleccionada} clase={'tablaCuadroProrratas'}/>
        </>
    )
}
