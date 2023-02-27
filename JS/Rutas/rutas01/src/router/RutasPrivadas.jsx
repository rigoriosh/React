import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../auth/context/AuthContext'
import { About, Home, PageTest1, SearchPage } from '../pages'
import { NavBar } from '../userInterface/NavBar'

export const RutasPrivadas = () => {

  return (
    <>
        <NavBar/>
        <div>RutasPrivadas</div>
        <div className='container'>
            <Routes>
                <Route path="home" element={<Home/>}></Route>
                <Route path="about" element={<About/>}></Route>
                <Route path="pagetest1/:idTest" element={<PageTest1/>}></Route>
                <Route path="search" element={<SearchPage/>}></Route>

                <Route path="/" element={<Navigate to="/home"/>}></Route>
            </Routes>
        </div>

    </>
  )
}
