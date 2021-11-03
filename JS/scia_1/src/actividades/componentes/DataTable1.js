import React, { useState } from 'react'
import {Table} from 'react-bootstrap'
import { Paginador } from './Paginador';
import { useTable } from 'react-table'
import IconButton from '@material-ui/core/IconButton';
import TodayIcon from '@material-ui/icons/Today';
import { ModalCalendar } from './ModalCalendar';

export const DataTable1 = () => {

    const [openModalCalendar, setOpenModalCalendar] = useState(false);
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


    const handleinputsChange = (target) => {
        console.log(target.name, target.value);
    }

    const rowSelected = (row) => {
        if (Number(row.id) !== data.length - 1) {
            console.log(row);
        }
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({ columns, data });

    
    const openCalendar = () => {
        console.log('opening calendar');
        setOpenModalCalendar(true)
    }


    return (
        <div>
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
            <div>
                <Paginador/>
            </div>
            <ModalCalendar openModalCalendar={openModalCalendar} setOpenModalCalendar={setOpenModalCalendar} handleinputsChange={handleinputsChange}/>
        </div>
    )
}
