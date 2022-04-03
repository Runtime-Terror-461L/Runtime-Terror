import React from 'react'
import {
  Link,
} from "react-router-dom";
import { Nav } from './styles'

function Navbar(){ 
  return (
    <Nav>
            <Link to="/" style={{color:"white"}}>Home</Link>
            <Link to="signin"style={{color:"white"}}>Sign In</Link>
            <Link to="signup"style={{color:"white"}}>Sign Up</Link>
    </Nav>
  )
}
export default Navbar 