import { useState, useEffect } from "react";
import { C } from "../constants";
import { supabase } from "../lib/supabase";
import { getCat } from "../utils/helpers";
import GradHeader from "../components/GradHeader";
import BrandLogo from "../components/BrandLogo";
import Card from "../components/Card";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";

export default function MyBookingsScreen({ user, isAr }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase.from("reservations").select("*").eq("client_id", user.id).order("created_at", { ascending:false });
      if (data) setReservations(data);
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  return (
    <div style={{ paddingBottom:90 }}>
      <GradHeader>
        <BrandLogo size={24} />
        <div style={{ fontSize:22, fontWeight:800, color:C.white, marginTop:12 }}>{isAr ? "مواعيدي" : "Mes RDV"}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4 }}>{reservations.length} {isAr ? "مواعيد" : "rendez-vous"}</div>
      </GradHeader>
      <div style={{ padding:"20px 20px" }}>
        {loading ? <Loader /> : reservations.length === 0 ? (
          <div style={{ textAlign:"center", padding:60, color:C.muted }}>
            <div style={{ fontSize:48 }}>{"📅"}</div>
            <div style={{ marginTop:12, fontSize:15, fontWeight:700 }}>{isAr ? "لا توجد مواعيد بعد" : "Aucun RDV pour l'instant"}</div>
          </div>
        ) : reservations.map((r,i) => {
          const cat = getCat(r.category_id);
          return (
            <Card key={i}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:54, height:54, borderRadius:16, background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{cat.icon || "📅"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{r.pro_name}</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{cat.icon} {isAr?cat.labelAr:cat.label}</div>
                  <div style={{ fontSize:13, color:C.blue, fontWeight:700, marginTop:4 }}>{"📅"} {r.date} · {"⏰"} {r.time}</div>
                </div>
                <StatusBadge status={r.status} isAr={isAr} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
