import{F as h,ad as g,j as t,L as s,ap as n,aq as x}from"./index-823b022a.js";import{P as j}from"./PageContainer-db55db03.js";import{B as f}from"./Breadcrumb-93b54820.js";import{B as u,S as m}from"./BlankCard-e1fb1491.js";import{G as c}from"./Grid-a39c5cca.js";import{T as e}from"./Typography-454d25c7.js";import{C as L}from"./CardContent-bf6a0fa7.js";import{S as p}from"./Stack-024277a7.js";import{u as w}from"./useDispatch-4fcf8e16.js";import"./index.esm-dee14f6e.js";import"./useSlotProps-a9cb2fea.js";import"./Link-4730aa4a.js";import"./Box-db97eb53.js";import"./Card-9cc5a94c.js";import"./Paper-d556631a.js";import"./createStack-66c402e7.js";import"./styled-02668bb8.js";function O(){const[o,C]=h.useState(!1),r=w(),d=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"}],{data:a}=g("Room Locations",{fields:["name","image"],limit_start:0,limit:100});return t.jsxs(j,{title:"Location - Novel Office",children:[t.jsx(f,{title:"Location",items:d}),t.jsx(c,{container:!0,spacing:3,children:a==null?void 0:a.map((i,l)=>t.jsx(c,{item:!0,xs:12,sm:4,lg:3,children:t.jsxs(u,{children:[i.image?t.jsx(e,{component:s,to:"/category",onClick:()=>{r(n(i.name))},children:o?t.jsx(m,{variant:"square",animation:"wave",width:"100%",height:270}):t.jsx("img",{src:i.image,alt:"img",width:"100%"})}):t.jsx(e,{component:s,to:"/category",onClick:()=>{r(n(i.name))},children:o?t.jsx(m,{variant:"square",animation:"wave",width:"100%",height:270}):t.jsx("img",{src:x,alt:"img",width:"100%"})}),t.jsx(L,{sx:{p:3,pt:2},children:t.jsx(p,{direction:"row",alignItems:"center",justifyContent:"space-between",mt:1,children:t.jsx(p,{direction:"row",alignItems:"center",children:t.jsx(e,{variant:"h6",children:i.name})})})})]})},i.name+l))})]})}export{O as default};
