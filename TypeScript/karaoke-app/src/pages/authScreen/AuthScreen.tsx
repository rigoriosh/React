import { useState } from 'react'
import '../../estilos/auth.css';
import logo from '../../assets/images/log.svg';
import imgRegister from '../../assets/images/register.svg';
import { tiposAuth } from '../../tipos/tipos';


export const AuthScreen = () => {
    const [claseVista, setClaseVista] = useState(tiposAuth.claseAuth);
    return (
        <div className={claseVista} >
            <div className="forms-container">
                <div className="signin-signup">
                    <form /* onSubmit={handleLogin} */ className="sign-in-form">
                        <h2 className="title">Ingresar</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" name="email" className="auth2__input" /* value={email} onChange={handledInputChange} *//>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="password" name="password" className="auth2__input" /* value={password} onChange={handledInputChange} *//>
                        </div>
                        <button type="submit" className="btnAuth colorBtn" /* disabled={ui.loading} */>Ingresar</button>
                        <p className="social-text"> O ingresa con alguna de tus cuentas</p>
                        <div className="social-media">
                            {/* <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a> */}
                            <div className="social-icon" /* onClick={handleGoogleLogin} */>
                                <i className="fab fa-google"></i>
                            </div>
                            {/* <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a> */}
                        </div>
                    </form>
                    <form /* onSubmit={handleRegister} */ className="sign-up-form">                            
                        <h2 className="title">Registrarse</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Usuario" name="name" className="auth2__input" /* onChange={handledInputChangeRegister} *//>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" className="auth2__input" name="emailRegister" /* onChange={handledInputChangeRegister} *//>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Contraseña" className="auth2__input" name="passwordRegister" /* onChange={handledInputChangeRegister} *//>
                        </div>
                        <div className="input-field">
                        <i className="fas fa-lock"></i>
                            <input type="password" placeholder="confirm Password" name="confirmPassword" className="auth2__input" /* onChange={handledInputChangeRegister} *//>
                        </div>   
                        {
                            /*  ui.msgError && 
                                (
                                    <>
                                        
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Nota!</strong> {ui.msgError}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>                                    
                                </>
                                ) */
                        }                     
                        <input type="submit" className="btnAuth colorBtn" value="Registrarse" />
                        <p className="social-text">O registrarse con alguna de tus cuentas</p>
                        <div className="social-media">
                            {/* <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a> */}
                            <div className="social-icon" /* onClick={handleGoogleLogin} */>
                                <i className="fab fa-google"></i>
                            </div>
                        {/*  <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a> */}
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                <div className="content">
                    <h3>Sin Usuario ?</h3>
                    <p>
                    Registrate de forma fácil y gratuita a KAPITAL
                    </p>
                    <button className="btnAuth transparent" id="sign-up-btn" onClick={()=>setClaseVista(tiposAuth.claseRegister)}>
                    registrarse
                    </button>
                </div>                    
                <img src={logo} className="image" alt="nothisng"/>
                
                </div>
                <div className="panel right-panel">
                <div className="content">
                    <h3>Ya tienes usuario?</h3>
                    <p>
                    Ingresa para que puedas realizar tus pedidos.
                    </p>
                    <button className="btnAuth transparent" id="sign-in-btn" onClick={()=>setClaseVista(tiposAuth.claseAuth)}>
                    Ingresar
                    </button>
                </div>
                <img src={imgRegister} className="image" alt="" />
                </div>
        </div>
        </div>
    )
}
