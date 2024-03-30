import{z as r,ae as p,j as o,L as g,af as d}from"./index-8bfed645.js";import{P as h}from"./PageContainer-47103aa8.js";import{B as u}from"./Breadcrumb-bbacccc9.js";import{G as n}from"./Grid-9d942919.js";import{C as f}from"./Card-87c5da24.js";import{C as x,a as j}from"./CardMedia-3e5eeb52.js";import{C as y}from"./CardContent-be4b8cc9.js";import{T as e}from"./Typography-47156341.js";import{S as C}from"./Stack-59afe71d.js";import{u as k}from"./useDispatch-6786e4e4.js";import"./index.esm-ad28f87e.js";import"./useSlotProps-a100492e.js";import"./Link-4d26ae8f.js";import"./Box-3c94d1eb.js";import"./Paper-3491a742.js";import"./createStack-ace380f4.js";import"./styled-19167205.js";function M(){const s=k(),a=r(t=>t.bookingsSliceReducer.roomCategory),m=r(t=>t.bookingsSliceReducer.bookingLocation),c=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"},{to:"/category",title:"Category"},{to:"/bookings",title:"Bookings"}],{data:i,error:b,isValidating:v,mutate:B}=p("Rooms",{fields:["name","room_name","room_type","image","status"],filters:[["location","=",m],["room_type","=",a]],limit_start:0,limit:1e3});return o.jsxs(h,{title:"Bookings - Novel Office",children:[o.jsx(u,{title:"Bookings - Novel Office",items:c}),o.jsx(n,{container:!0,spacing:3,children:(i==null?void 0:i.length)!==0?i==null?void 0:i.map((t,l)=>o.jsx(n,{item:!0,xs:12,sm:4,lg:3,children:o.jsx(f,{variant:"outlined",sx:{maxWidth:345,display:t.status==="Active"?"block":"none"},children:o.jsxs(x,{component:g,to:"/bookingslot",onClick:()=>{s(d(t.name))},children:[o.jsx(j,{component:"img",height:"140",image:t.image,alt:"green iguana"}),o.jsxs(y,{children:[o.jsx(e,{gutterBottom:!0,variant:"h5",component:"div",children:t.room_name}),o.jsx(e,{variant:"body2",color:"text.secondary",children:t.room_type})]})]})})},l)):o.jsx(C,{direction:"row",alignItems:"center",justifyContent:"center",width:"100%",mt:4,ml:3,children:o.jsx(e,{variant:"h3",children:"There are no rooms available in this category"})})})]})}export{M as default};