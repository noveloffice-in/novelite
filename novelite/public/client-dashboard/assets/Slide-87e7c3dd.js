import{r as E,a2 as O,j as q,a1 as x}from"./index-13b2bff4.js";import{u as A}from"./Grid-f990bc7a.js";import{T as D,r as G,g as L}from"./utils-27ef01bd.js";import{u as J}from"./Typography-2722ac00.js";import{d as K,o as v}from"./ownerWindow-698471fc.js";const M=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function N(o,i,d){const e=i.getBoundingClientRect(),n=d&&d.getBoundingClientRect(),g=v(i);let f;if(i.fakeTransform)f=i.fakeTransform;else{const s=g.getComputedStyle(i);f=s.getPropertyValue("-webkit-transform")||s.getPropertyValue("transform")}let u=0,l=0;if(f&&f!=="none"&&typeof f=="string"){const s=f.split("(")[1].split(")")[0].split(",");u=parseInt(s[4],10),l=parseInt(s[5],10)}return o==="left"?n?`translateX(${n.right+u-e.left}px)`:`translateX(${g.innerWidth+u-e.left}px)`:o==="right"?n?`translateX(-${e.right-n.left-u}px)`:`translateX(-${e.left+e.width-u}px)`:o==="up"?n?`translateY(${n.bottom+l-e.top}px)`:`translateY(${g.innerHeight+l-e.top}px)`:n?`translateY(-${e.top-n.top+e.height-l}px)`:`translateY(-${e.top+e.height-l}px)`}function Q(o){return typeof o=="function"?o():o}function h(o,i,d){const e=Q(d),n=N(o,i,e);n&&(i.style.webkitTransform=n,i.style.transform=n)}const U=E.forwardRef(function(i,d){const e=A(),n={enter:e.transitions.easing.easeOut,exit:e.transitions.easing.sharp},g={enter:e.transitions.duration.enteringScreen,exit:e.transitions.duration.leavingScreen},{addEndListener:f,appear:u=!0,children:l,container:s,direction:c="down",easing:T=n,in:p,onEnter:b,onEntered:P,onEntering:k,onExit:R,onExited:$,onExiting:V,style:y,timeout:w=g,TransitionComponent:W=D}=i,X=O(i,M),a=E.useRef(null),Y=J(l.ref,a,d),m=t=>r=>{t&&(r===void 0?t(a.current):t(a.current,r))},j=m((t,r)=>{h(c,t,s),G(t),b&&b(t,r)}),z=m((t,r)=>{const S=L({timeout:w,style:y,easing:T},{mode:"enter"});t.style.webkitTransition=e.transitions.create("-webkit-transform",x({},S)),t.style.transition=e.transitions.create("transform",x({},S)),t.style.webkitTransform="none",t.style.transform="none",k&&k(t,r)}),_=m(P),B=m(V),I=m(t=>{const r=L({timeout:w,style:y,easing:T},{mode:"exit"});t.style.webkitTransition=e.transitions.create("-webkit-transform",r),t.style.transition=e.transitions.create("transform",r),h(c,t,s),R&&R(t)}),F=m(t=>{t.style.webkitTransition="",t.style.transition="",$&&$(t)}),H=t=>{f&&f(a.current,t)},C=E.useCallback(()=>{a.current&&h(c,a.current,s)},[c,s]);return E.useEffect(()=>{if(p||c==="down"||c==="right")return;const t=K(()=>{a.current&&h(c,a.current,s)}),r=v(a.current);return r.addEventListener("resize",t),()=>{t.clear(),r.removeEventListener("resize",t)}},[c,p,s]),E.useEffect(()=>{p||C()},[p,C]),q.jsx(W,x({nodeRef:a,onEnter:j,onEntered:_,onEntering:z,onExit:I,onExited:F,onExiting:B,addEndListener:H,appear:u,in:p,timeout:w},X,{children:(t,r)=>E.cloneElement(l,x({ref:Y,style:x({visibility:t==="exited"&&!p?"hidden":void 0},y,l.props.style)},r))}))}),it=U;export{it as S};
