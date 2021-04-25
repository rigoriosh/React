
import { useContext, useState } from "react";
import { MyVistasContext } from "../../contexts/Context";
import { tiposAdmin, tiposHome } from "../../tipos/tipos";
import { AdProductd } from "./AdProductd";




export const AdminScreen = () => {
    console.log('AdminScreen');
    const {setVistasGlobal} = useContext(MyVistasContext);
    const [vistasAdmin, setVistasAdmin] = useState(tiposAdmin.homeAdmin);    
    return (
        <>
            {
                (vistasAdmin === tiposAdmin.homeAdmin) && 
                <>
                    <h1 className="text-center">admin CAPITAL</h1>
                    <div className="position-absolute bottom-0 end-0 mb-1">
                        <button type="button" className="btn btn-outline-info" onClick={()=>setVistasAdmin(tiposAdmin.addProduct)}>Add Products</button>            
                        <button type="button" className="btn btn-outline-success" /* onClick={addRoles} */>Roles</button>
                    </div>
                    <button onClick={() => setVistasGlobal(tiposHome.home)} className="btn btn-outline-warning btn-block position-absolute bottom-0 start-0 mb-1"><i className="fa fa-arrow-left"></i></button>
                </>
            }
            {
                (vistasAdmin === tiposAdmin.addProduct) && 
                <>
                   <AdProductd vistasAdmin={vistasAdmin} setVistasAdmin={setVistasAdmin}/>
                </>
            }
            {
                (vistasAdmin === tiposAdmin.roles) && 
                <>
                </>
            }
            
            
        </>
    )
}
