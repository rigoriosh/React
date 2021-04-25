import { useContext, useState} from "react";
import { MyVistasContext } from "../../contexts/Context";
import { tiposAdmin, tipovistaAdProduct } from "../../tipos/tipos";
import { NewProduct } from "./NewProduct";


const vistasAdProduct:tipovistaAdProduct = {
    homeProducts: 'homeProduct',
    drinks: 'drink',
    coffes: 'coffe',
    foods: 'food',
    newProduct: 'newProduct'
}

type VistasAdmin = {
    vistasAdmin: string
    setVistasAdmin:(c: string) => void
  }


export const AdProductd = ({vistasAdmin, setVistasAdmin}:VistasAdmin) => {
    console.log('in AdProductd');
    const {setVistasGlobal} = useContext(MyVistasContext);
    const [vistaAddProduct, setVistaAddProduct] = useState(vistasAdProduct.homeProducts);
    return (
        <div className="">
            
            {
                (vistaAddProduct !== vistasAdProduct.newProduct) && 
                    <>
                        <hr/>
                            <h1>{vistaAddProduct}'s List</h1>
                        <hr/>
                    </>
            }
            

           
            {
                (vistaAddProduct !== vistasAdProduct.homeProducts && vistaAddProduct !== vistasAdProduct.newProduct) && 
                <>                    
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-success" onClick={()=>setVistaAddProduct(vistasAdProduct.newProduct)}><i className="fa fa-plus"></i></button>            
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
                            {/* {
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
                            }  */}
                        </tbody>
                    </table>                   
                </>
            }  
            {
                (vistaAddProduct === vistasAdProduct.newProduct) && <NewProduct vistasAdProduct={vistasAdProduct} vistaAddProduct={vistaAddProduct} setVistaAddProduct={setVistaAddProduct}/>
                    
            } 

            <div className="position-absolute bottom-0 end-0 pb-1">
                {
                    (vistaAddProduct !== vistasAdProduct.coffes && vistaAddProduct !== vistasAdProduct.newProduct) && 
                    <button onClick={()=>setVistaAddProduct(vistasAdProduct.coffes)} className="btn btn-outline-info">Coffes</button>                    
                    
                }
                {
                    (vistaAddProduct !== vistasAdProduct.drinks && vistaAddProduct !== vistasAdProduct.newProduct) && 
                    <button onClick={()=>setVistaAddProduct(vistasAdProduct.drinks)} className="btn btn-outline-info">Drinks</button>                    
                    
                }
                {
                    (vistaAddProduct !== vistasAdProduct.foods && vistaAddProduct !== vistasAdProduct.newProduct) && 
                    <button onClick={()=>setVistaAddProduct(vistasAdProduct.foods)} className="btn btn-outline-info">Foods</button>                    
                    
                }                
            </div>
            {
                (vistaAddProduct !== vistasAdProduct.newProduct) && <button onClick={() => setVistasAdmin(tiposAdmin.homeAdmin)} className="btn btn-outline-warning btn-block position-absolute bottom-0 start-0 mb-1"><i className="fa fa-arrow-left"></i></button>
            }            

            {/* {
                (vistaAddProduct === vistasAdProduct.drinks) && 
                    <div className="position-absolute bottom-0 end-0 pb-1">                       
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.coffes)} className="btn btn-outline-info">Coffes</button>
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.foods)} className="btn btn-outline-info">Foods</button>
                    </div>
            }
            {
                (vistaAddProduct === vistasAdProduct.coffes) && 
                    <div className="position-absolute bottom-0 end-0 pb-1">
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.drinks)} className="btn btn-outline-info">Drinks</button>                        
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.foods)} className="btn btn-outline-info">Foods</button>
                    </div>
            }
            {
                (vistaAddProduct === vistasAdProduct.foods) && 
                    <div className="position-absolute bottom-0 end-0 pb-1">
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.drinks)} className="btn btn-outline-info">Drinks</button>
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.coffes)} className="btn btn-outline-info">Coffes</button>                        
                    </div>
            }
            {
                (vistaAddProduct === vistasAdProduct.homeProducts) && 
                <>
                    <div className=" position-absolute bottom-0 end-0 mb-1">                        
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.drinks)}  className="btn btn-outline-info">Drinks</button>
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.coffes)} className="btn btn-outline-info">Coffes</button>
                        <button onClick={()=>setVistaAddProduct(vistasAdProduct.foods)} className="btn btn-outline-info">Foods</button>                        
                    </div>
                    <button onClick={() => setVistasAdmin(tiposAdmin.homeAdmin)} className="btn btn-outline-warning btn-block position-absolute bottom-0 start-0 mb-1">Return</button>
                </>
            } */}
        </div>
        
    )
    /*  {
                        (drinks.length === 0) && (
                            <div className="aler alert-warning text-center mt-3 animate__bounce">
                                <h4 className="alert-heading">Whitout Products in your stock</h4>
                                <p>
                                    <i className="fa fa-exclamation fa-2x"></i>
                                </p>        
                            </div>
                        )
                    } */
}




