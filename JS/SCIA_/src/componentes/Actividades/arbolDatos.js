import React from 'react'
import {Table} from 'react-bootstrap'
import { Dropdown, Navbar, NavDropdown} from 'react-bootstrap'

export default function ArbolDatos(props){
    
    const objetoArbol = [];
    props.arbol.forEach((registro)=>{
        //Verifica si existe el id en el objeto objetoArbol
        const resultado = objetoArbol.find( rama => rama.padre===registro.padre);
        //No existe agrega (padre)
        if(!resultado){
            objetoArbol.push({padre:registro.padre,
                              hijo:[{incidencia:registro.incidencia, descripcion:registro.descripcion}]})
        }else{//Existe lo actualiza (Hijo)
            const index = objetoArbol.findIndex(rama => rama.padre === registro.padre )
            objetoArbol[index].hijo.push({incidencia:registro.incidencia, descripcion:registro.descripcion})
        }
    })

    const abrirArbol = (identificador) =>{
        let hijorRama = document.getElementById(identificador)
        hijorRama.hidden=hijorRama.hidden?false:true
    }

    const listaDeArbol = 
        objetoArbol.map(rama=>{
                            return  <div>
                                        <button className="btn btn-link" onClick={()=>abrirArbol(rama.padre)}>{rama.padre}</button>
                                        <Table id={rama.padre} hidden>{rama.hijo.map(datosHijo=>{
                                            return <tr>
                                                    <td style={{paddingLeft:'10px'}}> {datosHijo.descripcion} </td>
                                                    <td> <b>{datosHijo.incidencia}</b> </td>
                                                   </tr>
                                        })}</Table>
                                    </div>
                        })
            

    return listaDeArbol
    // return <ul>
    //     {objetoArbol.map((rama)=>{
    //         //Pantallas padre
    //         return  <li className="colorTexto" 
    //                     key={rama.padre} 
    //                     title={rama.padre} id="basic-nav-dropdown">
    //                         <button className="btn btn-link">{rama.padre}</button>
    //                         {rama.hijo.map(function(datosHijo,index){
    //                             console.log(datosHijo.descripcion)
    //                             return (<ul 
    //                                         className="colorTexto" 
    //                                         key={index} 
    //                                         onClick={()=>console.log(datosHijo)}>
    //                                             <li>{datosHijo.descripcion}</li>
    //                                     </ul>)
    //                         })
    //                         }
    //                 </li>
    //         })
    //     }</ul>
}