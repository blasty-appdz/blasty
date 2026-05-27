import { useState, useEffect } from "react";
import { C } from "../constants";
import { PARTNER_OFFERS } from "../constants";

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
          <button
            onClick={() => onBook && onBook(o)}
            style={{ background:"linear-gradient(135deg,#1A6EFF,#0048CC)", color:"#fff", border:"none", borderRadius:14, padding:"10px 18px", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}
          >
            {isAr ? "احجز" : "Réserver"}
          </button>
        </div>
      </div>
      <div style={{ display:"flex", gap:5, justifyContent:"center", marginTop:10 }}>
        {PARTNER_OFFERS.map((_,i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width:i===current?20:6, height:6, borderRadius:3, background:i===current?"#1A6EFF":"#D6E4FF", cursor:"pointer", transition:"all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

export default PartnerBanner;
