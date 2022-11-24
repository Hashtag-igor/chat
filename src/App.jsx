import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import './App.css';

export const App = () => {
  return (
    <div className="App">
      
    </div>
  );
}

export const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle();
  
  return (
    <>
      <button className="sign-in" onClick={() => signInWithGoogle()}>Logar com o Google</button>
    </>
  );
}