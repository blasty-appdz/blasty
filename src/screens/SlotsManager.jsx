import { useState, useEffect } from "react";
import { C, ALL_TIME_SLOTS, DAYS_FR, DAYS_AR, DAYS_FULL_FR, DAYS_FULL_AR } from "../constants";
import { supabase } from "../lib/supabase";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function SlotsManager({ proInfo, isAr }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [slots, setSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!proInfo) return;
    const fetchSlots = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("availability")
        .select("slot_time, is_available")
        .eq("professional_id", proInfo.id)
        .eq("day_of_week", selectedDay);

      const map = {};
      ALL_TIME_SLOTS.forEach(s => { map[s] = false; });
      if (data && data.length > 0) {
        data.forEach(row => {
          const t = row.slot_time.slice(0,5);
          map[t] = row.is_available;
        });
      }
      setSlots(map);
      setLoading(false);
    };
    fetchSlots();
  }, [selectedDay, proInfo]);

  const toggleSlot = (slot) => {
    setSlots(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  const saveSlots = async () => {
    if (!proInfo) return;
    setSaving(true);
    const rows = ALL_TIME_SLOTS.map(slot => ({
      professional_id: proInfo.id,
      day_of_week: selectedDay,
      slot_time: slot + ":00",
      is_available: slots[slot] || false,
    }));
    await supabase.from("availability").delete().eq("professional_id", proInfo.id).eq("day_of_week", selectedDay);
    await supabase.from("availability").insert(rows);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const openAll  = () => { const m = {}; ALL_TIME_SLOTS.forEach(s => m[s] = true);  setSlots(m); };
  const closeAll = () => { const m = {}; ALL_TIME_SLOTS.forEach(s => m[s] = false); setSlots(m); };
  const openCount = Object.values(slots).filter(Boolean).length;

  const dayNames = isAr ? DAYS_FULL_AR : DAYS_FULL_FR;

  return (
    <div>
      <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>
        {"🗓"} {isAr ? "إدارة الأوقات المتاحة" : "Gérer mes créneaux"}
      </div>

      <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
        {[1,2,3,4,5,6,0].map(day => (
          <button key={day} onClick={() => setSelectedDay(day)}
            style={{ minWidth:56, padding:"10px 6px", borderRadius:14, border:`2px solid ${selectedDay===day?C.blue:C.border}`, background:selectedDay===day?C.blue:C.white, color:selectedDay===day?C.white:C.dark, fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit", textAlign:"center", flexShrink:0 }}>
            <div>{(isAr?DAYS_AR:DAYS_FR)[day]}</div>
          </button>
        ))}
      </div>

      <Card style={{ padding:"14px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{dayNames[selectedDay]}</div>
            <div style={{ fontSize:12, color:C.muted }}>{openCount} {isAr?"وقت متاح":"créneaux ouverts"}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={openAll}  style={{ background:C.successBg, color:C.success,  border:"none", borderRadius:10, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{isAr?"فتح الكل":"Tout ouvrir"}</button>
            <button onClick={closeAll} style={{ background:"#FEE2E2",   color:"#B91C1C",  border:"none", borderRadius:10, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{isAr?"إغلاق الكل":"Tout fermer"}</button>
          </div>
        </div>

        {loading ? <Loader /> : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {ALL_TIME_SLOTS.map(slot => {
              const isOpen = slots[slot] || false;
              return (
                <div key={slot} onClick={() => toggleSlot(slot)}
                  style={{ padding:"10px 4px", borderRadius:12, textAlign:"center", fontSize:13, fontWeight:700, cursor:"pointer", background:isOpen?C.successBg:C.white, color:isOpen?C.success:C.muted, border:`2px solid ${isOpen?C.success:C.border}`, transition:"all .15s" }}>
                  {slot}
                  <div style={{ fontSize:9, marginTop:2 }}>{isOpen?(isAr?"متاح":"ouvert"):(isAr?"مغلق":"fermé")}</div>
                </div>
              );
            })}
          </div>
        )}

        <button onClick={saveSlots} disabled={saving}
          style={{ marginTop:16, width:"100%", background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:14, padding:"14px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", opacity:saving?0.7:1 }}>
          {saved ? (isAr?"✅ تم الحفظ":"✅ Sauvegardé !") : saving ? (isAr?"جاري الحفظ...":"Sauvegarde...") : (isAr?"حفظ التغييرات":"Sauvegarder")}
        </button>
      </Card>
    </div>
  );
}
