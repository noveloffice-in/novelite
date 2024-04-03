import{x as F,_ as n,v as W,M as $,N as I}from"./index-85be31c7.js";import{i as q,h as z}from"./Typography-080e93f2.js";const B=["ownerState"],G=["variants"],H=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function J(e){return Object.keys(e).length===0}function K(e){return typeof e=="string"&&e.charCodeAt(0)>96}function A(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Q=W(),U=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function _({defaultTheme:e,theme:s,themeId:t}){return J(s)?e:s[t]||s}function X(e){return e?(s,t)=>t[e]:null}function x(e,s){let{ownerState:t}=s,d=F(s,B);const l=typeof e=="function"?e(n({ownerState:t},d)):e;if(Array.isArray(l))return l.flatMap(h=>x(h,n({ownerState:t},d)));if(l&&typeof l=="object"&&Array.isArray(l.variants)){const{variants:h=[]}=l;let m=F(l,G);return h.forEach(o=>{let i=!0;typeof o.props=="function"?i=o.props(n({ownerState:t},d,t)):Object.keys(o.props).forEach(p=>{(t==null?void 0:t[p])!==o.props[p]&&d[p]!==o.props[p]&&(i=!1)}),i&&(Array.isArray(m)||(m=[m]),m.push(typeof o.style=="function"?o.style(n({ownerState:t},d,t)):o.style))}),m}return l}function Y(e={}){const{themeId:s,defaultTheme:t=Q,rootShouldForwardProp:d=A,slotShouldForwardProp:l=A}=e,h=c=>$(n({},c,{theme:_(n({},c,{defaultTheme:t,themeId:s}))}));return h.__mui_systemSx=!0,(c,m={})=>{q(c,r=>r.filter(a=>!(a!=null&&a.__mui_systemSx)));const{name:o,slot:i,skipVariantsResolver:p,skipSx:b,overridesResolver:k=X(U(i))}=m,N=F(m,H),V=p!==void 0?p:i&&i!=="Root"&&i!=="root"||!1,E=b||!1;let L,v=A;i==="Root"||i==="root"?v=d:i?v=l:K(c)&&(v=void 0);const R=z(c,n({shouldForwardProp:v,label:L},N)),C=r=>typeof r=="function"&&r.__emotion_real!==r||I(r)?a=>x(r,n({},a,{theme:_({theme:a.theme,defaultTheme:t,themeId:s})})):r,P=(r,...a)=>{let O=C(r);const y=a?a.map(C):[];o&&k&&y.push(f=>{const u=_(n({},f,{defaultTheme:t,themeId:s}));if(!u.components||!u.components[o]||!u.components[o].styleOverrides)return null;const S=u.components[o].styleOverrides,w={};return Object.entries(S).forEach(([M,D])=>{w[M]=x(D,n({},f,{theme:u}))}),k(f,w)}),o&&!V&&y.push(f=>{var u;const S=_(n({},f,{defaultTheme:t,themeId:s})),w=S==null||(u=S.components)==null||(u=u[o])==null?void 0:u.variants;return x({variants:w},n({},f,{theme:S}))}),E||y.push(h);const j=y.length-a.length;if(Array.isArray(r)&&j>0){const f=new Array(j).fill("");O=[...r,...f],O.raw=[...r.raw,...f]}const T=R(O,...y);return c.muiName&&(T.muiName=c.muiName),T};return R.withConfig&&(P.withConfig=R.withConfig),P}}const Z=Y(),te=Z;export{te as s};