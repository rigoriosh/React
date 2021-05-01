import React, { memo } from 'react'
import PropTypes from 'prop-types'

const List = memo(({items}) => {
    console.log(2222222222)
    return (
        <ul>
            {items.map(item => {
                return <li key={item}>{item}</li>;
            })}
        </ul>
    )
})

List.propTypes = {
    items: PropTypes.array.isRequired
}

export default List
