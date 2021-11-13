import enviroment from "./helpers/enviroment";

export const doGetToken = async(data) => {
    // const payload = `username=${String(username)}&password=${String(password)}`

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