const moment = require('moment');

export const getDiaMesAnio = () => {
    return moment().format("LLLL"); // eje: martes, 4 de mayo de 2021 21:20
}