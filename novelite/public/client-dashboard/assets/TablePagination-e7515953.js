import{r as _,a2 as ee,j as o,a1 as n,ac as se}from"./index-13b2bff4.js";import{a as ne,g as le,s as m,d as L,c as ie}from"./Typography-2722ac00.js";import{a as H,K as U}from"./KeyboardArrowRight-c999d7e5.js";import{u as re,i as ce}from"./Grid-f990bc7a.js";import{L as E,F as z}from"./LastPage-1ae87d0d.js";import{I as y}from"./IconButton-b682dd77.js";import{d as F}from"./TableRow-cec2e534.js";import{T as pe}from"./Toolbar-001aa567.js";import{S as de}from"./Select-3ccb05a3.js";import{M as ue}from"./MenuItem-a659bc65.js";import{u as G}from"./useId-4a21d19c.js";import{I as ge}from"./InputBase-791b435a.js";var W,q,J,Q,V,X,Y,Z;const be=["backIconButtonProps","count","disabled","getItemAriaLabel","nextIconButtonProps","onPageChange","page","rowsPerPage","showFirstButton","showLastButton","slotProps"],me=_.forwardRef(function(t,g){var x,P,w,B;const{backIconButtonProps:C,count:h,disabled:u=!1,getItemAriaLabel:a,nextIconButtonProps:T,onPageChange:f,page:s,rowsPerPage:I,showFirstButton:j,showLastButton:S,slotProps:c}=t,b=ee(t,be),i=re(),v=l=>{f(l,0)},k=l=>{f(l,s-1)},M=l=>{f(l,s+1)},$=l=>{f(l,Math.max(0,Math.ceil(h/I)-1))};return o.jsxs("div",n({ref:g},b,{children:[j&&o.jsx(y,n({onClick:v,disabled:u||s===0,"aria-label":a("first",s),title:a("first",s)},(x=c==null?void 0:c.firstButton)!=null?x:{},{children:i.direction==="rtl"?W||(W=o.jsx(E,{})):q||(q=o.jsx(z,{}))})),o.jsx(y,n({onClick:k,disabled:u||s===0,color:"inherit","aria-label":a("previous",s),title:a("previous",s)},(P=c==null?void 0:c.previousButton)!=null?P:C,{children:i.direction==="rtl"?J||(J=o.jsx(H,{})):Q||(Q=o.jsx(U,{}))})),o.jsx(y,n({onClick:M,disabled:u||(h!==-1?s>=Math.ceil(h/I)-1:!1),color:"inherit","aria-label":a("next",s),title:a("next",s)},(w=c==null?void 0:c.nextButton)!=null?w:T,{children:i.direction==="rtl"?V||(V=o.jsx(U,{})):X||(X=o.jsx(H,{}))})),S&&o.jsx(y,n({onClick:$,disabled:u||s>=Math.ceil(h/I)-1,"aria-label":a("last",s),title:a("last",s)},(B=c==null?void 0:c.lastButton)!=null?B:{},{children:i.direction==="rtl"?Y||(Y=o.jsx(z,{})):Z||(Z=o.jsx(E,{}))}))]}))}),Pe=me;function he(e){return le("MuiTablePagination",e)}const fe=ne("MuiTablePagination",["root","toolbar","spacer","selectLabel","selectRoot","select","selectIcon","input","menuItem","displayedRows","actions"]),R=fe;var O;const xe=["ActionsComponent","backIconButtonProps","className","colSpan","component","count","disabled","getItemAriaLabel","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","onPageChange","onRowsPerPageChange","page","rowsPerPage","rowsPerPageOptions","SelectProps","showFirstButton","showLastButton","slotProps"],Ie=m(F,{name:"MuiTablePagination",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>({overflow:"auto",color:(e.vars||e).palette.text.primary,fontSize:e.typography.pxToRem(14),"&:last-child":{padding:0}})),ve=m(pe,{name:"MuiTablePagination",slot:"Toolbar",overridesResolver:(e,t)=>n({[`& .${R.actions}`]:t.actions},t.toolbar)})(({theme:e})=>({minHeight:52,paddingRight:2,[`${e.breakpoints.up("xs")} and (orientation: landscape)`]:{minHeight:52},[e.breakpoints.up("sm")]:{minHeight:52,paddingRight:2},[`& .${R.actions}`]:{flexShrink:0,marginLeft:20}})),Re=m("div",{name:"MuiTablePagination",slot:"Spacer",overridesResolver:(e,t)=>t.spacer})({flex:"1 1 100%"}),we=m("p",{name:"MuiTablePagination",slot:"SelectLabel",overridesResolver:(e,t)=>t.selectLabel})(({theme:e})=>n({},e.typography.body2,{flexShrink:0})),Be=m(de,{name:"MuiTablePagination",slot:"Select",overridesResolver:(e,t)=>n({[`& .${R.selectIcon}`]:t.selectIcon,[`& .${R.select}`]:t.select},t.input,t.selectRoot)})({color:"inherit",fontSize:"inherit",flexShrink:0,marginRight:32,marginLeft:8,[`& .${R.select}`]:{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"}}),Te=m(ue,{name:"MuiTablePagination",slot:"MenuItem",overridesResolver:(e,t)=>t.menuItem})({}),Le=m("p",{name:"MuiTablePagination",slot:"DisplayedRows",overridesResolver:(e,t)=>t.displayedRows})(({theme:e})=>n({},e.typography.body2,{flexShrink:0}));function ye({from:e,to:t,count:g}){return`${e}–${t} of ${g!==-1?g:`more than ${t}`}`}function Ce(e){return`Go to ${e} page`}const je=e=>{const{classes:t}=e;return ie({root:["root"],toolbar:["toolbar"],spacer:["spacer"],selectLabel:["selectLabel"],select:["select"],input:["input"],selectIcon:["selectIcon"],menuItem:["menuItem"],displayedRows:["displayedRows"],actions:["actions"]},he,t)},Se=_.forwardRef(function(t,g){var x;const P=se({props:t,name:"MuiTablePagination"}),{ActionsComponent:w=Pe,backIconButtonProps:B,className:C,colSpan:h,component:u=F,count:a,disabled:T=!1,getItemAriaLabel:f=Ce,labelDisplayedRows:s=ye,labelRowsPerPage:I="Rows per page:",nextIconButtonProps:j,onPageChange:S,onRowsPerPageChange:c,page:b,rowsPerPage:i,rowsPerPageOptions:v=[10,25,50,100],SelectProps:k={},showFirstButton:M=!1,showLastButton:$=!1,slotProps:l}=P,te=ee(P,xe),A=P,r=je(A),p=(x=l==null?void 0:l.select)!=null?x:k,N=p.native?"option":Te;let K;(u===F||u==="td")&&(K=h||1e3);const oe=G(p.id),D=G(p.labelId),ae=()=>a===-1?(b+1)*i:i===-1?a:Math.min(a,(b+1)*i);return o.jsx(Ie,n({colSpan:K,ref:g,as:u,ownerState:A,className:L(r.root,C)},te,{children:o.jsxs(ve,{className:r.toolbar,children:[o.jsx(Re,{className:r.spacer}),v.length>1&&o.jsx(we,{className:r.selectLabel,id:D,children:I}),v.length>1&&o.jsx(Be,n({variant:"standard"},!p.variant&&{input:O||(O=o.jsx(ge,{}))},{value:i,onChange:c,id:oe,labelId:D},p,{classes:n({},p.classes,{root:L(r.input,r.selectRoot,(p.classes||{}).root),select:L(r.select,(p.classes||{}).select),icon:L(r.selectIcon,(p.classes||{}).icon)}),disabled:T,children:v.map(d=>_.createElement(N,n({},!ce(N)&&{ownerState:A},{className:r.menuItem,key:d.label?d.label:d,value:d.value?d.value:d}),d.label?d.label:d))})),o.jsx(Le,{className:r.displayedRows,children:s({from:a===0?0:b*i+1,to:ae(),count:a===-1?-1:a,page:b})}),o.jsx(w,{className:r.actions,backIconButtonProps:B,count:a,nextIconButtonProps:j,onPageChange:S,page:b,rowsPerPage:i,showFirstButton:M,showLastButton:$,slotProps:l==null?void 0:l.actions,getItemAriaLabel:f,disabled:T})]})}))}),ze=Se;export{ze as T};
