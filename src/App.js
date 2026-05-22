import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = "https://dkpirfevdhvgxrkdqojn.supabase.co";
const SUPABASE_KEY  = "sb_publishable_rtt-dfO0qA5DQVsqe86hAQ_zM529u_K";
const supabase      = createClient(SUPABASE_URL, SUPABASE_KEY);

const C = {
  blue:      "#1A6EFF",
  blueDark:  "#0048CC",
  blueDeep:  "#003099",
  blueLight: "#4D95FF",
  blueBg:    "#EEF4FF",
  blueGlow:  "rgba(26,110,255,0.18)",
  dark:      "#050E2A",
  text:      "#1A2340",
  muted:     "#7A88AA",
  white:     "#FFFFFF",
  border:    "#D6E4FF",
  bg:        "#F4F7FF",
  success:   "#00C07F",
  successBg: "#E6FAF4",
  warn:      "#FF9800",
  warnBg:    "#FFF3E0",
};

const BRAND = "Blasty";

const PLANS = [
  { id:"starter",  icon:"🌱", name:"Starter",  price:4990,  rdv:50,   sms:100,  popular:false },
  { id:"pro",      icon:"⭐", name:"Pro",      price:12990, rdv:200,  sms:400,  popular:true  },
  { id:"business", icon:"🏢", name:"Business", price:29990, rdv:500,  sms:1000, popular:false },
  { id:"premium",  icon:"👑", name:"Premium",  price:74990, rdv:1500, sms:3000, popular:false },
];

const CATEGORIES = [
  { id:"medecin",        label:"Médecin",           labelAr:"طبيب",            icon:"🩺", priority:1,  group:"Santé & Médical" },
  { id:"dentiste",       label:"Dentiste",           labelAr:"طبيب أسنان",      icon:"🦷", priority:1,  group:"Santé & Médical" },
  { id:"kine",           label:"Kiné",               labelAr:"معالج",           icon:"🦴", priority:1,  group:"Santé & Médical" },
  { id:"specialiste",    label:"Spécialiste",        labelAr:"أخصائي",          icon:"🩻", priority:1,  group:"Santé & Médical" },
  { id:"psy",            label:"Psychologue",        labelAr:"نفساني",          icon:"🧠", priority:1,  group:"Santé & Médical" },
  { id:"optique",        label:"Opticien",           labelAr:"بصري",            icon:"👁", priority:1,  group:"Santé & Médical" },
  { id:"veterinaire",    label:"Vétérinaire",        labelAr:"بيطري",           icon:"🐾", priority:1,  group:"Santé & Médical" },
  { id:"coiffeur",       label:"Coiffeur",           labelAr:"حلاق",            icon:"💇", priority:2,  group:"Beauté & Coiffure" },
  { id:"barbier",        label:"Barbier",            labelAr:"حلاق رجالي",      icon:"✂",  priority:2,  group:"Beauté & Coiffure" },
  { id:"coloriste",      label:"Coloriste",          labelAr:"صبغة شعر",        icon:"🎨", priority:2,  group:"Beauté & Coiffure" },
  { id:"estheticienne",  label:"Esthéticienne",      labelAr:"مختصة تجميل",     icon:"💅", priority:3,  group:"Esthétique" },
  { id:"epilation",      label:"Épilation",          labelAr:"إزالة شعر",       icon:"🌸", priority:3,  group:"Esthétique" },
  { id:"maquillage",     label:"Maquillage",         labelAr:"مكياج",           icon:"💄", priority:3,  group:"Esthétique" },
  { id:"tatouage",       label:"Tatouage",           labelAr:"وشم",             icon:"🖊", priority:3,  group:"Esthétique" },
  { id:"sourcils",       label:"Sourcils & Cils",    labelAr:"رموش وحواجب",     icon:"👁", priority:3,  group:"Esthétique" },
  { id:"dermato",        label:"Dermatologue",       labelAr:"جلدي",            icon:"🔬", priority:4,  group:"Esthétique Médicale" },
  { id:"laser",          label:"Laser",              labelAr:"ليزر",            icon:"⚡", priority:4,  group:"Esthétique Médicale" },
  { id:"botox",          label:"Botox / Fillers",    labelAr:"بوتوكس",          icon:"✨", priority:4,  group:"Esthétique Médicale" },
  { id:"massage",        label:"Massage",            labelAr:"مساج",            icon:"💆", priority:5,  group:"Bien-être & Soins" },
  { id:"spa",            label:"Spa / Hammam",       labelAr:"سبا وحمام",       icon:"🛁", priority:5,  group:"Bien-être & Soins" },
  { id:"yoga",           label:"Yoga",               labelAr:"يوغا",            icon:"🧘", priority:5,  group:"Bien-être & Soins" },
  { id:"dietetique",     label:"Diététicien",        labelAr:"أخصائي تغذية",    icon:"🥗", priority:5,  group:"Bien-être & Soins" },
  { id:"osteo",          label:"Ostéopathe",         labelAr:"معالج عظام",      icon:"🦷", priority:5,  group:"Bien-être & Soins" },
  { id:"coach",          label:"Coach Sportif",      labelAr:"مدرب رياضي",      icon:"🏋", priority:6,  group:"Sport & Fitness" },
  { id:"sallesport",     label:"Salle de Sport",     labelAr:"نادي رياضي",      icon:"💪", priority:6,  group:"Sport & Fitness" },
  { id:"piscine",        label:"Piscine",            labelAr:"مسبح",            icon:"🏊", priority:6,  group:"Sport & Fitness" },
  { id:"tennis",         label:"Tennis / Padel",     labelAr:"تنس",             icon:"🎾", priority:6,  group:"Sport & Fitness" },
  { id:"artsmartiaux",   label:"Arts Martiaux",      labelAr:"فنون قتالية",     icon:"🥋", priority:6,  group:"Sport & Fitness" },
  { id:"cours",          label:"Cours Particuliers", labelAr:"دروس خصوصية",     icon:"📚", priority:7,  group:"Cours & Formation" },
  { id:"langues",        label:"Langues",            labelAr:"لغات",            icon:"🌍", priority:7,  group:"Cours & Formation" },
  { id:"autoecole",      label:"Auto-École",         labelAr:"مدرسة قيادة",     icon:"🚗", priority:7,  group:"Cours & Formation" },
  { id:"musique",        label:"Musique",            labelAr:"موسيقى",          icon:"🎵", priority:7,  group:"Cours & Formation" },
  { id:"informatique",   label:"Informatique",       labelAr:"إعلام آلي",       icon:"💻", priority:7,  group:"Cours & Formation" },
  { id:"restaurant",     label:"Restaurant",         labelAr:"مطعم",            icon:"🍽", priority:8,  group:"Restauration" },
  { id:"traiteur",       label:"Traiteur",           labelAr:"خدمة ضيافة",      icon:"🍳", priority:8,  group:"Restauration" },
  { id:"cafe",           label:"Café / Salon de thé",labelAr:"مقهى",            icon:"☕", priority:8,  group:"Restauration" },
  { id:"photo",          label:"Photographe",        labelAr:"مصور",            icon:"📸", priority:9,  group:"Événementiel" },
  { id:"dj",             label:"DJ / Musicien",      labelAr:"دي جي",           icon:"🎧", priority:9,  group:"Événementiel" },
  { id:"sallefetes",     label:"Salle des Fêtes",    labelAr:"قاعة أفراح",      icon:"🎊", priority:9,  group:"Événementiel" },
  { id:"decorateur",     label:"Décorateur",         labelAr:"مزيّن",           icon:"🌺", priority:9,  group:"Événementiel" },
  { id:"taxi",           label:"Taxi",               labelAr:"تاكسي",           icon:"🚕", priority:10, group:"Transport" },
  { id:"locationvoiture",label:"Location Voiture",   labelAr:"تأجير سيارة",     icon:"🚘", priority:10, group:"Transport" },
  { id:"transfert",      label:"Transfert Aéroport", labelAr:"نقل مطار",        icon:"✈", priority:10, group:"Transport" },
  { id:"hotel",          label:"Hôtel",              labelAr:"فندق",            icon:"🏨", priority:11, group:"Hébergement" },
  { id:"riad",           label:"Riad / Chalet",      labelAr:"رياض / شاليه",    icon:"🏡", priority:11, group:"Hébergement" },
  { id:"locationvac",    label:"Location Vacances",  labelAr:"إيجار عطلة",      icon:"🏖", priority:11, group:"Hébergement" },
  { id:"plombier",       label:"Plombier",           labelAr:"سباك",            icon:"🔧", priority:12, group:"Services à domicile" },
  { id:"electricien",    label:"Électricien",        labelAr:"كهربائي",         icon:"⚡", priority:12, group:"Services à domicile" },
  { id:"clim",           label:"Climatisation",      labelAr:"تكييف",           icon:"❄", priority:12, group:"Services à domicile" },
  { id:"nettoyage",      label:"Nettoyage",          labelAr:"تنظيف",           icon:"🧹", priority:12, group:"Services à domicile" },
  { id:"demenagement",   label:"Déménagement",       labelAr:"انتقال",          icon:"📦", priority:12, group:"Services à domicile" },
  { id:"notaire",        label:"Notaire",            labelAr:"موثق",            icon:"📜", priority:13, group:"Administratif & Juridique" },
  { id:"avocat",         label:"Avocat",             labelAr:"محامي",           icon:"⚖", priority:13, group:"Administratif & Juridique" },
  { id:"comptable",      label:"Comptable",          labelAr:"محاسب",           icon:"📊", priority:13, group:"Administratif & Juridique" },
  { id:"architecte",     label:"Architecte",         labelAr:"مهندس معماري",    icon:"🏗", priority:13, group:"Administratif & Juridique" },
  { id:"traducteur",     label:"Traducteur",         labelAr:"مترجم",           icon:"🌐", priority:13, group:"Administratif & Juridique" },
  { id:"toilettage",     label:"Toilettage",         labelAr:"تجميل حيوانات",   icon:"🐩", priority:14, group:"Animaux" },
  { id:"petsitting",     label:"Pet-Sitting",        labelAr:"رعاية حيوانات",   icon:"🐾", priority:14, group:"Animaux" },
  { id:"dressage",       label:"Dressage",           labelAr:"تدريب حيوانات",   icon:"🐕", priority:14, group:"Animaux" },
];

