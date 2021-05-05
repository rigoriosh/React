import React, { useEffect, useRef, useState } from 'react'
import '../css/captchat.css'
//import PropTypes from 'prop-types'

const Capchat = props => {

    const [captchat, setCaptchat] = useState('nothing');
    const refCaptchat = useRef();
    const refNombreUsuario = useRef();
    const [formulario, setFormulario] = useState({ nameUser: null, passUser: null });

    const getRandIndex = (maxLength) => (Math.floor(Math.random() * maxLength));

    const verOtraImagen = () => {
        const canvas = document.querySelector('#canvas')
        const ctx = canvas.getContext('2d');
        let captch = Math.random().toString(36).substring(2, 8);

        ctx.font = '30px Georgia';
        ctx.fillStyle = '#262626';
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = 'orange';
        const maxLength = captch.length;
        const index1 = getRandIndex(maxLength);
        //const index2 = getRandIndex(maxLength);

        captch = captch.substring(0, index1 - 1) + captch[index1].toUpperCase() + captch.substring(index1 + 1, maxLength);
        //captch = captch.substring(0, index2 - 1) + captch[index2].toUpperCase() + captch.substring(index2 + 1, maxLength);
        const data = captch;

        captch = captch.split("").join('  ')
        ctx.fillText(captch, 40, 40);

        setCaptchat(data);
        refCaptchat.current.focus()
    }


    const checkit = (e) => {
        e.preventDefault()
        console.log("checkit");
        const inputCaptchat = document.querySelector('#inputCaptchat').value;
        console.log({ inputCaptchat });
        console.log({ captchat });
        if (inputCaptchat !== captchat) {
            console.log('Something is brown');
        } else {
            console.log('all is ok')
            console.log({ formulario });
        }
    }


    useEffect(() => {
        verOtraImagen();
        const rnu = refNombreUsuario.current;
        rnu.focus()
        return () => {}
    }, [])



    return ( <
        div className = " " >

        <
        div > < h1 > Banner < /h1></div >

        <
        div className = "contenedor columna2 card" >

        <
        form onSubmit = { checkit } >
        <
        div className = "columna2 ali-item-cent" >
        <
        label htmlFor = "nameUser" > Nombre de usuario < /label> <
        input className = "input"
        type = "text"
        name = "nameUser"
        id = "nameUser"
        ref = { refNombreUsuario }
        required onChange = {
            ({ target }) => { setFormulario({...formulario, nameUser: target.value }) } }
        /> <
        /div> <
        div className = "columna2 ali-item-cent" >
        <
        label htmlFor = "passUser" > Contraseña < /label> <
        input className = "input"
        type = "password"
        name = "passUser"
        id = "passUser"
        required onChange = {
            ({ target }) => { setFormulario({...formulario, passUser: target.value }) } }
        /> <
        /div> <
        div className = "columna2 ali-item-cent" >
        <
        label htmlFor = "inputCaptchat" > Ingrese el texto mostrado en la imagen < /label> <
        input className = "input"
        type = "text"
        name = "inputCaptchat"
        id = "inputCaptchat"
        ref = { refCaptchat }
        required / >
        <
        /div> <
        div className = "columna2 ali-item-cent" >
        <
        label onClick = { verOtraImagen }
        htmlFor = "canvas"
        className = "texto-centrado apuntador negrita" > Ver otra imagen < /label> <
        canvas id = "canvas"
        width = "220"
        height = "60"
        name = "canvas" > < /canvas> <
        /div>      <
        div className = "elem-derecha btnIngresar" >
        <
        button className = "boton" /* onClick={checkit} */
        type = "submit" > Ingresar < /button> <
        /div>               


        <
        /form>

        <
        h2 className = "texto-centrado titulo" > Módulo Mantenimiento Crédito Constructor < /h2>

        <
        /div>



        <
        /div>
    )
}

Capchat.propTypes = {

}

export default Capchat