import { C } from "../constants";

export const PrimaryBtn = ({ children, onClick, disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ background:`linear-gradient(135deg,${C.blue},${C.blueDark})`, color:C.white, border:"none", borderRadius:16, padding:"15px 24px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", width:"100%", boxShadow:`0 6px 22px ${C.blueGlow}`, opacity:disabled?.7:1, ...style }}>
    {children}
  </button>
);

export const OutlineBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ background:"transparent", color:C.blue, border:`2px solid ${C.blue}`, borderRadius:16, padding:"14px 24px", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", width:"100%", ...style }}>
    {children}
  </button>
);
