import { useState, useEffect } from "react";
import { C, CATEGORIES, GROUPS, CITIES } from "../constants";
import { supabase } from "../lib/supabase";
import { getCat } from "../utils/helpers";
import GradHeader from "../components/GradHeader";
import BrandLogo from "../components/BrandLogo";
import Card from "../components/Card";
import Loader from "../components/Loader";
import PartnerBanner from "../components/PartnerBanner";

function HomeScreen({ user, isAr, lang, setLang, onBook }) {
  const [search, setSearch] = useState("");
  const [selCat, setSelCat] = useState(null);
  const [selGroup, setSelGroup] = useState(null);
  const [city, setCity] = useState("Toutes villes");
  const [showCats, setShowCats] = useState(false);
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comingSoon, setComingSoon] = useState("");

  useEffect(() => {
    const fetchPros = async () => {
      setLoading(true);
      const { data } = await supabase.from("professionals").select("*").eq("active", true).order("rating", { ascending:false });
      if (data) setPros(data);
      setLoading(false);
    };
    fetchPros();
  }, []);

  const topCats = CATEGORIES.filter(c => c.priority <= 5);
  const filtered = pros.filter(p => {
    const cat = getCat(p.category_id);
    const matchCat    = !selCat   || p.category_id === selCat;
    const matchGroup  = !selGroup || cat.group === selGroup;
    const matchCity   = city === "Toutes villes" || p.city === city;
    const matchSearch = !search   || p.name.toLowerCase().includes(search.toLowerCase()) || cat.label?.toLowerCase().includes(search.toLowerCase()) || p.speciality?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchGroup && matchCity && matchSearch;
  });
  const clearFilters = () => { setSelCat(null); setSelGroup(null); setSearch(""); setCity("Toutes villes"); };

  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <button onClick={() => setLang(lang === "fr" ? "ar" : "fr")} style={{ position:"absolute", top:52, [isAr?"left":"right"]:16, background:"rgba(255,255,255,.18)", border:"none", color:C.white, borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          {lang === "fr" ? "عربي" : "FR"}
        </button>
        <BrandLogo size={26} />
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginTop:12, lineHeight:1.35 }}>
          {isAr ? `مرحباً ${user.name}` : `Bonjour ${user.name.split(" ")[0]}`}
        </div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:3 }}>
          {isAr ? "احجز موعدك بسهولة" : "Réservez votre rendez-vous facilement"}
        </div>
        <div style={{ background:"rgba(255,255,255,.95)", borderRadius:16, padding:"13px 16px", display:"flex", alignItems:"center", gap:10, marginTop:16, boxShadow:"0 6px 24px rgba(0,0,48,.15)" }}>
          <span style={{ fontSize:18 }}>🔍</span>
          <input style={{ border:"none", outline:"none", flex:1, fontSize:14, color:C.text, background:"transparent", fontFamily:"inherit" }}
            placeholder={isAr ? "ابحث عن طبيب، حلاق، هوتيل..." : "Médecin, coiffeur, hôtel, taxi..."}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </GradHeader>

      <div style={{ display:"flex", background:C.white, margin:"16px 20px 0", borderRadius:18, overflow:"hidden", boxShadow:`0 2px 16px ${C.blueGlow}`, border:`1px solid ${C.border}` }}>
        {[["1000+", isAr?"محترف":"Pros"], ["14", isAr?"قطاع":"Secteurs"], ["4.8★", isAr?"تقييم":"Note"]].map(([n,l],i) => (
          <div key={l} style={{ flex:1, textAlign:"center", padding:"12px 8px", borderRight:i<2?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{n}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>

      <PartnerBanner isAr={isAr} onBook={(o) => setComingSoon(isAr ? `قريباً: ${o.name}` : `Bientôt disponible : ${o.name}`)} />
      {comingSoon && (
        <div style={{ margin:"0 20px 4px", background:C.warnBg, color:C.warn, borderRadius:12, padding:"10px 14px", fontSize:13, fontWeight:600, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span>{"🚧"} {comingSoon}</span>
          <span onClick={() => setComingSoon("")} style={{ cursor:"pointer", fontSize:16, marginLeft:8 }}>{"✕"}</span>
        </div>
      )}

      <div style={{ padding:"0 20px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>{isAr ? "التخصصات" : "Catégories populaires"}</div>
          <button onClick={() => setShowCats(!showCats)} style={{ background:C.blueBg, color:C.blue, border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            {showCats ? (isAr?"أقل":"Moins") : (isAr?"الكل":"Toutes")} →
          </button>
        </div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6 }}>
          <button onClick={clearFilters} style={{ background:!selCat&&!selGroup?C.blue:C.white, color:!selCat&&!selGroup?C.white:C.muted, border:`1.5px solid ${!selCat&&!selGroup?C.blue:C.border}`, borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
            {isAr ? "الكل" : "Tous"}
          </button>
          {topCats.map(cat => (
            <button key={cat.id} onClick={() => { setSelCat(cat.id); setSelGroup(null); }} style={{ background:selCat===cat.id?C.blue:C.white, color:selCat===cat.id?C.white:C.muted, border:`1.5px solid ${selCat===cat.id?C.blue:C.border}`, borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:5 }}>
              <span>{cat.icon}</span> {isAr ? cat.labelAr : cat.label}
            </button>
          ))}
        </div>

        {showCats && (
          <div style={{ background:C.white, borderRadius:20, padding:18, marginTop:12, boxShadow:`0 4px 20px ${C.blueGlow}`, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:14 }}>
              {isAr ? `جميع الخدمات (${CATEGORIES.length}+)` : `Tous les services (${CATEGORIES.length}+)`}
            </div>
            {GROUPS.map(group => (
              <div key={group} style={{ marginBottom:16 }}>
                <button onClick={() => { setSelGroup(selGroup===group?null:group); setSelCat(null); setShowCats(false); }} style={{ fontSize:12, fontWeight:800, color:selGroup===group?C.blue:C.muted, background:selGroup===group?C.blueBg:"transparent", border:`1px solid ${selGroup===group?C.blue:C.border}`, borderRadius:10, padding:"4px 10px", cursor:"pointer", marginBottom:8, fontFamily:"inherit" }}>
                  {group} {selGroup===group?"✓":""}
                </button>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {CATEGORIES.filter(c => c.group === group).map(cat => (
                    <button key={cat.id} onClick={() => { setSelCat(cat.id); setSelGroup(null); setShowCats(false); }} style={{ background:selCat===cat.id?C.blue:C.blueBg, color:selCat===cat.id?C.white:C.blue, border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                      {cat.icon} {isAr ? cat.labelAr : cat.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, marginBottom:4 }}>
          <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>📍</span>
          <select onChange={e => setCity(e.target.value)} value={city} style={{ border:`1.5px solid ${C.border}`, borderRadius:12, padding:"7px 12px", fontSize:13, color:C.text, background:C.white, fontFamily:"inherit", cursor:"pointer", flex:1 }}>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {(selCat || selGroup || city !== "Toutes villes" || search) && (
            <button onClick={clearFilters} style={{ background:"#FEE2E2", color:"#B91C1C", border:"none", borderRadius:12, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>Reset</button>
          )}
        </div>
      </div>

      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:14 }}>
          {selCat ? `${getCat(selCat).icon} ${isAr?getCat(selCat).labelAr:getCat(selCat).label}` : selGroup ? selGroup : isAr ? "جميع المهنيون" : "Tous les professionnels"}
          <span style={{ color:C.muted, fontWeight:500, fontSize:13, marginLeft:6 }}>({filtered.length})</span>
        </div>
        {loading ? <Loader /> : filtered.map(pro => {
          const cat = getCat(pro.category_id);
          return (
            <Card key={pro.id} onClick={() => onBook(pro)}>
              <div style={{ display:"flex", gap:14 }}>
                <div style={{ width:60, height:60, borderRadius:18, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{pro.img || "👤"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{isAr&&pro.name_ar ? pro.name_ar : pro.name}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{pro.speciality} · {pro.city}</div>
                  <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                    <span style={{ background:C.blueBg, color:C.blue, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{cat.icon} {isAr?cat.labelAr:cat.label}</span>
                    <span style={{ fontSize:12, color:"#FFB830" }}>{"★".repeat(Math.floor(pro.rating || 5))}</span>
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
                  {isAr ? "احجز" : "Réserver"}
                </button>
              </div>
            </Card>
          );
        })}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:50, color:C.muted }}>
            <div style={{ fontSize:48 }}>🔍</div>
            <div style={{ marginTop:12, fontSize:15, fontWeight:700 }}>{isAr ? "لا توجد نتائج" : "Aucun résultat"}</div>
            <div style={{ fontSize:13, marginTop:4 }}>{isAr ? "جرب فئة أو مدينة أخرى" : "Essayez une autre catégorie ou ville"}</div>
            <button onClick={clearFilters} style={{ marginTop:16, background:C.blue, color:C.white, border:"none", borderRadius:12, padding:"10px 20px", fontFamily:"inherit", fontWeight:700, cursor:"pointer" }}>{isAr ? "إعادة ضبط" : "Réinitialiser"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
