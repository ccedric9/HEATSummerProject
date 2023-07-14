import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";

export default function Login() {

    const [user, setUser] = React.useState({});


  const handleCallbackResponse = (response) => {
    console.log("response :" + response.credential);
    var decoded = jwt_decode(response.credential);
    console.log("decode :" , decoded);
    setUser(decoded);
    document.getElementById("signinDiv").hidden = true;
  }

  const handleSignout = () => {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
    }

  useEffect(() => {
    window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: handleCallbackResponse,
  });
  

    window.google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      {theme: "outline", size: "large", shape: "rectangular", text: "continue_with", width: "300px", height: "50px", prompt_parent_id: "g_id_onload"},
    );
  }, []);

  return (
    <div>
      <div id="signinDiv"></div>
      {
        Object.keys(user).length != 0 &&
        <button onClick={handleSignout}>Sign Out</button>
      }
      {
        user &&
        <div>
            <h3> Welcome {user.name} </h3>
            <img src={user.picture} alt="user" />
        </div>
      }
    </div>
  );
}
