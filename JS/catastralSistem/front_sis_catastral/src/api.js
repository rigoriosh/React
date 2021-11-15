import enviroment from "./helpers/enviroment";

export const doGetToken = async(data, url, metodo, ) => {
    // const payload = `username=${String(username)}&password=${String(password)}`
  // console.log(11111)
    try {
        const url_getToken = enviroment.getToken;
        const responseLogin = await fetch(url_getToken, {
            method: "POST",
            headers: {
              data,
              // 'Accept':         "application/json, text/plain, */*",
              // 'Content-Type':   "application/json",
            },
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
      const responseLogin = await fetch(url, { method, headers, body, });
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