import { useState, useEffect } from "react";
import { C, PLANS } from "../constants";
import { supabase } from "../lib/supabase";
import { getTodayLabel } from "../utils/helpers";
import Card from "../components/Card";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";
import { PrimaryBtn } from "../components/Buttons";
import SlotsManager from "./SlotsManager";

export default function ProDashboard({ user, isAr }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [rdvs, setRdvs] = useState([]);
  const [proInfo, setProInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proForm, setProForm] = useState({ name:"", speciality:"", phone:"", address:"", description:"" });
  const [saved, setSaved] = useState(false);

  const userId = user.id;
  const userPhone = user.phone;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data:proData } = await supabase.from("professionals").select("*").eq("user_id", userId).single();
      if (proData) {
        setProInfo(proData);
        setProForm({ name:proData.name||"", speciality:proData.speciality||"", phone:proData.phone||userPhone||"", address:proData.address||"", description:proData.description||"" });
        const { data:rdvData } = await supabase.from("reservations").select("*").eq("professional_id", proData.id).order("created_at", { ascending:false });
        if (rdvData) setRdvs(rdvData);
      }
      setLoading(false);
    };
    fetchData();
  }, [userId, userPhone]);

  const saveProfile = async () => {
    if (!proInfo) return;
    await supabase.from("professionals").update({ name:proForm.name, speciality:proForm.speciality, phone:proForm.phone, address:proForm.address, description:proForm.description }).eq("id", proInfo.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateStatus = async (rdvId, newStatus) => {
    await supabase.from("reservations").update({ status:newStatus }).eq("id", rdvId);
    setRdvs(prev => prev.map(r => r.id === rdvId ? {...r, status:newStatus} : r));
  };

  const confirmed = rdvs.filter(r => r.status === "confirmed").length;
  const pending   = rdvs.filter(r => r.status === "pending").length;
  const cancelled = rdvs.filter(r => r.status === "cancelled").length;
  const todayStr  = new Date().toLocaleDateString("fr-DZ");
  const todayRdvs = rdvs.filter(r => r.date === todayStr);

  const clientsMap = {};
  rdvs.forEach(r => {
    if (!clientsMap[r.client_phone]) clientsMap[r.client_phone] = { name:r.client_name, phone:r.client_phone, count:0, last:r.date };
    clientsMap[r.client_phone].count++;
  });
  const clients = Object.values(clientsMap);

  const currentPlan = PLANS.find(p => p.id === proInfo?.plan) || PLANS[0];
  const rdvUsed = rdvs.filter(r => {
    const d = new Date(r.created_at || Date.now());
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const tabStyle = (t) => ({ flex:1, padding:"10px 4px", textAlign:"center", fontSize:11, fontWeight:activeTab===t?800:500, color:activeTab===t?C.blue:C.muted, borderBottom:`2px solid ${activeTab===t?C.blue:"transparent"}`, cursor:"pointer", background:"transparent", border:"none", borderBottomWidth:2, borderBottomStyle:"solid", borderBottomColor:activeTab===t?C.blue:"transparent", fontFamily:"inherit" });
  const inp = { border:`1.5px solid ${C.border}`, borderRadius:14, padding:"12px 14px", fontSize:13, outline:"none", fontFamily:"inherit", background:C.white, width:"100%", boxSizing:"border-box", color:C.text, marginTop:4 };

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:`linear-gradient(155deg,${C.blue},${C.blueDeep})`, padding:"52px 20px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.7)", fontWeight:600 }}>{isAr ? "مرحباً" : "Bonjour"}</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.white, marginTop:2 }}>{proInfo?.name || user.name}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.8)" }}>{proInfo?.speciality || ""} · {isAr ? "أوران" : "Oran"}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ background:"rgba(255,255,255,.2)", borderRadius:12, padding:"6px 12px", fontSize:12, color:C.white, fontWeight:700 }}>{currentPlan.icon} {currentPlan.name}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.7)", marginTop:4 }}>{rdvUsed}/{currentPlan.rdv} RDV</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:16 }}>
          {[
            [String(rdvs.length),      isAr?"إجمالي":"Total"],
            [String(confirmed),        isAr?"مؤكد":"Confirmés"],
            [String(pending),          isAr?"انتظار":"Attente"],
            [String(todayRdvs.length), isAr?"اليوم":"Auj."],
          ].map(([n,l]) => (
            <div key={l} style={{ background:"rgba(255,255,255,.15)", borderRadius:14, padding:"10px 8px", textAlign:"center", backdropFilter:"blur(4px)" }}>
              <div style={{ fontSize:20, fontWeight:900, color:C.white }}>{n}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.8)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:30, background:C.bg, borderRadius:"50% 50% 0 0 / 20px 20px 0 0" }} />
      </div>

      <div style={{ display:"flex", background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:10 }}>
        {[
          ["stats",    "📊", isAr?"إحصائيات":"Stats"],
          ["agenda",   "📅", isAr?"أجندة":"Agenda"],
          ["slots",    "🗓", isAr?"أوقات":"Créneaux"],
          ["clients",  "👥", isAr?"عملاء":"Clients"],
          ["settings", "⚙️", isAr?"إعدادات":"Params"],
        ].map(([t,ic,lb]) => (
          <button key={t} onClick={() => setActiveTab(t)} style={tabStyle(t)}>{ic}<br/><span style={{ fontSize:9 }}>{lb}</span></button>
        ))}
      </div>

      <div style={{ padding:"16px 20px" }}>

        {activeTab === "stats" && (
          <>
            <Card style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{isAr ? "الحصة الشهرية" : "Quota mensuel"}</span>
                <span style={{ fontSize:13, color:C.blue, fontWeight:700 }}>{rdvUsed} / {currentPlan.rdv}</span>
              </div>
              <div style={{ background:C.border, borderRadius:6, height:8, overflow:"hidden" }}>
                <div style={{ width:`${Math.min(100, Math.round(rdvUsed/currentPlan.rdv*100))}%`, height:"100%", background:rdvUsed/currentPlan.rdv>0.85?C.warn:C.blue, borderRadius:6, transition:"width .4s" }} />
              </div>
              <div style={{ fontSize:11, color:C.muted, marginTop:6 }}>{currentPlan.icon} Plan {currentPlan.name} · {currentPlan.price.toLocaleString("fr-DZ")} DA/mois</div>
            </Card>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              {[
                [confirmed, isAr?"مؤكدة":"Confirmés",  C.success, C.successBg],
                [pending,   isAr?"انتظار":"En attente", C.warn,    C.warnBg],
                [cancelled, isAr?"ملغاة":"Annulés",     "#B91C1C", "#FEE2E2"],
              ].map(([n,l,color,bg]) => (
                <div key={l} style={{ background:bg, borderRadius:16, padding:"14px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:900, color }}>{n}</div>
                  <div style={{ fontSize:11, color, marginTop:2, fontWeight:600 }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:10 }}>
              {"📅"} {isAr ? "مواعيد اليوم" : "Aujourd'hui"} — {getTodayLabel(isAr)}
            </div>
            {loading ? <Loader /> : todayRdvs.length === 0 ? (
              <div style={{ textAlign:"center", padding:30, color:C.muted, fontSize:13 }}>{isAr ? "لا مواعيد اليوم" : "Aucun RDV aujourd'hui"}</div>
            ) : todayRdvs.map((r,i) => (
              <Card key={i} style={{ padding:"12px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:C.blue, flexShrink:0 }}>{r.time}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{r.client_name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{"📞"} {r.client_phone}</div>
                  </div>
                  <StatusBadge status={r.status} isAr={isAr} />
                </div>
              </Card>
            ))}

            <div style={{ fontSize:15, fontWeight:800, color:C.dark, margin:"20px 0 12px" }}>{isAr ? "خطط الاشتراك" : "Abonnements"}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {PLANS.map(plan => (
                <div key={plan.id} style={{ background:plan.popular?C.blueBg:C.white, border:`${plan.id===currentPlan.id?"2px":"1px"} solid ${plan.id===currentPlan.id?C.blue:C.border}`, borderRadius:18, padding:"14px", position:"relative" }}>
                  {plan.popular && <div style={{ position:"absolute", top:-9, left:"50%", transform:"translateX(-50%)", background:C.blue, color:C.white, fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{isAr ? "الأشهر" : "Populaire"}</div>}
                  <div style={{ fontSize:18 }}>{plan.icon}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginTop:4 }}>{plan.name}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{plan.price.toLocaleString("fr-DZ")} <span style={{ fontSize:10, color:C.muted }}>DA/mois</span></div>
                  <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>{plan.rdv} RDV · {plan.sms} SMS</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "agenda" && (
          <>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>
              {"📋"} {isAr ? "جميع المواعيد" : "Tous les rendez-vous"} ({rdvs.length})
            </div>
            {loading ? <Loader /> : rdvs.length === 0 ? (
              <div style={{ textAlign:"center", padding:50, color:C.muted }}>
                <div style={{ fontSize:40 }}>{"📅"}</div>
                <div style={{ marginTop:10, fontSize:14 }}>{isAr ? "لا توجد مواعيد بعد" : "Aucun RDV pour l'instant"}</div>
              </div>
            ) : rdvs.map((r,i) => (
              <Card key={i} style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:50, height:50, borderRadius:14, background:C.blueBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <div style={{ fontSize:11, fontWeight:900, color:C.blue }}>{r.time}</div>
                    <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{r.date?.split("/").slice(0,2).join("/")}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{r.client_name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{"📞"} {r.client_phone}</div>
                    {r.note && <div style={{ fontSize:11, color:C.muted, marginTop:2, fontStyle:"italic" }}>"{r.note}"</div>}
                  </div>
                  <StatusBadge status={r.status} isAr={isAr} />
                </div>
                {r.status === "pending" && (
                  <div style={{ display:"flex", gap:8, marginTop:10 }}>
                    <button onClick={() => updateStatus(r.id,"confirmed")} style={{ flex:1, background:C.successBg, color:C.success, border:`1px solid ${C.success}`, borderRadius:10, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                      {isAr ? "قبول" : "Confirmer"}
                    </button>
                    <button onClick={() => updateStatus(r.id,"cancelled")} style={{ flex:1, background:"#FEE2E2", color:"#B91C1C", border:"1px solid #B91C1C", borderRadius:10, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                      {isAr ? "رفض" : "Annuler"}
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </>
        )}

        {activeTab === "slots" && (
          loading ? <Loader /> : <SlotsManager proInfo={proInfo} isAr={isAr} />
        )}

        {activeTab === "clients" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{"👥"} {isAr ? "قاعدة العملاء" : "Base clients"}</div>
              <span style={{ fontSize:12, color:C.muted }}>{clients.length} {isAr ? "عميل" : "clients"}</span>
            </div>
            {clients.length === 0 ? (
              <div style={{ textAlign:"center", padding:50, color:C.muted }}>
                <div style={{ fontSize:40 }}>{"👥"}</div>
                <div style={{ marginTop:10, fontSize:14 }}>{isAr ? "لا عملاء بعد" : "Aucun client pour l'instant"}</div>
              </div>
            ) : clients.sort((a,b) => b.count - a.count).map((cl,i) => {
              const initials = cl.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
              const colors = [["#E1F5EE","#085041"],["#EEF4FF","#003099"],["#FAEEDA","#633806"],["#FBEAF0","#72243E"]];
              const [bg,fg] = colors[i%4];
              return (
                <Card key={i} style={{ padding:"14px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:fg, flexShrink:0 }}>{initials}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{cl.name}</div>
                      <div style={{ fontSize:12, color:C.muted }}>{"📞"} {cl.phone}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:13, fontWeight:800, color:C.blue }}>{cl.count} RDV</div>
                      <div style={{ fontSize:10, color:C.muted }}>dernier: {cl.last}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </>
        )}

        {activeTab === "settings" && (
          <>
            <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:14 }}>{"⚙️"} {isAr ? "الملف المهني" : "Profil professionnel"}</div>
            <Card>
              {[
                ["name",       isAr?"الاسم الكامل":"Nom complet",   "text", isAr?"اسمك":"Dr. Karim Benali"],
                ["speciality", isAr?"التخصص":"Spécialité",          "text", isAr?"التخصص":"Médecin généraliste"],
                ["phone",      isAr?"الهاتف":"Téléphone",           "tel",  "0555 12 34 56"],
                ["address",    isAr?"العنوان":"Adresse",            "text", isAr?"العنوان":"Rue Larbi Ben M'hidi, Oran"],
              ].map(([field,label,type,ph]) => (
                <div key={field} style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>{label}</label>
                  <input style={inp} type={type} placeholder={ph} value={proForm[field]} onChange={e => setProForm({...proForm, [field]:e.target.value})} />
                </div>
              ))}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted }}>{isAr ? "الوصف" : "Description"}</label>
                <textarea style={{ ...inp, resize:"none", height:80, marginTop:4 }} placeholder={isAr ? "وصف قصير..." : "Décrivez votre activité..."} value={proForm.description} onChange={e => setProForm({...proForm, description:e.target.value})} />
              </div>
              <PrimaryBtn onClick={saveProfile}>{saved ? (isAr?"تم الحفظ":"Sauvegardé !") : (isAr?"حفظ التغييرات":"Sauvegarder")}</PrimaryBtn>
            </Card>

            <div style={{ fontSize:15, fontWeight:800, color:C.dark, margin:"20px 0 12px" }}>{isAr ? "الإشعارات" : "Notifications"}</div>
            <Card style={{ padding:0, overflow:"hidden" }}>
              {[
                [isAr?"تذكير SMS تلقائي":"Rappel SMS automatique",          true],
                [isAr?"تأكيد الموعد إلزامي":"Confirmation RDV obligatoire",  true],
                [isAr?"قبول عملاء جدد":"Accepter nouveaux clients",          true],
                [isAr?"وضع الإجازة":"Mode congé / vacances",                 false],
              ].map(([label,on],i,arr) => (
                <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <span style={{ fontSize:13, color:C.dark }}>{label}</span>
                  <div style={{ width:40, height:22, borderRadius:11, background:on?C.blue:C.border, position:"relative", cursor:"pointer", flexShrink:0 }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", background:C.white, position:"absolute", top:2, [on?"right":"left"]:2, transition:"all .2s" }} />
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

      </div>
    </div>
  );
}
