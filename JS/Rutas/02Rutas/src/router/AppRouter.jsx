import {Routes, Route} from "react-router-dom"
import { PagesRout } from "../app/pages/PagesRout"
import { AuthRoutes } from "../auth/routes/AuthRoutes"


export const AppRouter = () => {
  return (
    <Routes>

        {/* Rutas Login y Registro */}
        <Route path="/auth/*" element={<AuthRoutes />}/>

        {/* Rutas App */}
        <Route path="/*" element={ <PagesRout/>}/>


    </Routes>
  )
}
