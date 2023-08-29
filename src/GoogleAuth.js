import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  return (
    <div className="google w-100 mt-3">
      <GoogleOAuthProvider clientId="242630617179-gmqj3ud6s3cgtd5hths9eqrftd63bcg6.apps.googleusercontent.com">
        <div className="auth">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;
