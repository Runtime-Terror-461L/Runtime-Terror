
import React from "react";

function SignOutButton(){

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
        window.location.reload();

        
    }
    return(
        <>
            <button onClick={SignOutUser}>Sign Out</button>

        </>
    )
}
export default SignOutButton