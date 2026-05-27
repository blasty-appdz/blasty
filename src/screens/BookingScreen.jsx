import { useState, useEffect } from "react";
import { C, ALL_TIME_SLOTS } from "../constants";
import { supabase } from "../lib/supabase";
import { getCat, getDates } from "../utils/helpers";
import GradHeader from "../components/GradHeader";
import Card from "../components/Card";
import { PrimaryBtn } from "../components/Buttons";

function BookingScreen({ pro, user, isAr, onBack, onConfirm }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const dates = getDates(isAr);
  const cat = getCat(pro.category_id);

  // Charger les créneaux disponibles quand on sélectionne une date
  useEffect(() => {
    if (!date || !pro.id) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setTime(null);
      const { data } = await supabase
        .from("availability")
        .select("slot_time")
        .eq("professional_id", pro.id)
        .eq("day_of_week", date.dayOfWeek)
        .eq("is_available", true)
        .order("slot_time");
      if (data && data.length > 0) {
        setAvailableSlots(data.map(s => s.slot_time.slice(0,5)));
      } else {
        // Si aucun créneau défini par le pro → fallback sur les slots par défaut
        setAvailableSlots(ALL_TIME_SLOTS);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, [date, pro.id]);

  const confirm = async () => {
    if (!date || !time) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("reservations").insert({
        client_id:user.id, professional_id:pro.id, client_name:user.name,
        client_phone:user.phone, pro_name:pro.name, category_id:pro.category_id,
        date:date.full, time, note, price:pro.price, status:"confirmed",
      }).select().single();
      if (error) throw error;
      setBookingError("");
      onConfirm({ pro, date, time, note, id:data.id });
    } catch(e) { console.error(e); setBookingError(isAr ? "حدث خطأ أثناء الحجز. حاول مجدداً." : "Erreur lors de la réservation. Veuillez réessayer."); }
    setLoading(false);
  };

  return (
    <div style={{ paddingBottom:40 }}>
      <GradHeader>
        <button onClick={onBack} style={{ position:"absolute", top:52, [isAr?"right":"left"]:16, background:"rgba(255,255,255,.2)", border:"none", color:C.white, width:40, height:40, borderRadius:13, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div style={{ width:72, height:72, borderRadius:22, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, margin:"0 auto 12px" }}>{pro.img || "👤"}</div>
        <div style={{ fontSize:21, fontWeight:900, color:C.white, textAlign:"center" }}>{isAr&&pro.name_ar ? pro.name_ar : pro.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", textAlign:"center", marginTop:4 }}>{cat.icon} {isAr?cat.labelAr:cat.label} · {pro.speciality} · {pro.city}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:14 }}>
          {[[`⭐ ${pro.rating}`, isAr?"تقييم":"Note"], [`👥 ${pro.reviews_count}`, isAr?"تعليق":"Avis"], [`💰 ${pro.price}`, isAr?"السعر":"Tarif"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center", color:C.white }}>
              <div style={{ fontSize:15, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:11, opacity:.75 }}>{l}</div>
            </div>
          ))}
        </div>
      </GradHeader>
      <div style={{ padding:"20px 20px 0" }}>
        <Card>
          <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>📅 {isAr ? "اختر التاريخ" : "Choisir la date"}</div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
            {dates.map((d,i) => (
              <div key={i} onClick={() => setDate(d)} style={{ minWidth:56, textAlign:"center", padding:"12px 8px", borderRadius:16, background:date?.num===d.num?C.blue:C.white, color:date?.num===d.num?C.white:C.dark, cursor:"pointer", border:`2px solid ${date?.num===d.num?C.blue:C.border}`, boxShadow:date?.num===d.num?`0 4px 14px ${C.blueGlow}`:"none" }}>
                <div style={{ fontSize:11, opacity:.8, fontWeight:600 }}>{d.label}</div>
                <div style={{ fontSize:20, fontWeight:900, marginTop:2 }}>{d.num}</div>
              </div>
            ))}
          </div>
        </Card>

        {date && (
          <Card>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>
              🕐 {isAr ? "اختر الوقت" : "Choisir l'heure"}
              {loadingSlots && <span style={{ fontSize:12, color:C.muted, marginLeft:8 }}>Chargement...</span>}
            </div>
            {loadingSlots ? (
              <div style={{ textAlign:"center", padding:20, color:C.muted, fontSize:13 }}>⏳</div>
            ) : availableSlots.length === 0 ? (
              <div style={{ textAlign:"center", padding:20 }}>
                <div style={{ fontSize:32 }}>😔</div>
                <div style={{ fontSize:13, color:C.muted, marginTop:8 }}>{isAr ? "لا توجد أوقات متاحة هذا اليوم" : "Aucun créneau disponible ce jour"}</div>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                {availableSlots.map((slot) => {
                  const active = time === slot;
                  return (
                    <div key={slot} onClick={() => setTime(slot)} style={{ padding:"10px 4px", borderRadius:12, textAlign:"center", fontSize:13, fontWeight:700, cursor:"pointer", background:active?C.blue:C.white, color:active?C.white:C.dark, border:`2px solid ${active?C.blue:C.border}` }}>
                      {slot}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        )}

        {date && time && (
          <>
            <Card>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:12 }}>📝 {isAr ? "ملاحظة" : "Note (optionnel)"}</div>
              <textarea style={{ border:`1.5px solid ${C.border}`, borderRadius:14, padding:"12px 14px", fontSize:14, outline:"none", fontFamily:"inherit", width:"100%", boxSizing:"border-box", resize:"none", height:80, color:C.text }} placeholder={isAr ? "سبب الزيارة..." : "Motif de la visite..."} value={note} onChange={e => setNote(e.target.value)} />
            </Card>
            <Card style={{ background:C.blueBg, border:`1.5px solid ${C.border}` }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>{isAr ? "ملخص الحجز" : "Récapitulatif"}</div>
              {[
                [isAr?"الخدمة":"Service",       `${cat.icon} ${isAr?cat.labelAr:cat.label}`],
                [isAr?"المهني":"Professionnel",  isAr&&pro.name_ar?pro.name_ar:pro.name],
                [isAr?"التاريخ":"Date",          date.full],
                [isAr?"الوقت":"Heure",           time],
                [isAr?"السعر":"Prix",            pro.price],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:10 }}>
                  <span style={{ color:C.muted }}>{k}</span>
                  <span style={{ fontWeight:700, color:C.dark }}>{v}</span>
                </div>
              ))}
              {bookingError && (
                <div style={{ background:"#FEE2E2", color:"#B91C1C", borderRadius:12, padding:"10px 14px", fontSize:13, marginBottom:8 }}>
                  {"⚠️"} {bookingError}
                </div>
              )}
              <PrimaryBtn onClick={confirm} disabled={loading} style={{ marginTop:8 }}>
                {loading ? (isAr?"جاري التأكيد...":"Confirmation...") : (isAr?"تأكيد الحجز":"Confirmer le RDV")}
              </PrimaryBtn>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingScreen;
