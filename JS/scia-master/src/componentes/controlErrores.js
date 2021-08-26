import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'


export const ShowErrorMaestraCrud = (props) =>{

    if(!props.show)
        return <div></div>

    return <SweetAlert
                show={props.show}
                danger
                title={"Error"}
                onConfirm={props.onConfirm()}
                showCancel={false}
                confirmBtnText={"Aceptar"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <p>{props.mensaje}</p>
            </SweetAlert>
}



export const NoInternet = (props) =>{
    if(!props.show)
        return <div></div>

    return <SweetAlert
                show={props.show}
                warning
                title={props.title}
                onConfirm={props.onConfirm()}
                onCancel={props.onCancel()}
                showCancel={true}
                confirmBtnText={"Si"}
                cancelBtnText={"No"}
                closeOnClickOutside={false}
                showCloseButton={true}>
                    <p>{props.mensaje}</p>
            </SweetAlert>
}