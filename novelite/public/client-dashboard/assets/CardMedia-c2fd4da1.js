import{r as f,u as A,x as M,j as m,_ as d}from"./index-85be31c7.js";import{b,g as v,s as g,B as w,d as C,a as y}from"./Typography-080e93f2.js";function H(o){return v("MuiCardActionArea",o)}const S=b("MuiCardActionArea",["root","focusVisible","focusHighlight"]),p=S,$=["children","className","focusVisibleClassName"],O=o=>{const{classes:s}=o;return y({root:["root"],focusHighlight:["focusHighlight"]},H,s)},j=g(w,{name:"MuiCardActionArea",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>({display:"block",textAlign:"inherit",borderRadius:"inherit",width:"100%",[`&:hover .${p.focusHighlight}`]:{opacity:(o.vars||o).palette.action.hoverOpacity,"@media (hover: none)":{opacity:0}},[`&.${p.focusVisible} .${p.focusHighlight}`]:{opacity:(o.vars||o).palette.action.focusOpacity}})),k=g("span",{name:"MuiCardActionArea",slot:"FocusHighlight",overridesResolver:(o,s)=>s.focusHighlight})(({theme:o})=>({overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:o.transitions.create("opacity",{duration:o.transitions.duration.short})})),E=f.forwardRef(function(s,t){const e=A({props:s,name:"MuiCardActionArea"}),{children:i,className:u,focusVisibleClassName:a}=e,r=M(e,$),c=e,n=O(c);return m.jsxs(j,d({className:C(n.root,u),focusVisibleClassName:C(a,n.focusVisible),ref:t,ownerState:c},r,{children:[i,m.jsx(k,{className:n.focusHighlight,ownerState:c})]}))}),D=E;function I(o){return v("MuiCardMedia",o)}b("MuiCardMedia",["root","media","img"]);const _=["children","className","component","image","src","style"],U=o=>{const{classes:s,isMediaComponent:t,isImageComponent:e}=o;return y({root:["root",t&&"media",e&&"img"]},I,s)},V=g("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:t}=o,{isMediaComponent:e,isImageComponent:i}=t;return[s.root,e&&s.media,i&&s.img]}})(({ownerState:o})=>d({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},o.isMediaComponent&&{width:"100%"},o.isImageComponent&&{objectFit:"cover"})),P=["video","audio","picture","iframe","img"],B=["picture","img"],F=f.forwardRef(function(s,t){const e=A({props:s,name:"MuiCardMedia"}),{children:i,className:u,component:a="div",image:r,src:c,style:n}=e,x=M(e,_),l=P.indexOf(a)!==-1,N=!l&&r?d({backgroundImage:`url("${r}")`},n):n,h=d({},e,{component:a,isMediaComponent:l,isImageComponent:B.indexOf(a)!==-1}),R=U(h);return m.jsx(V,d({className:C(R.root,u),as:a,role:!l&&r?"img":void 0,ref:t,style:N,ownerState:h,src:l?r||c:void 0},x,{children:i}))}),G=F;export{D as C,G as a};
