import enviroment from "./helpers/enviroment";

export const doGetToken = async(headers ) => {
    // const payload = `username=${String(username)}&password=${String(password)}`
  // console.log(11111)
    try {
        const url_getToken = enviroment.getToken;
        const responseLogin = await fetch(url_getToken, {
            method:'POST',
            headers,
            // : {
            //   data,
            //   // 'Accept':         "application/json, text/plain, */*",
            //   // 'Content-Type':   "application/json",
            // },
            // body: JSON.stringify({ user, pass }),
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
    // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const init = {
      method: 'POST',
      headers: myHeaders,
      body,
      // mode: 'cors',
      // cache: 'default'
    };
      const responseLogin = await fetch(url, init /* { method, headers, body, } */);
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
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const init = {
      method: method,
      headers: myHeaders,
      body:formData,
      // mode: 'cors',
      // cache: 'default'
    };
      const responseLogin = await fetch(url, init /* { method, headers, body, } */);
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