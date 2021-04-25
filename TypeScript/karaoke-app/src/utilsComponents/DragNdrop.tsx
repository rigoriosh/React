import { CardProductoMuestra } from './CardProductoMuestra';

export const DragNdrop = ({/* color, archivos, setArchivos, fields */}) => {
    /* console.log(fields)
    const producto = {
        imagen: archivos, 
        color: JSON.stringify({hex: color.hex}),
        name: fields.name,
        description: fields.description,
        price: fields.price,
        cantidadPedido: 'cantidadPedido'
    } 

    const dropHandler = (event) => {
        event.preventDefault();        
        const file = event.dataTransfer.items[0].getAsFile(); 
        logicaImagen(file);
        event.dataTransfer.items.clear();
    }

    const dragOverHandler = (event) => {
        event.preventDefault();
    }

    const previewFile = () => {
        const file    = document.querySelector('input[type=file]').files[0];
        logicaImagen(file);                
    }

    const logicaImagen = (file) => {
        const reader  = new FileReader();
        reader.onloadend = function () {           
            setArchivos(reader.result);
          }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setArchivos('');
        }
    }
 */
    return (
        <>
            <div id="drop_zone" className="well drop-zone file-over"
                /* onDrop={dropHandler}
                onDragOver={dragOverHandler} */>
                <p>Drag and drop image</p>                
               {/*  <CardProductoMuestra  producto={producto} />
                <input id="myimg" type="file" onChange={previewFile} className=""/> */}
            </div>           
        </>
    )
}
