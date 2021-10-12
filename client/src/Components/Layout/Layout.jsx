import React from "react"
import Navbar from "../Navbar/Navbar"

const Layout=({children})=>{
    return(
        <div style={{overflowX:"hidden"}}>
            
            <Navbar/>
            
            {children}
        </div>
    )
}

export default Layout