import{d as r,V as p,j as o,L as d,i as g}from"./index-8b3b8eba.js";import{P as h}from"./PageContainer-d98636eb.js";import{B as u}from"./Breadcrumb-180b5288.js";import{G as n}from"./Grid-f4d7d3ed.js";import{C as f}from"./Card-db1260bf.js";import{C as x}from"./CardActionArea-d8e95562.js";import{C as j}from"./CardMedia-82ad2b80.js";import{C}from"./CardContent-8f57d85d.js";import{T as e}from"./Typography-1427830e.js";import{S as y}from"./Stack-6654f631.js";import{u as k}from"./useDispatch-878c29d8.js";import"./index.esm-eaeab6e7.js";import"./useSlotProps-70f7ca87.js";import"./Link-52777340.js";import"./Box-399c9622.js";import"./Paper-0f05f7b2.js";import"./createStack-ee48abd7.js";import"./styled-533bb9dc.js";function q(){const s=k(),a=r(t=>t.bookingsSliceReducer.roomCategory),m=r(t=>t.bookingsSliceReducer.bookingLocation),c=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"},{to:"/category",title:"Category"},{to:"/bookings",title:"Bookings"}],{data:i,error:b,isValidating:v,mutate:B}=p("Rooms",{fields:["name","room_name","room_type","image","status"],filters:[["location","=",m],["room_type","=",a]],limit_start:0,limit:1e3});return o.jsxs(h,{title:"Bookings - Novel Office",children:[o.jsx(u,{title:"Bookings - Novel Office",items:c}),o.jsx(n,{container:!0,spacing:3,children:(i==null?void 0:i.length)!==0?i==null?void 0:i.map((t,l)=>o.jsx(n,{item:!0,xs:12,sm:4,lg:3,children:o.jsx(f,{variant:"outlined",sx:{maxWidth:345,display:t.status==="Active"?"block":"none"},children:o.jsxs(x,{component:d,to:"/bookslot",onClick:()=>{s(g(t.name))},children:[o.jsx(j,{component:"img",height:"140",image:t.image,alt:"green iguana"}),o.jsxs(C,{children:[o.jsx(e,{gutterBottom:!0,variant:"h5",component:"div",children:t.room_name}),o.jsx(e,{variant:"body2",color:"text.secondary",children:t.room_type})]})]})})},l)):o.jsx(y,{direction:"row",alignItems:"center",justifyContent:"center",width:"100%",mt:4,ml:3,children:o.jsx(e,{variant:"h3",children:"There are no rooms available in this category"})})})]})}export{q as default};