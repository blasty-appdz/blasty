import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
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

// ─── BRAND NAME — B toujours majuscule ───────────────────────────────────────
const BRAND = "Blasty";

// ─── CATÉGORIES (ordonnées par priorité) ─────────────────────────────────────
const CATEGORIES = [
  { id:"medecin",       label:"Médecin",           labelAr:"طبيب",            icon:"🩺", priority:1, group:"Santé & Médical" },
  { id:"dentiste",      label:"Dentiste",           labelAr:"طبيب أسنان",      icon:"🦷", priority:1, group:"Santé & Médical" },
  { id:"kine",          label:"Kiné",               labelAr:"معالج",           icon:"🦴", priority:1, group:"Santé & Médical" },
  { id:"specialiste",   label:"Spécialiste",        labelAr:"أخصائي",          icon:"👨‍⚕️", priority:1, group:"Santé & Médical" },
  { id:"psy",           label:"Psychologue",        labelAr:"نفساني",          icon:"🧠", priority:1, group:"Santé & Médical" },
  { id:"optique",       label:"Opticien",           labelAr:"بصري",            icon:"👁️", priority:1, group:"Santé & Médical" },
  { id:"veterinaire",   label:"Vétérinaire",        labelAr:"بيطري",           icon:"🐾", priority:1, group:"Santé & Médical" },

  { id:"coiffeur",      label:"Coiffeur",           labelAr:"حلاق",            icon:"💇", priority:2, group:"Beauté & Coiffure" },
  { id:"barbier",       label:"Barbier",            labelAr:"حلاق رجالي",      icon:"✂️", priority:2, group:"Beauté & Coiffure" },
  { id:"coloriste",     label:"Coloriste",          labelAr:"صبغة شعر",        icon:"🎨", priority:2, group:"Beauté & Coiffure" },

  { id:"estheticienne", label:"Esthéticienne",      labelAr:"مختصة تجميل",     icon:"💅", priority:3, group:"Esthétique" },
  { id:"epilation",     label:"Épilation",          labelAr:"إزالة شعر",       icon:"🌸", priority:3, group:"Esthétique" },
  { id:"maquillage",    label:"Maquillage",         labelAr:"مكياج",           icon:"💄", priority:3, group:"Esthétique" },
  { id:"tatouage",      label:"Tatouage",           labelAr:"وشم",             icon:"🖊️", priority:3, group:"Esthétique" },
  { id:"sourcils",      label:"Sourcils & Cils",    labelAr:"رموش وحواجب",     icon:"👁️", priority:3, group:"Esthétique" },

  { id:"dermato",       label:"Dermatologue",       labelAr:"جلدي",            icon:"🔬", priority:4, group:"Esthétique Médicale" },
  { id:"laser",         label:"Laser",              labelAr:"ليزر",            icon:"⚡", priority:4, group:"Esthétique Médicale" },
  { id:"botox",         label:"Botox / Fillers",    labelAr:"بوتوكس",          icon:"✨", priority:4, group:"Esthétique Médicale" },

  { id:"massage",       label:"Massage",            labelAr:"مساج",            icon:"💆", priority:5, group:"Bien-être & Soins" },
  { id:"spa",           label:"Spa / Hammam",       labelAr:"سبا وحمام",       icon:"🛁", priority:5, group:"Bien-être & Soins" },
  { id:"yoga",          label:"Yoga",               labelAr:"يوغا",            icon:"🧘", priority:5, group:"Bien-être & Soins" },
  { id:"dietetique",    label:"Diététicien",        labelAr:"أخصائي تغذية",    icon:"🥗", priority:5, group:"Bien-être & Soins" },
  { id:"osteo",         label:"Ostéopathe",         labelAr:"معالج عظام",      icon:"🦷", priority:5, group:"Bien-être & Soins" },

  { id:"coach",         label:"Coach Sportif",      labelAr:"مدرب رياضي",      icon:"🏋️", priority:6, group:"Sport & Fitness" },
  { id:"sallesport",    label:"Salle de Sport",     labelAr:"نادي رياضي",      icon:"💪", priority:6, group:"Sport & Fitness" },
  { id:"piscine",       label:"Piscine",            labelAr:"مسبح",            icon:"🏊", priority:6, group:"Sport & Fitness" },
  { id:"tennis",        label:"Tennis / Padel",     labelAr:"تنس",             icon:"🎾", priority:6, group:"Sport & Fitness" },
  { id:"artsmartiaux",  label:"Arts Martiaux",      labelAr:"فنون قتالية",     icon:"🥋", priority:6, group:"Sport & Fitness" },

  { id:"cours",         label:"Cours Particuliers", labelAr:"دروس خصوصية",     icon:"📚", priority:7, group:"Cours & Formation" },
  { id:"langues",       label:"Langues",            labelAr:"لغات",            icon:"🌍", priority:7, group:"Cours & Formation" },
  { id:"autoecole",     label:"Auto-École",         labelAr:"مدرسة قيادة",     icon:"🚗", priority:7, group:"Cours & Formation" },
  { id:"musique",       label:"Musique",            labelAr:"موسيقى",          icon:"🎵", priority:7, group:"Cours & Formation" },
  { id:"informatique",  label:"Informatique",       labelAr:"إعلام آلي",       icon:"💻", priority:7, group:"Cours & Formation" },

  { id:"restaurant",    label:"Restaurant",         labelAr:"مطعم",            icon:"🍽️", priority:8, group:"Restauration" },
  { id:"traiteur",      label:"Traiteur",           labelAr:"خدمة ضيافة",      icon:"👨‍🍳", priority:8, group:"Restauration" },
  { id:"cafe",          label:"Café / Salon de thé",labelAr:"مقهى",            icon:"☕", priority:8, group:"Restauration" },

  { id:"photo",         label:"Photographe",        labelAr:"مصور",            icon:"📸", priority:9, group:"Événementiel" },
  { id:"dj",            label:"DJ / Musicien",      labelAr:"دي جي",           icon:"🎧", priority:9, group:"Événementiel" },
  { id:"sallefetes",    label:"Salle des Fêtes",    labelAr:"قاعة أفراح",      icon:"🎊", priority:9, group:"Événementiel" },
  { id:"decorateur",    label:"Décorateur",         labelAr:"مزيّن",           icon:"🌺", priority:9, group:"Événementiel" },

  { id:"taxi",          label:"Taxi",               labelAr:"تاكسي",           icon:"🚕", priority:10, group:"Transport" },
  { id:"locationvoiture",label:"Location Voiture",  labelAr:"تأجير سيارة",     icon:"🚘", priority:10, group:"Transport" },
  { id:"transfert",     label:"Transfert Aéroport", labelAr:"نقل مطار",        icon:"✈️", priority:10, group:"Transport" },

  { id:"hotel",         label:"Hôtel",              labelAr:"فندق",            icon:"🏨", priority:11, group:"Hébergement" },
  { id:"riad",          label:"Riad / Chalet",      labelAr:"رياض / شاليه",    icon:"🏡", priority:11, group:"Hébergement" },
  { id:"locationvac",   label:"Location Vacances",  labelAr:"إيجار عطلة",      icon:"🏖️", priority:11, group:"Hébergement" },

  { id:"plombier",      label:"Plombier",           labelAr:"سباك",            icon:"🔧", priority:12, group:"Services à domicile" },
  { id:"electricien",   label:"Électricien",        labelAr:"كهربائي",         icon:"⚡", priority:12, group:"Services à domicile" },
  { id:"clim",          label:"Climatisation",      labelAr:"تكييف",           icon:"❄️", priority:12, group:"Services à domicile" },
  { id:"nettoyage",     label:"Nettoyage",          labelAr:"تنظيف",           icon:"🧹", priority:12, group:"Services à domicile" },
  { id:"demenagement",  label:"Déménagement",       labelAr:"انتقال",          icon:"📦", priority:12, group:"Services à domicile" },

  { id:"notaire",       label:"Notaire",            labelAr:"موثق",            icon:"📜", priority:13, group:"Administratif & Juridique" },
  { id:"avocat",        label:"Avocat",             labelAr:"محامي",           icon:"⚖️", priority:13, group:"Administratif & Juridique" },
  { id:"comptable",     label:"Comptable",          labelAr:"محاسب",           icon:"📊", priority:13, group:"Administratif & Juridique" },
  { id:"architecte",    label:"Architecte",         labelAr:"مهندس معماري",    icon:"🏗️", priority:13, group:"Administratif & Juridique" },
  { id:"traducteur",    label:"Traducteur",         labelAr:"مترجم",           icon:"🌐", priority:13, group:"Administratif & Juridique" },

  { id:"toilettage",    label:"Toilettage",         labelAr:"تجميل حيوانات",   icon:"🐩", priority:14, group:"Animaux" },
  { id:"petsitting",    label:"Pet-Sitting",        labelAr:"رعاية حيوانات",   icon:"🐾", priority:14, group:"Animaux" },
  { id:"dressage",      label:"Dressage",           labelAr:"تدريب حيوانات",   icon:"🐕", priority:14, group:"Animaux" },
];

