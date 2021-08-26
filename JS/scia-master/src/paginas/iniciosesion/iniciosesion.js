import React from 'react';
import { FaHome } from 'react-icons/fa';

import '../../componentes/estilos/iniciosesion.css'
import logo from '../../imagenes/logo.png'
import login from './login'
import RecordarClave from './recordarclave'

class InicioSesion extends React.Component {

  constructor(props) {
    super(props)
    this.state = { form: { txtCorreo: '', txtClave: '', error: '' }, ubicacion:'', btnSesionActivo: false, txtCorreoActivo: false, txtClaveActivo: false }
  }

  handleChange = e => {
    this.setState({ form: { ...this.state.form, error: '',[e.target.name]: e.target.value } })
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ btnSesionActivo: true, txtCorreoActivo: true, txtClaveActivo: true  })
    const respuestaLogin= await login(this.state.form.txtCorreo, this.state.form.txtClave,this.state.ubicacion)
    if (respuestaLogin.ok) {
      window.localStorage.setItem('tablaMaestra', null)
      window.localStorage.setItem('offline', JSON.stringify({modeOffline:false}))
      window.localStorage.setItem('logearUsuario', JSON.stringify({correo: this.state.form.txtCorreo,token:await respuestaLogin.token, ubicacion: this.state.ubicacion}))
      this.setState({ form: { txtCorreo: '', txtClave: '', error: '' } })
      window.location.reload()
    } else {
      this.setState({ form: { txtCorreo: this.state.form.txtCorreo, txtClave: '', error: await respuestaLogin.token }, btnSesionActivo: false,  txtCorreoActivo: false, txtClaveActivo: false   })
    }
  }


  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        posicion => {
          const ubicacion = `${ posicion.coords.latitude} ; ${posicion.coords.longitude }`
          this.setState({ ubicacion })
        }, error => { console.error(error.message) })
    }
    
    const email = document.querySelector('#txtCorreo');
    const clave = document.querySelector('#txtClave');
    const submit = document.querySelector('#cmdIniciar');

    submit.addEventListener('click', (event) => {
      if (email.validity.valueMissing || email.validity.typeMismatch) {
        email.setCustomValidity('¡Por favor ingrese una dirección de correo electrónico!')
      } else { email.setCustomValidity('') }

      if (clave.validity.valueMissing || clave.validity.typeMismatch) {
        clave.setCustomValidity('¡Por favor ingrese una clave valida!')
      } else if (clave.validity.tooShort) {
        clave.setCustomValidity('¡La clave debe tener al menos 8 caracteres!')
      } else if (clave.validity.patternMismatch) {
        clave.setCustomValidity('¡La clave debe tener al menos 1 caracteres especial, mayúscula, minúscula y número!')
      } else { clave.setCustomValidity('') }
    });
  }

  render() {
    return (
      <div className="panel panel-primary col-sm-4 align-middle p-2" style={{ margin: 'auto', marginTop: '100px' }}>
        <div className="panel-body marcoBordeado">
        <img  className="logo" src={logo} alt="logo"/>
        <hr/>
          <form onSubmit={this.handleSubmit}>
            <label id="lblCorreo" name="lblCorreo" className="control-label">Usuario/Correo:</label>
            <div className="input-group mb-3">
              <input type="email"
                className="form-control"
                placeholder="Digite su dirección de correo electrónico"
                id="txtCorreo"
                name="txtCorreo"
                onChange={this.handleChange}
                value={this.state.form.txtCorreo}
                required 
                disabled={this.state.txtCorreoActivo}/>
              <span className="validity input-group-text">  </span>
            </div>

            <label id="lblClave" name="lblClave" className="control-label">Clave:</label>
            <div className="input-group mb-3">
              <input type="password"
                className="form-control"
                placeholder="Digite su clave"
                id="txtClave"
                name="txtClave"
                maxLength="15"
                minLength="8"
                onChange={this.handleChange}
                value={this.state.form.txtClave}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$"
                required 
                disabled={this.state.txtClaveActivo}/>
              <span className="validity input-group-text">  </span>
            </div>
            <div className="row">
              <div className="col-6">
                <button id="cmdIniciar" type="submit" className="btn btn-light" disabled={this.state.btnSesionActivo}>
                  <FaHome /> Iniciar Sesión
                </button>
              </div>
              <div className="col-6">
                <RecordarClave  id='idLinkCambiarClave' hidden={false}  ubicacion={this.state.ubicacion}/>
              </div>
            </div>
          </form>
        </div>
        <br />
        <div className="panel-footer">
          {this.state.form.error && <div className="alert alert-danger "> {this.state.form.error}</div>}
        </div>
      </div>);
  }
}
export default InicioSesion