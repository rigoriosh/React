import React from 'react'
import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <div style={{backgroundColor:'aliceblue'}}>
        <h3>About</h3>
        <Link to={`/pagetest1/${'idtest121?sss=123'}`}>
            link to go search page
        </Link>

    </div>
  )
}
