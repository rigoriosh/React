import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, selectedFood} from '../../actions/foodsActions';

export const AddFoods = ({history}) => {
    const dispatch = useDispatch()
    const {foodsReducer} = useSelector(state => state);
    let foods = []
    if(foodsReducer.foods !== undefined) foods = foodsReducer.foods
    console.log(foods);
    
    
    const eliminarFood = (id) => {
        console.log({id});
        dispatch(deleteFood(id));
        history.push('/owner/admin/addFoods');//para actualizar la tabla
    }
    const editFood = (id) => {     
        console.log({id});   
        dispatch(selectedFood(id));
        newFood();
    }
    const regresar = () => {
        history.push('/owner/admin');
    }
    const newFood = () => {
        history.push('/owner/admin/NewFood');
    }

    useEffect(() => {
        console.log(foodsReducer);
    }, [foodsReducer])
    return (
        <>
            
            <button type="button" className="btn btn-dark btn-block" onClick={regresar}>
                <i className="fa fa-arrow-left"></i> Return            
            </button>
            <hr/>
            <h1>Foods's List</h1>
            <hr/>
            <div className="row">
                <div className="col text-right">
                    <button className="btn btn-primary" onClick={newFood}><i className="fa fa-plus"></i></button>            
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
                        foods.map(e => (
                            <tr key={e.id} className="table-active" >                            
                                <th scope="row">{e.name}</th>
                                <td>{e.price}</td>                    
                                <td>{e.quantity}</td>
                                <td>
                                <button className="btn btn-info mr-1 btn-sm" onClick={() => {editFood(e.id)}}>
                                    <i className="fa fa-pen"></i>                
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => {eliminarFood(e.id)}}>
                                    <i className="fa fa-trash"></i>                
                                </button>
                                </td>
                            </tr>
                        ))
                    }
                          
                </tbody>
            </table>
            {
                (foods.length === 0) && (
                    <div className="aler alert-warning text-center mt-3 animate__bounce">
                        <h4 className="alert-heading">Whitout Products in your stock</h4>
                        <p>
                            <i className="fa fa-exclamation fa-2x"></i>
                        </p>        
                    </div>
                )
            }




        </>
    )
}
