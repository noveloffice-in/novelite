import{r as d,aT as l,a2 as i,ac as w,a0 as B,j as s}from"./index-f22446e5.js";import{a as W,g as k,s as u,d as x,c as T}from"./Typography-493ceae3.js";import{u as O}from"./Grid-6c01a67e.js";import{B as V,M as q}from"./Modal-99caf082.js";import{P as R}from"./Paper-eafa25ad.js";import{u as G}from"./useId-6ded1857.js";import{F as J}from"./Fade-6b4e951e.js";function Q(o){return k("MuiDialog",o)}const Z=W("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),D=Z,oo=d.createContext({}),eo=oo,ao=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],ro=u(V,{name:"MuiDialog",slot:"Backdrop",overrides:(o,e)=>e.backdrop})({zIndex:-1}),io=o=>{const{classes:e,scroll:a,maxWidth:r,fullWidth:t,fullScreen:n}=o,p={root:["root"],container:["container",`scroll${l(a)}`],paper:["paper",`paperScroll${l(a)}`,`paperWidth${l(String(r))}`,t&&"paperFullWidth",n&&"paperFullScreen"]};return T(p,Q,e)},to=u(q,{name:"MuiDialog",slot:"Root",overridesResolver:(o,e)=>e.root})({"@media print":{position:"absolute !important"}}),so=u("div",{name:"MuiDialog",slot:"Container",overridesResolver:(o,e)=>{const{ownerState:a}=o;return[e.container,e[`scroll${l(a.scroll)}`]]}})(({ownerState:o})=>i({height:"100%","@media print":{height:"auto"},outline:0},o.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},o.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),lo=u(R,{name:"MuiDialog",slot:"Paper",overridesResolver:(o,e)=>{const{ownerState:a}=o;return[e.paper,e[`scrollPaper${l(a.scroll)}`],e[`paperWidth${l(String(a.maxWidth))}`],a.fullWidth&&e.paperFullWidth,a.fullScreen&&e.paperFullScreen]}})(({theme:o,ownerState:e})=>i({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},e.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},e.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!e.maxWidth&&{maxWidth:"calc(100% - 64px)"},e.maxWidth==="xs"&&{maxWidth:o.breakpoints.unit==="px"?Math.max(o.breakpoints.values.xs,444):`max(${o.breakpoints.values.xs}${o.breakpoints.unit}, 444px)`,[`&.${D.paperScrollBody}`]:{[o.breakpoints.down(Math.max(o.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},e.maxWidth&&e.maxWidth!=="xs"&&{maxWidth:`${o.breakpoints.values[e.maxWidth]}${o.breakpoints.unit}`,[`&.${D.paperScrollBody}`]:{[o.breakpoints.down(o.breakpoints.values[e.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},e.fullWidth&&{width:"calc(100% - 64px)"},e.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${D.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),no=d.forwardRef(function(e,a){const r=w({props:e,name:"MuiDialog"}),t=O(),n={enter:t.transitions.duration.enteringScreen,exit:t.transitions.duration.leavingScreen},{"aria-describedby":p,"aria-labelledby":m,BackdropComponent:h,BackdropProps:j,children:F,className:N,disableEscapeKeyDown:y=!1,fullScreen:U=!1,fullWidth:A=!1,maxWidth:E="sm",onBackdropClick:$,onClose:f,open:P,PaperComponent:I=R,PaperProps:M={},scroll:L="paper",TransitionComponent:Y=J,transitionDuration:S=n,TransitionProps:_}=r,K=B(r,ao),g=i({},r,{disableEscapeKeyDown:y,fullScreen:U,fullWidth:A,maxWidth:E,scroll:L}),b=io(g),C=d.useRef(),X=c=>{C.current=c.target===c.currentTarget},z=c=>{C.current&&(C.current=null,$&&$(c),f&&f(c,"backdropClick"))},v=G(m),H=d.useMemo(()=>({titleId:v}),[v]);return s.jsx(to,i({className:x(b.root,N),closeAfterTransition:!0,components:{Backdrop:ro},componentsProps:{backdrop:i({transitionDuration:S,as:h},j)},disableEscapeKeyDown:y,onClose:f,open:P,ref:a,onClick:z,ownerState:g},K,{children:s.jsx(Y,i({appear:!0,in:P,timeout:S,role:"presentation"},_,{children:s.jsx(so,{className:x(b.container),onMouseDown:X,ownerState:g,children:s.jsx(lo,i({as:I,elevation:24,role:"dialog","aria-describedby":p,"aria-labelledby":v},M,{className:x(b.paper,M.className),ownerState:g,children:s.jsx(eo.Provider,{value:H,children:F})}))})}))}))}),yo=no;function po(o){return k("MuiDialogContent",o)}W("MuiDialogContent",["root","dividers"]);function $o(o){return k("MuiDialogTitle",o)}const co=W("MuiDialogTitle",["root"]),uo=co,mo=["className","dividers"],go=o=>{const{classes:e,dividers:a}=o;return T({root:["root",a&&"dividers"]},po,e)},xo=u("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:a}=o;return[e.root,a.dividers&&e.dividers]}})(({theme:o,ownerState:e})=>i({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},e.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${uo.root} + &`]:{paddingTop:0}})),ho=d.forwardRef(function(e,a){const r=w({props:e,name:"MuiDialogContent"}),{className:t,dividers:n=!1}=r,p=B(r,mo),m=i({},r,{dividers:n}),h=go(m);return s.jsx(xo,i({className:x(h.root,t),ownerState:m,ref:a},p))}),Po=ho;export{yo as D,Po as a,eo as b,D as d,$o as g};
