import { C, BRAND } from "../constants";
import GradHeader from "../components/GradHeader";
import Card from "../components/Card";
import { OutlineBtn } from "../components/Buttons";

function ProfileScreen({ user, isAr, onLogout }) {
  const items = [
    ["👤", isAr?"المعلومات الشخصية":"Informations personnelles"],
    ["🔔", isAr?"الإشعارات":"Notifications"],
    ["🔒", isAr?"الأمان":"Sécurité"],
    ["🌍", isAr?"اللغة والمنطقة":"Langue & région"],
    ["⭐", isAr?"تقييماتي":"Mes avis"],
    ["❓", isAr?"المساعدة":"Aide & support"],
    ["📜", isAr?"الشروط العامة":"CGU"],
  ];
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <div style={{ width:74, height:74, borderRadius:22, background:"rgba(255,255,255,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 14px" }}>👤</div>
        <div style={{ fontSize:20, fontWeight:900, color:C.white, textAlign:"center" }}>{user.name}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.75)", textAlign:"center", marginTop:4 }}>{user.phone}</div>
        <div style={{ display:"flex", justifyContent:"center", marginTop:12 }}>
          <span style={{ background:"rgba(255,255,255,.2)", color:C.white, borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700 }}>
            {user.role === "client" ? (isAr?"👤 عميل":"👤 Client") : (isAr?"💼 محترف":"💼 Professionnel")}
          </span>
        </div>
      </GradHeader>
      <div style={{ padding:"20px 20px" }}>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {items.map(([ic,lb],i) => (
            <div key={lb} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderBottom:i<items.length-1?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <span style={{ fontSize:22 }}>{ic}</span>
              <span style={{ fontSize:14, fontWeight:600, color:C.dark, flex:1 }}>{lb}</span>
              <span style={{ color:C.muted }}>›</span>
            </div>
          ))}
        </Card>
        <OutlineBtn onClick={onLogout} style={{ marginTop:20 }}>🚪 {isAr ? "تسجيل الخروج" : "Se déconnecter"}</OutlineBtn>
        <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:C.muted }}>{BRAND} v1.0.0 · 🇩🇿 Oran, Algérie</div>
      </div>
    </div>
  );
}

export default ProfileScreen;
