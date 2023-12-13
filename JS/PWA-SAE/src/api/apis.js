export const getIdUsuario = async(url) => {    
    try {
        console.log("getIdUsuario");
        const response = await fetch(url, {
            method:'GET',
            mode: "no-cors",
        });
        console.log(response);
        if (response.status == 404) {
            return "No se encuentraron registro en DB"    
        } else if(response.status == 200){
            const res = await response.json();
            return res
            
        } else{
            return "Fallo en comunicación con los servidores"
        }
    } catch (error) {
        return {error, msm:"Fallo en comunicación con los servidores"};
    }
}

export const insertProjecGeometry = async(dataToSend, url) => {
    // let formData = new FormData();
    // formData.append('data', dataToSend);
    try {
        const response = await fetch(url, {
            method:'POST',
            mode: "no-cors",
            body: dataToSend} );
        console.log(response);
        return response
    } catch (error) {
        return error        
    }
}

export const postRawData = async (dataToSend, url) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: dataToSend
          })
        console.log(response);
        if (response.status == 500) {
            return {resp:"Usuario no existe", response} 
        } else {
            const resp = await response.json();
            return {resp, response}
        }
        
    } catch (error) {
        return error
    }

}

export const postData = async (url = "", data = {}) => {
    try {
        debugger
        let formData = new FormData();
        formData.append('features', JSON.stringify(data.features));
        formData.append('gdbVersion', '');
        formData.append('rollbackOnFailure', true);
        formData.append('timeReferenceUnknownClient', false);
        // Default options are marked with *
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "no-cors", // no-cors, *cors, same-origin
        //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        //   redirect: "follow", // manual, *follow, error
          referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: formData, // body data type must match "Content-Type" header
        //   body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        // const resp = await response.json(); // parses JSON response into native JavaScript objects        
        return response; // parses JSON response into native JavaScript objects        
    } catch (error) {
        console.error(error);
    }
  }

export const findAll = async(url, id="") => {    
    try {
        console.log("findAll");
        const response = await fetch(url + id, {
            method:'GET',
            mode: "cors",
        });
        console.log(response);
        if (response.status == 404) {
            return "Sin registros"    
        } else {
            const res = await response.json();
            return res
        }
    } catch (error) {
        return error;
    }
}

export const deleteEndPoint = async(url, id="") => {
    
    try {
        console.log("deleteEndPoint");
        const response = await fetch(url + id, {
            method:'DELETE',
            mode: "cors",
            // headers: myHeaders
        });
        console.log(response);
        if (response.status == 404) {
            return "No se logro realizar la eliminación del registro"    
        } else {
            const res = await response.json();
            return res
        }
    } catch (error) {
        return error;
    }
}

export const postDeleteGeomtry = async (url = "", data = {}) => {
    try {
        let formData = new FormData();
        formData.append('objectIds', data.objectIds);
        formData.append('where', data.where);
        formData.append('gdbVersion', '');
        formData.append('rollbackOnFailure', true);
        formData.append('returnDeleteResults', true);
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "no-cors", // no-cors, *cors, same-origin
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: formData, // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects        
    } catch (error) {
        console.error(error);
    }
  }