const GROUPS = [...new Set(CATEGORIES.map(c => c.group))];

// ─── MOCK PROFESSIONALS ───────────────────────────────────────────────────────
const PROFESSIONALS = [
  { id:1,  name:"Dr. Amina Benali",   nameAr:"د. أمينة بن علي",  catId:"medecin",       spec:"Généraliste",        city:"Alger",       rating:4.9, reviews:124, price:"800 DA",  img:"👩‍⚕️", next:"Aujourd'hui 14:00" },
  { id:2,  name:"Salon Nour",         nameAr:"صالون نور",         catId:"coiffeur",      spec:"Coiffure & Soin",    city:"Oran",        rating:4.7, reviews:89,  price:"1200 DA", img:"💇‍♀️", next:"Demain 10:30"      },
  { id:3,  name:"Dr. Karim Meziani", nameAr:"د. كريم مزياني",   catId:"dentiste",      spec:"Orthodontie",        city:"Constantine", rating:4.8, reviews:67,  price:"1500 DA", img:"🦷",   next:"Lun. 09:00"        },
  { id:4,  name:"Clinic Santé+",     nameAr:"عيادة صحة بلاس",   catId:"specialiste",   spec:"Cardiologue",        city:"Alger",       rating:5.0, reviews:210, price:"2000 DA", img:"❤️‍🩺", next:"Aujourd'hui 16:30" },
  { id:5,  name:"Barber King",        nameAr:"باربر كينغ",        catId:"barbier",       spec:"Barbier Homme",      city:"Alger",       rating:4.6, reviews:155, price:"600 DA",  img:"✂️",  next:"Demain 11:00"      },
  { id:6,  name:"Dr. Sonia Haddad",  nameAr:"د. سونيا حداد",    catId:"dentiste",      spec:"Chirurgie dentaire", city:"Annaba",      rating:4.9, reviews:43,  price:"1800 DA", img:"😁",  next:"Aujourd'hui 15:00" },
  { id:7,  name:"Centre Bien-Être",  nameAr:"مركز العافية",      catId:"spa",           spec:"Spa & Hammam",       city:"Alger",       rating:4.8, reviews:88,  price:"2500 DA", img:"🛁",  next:"Demain 14:00"      },
  { id:8,  name:"Dr. Yacine Aït",    nameAr:"د. ياسين آيت",      catId:"medecin",       spec:"Pédiatre",           city:"Tizi Ouzou",  rating:4.7, reviews:196, price:"1000 DA", img:"👶",  next:"Jeu. 10:00"        },
  { id:9,  name:"Studio Flash",       nameAr:"ستوديو فلاش",       catId:"photo",         spec:"Photo & Vidéo",      city:"Alger",       rating:4.8, reviews:72,  price:"5000 DA", img:"📸",  next:"Demain 10:00"      },
  { id:10, name:"Me. Rachid Amrani", nameAr:"م. رشيد عمراني",    catId:"avocat",        spec:"Droit commercial",   city:"Alger",       rating:4.7, reviews:38,  price:"3000 DA", img:"⚖️",  next:"Lun. 14:00"        },
  { id:11, name:"Coach Ryad",         nameAr:"كوتش رياض",         catId:"coach",         spec:"Musculation",        city:"Oran",        rating:4.9, reviews:112, price:"1500 DA", img:"🏋️",  next:"Aujourd'hui 08:00" },
  { id:12, name:"Hôtel El Djazair",  nameAr:"فندق الجزائر",      catId:"hotel",         spec:"Hôtel 4 étoiles",    city:"Alger",       rating:4.8, reviews:320, price:"8000 DA", img:"🏨",  next:"Disponible"        },
  { id:13, name:"Taxi Express",       nameAr:"تاكسي إكسبريس",     catId:"taxi",          spec:"Transfert & ville",  city:"Alger",       rating:4.5, reviews:445, price:"500 DA",  img:"🚕",  next:"Immédiat"          },
  { id:14, name:"Rest. Bab El Oued", nameAr:"مطعم باب الوادي",   catId:"restaurant",    spec:"Cuisine algérienne", city:"Alger",       rating:4.6, reviews:203, price:"1500 DA", img:"🍽️",  next:"Ce soir 20:00"     },
  { id:15, name:"Beauty Lab",         nameAr:"بيوتي لاب",         catId:"estheticienne", spec:"Soins visage & corps",city:"Oran",       rating:4.9, reviews:91,  price:"2000 DA", img:"💅",  next:"Demain 11:30"      },
  { id:16, name:"Dr. Maya Laser",    nameAr:"د. مايا ليزر",      catId:"laser",         spec:"Épilation laser",    city:"Alger",       rating:4.8, reviews:156, price:"4000 DA", img:"⚡",  next:"Mar. 10:00"        },
];

