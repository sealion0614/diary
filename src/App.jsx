import { useState,useEffect } from 'react'
import Login from "./Login.jsx"
import Calender from "./Calender.jsx"
import './App.css'
import{db}from './supabaseClient.js'

function App() {
  const [session,setSession]=useState(null);
  useEffect(()=>{
    db.auth.onAuthStateChange((e,s)=>{
      setSession(s);
      console.log(s.user.email);
    })
  },[]);
  return session?<Calender session={session}/>:<Login/>;
}

export default App
