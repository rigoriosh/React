import React, { useState } from 'react'
import { BsSearch, BsXSquare, BsPlusSquare, BsPencilSquare } from "react-icons/bs";
import { FaEraser, FaSave } from "react-icons/fa";
import { IconContext } from "react-icons";
import {Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { useTable } from 'react-table'
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import TodayIcon from '@material-ui/icons/Today';
import { ModalCalendar } from '../componentes/ModalCalendar';


export const ViewRecursos = ({updateStateActividades}) => {

    const [columns, setColumns] = useState([
        {Header:'Recurso', accessor:'col0'},
        {Header:'Fecha', accessor:'col1'},
        {Header:'Cantidad', accessor:'col2'},
    ])
    const [data, setData] = useState([
        {
            col0: 'Ayudante Civil',
            col1: '2021-07-08',
            col2: 3,
        },
        {
            col0: 'Cadenero',
            col1: '2021-07-10',
            col2: 4,
        },
        {
            col0: 'Grua 30T',
            col1: '2021-07-08',
            col2: 1,
        },        
        {
            col0: <select onChange={({target})=>handleinputsChange(target)} name="equipos" className="form-select form-select-sm mb-3" aria-label=".form-select-sm ">
                    <option value="1">MOD-Equipos</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>,
            col1: <IconButton color="primary" aria-label="add an calendar" onClick={()=>openCalendar()}>
                 <TodayIcon /> 
                 </IconButton>,
            col2: '',
        },
    ])

    const [openModalCalendar, setOpenModalCalendar] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const getPaginationSelected = (pag) => {
        console.log(pag);
    }

    const openCalendar = () => {
        console.log('opening calendar');
        setOpenModalCalendar(true)
    }

    const handleinputsChange = (target) => {
        console.log(target.name, target.value);
    }

    const agregar = () => {
        console.log('agregar');
    }
    const editar = () => {
        console.log('editar');
    }
    const eliminar = () => {
        console.log('eliminar');
    }
    const guardar = () => {
        console.log('guardar');
    }
    const cancelar = () => {
        console.log('cancelar');
    }
    const rowSelected = (row) => {
        if (Number(row.id) !== data.length - 1) {
            console.log(row);
        }
    }
    return (
        <div>
            <div style={estilos.fila}>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><BsSearch/></span>
                    <input onChange={({target})=>handleinputsChange(target)} name="search" type="text" class="form-control" aria-label="Buscar" aria-describedby="basic-addon1"/>
                </div>
                
                
                
                <IconContext.Provider value={{ color: "gray", className: "global-class-name", size:'2em' }}>
                    <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <BsPlusSquare onClick={()=>agregar()} name="Agregar" className="cursor" title='Agregar' style={estilos.estiloIcono}/>
                        <BsPencilSquare onClick={()=>editar()} className="cursor" title='Editar' style={estilos.estiloIcono}/>
                        <FaEraser onClick={()=>eliminar()} className="cursor" title='Eliminar' style={estilos.estiloIcono}/>
                    </div>
                    <div style={{...estilos.fila, marginBottom:'1rem', marginLeft:'10px'}}>
                        <FaSave onClick={()=>guardar()} className="cursor" title='Guardar' style={estilos.estiloIcono}/>
                        <BsXSquare onClick={()=>cancelar()} className="cursor" title='Cancelar' style={estilos.estiloIcono}/>
                    </div>
                </IconContext.Provider>
            </div>
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
                                            <td onClick={()=>rowSelected(row)} className="text-center colorTexto"
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
            <div>
            <Pagination>
                {/* <Pagination.First /> */}
                {/* <Pagination.Prev /> */}
                <Pagination.Item onClick={()=>getPaginationSelected('<<')}>{'<<'}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected(1)}>{1}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected(2)}>{2}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected(3)}>{3}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected('...')}>{'...'}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected('n')}>{'n'}</Pagination.Item>
                <Pagination.Item onClick={()=>getPaginationSelected('>>')}>{'>>'}</Pagination.Item>
                {/* <Pagination.Ellipsis /> */}


                {/* <Pagination.Next /> */}
                {/* <Pagination.Last /> */}
            </Pagination>
            </div>
            <ModalCalendar openModalCalendar={openModalCalendar} setOpenModalCalendar={setOpenModalCalendar} handleinputsChange={handleinputsChange}/>
        </div>
    )
}


const estilos = {
    fila:{display:'flex', justifyContent:'space-between', alignItems:'center'},
    estiloIcono: {marginLeft:'5px', marginRight:'5px'}
}