const DAYS_FR = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
const DAYS_AR = ["أحد","اثن","ثلا","أرب","خمي","جمع","سبت"];
const CITIES  = ["Toutes villes","Alger","Oran","Constantine","Annaba","Tizi Ouzou","Sétif","Blida"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

// ─── CORRECTION 1 : date dynamique pour ProDashboard ─────────────────────────
function getTodayLabel(isAr) {
  const now = new Date();
  const daysFR = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const daysAR = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  const monthsFR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const monthsAR = ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  if (isAr) return `${daysAR[now.getDay()]} ${now.getDate()} ${monthsAR[now.getMonth()]} ${now.getFullYear()}`;
  return `${daysFR[now.getDay()]} ${now.getDate()} ${monthsFR[now.getMonth()]} ${now.getFullYear()}`;
}

function getDates(isAr) {
  return Array.from({ length:7 }, (_,i) => {
    const d = new Date(); d.setDate(d.getDate()+i);
    return { label:(isAr?DAYS_AR:DAYS_FR)[d.getDay()], num:d.getDate(), full:d.toLocaleDateString("fr-DZ") };
  });
}

function getCat(id) { return CATEGORIES.find(c=>c.id===id)||{}; }

// ─── SHARED UI ────────────────────────────────────────────────────────────────
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
  <button onClick={onClick} style={{ background:"transparent", color:C.blue, border:`2px solid ${C.blue}`, borderRadius:16, padding:"14px 24px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", width:"100%" , ...style }}>
    {children}
  </button>
);

