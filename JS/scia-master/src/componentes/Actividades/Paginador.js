import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

export const Paginador = () => {
    const getPaginationSelected = (pag) => {
        console.log(pag);
    }
    return (
        <Pagination>
            <Pagination.Item onClick={()=>getPaginationSelected('<<')}>{'<<'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected(1)}>{1}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected(2)}>{2}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected(3)}>{3}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('...')}>{'...'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('n')}>{'n'}</Pagination.Item>
            <Pagination.Item onClick={()=>getPaginationSelected('>>')}>{'>>'}</Pagination.Item>
        </Pagination>
    )
}
