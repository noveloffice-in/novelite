import{R as h,c2 as g,j as t,L as s,c7 as n,M as x}from"./index-4c0b60c1.js";import{P as j}from"./PageContainer-1e378f9f.js";import{B as f}from"./Breadcrumb-993a2ffd.js";import{B as u}from"./BlankCard-903d1b4d.js";import{G as m}from"./Grid-858c8d28.js";import{T as o}from"./Typography-d41e00bf.js";import{S as c}from"./Skeleton-03e065e0.js";import{C as L}from"./CardContent-3ef2c0f8.js";import{S as p}from"./Stack-5b6d67fa.js";import{u as w}from"./useDispatch-cfa82895.js";import"./index.esm-ab86738a.js";import"./Link-600c6b92.js";import"./Box-62c7ea08.js";import"./Card-93702703.js";import"./createStack-f64ed9a6.js";import"./styled-f6e27ef3.js";function N(){const[a,C]=h.useState(!1),r=w(),d=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"}],{data:e}=g("Room Locations",{fields:["name","image"],limit_start:0,limit:100});return t.jsxs(j,{title:"Location - Novel Office",children:[t.jsx(f,{title:"Location",items:d}),t.jsx(m,{container:!0,spacing:3,children:e==null?void 0:e.map((i,l)=>t.jsx(m,{item:!0,xs:12,sm:4,lg:3,children:t.jsxs(u,{children:[i.image?t.jsx(o,{component:s,to:"/category",onClick:()=>{r(n(i.name))},children:a?t.jsx(c,{variant:"square",animation:"wave",width:"100%",height:270}):t.jsx("img",{src:i.image,alt:"img",width:"100%"})}):t.jsx(o,{component:s,to:"/category",onClick:()=>{r(n(i.name))},children:a?t.jsx(c,{variant:"square",animation:"wave",width:"100%",height:270}):t.jsx("img",{src:x,alt:"img",width:"100%"})}),t.jsx(L,{sx:{p:3,pt:2},children:t.jsx(p,{direction:"row",alignItems:"center",justifyContent:"space-between",mt:1,children:t.jsx(p,{direction:"row",alignItems:"center",children:t.jsx(o,{variant:"h6",children:i.name})})})})]})},i.name+l))})]})}export{N as default};
