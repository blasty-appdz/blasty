import { C, BRAND } from "../constants";
import { getCat } from "../utils/helpers";
import Card from "../components/Card";
import { PrimaryBtn } from "../components/Buttons";

export default function SuccessScreen({ booking, isAr, onHome }) {
  const cat = getCat(booking.pro.category_id);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:36, textAlign:"center", background:C.bg }}>
      <div style={{ width:96, height:96, borderRadius:28, background:`linear-gradient(135deg,${C.blue},${C.blueDeep})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:46, marginBottom:24, boxShadow:`0 14px 34px ${C.blueGlow}` }}>{"✅"}</div>
      <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:10 }}>{isAr ? "تم تأكيد موعدك!" : "Rendez-vous confirmé !"}</div>
      <div style={{ fontSize:14, color:C.muted, lineHeight:1.7, marginBottom:24 }}>
        {isAr ? `موعد مع ${booking.pro.name_ar||booking.pro.name}` : `RDV avec ${booking.pro.name}`}<br/>
        {isAr ? `${booking.date.full} الساعة ${booking.time}` : `le ${booking.date.full} à ${booking.time}`}<br/><br/>
        {isAr ? `ستصلك رسالة SMS من ${BRAND}` : `Un SMS ${BRAND} vous sera envoyé`}
      </div>
      <Card style={{ width:"100%", marginBottom:24 }}>
        {[
          [`${cat.icon} ${isAr?"الخدمة":"Service"}`,         isAr?cat.labelAr:cat.label],
          [`${booking.pro.img||"👤"} ${isAr?"المهني":"Pro"}`, isAr&&booking.pro.name_ar?booking.pro.name_ar:booking.pro.name],
          [`📅 ${isAr?"التاريخ":"Date"}`,                    booking.date.full],
          [`⏰ ${isAr?"الوقت":"Heure"}`,                     booking.time],
          [`💰 ${isAr?"السعر":"Prix"}`,                      booking.pro.price],
        ].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:8 }}>
            <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:700, color:C.dark }}>{v}</span>
          </div>
        ))}
      </Card>
      <PrimaryBtn onClick={onHome}>{isAr ? "العودة للرئيسية" : "Retour à l'accueil"}</PrimaryBtn>
    </div>
  );
}
