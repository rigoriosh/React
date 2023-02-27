import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export const LoginPage = () => {
    
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const goHome = () => {
        console.log("goLogout");

        // revisa el ultimo path empleado
        const lastPath = localStorage.getItem('lastPath') || '/';

        login("Rigo Rios")
        navigate(lastPath,{
            replace:true
        })
    }
    const goPageTest = () => {
      console.log("goPageTest");
      navigate("/login/pagetest",{
          replace:true
      })
  }
  return (
    <>
        <h3>LoginPage</h3>
        <button className="btn btn-primary" onClick={goHome}>go home</button>
        <br />
        <br />
        <button className="btn btn-primary" onClick={goPageTest}>go Page Test</button>
    </>
  )
}
