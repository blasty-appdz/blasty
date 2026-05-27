import { C, BRAND } from "../constants";

const BrandLogo = ({ size=28, white=true }) => (
  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
    <div style={{ width:size+8, height:size+8, borderRadius:(size+8)*0.28, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.65, flexShrink:0 }}>📅</div>
    <span style={{ fontSize:size, fontWeight:900, color:white?C.white:C.blue, letterSpacing:-0.5 }}>{BRAND}</span>
  </div>
);

export default BrandLogo;
