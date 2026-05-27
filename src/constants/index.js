export const C = {
  blue: "#1A6EFF", blueDark: "#0048CC", blueDeep: "#003099", blueLight: "#4D95FF",
  blueBg: "#EEF4FF", blueGlow: "rgba(26,110,255,0.18)", dark: "#050E2A", text: "#1A2340",
  muted: "#7A88AA", white: "#FFFFFF", border: "#D6E4FF", bg: "#F4F7FF",
  success: "#00C07F", successBg: "#E6FAF4", warn: "#FF9800", warnBg: "#FFF3E0",
};

export const BRAND = "Blasty";

export const PLANS = [
  { id:"starter",  icon:"🌱", name:"Starter",  price:4990,  rdv:50,   sms:100,  popular:false },
  { id:"pro",      icon:"⭐", name:"Pro",      price:12990, rdv:200,  sms:400,  popular:true  },
  { id:"business", icon:"🏢", name:"Business", price:29990, rdv:500,  sms:1000, popular:false },
  { id:"premium",  icon:"👑", name:"Premium",  price:74990, rdv:1500, sms:3000, popular:false },
];

export const CATEGORIES = [
  { id:"medecin",        label:"Médecin",            labelAr:"طبيب",           icon:"🩺", priority:1,  group:"Santé & Médical" },
  { id:"dentiste",       label:"Dentiste",            labelAr:"طبيب أسنان",     icon:"🦷", priority:1,  group:"Santé & Médical" },
  { id:"kine",           label:"Kiné",                labelAr:"معالج",          icon:"🦴", priority:1,  group:"Santé & Médical" },
  { id:"specialiste",    label:"Spécialiste",         labelAr:"أخصائي",         icon:"🩻", priority:1,  group:"Santé & Médical" },
  { id:"psy",            label:"Psychologue",         labelAr:"نفساني",         icon:"🧠", priority:1,  group:"Santé & Médical" },
  { id:"optique",        label:"Opticien",            labelAr:"بصري",           icon:"👁", priority:1,  group:"Santé & Médical" },
  { id:"veterinaire",    label:"Vétérinaire",         labelAr:"بيطري",          icon:"🐾", priority:1,  group:"Santé & Médical" },
  { id:"coiffeur",       label:"Coiffeur",            labelAr:"حلاق",           icon:"💇", priority:2,  group:"Beauté & Coiffure" },
  { id:"barbier",        label:"Barbier",             labelAr:"حلاق رجالي",     icon:"✂",  priority:2,  group:"Beauté & Coiffure" },
  { id:"coloriste",      label:"Coloriste",           labelAr:"صبغة شعر",       icon:"🎨", priority:2,  group:"Beauté & Coiffure" },
  { id:"estheticienne",  label:"Esthéticienne",       labelAr:"مختصة تجميل",    icon:"💅", priority:3,  group:"Esthétique" },
  { id:"epilation",      label:"Épilation",           labelAr:"إزالة شعر",      icon:"🌸", priority:3,  group:"Esthétique" },
  { id:"maquillage",     label:"Maquillage",          labelAr:"مكياج",          icon:"💄", priority:3,  group:"Esthétique" },
  { id:"tatouage",       label:"Tatouage",            labelAr:"وشم",            icon:"🖊", priority:3,  group:"Esthétique" },
  { id:"sourcils",       label:"Sourcils & Cils",     labelAr:"رموش وحواجب",    icon:"👁", priority:3,  group:"Esthétique" },
  { id:"dermato",        label:"Dermatologue",        labelAr:"جلدي",           icon:"🔬", priority:4,  group:"Esthétique Médicale" },
  { id:"laser",          label:"Laser",               labelAr:"ليزر",           icon:"⚡", priority:4,  group:"Esthétique Médicale" },
  { id:"botox",          label:"Botox / Fillers",     labelAr:"بوتوكس",         icon:"✨", priority:4,  group:"Esthétique Médicale" },
  { id:"massage",        label:"Massage",             labelAr:"مساج",           icon:"💆", priority:5,  group:"Bien-être & Soins" },
  { id:"spa",            label:"Spa / Hammam",        labelAr:"سبا وحمام",      icon:"🛁", priority:5,  group:"Bien-être & Soins" },
  { id:"yoga",           label:"Yoga",                labelAr:"يوغا",           icon:"🧘", priority:5,  group:"Bien-être & Soins" },
  { id:"dietetique",     label:"Diététicien",         labelAr:"أخصائي تغذية",   icon:"🥗", priority:5,  group:"Bien-être & Soins" },
  { id:"osteo",          label:"Ostéopathe",          labelAr:"معالج عظام",     icon:"🦷", priority:5,  group:"Bien-être & Soins" },
  { id:"coach",          label:"Coach Sportif",       labelAr:"مدرب رياضي",     icon:"🏋", priority:6,  group:"Sport & Fitness" },
  { id:"sallesport",     label:"Salle de Sport",      labelAr:"نادي رياضي",     icon:"💪", priority:6,  group:"Sport & Fitness" },
  { id:"piscine",        label:"Piscine",             labelAr:"مسبح",           icon:"🏊", priority:6,  group:"Sport & Fitness" },
  { id:"tennis",         label:"Tennis / Padel",      labelAr:"تنس",            icon:"🎾", priority:6,  group:"Sport & Fitness" },
  { id:"artsmartiaux",   label:"Arts Martiaux",       labelAr:"فنون قتالية",    icon:"🥋", priority:6,  group:"Sport & Fitness" },
  { id:"cours",          label:"Cours Particuliers",  labelAr:"دروس خصوصية",    icon:"📚", priority:7,  group:"Cours & Formation" },
  { id:"langues",        label:"Langues",             labelAr:"لغات",           icon:"🌍", priority:7,  group:"Cours & Formation" },
  { id:"autoecole",      label:"Auto-École",          labelAr:"مدرسة قيادة",    icon:"🚗", priority:7,  group:"Cours & Formation" },
  { id:"musique",        label:"Musique",             labelAr:"موسيقى",         icon:"🎵", priority:7,  group:"Cours & Formation" },
  { id:"informatique",   label:"Informatique",        labelAr:"إعلام آلي",      icon:"💻", priority:7,  group:"Cours & Formation" },
  { id:"restaurant",     label:"Restaurant",          labelAr:"مطعم",           icon:"🍽", priority:8,  group:"Restauration" },
  { id:"traiteur",       label:"Traiteur",            labelAr:"خدمة ضيافة",     icon:"🍳", priority:8,  group:"Restauration" },
  { id:"cafe",           label:"Café / Salon de thé", labelAr:"مقهى",           icon:"☕", priority:8,  group:"Restauration" },
  { id:"photo",          label:"Photographe",         labelAr:"مصور",           icon:"📸", priority:9,  group:"Événementiel" },
  { id:"dj",             label:"DJ / Musicien",       labelAr:"دي جي",          icon:"🎧", priority:9,  group:"Événementiel" },
  { id:"sallefetes",     label:"Salle des Fêtes",     labelAr:"قاعة أفراح",     icon:"🎊", priority:9,  group:"Événementiel" },
  { id:"decorateur",     label:"Décorateur",          labelAr:"مزيّن",          icon:"🌺", priority:9,  group:"Événementiel" },
  { id:"taxi",           label:"Taxi",                labelAr:"تاكسي",          icon:"🚕", priority:10, group:"Transport" },
  { id:"locationvoiture",label:"Location Voiture",    labelAr:"تأجير سيارة",    icon:"🚘", priority:10, group:"Transport" },
  { id:"transfert",      label:"Transfert Aéroport",  labelAr:"نقل مطار",       icon:"✈", priority:10, group:"Transport" },
  { id:"hotel",          label:"Hôtel",               labelAr:"فندق",           icon:"🏨", priority:11, group:"Hébergement" },
  { id:"riad",           label:"Riad / Chalet",       labelAr:"رياض / شاليه",   icon:"🏡", priority:11, group:"Hébergement" },
  { id:"locationvac",    label:"Location Vacances",   labelAr:"إيجار عطلة",     icon:"🏖", priority:11, group:"Hébergement" },
  { id:"plombier",       label:"Plombier",            labelAr:"سباك",           icon:"🔧", priority:12, group:"Services à domicile" },
  { id:"electricien",    label:"Électricien",         labelAr:"كهربائي",        icon:"⚡", priority:12, group:"Services à domicile" },
  { id:"clim",           label:"Climatisation",       labelAr:"تكييف",          icon:"❄", priority:12, group:"Services à domicile" },
  { id:"nettoyage",      label:"Nettoyage",           labelAr:"تنظيف",          icon:"🧹", priority:12, group:"Services à domicile" },
  { id:"demenagement",   label:"Déménagement",        labelAr:"انتقال",         icon:"📦", priority:12, group:"Services à domicile" },
  { id:"notaire",        label:"Notaire",             labelAr:"موثق",           icon:"📜", priority:13, group:"Administratif & Juridique" },
  { id:"avocat",         label:"Avocat",              labelAr:"محامي",          icon:"⚖", priority:13, group:"Administratif & Juridique" },
  { id:"comptable",      label:"Comptable",           labelAr:"محاسب",          icon:"📊", priority:13, group:"Administratif & Juridique" },
  { id:"architecte",     label:"Architecte",          labelAr:"مهندس معماري",   icon:"🏗", priority:13, group:"Administratif & Juridique" },
  { id:"traducteur",     label:"Traducteur",          labelAr:"مترجم",          icon:"🌐", priority:13, group:"Administratif & Juridique" },
  { id:"toilettage",     label:"Toilettage",          labelAr:"تجميل حيوانات",  icon:"🐩", priority:14, group:"Animaux" },
  { id:"petsitting",     label:"Pet-Sitting",         labelAr:"رعاية حيوانات",  icon:"🐾", priority:14, group:"Animaux" },
  { id:"dressage",       label:"Dressage",            labelAr:"تدريب حيوانات",  icon:"🐕", priority:14, group:"Animaux" },
];

