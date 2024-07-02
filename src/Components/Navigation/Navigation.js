import React from "react";
import './Navigation.css'

const Navigation=({handleRoute,isSignedIn})=>{
    if(isSignedIn){
        return(
            <div className="nav">
                <button onClick={()=>handleRoute('signin')}>Signout</button>
            </div>
        )
    }else{
        return(
            <div className="nav">
                <button onClick={()=>handleRoute('signin')}>SignIn</button>
                <button className="ml3" onClick={()=>handleRoute('register')}>Register</button>
            </div>
        )
    }
    
}

export default Navigation;