import {useState}from "react"
import {db} from "./supabaseClient.js"
import "./Calender.css"

function EditEntry({loadEntries,setEdit,id,setEditContent,setEditTitle,editTitle,editContent}){
    async function handleSave(id){
        const{error}=await db.from("userInfo").update({title:editTitle,content:editContent,created_at:new Date().toISOString()}).eq("id",id).select();
        if(error){
            alert("編輯失敗");
            console.log(error);
        }
        else{
            alert("編輯成功");
            loadEntries();
            setEdit(null);
        }
    }
    return(
    <>
        <div className="show-create-new" >
            <input onChange={(e)=>setEditTitle(e.target.value)} value={editTitle}/>
            <textarea onChange={(e)=>setEditContent(e.target.value)} value={editContent}/>
            <button onClick={()=>handleSave(id)}>儲存編輯</button>
            <button onClick={()=>setEdit(null)}>取消編輯</button>
        </div>
    </>
    )
}
export default EditEntry;