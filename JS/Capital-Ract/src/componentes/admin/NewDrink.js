import React, { useEffect, useState } from 'react'
import ColorPicker, { useColor } from "react-color-palette";
import { useDispatch, useSelector } from 'react-redux';
import { addDrink, editDrinks, selectedDrink} from '../../actions/drinksActions';
import { useForm } from '../../hooks/useForm';

import { DragNdrop } from '../../utilsComponents/DragNdrop';
import { PaletColor } from '../../utilsComponents/PaletColor';

import Msgerror from '../helpersComponents/Msgerror'


export const NewDrink = ({history}) => {
    console.log("NewDrink")
    const dispatch = useDispatch();
    const defaultColor = "#823f3f"
    const [archivos, setArchivos] = useState('');//archivos hacer referencia a la imagen del producto
    const [drinkKinds, setDrinksKinds] = useState([]);
    const [idCategoria, setCategoria] = useState('select...');
    const [idKind, setidKind] = useState('select...');
    const [msgError, setMsgError] = useState("");
    const [color, setColor] = useColor("hex", defaultColor);
    let initialState = null;    
    const {drinksReducer} = useSelector(state => state);
    const {idDrinkSelected, drinks, categorias} = drinksReducer;
    console.log(drinksReducer)
    if(idDrinkSelected !== '' && idDrinkSelected !== undefined){
        console.log({idDrinkSelected})
        console.log({drinks})
        initialState = drinks.find(d => d.id === idDrinkSelected)
        if(archivos.length === 0 && initialState.imagen !== ""){            
            setArchivos(initialState.imagen)
        } 
        if(color.hex === defaultColor && initialState.color !== ""){
            setColor(JSON.parse(initialState.color))
        } 
        if (idCategoria === 'select...') {
            setCategoria(initialState.idCategoria)
        }
        if (idKind === 'select...') {
            setidKind(initialState.idKind)
        }
        console.log(initialState);
    }else{
        initialState = {
            id: '',
            name: '',
            description: '',
            price: 0,
            quantity: 0
        }
    }
    const [fields, handledInputChange] = useForm(initialState);
    const {id, name, description, price, quantity} = fields;    
    console.log({initialState})
    const handleForm = (e) =>{
        e.preventDefault();        
        console.log("objec2t");
        if (isFormValid()) {
            fields['color'] = JSON.stringify(color);
            fields['imagen'] = archivos;       
            fields['idCategoria'] = idCategoria;
            fields['idKind'] = idKind;
            if(fields.id === '')fields.id = Math.random();
            console.log(fields);
            (idDrinkSelected === '' || idDrinkSelected === undefined) ? dispatch(addDrink(fields)) : dispatch(editDrinks(idDrinkSelected, fields))
            regresar();
        }
    }

    const isFormValid = () => {
        
        if (name === '') {            
            setMsgError('El nombre de la bebida es requerido');
            return false;
        }
        if (idCategoria === 'select...'){
            setMsgError('La categoría de la bebida es requerido');
            return false;
        }
        if (idKind === 'select...'){
            setMsgError('El tipo de la bebida es requerido');
            return false;
        }
        if (description === ''){
            setMsgError('La descripción de la bebida es requerido');
            return false;
        }
        if (price < 1){
            setMsgError('El precio de la bebida es requerido');
            return false;
        }
        if (quantity < 1){
            setMsgError('La cantidad de bebidas es requerida');
            return false;
        }
        if (archivos.length ===  0){
            setMsgError('La imagen de la bebida es requerida');
            return false;
        }
        if (color.hex === defaultColor){            
            setMsgError('El color del fondo de la imagen es requerido');
            return false;
        }
        
        setMsgError("");        
        return true
    }

    const regresar = () => {
        history.push('/owner/admin/addDrinks');
        dispatch(selectedDrink(''));
    }

    useEffect(() => {       
        console.log(idCategoria)
        if (idCategoria !== 'select...') {
            const {tipos} = categorias.find(e => e.idCategoria === idCategoria);        
            console.log( tipos)
            setDrinksKinds(tipos)
        }        
    }, [categorias, idCategoria])
    
    return (
        <div style={{'marginTop': '20px'}}>          
              
            <button onClick={regresar} type="button" className="btn btn-dark btn-small btn-block " style={{"marginTop": "-30px"}} >                
                <i className="fa fa-arrow-left"></i>    Return                
            </button>

            <div style={{"marginTop": "20px"}}>    
            
            <form onSubmit={handleForm} >
                    {/* <div className="form-group">
                        <label style={{"marginTop": "45px"}}>ID by Firebase</label>
                        <input type="text" className="form-control" placeholder="Firebase ID" disabled
                            name="id" value={id}/>
                        <small className="form-text ">this field is auto generated</small>
                    </div> */}
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Drink name" required name="name" value={name} onChange={handledInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectCategory">Category</label>
                        <select id="selectCategory" onChange={s => setCategoria(s.target.value)} value={idCategoria} className="form-control">
                            <option value="select...">Select</option>
                            {
                                categorias.map(({idCategoria, nombreCategoria}) => {
                                    return <option key={idCategoria} value={idCategoria}>{nombreCategoria}</option>
                                })
                            }
                        </select>
                        {/* <input type="text" className="form-control" placeholder="Drink category" required name="categoryDrink" value={categoryDrink} onChange={handledInputChange}/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectDrinkTip">kind</label>
                        <select id="selectDrinkTip" onChange={s => setidKind(s.target.value)} value={idKind} className="form-control">
                            <option value="select...">Select</option>
                            {
                                drinkKinds.map(({idTipoCateg, nameTipo}) => {
                                    return <option key={idTipoCateg} value={idTipoCateg}>{nameTipo}</option>
                                })
                            }
                        </select>                        
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <input type="text" className="form-control" placeholder="Drink Description" required name="description" value={description} onChange={handledInputChange}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input type="number" className="form-control" placeholder="Drink Price" required name="price" value={price}  onChange={handledInputChange}/>
                    </div>
                    <div className="form-group">
                        <label >Quantity</label>
                        <input type="number" className="form-control" placeholder="Drink Quantity" required name="quantity" value={quantity} onChange={handledInputChange}/>
                    </div>
                    <div className="col-md-4" style={{"padding": "0px"}}>                                                      
                        <DragNdrop color={color} archivos={archivos} setArchivos={setArchivos} fields={fields}/>
                        <PaletColor ColorPicker={ColorPicker} setColor={setColor} color={color}/>
                        
                    </div>
                    
                    <Msgerror msgError = {msgError}/>
                   

                    <div className="form-group text-center mt-3 mb-5 pb-3">
                        <button className="btn btn-success" type="submit">
                            <i className="fa fa-save"></i>
                            Save
                        </button>
                        <button className="btn btn-primary" onClick={regresar} type="button">
                        <i className="fa fa-arrow-left"></i>
                            Return 
                        </button>
                    </div>
            </form>
            </div>
        </div>
    )
}
