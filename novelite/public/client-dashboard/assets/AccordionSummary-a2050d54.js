import{r as d,a2 as n,ac as M,a0 as N,j as l}from"./index-f22446e5.js";import{a as w,g as G,s as g,d as v,c as j,B as T}from"./Typography-493ceae3.js";import{P as U}from"./Paper-eafa25ad.js";import{u as W}from"./useControlled-7a3bcd39.js";import{C as E}from"./Collapse-44c0c5ba.js";const q=d.createContext({}),D=q;function _(o){return G("MuiAccordion",o)}const L=w("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),R=L,H=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],O=o=>{const{classes:s,square:e,expanded:r,disabled:a,disableGutters:i}=o;return j({root:["root",!e&&"rounded",r&&"expanded",a&&"disabled",!i&&"gutters"],region:["region"]},_,s)},z=g(U,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:e}=o;return[{[`& .${R.region}`]:s.region},s.root,!e.square&&s.rounded,!e.disableGutters&&s.gutters]}})(({theme:o})=>{const s={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],s),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],s)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${R.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${R.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o,ownerState:s})=>n({},!s.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!s.disableGutters&&{[`&.${R.expanded}`]:{margin:"16px 0"}})),F=d.forwardRef(function(s,e){const r=M({props:s,name:"MuiAccordion"}),{children:a,className:i,defaultExpanded:c=!1,disabled:u=!1,disableGutters:m=!1,expanded:S,onChange:f,square:y=!1,TransitionComponent:C=E,TransitionProps:A}=r,h=N(r,H),[t,p]=W({controlled:S,default:c,name:"Accordion",state:"expanded"}),b=d.useCallback(V=>{p(!t),f&&f(V,!t)},[t,f,p]),[$,...I]=d.Children.toArray(a),P=d.useMemo(()=>({expanded:t,disabled:u,disableGutters:m,toggle:b}),[t,u,m,b]),k=n({},r,{square:y,disabled:u,disableGutters:m,expanded:t}),B=O(k);return l.jsxs(z,n({className:v(B.root,i),ref:e,ownerState:k,square:y},h,{children:[l.jsx(D.Provider,{value:P,children:$}),l.jsx(C,n({in:t,timeout:"auto"},A,{children:l.jsx("div",{"aria-labelledby":$.props.id,id:$.props["aria-controls"],role:"region",className:B.region,children:I})}))]}))}),mo=F;function J(o){return G("MuiAccordionDetails",o)}w("MuiAccordionDetails",["root"]);const K=["className"],Q=o=>{const{classes:s}=o;return j({root:["root"]},J,s)},X=g("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),Y=d.forwardRef(function(s,e){const r=M({props:s,name:"MuiAccordionDetails"}),{className:a}=r,i=N(r,K),c=r,u=Q(c);return l.jsx(X,n({className:v(u.root,a),ref:e,ownerState:c},i))}),fo=Y;function Z(o){return G("MuiAccordionSummary",o)}const oo=w("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),x=oo,so=["children","className","expandIcon","focusVisibleClassName","onClick"],eo=o=>{const{classes:s,expanded:e,disabled:r,disableGutters:a}=o;return j({root:["root",e&&"expanded",r&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",e&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",e&&"expanded"]},Z,s)},ro=g(T,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o,ownerState:s})=>{const e={duration:o.transitions.duration.shortest};return n({display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],e),[`&.${x.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${x.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${x.disabled})`]:{cursor:"pointer"}},!s.disableGutters&&{[`&.${x.expanded}`]:{minHeight:64}})}),to=g("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,s)=>s.content})(({theme:o,ownerState:s})=>n({display:"flex",flexGrow:1,margin:"12px 0"},!s.disableGutters&&{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${x.expanded}`]:{margin:"20px 0"}})),ao=g("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,s)=>s.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${x.expanded}`]:{transform:"rotate(180deg)"}})),no=d.forwardRef(function(s,e){const r=M({props:s,name:"MuiAccordionSummary"}),{children:a,className:i,expandIcon:c,focusVisibleClassName:u,onClick:m}=r,S=N(r,so),{disabled:f=!1,disableGutters:y,expanded:C,toggle:A}=d.useContext(D),h=b=>{A&&A(b),m&&m(b)},t=n({},r,{expanded:C,disabled:f,disableGutters:y}),p=eo(t);return l.jsxs(ro,n({focusRipple:!1,disableRipple:!0,disabled:f,component:"div","aria-expanded":C,className:v(p.root,i),focusVisibleClassName:v(p.focusVisible,u),onClick:h,ref:e,ownerState:t},S,{children:[l.jsx(to,{className:p.content,ownerState:t,children:a}),c&&l.jsx(ao,{className:p.expandIconWrapper,ownerState:t,children:c})]}))}),xo=no;export{mo as A,xo as a,fo as b};
