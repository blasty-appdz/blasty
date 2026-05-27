import { C } from "../constants";
import { getCat } from "../utils/helpers";
import GradHeader from "../components/GradHeader";
import Card from "../components/Card";
import { PrimaryBtn } from "../components/Buttons";

function ProProfileScreen({ pro, isAr, onBack, onBook }) {
  const cat = getCat(pro.category_id);
  const stars = Math.floor(pro.rating || 5);
  return (
    <div style={{ paddingBottom:40 }}>
      <GradHeader>
        <button onClick={onBack} style={{ position:"absolute", top:52, [isAr?"right":"left"]:16, background:"rgba(255,255,255,.2)", border:"none", color:"#fff", width:40, height:40, borderRadius:13, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div style={{ width:90, height:90, borderRadius:26, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:46, margin:"0 auto 14px" }}>{pro.img || "👤"}</div>
        <div style={{ fontSize:22, fontWeight:900, color:"#fff", textAlign:"center" }}>{isAr&&pro.name_ar ? pro.name_ar : pro.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", textAlign:"center", marginTop:4 }}>{cat.icon} {isAr?cat.labelAr:cat.label} · {pro.city}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:4, marginTop:8 }}>
          {Array.from({length:5}).map((_,i) => (
            <span key={i} style={{ fontSize:20, color:i<stars?"#FFB830":"rgba(255,255,255,.3)" }}>★</span>
          ))}
          <span style={{ color:"rgba(255,255,255,.8)", fontSize:13, marginLeft:6, alignSelf:"center" }}>{pro.rating} ({pro.reviews_count} avis)</span>
        </div>
      </GradHeader>

      <div style={{ padding:"20px 20px 0" }}>
        {/* Infos rapides */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
          {[
            ["📍", isAr?"المدينة":"Ville",        pro.city],
            ["💰", isAr?"السعر":"Tarif",          pro.price || "Sur devis"],
            ["🟢", isAr?"التوفر":"Dispo",         pro.next_available || "Disponible"],
          ].map(([ic,lb,val]) => (
            <div key={lb} style={{ background:"#fff", borderRadius:16, padding:"12px 10px", textAlign:"center", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{lb}</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.dark, marginTop:2 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Spécialité */}
        {pro.speciality && (
          <Card>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:6 }}>🎓 {isAr?"التخصص":"Spécialité"}</div>
            <div style={{ fontSize:13, color:C.muted }}>{pro.speciality}</div>
          </Card>
        )}

        {/* Description */}
        {pro.description && (
          <Card>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:6 }}>📝 {isAr?"الوصف":"À propos"}</div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>{pro.description}</div>
          </Card>
        )}

        {/* Adresse */}
        {pro.address && (
          <Card>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:6 }}>📍 {isAr?"العنوان":"Adresse"}</div>
            <div style={{ fontSize:13, color:C.muted }}>{pro.address}</div>
          </Card>
        )}

        {/* Catégorie badge */}
        <Card style={{ background:C.blueBg }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:50, height:50, borderRadius:14, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{cat.icon}</div>
            <div>
              <div style={{ fontSize:13, color:C.muted }}>{isAr?"التخصص":"Catégorie"}</div>
              <div style={{ fontSize:15, fontWeight:800, color:C.blue }}>{isAr?cat.labelAr:cat.label}</div>
            </div>
          </div>
        </Card>

        {/* Bouton réserver */}
        <PrimaryBtn onClick={() => onBook(pro)} style={{ marginTop:8 }}>
          📅 {isAr ? "احجز موعداً الآن" : "Réserver un RDV maintenant"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default ProProfileScreen;
