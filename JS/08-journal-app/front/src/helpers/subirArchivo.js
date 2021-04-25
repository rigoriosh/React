

export const subirArchivo = async(archivo) => {

    const api = 'https://api.cloudinary.com/v1_1/du3ukdjyc/upload'
    const formDate = new FormData();
    let urlImagen = ''
    /* los append son los parametros del header en la peticion */
    formDate.append('upload_preset','react-journal');
    formDate.append('file', archivo)

    try {
        const resp = await fetch(api,{
            method: 'POST',
            body: formDate
        })
        if (resp.ok) {
            const apiResp = await resp.json();
            urlImagen = apiResp.secure_url;
        }else{
            throw await resp.json()
        }
    } catch (error) {
        throw error;
    }

    return urlImagen;
}