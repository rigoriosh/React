export const AgregarRegistro = (props) => {
        
        const apiMaestra =  JSON.parse(window.localStorage.getItem('tablaMaestra'))
        let registro = {}
        let campos = apiMaestra.objetosDataColumnName
        for (let i = 0; i < campos.length; i++){
            let campo = campos[i]
            let indentificador = campo.nombre.toLowerCase()
            switch (campo.tipoCampo) {
                case 'string':
                    registro[indentificador] = {tipo:campo.tipoCampo, valor:null, editable: true}
                    break;
                case 'bool':
                    registro[indentificador] =  {tipo:campo.tipoCampo, valor:false, editable: true}
                    break;
                case 'guid':
                    if(campo.nombre!=='id'){
                        let opciones = []
                        let idsOpcion = []
                        for (let i = 0; i < apiMaestra.objetosDataColumn.length; i++) {
                            const configCell = apiMaestra.objetosDataColumn[i]
                            if(indentificador===configCell.nombre.toLowerCase()&&configCell.activo){
                                opciones.push(configCell.descripcion)
                                idsOpcion.push(configCell.id)
                            }
                        }
                        registro[indentificador] =  {tipo:campo.tipoCampo, valor:'Seleccionar', editable: true, opciones: opciones, idsOpcion: idsOpcion}
                    }
                    break;
                case 'date':
                    registro[indentificador] = {tipo:campo.tipoCampo, valor:null, editable: true}
                    break;
                case 'email':
                    registro[indentificador] = {tipo:campo.tipoCampo, valor:null, editable: true}
                    break;
                default:
                    break;
                case 'link':
                    registro[indentificador] = {tipo:campo.tipoCampo, valor:null, editable: true}
                    break;
                
            }
        }
        props.setSkipPageReset(true)

        let sinInternet = JSON.parse(window.localStorage.getItem('offline'))
        //Crea los botones guardar y cancelar para accion nueva
        registro['acciones'] = {tipo:'boton', cancelar: true, eliminar: false, guardar: true, modificar: false, disabled: sinInternet.modeOffline}
        props.data.push(registro)

        props.setData(old=>old.map((row, index) => { return row }))
        return registro
    }


    