import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

    const RecordarClave = (props) => {
        return (
            <div>
                <SweetAlert
                    show={props.show}
                    title={props.title}
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                    type={'controlled'}
                    showCancel={props.showCancel}
                    reverseButtons={props.reverseButtons}
                    confirmBtnText={props.confirmBtnText}
                    cancelBtnText={props.cancelBtnText}
                    cancelBtnBsStyle={props.cancelBtnBsStyle}
                    closeOnClickOutside={false}
                    showCloseButton={true}
                >
                    <label>{props.subTitle}</label>
                    <hr />
                    <input
                        name={props.name}
                        type={props.type}
                        className="form-control"
                        value={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        maxLength={props.maxLength}
                        minLength={props.minLength}
                        required />
                    {props.state.txtError && <div className="alert alert-danger "> {props.state.txtError}</div>}
                    <br/>
                    <button id="idTengoPIN" type="button" name="idTengoPIN" hidden={!props.showCancel} className="btn btn-link" onClick={props.onConfirm}>Ya tengo un PIN</button>
                </SweetAlert>

                <SweetAlert  show={props.success}  success title="Aceptado!" onConfirm={props.onConfirm} onCancel={props.onCancel}>
                    Se ha cambiado la clave!
                </SweetAlert>
            </div>
        )
    }

export default RecordarClave