const GROUPS    = [...new Set(CATEGORIES.map(c => c.group))];
const DAYS_FR   = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
const DAYS_AR   = ["أحد","اثن","ثلا","أرب","خمي","جمع","سبت"];
const CITIES    = ["Toutes villes","Oran","Alger","Constantine","Annaba","Tizi Ouzou","Sétif","Blida"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

// ─── OFFRES PARTENAIRES ───────────────────────────────────────────────────────
const PARTNER_OFFERS = [
  { id:1, emoji:"🍽", name:"Restaurant El Bahia",  category:"Restaurant · Oran Centre",       promoTag:"-15%",        offerTitle:"Réduction de 15% ce weekend sur tous les menus",         offerSub:"Offre valable sam & dim · 50 places restantes",    bgColor:"#1A1A2E", bgColor2:"#0F3460" },
  { id:2, emoji:"💇", name:"Salon Prestige Oran",  category:"Coiffure & Beauté · Bir El Djir", promoTag:"Offre spéciale", offerTitle:"Coupe + soin offert pour toute réservation via Blasty", offerSub:"Valable toute la semaine · 20 créneaux dispo",     bgColor:"#1A2E1A", bgColor2:"#0D3B0D" },
  { id:3, emoji:"🏨", name:"Hotel Les Falaises",   category:"Hotel 4 etoiles · Front de Mer",  promoTag:"-20%",        offerTitle:"20% de réduction sur les chambres du weekend",           offerSub:"Check-in ven-dim · Petit-déjeuner inclus",         bgColor:"#2E1A1A", bgColor2:"#3B0D0D" },
];

function PartnerBanner({ isAr, onBook }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setCurrent(prev => (prev + 1) % PARTNER_OFFERS.length); }, 4000);
    return () => clearInterval(timer);
  }, []);
  const o = PARTNER_OFFERS[current];
  return (
    <div style={{ margin:"18px 20px 4px" }}>
      <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:12 }}>
        {isAr ? "عروض الشركاء" : "Offres partenaires"}
      </div>
      <div style={{ borderRadius:22, overflow:"hidden", border:"2px solid #E8B84B", background:C.white, boxShadow:"0 4px 20px rgba(232,184,75,0.2)" }}>
        <div style={{ background:"linear-gradient(135deg," + o.bgColor + " 0%," + o.bgColor2 + " 100%)", padding:"16px 16px 14px" }}>
          <div style={{ display:"inline-block", background:"#E8B84B", color:"#7A5700", fontSize:11, fontWeight:700, padding:"3px 12px", borderRadius:20, marginBottom:12 }}>
            {isAr ? "عرض شريك" : "Offre Partenaire"}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:50, height:50, borderRadius:14, background:"rgba(255,255,255,0.95)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{o.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>{o.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", marginTop:2 }}>{o.category}</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", fontSize:13, fontWeight:800, padding:"5px 12px", borderRadius:10 }}>{o.promoTag}</div>
          </div>
        </div>
        <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{o.offerTitle}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{o.offerSub}</div>
          </div>
          <button onClick={() => onBook && onBook(o)} style={{ background:"linear-gradient(135deg," + C.blue + "," + C.blueDark + ")", color:C.white, border:"none", borderRadius:14, padding:"10px 18px", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>
            {isAr ? "احجز" : "Réserver"}
          </button>
        </div>
      </div>
      <div style={{ display:"flex", gap:5, justifyContent:"center", marginTop:10 }}>
        {PARTNER_OFFERS.map((_,i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width:i===current?20:6, height:6, borderRadius:3, background:i===current?C.blue:C.border, cursor:"pointer", transition:"all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

function getTodayLabel(isAr) {
  const now = new Date();
  const daysFR = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const daysAR = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  const moisFR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const moisAR = ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  if (isAr) return `${daysAR[now.getDay()]} ${now.getDate()} ${moisAR[now.getMonth()]} ${now.getFullYear()}`;
  return `${daysFR[now.getDay()]} ${now.getDate()} ${moisFR[now.getMonth()]} ${now.getFullYear()}`;
}

function getDates(isAr) {
  return Array.from({ length:7 }, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()+i);
    return { label:(isAr?DAYS_AR:DAYS_FR)[d.getDay()], num:d.getDate(), full:d.toLocaleDateString("fr-DZ") };
  });
}

function getCat(id) { return CATEGORIES.find(c=>c.id===id)||{}; }

const GradHeader = ({ children }) => (
  <div style={{ background:`linear-gradient(155deg,${C.blue} 0%,${C.blueDark} 60%,${C.blueDeep} 100%)`, padding:"52px 20px 32px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,.05)" }} />
    <div style={{ position:"absolute", bottom:-20, left:-20, width:110, height:110, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
    {children}
    <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:30, background:C.bg, borderRadius:"50% 50% 0 0 / 20px 20px 0 0" }} />
  </div>
);

const BrandLogo = ({ size=28, white=true }) => (
  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
    <div style={{ width:size+8, height:size+8, borderRadius:(size+8)*0.28, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.65, flexShrink:0 }}>📅</div>
    <span style={{ fontSize:size, fontWeight:900, color:white?C.white:C.blue, letterSpacing:-0.5 }}>{BRAND}</span>
  </div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background:C.white, borderRadius:22, padding:18, marginBottom:14, boxShadow:"0 2px 18px rgba(26,110,255,.07)", border:`1px solid ${C.border}`, cursor:onClick?"pointer":"default", ...style }}>
    {children}
  </div>
);

const PrimaryBtn = ({ children, onClick, disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:16, padding:"15px 24px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", width:"100%", boxShadow:`0 6px 22px ${C.blueGlow}`, opacity:disabled?.7:1, ...style }}>
    {children}
  </button>
);

const OutlineBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ background:"transparent", color:C.blue, border:`2px solid ${C.blue}`, borderRadius:16, padding:"14px 24px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", width:"100%", ...style }}>
    {children}
  </button>
);

const StatusBadge = ({ status, isAr }) => (
  <div style={{ fontSize:11, fontWeight:800, padding:"5px 12px", borderRadius:20, background:status==="confirmed"?C.successBg:status==="cancelled"?"#FEE2E2":C.warnBg, color:status==="confirmed"?C.success:status==="cancelled"?"#B91C1C":C.warn, whiteSpace:"nowrap" }}>
    {status==="confirmed"?(isAr?"✓ مؤكد":"✓ Confirmé"):status==="cancelled"?(isAr?"✕ ملغى":"✕ Annulé"):(isAr?"⏳ انتظار":"⏳ Attente")}
  </div>
);

const Loader = () => (
  <div style={{ textAlign:"center", padding:60, color:C.muted }}>
    <div style={{ fontSize:36, marginBottom:12 }}>⏳</div>
    <div style={{ fontSize:14, fontWeight:600 }}>Chargement...</div>
  </div>
);

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
      <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:24 }}>🇩🇿 Fait à Oran avec amour · {BRAND} v1.0</div>
    </div>
  );
}

function AuthScreen({ mode, onAuth, onSwitch }) {
  const params   = new URLSearchParams(window.location.search);
  const initRole = params.get("role") === "pro" ? "professionnel" : "client";
  const [form,setForm]       = useState({ name:"", phone:"", password:"", role:initRole, category_id:"", city:"Oran" });
  const [loading,setLoading] = useState(false);
  const [error,setError]     = useState("");
  const [otpStep,setOtpStep] = useState(false);
  const [otpCode,setOtpCode] = useState("");
  const isLogin = mode==="login";
  const SERVER  = "http://localhost:3001";
  const inp = { border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", fontSize:14, outline:"none", fontFamily:"inherit", background:C.white, width:"100%", boxSizing:"border-box", color:C.text };

  const formatPhone = (p) => {
    const clean = p.replace(/\s/g,"");
    if (clean.startsWith("0")) return "+213" + clean.slice(1);
    if (clean.startsWith("+213")) return clean;
    return "+213" + clean;
  };

  const handleSendOtp = async () => {
    setError("");
    if (!form.phone) { setError("Entrez votre numéro."); return; }
    if (!isLogin && !form.name) { setError("Entrez votre nom."); return; }
    if (!isLogin && form.role==="professionnel" && !form.category_id) { setError("Choisissez votre catégorie."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const res   = await fetch(`${SERVER}/send-otp`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ phone }) });
      const data  = await res.json();
      if (data.success) { setOtpStep(true); }
      else setError("Erreur envoi SMS : " + (data.error||""));
    } catch(e) { setError("Serveur OTP inaccessible. Vérifiez que node index.js tourne."); }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otpCode.length < 4) { setError("Entrez le code reçu par SMS."); return; }
    setLoading(true);
    try {
      const phone = formatPhone(form.phone);
      const res   = await fetch(`${SERVER}/verify-otp`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ phone, code:otpCode }) });
      const check = await res.json();
      if (!check.success) { setError("Code incorrect ou expiré."); setLoading(false); return; }
      if (isLogin) {
        const { data, error: err } = await supabase.from("users").select("*").eq("phone", form.phone).single();
        if (err || !data) { setError("Numéro introuvable. Créez un compte."); setLoading(false); return; }
        onAuth(data);
      } else {
        const { data, error: err } = await supabase.from("users").insert({ name:form.name, phone:form.phone, role:form.role }).select().single();
        if (err) { setError("Numéro déjà utilisé ou erreur."); setLoading(false); return; }
        if (form.role === "professionnel") {
          const cat = getCat(form.category_id);
          await supabase.from("professionals").insert({
            user_id:form.id, name:form.name, phone:form.phone, city:form.city,
            category_id:form.category_id, speciality:cat.label||"",
            active:true, rating:5.0, reviews_count:0, plan:"starter",
            next_available:"Disponible", price:"Sur devis",
          });
        }
        onAuth(data);
      }
    } catch(e) { setError("Erreur de connexion."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg }}>
      <GradHeader>
        <BrandLogo size={26} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:14 }}>{isLogin?"Bon retour 👋":"Créer un compte"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4 }}>{isLogin?`Connectez-vous sur ${BRAND}`:`Rejoignez ${BRAND} gratuitement`}</div>
      </GradHeader>
      <div style={{ padding:"28px 20px 40px" }}>
        {!isLogin && (
          <>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {["client","professionnel"].map(r=>(
                <button key={r} onClick={()=>setForm({...form,role:r})} style={{ flex:1, padding:"13px", borderRadius:14, border:`2px solid ${form.role===r?C.blue:C.border}`, background:form.role===r?C.blueBg:C.white, color:form.role===r?C.blue:C.muted, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                  {r==="client"?"👤 Client":"💼 Professionnel"}
                </button>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>{form.role==="client"?"Nom complet":"Nom du salon / cabinet"}</label>
              <input style={inp} placeholder={form.role==="client"?"Yasmine Bouali":"Salon Nour"} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </div>
            {form.role==="professionnel" && (
              <>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>🏷️ Votre catégorie</label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, maxHeight:200, overflowY:"auto", padding:4 }}>
                    {CATEGORIES.map(cat=>(
                      <button key={cat.id} onClick={()=>setForm({...form,category_id:cat.id})}
                        style={{ background:form.category_id===cat.id?C.blue:C.blueBg, color:form.category_id===cat.id?C.white:C.blue, border:`1.5px solid ${form.category_id===cat.id?C.blue:C.border}`, borderRadius:20, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                  {form.category_id && (
                    <div style={{ marginTop:8, background:C.successBg, color:C.success, borderRadius:10, padding:"6px 12px", fontSize:12, fontWeight:700 }}>
                      ✓ {getCat(form.category_id).icon} {getCat(form.category_id).label} sélectionné
                    </div>
                  )}
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>📍 Ville</label>
                  <select style={inp} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}>
                    {CITIES.filter(c=>c!=="Toutes villes").map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </>
            )}
          </>
        )}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Numéro de téléphone</label>
          <input style={inp} placeholder="0555 12 34 56" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Mot de passe</label>
          <input style={inp} placeholder="••••••••" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        </div>
        {error && <div style={{ background:"#FEE2E2", color:"#B91C1C", borderRadius:12, padding:"10px 14px", fontSize:13, marginBottom:16 }}>⚠️ {error}</div>}
        {!otpStep ? (
          <>
            <PrimaryBtn onClick={handleSendOtp} disabled={loading}>{loading?"⏳ Envoi SMS...":"📱 Recevoir le code SMS →"}</PrimaryBtn>
            <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.muted }}>
              {isLogin?"Pas encore de compte ? ":"Déjà un compte ? "}
              <span style={{ color:C.blue, fontWeight:700, cursor:"pointer" }} onClick={onSwitch}>{isLogin?"S'inscrire":"Se connecter"}</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ background:C.successBg, borderRadius:14, padding:"14px 16px", marginBottom:20, fontSize:13, color:C.success, fontWeight:600, textAlign:"center" }}>
              📱 Code SMS envoyé au {form.phone}<br/>
              <span style={{ fontSize:12, fontWeight:400 }}>Valable 10 minutes</span>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6, display:"block" }}>Code de vérification</label>
              <input style={{ ...inp, fontSize:28, fontWeight:900, textAlign:"center", letterSpacing:12 }} placeholder="------" maxLength={6} value={otpCode} onChange={e=>setOtpCode(e.target.value.replace(/\D/g,""))} />
            </div>
            <PrimaryBtn onClick={handleVerifyOtp} disabled={loading}>{loading?"⏳ Vérification...":"✓ Valider le code →"}</PrimaryBtn>
            <button onClick={()=>{setOtpStep(false);setOtpCode("");setError("");}} style={{ background:"transparent", border:"none", color:C.muted, fontSize:13, cursor:"pointer", fontFamily:"inherit", width:"100%", marginTop:14, textAlign:"center" }}>
              ← Modifier mon numéro
            </button>
          </>
        )}
        <div style={{ textAlign:"center", marginTop:24, fontSize:12, color:C.muted }}>En continuant, vous acceptez les <span style={{ color:C.blue }}>CGU de {BRAND}</span></div>
      </div>
    </div>
  );
}

