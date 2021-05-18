import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
//import PropTypes from 'prop-types'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useSelector } from 'react-redux';

const Breadcrumb = React.memo(props => {
    console.log('Breadcrumb');
    const history = useHistory();
    const { breadCrumb_reducer } = useSelector(state => state);
    const {rutaPadre, rutaHijo,/*  rutaNieto */ } = breadCrumb_reducer;
    
    const [breads, setBreads] = useState([rutaPadre.ruta.split('/')[1]])
    console.log(history.location.pathname);

    function handleClick(breadcrumb) {
        //history.push('/');
        console.info('You clicked a breadcrumb.', breadcrumb);
        
        //ubicar ruta a seguir        
        
        if (rutaPadre.ruta === `/${breadcrumb}`) {
            history.push(`/`);
        }else if (rutaHijo.ruta === `/${breadcrumb}`) {
            history.push(`${breadCrumb_reducer.rutaPadre.ruta}/${breadcrumb}`);
        }
      }
    

    useEffect(() => {
          
            //history.push('/prorratas');            
            setBreads(history.location.pathname.split('/').slice(1,4))
       
        return () => { }
    
    }, [history.location.pathname])


    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                breads.map(e => (
                    <div key={e} color="inherit" onClick={()=> handleClick(e)} className="apuntador">
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
})

Breadcrumb.propTypes = {

}

export default Breadcrumb
