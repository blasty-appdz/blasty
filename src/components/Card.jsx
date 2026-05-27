import { C } from "../constants";

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background:C.white, borderRadius:22, padding:18, marginBottom:14, boxShadow:"0 2px 18px rgba(26,110,255,.07)", border:`1px solid ${C.border}`, cursor:onClick?"pointer":"default", ...style }}>
    {children}
  </div>
);

export default Card;
