import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:      "#0F1B28",
  navyDark:  "#0a1520",
  navyLight: "#1e2748",
  gold:      "#D6B56C",
  gold2:     "#C4A05A",
  goldBg:    "rgba(214,181,108,0.10)",
  goldGlow:  "rgba(214,181,108,0.25)",
  green:     "#4ade80",
  greenBg:   "rgba(74,222,128,0.10)",
  orange:    "#fb923c",
  orangeBg:  "rgba(251,146,60,0.10)",
  red:       "#f87171",
  redBg:     "rgba(248,113,113,0.10)",
  blue:      "#60a5fa",
  blueBg:    "rgba(96,165,250,0.10)",
  bg:        "#0F1B28",
  surface:   "#0d1830",
  surface2:  "#0f1e38",
  border:    "rgba(255,255,255,0.07)",
  text:      "#f0f0f0",
  text2:     "rgba(240,240,240,0.55)",
  text3:     "rgba(240,240,240,0.3)",
  white:     "#ffffff",
};

const BRAND = "MAISON ZEN";

// ─── EQUIPMENT DATA ───────────────────────────────────────────────────────────
const EQUIPMENTS = [
  { id:"toiture",    icon:"🏠", name:"Toiture",             status:"ok",   date:"Refaite 2017",    next:"2027",  group:"Structure" },
  { id:"facade",     icon:"🧱", name:"Façade",              status:"ok",   date:"Ravalée 2020",    next:"2025",  group:"Structure" },
  { id:"charpente",  icon:"🪵", name:"Charpente",           status:"ok",   date:"Contrôle 2021",   next:"2026",  group:"Structure" },
  { id:"pac",        icon:"🌡️", name:"Pompe à chaleur",     status:"urg",  date:"Daikin · 2024",   next:"Retard",group:"Chauffage" },
  { id:"radiateurs", icon:"🔥", name:"Radiateurs",          status:"ok",   date:"Purgés 2024",     next:"2025",  group:"Chauffage" },
  { id:"thermostat", icon:"🌡️", name:"Thermostat",          status:"ok",   date:"Connecté 2024",   next:"2026",  group:"Chauffage" },
  { id:"vmc",        icon:"🌬️", name:"VMC",                 status:"warn", date:"Posée 2019",      next:"15j",   group:"Ventilation" },
  { id:"combles",    icon:"🧱", name:"Isolation combles",   status:"ok",   date:"Posée 2024",      next:"2034",  group:"Isolation" },
  { id:"ite",        icon:"🧱", name:"ITE Façade",          status:"ok",   date:"Posée 2024",      next:"2034",  group:"Isolation" },
  { id:"plomberie",  icon:"🚰", name:"Plomberie",           status:"ok",   date:"Contrôle 2023",   next:"2026",  group:"Eau" },
  { id:"chauffe",    icon:"♨️", name:"Chauffe-eau",         status:"ok",   date:"Détartré 2024",   next:"2026",  group:"Eau" },
  { id:"adoucisseur",icon:"🌿", name:"Adoucisseur",         status:"ok",   date:"Sel OK 2025",     next:"2026",  group:"Eau" },
  { id:"tableau",    icon:"⚡", name:"Tableau électrique",  status:"warn", date:"MAJ 2022",        next:"1 mois",group:"Électricité" },
  { id:"prises",     icon:"🔌", name:"Prises & inter.",     status:"ok",   date:"Vérif. 2022",     next:"2027",  group:"Électricité" },
  { id:"solaire",    icon:"☀️", name:"Panneaux solaires",   status:"ok",   date:"Rendement OK",    next:"2030",  group:"Électricité" },
  { id:"goutieres",  icon:"🍂", name:"Gouttières",          status:"urg",  date:"Entretien 2022",  next:"Urgent",group:"Extérieur" },
  { id:"porte",      icon:"🚪", name:"Porte d'entrée",      status:"ok",   date:"Posée 2021",      next:"2031",  group:"Extérieur" },
  { id:"fenetres",   icon:"🪟", name:"Fenêtres PVC",        status:"ok",   date:"Posées 2023",     next:"2033",  group:"Extérieur" },
  { id:"volets",     icon:"🏠", name:"Volets roulants",     status:"ok",   date:"Huilés 2024",     next:"2025",  group:"Extérieur" },
  { id:"alarme",     icon:"🛡️", name:"Alarme",              status:"ok",   date:"Contrat actif",   next:"2026",  group:"Sécurité" },
  { id:"fumee",      icon:"🔥", name:"Détecteurs fumée",    status:"warn", date:"Posés 2021",      next:"Test!", group:"Sécurité" },
  { id:"sdb",        icon:"🚿", name:"Salle de bain",       status:"ok",   date:"Réno en cours",   next:"2025",  group:"Intérieur" },
  { id:"cuisine",    icon:"🍳", name:"Cuisine",             status:"ok",   date:"Rénovée 2022",    next:"2032",  group:"Intérieur" },
];

