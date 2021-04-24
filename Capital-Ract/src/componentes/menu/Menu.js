import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { MenuContext } from '../../context/MenuContext';
import { MenuProducts } from './menuProducts';
//import { MenuFoods } from './menuFoods';
import { Pedido } from './Pedido';

export const Menu = ({history}) => {
    const state = useSelector(state => state);    
    const {drinksReducer} = state;
    const menuContext = useContext(MenuContext);
    const {pedido} = menuContext;
    const [selecMenu, setSelecMenu] = useState('');    
    const [updateMenu, setupdateMenu] = useState(false);        
    //const menuFoods = foodsReducer.foods;
    const quitarProductosSinPedidos = (pedido) =>{
        console.log({pedido});
        let itemsAeliminar = [];
        pedido.forEach((e, i) => {
            if(e.cuantasPidieron === 0) itemsAeliminar.push(i);
        });
        itemsAeliminar.forEach(i => {
            pedido.splice(i,1);
        });
        console.log({pedido});
    }
    const selectTipoDrink = () => {
        console.log({selecMenu});
        console.log(drinksReducer.drinks);
        return drinksReducer.drinks.filter(p => p.idCategoria === selecMenu);        
    }
    let menuDrinks = selectTipoDrink();
    quitarProductosSinPedidos(pedido);
    console.log({menuDrinks});
    console.log({menuContext});
    console.log({history});
    
    return (
        <div className="cardsMenu animated fadeIn faster">                       

                {
                    (pedido.length > 0) && (
                        <Pedido history={history}/>
                    )
                }
            
                {
                    (selecMenu === '')
                    && (
                        <div className="col mt-1" >        
                            <div className="alert alert-secondary text-center" role="alert">Que deseas pedir?</div>     
                            <div className="row justify-content-around">                                           
                                <button onClick={()=>{setSelecMenu('Coffes')}} type="button" className="btn btn-secondary ">Coffes <i className="fas fa-glass-cheers"></i></button>
                                <button onClick={()=>{setSelecMenu('Drinks')}} type="button" className="btn btn-warning ">Drinks <i className="fas fa-glass-cheers"></i></button>
                                <button onClick={()=>{setSelecMenu('Foods')}} type="button" className="btn btn-success ">Foods <i className="fas fa-pizza-slice"></i></button>
                            </div>
                        </div>
                    )
                }
                {
                    (selecMenu === 'Drinks')
                    && (
                        <div className="col">
                            <div className="row justify-content-end">
                                <button onClick={()=>{setSelecMenu('Coffes')}} type="button" className="btn btn-secondary ">Coffes <i className="fas fa-glass-cheers"></i></button>
                                <button onClick={()=>{setSelecMenu('Foods')}} type="button" className="btn btn-success ">Foods <i className="fas fa-pizza-slice"></i></button>
                            </div>                            
                            <MenuProducts products={menuDrinks} updateMenu={updateMenu} setupdateMenu = {setupdateMenu}/>
                        </div>
                    )
                }
                {
                    (selecMenu === 'Coffes')
                    && (
                        <div className="col">
                            <div className="row justify-content-end">
                                <button onClick={()=>{setSelecMenu('Drinks')}} type="button" className="btn btn-warning ">Drinks <i className="fas fa-glass-cheers"></i></button>
                                <button onClick={()=>{setSelecMenu('Foods')}} type="button" className="btn btn-success ">Foods <i className="fas fa-pizza-slice"></i></button>
                            </div>    
                            <MenuProducts products={menuDrinks} updateMenu={updateMenu} setupdateMenu = {setupdateMenu}/>
                        </div>
                    )
                }
                {
                    (selecMenu === 'Foods')
                    && (
                        <div className="col">
                            <div className="row justify-content-end">
                                <button onClick={()=>{setSelecMenu('Drinks')}} type="button" className="btn btn-warning ">Drinks <i className="fas fa-glass-cheers"></i></button>
                                <button onClick={()=>{setSelecMenu('Coffes')}} type="button" className="btn btn-secondary ">Coffes <i className="fas fa-glass-cheers"></i></button>
                            </div>
                            <MenuProducts products={menuDrinks} updateMenu={updateMenu} setupdateMenu = {setupdateMenu}/>
                        </div>
                    )
                }
                
          
            

{/* 
            <div onClick={goDrinks} className="card text-white bg-info mb-3" style={{"maxWidth": "18rem"}}>
                <div className="card-header text-center">Bebidas</div>
                <div className="card-body">
                    <h5 className="card-title">Disfruta de las mejores bebidas, para los mejores momentos.</h5>
                    
                </div>
            </div>
            <div onClick={goFoods} className="card text-white bg-success mb-3" style={{"maxWidth": "18rem"}}>
                <div className="card-header text-center">Comidas</div>
                <div className="card-body">
                    <h5 className="card-title ">Acompaña esos momentos con algo delicioso para picar.</h5>
                    
                </div>
            </div>
         */}    
        </div>
    )
}
