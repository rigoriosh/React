import React, { useState } from 'react'

/* 
Desde el padre traer:
    import ColorPicker, { useColor } from "react-color-palette";
    const [color, setColor] = useColor("hex", "#d99414");

    <PaletColor ColorPicker={ColorPicker} setColor={setColor} color={color}/>
 */
export const PaletColor = ({/* ColorPicker, setColor, color */}) => {

    const [showPalet, setShowPalet] = useState({display: 'none'});
    const [textBtnPaletaColor, setTextBtnPaletaColor] = useState('Cambiar color de fondo imagen ')
        
    return (
        <>
            <button className="btn btn-block btn-dark" type="button"
                onClick={()=>{
                    if(showPalet.display === 'none'){
                        setShowPalet({display: 'flex'});
                        setTextBtnPaletaColor('Ocultar paleta de colores');
                    }else {
                        setShowPalet({display: 'none'});
                        setTextBtnPaletaColor('Cambiar color de fondo imagen ');
                    }
                    
                    }}>
                {textBtnPaletaColor}                       
            </button> 
            <div id="setColor" style={showPalet}>
                {/* <ColorPicker width={300} height={100} color={color} onChange={setColor} hideHSB dark hideHEX hideRGB/> */}
            </div>
        </>
    )
}