const ALERTS = [
  { id:1, type:"urg",  icon:"🌡️", title:"Révision annuelle PAC",        sub:"Obligatoire — En retard de 2 mois",   tag:"En retard",  q:"Ma PAC Daikin n'a pas eu sa révision annuelle obligatoire depuis 2 mois. Quels sont les risques et que dois-je faire en urgence ?" },
  { id:2, type:"urg",  icon:"🍂", title:"Nettoyage gouttières",          sub:"Risque d'obstruction automnale",       tag:"Urgent",     q:"Mes gouttières n'ont pas été nettoyées depuis 2022. Comment faire et combien ça coûte ?" },
  { id:3, type:"warn", icon:"🌬️", title:"Filtre VMC à changer",          sub:"Recommandé tous les 12 mois",         tag:"Dans 15j",   q:"Mon filtre VMC doit être changé. Comment faire moi-même et quel filtre acheter ?" },
  { id:4, type:"warn", icon:"⚡", title:"Contrôle tableau électrique",   sub:"Dernière vérification en 2019",       tag:"Dans 1 mois",q:"Mon tableau électrique n'a pas été contrôlé depuis 2019. Pourquoi c'est important et que faut-il vérifier ?" },
  { id:5, type:"warn", icon:"🔥", title:"Test détecteurs de fumée",      sub:"Test annuel obligatoire",              tag:"Ce mois",    q:"Comment tester mes détecteurs de fumée correctement ?" },
  { id:6, type:"info", icon:"📜", title:"Garantie décennale toiture",    sub:"Expire dans 8 mois",                  tag:"Août 2025",  q:"Ma garantie décennale toiture expire dans 8 mois. Que dois-je faire avant l'échéance ?" },
  { id:7, type:"info", icon:"☀️", title:"Contrat entretien panneaux",    sub:"Renouvellement annuel à prévoir",     tag:"Nov 2025",   q:"Mon contrat d'entretien panneaux solaires doit être renouvelé. Quelles sont les options ?" },
];

const ARTISANS = [
  { id:1, icon:"🌡️", bg:"rgba(96,165,250,0.15)",  name:"Thermotech Alsace", trade:"Chauffage · PAC",         stars:5,  n:47, badge:"RGE",      tags:["PAC Air/Eau","CEE","MaPrimeRénov"],  dist:"4,2 km", city:"Strasbourg", dispo:"Disponible" },
  { id:2, icon:"🚰", bg:"rgba(74,222,128,0.15)",   name:"PlombiPro 67",      trade:"Plomberie · Sanitaire",   stars:4,  n:31, badge:"Certifié",  tags:["Salle de bain","Urgences","Chauffe-eau"], dist:"7,8 km", city:"Brumath", dispo:"Disponible" },
  { id:3, icon:"⚡", bg:"rgba(251,146,60,0.15)",   name:"ElecPro Alsace",    trade:"Électricité · Domotique", stars:5,  n:52, badge:"Qualibat",  tags:["Tableau","Domotique","Solaire"],     dist:"3,1 km", city:"Strasbourg", dispo:"En chantier" },
  { id:4, icon:"🏠", bg:"rgba(248,113,113,0.15)",  name:"ToitureAlsace",     trade:"Couverture · Gouttières", stars:4,  n:28, badge:"RGE",       tags:["Tuiles","Zinguerie","Gouttières"],   dist:"11 km",  city:"Haguenau", dispo:"Disponible" },
  { id:5, icon:"🧱", bg:"rgba(240,192,96,0.15)",   name:"IsoPlus 67",        trade:"Isolation · ITE · Combles", stars:5, n:63, badge:"RGE",      tags:["ITE","Combles","MaPrimeRénov"],     dist:"5,5 km", city:"Strasbourg", dispo:"Disponible" },
  { id:6, icon:"🪟", bg:"rgba(167,139,250,0.15)",  name:"MenuisAlsace",      trade:"Menuiserie · Fenêtres",   stars:4,  n:39, badge:"Certifié",  tags:["PVC","Aluminium","Volets"],          dist:"9 km",   city:"Schiltigheim", dispo:"Disponible" },
];

const TRAVAUX = [
  { icon:"🌡️", name:"Installation PAC air/eau",          artisan:"Thermotech Alsace", date:"Mars 2024",   price:"12 400€", aide:"MPR -5 200€", status:"done"    },
  { icon:"🚿", name:"Rénovation salle de bain",           artisan:"PlombiPro 67",      date:"Mai 2025",    price:"4 500€",  aide:"",            status:"pending"  },
  { icon:"🧱", name:"Isolation combles perdus",           artisan:"IsoPlus 67",        date:"Janv. 2024",  price:"3 200€",  aide:"MPR -1 800€", status:"done"    },
  { icon:"🪟", name:"6 fenêtres double vitrage PVC",      artisan:"MenuisAlsace",      date:"Oct. 2023",   price:"7 800€",  aide:"CEE -1 200€", status:"done"    },
  { icon:"⚡", name:"Mise aux normes tableau électrique", artisan:"ElecPro Alsace",    date:"Juin 2022",   price:"2 100€",  aide:"",            status:"done"    },
  { icon:"🏠", name:"Ravalement façade + enduit",         artisan:"FaçadesPro",        date:"Août 2020",   price:"6 400€",  aide:"",            status:"done"    },
];

const PRO_LEADS = [
  { icon:"🏚️", name:"Rénovation complète",   ville:"Strasbourg", budget:"45 000€", temp:"🔥", label:"Chaud",   q:"J'ai un lead pour une rénovation complète à Strasbourg, budget 45000€. Comment structurer mon offre clé en main pour maximiser mes chances de signer ?" },
  { icon:"🌡️", name:"PAC + ITE",             ville:"Brumath",    budget:"28 000€", temp:"🔥", label:"Chaud",   q:"Un client veut PAC + ITE à Brumath, budget 28000€. Comment monter le dossier CEE + MaPrimeRénov pour maximiser ses aides et faciliter la vente ?" },
  { icon:"🚿", name:"Salle de bain",          ville:"Haguenau",   budget:"12 000€", temp:"🌤", label:"Tiède",   q:"Lead tiède salle de bain à Haguenau, budget 12000€. Quelle stratégie commerciale pour le convertir rapidement ?" },
  { icon:"🧱", name:"Isolation combles",      ville:"Strasbourg", budget:"4 500€",  temp:"🌤", label:"Tiède",   q:"Lead isolation combles à Strasbourg 4500€. Comment valoriser les aides disponibles pour déclencher la décision ?" },
  { icon:"🪟", name:"Fenêtres PVC x8",        ville:"Schiltigheim",budget:"9 200€", temp:"❄️", label:"Froid",   q:"Lead froid fenêtres PVC x8 à Schiltigheim, budget 9200€. Comment relancer ce lead efficacement ?" },
];

