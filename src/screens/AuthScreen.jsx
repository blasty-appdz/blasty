import { useState } from "react";
import { C, BRAND, CITIES, CATEGORIES } from "../constants";
import { supabase, SERVER } from "../lib/supabase";
import { getCat } from "../utils/helpers";
import GradHeader from "../components/GradHeader";
import BrandLogo from "../components/BrandLogo";
import { PrimaryBtn } from "../components/Buttons";

function AuthScreen({ mode, onAuth, onSwitch }) {
  const params = new URLSearchParams(window.location.search);
  const initRole = params.get("role") === "pro" ? "professionnel" : "client";
  const [form, setForm] = useState({ name:"", phone:"", password:"", role:initRole, category_id:"", city:"Oran" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // otpMode: null | "register_verify" | "forgot"
  const [otpMode, setOtpMode] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const isLogin = mode === "login";
  const inp = { border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", fontSize:14, outline:"none", fontFamily:"inherit", background:C.white, width:"100%", boxSizing:"border-box", color:C.text };

  const formatPhone = (p) => {
    const clean = p.replace(/\s/g, "");
    if (clean.startsWith("0")) return "+213" + clean.slice(1);
    if (clean.startsWith("+213")) return clean;
    return "+213" + clean;
  };

  const sendOtp = async (phone) => {
    const res = await fetch(`${SERVER}/send-otp`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ phone }) });
    return res.json();
  };

  // CONNEXION — numéro + mot de passe, 0 SMS
  const handleLogin = async () => {
    setError("");
    if (!form.phone) { setError("Entrez votre numéro."); return; }
    if (!form.password) { setError("Entrez votre mot de passe."); return; }
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from("users").select("*").eq("phone", form.phone).eq("password", form.password).single();
      if (err || !data) { setError("Numéro ou mot de passe incorrect."); setLoading(false); return; }
      onAuth(data);
    } catch (e) { console.error(e); setError("Erreur de connexion."); }
    setLoading(false);
  };

  // INSCRIPTION — envoi SMS OTP pour vérifier le numéro
  const handleRegisterSendOtp = async () => {
    setError("");
    if (!form.phone) { setError("Entrez votre numéro."); return; }
    if (!form.name) { setError("Entrez votre nom."); return; }
    if (!form.password || form.password.length < 6) { setError("Mot de passe minimum 6 caractères."); return; }
    if (form.role === "professionnel" && !form.category_id) { setError("Choisissez votre catégorie."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const data = await sendOtp(phone);
      if (data.success) { setOtpMode("register_verify"); }
      else setError("Erreur envoi SMS : " + (data.error || ""));
    } catch (e) { console.error(e); setError("Serveur OTP inaccessible."); }
    setLoading(false);
  };

  // INSCRIPTION — vérification OTP puis création compte
  const handleRegisterVerify = async () => {
    setError("");
    if (otpCode.length < 4) { setError("Entrez le code reçu par SMS."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const res = await fetch(`${SERVER}/verify-otp`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ phone, code:otpCode }) });
      const check = await res.json();
      if (!check.success) { setError("Code incorrect ou expiré."); setLoading(false); return; }
      const { data, error: err } = await supabase.from("users").insert({ name:form.name, phone:form.phone, password:form.password, role:form.role }).select().single();
      if (err) { setError("Numéro déjà utilisé ou erreur."); setLoading(false); return; }
      if (form.role === "professionnel") {
        const cat = getCat(form.category_id);
        await supabase.from("professionals").insert({
          user_id:data.id, name:form.name, phone:form.phone, city:form.city,
          category_id:form.category_id, speciality:cat.label || "",
          active:true, rating:5.0, reviews_count:0, plan:"starter",
          next_available:"Disponible", price:"Sur devis",
        });
      }
      onAuth(data);
    } catch (e) { console.error(e); setError("Erreur de connexion."); }
    setLoading(false);
  };

  // MOT DE PASSE OUBLIÉ — envoi SMS
  const handleForgotSendOtp = async () => {
    setError("");
    if (!form.phone) { setError("Entrez votre numéro."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const data = await sendOtp(phone);
      if (data.success) { setOtpMode("forgot"); }
      else setError("Erreur envoi SMS : " + (data.error || ""));
    } catch (e) { console.error(e); setError("Serveur OTP inaccessible."); }
    setLoading(false);
  };

  // MOT DE PASSE OUBLIÉ — vérification OTP puis reset mdp
  const handleForgotVerify = async () => {
    setError("");
    if (otpCode.length < 4) { setError("Entrez le code reçu par SMS."); return; }
    if (!form.password || form.password.length < 6) { setError("Nouveau mot de passe minimum 6 caractères."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const res = await fetch(`${SERVER}/verify-otp`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ phone, code:otpCode }) });
      const check = await res.json();
      if (!check.success) { setError("Code incorrect ou expiré."); setLoading(false); return; }
      const { data, error: err } = await supabase.from("users").update({ password:form.password }).eq("phone", form.phone).select().single();
      if (err || !data) { setError("Numéro introuvable."); setLoading(false); return; }
      onAuth(data);
    } catch (e) { console.error(e); setError("Erreur."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg }}>
      <GradHeader>
        <BrandLogo size={26} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:14 }}>{isLogin ? "Bon retour" : "Créer un compte"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4 }}>{isLogin ? `Connectez-vous sur ${BRAND}` : `Rejoignez ${BRAND} gratuitement`}</div>
      </GradHeader>
      <div style={{ padding:"28px 20px 40px" }}>
        {!isLogin && (
          <>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {["client","professionnel"].map(r => (
                <button key={r} onClick={() => setForm({...form, role:r})} style={{ flex:1, padding:"13px", borderRadius:14, border:`2px solid ${form.role===r?C.blue:C.border}`, background:form.role===r?C.blueBg:C.white, color:form.role===r?C.blue:C.muted, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                  {r === "client" ? "Client" : "Professionnel"}
                </button>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>{form.role === "client" ? "Nom complet" : "Nom du salon / cabinet"}</label>
              <input style={inp} placeholder={form.role === "client" ? "Yasmine Bouali" : "Salon Nour"} value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
            </div>
            {form.role === "professionnel" && (
              <>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Votre catégorie</label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, maxHeight:200, overflowY:"auto", padding:4 }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat.id} onClick={() => setForm({...form, category_id:cat.id})}
                        style={{ background:form.category_id===cat.id?C.blue:C.blueBg, color:form.category_id===cat.id?C.white:C.blue, border:`1.5px solid ${form.category_id===cat.id?C.blue:C.border}`, borderRadius:20, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                  {form.category_id && (
                    <div style={{ marginTop:8, background:C.successBg, color:C.success, borderRadius:10, padding:"6px 12px", fontSize:12, fontWeight:700 }}>
                      {getCat(form.category_id).icon} {getCat(form.category_id).label} sélectionné
                    </div>
                  )}
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Ville</label>
                  <select style={inp} value={form.city} onChange={e => setForm({...form, city:e.target.value})}>
                    {CITIES.filter(c => c !== "Toutes villes").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </>
            )}
          </>
        )}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Numéro de téléphone</label>
          <input style={inp} placeholder="0555 12 34 56" type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <label style={{ fontSize:13, fontWeight:700, color:C.text }}>Mot de passe</label>
            {isLogin && (
              <span onClick={handleForgotSendOtp} style={{ fontSize:12, color:C.blue, fontWeight:700, cursor:"pointer" }}>
                Mot de passe oublié ?
              </span>
            )}
          </div>
          <div style={{ position:"relative" }}>
            <input style={{ ...inp, paddingRight:48 }} placeholder="••••••••" type={showPwd?"text":"password"} value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
            <button onClick={() => setShowPwd(p => !p)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:18, color:C.muted, padding:0 }}>
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>
        {error && <div style={{ background:"#FEE2E2", color:"#B91C1C", borderRadius:12, padding:"10px 14px", fontSize:13, marginBottom:16 }}>{error}</div>}

        {/* ── CONNEXION : numéro + mot de passe, 0 SMS ── */}
        {isLogin && !otpMode && (
          <>
            <PrimaryBtn onClick={handleLogin} disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</PrimaryBtn>
            <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.muted }}>
              Pas encore de compte ? <span style={{ color:C.blue, fontWeight:700, cursor:"pointer" }} onClick={onSwitch}>S'inscrire</span>
            </div>
          </>
        )}

        {/* ── MOT DE PASSE OUBLIÉ — saisie OTP + nouveau mdp ── */}
        {isLogin && otpMode === "forgot" && (
          <>
            <div style={{ background:C.successBg, borderRadius:14, padding:"14px 16px", marginBottom:16, fontSize:13, color:C.success, fontWeight:600, textAlign:"center" }}>
              SMS envoyé au {form.phone}
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Code SMS reçu</label>
              <input style={{ ...inp, fontSize:24, fontWeight:900, textAlign:"center", letterSpacing:10 }} placeholder="------" maxLength={6} value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, ""))} />
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Nouveau mot de passe</label>
              <div style={{ position:"relative" }}>
                <input style={{ ...inp, paddingRight:48 }} placeholder="Minimum 6 caractères" type={showPwd?"text":"password"} value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
                <button onClick={() => setShowPwd(p => !p)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:18, color:C.muted, padding:0 }}>{showPwd?"🙈":"👁"}</button>
              </div>
            </div>
            <PrimaryBtn onClick={handleForgotVerify} disabled={loading}>{loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}</PrimaryBtn>
            <button onClick={() => { setOtpMode(null); setOtpCode(""); setError(""); }} style={{ background:"transparent", border:"none", color:C.muted, fontSize:13, cursor:"pointer", fontFamily:"inherit", width:"100%", marginTop:14, textAlign:"center" }}>← Retour à la connexion</button>
          </>
        )}

        {/* ── INSCRIPTION — envoi OTP pour vérifier le numéro ── */}
        {!isLogin && !otpMode && (
          <>
            <PrimaryBtn onClick={handleRegisterSendOtp} disabled={loading}>{loading ? "Envoi SMS..." : "Vérifier mon numéro par SMS"}</PrimaryBtn>
            <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.muted }}>
              Déjà un compte ? <span style={{ color:C.blue, fontWeight:700, cursor:"pointer" }} onClick={onSwitch}>Se connecter</span>
            </div>
          </>
        )}

        {/* ── INSCRIPTION — vérification OTP ── */}
        {!isLogin && otpMode === "register_verify" && (
          <>
            <div style={{ background:C.successBg, borderRadius:14, padding:"14px 16px", marginBottom:20, fontSize:13, color:C.success, fontWeight:600, textAlign:"center" }}>
              SMS envoyé au {form.phone} — valable 10 minutes
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Code de vérification</label>
              <input style={{ ...inp, fontSize:28, fontWeight:900, textAlign:"center", letterSpacing:12 }} placeholder="------" maxLength={6} value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, ""))} />
            </div>
            <PrimaryBtn onClick={handleRegisterVerify} disabled={loading}>{loading ? "Vérification..." : "Valider le code"}</PrimaryBtn>
            <button onClick={() => { setOtpMode(null); setOtpCode(""); setError(""); }} style={{ background:"transparent", border:"none", color:C.muted, fontSize:13, cursor:"pointer", fontFamily:"inherit", width:"100%", marginTop:14, textAlign:"center" }}>← Modifier mon numéro</button>
          </>
        )}
        <div style={{ textAlign:"center", marginTop:24, fontSize:12, color:C.muted }}>En continuant, vous acceptez les <span style={{ color:C.blue }}>CGU de {BRAND}</span></div>
      </div>
    </div>
  );
}

export default AuthScreen;
