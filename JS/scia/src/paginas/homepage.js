import Steps from "../actividades/componentes/Steps"
import { Actividad } from "../actividades/Actividad"


const homepage = () =>{
/*
function objeto (){
    JSON.parse(window.localStorage.getItem('logearUsuario'))
}*/

    return(
        <div>
            <div>{`Bienvendio a la homepage`}</div>
            <Actividad/>
        </div>
    )
}

export default homepage