const PRO_CHANTIERS = [
  { icon:"🚿", name:"Réno salle de bain",    client:"M. Martin",    pct:60, status:"warn",  date:"Livraison 15 juin" },
  { icon:"🧱", name:"ITE façade",             client:"Mme Dupont",   pct:80, status:"green", date:"Livraison dans 5j" },
  { icon:"🌡️", name:"Installation PAC",       client:"M. Bernard",   pct:5,  status:"blue",  date:"Démarrage lundi" },
];

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const GradHeader = ({ children }) => (
  <div style={{ background:`linear-gradient(155deg,${C.navy} 0%,${C.navyDark} 100%)`, padding:"52px 20px 36px", position:"relative", overflow:"hidden", borderBottom:`1px solid ${C.border}` }}>
    <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(240,192,96,0.05)" }} />
    <div style={{ position:"absolute", bottom:-20, left:-20, width:120, height:120, borderRadius:"50%", background:"rgba(240,192,96,0.04)" }} />
    {children}
    <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:28, background:C.bg, borderRadius:"50% 50% 0 0 / 18px 18px 0 0" }} />
  </div>
);

const Logo = ({ size=26 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <svg width={size+8} height={size+8} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      <polygon points="20,8 32,18 32,32 8,32 8,18" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="15" y="22" width="10" height="10" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="15" y1="27" x2="25" y2="27" stroke={C.gold} strokeWidth="1"/>
      <line x1="20" y1="22" x2="20" y2="32" stroke={C.gold} strokeWidth="1"/>
    </svg>
    <div>
      <div style={{ fontSize:size, fontWeight:900, color:C.white, letterSpacing:2, lineHeight:1 }}>MAISON ZEN</div>
      <div style={{ fontSize:size*0.38, color:C.gold, letterSpacing:0.5, lineHeight:1, marginTop:1 }}>La mémoire de votre maison</div>
    </div>
  </div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background:C.surface, borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${C.border}`, cursor:onClick?"pointer":"default", transition:"all 0.2s", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, disabled, outline, style }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: outline ? "transparent" : `linear-gradient(135deg,${C.gold},${C.gold2})`,
    color: outline ? C.gold : C.navy,
    border: outline ? `2px solid ${C.gold}` : "none",
    borderRadius:14, padding:"14px 24px", fontSize:14, fontWeight:800,
    cursor:"pointer", fontFamily:"inherit", width:"100%",
    boxShadow: outline ? "none" : `0 6px 20px ${C.goldGlow}`,
    opacity:disabled?0.6:1, ...style
  }}>{children}</button>
);

const StatusDot = ({ type }) => {
  const colors = { ok:C.green, warn:C.orange, urg:C.red, info:C.blue };
  return <div style={{ width:9, height:9, borderRadius:"50%", background:colors[type]||C.text3, flexShrink:0, boxShadow: type==="urg" ? `0 0 6px ${C.red}` : "none" }} />;
};

const Badge = ({ label, type }) => {
  const map = { ok:[C.green,C.greenBg], warn:[C.orange,C.orangeBg], urg:[C.red,C.redBg], info:[C.blue,C.blueBg], gold:[C.gold,C.goldBg] };
  const [color, bg] = map[type] || [C.text2, C.surface2];
  return <span style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20, background:bg, color, whiteSpace:"nowrap" }}>{label}</span>;
};

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={{ fontSize:12, fontWeight:700, color:C.text2, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>}
    <input {...props} style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, padding:"11px 14px", color:C.text, fontFamily:"inherit", fontSize:14, outline:"none", boxSizing:"border-box", ...props.style }} />
  </div>
);

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen({ onGo }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${C.navy},${C.navyDark})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, position:"relative", overflow:"hidden" }}>
      {[[-70,-70,280],[null,-50,200,70],["38%","25%",130]].map(([t,r,s,l],i)=>(
        <div key={i} style={{ position:"absolute", top:t||"auto", right:r||"auto", left:l||"auto", bottom:i===2?"8%":"auto", width:s, height:s, borderRadius:"50%", background:"rgba(240,192,96,0.05)" }} />
      ))}
      <div style={{ width:130, height:130, borderRadius:32, background:"rgba(201,168,76,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, boxShadow:"0 20px 50px rgba(0,0,0,0.4)", border:"1px solid rgba(201,168,76,0.3)" }}>
        <svg width="80" height="80" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#D6B56C" strokeWidth="1.5"/>
          <polygon points="20,6 34,17 34,34 6,34 6,17" fill="none" stroke="#D6B56C" strokeWidth="1.5" strokeLinejoin="round"/>
          <rect x="14" y="22" width="12" height="12" fill="none" stroke="#D6B56C" strokeWidth="1.5"/>
          <line x1="14" y1="28" x2="26" y2="28" stroke="#D6B56C" strokeWidth="1"/>
          <line x1="20" y1="22" x2="20" y2="34" stroke="#D6B56C" strokeWidth="1"/>
        </svg>
      </div>
      <div style={{ fontSize:46, fontWeight:900, color:"#ffffff", letterSpacing:4, marginBottom:6 }}>MAISON ZEN</div>
      <div style={{ fontSize:14, color:"#D6B56C", textAlign:"center", letterSpacing:1, marginBottom:4 }}>La mémoire de votre maison</div>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:36, marginTop:6 }}>
        {["🏠 Suivi équipements","🔔 Alertes intelligentes","👷 Artisans vérifiés","🤖 IA intégrée","💰 Aides & CEE","📜 Garanties"].map(lb=>(
          <span key={lb} style={{ background:"rgba(240,192,96,0.12)", color:"rgba(255,255,255,0.8)", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:600, border:"1px solid rgba(240,192,96,0.2)" }}>{lb}</span>
        ))}
      </div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
        <button onClick={()=>onGo("login")} style={{ background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:16, padding:"17px", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 8px 24px ${C.goldGlow}` }}>Se connecter →</button>
        <button onClick={()=>onGo("register")} style={{ background:"transparent", color:C.white, border:"2px solid rgba(240,192,96,0.4)", borderRadius:16, padding:"16px", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Créer un compte</button>
      </div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:28 }}>🇫🇷 Maison Zen — Votre maison, en toute sérénité.</div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({ mode, onAuth, onSwitch }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"proprietaire" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";
  const handle = async () => {
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    setLoading(false);
    onAuth({ name: form.name || "Samir Mansour", email: form.email, role: form.role });
  };
  return (
    <div style={{ minHeight:"100vh", background:C.bg }}>
      <GradHeader>
        <Logo size={24} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:14 }}>{isLogin ? "Bon retour 👋" : "Créer un compte"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", marginTop:4 }}>{isLogin ? `Connectez-vous à ${BRAND}` : `Rejoignez ${BRAND} gratuitement`}</div>
      </GradHeader>
      <div style={{ padding:"28px 20px 40px" }}>
        {!isLogin && (
          <>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {[["proprietaire","🏠 Propriétaire"],["professionnel","👷 Professionnel"]].map(([r,lb])=>(
                <button key={r} onClick={()=>setForm({...form,role:r})} style={{ flex:1, padding:"13px", borderRadius:14, border:`2px solid ${form.role===r?C.gold:C.border}`, background:form.role===r?C.goldBg:C.surface, color:form.role===r?C.gold:C.text2, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>{lb}</button>
              ))}
            </div>
            <Input label={form.role==="proprietaire"?"Votre prénom":"Nom de votre société"} placeholder={form.role==="proprietaire"?"Samir":"Serenova Alsace"} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </>
        )}
        <Input label="Email" type="email" placeholder="vous@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <Btn onClick={handle} disabled={loading} style={{ marginTop:8 }}>{loading ? "⏳ Chargement…" : isLogin ? "Se connecter →" : "Créer mon compte →"}</Btn>
        <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.text2 }}>
          {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <span style={{ color:C.gold, fontWeight:700, cursor:"pointer" }} onClick={onSwitch}>{isLogin ? "S'inscrire" : "Se connecter"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD (PROPRIETAIRE) ─────────────────────────────────────────────────
function DashboardScreen({ user, onAsk }) {
  const urgent = EQUIPMENTS.filter(e=>e.status==="urg").length;
  const warn = EQUIPMENTS.filter(e=>e.status==="warn").length;
  const ok = EQUIPMENTS.filter(e=>e.status==="ok").length;
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>Bonjour {user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>Votre maison en un coup d'œil</div>
      </GradHeader>
      <div style={{ padding:"20px 16px 0" }}>
        {/* Health Score */}
        <Card style={{ background:"linear-gradient(135deg,#1a2040,#0f1a35)", border:"1px solid rgba(240,192,96,0.2)", padding:"20px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ position:"relative", width:72, height:72, flexShrink:0 }}>
              <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6"/>
                <circle cx="36" cy="36" r="28" fill="none" stroke={C.gold} strokeWidth="6" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="35"/>
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:900, color:C.gold, lineHeight:1 }}>80</div>
                <div style={{ fontSize:9, color:C.text3 }}>/100</div>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.white, marginBottom:4 }}>Score de santé</div>
              <div style={{ fontSize:12, color:C.text2, marginBottom:10, lineHeight:1.5 }}>Bon état général — {urgent} points urgents à traiter</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <Badge label={`⚠ ${urgent} urgent${urgent>1?"s":""}`} type="urg" />
                <Badge label={`⏱ ${warn} à planifier`} type="warn" />
                <Badge label={`✓ ${ok} à jour`} type="ok" />
              </div>
            </div>
          </div>
        </Card>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginBottom:14 }}>
          {[["23",C.gold,"Équipements"],["14",C.green,"Travaux"],["28 400€",C.text,"Budget"],["5",C.red,"Alertes"]].map(([v,color,l])=>(
            <Card key={l} style={{ padding:"12px 10px", textAlign:"center", marginBottom:0 }}>
              <div style={{ fontSize:16, fontWeight:900, color, lineHeight:1, marginBottom:3 }}>{v}</div>
              <div style={{ fontSize:10, color:C.text3 }}>{l}</div>
            </Card>
          ))}
        </div>
        {/* Alertes */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.text }}>🔔 Alertes prioritaires</div>
        </div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {ALERTS.slice(0,4).map(a=>(
            <div key={a.id} onClick={()=>onAsk(a.q)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}>
              <StatusDot type={a.type} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:1 }}>{a.icon} {a.title}</div>
                <div style={{ fontSize:11, color:C.text2 }}>{a.sub}</div>
              </div>
              <Badge label={a.tag} type={a.type} />
            </div>
          ))}
        </Card>
        {/* Équipements */}
        <div style={{ fontSize:15, fontWeight:800, color:C.text, marginBottom:10, marginTop:4 }}>🏗️ Équipements</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
          {EQUIPMENTS.slice(0,8).map(e=>(
            <div key={e.id} onClick={()=>onAsk(`Peux-tu me donner des informations sur l'équipement "${e.name}" : entretien recommandé, fréquence, coût moyen et signes d'usure ?`)} style={{ background:C.surface, borderRadius:12, padding:"12px 10px", border:`1px solid ${C.border}`, cursor:"pointer", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background: e.status==="ok"?C.green:e.status==="warn"?C.orange:C.red }} />
              <div style={{ fontSize:22, marginBottom:6 }}>{e.icon}</div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text, marginBottom:2 }}>{e.name}</div>
              <div style={{ fontSize:10, color: e.status==="ok"?C.green:e.status==="warn"?C.orange:C.red }}>{e.status==="ok"?"✓ OK":e.status==="warn"?"⚠ Attention":"🔴 Urgent"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ÉQUIPEMENTS ──────────────────────────────────────────────────────────────
function EquipementsScreen({ onAsk }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="all" ? EQUIPMENTS : EQUIPMENTS.filter(e=>e.status===filter);
  const groups = [...new Set(filtered.map(e=>e.group))];
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>🔧 Équipements</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>{EQUIPMENTS.length} équipements suivis</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:4 }}>
          {[["all","Tous"],["ok","À jour"],["warn","Attention"],["urg","Urgents"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)} style={{ padding:"7px 14px", borderRadius:20, border:`1.5px solid ${filter===v?C.gold:C.border}`, background:filter===v?C.goldBg:C.surface, color:filter===v?C.gold:C.text2, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>{l}</button>
          ))}
        </div>
        {groups.map(group=>(
          <div key={group}>
            <div style={{ fontSize:12, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:"1px", marginBottom:8, marginTop:4 }}>{group}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
              {filtered.filter(e=>e.group===group).map(e=>(
                <div key={e.id} onClick={()=>onAsk(`Dis-moi tout sur l'équipement "${e.name}" dans ma maison : état actuel, entretien recommandé, fréquence, coût et prochaine action à faire.`)} style={{ background:C.surface, borderRadius:12, padding:"14px 12px", border:`1px solid ${C.border}`, cursor:"pointer", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:e.status==="ok"?C.green:e.status==="warn"?C.orange:C.red }} />
                  <div style={{ fontSize:24, marginBottom:8 }}>{e.icon}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.text, marginBottom:3 }}>{e.name}</div>
                  <div style={{ fontSize:10, color:e.status==="ok"?C.green:e.status==="warn"?C.orange:C.red, marginBottom:3 }}>{e.status==="ok"?"✓ À jour":e.status==="warn"?"⚠ À surveiller":"🔴 Urgent"}</div>
                  <div style={{ fontSize:10, color:C.text3 }}>{e.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALERTES ──────────────────────────────────────────────────────────────────
function AlertesScreen({ onAsk }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>🔔 Alertes</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>{ALERTS.length} alertes actives</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginBottom:16 }}>
          {[["2",C.red,"Urgentes"],["3",C.orange,"À planifier"],["2",C.gold,"Infos"],["5",C.green,"Résolues"]].map(([v,color,l])=>(
            <Card key={l} style={{ padding:"12px 8px", textAlign:"center", marginBottom:0 }}>
              <div style={{ fontSize:18, fontWeight:900, color, lineHeight:1, marginBottom:3 }}>{v}</div>
              <div style={{ fontSize:10, color:C.text3 }}>{l}</div>
            </Card>
          ))}
        </div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {ALERTS.map(a=>(
            <div key={a.id} onClick={()=>onAsk(a.q)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}>
              <StatusDot type={a.type} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:2 }}>{a.icon} {a.title}</div>
                <div style={{ fontSize:11, color:C.text2 }}>{a.sub}</div>
              </div>
              <Badge label={a.tag} type={a.type} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── ARTISANS ─────────────────────────────────────────────────────────────────
function ArtisansScreen({ onAsk }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>👷 Artisans agréés</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>Réseau vérifié en Alsace</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        {ARTISANS.map(a=>(
          <Card key={a.id} onClick={()=>onAsk(`Je cherche un artisan pour ${a.trade}. Quels critères vérifier, quelles questions poser et quel budget prévoir ?`)}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:10 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:a.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{a.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{a.name}</div>
                <div style={{ fontSize:12, color:C.text2, marginTop:1 }}>{a.trade}</div>
                <div style={{ fontSize:12, color:C.gold, marginTop:2 }}>{"★".repeat(a.stars)}{"☆".repeat(5-a.stars)} <span style={{ color:C.text3 }}>({a.n} avis)</span></div>
              </div>
              <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:6, background:C.greenBg, color:C.green, border:`1px solid rgba(74,222,128,0.2)` }}>{a.badge}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
              {a.tags.map(t=><span key={t} style={{ fontSize:11, padding:"3px 8px", borderRadius:6, background:C.surface2, color:C.text2, border:`1px solid ${C.border}` }}>{t}</span>)}
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontSize:12, color:C.text3 }}>📍 {a.dist} · {a.city}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:11, color:a.dispo==="Disponible"?C.green:C.orange, fontWeight:600 }}>{a.dispo==="Disponible"?"🟢":"🟡"} {a.dispo}</span>
                <button style={{ padding:"6px 14px", borderRadius:8, border:"none", background:C.goldBg, color:C.gold, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Contacter →</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── TRAVAUX ──────────────────────────────────────────────────────────────────
function TravauxScreen({ onAsk }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>📋 Historique travaux</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>28 400€ investis · +12% valeur</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {[["28 400€",C.gold,"Budget total"],["8 200€",C.green,"Aides perçues"],["14",C.text,"Interventions"],["+12%",C.green,"Valeur ajoutée"]].map(([v,color,l])=>(
            <Card key={l} style={{ padding:"14px", marginBottom:0 }}>
              <div style={{ fontSize:18, fontWeight:900, color, lineHeight:1, marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:11, color:C.text3 }}>{l}</div>
            </Card>
          ))}
        </div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {TRAVAUX.map((t,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom:i<TRAVAUX.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:40, height:40, borderRadius:10, background:C.surface2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:1 }}>
                  {t.name}
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:4, marginLeft:6, background:t.status==="done"?C.greenBg:C.orangeBg, color:t.status==="done"?C.green:C.orange }}>{t.status==="done"?"Terminé":"En cours"}</span>
                </div>
                <div style={{ fontSize:11, color:C.text2 }}>{t.artisan} · {t.date}</div>
                {t.aide && <div style={{ fontSize:11, color:C.green, marginTop:1 }}>{t.aide}</div>}
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:C.gold }}>{t.price}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PRO DASHBOARD ────────────────────────────────────────────────────────────
function ProDashboardScreen({ user, onAsk }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:18, fontWeight:800, color:C.white, marginTop:12 }}>👷 {user.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>Coordinateur travaux · Alsace</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
          {[["62 400€",C.gold,"CA ce mois"],["30%",C.green,"Marge brute"],["7",C.blue,"Leads actifs"]].map(([v,color,l])=>(
            <Card key={l} style={{ padding:"14px", marginBottom:0 }}>
              <div style={{ fontSize:18, fontWeight:900, color, lineHeight:1, marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:10, color:C.text3 }}>{l}</div>
              {l==="CA ce mois" && <div style={{ height:3, background:C.surface2, borderRadius:3, marginTop:8, overflow:"hidden" }}><div style={{ width:"78%", height:"100%", background:C.gold, borderRadius:3 }} /></div>}
            </Card>
          ))}
        </div>
        <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:10 }}>🔥 Leads prioritaires</div>
        <Card style={{ padding:0, overflow:"hidden", marginBottom:14 }}>
          {PRO_LEADS.slice(0,3).map((l,i)=>(
            <div key={i} onClick={()=>onAsk(l.q)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderBottom:i<2?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <div style={{ fontSize:22 }}>{l.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{l.name} — {l.ville}</div>
                <div style={{ fontSize:11, color:C.text2 }}>Budget estimé : {l.budget}</div>
              </div>
              <span style={{ fontSize:14 }}>{l.temp}</span>
            </div>
          ))}
        </Card>
        <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:10 }}>🏗️ Chantiers en cours</div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {PRO_CHANTIERS.map((c,i)=>(
            <div key={i} onClick={()=>onAsk(`Mon chantier "${c.name}" est à ${c.pct}% d'avancement. Quels sont les points clés à vérifier avant la prochaine étape ?`)} style={{ padding:"12px 14px", borderBottom:i<PRO_CHANTIERS.length-1?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ fontSize:20 }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{c.name} — {c.client}</div>
                  <div style={{ fontSize:11, color:C.text2 }}>{c.date}</div>
                </div>
                <div style={{ fontSize:12, fontWeight:700, color:C.gold }}>{c.pct}%</div>
              </div>
              <div style={{ height:4, background:C.surface2, borderRadius:4, overflow:"hidden" }}>
                <div style={{ width:`${c.pct}%`, height:"100%", borderRadius:4, background:c.status==="green"?C.green:c.status==="warn"?C.orange:C.blue }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PRO LEADS ────────────────────────────────────────────────────────────────
function ProLeadsScreen({ onAsk }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <Logo size={22} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12 }}>🔥 Pipeline Leads</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:3 }}>287 000€ de pipeline · 34% de conversion</div>
      </GradHeader>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
          {[["287k€",C.gold,"Pipeline"],["34%",C.green,"Conversion"],["214€",C.text,"Coût/lead"]].map(([v,color,l])=>(
            <Card key={l} style={{ padding:"14px", marginBottom:0 }}>
              <div style={{ fontSize:16, fontWeight:900, color, lineHeight:1, marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:10, color:C.text3 }}>{l}</div>
            </Card>
          ))}
        </div>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {PRO_LEADS.map((l,i)=>(
            <div key={i} onClick={()=>onAsk(l.q)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom:i<PRO_LEADS.length-1?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <div style={{ fontSize:22 }}>{l.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{l.name} — {l.ville}</div>
                <div style={{ fontSize:11, color:C.text2 }}>Budget : {l.budget}</div>
              </div>
              <span style={{ fontSize:13 }}>{l.temp} <span style={{ fontSize:11, color:C.text2 }}>{l.label}</span></span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PROFIL ───────────────────────────────────────────────────────────────────
function ProfilScreen({ user, onLogout }) {
  const items = [["👤","Informations personnelles"],["🔔","Notifications"],["🔒","Sécurité"],["🌍","Langue & région"],["⭐","Mes avis"],["❓","Aide & support"],["📜","Conditions d'utilisation"]];
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <div style={{ width:70, height:70, borderRadius:20, background:"rgba(240,192,96,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, margin:"0 auto 12px" }}>👤</div>
        <div style={{ fontSize:20, fontWeight:800, color:C.white, textAlign:"center" }}>{user.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", textAlign:"center", marginTop:3 }}>{user.email || "utilisateur@homely.fr"}</div>
        <div style={{ display:"flex", justifyContent:"center", marginTop:10 }}>
          <span style={{ background:"rgba(240,192,96,0.2)", color:C.gold, borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, border:"1px solid rgba(240,192,96,0.3)" }}>
            {user.role==="proprietaire"?"🏠 Propriétaire":"👷 Professionnel"}
          </span>
        </div>
      </GradHeader>
      <div style={{ padding:"20px 16px" }}>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {items.map(([ic,lb],i)=>(
            <div key={lb} style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 16px", borderBottom:i<items.length-1?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <span style={{ fontSize:20 }}>{ic}</span>
              <span style={{ fontSize:13, fontWeight:500, color:C.text, flex:1 }}>{lb}</span>
              <span style={{ color:C.text3 }}>›</span>
            </div>
          ))}
        </Card>
        <Btn onClick={onLogout} outline style={{ marginTop:16 }}>🚪 Se déconnecter</Btn>
        <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:C.text3 }}>Maison Zen v1.0 · Votre maison, en toute sérénité.</div>
      </div>
    </div>
  );
}

// ─── AI CHAT PANEL ────────────────────────────────────────────────────────────
function AIChatPanel({ initQuestion, onClose, userRole }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoB64, setPhotoB64] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const messagesEndRef = useRef(null);
  const fileRef = useRef(null);

  const SYSTEM = userRole === "professionnel"
    ? `Tu es Homely IA, l'assistant professionnel de l'application Homely pour les coordinateurs de travaux clé en main. Tu aides à gérer les leads, chantiers, artisans, dossiers CEE/MaPrimeRénov et à optimiser la rentabilité. Profil actif : Serenova Alsace, coordinateur travaux, Strasbourg. CA cible 80 000€/mois, marge 30%. Réponds en français, de façon concise, professionnelle et orientée business.`
    : `Tu es Homely IA, l'assistant intelligent de l'application Homely — le carnet d'entretien digital de la maison. Tu aides les propriétaires à comprendre l'état de leur maison, planifier les entretiens, identifier des problèmes (y compris via photos), trouver les bons artisans et maximiser les aides (MaPrimeRénov', CEE, etc.). Maison de l'utilisateur (Samir, Alsace) : PAC Daikin (révision en retard), VMC (filtre à changer), Tableau électrique (contrôle conseillé), Gouttières (nettoyage urgent). Réponds en français, de façon concise et pratique. Utilise des emojis avec modération.`;

  const SUGGESTIONS = userRole === "professionnel"
    ? ["Analyser mon pipeline","Optimiser dossier CEE","Chantier le plus rentable ?","Relancer un lead froid"]
    : ["État de ma PAC 🌡️","Quelles aides disponibles ?","Préparer l'hiver ❄️","Valeur de ma maison ?"];

  useEffect(() => {
    if (initQuestion) {
      sendMsg(initQuestion);
    } else {
      addAI(userRole === "professionnel"
        ? "Bonjour ! 👷 Je suis votre assistant Homely Pro.\n\n**Votre activité** :\n• 8 clients actifs · 3 chantiers en cours\n• 2 leads chauds en attente de suivi\n\nComment puis-je vous aider ?"
        : "Bonjour ! 🏠 Je suis votre assistant Homely.\n\n**2 points urgents** sur votre maison :\n• 🔴 Révision PAC en retard\n• 🔴 Gouttières à nettoyer\n\nQue puis-je faire pour vous ?"
      );
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const addAI = (text) => setMessages(prev => [...prev, { role:"ai", text }]);
  const addUser = (text) => setMessages(prev => [...prev, { role:"user", text }]);

  const sendMsg = async (text) => {
    if (!text && !photoB64) return;
    const userText = text || "📸 Analysez cette photo";
    addUser(userText);
    setInput("");
    setLoading(true);
    const userContent = [];
    if (photoB64) {
      userContent.push({ type:"image", source:{ type:"base64", media_type:"image/jpeg", data:photoB64 }});
      setPhotoB64(null); setPhotoName("");
    }
    if (text) userContent.push({ type:"text", text });
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: SYSTEM,
          messages:[{ role:"user", content: userContent.length===1 && userContent[0].type==="text" ? userContent[0].text : userContent }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(c=>c.text||"").join("") || "Une erreur est survenue.";
      addAI(reply);
    } catch {
      addAI("⚠️ Erreur de connexion. Vérifiez votre connexion internet.");
    }
    setLoading(false);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhotoB64(ev.target.result.split(",")[1]); setPhotoName(file.name); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const formatMsg = (text) => text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:500, display:"flex", alignItems:"flex-end", backdropFilter:"blur(4px)" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:C.surface, width:"100%", maxWidth:430, margin:"0 auto", borderRadius:"20px 20px 0 0", maxHeight:"90vh", display:"flex", flexDirection:"column", border:`1px solid ${C.border}` }}>
        {/* Header */}
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏠</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.text }}>Homely IA</div>
            <div style={{ fontSize:11, color:C.green, display:"flex", alignItems:"center", gap:4 }}><div style={{ width:6, height:6, borderRadius:"50%", background:C.green }} />Assistant intelligent</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.text2, fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        {/* Photo upload */}
        <div style={{ padding:"8px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", gap:8 }}>
          <button onClick={()=>fileRef.current.click()} style={{ flex:1, padding:"8px", borderRadius:8, border:`1px dashed ${C.border}`, background:"none", color:C.text2, fontSize:12, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            📸 Analyser un équipement par photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
        </div>
        {photoB64 && (
          <div style={{ padding:"8px 14px", background:C.bg, display:"flex", alignItems:"center", gap:10, borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontSize:20 }}>📎</span>
            <span style={{ fontSize:12, color:C.text2, flex:1 }}>{photoName}</span>
            <button onClick={()=>{setPhotoB64(null);setPhotoName("");}} style={{ background:"none", border:"none", color:C.text3, cursor:"pointer" }}>✕</button>
          </div>
        )}
        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px 14px", display:"flex", flexDirection:"column", gap:10 }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", flexDirection:m.role==="user"?"row-reverse":"row" }}>
              <div style={{ width:28, height:28, borderRadius:8, background:m.role==="ai"?`linear-gradient(135deg,${C.gold},${C.gold2})`:C.surface2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{m.role==="ai"?"🏠":"👤"}</div>
              <div style={{ maxWidth:"82%", padding:"10px 13px", borderRadius:m.role==="ai"?"4px 12px 12px 12px":"12px 4px 12px 12px", background:m.role==="ai"?C.surface2:"rgba(240,192,96,0.12)", color:C.text, fontSize:13, lineHeight:1.55, border:`1px solid ${m.role==="ai"?C.border:"rgba(240,192,96,0.2)"}` }} dangerouslySetInnerHTML={{ __html:formatMsg(m.text) }} />
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🏠</div>
              <div style={{ padding:"10px 14px", borderRadius:"4px 12px 12px 12px", background:C.surface2, border:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", gap:4 }}>
                  {[0,1,2].map(i=><div key={i} style={{ width:6, height:6, borderRadius:"50%", background:C.text3, animation:"typing 1.2s infinite", animationDelay:`${i*0.2}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Suggestions */}
        <div style={{ padding:"8px 14px", display:"flex", gap:6, flexWrap:"wrap", borderTop:`1px solid ${C.border}` }}>
          {SUGGESTIONS.map(s=>(
            <button key={s} onClick={()=>sendMsg(s)} style={{ padding:"5px 10px", borderRadius:20, border:`1px solid ${C.border}`, background:"none", color:C.text2, fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>{s}</button>
          ))}
        </div>
        {/* Input */}
        <div style={{ padding:"10px 14px 20px", borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:8 }}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg(input);}}} placeholder="Posez une question sur votre maison..." rows={1} style={{ flex:1, background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 13px", color:C.text, fontFamily:"inherit", fontSize:13, outline:"none", resize:"none", maxHeight:80 }} />
            <button onClick={()=>sendMsg(input)} disabled={loading} style={{ width:38, height:38, borderRadius:10, border:"none", background:C.gold, color:C.navy, fontSize:16, cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>➤</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState(null);

  const handleAuth = (u) => { setUser(u); setScreen("app"); setPage(u.role==="professionnel"?"pro-dashboard":"dashboard"); };
  const handleLogout = () => { setUser(null); setScreen("splash"); };
  const openChat = (q=null) => { setChatQuestion(q); setChatOpen(true); };
  const closeChat = () => { setChatOpen(false); setChatQuestion(null); };

  const NAV_PRO = [
    { id:"pro-dashboard", icon:"📊", label:"Dashboard" },
    { id:"pro-leads",     icon:"🔥", label:"Leads" },
    { id:"artisans",      icon:"👷", label:"Artisans" },
    { id:"profil",        icon:"👤", label:"Profil" },
  ];

  const NAV_PROPRIO = [
    { id:"dashboard",  icon:"🏠", label:"Accueil" },
    { id:"equipements",icon:"🔧", label:"Équipements" },
    { id:"alertes",    icon:"🔔", label:"Alertes" },
    { id:"travaux",    icon:"📋", label:"Travaux" },
    { id:"artisans",   icon:"👷", label:"Artisans" },
  ];

  const NAV = user?.role === "professionnel" ? NAV_PRO : NAV_PROPRIO;

  if (screen === "splash") return <SplashScreen onGo={setScreen} />;
  if (screen === "login")  return <AuthScreen mode="login"    onAuth={handleAuth} onSwitch={()=>setScreen("register")} />;
  if (screen === "register") return <AuthScreen mode="register" onAuth={handleAuth} onSwitch={()=>setScreen("login")} />;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", minHeight:"100vh", background:C.bg, color:C.text, maxWidth:430, margin:"0 auto", position:"relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {page==="dashboard"     && <DashboardScreen    user={user} onAsk={openChat} />}
      {page==="equipements"   && <EquipementsScreen  onAsk={openChat} />}
      {page==="alertes"       && <AlertesScreen      onAsk={openChat} />}
      {page==="travaux"       && <TravauxScreen      onAsk={openChat} />}
      {page==="artisans"      && <ArtisansScreen     onAsk={openChat} />}
      {page==="pro-dashboard" && <ProDashboardScreen user={user} onAsk={openChat} />}
      {page==="pro-leads"     && <ProLeadsScreen     onAsk={openChat} />}
      {page==="profil"        && <ProfilScreen       user={user} onLogout={handleLogout} />}

      {/* NAV BAR */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.surface, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"10px 0 20px", zIndex:200 }}>
        {NAV.map(n=>(
          <div key={n.id} onClick={()=>setPage(n.id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", color:page===n.id?C.gold:C.text3, fontSize:10, fontWeight:page===n.id?700:400, minWidth:48 }}>
            <span style={{ fontSize:22 }}>{n.icon}</span>
            <span>{n.label}</span>
            {page===n.id && <div style={{ width:4, height:4, borderRadius:"50%", background:C.gold }} />}
          </div>
        ))}
        {/* AI Button */}
        <div onClick={()=>openChat()} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", color:C.gold, fontSize:10, fontWeight:700, minWidth:48 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginTop:-16, boxShadow:`0 4px 16px ${C.goldGlow}` }}>🤖</div>
          <span style={{ marginTop:2 }}>IA</span>
        </div>
      </div>

      {/* AI CHAT PANEL */}
      {chatOpen && <AIChatPanel initQuestion={chatQuestion} onClose={closeChat} userRole={user?.role} />}
    </div>
  );
}