import{_ as a,r as g,u as p,A as u,j as d}from"./index-5a3f6a76.js";import{a as m,g as f,s as x,d as A,b as D}from"./Typography-36c6dc69.js";function y(s){return m("MuiDialogActions",s)}f("MuiDialogActions",["root","spacing"]);const S=["className","disableSpacing"],b=s=>{const{classes:t,disableSpacing:o}=s;return D({root:["root",!o&&"spacing"]},y,t)},C=x("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:o}=s;return[t.root,!o.disableSpacing&&t.spacing]}})(({ownerState:s})=>a({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!s.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),j=g.forwardRef(function(t,o){const e=p({props:t,name:"MuiDialogActions"}),{className:n,disableSpacing:c=!1}=e,l=u(e,S),i=a({},e,{disableSpacing:c}),r=b(i);return d.jsx(C,a({className:A(r.root,n),ownerState:i,ref:o},l))}),M=j;export{M as D};