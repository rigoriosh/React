import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TestAPage } from './TestAPage'

export const PagesRout = () => {
  return (
     <Routes>
        <Route path="/" element={<TestAPage/>} />

        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
