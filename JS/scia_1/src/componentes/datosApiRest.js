import publicIp from 'public-ip'

export const NombreDispositivo = navigator.userAgent
export const TipoClienteAccede = "Cliente Web; rev: 0.0.0.1"

export async function ipPublica(){
    let IPPublicaDispositivo = ""
    const getClientIp = async () => await publicIp.v4({ fallbackUrls: ["https://ifconfig.co/ip"] });
        await getClientIp()
            .then((dato) => { IPPublicaDispositivo = dato })
            .catch((error) => {
                return {
                    ok: false,
                    user: error,
                    mensaje: "No se ha podido realizar la conexión!!"
                } 
            })
    return IPPublicaDispositivo;
}