
import React, { useEffect, useState } from 'react'
import '../css/captchat.css'
//import PropTypes from 'prop-types'

const Capchat = props => {

    const [captchat, setCaptchat] = useState('nothing');

    const getRandIndex = (maxLength) => (Math.floor(Math.random() * maxLength));

    const getCapchat = () => {
        const canvas = document.querySelector('#canvas')
        const ctx = canvas.getContext('2d');
        let captch = Math.random().toString(36).substring(2, 8);

        ctx.font = '30px Georgia';
        ctx.fillStyle = '#262626';
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = 'orange';
        const maxLength = captch.length;
        const index1 = getRandIndex(maxLength);
        const index2 = getRandIndex(maxLength);

        console.log(index1, index2);
        captch = captch.substring(0, index1 - 1) + captch[index1].toUpperCase() + captch.substring(index1 + 1, maxLength);
        //captch = captch.substring(0, index2 - 1) + captch[index2].toUpperCase() + captch.substring(index2 + 1, maxLength);
        const data = captch;

        captch = captch.split("").join('  ')
        ctx.fillText(captch, 40, 40);

        setCaptchat(data);
    }


    const checkit = (e) => {
        e.preventDefault()
        console.log("checkit");
        const inputCaptchat = document.querySelector('#inputCaptchat').value;
        console.log({ inputCaptchat }); console.log({ captchat });
        (inputCaptchat === captchat) ? console.log('all is ok') : console.log('all is brown');
    }


    useEffect(() => {
        getCapchat()
        return () => {}
    }, [])
    


    return (
        <div className="contenedor">

            <div><h1>Banner</h1></div>

            <div className="columna2">

                <form >            
                    <div className="columna2">
                        <label htmlFor="nameUser">Nombre de usuario</label>
                        <input className="input" type="text" name="nameUser" id="nameUser" />
                    </div>
                    <div className="columna2">
                        <label htmlFor="passUser">Contraseña</label>
                        <input className="input" type="password" name="passUser" id="passUser" />
                    </div>
                    <div className="columna2">
                        <label htmlFor="inputCaptchat">Ingrese el texto mostrado en la imagen</label>
                        <input className="input" type="text" name="inputCaptchat" id="inputCaptchat" />
                    </div>
                    <div className="columna2">
                        <label onClick={getCapchat} htmlFor="passUser" className="texto-centrado apuntador negrita" > Ver otra imagen</label>
                        <canvas id="canvas" width="220" height="60" style={{ border: '2px solid grey' }}></canvas>
                    </div>     
                    <div className="elem-derecha btnIngresar">
                        <button className="boton" onClick={checkit}>Ingresar</button>
                    </div>               
                    

                </form>

                <h2 className="texto-centrado">Módulo Mantenimiento Crédito Constructor</h2>

            </div>

           

        </div>
    )
}

Capchat.propTypes = {

}

export default Capchat