const StatusBadge = ({ status, isAr }) => (
  <div style={{ fontSize:11, fontWeight:800, padding:"5px 12px", borderRadius:20, background:status==="confirmed"?C.successBg:C.warnBg, color:status==="confirmed"?C.success:C.warn, whiteSpace:"nowrap" }}>
    {status==="confirmed"?(isAr?"✓ مؤكد":"✓ Confirmé"):(isAr?"⏳ انتظار":"⏳ Attente")}
  </div>
);

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen({ onGo }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${C.blue},${C.blueDeep})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, position:"relative", overflow:"hidden" }}>
      {[["-70px","-70px",280],[null,"-50px",200,"70px"],["38%","25%",130]].map(([t,r,s,l],i)=>(
        <div key={i} style={{ position:"absolute", top:t||"auto", right:r||"auto", left:l||"auto", bottom:i===2?"8%":"auto", width:s, height:s, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
      ))}
      <div style={{ width:114, height:114, borderRadius:34, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:60, marginBottom:10, boxShadow:"0 20px 50px rgba(0,0,0,.25)", backdropFilter:"blur(10px)" }}>📅</div>
      <div style={{ fontSize:44, fontWeight:900, color:C.white, letterSpacing:-1, marginBottom:6 }}>{BRAND}</div>
      <div style={{ fontSize:15, color:"rgba(255,255,255,.8)", textAlign:"center", lineHeight:1.8, marginBottom:10 }}>
        Réservez en quelques secondes.
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:36, marginTop:6 }}>
        {["🩺 Santé","💇 Beauté","💅 Esthétique","💆 Bien-être","🍽️ Resto","🏨 Hôtel","🚕 Taxi","📸 Photo"].map(lb=>(
          <span key={lb} style={{ background:"rgba(255,255,255,.15)", color:C.white, borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:600, backdropFilter:"blur(4px)" }}>{lb}</span>
        ))}
      </div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
        <button onClick={()=>onGo("login")} style={{ background:"rgba(255,255,255,.95)", color:C.blue, border:"none", borderRadius:18, padding:"17px", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 24px rgba(0,0,0,.2)" }}>
          Se connecter
        </button>
        <button onClick={()=>onGo("register")} style={{ background:"transparent", color:C.white, border:"2px solid rgba(255,255,255,.5)", borderRadius:18, padding:"16px", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>
          Créer un compte
        </button>
      </div>
      {/* CORRECTION 2 : Oran au lieu de Alger */}
      <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:24 }}>🇩🇿 Fait à Oran avec ❤️ · {BRAND} v1.0</div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({ mode, onAuth, onSwitch }) {
  const [form,setForm]       = useState({ name:"", phone:"", password:"", role:"client" });
  const [loading,setLoading] = useState(false);
  const [error,setError]     = useState("");
  const isLogin = mode==="login";
  const inp = { border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", fontSize:14, outline:"none", fontFamily:"inherit", background:C.white, width:"100%", boxSizing:"border-box", color:C.text };

  const handle = async () => {
    setError("");
    if (!form.phone||!form.password) { setError("Veuillez remplir tous les champs."); return; }
    if (!isLogin&&!form.name) { setError("Entrez votre nom."); return; }
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    setLoading(false);
    onAuth({ name:form.name||"Utilisateur", phone:form.phone, role:form.role });
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
        <PrimaryBtn onClick={handle} disabled={loading}>{loading?"⏳ Chargement...":isLogin?"Se connecter →":"Créer mon compte →"}</PrimaryBtn>
        <div style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.muted }}>
          {isLogin?"Pas encore de compte ? ":"Déjà un compte ? "}
          <span style={{ color:C.blue, fontWeight:700, cursor:"pointer" }} onClick={onSwitch}>{isLogin?"S'inscrire":"Se connecter"}</span>
        </div>
        <div style={{ textAlign:"center", marginTop:24, fontSize:12, color:C.muted }}>En continuant, vous acceptez les <span style={{ color:C.blue }}>CGU de {BRAND}</span></div>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ user, isAr, lang, setLang, onBook }) {
  const [search,  setSearch]  = useState("");
  const [selCat,  setSelCat]  = useState(null);
  const [selGroup,setSelGroup]= useState(null);
  const [city,    setCity]    = useState("Toutes villes");
  const [showCats,setShowCats]= useState(false);

  const topCats = CATEGORIES.filter(c=>c.priority<=5);

  const filtered = PROFESSIONALS.filter(p => {
    const cat = getCat(p.catId);
    const matchCat   = !selCat || p.catId===selCat;
    const matchGroup = !selGroup || cat.group===selGroup;
    const matchCity  = city==="Toutes villes" || p.city===city;
    const matchSearch= !search || p.name.toLowerCase().includes(search.toLowerCase()) || cat.label?.toLowerCase().includes(search.toLowerCase()) || p.spec.toLowerCase().includes(search.toLowerCase());
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

      {/* Stats */}
      <div style={{ display:"flex", background:C.white, margin:"16px 20px 0", borderRadius:18, overflow:"hidden", boxShadow:`0 2px 16px ${C.blueGlow}`, border:`1px solid ${C.border}` }}>
        {[["1000+",isAr?"محترف":"Pros"],["14",isAr?"قطاع":"Secteurs"],["4.8★",isAr?"تقييم":"Note"]].map(([n,l],i)=>(
          <div key={l} style={{ flex:1, textAlign:"center", padding:"12px 8px", borderRight:i<2?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{n}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Top categories */}
      <div style={{ padding:"18px 20px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>
            {isAr?"التخصصات":"Catégories populaires"}
          </div>
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

        {/* All categories panel */}
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

        {/* City filter */}
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

      {/* Results */}
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:14 }}>
          {selCat ? `${getCat(selCat).icon} ${isAr?getCat(selCat).labelAr:getCat(selCat).label}` :
           selGroup ? selGroup :
           isAr?"جميع المهنيون":"Tous les professionnels"}
          <span style={{ color:C.muted, fontWeight:500, fontSize:13, marginLeft:6 }}>({filtered.length})</span>
        </div>

        {filtered.map(pro => {
          const cat = getCat(pro.catId);
          return (
            <Card key={pro.id} onClick={()=>onBook(pro)}>
              <div style={{ display:"flex", gap:14 }}>
                <div style={{ width:60, height:60, borderRadius:18, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{pro.img}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{isAr?pro.nameAr:pro.name}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{pro.spec} · {pro.city}</div>
                  <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                    <span style={{ background:C.blueBg, color:C.blue, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{cat.icon} {isAr?cat.labelAr:cat.label}</span>
                    <span style={{ fontSize:12, color:"#FFB830" }}>{"★".repeat(Math.floor(pro.rating))}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:C.dark }}>{pro.rating}</span>
                    <span style={{ fontSize:12, color:C.muted }}>({pro.reviews})</span>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:14, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize:12, color:C.success, fontWeight:700 }}>🟢 {pro.next}</div>
                  <div style={{ fontSize:15, fontWeight:900, color:C.blue, marginTop:2 }}>{pro.price}</div>
                </div>
                <button style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:12, padding:"10px 20px", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>
                  {isAr?"احجز":"Réserver"}
                </button>
              </div>
            </Card>
          );
        })}

        {filtered.length===0 && (
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

// ─── BOOKING ──────────────────────────────────────────────────────────────────
function BookingScreen({ pro, isAr, onBack, onConfirm }) {
  const [date,    setDate]    = useState(null);
  const [time,    setTime]    = useState(null);
  const [note,    setNote]    = useState("");
  const [loading, setLoading] = useState(false);
  const dates = getDates(isAr);
  const cat   = getCat(pro.catId);

  const confirm = async () => {
    if (!date||!time) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1200));
    setLoading(false);
    onConfirm({ pro, date, time, note });
  };

  return (
    <div style={{ paddingBottom:40 }}>
      <GradHeader>
        <button onClick={onBack} style={{ position:"absolute", top:52, [isAr?"right":"left"]:16, background:"rgba(255,255,255,.2)", border:"none", color:C.white, width:40, height:40, borderRadius:13, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div style={{ width:72, height:72, borderRadius:22, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, margin:"0 auto 12px" }}>{pro.img}</div>
        <div style={{ fontSize:21, fontWeight:900, color:C.white, textAlign:"center" }}>{isAr?pro.nameAr:pro.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", textAlign:"center", marginTop:4 }}>{cat.icon} {isAr?cat.labelAr:cat.label} · {pro.spec} · {pro.city}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:14 }}>
          {[[`⭐ ${pro.rating}`,isAr?"تقييم":"Note"],[`👥 ${pro.reviews}`,isAr?"تعليق":"Avis"],[`💰 ${pro.price}`,isAr?"السعر":"Tarif"]].map(([v,l])=>(
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
              {[[isAr?"الخدمة":"Service",`${cat.icon} ${isAr?cat.labelAr:cat.label}`],[isAr?"المهني":"Professionnel",isAr?pro.nameAr:pro.name],[isAr?"التاريخ":"Date",date.full],[isAr?"الوقت":"Heure",time],[isAr?"السعر":"Prix",pro.price]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:10 }}>
                  <span style={{ color:C.muted }}>{k}</span>
                  <span style={{ fontWeight:700, color:C.dark }}>{v}</span>
                </div>
              ))}
              <PrimaryBtn onClick={confirm} disabled={loading} style={{ marginTop:8 }}>{loading?(isAr?"⏳ جاري التأكيد...":"⏳ Confirmation..."):isAr?"✓ تأكيد الحجز":"✓ Confirmer le RDV"}</PrimaryBtn>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SUCCESS ──────────────────────────────────────────────────────────────────
function SuccessScreen({ booking, isAr, onHome }) {
  const cat = getCat(booking.pro.catId);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:36, textAlign:"center", background:C.bg }}>
      <div style={{ width:96, height:96, borderRadius:28, background:`linear-gradient(135deg,${C.blue},${C.blueDeep})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:46, marginBottom:24, boxShadow:`0 14px 34px ${C.blueGlow}` }}>✅</div>
      <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:10 }}>{isAr?"تم تأكيد موعدك!":"Rendez-vous confirmé !"}</div>
      <div style={{ fontSize:14, color:C.muted, lineHeight:1.7, marginBottom:24 }}>
        {isAr?`موعد مع ${booking.pro.nameAr}`:`RDV avec ${booking.pro.name}`}<br/>
        {isAr?`${booking.date.full} الساعة ${booking.time}`:`le ${booking.date.full} à ${booking.time}`}<br/><br/>
        📱 {isAr?`ستصلك رسالة SMS من ${BRAND}`:`Un SMS ${BRAND} vous sera envoyé`}
      </div>
      <Card style={{ width:"100%", marginBottom:24 }}>
        {[[`${cat.icon} ${isAr?"الخدمة":"Service"}`,isAr?cat.labelAr:cat.label],[`${booking.pro.img} ${isAr?"المهني":"Pro"}`,isAr?booking.pro.nameAr:booking.pro.name],[`📅 ${isAr?"التاريخ":"Date"}`,booking.date.full],[`⏰ ${isAr?"الوقت":"Heure"}`,booking.time],[`💰 ${isAr?"السعر":"Prix"}`,booking.pro.price]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:8 }}>
            <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:700, color:C.dark }}>{v}</span>
          </div>
        ))}
      </Card>
      <PrimaryBtn onClick={onHome}>{isAr?"العودة للرئيسية":"Retour à l'accueil"}</PrimaryBtn>
    </div>
  );
}

// ─── MY BOOKINGS ──────────────────────────────────────────────────────────────
function MyBookingsScreen({ isAr, bookings }) {
  const all = [
    { pro:PROFESSIONALS[0], date:"Aujourd'hui", time:"14:00", status:"confirmed" },
    { pro:PROFESSIONALS[4], date:"Demain",       time:"11:00", status:"pending"   },
    { pro:PROFESSIONALS[12],date:"Aujourd'hui", time:"09:30", status:"confirmed"  },
    ...bookings.map(b=>({ ...b, status:"confirmed", date:b.date.full })),
  ];
  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <BrandLogo size={24} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:12 }}>{isAr?"مواعيدي":"Mes RDV"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4 }}>{all.length} {isAr?"مواعيد":"rendez-vous"}</div>
      </GradHeader>
      <div style={{ padding:"20px 20px" }}>
        {all.map((b,i)=>{
          const cat = getCat(b.pro.catId);
          return (
            <Card key={i}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:54, height:54, borderRadius:16, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{b.pro.img}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{isAr?b.pro.nameAr:b.pro.name}</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{cat.icon} {isAr?cat.labelAr:cat.label} · {b.pro.city}</div>
                  <div style={{ fontSize:13, color:C.blue, fontWeight:700, marginTop:4 }}>📅 {b.date} · ⏰ {b.time}</div>
                </div>
                {/* CORRECTION 3 : isAr passé à StatusBadge */}
                <StatusBadge status={b.status} isAr={isAr} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── PRO DASHBOARD ────────────────────────────────────────────────────────────
function ProDashboard({ user, isAr }) {
  const rdvs=[
    { time:"09:00", client:"Yasmine Bouali", clientAr:"ياسمين بوعلي",  type:"Coupe femme",   typeAr:"قصة نسائية",   status:"confirmed" },
    { time:"10:30", client:"Riad Meziane",   clientAr:"رياض مزيان",    type:"Coupe + barbe", typeAr:"قصة + لحية",   status:"confirmed" },
    { time:"11:30", client:"Fatima Cherif",  clientAr:"فاطمة شريف",    type:"Coloration",    typeAr:"صبغة",          status:"pending"   },
    { time:"14:00", client:"Omar Benali",    clientAr:"عمر بن علي",    type:"Coupe homme",   typeAr:"قصة رجالية",   status:"confirmed" },
    { time:"15:30", client:"Nadia Haddad",   clientAr:"نادية حداد",    type:"Soin kératine", typeAr:"علاج كيراتين",  status:"pending"   },
  ];
  // CORRECTION 1 : stats bilingues
  const stats=[
    ["12", isAr?"مواعيد اليوم":"RDV aujourd'hui", C.blue],
    ["84", isAr?"عملاء":"Clients",                 C.success],
    ["42k",isAr?"دخل DA":"Revenus DA",             "#9B59B6"],
    ["+3", isAr?"حجوزات جديدة":"+3 Nouvelles résas", C.warn],
  ];

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:`linear-gradient(155deg,${C.blue},${C.blueDeep})`, padding:"52px 20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.7)", fontWeight:600 }}>{isAr?"مرحباً 👋":"Bonjour 👋"}</div>
            <div style={{ fontSize:24, fontWeight:900, color:C.white, marginTop:2 }}>{user.name}</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.8)" }}>{isAr?`لوحة تحكم ${BRAND}`:`Tableau de bord ${BRAND}`}</div>
          </div>
          <div style={{ width:54, height:54, borderRadius:16, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>💼</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18 }}>
          {stats.map(([n,l,color])=>(
            <div key={l} style={{ background:C.white, borderRadius:16, padding:"14px 16px", borderLeft:`4px solid ${color}` }}>
              <div style={{ fontSize:26, fontWeight:900, color:C.dark }}>{n}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:30, background:C.bg, borderRadius:"50% 50% 0 0 / 20px 20px 0 0" }} />
      </div>
      <div style={{ padding:"20px 20px" }}>
        <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:4 }}>{isAr?"مواعيد اليوم":"Rendez-vous du jour"}</div>
        {/* CORRECTION 1 : date dynamique */}
        <div style={{ fontSize:13, color:C.muted, marginBottom:14 }}>{getTodayLabel(isAr)}</div>
        {rdvs.map((r,i)=>(
          <Card key={i} style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:C.blue, textAlign:"center", lineHeight:1.2, flexShrink:0 }}>{r.time}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{isAr?r.clientAr:r.client}</div>
                <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{isAr?r.typeAr:r.type}</div>
              </div>
              <StatusBadge status={r.status} isAr={isAr} />
            </div>
          </Card>
        ))}
        <div style={{ fontSize:16, fontWeight:800, color:C.dark, margin:"20px 0 14px" }}>{isAr?"إجراءات سريعة":"Actions rapides"}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[["➕",isAr?"موعد جديد":"Nouveau RDV"],["📊",isAr?"إحصائيات":"Statistiques"],["⚙️",isAr?"إعدادات":"Paramètres"],["💬",isAr?"رسائل":"Messages"]].map(([ic,lb])=>(
            <button key={lb} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:18, padding:"18px 14px", cursor:"pointer", fontFamily:"inherit", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:28 }}>{ic}</span>
              <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{lb}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function ProfileScreen({ user, isAr, onLogout }) {
  // CORRECTION 4 : menu items bilingues
  const items=[
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
            {user.role==="client"?(isAr?"👤 عميل":"👤 Client"):(isAr?"💼 محترف":"💼 Professionnel")}
          </span>
        </div>
      </GradHeader>
      <div style={{ padding:"20px 20px" }}>
        <Card style={{ padding:0, overflow:"hidden" }}>
          {items.map(([ic,lb],i)=>(
            <div key={lb} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderBottom:i<items.length-1?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
              <span style={{ fontSize:22 }}>{ic}</span>
              <span style={{ fontSize:14, fontWeight:600, color:C.dark, flex:1 }}>{lb}</span>
              <span style={{ color:C.muted }}>›</span>
            </div>
          ))}
        </Card>
        <OutlineBtn onClick={onLogout} style={{ marginTop:20 }}>🚪 {isAr?"تسجيل الخروج":"Se déconnecter"}</OutlineBtn>
        {/* CORRECTION 2 : Oran au lieu de Alger */}
        <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:C.muted }}>{BRAND} v1.0.0 · 🇩🇿 Oran, Algérie</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen,     setScreen]     = useState("splash");
  const [appPage,    setAppPage]    = useState("home");
  const [user,       setUser]       = useState(null);
  const [lang,       setLang]       = useState("fr");
  const [selPro,     setSelPro]     = useState(null);
  const [booking,    setBooking]    = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const isAr = lang==="ar";

  const handleAuth    = u   => { setUser(u); setScreen("app"); setAppPage("home"); };
  const handleBook    = pro => { setSelPro(pro); setAppPage("booking"); };
  const handleConfirm = b   => { setBooking(b); setMyBookings(p=>[...p,b]); setAppPage("success"); };
  const handleLogout  = ()  => { setUser(null); setScreen("splash"); };

  const NAV = user?.role==="professionnel"
    ? [["home","🏠",isAr?"الرئيسية":"Accueil"],["pro","📊",isAr?"داشبورد":"Dashboard"],["profile","👤",isAr?"حساب":"Profil"]]
    : [["home","🏠",isAr?"الرئيسية":"Accueil"],["myrdv","📅",isAr?"مواعيدي":"Mes RDV"],["profile","👤",isAr?"حساب":"Profil"]];

  const fonts = <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet" />;

  if (screen==="splash")   return <>{fonts}<SplashScreen onGo={setScreen} /></>;
  if (screen==="login")    return <>{fonts}<AuthScreen mode="login"    onAuth={handleAuth} onSwitch={()=>setScreen("register")} /></>;
  if (screen==="register") return <>{fonts}<AuthScreen mode="register" onAuth={handleAuth} onSwitch={()=>setScreen("login")}    /></>;

  return (
    <div style={{ fontFamily:"'Sora','Tajawal',sans-serif", minHeight:"100vh", background:C.bg, color:C.text, direction:isAr?"rtl":"ltr", maxWidth:430, margin:"0 auto", position:"relative" }}>
      {fonts}

      {appPage==="home"    && <HomeScreen    user={user} isAr={isAr} lang={lang} setLang={setLang} onBook={handleBook} />}
      {appPage==="booking" && selPro && <BookingScreen pro={selPro} isAr={isAr} onBack={()=>setAppPage("home")} onConfirm={handleConfirm} />}
      {appPage==="success" && booking && <SuccessScreen booking={booking} isAr={isAr} onHome={()=>setAppPage("home")} />}
      {appPage==="myrdv"   && <MyBookingsScreen isAr={isAr} bookings={myBookings} />}
      {appPage==="pro"     && <ProDashboard user={user} isAr={isAr} />}
      {appPage==="profile" && <ProfileScreen user={user} isAr={isAr} onLogout={handleLogout} />}

      {appPage!=="booking" && appPage!=="success" && (
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"10px 0 20px", zIndex:200, boxShadow:`0 -4px 20px rgba(26,110,255,.08)` }}>
          {NAV.map(([id,ic,lb])=>(
            <div key={id} onClick={()=>setAppPage(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", color:appPage===id?C.blue:C.muted, fontSize:10, fontWeight:appPage===id?800:400, transition:"all .15s" }}>
              <span style={{ fontSize:22 }}>{ic}</span>
              <span>{lb}</span>
              {appPage===id && <div style={{ width:5, height:5, borderRadius:"50%", background:C.blue }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}