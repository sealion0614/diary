import{useState}from"react";
import{db}from"./supabaseClient";
function Login(){
    const [showPassword,setShowpassword]=useState(false);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    async function handleSignUp(){
        const{error}=await db.auth.signUp({email,password});
        if(error){
            alert("註冊失敗");
        }
        else{
            alert("註冊成功");
        }
    }
    async function handleSignIn(){
        const{error}=await db.auth.signInWithPassword({email,password});
        if(error){
            alert("登入失敗");
        }
        else{
            alert("登入成功");
        }
    }
    return(
        <div>
            <input type="email" placeholder="email帳號" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type={showPassword?"text":"password"} placeholder="密碼" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>setShowpassword(!showPassword)}>{showPassword?"隱藏密碼":"顯示密碼"}</button>
            <button onClick={handleSignUp}>註冊</button>
            <button onClick={handleSignIn}>登入</button>
        </div>
    );
}
export default Login;