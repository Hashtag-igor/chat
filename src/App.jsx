import React, { useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import {  useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import {  useCollectionData } from "react-firebase-hooks/firestore";
import { app, databaseApp } from "./services/firebaseConfig";
import { limit, collection, orderBy, query, serverTimestamp, addDoc } from "firebase/firestore";
import './global.css';

const auth = getAuth(app);

export const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <header>
        <h1>ReactChat</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export const ChatRoom = () => {
  //const dummy = useRef()
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp()
    });
    setFormValue('')
    //dummy.current.scrollItoView({behavior: "smooth"})
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit"  disabled={!formValue}>Enviar</button>
      </form>
    </>
  );
};

export const ChatMessage = (props) =>{
  const {text, photoURL, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL }/>
      <p>{text}</p>
    </div>
  )
}

export const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  
  return (
      <button className="sign-in" onClick={() => signInWithGoogle()}>
        Logar com o Google
      </button>
  );
}

export const SignOut = () => {
  return (
      auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sair
        </button>
      )
  );
}