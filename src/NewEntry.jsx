import {useState}from "react"
import {db} from "./supabaseClient.js"
import "./Calender.css"

function NewEntry({setShowCreateNew,loadEntries}){
    const [content,setContent]=useState("");
    const [title,setTitle]=useState("");

    async function handleAdd(){
        const{error}=await db.from("userInfo").insert({title,content});
        if(error){
            alert("儲存失敗");
            console.log(error);
            return;
        }
        else{
            alert("建立成功");
            setTitle("");
            setContent("");
        }
        setShowCreateNew(false);
        loadEntries();
    }
    return(
    <>
        <div className="show-create-new">
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="在這裡寫下你的標題"/>
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder="在這裡寫下你的內文"/>
            <button onClick={handleAdd}>新增此文</button>
            <button onClick={()=>setShowCreateNew(false)}>取消新增</button>
        </div>
    </>
    );    
}
export default NewEntry;