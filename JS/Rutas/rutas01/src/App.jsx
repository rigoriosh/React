import React from 'react'
import { AppRouter } from './router/AppRouter'
import { NavBar } from './userInterface/NavBar'

export const App = () => {
  return (
    <div style={{backgroundColor:'brown', height:'100vh'}}> 
      <h1>App</h1>
      <AppRouter/>
    </div>
  )
}
