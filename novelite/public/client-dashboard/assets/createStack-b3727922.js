import{aL as D,aM as F,_ as k,aN as h,aO as p,aP as S,aD as T,aQ as B,r as d,a as N,j as E,aR as v}from"./index-3566f683.js";import{l as G,k as M,b as O,g as _}from"./Typography-c66aaf03.js";import{s as L}from"./styled-dd8fd5cf.js";const U=["component","direction","spacing","divider","children","className","useFlexGap"],A=D(),$=L("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root});function I(e){return F({props:e,name:"MuiStack",defaultTheme:A})}function Q(e,s){const n=d.Children.toArray(e).filter(Boolean);return n.reduce((a,c,t)=>(a.push(c),t<n.length-1&&a.push(d.cloneElement(s,{key:`separator-${t}`})),a),[])}const W=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],q=({ownerState:e,theme:s})=>{let n=k({display:"flex",flexDirection:"column"},h({theme:s},p({values:e.direction,breakpoints:s.breakpoints.values}),a=>({flexDirection:a})));if(e.spacing){const a=S(s),c=Object.keys(s.breakpoints.values).reduce((o,r)=>((typeof e.spacing=="object"&&e.spacing[r]!=null||typeof e.direction=="object"&&e.direction[r]!=null)&&(o[r]=!0),o),{}),t=p({values:e.direction,base:c}),m=p({values:e.spacing,base:c});typeof t=="object"&&Object.keys(t).forEach((o,r,i)=>{if(!t[o]){const u=r>0?t[i[r-1]]:"column";t[o]=u}}),n=T(n,h({theme:s},m,(o,r)=>e.useFlexGap?{gap:v(a,o)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${W(r?t[r]:e.direction)}`]:v(a,o)}}))}return n=B(s.breakpoints,n),n};function K(e={}){const{createStyledComponent:s=$,useThemeProps:n=I,componentName:a="MuiStack"}=e,c=()=>O({root:["root"]},o=>_(a,o),{}),t=s(q);return d.forwardRef(function(o,r){const i=n(o),l=G(i),{component:u="div",direction:x="column",spacing:j=0,divider:y,children:g,className:P,useFlexGap:b=!1}=l,C=N(l,U),V={direction:x,spacing:j,useFlexGap:b},R=c();return E.jsx(t,k({as:u,ownerState:V,ref:r,className:M(R.root,P)},C,{children:y?Q(g,y):g}))})}export{K as c};