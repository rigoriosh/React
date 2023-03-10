import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
export const NavBar = () => {
    const {authState, logout} = useContext(AuthContext)

    const navigate = useNavigate();
    const goLogout = () => {
        console.log("goLogout");
        logout();
        navigate("/login",{
            replace: true
        })
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Asociaciones{" "}
      </Link>
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className={({isActive}) => `nav-item nav-link ${isActive?'active':''}`}  to="/about">
            About{" "}
          </NavLink>
          <NavLink className={({isActive}) => `nav-item nav-link ${isActive?'active':''}`} to="/pagetest1">
            pagetest1{" "}
          </NavLink>{" "}
          <NavLink className={({isActive}) => `nav-item nav-link ${isActive?'active':''}`} to="/search">
            Searchpage
          </NavLink>
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          {/* <NavLink className={({isActive}) => `nav-item nav-link ${isActive?'active':''}`} to="/login">
            Logout{" "}
          </NavLink>{" "} */}
          <span className="nav-item nav-link text-primary">
            {authState.user?.name}
          </span>
          <button onClick={goLogout}
            className="nav-item nav-link btn"
          >Logout</button>
        </ul>{" "}
      </div>{" "}
    </nav>
  );
};
