
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { startLogOut } from '../actions/auth';
import { tipos } from '../types/tipos';

export const NavBar = ({rol}) => {

    console.log('rol => ', rol);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogOut = async() => {
        await dispatch(startLogOut())        
        history.replace('/');
        closeMenu()
    }

    const closeMenu = () => {
        document.getElementById('menuBar').checked = false;
    }

    //const [rol, setRol] = useState('');
    return (
        <>
            <div className="menu-wrap">
                <input id="menuBar" type="checkbox" className='toggler'/>
                
                <div className="hamburger"><div></div></div>
                <div className="menu">
                    <div>
                        <div>
                            <ul>
                                <li >                                    
                                    <Link onClick={closeMenu} to="/" replace><strong className="colorText" >Inicio</strong></Link>
                                    <i className="fas fa-step-backward"></i>
                                </li>
                                {
                                    (rol === tipos.rolOwner) && 
                                        (
                                            <>
                                                <li >                                               
                                                    <Link onClick={closeMenu} to="/owner/admin" replace ><strong className="colorText" >Admin</strong></Link>
                                                    <i className="fas fa-tools"></i>
                                                </li>
                                                <li>
                                                    <Link onClick={closeMenu} to="/owner/bar" replace ><strong className="colorText" >Bar</strong></Link>                                            
                                                    <i className="fas fa-glass-cheers"></i>
                                                </li>
                                                <li>
                                                    <Link onClick={closeMenu} to="/owner/menu" replace ><strong className="colorText" >Menu</strong></Link>
                                                    <i className="fas fa-bars"></i>
                                                </li>
                                                <li >                                    
                                                    <Link onClick={closeMenu} to="/owner/rockola" replace><strong className="colorText" >Rockola</strong></Link>
                                                    <i className="fab fa-spotify"></i>
                                                </li>
                                            </>
                                            
                                        )
                                    
                                }
                                {
                                    (rol === tipos.rolAdminBar) && (
                                        <>
                                            <li>
                                                <Link onClick={closeMenu} to="/adminBar/bar" replace ><strong className="colorText" >Bar</strong></Link>                                            
                                                <i className="fas fa-glass-cheers"></i>
                                            </li>
                                            <li>
                                                <Link onClick={closeMenu} to="/adminBar/menu" replace ><strong className="colorText" >Menu</strong></Link>
                                                <i className="fas fa-bars"></i>
                                            </li>
                                        </>
                                    )
                                }
                                {
                                    (rol === tipos.rolUser) && (
                                        <>
                                            <li>
                                                <Link onClick={closeMenu} to="/user/menu" replace ><strong className="colorText" >Menu</strong></Link>
                                                <i className="fas fa-bars"></i>
                                            </li>
                                            <li >                                    
                                                <Link onClick={closeMenu} to="/user/rockola" replace><strong className="colorText" >Rockola</strong></Link>
                                                <i className="fab fa-spotify"></i>
                                            </li>
                                        </>
                                    )
                                }
                                <li >                                    
                                    <Link onClick={closeMenu} to="/we" replace><strong className="colorText" >Nosotros</strong></Link>
                                    <i className="fas fa-users"></i>
                                </li>
                                {
                                    (rol !== tipos.rolOwner && rol !== tipos.rolAdminBar && rol !== tipos.rolUser) && (
                                        <li >                                    
                                            <Link onClick={closeMenu} to="/auth" replace><strong className="colorText" >Ingresar</strong></Link>
                                            <i className="fas fa-users"></i>
                                        </li>
                                    )
                                }                                
                                {
                                    (rol === tipos.rolOwner || rol === tipos.rolAdminBar || rol === tipos.rolUser)&&(
                                        <li>     
                                            <Link onClick={handleLogOut} to="/" replace><strong className="colorText" >Salir</strong></Link>                                                                           
                                            <i className="fas fa-sign-out-alt"></i>
                                        </li>                                
                                    )
                                }                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

           
        </>
        
    )
}
