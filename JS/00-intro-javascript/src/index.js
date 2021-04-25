/////////////////
import {heroes} from './data/heroes.js'
console.log(heroes)

console.log('hola mundo')

let aa = 5

console.log(aa)

if (1) {
    console.log(aa)
    let a = 3
    console.log(a)
}
console.log(aa)

/////areglos
const arreglo = [1,2,3,4]

let arreglo2 = [...arreglo, 5]//... se le llama operador spret, sirve para clonar objetos y arreglos

console.log(arreglo)
console.log(arreglo2)

///FUNCIONES
const getUsuario = (nombre) => ({
    uid:'ABDC456',
    nombre
})

console.log(getUsuario('Rigo'))
//desustructuracion

const getPerson = ({nombre, clave})=>{
    return{
        nombre, clave
    }
        
}
const persona = {
    nombre: 'Tony',
    edad: 42,
    clave: 'Iroman'
}

//const {nombre, edad, clave} = persona

//console.log(nombre, edad, clave)

const {nombre, clave} = getPerson(persona)

console.log(nombre, clave)