import { useState } from 'react';
import { tipovistaAdProduct, tipoCategorias, FormData } from '../../tipos/tipos';
import { Input } from '../../utilsComponents/Input';



type argumentos = {    
    vistaAddProduct: string
    setVistaAddProduct:(c: string) => void,
    vistasAdProduct: tipovistaAdProduct
  }

type mistipos = {
    idTipo: string;
    nombreTipo: string;
}[]
const categorias: tipoCategorias = [
    {
        idCategoria: 'catg_1',
        nombreCategoria: 'Drinks',
        tipos: [
            {
                idTipo: 'id-d-1',
                nombreTipo: 'Aguardiante'
            },
            {
                idTipo: 'id-d-2',
                nombreTipo: 'Ron'
            },            
            {
                idTipo: 'id-d-3',
                nombreTipo: 'Teckila'
            },
            {
                idTipo: 'id-d-4',
                nombreTipo: 'Botca'
            },
            {
                idTipo: 'id-d-5',
                nombreTipo: 'Ginebra'
            },
            {
                idTipo: 'id-d-6',
                nombreTipo: 'Coctel'
            }
        ]
    },
    {
        idCategoria: 'catg_2',
        nombreCategoria: 'Coffe',
        tipos: [
            {
                idTipo: 'id-c-1',
                nombreTipo: 'Expresso'
            },
            {
                idTipo: 'id-c-2',
                nombreTipo: 'Late'
            },            
            {
                idTipo: 'id-c-3',
                nombreTipo: 'Mocca'
            },
            {
                idTipo: 'id-c-4',
                nombreTipo: 'Capuchino'
            },
            {
                idTipo: 'id-c-5',
                nombreTipo: 'MoccaChino'
            }
        ]
    },
    {
        idCategoria: 'catg_3',
        nombreCategoria: 'Foods',
        tipos: [
            {
                idTipo: 'id-f-1',
                nombreTipo: 'Empanadas'
            },
            {
                idTipo: 'id-f-2',
                nombreTipo: 'Pasteles'
            },            
            {
                idTipo: 'id-f-3',
                nombreTipo: 'Tortas'
            },
            {
                idTipo: 'id-f-4',
                nombreTipo: 'Pizzas'
            },
            {
                idTipo: 'id-f-5',
                nombreTipo: 'Humburger'
            },
            {
                idTipo: 'id-f-6',
                nombreTipo: 'Lazaña'
            }
        ]
    },
]

export const NewProduct = ({vistaAddProduct, setVistaAddProduct, vistasAdProduct}:argumentos) => {
    //console.log(vistaAddProduct);
    const initialDataForm = {idCategoria: '', idTipo: '', nombre: '', cantidad: 0, descripcion: '',
        precio: 0, foto: '', color: ''}
    const [formulario, setFormulario] = useState<FormData>(initialDataForm);
    const [tipos, setTipos] = useState <mistipos>([{idTipo: '', nombreTipo: ''}]);    
    const handleCategoria = (select: string) => {
        //console.log(select);
        const categoriaSeleccionada = categorias.find(e => e.idCategoria === select); 
        let tempData = [{idTipo: '', nombreTipo: ''}];
        if(categoriaSeleccionada !== undefined) tempData = categoriaSeleccionada?.tipos;
        let tempSelect = '';
        if(select !== undefined) tempSelect = select;
        setTipos(tempData);
        setFormulario({...formulario, idCategoria: tempSelect});        
    }
    console.log(formulario);
    return (
        <>
              
              
              <form autoComplete="off" >
                <label className="form-label">Category</label>
                <select id="selectCategory" onChange={s => handleCategoria(s.target.value)} value={formulario.idCategoria} className="form-select" aria-label="Default select example">
                    <option value="select...">Select</option>
                    {
                        categorias.map(({idCategoria, nombreCategoria}) => {
                            return <option key={idCategoria} value={idCategoria}>{nombreCategoria}</option>
                        })
                    }
                </select>
                <label htmlFor="selectDrinkTip">kind</label>
                <select id="selectDrinkTip" disabled={(formulario.idCategoria === '') && true} onChange={s => setFormulario({...formulario, idTipo: s.target.value})} value={formulario.idTipo} className="form-select">
                    <option value="select...">Select</option>
                        {
                            tipos.map(({idTipo, nombreTipo}) => {
                                return <option key={idTipo} value={idTipo}>{nombreTipo}</option>
                            })
                        }
                </select> 

                <Input formulario={formulario} setFormulario={setFormulario} label={'Name'}/>                
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Drink name" required name="name" value={formulario.nombre} onChange={s => setFormulario({...formulario, nombre: s.target.value})}/>
                
                    <label >Description</label>
                    <input type="text" className="form-control" placeholder="Drink Description" required name="description" value={formulario.descripcion} onChange={s => setFormulario({...formulario, descripcion: s.target.value})}/>
                
                
                    <label >Price</label>
                    <input type="number" min="1" step="any" className="form-control" placeholder="Drink Price" required name="price" value={formulario.precio} onChange={s => setFormulario({...formulario, precio: Number(s.target.value)})}/>
                
                
                    <label >Quantity</label>
                    <input type="number" className="form-control" placeholder="Drink Quantity" required name="quantity" value={formulario.cantidad} onChange={s => setFormulario({...formulario, cantidad: Number(s.target.value)})}/>
                      
                    <div className="col-md-4" style={{"padding": "0px"}}>                                                      
                        {/*  <DragNdrop color={color} archivos={archivos} setArchivos={setArchivos} fields={fields}/>
                        <PaletColor ColorPicker={ColorPicker} setColor={setColor} color={color}/> */}
                        
                    </div>
                      
                      {//alert para los mensajes de validacion
                          /* ui.msgError && 
                              (
                                  <>
                                      
                                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                  <strong>Nota!</strong> {ui.msgError}
                                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>                                    
                              </>
                              ) */
                      } 
  
                      <div className="form-group text-center mt-3 mb-5 pb-3">
                          <button className="btn btn-success" type="submit">
                              <i className="fa fa-save"></i></button>                          
                      </div>
              </form>
             
          
           
            <button onClick={() => setVistaAddProduct(vistasAdProduct.homeProducts)} className="btn btn-outline-warning btn-block position-absolute bottom-0 start-0 mb-1"><i className="fa fa-arrow-left"></i></button>
            
            
        </>
    )
}
