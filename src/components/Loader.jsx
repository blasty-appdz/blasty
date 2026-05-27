import { C } from "../constants";

const Loader = () => (
  <div style={{ textAlign:"center", padding:60, color:C.muted }}>
    <div style={{ fontSize:36, marginBottom:12 }}>⏳</div>
    <div style={{ fontSize:14, fontWeight:600 }}>Chargement...</div>
  </div>
);

export default Loader;
