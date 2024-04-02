import{K as v,_ as n,E as S,M as u,r as R,u as _,v as $,j as C,e as U,P as M}from"./index-70c16ae5.js";import{g as j,f as B,s as A,h as P,a as T}from"./Typography-d7f7ee89.js";import{C as X}from"./Card-d738e094.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function K(t){return parseFloat(t)}function N(t){return j("MuiSkeleton",t)}B("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const z=["animation","className","component","height","style","variant","width"];let r=t=>t,p,m,g,f;const F=t=>{const{classes:a,variant:e,animation:i,hasChildren:o,width:l,height:s}=t;return T({root:["root",e,i,o&&"withChildren",o&&!l&&"fitContent",o&&!s&&"heightAuto"]},N,a)},W=v(p||(p=r`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),L=v(m||(m=r`
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
`)),O=A("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=E(t.shape.borderRadius)||"px",i=K(t.shape.borderRadius);return n({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:S(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${e}/${Math.round(i/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&u(g||(g=r`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),W),({ownerState:t,theme:a})=>t.animation==="wave"&&u(f||(f=r`
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
    `),L,(a.vars||a).palette.action.hover)),V=R.forwardRef(function(a,e){const i=_({props:a,name:"MuiSkeleton"}),{animation:o="pulse",className:l,component:s="span",height:d,style:k,variant:w="text",width:x}=i,h=$(i,z),c=n({},i,{animation:o,component:s,variant:w,hasChildren:!!h.children}),y=F(c);return C.jsx(O,n({as:s,ref:e,className:P(y.root,l),ownerState:c},h,{style:n({width:x,height:d},k)}))}),H=V,b=({children:t,className:a})=>{const e=U(i=>i.customizer);return C.jsx(X,{sx:{p:0,position:"relative"},className:a,elevation:e.isCardShadow?9:0,variant:e.isCardShadow?void 0:"outlined",children:t})};b.propTypes={children:M.node};const I=b;export{I as B,H as S};
