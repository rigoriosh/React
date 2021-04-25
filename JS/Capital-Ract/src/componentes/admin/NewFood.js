import React, { useEffect, useState } from 'react'
import ColorPicker, { useColor } from "react-color-palette";
import { useDispatch, useSelector } from 'react-redux';
import { addFood, editFood, selectedFood} from '../../actions/foodsActions';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

import { DragNdrop } from '../../utilsComponents/DragNdrop';
import { PaletColor } from '../../utilsComponents/PaletColor';


export const NewFood = ({history}) => {
    const dispatch = useDispatch();
    const defaultColor = "#823f3f"
    const [archivos, setArchivos] = useState([]);//archivos hacer referencia a la imagen del producto
    const [idCategoria, setCategoria] = useState('select...');
    const [foodKinds, setFoodsKinds] = useState([]);
    const [idKind, setidKind] = useState('select...');
    const [color, setColor] = useColor("hex", defaultColor);
    let initialState = null;    
    const {ui, foodsReducer} = useSelector(state => state);//ui es para los mensajes de error    
    const {idSelected, foods, categorias} = foodsReducer;
    console.log(foodsReducer)
    if(idSelected !== '' && idSelected !== undefined){
        console.log({idSelected})
        console.log({foods})
        initialState = foods.find(d => d.id === idSelected)
        if(archivos.length === 0 && initialState.imagen !== ""){            
            setArchivos([initialState.imagen])
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
            quantity: 0,
        }
    }
    const [fields, handledInputChange] = useForm(initialState);
    const {id, name, description, price, quantity} = fields;    

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
            (idSelected === '' || idSelected === undefined) ? dispatch(addFood(fields)) : dispatch(editFood(idSelected, fields))
            regresar();
        }
    }

    const isFormValid = () => {
        
        if (name === '') {            
            dispatch(setErrorAction('El nombre de la bebida es requerido'));
            return false;
        }
        if (idCategoria === 'select...'){
            dispatch(setErrorAction('La categoría de la bebida es requerido'));
            return false;
        }
        if (idKind === 'select...'){
            dispatch(setErrorAction('El tipo de la bebida es requerido'));
            return false;
        }
        if (description === ''){
            dispatch(setErrorAction('La descripción de la bebida es requerido'));
            return false;
        }
        if (price < 1){
            dispatch(setErrorAction('El precio de la bebida es requerido'));
            return false;
        }
        if (quantity < 1){
            dispatch(setErrorAction('La cantidad de bebidas es requerida'));
            return false;
        }
        if (archivos.length ===  0){
            dispatch(setErrorAction('La imagen de la bebida es requerida'));
            return false;
        }
        if (color.hex === defaultColor){            
            dispatch(setErrorAction('El color del fondo de la imagen es requerido'));
            return false;
        }
        
        dispatch(removeErrorAction());        
        return true
    }

    const regresar = () => {
        history.push('/owner/admin/addFoods');
        dispatch(selectedFood(''));
    }

    useEffect(() => {       
        console.log(idCategoria)
        if (idCategoria !== 'select...') {
            const {tipos} = categorias.find(e => e.idCategoria === Number(idCategoria));        
            console.log( tipos)
            setFoodsKinds(tipos)
        }        
    }, [categorias, idCategoria])
    
    return (
        <div style={{'marginTop': '20px'}}>          
              
            <button onClick={regresar} type="button" className="btn btn-dark btn-small btn-block " style={{"marginTop": "-30px"}} >                
                <i className="fa fa-arrow-left"></i>    Return                
            </button>

            <div style={{"marginTop": "60px"}}>    
            
            <form onSubmit={handleForm} >
                    <div className="form-group">
                        <label style={{"marginTop": "45px"}}>ID by Firebase</label>
                        <input type="text" className="form-control" placeholder="Firebase ID" disabled
                            name="id" value={id}/>
                        <small className="form-text ">this field is auto generated</small>
                    </div>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Food name" required name="name" value={name} onChange={handledInputChange}/>
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
                        {/* <input type="text" className="form-control" placeholder="Food category" required name="categoryFood" value={categoryFood} onChange={handledInputChange}/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectFoodTip">Food kind</label>
                        <select id="selectFoodTip" onChange={s => setidKind(s.target.value)} value={idKind} className="form-control">
                            <option value="select...">Select</option>
                            {
                                foodKinds.map(({idTipoCateg, nameTipo}) => {
                                    return <option key={idTipoCateg} value={idTipoCateg}>{nameTipo}</option>
                                })
                            }
                        </select>                        
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <input type="text" className="form-control" placeholder="Food Description" required name="description" value={description} onChange={handledInputChange}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input type="number" className="form-control" placeholder="Food Price" required name="price" value={price}  onChange={handledInputChange}/>
                    </div>
                    <div className="form-group">
                        <label >Quantity</label>
                        <input type="number" className="form-control" placeholder="Food Quantity" required name="quantity" value={quantity} onChange={handledInputChange}/>
                    </div>
                    <div className="col-md-4" style={{"padding": "0px"}}>                                                      
                        <DragNdrop color={color} archivos={archivos} setArchivos={setArchivos} fields={fields}/>
                        <PaletColor ColorPicker={ColorPicker} setColor={setColor} color={color}/>
                        
                    </div>
                    
                    {//alert para los mensajes de validacion
                        ui.msgError && 
                            (
                                <>
                                    
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Nota!</strong> {ui.msgError}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>                                    
                            </>
                            )
                    } 

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
