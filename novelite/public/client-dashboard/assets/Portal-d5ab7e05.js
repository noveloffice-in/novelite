import{r as e,j as a,b0 as p}from"./index-13b2bff4.js";import{u as E,e as u,f as i}from"./Typography-2722ac00.js";function x(o){return typeof o=="function"?o():o}const j=e.forwardRef(function(c,s){const{children:t,container:l,disablePortal:r=!1}=c,[n,f]=e.useState(null),m=E(e.isValidElement(t)?t.ref:null,s);if(u(()=>{r||f(x(l)||document.body)},[l,r]),u(()=>{if(n&&!r)return i(s,n),()=>{i(s,null)}},[s,n,r]),r){if(e.isValidElement(t)){const d={ref:m};return e.cloneElement(t,d)}return a.jsx(e.Fragment,{children:t})}return a.jsx(e.Fragment,{children:n&&p.createPortal(t,n)})});export{j as P};
