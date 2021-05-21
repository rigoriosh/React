import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useSelector } from 'react-redux';

import '../css/breadCrumb.css'

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
        if (breadcrumb === 'inicio') {
            history.push(`/`);    
        }else{
            const pathNames = history.location.pathname.split('/');
            const item = pathNames.findIndex(e => e === breadcrumb);
            const nuevaRuta = pathNames.slice(1, item + 1).join('/');
            history.push(`/${nuevaRuta}`);
        }
      }
    

    useEffect(() => {
          
            //history.push('/prorratas');            
            const pathnames = history.location.pathname.split('/');
            setBreads(pathnames.slice(1,pathnames.length));
       
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

export default Breadcrumb
