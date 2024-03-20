import{a6 as j,_ as l,b as B,a7 as u,r as U,u as T,a as M,j as i,y as P,K as A,E as N,ah as X,L as g,at as f,au as E}from"./index-3566f683.js";import{P as K}from"./PageContainer-8f64643d.js";import{B as q}from"./Breadcrumb-114095a6.js";import{C as z}from"./Card-59633af4.js";import{G as x}from"./Grid-280b352d.js";import{g as F,a as G,s as I,c as O,b as V,T as d}from"./Typography-c66aaf03.js";import{C as W}from"./CardContent-1f868a4d.js";import{S as C}from"./Stack-70f991e4.js";import{u as D}from"./useDispatch-be3d4271.js";import"./index.esm-7b5037c9.js";import"./Box-cd0d0724.js";import"./Paper-785f41b1.js";import"./createStack-b3727922.js";import"./styled-dd8fd5cf.js";function H(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function J(t){return parseFloat(t)}function Q(t){return F("MuiSkeleton",t)}G("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Y=["animation","className","component","height","style","variant","width"];let c=t=>t,v,b,k,w;const Z=t=>{const{classes:a,variant:e,animation:o,hasChildren:n,width:s,height:r}=t;return V({root:["root",e,o,n&&"withChildren",n&&!s&&"fitContent",n&&!r&&"heightAuto"]},Q,a)},tt=j(v||(v=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),at=j(b||(b=c`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),et=I("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=H(t.shape.borderRadius)||"px",o=J(t.shape.borderRadius);return l({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:B(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${o}${e}/${Math.round(o/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&u(k||(k=c`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),tt),({ownerState:t,theme:a})=>t.animation==="wave"&&u(w||(w=c`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),at,(a.vars||a).palette.action.hover)),it=U.forwardRef(function(a,e){const o=T({props:a,name:"MuiSkeleton"}),{animation:n="pulse",className:s,component:r="span",height:h,style:R,variant:L="text",width:_}=o,m=M(o,Y),p=l({},o,{animation:n,component:r,variant:L,hasChildren:!!m.children}),$=Z(p);return i.jsx(et,l({as:r,ref:e,className:O($.root,s),ownerState:p},m,{style:l({width:_,height:h},R)}))}),y=it,S=({children:t,className:a})=>{const e=P(o=>o.customizer);return i.jsx(z,{sx:{p:0,position:"relative"},className:a,elevation:e.isCardShadow?9:0,variant:e.isCardShadow?void 0:"outlined",children:t})};S.propTypes={children:A.node};const ot=S;function vt(){const[t,a]=N.useState(!1),e=D(),o=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"}],{data:n}=X("Room Locations",{fields:["name","image"],limit_start:0,limit:100});return i.jsxs(K,{title:"Location - Novel Office",children:[i.jsx(q,{title:"Location",items:o}),i.jsx(x,{container:!0,spacing:3,children:n==null?void 0:n.map((s,r)=>i.jsx(x,{item:!0,xs:12,sm:4,lg:3,children:i.jsxs(ot,{children:[s.image?i.jsx(d,{component:g,to:"/category",onClick:()=>{e(f(s.name))},children:t?i.jsx(y,{variant:"square",animation:"wave",width:"100%",height:270}):i.jsx("img",{src:s.image,alt:"img",width:"100%"})}):i.jsx(d,{component:g,to:"/category",onClick:()=>{e(f(s.name))},children:t?i.jsx(y,{variant:"square",animation:"wave",width:"100%",height:270}):i.jsx("img",{src:E,alt:"img",width:"100%"})}),i.jsx(W,{sx:{p:3,pt:2},children:i.jsx(C,{direction:"row",alignItems:"center",justifyContent:"space-between",mt:1,children:i.jsx(C,{direction:"row",alignItems:"center",children:i.jsx(d,{variant:"h6",children:s.name})})})})]})},s.name+r))})]})}export{vt as default};
