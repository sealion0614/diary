import {useState}from "react"
import {db} from "./supabaseClient.js"
import "./Calender.css"
import Markdown from "react-markdown"

function Entries({entry,setEdit,setEditTitle,setEditContent,loadEntries}){
    const[deleteCheck,setDeleteCheck]=useState(null);
    const[checked,setChecked]=useState(false);
    async function handleDelete(id){
        setDeleteCheck(null);
        const{error}=await db.from("userInfo").delete().eq("id",id);
        if(error){
            alert("刪除失敗");
            console.log(error);
        }
        else{
            alert("刪除成功");
            loadEntries();
        }
    }
    return(
    <>
        <div key={entry.id} className="entry">
            <h2>{entry.title}</h2>
            <small>最後編輯時間：{new Date(entry.created_at).toLocaleString()}</small>
            <div className="content">
                <Markdown>{entry.content}</Markdown>
            </div>
            <button onClick={()=>setDeleteCheck(entry)}>刪除</button>
            <button onClick={()=>{
                setEdit(entry);
                setEditContent(entry.content);
                setEditTitle(entry.title);
            }}>編輯</button>
        </div>
        {deleteCheck&&
        <div className="show-create-new">
            <label>
                <input type="checkbox" checked={checked} onChange={(e)=>setChecked(e.target.checked)}/>
                確定要刪除{deleteCheck.title}嗎?
            </label>
            <button disabled={!checked} onClick={()=>handleDelete(deleteCheck.id)}>確定刪除</button>
            <button onClick={()=>setDeleteCheck(null)}>取消</button>
        </div>}
    </>
    )
}
export default Entries;