function HomeScreen({ user, isAr, lang, setLang, onBook }) {
  const [search,   setSearch]   = useState("");
  const [selCat,   setSelCat]   = useState(null);
  const [selGroup, setSelGroup] = useState(null);
  const [city,     setCity]     = useState("Toutes villes");
  const [showCats, setShowCats] = useState(false);
  const [pros,     setPros]     = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchPros = async () => {
      setLoading(true);
      const { data } = await supabase.from("professionals").select("*").eq("active", true).order("rating", { ascending:false });
      if (data) setPros(data);
      setLoading(false);
    };
    fetchPros();
  }, []);

  const topCats  = CATEGORIES.filter(c=>c.priority<=5);
  const filtered = pros.filter(p => {
    const cat = getCat(p.category_id);
    const matchCat    = !selCat   || p.category_id===selCat;
    const matchGroup  = !selGroup || cat.group===selGroup;
    const matchCity   = city==="Toutes villes" || p.city===city;
    const matchSearch = !search   || p.name.toLowerCase().includes(search.toLowerCase()) || cat.label?.toLowerCase().includes(search.toLowerCase()) || p.speciality?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchGroup && matchCity && matchSearch;
  });
  const clearFilters = () => { setSelCat(null); setSelGroup(null); setSearch(""); setCity("Toutes villes"); };

  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <button onClick={()=>setLang(lang==="fr"?"ar":"fr")} style={{ position:"absolute", top:52, [isAr?"left":"right"]:16, background:"rgba(255,255,255,.18)", border:"none", color:C.white, borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          {lang==="fr"?"عربي":"FR"}
        </button>
        <BrandLogo size={26} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12, lineHeight:1.35 }}>
          {isAr?`مرحباً ${user.name} 👋`:`Bonjour ${user.name.split(" ")[0]} 👋`}
        </div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:3 }}>
          {isAr?"احجز موعدك بسهولة":"Réservez votre rendez-vous facilement"}
        </div>
        <div style={{ background:"rgba(255,255,255,.95)", borderRadius:16, padding:"13px 16px", display:"flex", alignItems:"center", gap:10, marginTop:16, boxShadow:"0 6px 24px rgba(0,0,48,.15)" }}>
          <span style={{ fontSize:18 }}>🔍</span>
          <input style={{ border:"none", outline:"none", flex:1, fontSize:14, color:C.text, background:"transparent", fontFamily:"inherit" }}
            placeholder={isAr?"ابحث عن طبيب، حلاق، هوتيل...":"Médecin, coiffeur, hôtel, taxi..."}
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </GradHeader>

      <div style={{ display:"flex", background:C.white, margin:"16px 20px 0", borderRadius:18, overflow:"hidden", boxShadow:`0 2px 16px ${C.blueGlow}`, border:`1px solid ${C.border}` }}>
        {[["1000+",isAr?"محترف":"Pros"],["14",isAr?"قطاع":"Secteurs"],["4.8★",isAr?"تقييم":"Note"]].map(([n,l],i)=>(
          <div key={l} style={{ flex:1, textAlign:"center", padding:"12px 8px", borderRight:i<2?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{n}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── BANNIÈRE PARTENAIRE ── */}
      <PartnerBanner isAr={isAr} onBook={(o) => alert("Bientôt : " + o.name)} />

      <div style={{ padding:"0 20px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>{isAr?"التخصصات":"Catégories populaires"}</div>
          <button onClick={()=>setShowCats(!showCats)} style={{ background:C.blueBg, color:C.blue, border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            {showCats?(isAr?"أقل":"Moins"):(isAr?"الكل":"Toutes")} →
          </button>
        </div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6 }}>
          <button onClick={clearFilters} style={{ background:!selCat&&!selGroup?C.blue:C.white, color:!selCat&&!selGroup?C.white:C.muted, border:`1.5px solid ${!selCat&&!selGroup?C.blue:C.border}`, borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
            {isAr?"الكل":"Tous"}
          </button>
          {topCats.map(cat=>(
            <button key={cat.id} onClick={()=>{setSelCat(cat.id);setSelGroup(null);}} style={{ background:selCat===cat.id?C.blue:C.white, color:selCat===cat.id?C.white:C.muted, border:`1.5px solid ${selCat===cat.id?C.blue:C.border}`, borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:5 }}>
              <span>{cat.icon}</span> {isAr?cat.labelAr:cat.label}
            </button>
          ))}
        </div>

        {showCats && (
          <div style={{ background:C.white, borderRadius:20, padding:18, marginTop:12, boxShadow:`0 4px 20px ${C.blueGlow}`, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:14 }}>
              {isAr?`جميع الخدمات (${CATEGORIES.length}+)`:`Tous les services (${CATEGORIES.length}+)`}
            </div>
            {GROUPS.map(group=>(
              <div key={group} style={{ marginBottom:16 }}>
                <button onClick={()=>{setSelGroup(selGroup===group?null:group);setSelCat(null);setShowCats(false);}} style={{ fontSize:12, fontWeight:800, color:selGroup===group?C.blue:C.muted, background:selGroup===group?C.blueBg:"transparent", border:`1px solid ${selGroup===group?C.blue:C.border}`, borderRadius:10, padding:"4px 10px", cursor:"pointer", marginBottom:8, fontFamily:"inherit" }}>
                  {group} {selGroup===group?"✓":""}
                </button>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {CATEGORIES.filter(c=>c.group===group).map(cat=>(
                    <button key={cat.id} onClick={()=>{setSelCat(cat.id);setSelGroup(null);setShowCats(false);}} style={{ background:selCat===cat.id?C.blue:C.blueBg, color:selCat===cat.id?C.white:C.blue, border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                      {cat.icon} {isAr?cat.labelAr:cat.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, marginBottom:4 }}>
          <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>📍</span>
          <select onChange={e=>setCity(e.target.value)} value={city} style={{ border:`1.5px solid ${C.border}`, borderRadius:12, padding:"7px 12px", fontSize:13, color:C.text, background:C.white, fontFamily:"inherit", cursor:"pointer", flex:1 }}>
            {CITIES.map(c=><option key={c}>{c}</option>)}
          </select>
          {(selCat||selGroup||city!=="Toutes villes"||search) && (
            <button onClick={clearFilters} style={{ background:"#FEE2E2", color:"#B91C1C", border:"none", borderRadius:12, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>✕ Reset</button>
          )}
        </div>
      </div>

      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:14 }}>
          {selCat?`${getCat(selCat).icon} ${isAr?getCat(selCat).labelAr:getCat(selCat).label}`:selGroup?selGroup:isAr?"جميع المهنيون":"Tous les professionnels"}
          <span style={{ color:C.muted, fontWeight:500, fontSize:13, marginLeft:6 }}>({filtered.length})</span>
        </div>
        {loading ? <Loader /> : filtered.map(pro => {
          const cat = getCat(pro.category_id);
          return (
            <Card key={pro.id} onClick={()=>onBook(pro)}>
              <div style={{ display:"flex", gap:14 }}>
                <div style={{ width:60, height:60, borderRadius:18, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{pro.img||"👤"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{isAr&&pro.name_ar?pro.name_ar:pro.name}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{pro.speciality} · {pro.city}</div>
                  <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                    <span style={{ background:C.blueBg, color:C.blue, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{cat.icon} {isAr?cat.labelAr:cat.label}</span>
                    <span style={{ fontSize:12, color:"#FFB830" }}>{"★".repeat(Math.floor(pro.rating||5))}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:C.dark }}>{pro.rating}</span>
                    <span style={{ fontSize:12, color:C.muted }}>({pro.reviews_count})</span>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:14, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize:12, color:C.success, fontWeight:700 }}>🟢 {pro.next_available}</div>
                  <div style={{ fontSize:15, fontWeight:900, color:C.blue, marginTop:2 }}>{pro.price}</div>
                </div>
                <button style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:12, padding:"10px 20px", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>
                  {isAr?"احجز":"Réserver"}
                </button>
              </div>
            </Card>
          );
        })}
        {!loading && filtered.length===0 && (
          <div style={{ textAlign:"center", padding:50, color:C.muted }}>
            <div style={{ fontSize:48 }}>🔍</div>
            <div style={{ marginTop:12, fontSize:15, fontWeight:700 }}>{isAr?"لا توجد نتائج":"Aucun résultat"}</div>
            <div style={{ fontSize:13, marginTop:4 }}>{isAr?"جرب فئة أو مدينة أخرى":"Essayez une autre catégorie ou ville"}</div>
            <button onClick={clearFilters} style={{ marginTop:16, background:C.blue, color:C.white, border:"none", borderRadius:12, padding:"10px 20px", fontFamily:"inherit", fontWeight:700, cursor:"pointer" }}>{isAr?"إعادة ضبط":"Réinitialiser"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingScreen({ pro, user, isAr, onBack, onConfirm }) {
  const [date,    setDate]    = useState(null);
  const [time,    setTime]    = useState(null);
  const [note,    setNote]    = useState("");
  const [loading, setLoading] = useState(false);
  const dates = getDates(isAr);
  const cat   = getCat(pro.category_id);

  const confirm = async () => {
    if (!date||!time) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("reservations").insert({
        client_id: user.id, professional_id: pro.id, client_name: user.name,
        client_phone: user.phone, pro_name: pro.name, category_id: pro.category_id,
        date: date.full, time, note, price: pro.price, status: "confirmed",
      }).select().single();
      if (error) throw error;
      onConfirm({ pro, date, time, note, id:data.id });
    } catch(e) { alert("Erreur lors de la réservation."); }
    setLoading(false);
  };

  return (
    <div style={{ paddingBottom:40 }}>
      <GradHeader>
        <button onClick={onBack} style={{ position:"absolute", top:52, [isAr?"right":"left"]:16, background:"rgba(255,255,255,.2)", border:"none", color:C.white, width:40, height:40, borderRadius:13, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div style={{ width:72, height:72, borderRadius:22, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, margin:"0 auto 12px" }}>{pro.img||"👤"}</div>
        <div style={{ fontSize:21, fontWeight:900, color:C.white, textAlign:"center" }}>{isAr&&pro.name_ar?pro.name_ar:pro.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", textAlign:"center", marginTop:4 }}>{cat.icon} {isAr?cat.labelAr:cat.label} · {pro.speciality} · {pro.city}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:14 }}>
          {[[`⭐ ${pro.rating}`,isAr?"تقييم":"Note"],[`👥 ${pro.reviews_count}`,isAr?"تعليق":"Avis"],[`💰 ${pro.price}`,isAr?"السعر":"Tarif"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center", color:C.white }}>
              <div style={{ fontSize:15, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:11, opacity:.75 }}>{l}</div>
            </div>
          ))}
        </div>
      </GradHeader>
      <div style={{ padding:"20px 20px 0" }}>
        <Card>
          <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>📅 {isAr?"اختر التاريخ":"Choisir la date"}</div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
            {dates.map((d,i)=>(
              <div key={i} onClick={()=>setDate(d)} style={{ minWidth:56, textAlign:"center", padding:"12px 8px", borderRadius:16, background:date?.num===d.num?C.blue:C.white, color:date?.num===d.num?C.white:C.dark, cursor:"pointer", border:`2px solid ${date?.num===d.num?C.blue:C.border}`, boxShadow:date?.num===d.num?`0 4px 14px ${C.blueGlow}`:"none" }}>
                <div style={{ fontSize:11, opacity:.8, fontWeight:600 }}>{d.label}</div>
                <div style={{ fontSize:20, fontWeight:900, marginTop:2 }}>{d.num}</div>
              </div>
            ))}
          </div>
        </Card>
        {date && (
          <Card>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>🕐 {isAr?"اختر الوقت":"Choisir l'heure"}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {TIME_SLOTS.map((slot,i)=>{
                const avail=i%3!==2, active=time===slot;
                return (
                  <div key={slot} onClick={()=>avail&&setTime(slot)} style={{ padding:"10px 4px", borderRadius:12, textAlign:"center", fontSize:13, fontWeight:700, cursor:avail?"pointer":"default", background:active?C.blue:avail?C.white:"#F5F7FF", color:active?C.white:avail?C.dark:C.muted, border:`2px solid ${active?C.blue:avail?C.border:"transparent"}`, opacity:avail?1:.5 }}>
                    {slot}
                  </div>
                );
              })}
            </div>
          </Card>
        )}
        {date&&time && (
          <>
            <Card>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:12 }}>📝 {isAr?"ملاحظة":"Note (optionnel)"}</div>
              <textarea style={{ border:`1.5px solid ${C.border}`, borderRadius:14, padding:"12px 14px", fontSize:14, outline:"none", fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"none", height:80, color:C.text }} placeholder={isAr?"سبب الزيارة...":"Motif de la visite..."} value={note} onChange={e=>setNote(e.target.value)} />
            </Card>
            <Card style={{ background:C.blueBg, border:`1.5px solid ${C.border}` }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>{isAr?"ملخص الحجز":"Récapitulatif"}</div>
              {[[isAr?"الخدمة":"Service",`${cat.icon} ${isAr?cat.labelAr:cat.label}`],[isAr?"المهني":"Professionnel",isAr&&pro.name_ar?pro.name_ar:pro.name],[isAr?"التاريخ":"Date",date.full],[isAr?"الوقت":"Heure",time],[isAr?"السعر":"Prix",pro.price]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:10 }}>
                  <span style={{ color:C.muted }}>{k}</span>
                  <span style={{ fontWeight:700, color:C.dark }}>{v}</span>
                </div>
              ))}
              <PrimaryBtn onClick={confirm} disabled={loading} style={{ marginTop:8 }}>
                {loading?(isAr?"⏳ جاري التأكيد...":"⏳ Confirmation..."):isAr?"✓ تأكيد الحجز":"✓ Confirmer le RDV"}
              </PrimaryBtn>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessScreen({ booking, isAr, onHome }) {
  const cat = getCat(booking.pro.category_id);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:36, textAlign:"center", background:C.bg }}>
      <div style={{ width:96, height:96, borderRadius:28, background:`linear-gradient(135deg,${C.blue},${C.blueDeep})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:46, marginBottom:24, boxShadow:`0 14px 34px ${C.blueGlow}` }}>✅</div>
      <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:10 }}>{isAr?"تم تأكيد موعدك!":"Rendez-vous confirmé !"}</div>
      <div style={{ fontSize:14, color:C.muted, lineHeight:1.7, marginBottom:24 }}>
        {isAr?`موعد مع ${booking.pro.name_ar||booking.pro.name}`:`RDV avec ${booking.pro.name}`}<br/>
        {isAr?`${booking.date.full} الساعة ${booking.time}`:`le ${booking.date.full} à ${booking.time}`}<br/><br/>
        📱 {isAr?`ستصلك رسالة SMS من ${BRAND}`:`Un SMS ${BRAND} vous sera envoyé`}
      </div>
      <Card style={{ width:"100%", marginBottom:24 }}>
        {[[`${cat.icon} ${isAr?"الخدمة":"Service"}`,isAr?cat.labelAr:cat.label],[`${booking.pro.img||"👤"} ${isAr?"المهني":"Pro"}`,isAr&&booking.pro.name_ar?booking.pro.name_ar:booking.pro.name],[`📅 ${isAr?"التاريخ":"Date"}`,booking.date.full],[`⏰ ${isAr?"الوقت":"Heure"}`,booking.time],[`💰 ${isAr?"السعر":"Prix"}`,booking.pro.price]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:8 }}>
            <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:700, color:C.dark }}>{v}</span>
          </div>
        ))}
      </Card>
      <PrimaryBtn onClick={onHome}>{isAr?"العودة للرئيسية":"Retour à l'accueil"}</PrimaryBtn>
    </div>
  );
}

function MyBookingsScreen({ user, isAr }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase.from("reservations").select("*").eq("client_id", user.id).order("created_at", { ascending:false });
      if (data) setReservations(data);
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <BrandLogo size={24} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:12 }}>{isAr?"مواعيدي":"Mes RDV"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4 }}>{reservations.length} {isAr?"مواعيد":"rendez-vous"}</div>
      </GradHeader>
      <div style={{ padding:"20px 20px" }}>
        {loading ? <Loader /> : reservations.length===0 ? (
          <div style={{ textAlign:"center", padding:60, color:C.muted }}>
            <div style={{ fontSize:48 }}>📅</div>
            <div style={{ marginTop:12, fontSize:15, fontWeight:700 }}>{isAr?"لا توجد مواعيد بعد":"Aucun RDV pour l'instant"}</div>
          </div>
        ) : reservations.map((r,i)=>{
          const cat = getCat(r.category_id);
          return (
            <Card key={i}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:54, height:54, borderRadius:16, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{cat.icon||"📅"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{r.pro_name}</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{cat.icon} {isAr?cat.labelAr:cat.label}</div>
                  <div style={{ fontSize:13, color:C.blue, fontWeight:700, marginTop:4 }}>📅 {r.date} · ⏰ {r.time}</div>
                </div>
                <StatusBadge status={r.status} isAr={isAr} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ProDashboard({ user, isAr }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [rdvs,      setRdvs]      = useState([]);
  const [proInfo,   setProInfo]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [proForm,   setProForm]   = useState({ name:"", speciality:"", phone:"", address:"", description:"" });
  const [saved,     setSaved]     = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data:proData } = await supabase.from("professionals").select("*").eq("user_id", user.id).single();
      if (proData) {
        setProInfo(proData);
        setProForm({ name:proData.name||"", speciality:proData.speciality||"", phone:proData.phone||user.phone||"", address:proData.address||"", description:proData.description||"" });
        const { data:rdvData } = await supabase.from("reservations").select("*").eq("professional_id", proData.id).order("created_at", { ascending:false });
        if (rdvData) setRdvs(rdvData);
      }
      setLoading(false);
    };
    fetchData(); // eslint-disable-line react-hooks/exhaustive-deps
  }, [user.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveProfile = async () => {
    if (!proInfo) return;
    await supabase.from("professionals").update({ name:proForm.name, speciality:proForm.speciality, phone:proForm.phone, address:proForm.address, description:proForm.description }).eq("id", proInfo.id);
    setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
  };

  const updateStatus = async (rdvId, newStatus) => {
    await supabase.from("reservations").update({ status:newStatus }).eq("id", rdvId);
    setRdvs(prev => prev.map(r => r.id===rdvId ? {...r, status:newStatus} : r));
  };

  const confirmed  = rdvs.filter(r=>r.status==="confirmed").length;
  const pending    = rdvs.filter(r=>r.status==="pending").length;
  const cancelled  = rdvs.filter(r=>r.status==="cancelled").length;
  const todayStr   = new Date().toLocaleDateString("fr-DZ");
  const todayRdvs  = rdvs.filter(r=>r.date===todayStr);
  const clientsMap = {};
  rdvs.forEach(r => { if (!clientsMap[r.client_phone]) clientsMap[r.client_phone] = { name:r.client_name, phone:r.client_phone, count:0, last:r.date }; clientsMap[r.client_phone].count++; });
  const clients    = Object.values(clientsMap);
  const currentPlan = PLANS.find(p=>p.id===proInfo?.plan) || PLANS[1];
  const rdvUsed    = rdvs.filter(r=>{ const d=new Date(r.created_at||Date.now()); const now=new Date(); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); }).length;
  const tabStyle   = (t) => ({ flex:1, padding:"10px 6px", textAlign:"center", fontSize:12, fontWeight:activeTab===t?800:500, color:activeTab===t?C.blue:C.muted, borderBottom:`2px solid ${activeTab===t?C.blue:"transparent"}`, cursor:"pointer", background:"transparent", border:"none", borderBottomWidth:2, borderBottomStyle:"solid", borderBottomColor:activeTab===t?C.blue:"transparent", fontFamily:"inherit" });
  const inp        = { border:`1.5px solid ${C.border}`, borderRadius:14, padding:"12px 14px", fontSize:13, outline:"none", fontFamily:"inherit", background:C.white, width:"100%", boxSizing:"border-box", color:C.text, marginTop:4 };

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:`linear-gradient(155deg,${C.blue},${C.blueDeep})`, padding:"52px 20px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.7)", fontWeight:600 }}>{isAr?"مرحباً 👋":"Bonjour 👋"}</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.white, marginTop:2 }}>{proInfo?.name||user.name}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.8)" }}>{proInfo?.speciality||""} · {isAr?"أوران":"Oran"}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ background:"rgba(255,255,255,.2)", borderRadius:12, padding:"6px 12px", fontSize:12, color:C.white, fontWeight:700 }}>{currentPlan.icon} {currentPlan.name}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.7)", marginTop:4 }}>{rdvUsed}/{currentPlan.rdv} RDV</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:16 }}>
          {[[String(rdvs.length),isAr?"إجمالي":"Total",C.blue],[String(confirmed),isAr?"مؤكد":"Confirmés",C.success],[String(pending),isAr?"انتظار":"Attente",C.warn],[String(todayRdvs.length),isAr?"اليوم":"Auj.","#9B59B6"]].map(([n,l,color])=>(
            <div key={l} style={{ background:"rgba(255,255,255,.15)", borderRadius:14, padding:"10px 8px", textAlign:"center", backdropFilter:"blur(4px)" }}>
              <div style={{ fontSize:20, fontWeight:900, color:C.white }}>{n}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.8)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:30, background:C.bg, borderRadius:"50% 50% 0 0 / 20px 20px 0 0" }} />
      </div>

      <div style={{ display:"flex", background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:10 }}>
        {[["stats","📊",isAr?"إحصائيات":"Stats"],["agenda","📅",isAr?"أجندة":"Agenda"],["clients","👥",isAr?"عملاء":"Clients"],["settings","⚙️",isAr?"إعدادات":"Params"]].map(([t,ic,lb])=>(
          <button key={t} onClick={()=>setActiveTab(t)} style={tabStyle(t)}>{ic} {lb}</button>
        ))}
      </div>

      <div style={{ padding:"16px 20px" }}>
        {activeTab==="stats" && (
          <>
            <Card style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{isAr?"الحصة الشهرية":"Quota mensuel"}</span>
                <span style={{ fontSize:13, color:C.blue, fontWeight:700 }}>{rdvUsed} / {currentPlan.rdv}</span>
              </div>
              <div style={{ background:C.border, borderRadius:6, height:8, overflow:"hidden" }}>
                <div style={{ width:`${Math.min(100, Math.round(rdvUsed/currentPlan.rdv*100))}%`, height:"100%", background:rdvUsed/currentPlan.rdv>0.85?C.warn:C.blue, borderRadius:6, transition:"width .4s" }} />
              </div>
              <div style={{ fontSize:11, color:C.muted, marginTop:6 }}>{currentPlan.icon} Plan {currentPlan.name} · {currentPlan.price.toLocaleString("fr-DZ")} DA/mois</div>
            </Card>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              {[[confirmed,isAr?"مؤكدة":"Confirmés",C.success,C.successBg],[pending,isAr?"انتظار":"En attente",C.warn,C.warnBg],[cancelled,isAr?"ملغاة":"Annulés","#B91C1C","#FEE2E2"]].map(([n,l,color,bg])=>(
                <div key={l} style={{ background:bg, borderRadius:16, padding:"14px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:900, color }}>{n}</div>
                  <div style={{ fontSize:11, color, marginTop:2, fontWeight:600 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:10 }}>📅 {isAr?"مواعيد اليوم":"Aujourd'hui"} — {getTodayLabel(isAr)}</div>
            {loading ? <Loader /> : todayRdvs.length===0 ? (
              <div style={{ textAlign:"center", padding:30, color:C.muted, fontSize:13 }}>{isAr?"لا مواعيد اليوم":"Aucun RDV aujourd'hui"}</div>
            ) : todayRdvs.map((r,i)=>(
              <Card key={i} style={{ padding:"12px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:C.blue, flexShrink:0 }}>{r.time}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{r.client_name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>📞 {r.client_phone}</div>
                  </div>
                  <StatusBadge status={r.status} isAr={isAr} />
                </div>
              </Card>
            ))}
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, margin:"20px 0 12px" }}>{isAr?"خطط الاشتراك":"Abonnements"}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {PLANS.map(plan=>(
                <div key={plan.id} style={{ background:plan.popular?C.blueBg:C.white, border:`${plan.id===currentPlan.id?"2px":"1px"} solid ${plan.id===currentPlan.id?C.blue:C.border}`, borderRadius:18, padding:"14px", position:"relative" }}>
                  {plan.popular && <div style={{ position:"absolute", top:-9, left:"50%", transform:"translateX(-50%)", background:C.blue, color:C.white, fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{isAr?"الأشهر":"Populaire"}</div>}
                  <div style={{ fontSize:18 }}>{plan.icon}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginTop:4 }}>{plan.name}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{plan.price.toLocaleString("fr-DZ")} <span style={{ fontSize:10, color:C.muted }}>DA/mois</span></div>
                  <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>✓ {plan.rdv} RDV · {plan.sms} SMS</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab==="agenda" && (
          <>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>📋 {isAr?"جميع المواعيد":"Tous les rendez-vous"} ({rdvs.length})</div>
            {loading ? <Loader /> : rdvs.length===0 ? (
              <div style={{ textAlign:"center", padding:50, color:C.muted }}>
                <div style={{ fontSize:40 }}>📅</div>
                <div style={{ marginTop:10, fontSize:14 }}>{isAr?"لا توجد مواعيد بعد":"Aucun RDV pour l'instant"}</div>
              </div>
            ) : rdvs.map((r,i)=>(
              <Card key={i} style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:50, height:50, borderRadius:14, background:C.blueBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <div style={{ fontSize:11, fontWeight:900, color:C.blue }}>{r.time}</div>
                    <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{r.date?.split("/").slice(0,2).join("/")}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{r.client_name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>📞 {r.client_phone}</div>
                    {r.note && <div style={{ fontSize:11, color:C.muted, marginTop:2, fontStyle:"italic" }}>"{r.note}"</div>}
                  </div>
                  <StatusBadge status={r.status} isAr={isAr} />
                </div>
                {r.status==="pending" && (
                  <div style={{ display:"flex", gap:8, marginTop:10 }}>
                    <button onClick={()=>updateStatus(r.id,"confirmed")} style={{ flex:1, background:C.successBg, color:C.success, border:`1px solid ${C.success}`, borderRadius:10, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>✓ {isAr?"قبول":"Confirmer"}</button>
                    <button onClick={()=>updateStatus(r.id,"cancelled")} style={{ flex:1, background:"#FEE2E2", color:"#B91C1C", border:"1px solid #B91C1C", borderRadius:10, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>✕ {isAr?"رفض":"Annuler"}</button>
                  </div>
                )}
              </Card>
            ))}
          </>
        )}

        {activeTab==="clients" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>👥 {isAr?"قاعدة العملاء":"Base clients"}</div>
              <span style={{ fontSize:12, color:C.muted }}>{clients.length} {isAr?"عميل":"clients"}</span>
            </div>
            {clients.length===0 ? (
              <div style={{ textAlign:"center", padding:50, color:C.muted }}>
                <div style={{ fontSize:40 }}>👥</div>
                <div style={{ marginTop:10, fontSize:14 }}>{isAr?"لا عملاء بعد":"Aucun client pour l'instant"}</div>
              </div>
            ) : clients.sort((a,b)=>b.count-a.count).map((cl,i)=>{
              const initials = cl.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
              const colors   = [["#E1F5EE","#085041"],["#EEF4FF","#003099"],["#FAEEDA","#633806"],["#FBEAF0","#72243E"]];
              const [bg,fg]  = colors[i%4];
              return (
                <Card key={i} style={{ padding:"14px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:fg, flexShrink:0 }}>{initials}</div>
                    <div style={{ flex:1