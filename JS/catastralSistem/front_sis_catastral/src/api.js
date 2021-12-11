import enviroment from "./helpers/enviroment";

export const doGetToken = async(headers ) => {
  try {
      const endHader = new Headers();
      endHader.append('Access-Control-Allow-Origin', '*');
      const keys = Object.keys(headers);
      keys.forEach(k => {
        endHader.append(k, '*');
      });
      const url_getToken = enviroment.getToken;
      const responseLogin = await fetch(url_getToken, {
          method:'POST',
          headers,
        });
      const dataResponse = await responseLogin.json();
      return dataResponse
    } catch (error) {
        return error;
    }
}

export const getInfo = async(headers, url, method='POST', body) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append('token', headers.token);
    myHeaders.append('Content-Type', 'application/json');

    const init = {
      method,
      headers: myHeaders,
      body,
    };
      const responseLogin = await fetch(url, init);
      const dataResponse = await responseLogin.json();
      return dataResponse
  } catch (error) {
      return error;
  }
}

export const createSolitud = async(headers, url, method='POST', body) => {
  try {
    let formData = new FormData();
    formData.append('file', body.file);
    formData.append('data', body.data);
    let myHeaders = new Headers();
    myHeaders.append('token', headers.token);

    const init = {
      method: method,
      headers: myHeaders,
      body:formData,
    };
      const responseLogin = await fetch(url, init );
      const dataResponse = await responseLogin.json();
      return dataResponse
  } catch (error) {
      return error;
  }
}

export const getInfoGET = async(headers, url, method = 'GET') => {
  try {
      const responseLogin = await fetch(url, { method, headers });
      const dataResponse = await responseLogin.json();
      return dataResponse
  } catch (error) {
      return error;
  }
}

export const downloadFile = async(headers, url, method = 'GET') => {
  try {
    let myHeaders = new Headers();
    myHeaders.append('token', headers.token);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('responseType', 'arraybuffer');


    const init = {
      method,
      headers: myHeaders,
    };
    const responseData = await fetch(url, init);
    return responseData
  } catch (error) {
      return error;
  }
}