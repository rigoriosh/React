
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import './css/captchat.css'
import banner from './assets/images/Banner.png'
//import PropTypes from 'prop-types'

const Capchat = props => {

    const [captchat, setCaptchat] = useState('nothing');
    const refNombreUsuario = useRef();
    const refCaptchat = useRef();

    /// logica para generar la imagen del capchat
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

    /// estado inicial del componente
    useEffect(() => { // onInit
        verOtraImagen();
        const rnu = refNombreUsuario.current;
        rnu.focus()
        return () => { }
    }, [])


    /////////////// validaciones y captura del formulario
    const { register, handleSubmit, formState, } = useForm();

    const onSubmit = ({ inputCaptchat, nameUser, passUser }) => {        
        if (inputCaptchat !== captchat) {
            console.log('Something is brown');
        } else {
            console.log('all is ok')
            console.log({ nameUser, passUser });
        }
    }

    useEffect(() => {// maneja los focus segun las validaciones        
        if (formState.errors.nameUser) {
            refNombreUsuario.current.focus();
        } else if (formState.errors.inputCaptchat) {
            refCaptchat.current.focus()
        }

        return () => { }
    }, [formState])
    ///////////////////////////////////////

    return (
        <div className="">

            <div>
                <img src={banner} alt="Colpatria"/>
            </div>

            <div className="contenedor  grid col-2 med-col-1 card">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="columna2 ali-item-cent">
                        <label htmlFor="nameUser">Nombre de usuario</label>
                        <div>
                            <input className="input no-margen-inferior" type="text" name="nameUser" id="nameUser"  {...register('nameUser', { required: true })} ref={refNombreUsuario} />
                            {formState.errors.nameUser && <p className="msgError no-margen-superior">El nombre de usuario es requerido.</p>}
                        </div>
                    </div>
                    <div className="columna2 ali-item-cent">
                        <label htmlFor="passUser">Contraseña</label>
                        <div>
                            <input className="input no-margen-inferior" type="password" name="passUser" id="passUser" {...register('passUser', { required: true })} />
                            {formState.errors.passUser && <p className="msgError no-margen-superior">La contraseña es requerida.</p>}
                        </div>
                    </div>
                    <div className="columna2 ali-item-cent">
                        <label htmlFor="inputCaptchat">Ingrese el texto mostrado en la imagen</label>
                        <div>
                            <input className="input no-margen-inferior" type="text" name="inputCaptchat" id="inputCaptchat" {...register('inputCaptchat', { required: true })} ref={refCaptchat} />
                            {formState.errors.inputCaptchat && <p className="msgError no-margen-superior">El código de la imagen es requerido.</p>}
                        </div>
                    </div>
                    <div className="columna2 ali-item-cent">
                        <label onClick={verOtraImagen} htmlFor="canvas" className="texto-centrado apuntador negrita" > Ver otra imagen</label>
                        <canvas id="canvas" height="60" name="canvas"></canvas>
                    </div>
                    <div className="elem-derecha btnIngresar mt-10">
                        <button className="boton" type="submit">Ingresar</button>
                    </div>


                </form>

                <h2 className="texto-centrado titulo">Módulo Mantenimiento Crédito Constructor</h2>

            </div>



        </div>
    )
}

Capchat.propTypes = {

}

export default Capchat
