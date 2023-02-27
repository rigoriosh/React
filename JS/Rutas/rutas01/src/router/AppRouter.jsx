import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "../auth/context/AuthProvider"
import { LoginPage } from "../auth/LoginPage"
import { PagePrivateTest } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { RutasPrivadas } from "./RutasPrivadas"

export const AppRouter = () => {
  return (
    <div style={{backgroundColor:'burlywood'}} >
        <h2>AppRouter</h2>
        <AuthProvider>
          <Routes>

              <Route path="login/*" element={
                <PublicRoute>
                  <Routes>
                    <Route path="/*" element={<LoginPage/>} />
                    <Route path="/pagetest" element={<PagePrivateTest/>} />
                  </Routes>
                  
                </PublicRoute>
              }/>

              <Route path="/*" element={
                <PrivateRoute>
                  <RutasPrivadas/>
                </PrivateRoute>
              }/>
              {/* <Route path="/*" element={}/> */}
          </Routes>
        </AuthProvider>
    </div>
  )
}
