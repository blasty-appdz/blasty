import { C, BRAND } from "../constants";

function SplashScreen({ onGo }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${C.blue},${C.blueDeep})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, position:"relative", overflow:"hidden" }}>
      {[["-70px","-70px",280],[null,"-50px",200,"70px"],["38%","25%",130]].map(([t,r,s,l],i)=>(
        <div key={i} style={{ position:"absolute", top:t||"auto", right:r||"auto", left:l||"auto", bottom:i===2?"8%":"auto", width:s, height:s, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
      ))}
      <div style={{ width:114, height:114, borderRadius:34, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:60, marginBottom:10, boxShadow:"0 20px 50px rgba(0,0,0,.25)", backdropFilter:"blur(10px)" }}>📅</div>
      <div style={{ fontSize:44, fontWeight:900, color:C.white, letterSpacing:-1, marginBottom:6 }}>{BRAND}</div>
      <div style={{ fontSize:15, color:"rgba(255,255,255,.8)", textAlign:"center", lineHeight:1.8, marginBottom:10 }}>Réservez en quelques secondes.</div>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:36, marginTop:6 }}>
        {["🩺 Santé","💇 Beauté","💅 Esthétique","💆 Bien-être","🍽 Resto","🏨 Hôtel","🚕 Taxi","📸 Photo"].map(lb=>(
          <span key={lb} style={{ background:"rgba(255,255,255,.15)", color:C.white, borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:600, backdropFilter:"blur(4px)" }}>{lb}</span>
        ))}
      </div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
        <button onClick={()=>onGo("login")} style={{ background:"rgba(255,255,255,.95)", color:C.blue, border:"none", borderRadius:18, padding:"17px", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 24px rgba(0,0,0,.2)" }}>Se connecter</button>
        <button onClick={()=>onGo("register")} style={{ background:"transparent", color:C.white, border:"2px solid rgba(255,255,255,.5)", borderRadius:18, padding:"16px", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Créer un compte</button>
      </div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:24 }}>Fait à Oran avec amour · {BRAND} v1.0</div>
    </div>
  );
}

export default SplashScreen;
