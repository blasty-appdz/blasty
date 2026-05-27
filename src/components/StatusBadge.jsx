import { C } from "../constants";

const StatusBadge = ({ status, isAr }) => (
  <div style={{ fontSize:11, fontWeight:800, padding:"5px 12px", borderRadius:20, background:status==="confirmed"?C.successBg:status==="cancelled"?"#FEE2E2":C.warnBg, color:status==="confirmed"?C.success:status==="cancelled"?"#B91C1C":C.warn, whiteSpace:"nowrap" }}>
    {status==="confirmed"?(isAr?"مؤكد":"Confirmé"):status==="cancelled"?(isAr?"ملغى":"Annulé"):(isAr?"انتظار":"Attente")}
  </div>
);

export default StatusBadge;
