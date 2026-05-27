import { C } from "../constants";

const GradHeader = ({ children }) => (
  <div style={{ background:`linear-gradient(155deg,${C.blue} 0%,${C.blueDark} 60%,${C.blueDeep} 100%)`, padding:"52px 20px 32px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,.05)" }} />
    <div style={{ position:"absolute", bottom:-20, left:-20, width:110, height:110, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
    {children}
    <div style={{ position:"absolute", bottom:-2, left:0, right:0, height:30, background:C.bg, borderRadius:"50% 50% 0 0 / 20px 20px 0 0" }} />
  </div>
);

export default GradHeader;
