import React from 'react'
//import PropTypes from 'prop-types'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const Breadcrumb = props => {
    function handleClick(breadcrumb) {
        
        console.info('You clicked a breadcrumb.', breadcrumb);
      }
    const breads = ['Inicio', 'Administración'];
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                breads.map(e => (
                    <div key={e} color="inherit" onClick={()=> handleClick(e)}>
                        {e}
                    </div>)
                )
            }
            {/* <div color="inherit" href="/" onClick={handleClick}>
                Inicio
            </div>
            <div color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                Administración
            </div> */}
            {/* <Typography color="textPrimary">Breadcrumb</Typography> */}
        </Breadcrumbs>
    )
}

Breadcrumb.propTypes = {

}

export default Breadcrumb
