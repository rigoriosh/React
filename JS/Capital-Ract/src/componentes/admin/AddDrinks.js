import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDrink, selectedDrink} from '../../actions/drinksActions';

export const AddDrinks = ({history}) => {
    const dispatch = useDispatch()
    const {drinksReducer} = useSelector(state => state);
    let drinks = [];
    if(drinksReducer.drinks !== undefined) drinks = drinksReducer.drinks
    console.log(drinks);
    
    
    const eliminarDrink = (id) => {
        console.log({id});
        dispatch(deleteDrink(id));
        history.push('/owner/admin/addDrinks');//para actualizar la tabla
    }
    const editDrink = (id) => {     
        console.log({id});   
        dispatch(selectedDrink(id));
        newDrink();
    }
    const regresar = () => {
        history.push('/owner/admin');
    }
    const newDrink = () => {
        history.push('/owner/admin/NewDrink');
    }

    useEffect(() => {
        console.log(drinksReducer);
    }, [drinksReducer])
    return (
        <div className="container">
            
            <button type="button" className="btn btn-dark btn-block" onClick={regresar}>
                <i className="fa fa-arrow-left"></i> Return            
            </button>
            <hr/>
            <h1>Drinks's List</h1>
            <hr/>
            <div className="row">
                <div className="col text-right">
                    <button className="btn btn-primary" onClick={newDrink}><i className="fa fa-plus"></i></button>            
                </div>
            </div>
            <table className="table table-sm table-striped table-dark mt-3 animate__headShake" >
                <thead>
                <tr>            
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>            
                </tr>
                </thead>
                <tbody>
                    {
                        drinks.map(e => (
                            <tr key={e.id} className="table-active" >                            
                                <th scope="row">{e.name}</th>
                                <td>{e.price}</td>                    
                                <td>{e.quantity}</td>
                                <td>
                                <button className="btn btn-info mr-1 btn-sm" onClick={() => {editDrink(e.id)}}>
                                    <i className="fa fa-pen"></i>                
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => {eliminarDrink(e.id)}}>
                                    <i className="fa fa-trash"></i>                
                                </button>
                                </td>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
            {
                (drinks.length === 0) && (
                    <div className="aler alert-warning text-center mt-3 animate__bounce">
                        <h4 className="alert-heading">Whitout Products in your stock</h4>
                        <p>
                            <i className="fa fa-exclamation fa-2x"></i>
                        </p>        
                    </div>
                )
            }


        </div>
    )
}
