import { useState } from "react";
import { C } from "./constants";

import SplashScreen     from "./screens/SplashScreen";
import AuthScreen       from "./screens/AuthScreen";
import HomeScreen       from "./screens/HomeScreen";
import ProProfileScreen from "./screens/ProProfileScreen";
import BookingScreen    from "./screens/BookingScreen";
import SuccessScreen    from "./screens/SuccessScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import ProDashboard     from "./screens/ProDashboard";
import ProfileScreen    from "./screens/ProfileScreen";

export default function App() {
  const params    = new URLSearchParams(window.location.search);
  const isProUrl  = params.get("role") === "pro";
  const savedUser = (() => { try { const u = localStorage.getItem("blasty_user"); return u ? JSON.parse(u) : null; } catch(e) { return null; } })();
  const initScreen = isProUrl ? "register" : savedUser ? "app" : "splash";

  const [screen,  setScreen]  = useState(initScreen);
  const [appPage, setAppPage] = useState("home");
  const [user,    setUser]    = useState(savedUser || null);
  const [lang,    setLang]    = useState("fr");
  const [selPro,  setSelPro]  = useState(null);
  const [booking, setBooking] = useState(null);
  const isAr = lang === "ar";

  const handleAuth    = u   => { localStorage.setItem("blasty_user", JSON.stringify(u)); setUser(u); setScreen("app"); setAppPage("home"); };
  const handleBook    = pro => { setSelPro(pro); setAppPage("profile_pro"); };
  const handleBookNow = pro => { setSelPro(pro); setAppPage("booking"); };
  const handleConfirm = b   => { setBooking(b); setAppPage("success"); };
  const handleLogout  = ()  => { localStorage.removeItem("blasty_user"); setUser(null); setScreen("splash"); };

  const NAV = user?.role === "professionnel"
    ? [["home","🏠",isAr?"الرئيسية":"Accueil"],["pro","📊",isAr?"داشبورد":"Dashboard"],["profile","👤",isAr?"حساب":"Profil"]]
    : [["home","🏠",isAr?"الرئيسية":"Accueil"],["myrdv","📅",isAr?"مواعيدي":"Mes RDV"],["profile","👤",isAr?"حساب":"Profil"]];

  const fonts = <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet" />;

  if (screen === "splash")   return <>{fonts}<SplashScreen onGo={setScreen} /></>;
  if (screen === "login")    return <>{fonts}<AuthScreen mode="login"    onAuth={handleAuth} onSwitch={() => setScreen("register")} /></>;
  if (screen === "register") return <>{fonts}<AuthScreen mode="register" onAuth={handleAuth} onSwitch={() => setScreen("login")}    /></>;

  return (
    <div style={{ fontFamily:"'Sora','Tajawal',sans-serif", minHeight:"100vh", background:C.bg, color:C.text, direction:isAr?"rtl":"ltr", maxWidth:430, margin:"0 auto", position:"relative" }}>
      {fonts}
      {appPage === "home"        && <HomeScreen       user={user} isAr={isAr} lang={lang} setLang={setLang} onBook={handleBook} />}
      {appPage === "profile_pro" && selPro && <ProProfileScreen pro={selPro} isAr={isAr} onBack={() => setAppPage("home")} onBook={handleBookNow} />}
      {appPage === "booking"     && selPro && <BookingScreen    pro={selPro} user={user} isAr={isAr} onBack={() => setAppPage("home")} onConfirm={handleConfirm} />}
      {appPage === "success"     && booking && <SuccessScreen   booking={booking} isAr={isAr} onHome={() => setAppPage("home")} />}
      {appPage === "myrdv"       && <MyBookingsScreen user={user} isAr={isAr} />}
      {appPage === "pro"         && <ProDashboard     user={user} isAr={isAr} />}
      {appPage === "profile"     && <ProfileScreen    user={user} isAr={isAr} onLogout={handleLogout} />}

      {appPage !== "booking" && appPage !== "success" && appPage !== "profile_pro" && (
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"10px 0 20px", zIndex:200, boxShadow:"0 -4px 20px rgba(26,110,255,.08)" }}>
          {NAV.map(([id,ic,lb]) => (
            <div key={id} onClick={() => setAppPage(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", color:appPage===id?C.blue:C.muted, fontSize:10, fontWeight:appPage===id?800:400, transition:"all .15s" }}>
              <span style={{ fontSize:22 }}>{ic}</span>
              <span>{lb}</span>
              {appPage === id && <div style={{ width:5, height:5, borderRadius:"50%", background:C.blue }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
