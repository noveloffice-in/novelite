var j=Object.defineProperty;var b=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var x=(n,t,e)=>t in n?j(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,f=(n,t)=>{for(var e in t||(t={}))L.call(t,e)&&x(n,e,t[e]);if(b)for(var e of b(t))M.call(t,e)&&x(n,e,t[e]);return n};import{_ as c,r as y,u as $,x as T,j as s,c as u}from"./index-85be31c7.js";import{b as z,g as O,s as C,d as R,T as w,a as F}from"./Typography-080e93f2.js";import{u as _,F as N}from"./Modal-5b74a126.js";import{O as S}from"./Select-7830f08f.js";function U(n){return O("MuiInputAdornment",n)}const k=z("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),g=k;var I;const B=["children","className","component","disablePointerEvents","disableTypography","position","variant"],H=(n,t)=>{const{ownerState:e}=n;return[t.root,t[`position${u(e.position)}`],e.disablePointerEvents===!0&&t.disablePointerEvents,t[e.variant]]},W=n=>{const{classes:t,disablePointerEvents:e,hiddenLabel:i,position:o,size:r,variant:l}=n,p={root:["root",e&&"disablePointerEvents",o&&`position${u(o)}`,l,i&&"hiddenLabel",r&&`size${u(r)}`]};return F(p,U,t)},q=C("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:H})(({theme:n,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(n.vars||n).palette.action.active},t.variant==="filled"&&{[`&.${g.positionStart}&:not(.${g.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),D=y.forwardRef(function(t,e){const i=$({props:t,name:"MuiInputAdornment"}),{children:o,className:r,component:l="div",disablePointerEvents:p=!1,disableTypography:E=!1,position:m,variant:v}=i,P=T(i,B),a=_()||{};let d=v;v&&a.variant,a&&!d&&(d=a.variant);const h=c({},i,{hiddenLabel:a.hiddenLabel,size:a.size,disablePointerEvents:p,position:m,variant:d}),A=W(h);return s.jsx(N.Provider,{value:null,children:s.jsx(q,c({as:l,ownerState:h,className:R(A.root,r),ref:e},P,{children:typeof o=="string"&&!E?s.jsx(w,{color:"text.secondary",children:o}):s.jsxs(y.Fragment,{children:[m==="start"?I||(I=s.jsx("span",{className:"notranslate",children:"​"})):null,o]})}))})}),Y=D,G=C(n=>s.jsx(S,f({},n)))(({theme:n})=>({"& .MuiOutlinedInput-input::-webkit-input-placeholder":{color:n.palette.text.secondary,opacity:"0.8"},"& .MuiTypography-root":{color:n.palette.text.secondary},"& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder":{color:n.palette.text.secondary,opacity:"1"}})),Z=G;export{Z as C,Y as I};
