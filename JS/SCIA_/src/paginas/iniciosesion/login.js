import {ipPublica, NombreDispositivo, TipoClienteAccede} from '../../componentes/datosApiRest'

export default async function Login(Email, Clave, GeoLoc) {

    let IPPublicaDispositivo = ""
    await ipPublica().then(valorIp=>{IPPublicaDispositivo = valorIp })

    try {
        
        const url = 'https://scia.cmsolinfo.com/api/Login'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email,  Clave, TipoClienteAccede, NombreDispositivo, IPPublicaDispositivo, GeoLoc })
        }

        const retorno = await fetch(url, requestOptions)
            .then(function (response) {
                return { ok: response.ok, token: response.text()}
            })
            .catch(error => {
                return { ok: false, token: "No se ha podido realizar la conexión!!"}
            });
        return retorno
    } catch (error) {
        return error;
    }
}