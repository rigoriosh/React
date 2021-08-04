import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

export const Paginador = () => {
    const getPaginationSelected = (pag) => {
        console.log(pag);
    }
    return (
        <Pagination>
            {/* <Pagination.First /> */}
            {/* <Pagination.Prev /> */}
            <Pagination.Item onClick={()=>getPaginationSelected('<<')}>{'<<'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('Inicio')}>{'Inicio'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('Ejecucion')}>{'Ejecución'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('Fin')}>{'Fin'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('Relevante')}>{'Relev'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('Amarillado')}>{'Amarillo'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('>>')}>{'>>'}</Pagination.Item>
            {/* <Pagination.Ellipsis /> */}


            {/* <Pagination.Next /> */}
            {/* <Pagination.Last /> */}
        </Pagination>
    )
}
