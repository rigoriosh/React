import React, {useState, useEffect} from 'react'
import { useTable } from 'react-table'
import {Table} from 'react-bootstrap'
//import Cargando from '../componentes/Cargar'

export default function TablaResumen() {

    //const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{
        const logearUsuario = JSON.parse(window.localStorage.getItem('logearUsuario'))
        let tablaResumen = JSON.parse(logearUsuario.perfilUsuario.tablaResumen)

        let encabezado = []
        
        if(typeof tablaResumen === 'object' && tablaResumen !== null){
            encabezado = Object.keys(tablaResumen[0])
        }else{
            tablaResumen = []
            setError('No existen datos del usuario en el dispositivo')
        }
        
        setData( tablaResumen.map(function(objeto,index) {
                    let element = {}
                    Object.values(objeto).map(function(valor,i){
                        element[`col${i}`] = valor
                        return ''
                    })
                    return element
                }))

            setColumns( encabezado.map(function(etiqueta,index) {
                            return { Header: etiqueta, accessor: `col${index}` }
                        }))
    },[])
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    
   // setCargando(false)

   // if(cargando)
   //   return <Cargando />

    if(error!==null)
        return <div className="alert alert-danger text-center m-2 "> {error}</div>

    return (
        <div style={{overflow: 'scroll'}}>
            <Table {...getTableProps()} bordered hover  style={{ border: 'solid 1px black' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="text-center bg-gray colorTexto"
                                    {...column.getHeaderProps()}
                                    style={{
                                        background: '#d4d4d4 ',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td className="text-center colorTexto"
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px black',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}