import React, { useState } from 'react';
import { useEffect } from 'react';
import '../css/GoogleCreateUser.css';
import jwtDecode from 'jwt-decode';


// !!!!!!! Client Secret !!!!!!!
// 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

// !!!!!!! Client ID !!!!!!!
// 316960033546-4pnd0l53bbrj3u8qq3q9hpcn530dt96e.apps.googleusercontent.com



const GoogleCreateUser = () => {
    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwtDecode(response.credential)
        console.log(userObject);
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "316960033546-4pnd0l53bbrj3u8qq3q9hpcn530dt96e.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.querySelector(".google-sign"),
            { theme: 'outline', size: 'large' }
        )
    }, [])

    return (
        <div className="google-sign"></div>
    );
}

export default GoogleCreateUser;
