
import React from "react";
import { useNavigate } from "react-router-dom";

function SignOutButton(){
    let navigate = useNavigate();
    function SignOutUser(){
        fetch("/signout", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',            
            },
            credentials: 'include',
        }).then(res => res.json()
        ).then(data => alert(data.message));
        
        navigate('/');

        
    }
    return(
        <>
            <button onClick={SignOutUser}>Sign Out</button>

        </>
    )
}
export default SignOutButton