import React from 'react'
import { Dropdown, Navbar, NavDropdown} from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'

const Menu = (props) =>{
    const Dato = () =>{
            try{
            const objetoMenu = [];
             props.itemsMenu.map(function(item, index){
                //Verifica si existe el idModulo en el objeto objetoMenu
                const resultado = objetoMenu.find( titleMenu => {
                    return titleMenu.idModulo===item.idModulo
                });

                //No existe agrega
                if(!resultado){
                    objetoMenu.push({idModulo: item.idModulo, pantallas:[item]})
                    return ""
                }else{//Existe lo actualiza.
                    const index = objetoMenu.findIndex(fruit => fruit.idModulo === item.idModulo )
                    objetoMenu[index].pantallas.push(item)
                    return ""
                }
            })
            
            //Arma el menu y el submenu
            let retorno = objetoMenu.map(function(item,index){
                                let datoInterno = item.pantallas.map(function(item2,index){
                                    return (<NavDropdown.Item className="colorTexto" key={index} onClick={()=>props.onMostrarPantalla(item2)}  >{item2.pantalla}</NavDropdown.Item>)
                                })
                                return  <NavDropdown className="colorTexto" key={item.idModulo} title={item.idModulo} id="basic-nav-dropdown">
                                            {datoInterno}
                                        </NavDropdown>
                            })
            return retorno
        }catch(e){
            return ""
        }
    }

    return (
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" className="colorTexto">
                    <FaBars/> Opciones del sistema
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dato />
                </Dropdown.Menu>
            </Dropdown>
        </Navbar.Collapse>
    )
}

export default Menu