export const GROUPS = [...new Set(CATEGORIES.map(c => c.group))];

export const DAYS_FR = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
export const DAYS_AR = ["أحد","اثن","ثلا","أرب","خمي","جمع","سبت"];
export const DAYS_FULL_FR = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
export const DAYS_FULL_AR = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

export const CITIES = ["Toutes villes","Oran","Alger","Constantine","Annaba","Tizi Ouzou","Sétif","Blida"];

export const ALL_TIME_SLOTS = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"];

export const PARTNER_OFFERS = [
  { id:1, emoji:"🍽", name:"Restaurant El Bahia",  category:"Restaurant · Oran Centre",        promoTag:"-15%",          offerTitle:"Réduction de 15% ce weekend sur tous les menus",          offerSub:"Offre valable sam & dim · 50 places restantes", bgColor:"#1A1A2E", bgColor2:"#0F3460" },
  { id:2, emoji:"💇", name:"Salon Prestige Oran",  category:"Coiffure & Beauté · Bir El Djir",  promoTag:"Offre spéciale", offerTitle:"Coupe + soin offert pour toute réservation via Blasty",  offerSub:"Valable toute la semaine · 20 créneaux dispo",  bgColor:"#1A2E1A", bgColor2:"#0D3B0D" },
  { id:3, emoji:"🏨", name:"Hotel Les Falaises",   category:"Hotel 4 etoiles · Front de Mer",   promoTag:"-20%",          offerTitle:"20% de réduction sur les chambres du weekend",            offerSub:"Check-in ven-dim · Petit-déjeuner inclus",     bgColor:"#2E1A1A", bgColor2:"#3B0D0D" },
];
