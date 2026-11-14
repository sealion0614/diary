import{db}from './supabaseClient.js'
import {useState,useEffect} from "react"
import NewEntry from "./NewEntry.jsx"
import Entries from "./Entries.jsx"
import EditEntry from "./EditEntry.jsx"
import "./Calender.css"
function Calender({session}){
    const [editTitle,setEditTitle]=useState("");
    const [editContent,setEditContent]=useState("");
    const [entries,setEntries]=useState([]);
    const [edit,setEdit]=useState(null);
    const [showCreateNew,setShowCreateNew]=useState(false);
    
    async function handleSignOut(){
        const {error}=await db.auth.signOut();
        if(error){
            alert("登出失敗");
        }
    }
    async function loadEntries(){
        console.time("load");
        const{data,error}=await db.from("userInfo").select("*").order("created_at",{ascending:false});
        console.timeEnd("load");
        if(error){
            alert("讀取失敗");
        }
        else{
            setEntries(data);
            console.log(data);
        }
    }
    useEffect(()=>{
        loadEntries();
    },[]);
    return(
    <>
    <h1>這是{session.user.email}的日誌</h1>
    <button onClick={handleSignOut}>登出</button>
    <button onClick={()=>setShowCreateNew(true)}>建立文章</button>
    {showCreateNew&&<NewEntry loadEntries={loadEntries} setShowCreateNew={setShowCreateNew}/>}
    {(edit!=null)&&
    <EditEntry loadEntries={loadEntries} setEdit={setEdit} setEditTitle={setEditTitle} editTitle={editTitle} setEditContent={setEditContent} editContent={editContent} id={edit.id}/>}
    {entries.map((entry)=>(
        <Entries entry={entry} loadEntries={loadEntries} setEdit={setEdit} setEditTitle={setEditTitle} setEditContent={setEditContent}/>
    ))}
    </>
    )
}
export default Calender;