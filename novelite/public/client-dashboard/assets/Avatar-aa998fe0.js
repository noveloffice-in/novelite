import{j as u,_ as l,r as v,A as C}from"./index-5a3f6a76.js";import{a as I,g as D,s as m,d as F,b as M}from"./Typography-36c6dc69.js";import{u as N,c as z}from"./useSlot-df301bfc.js";import{c as U}from"./Grid-40636f23.js";const T=U(u.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function _(r){return I("MuiAvatar",r)}D("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const E=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],L=z(),q=r=>{const{classes:e,variant:t,colorDefault:o}=r;return M({root:["root",t,o&&"colorDefault"],img:["img"],fallback:["fallback"]},_,e)},B=m("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],t.colorDefault&&e.colorDefault]}})(({theme:r})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:r.typography.fontFamily,fontSize:r.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(r.vars||r).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:l({color:(r.vars||r).palette.background.default},r.vars?{backgroundColor:r.vars.palette.Avatar.defaultBg}:l({backgroundColor:r.palette.grey[400]},r.applyStyles("dark",{backgroundColor:r.palette.grey[600]})))}]})),H=m("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(r,e)=>e.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),W=m(T,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(r,e)=>e.fallback})({width:"75%",height:"75%"});function $({crossOrigin:r,referrerPolicy:e,src:t,srcSet:o}){const[n,s]=v.useState(!1);return v.useEffect(()=>{if(!t&&!o)return;s(!1);let i=!0;const a=new Image;return a.onload=()=>{i&&s("loaded")},a.onerror=()=>{i&&s("error")},a.crossOrigin=r,a.referrerPolicy=e,a.src=t,o&&(a.srcset=o),()=>{i=!1}},[r,e,t,o]),n}const G=v.forwardRef(function(e,t){const o=L({props:e,name:"MuiAvatar"}),{alt:n,children:s,className:i,component:a="div",slots:x={},slotProps:A={},imgProps:y,sizes:P,src:p,srcSet:f,variant:k="circular"}=o,R=C(o,E);let c=null;const S=$(l({},y,{src:p,srcSet:f})),b=p||f,h=b&&S!=="error",d=l({},o,{colorDefault:!h,component:a,variant:k}),g=q(d),[w,j]=N("img",{className:g.img,elementType:H,externalForwardedProps:{slots:x,slotProps:{img:l({},y,A.img)}},additionalProps:{alt:n,src:p,srcSet:f,sizes:P},ownerState:d});return h?c=u.jsx(w,l({},j)):s||s===0?c=s:b&&n?c=n[0]:c=u.jsx(W,{ownerState:d,className:g.fallback}),u.jsx(B,l({as:a,ownerState:d,className:F(g.root,i),ref:t},R,{children:c}))}),V=G;export{V as A};