import{j as e,R as p,r as u,L as y,i as v,b2 as F,E as w,b3 as M,G as f,b4 as L,b5 as N,b6 as q,M as H,aR as J,K as U,b7 as O,U as V,aO as K,aP as W}from"./index-4c0b60c1.js";import{B as _}from"./Breadcrumb-993a2ffd.js";import{P as Z}from"./PageContainer-1e378f9f.js";import{P as Q,R as X}from"./RecentTransactions-897bdeb5.js";import{T as Y}from"./TopCards-a8af5f5f.js";import{D as ee}from"./DashboardCard-165ae20f.js";import{ab as A,aB as te,u as ie,aC as re,E as se,M as ae,r as ne,l as oe,aD as ce,aE as le,aF as me,$ as de,ae as xe,af as he,ag as pe,ah as ge,aG as je,aH as ue,aI as ve}from"./index.esm-ab86738a.js";import{u as z,G as r}from"./Grid-858c8d28.js";import{S as s}from"./Stack-5b6d67fa.js";import{A as l}from"./Avatar-94748a06.js";import{B as c}from"./Box-62c7ea08.js";import{T as a}from"./Typography-d41e00bf.js";import{B as d}from"./BlankCard-903d1b4d.js";import{S as b}from"./Skeleton-03e065e0.js";import{C as T}from"./CardMedia-194463b3.js";import{C as m}from"./CardContent-3ef2c0f8.js";import{T as B}from"./Tooltip-69505884.js";import{C as I}from"./Chip-f7c4e200.js";import{C as we}from"./Card-93702703.js";import{I as j}from"./IconButton-deace95f.js";import{F as fe}from"./Fab-8e706100.js";import{R as be}from"./Rating-aa62efd0.js";import{B as h}from"./Button-7b1b6ba5.js";import{A as Ce}from"./AvatarGroup-82b50765.js";import{D as S}from"./Divider-1c3d9281.js";import{C as ye}from"./CustomSlider-7d75c6e3.js";import{C as Se}from"./CustomSwitch-f40d0b14.js";import"./Link-600c6b92.js";import"./clsx.m-1229b3e0.js";import"./isMuiElement-06cc0e9d.js";import"./createStack-f64ed9a6.js";import"./styled-f6e27ef3.js";import"./Popper-e9889bc7.js";import"./ownerDocument-613eb639.js";import"./Portal-a2e45162.js";import"./createPopper-319e19c4.js";import"./useControlled-aa938a2a.js";import"./useId-ab6b636f.js";import"./Grow-34c80021.js";import"./utils-7ef43b08.js";import"./visuallyHidden-14c3de6e.js";import"./dividerClasses-4698ac49.js";import"./Slider-2dcbd446.js";import"./Switch-bf3d7d6a.js";import"./SwitchBase-e39ecfd7.js";import"./useFormControl-4a8d5a10.js";const Te=()=>{const i=z(),n=i.palette.primary.main,t=i.palette.primary.light,o=i.palette.error.main,g=i.palette.error.light,C=i.palette.warning.main,k=i.palette.warning.light,D=i.palette.secondary.main,P=i.palette.secondary.light,R=i.palette.success.main,E=i.palette.success.light,G=[{title:"Trip to singapore",subtitle:"working on",time:5,color:n,lightcolor:t,icon:e.jsx(A,{width:20})},{title:"Archived Data",subtitle:"working on",time:10,color:D,lightcolor:P,icon:e.jsx(te,{width:20})},{title:"Meeting with client",subtitle:"pending",time:15,color:C,lightcolor:k,icon:e.jsx(ie,{width:20})},{title:"Screening Task Team",subtitle:"working on",time:20,color:o,lightcolor:g,icon:e.jsx(re,{width:20})},{title:"Send envelope to John",subtitle:"done",time:20,color:R,lightcolor:E,icon:e.jsx(se,{width:20})}];return e.jsx(ee,{title:"Upcoming Activity",subtitle:"In New year",children:e.jsx(e.Fragment,{children:e.jsx(s,{spacing:3,mt:5,children:G.map((x,$)=>e.jsxs(s,{direction:"row",spacing:3,justifyContent:"space-between",alignItems:"center",children:[e.jsxs(s,{direction:"row",alignItems:"center",spacing:2,children:[e.jsx(l,{variant:"rounded",sx:{bgcolor:x.lightcolor,color:x.color,width:40,height:40},children:x.icon}),e.jsxs(c,{children:[e.jsx(a,{variant:"h6",mb:"4px",children:x.title}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:x.subtitle})]})]}),e.jsxs(a,{variant:"subtitle2",color:"textSecondary",children:[x.time," mins"]})]},$))})})})},Ie=[{avatar:v,coveravatar:F,title:"As yen tumbles, gadget-loving Japan goes for secondhand iPhones",category:"Social",name:"Georgeanna Ramero",view:"9,125",comments:"3",time:"Mon, Dec 19"},{avatar:w,coveravatar:M,title:"Intel loses bid to revive antitrust case against patent foe Fortress",category:"Gadget",name:"Georgeanna Ramero",view:"4,150",comments:"38",time:"Sun, Dec 18"},{avatar:f,coveravatar:L,title:"COVID outbreak deepens as more lockdowns loom in China",category:"Health",name:"Georgeanna Ramero",view:"9,480",comments:"12",time:"Sat, Dec 17"}],Le=()=>{const[i,n]=p.useState(!0);return u.useEffect(()=>{const t=setTimeout(()=>{n(!1)},700);return()=>clearTimeout(t)},[]),e.jsx(r,{container:!0,spacing:3,children:Ie.map((t,o)=>e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsx(d,{className:"hoverCard",children:e.jsxs(e.Fragment,{children:[e.jsx(a,{component:y,to:"/",children:i?e.jsx(b,{variant:"square",animation:"wave",width:"100%",height:240}):e.jsx(T,{component:"img",height:"240",image:t.coveravatar,alt:"green iguana"})}),e.jsxs(m,{children:[e.jsxs(s,{direction:"row",sx:{marginTop:"-45px"},children:[e.jsx(B,{title:t.name,placement:"top",children:e.jsx(l,{"aria-label":"recipe",src:t.avatar})}),e.jsx(I,{sx:{marginLeft:"auto",marginTop:"-21px",backgroundColor:"white"},label:"2 min Read",size:"small"})]}),e.jsx(I,{label:t.category,size:"small",sx:{marginTop:2}}),e.jsx(c,{my:3,children:e.jsx(a,{gutterBottom:!0,variant:"h5",color:"inherit",sx:{textDecoration:"none"},component:y,to:"/",children:t.title})}),e.jsxs(s,{direction:"row",gap:3,alignItems:"center",children:[e.jsxs(s,{direction:"row",gap:1,alignItems:"center",children:[e.jsx(ae,{size:"18"})," ",t.view]}),e.jsxs(s,{direction:"row",gap:1,alignItems:"center",children:[e.jsx(ne,{size:"18"})," ",t.comments]}),e.jsxs(s,{direction:"row",ml:"auto",alignItems:"center",children:[e.jsx(oe,{size:"16"}),e.jsx("small",{children:t.time})]})]})]})]})})},o))})},Ae=[{title:"Uptown Funk",subheader:"Jon Bon Jovi",img:N},{title:"Blank Space",subheader:"Madonna",img:q},{title:"Lean On",subheader:"Jennifer Lopez",img:L}],ze=()=>{const[i,n]=p.useState(!0);return u.useEffect(()=>{const t=setTimeout(()=>{n(!1)},700);return()=>clearTimeout(t)},[]),e.jsx(r,{container:!0,spacing:3,children:Ae.map((t,o)=>e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsxs(we,{sx:{display:"flex",p:0},children:[e.jsxs(c,{sx:{display:"flex",flexDirection:"column"},children:[e.jsxs(m,{sx:{flex:"1 0 auto"},children:[e.jsx(a,{component:"div",variant:"h5",children:t.title}),e.jsx(a,{variant:"subtitle1",color:"text.secondary",component:"div",children:t.subheader})]}),e.jsxs(s,{direction:"row",spacing:2,px:2,pb:3,children:[e.jsx(j,{"aria-label":"previous",children:e.jsx(ce,{width:"20"})}),e.jsx(j,{"aria-label":"play/pause",color:"error",children:e.jsx(le,{width:"20"})}),e.jsx(j,{"aria-label":"next",children:e.jsx(me,{width:"20"})})]})]}),i?e.jsx(b,{variant:"square",animation:"wave",width:"100%",height:180}):e.jsx(T,{component:"img",sx:{width:"100%",height:180},image:t.img,alt:"Live from space album cover"})]})},o))})},Be=[{title:"Boat Headphone",subheader:"September 14, 2023",photo:H,salesPrice:375,price:285,rating:4},{title:"MacBook Air Pro",subheader:"September 14, 2023",photo:J,salesPrice:650,price:900,rating:5},{title:"Red Valvet Dress",subheader:"September 14, 2023",photo:U,salesPrice:150,price:200,rating:3},{title:"Cute Soft Teddybear",subheader:"September 14, 2023",photo:O,salesPrice:285,price:345,rating:2}],ke=()=>{const[i,n]=p.useState(!0);return u.useEffect(()=>{const t=setTimeout(()=>{n(!1)},700);return()=>clearTimeout(t)},[]),e.jsx(r,{container:!0,spacing:3,children:Be.map((t,o)=>e.jsx(r,{item:!0,xs:12,sm:4,lg:3,children:e.jsxs(d,{children:[e.jsx(a,{component:y,to:"/",children:i?e.jsx(b,{variant:"square",animation:"wave",width:"100%",height:270}):e.jsx("img",{src:t.photo,alt:"img",width:"100%"})}),e.jsx(B,{title:"Add To Cart",children:e.jsx(fe,{size:"small",color:"primary",sx:{bottom:"75px",right:"15px",position:"absolute"},children:e.jsx(de,{size:"16"})})}),e.jsxs(m,{sx:{p:3,pt:2},children:[e.jsx(a,{variant:"h6",children:t.title}),e.jsxs(s,{direction:"row",alignItems:"center",justifyContent:"space-between",mt:1,children:[e.jsxs(s,{direction:"row",alignItems:"center",children:[e.jsxs(a,{variant:"h6",children:["$",t.price]}),e.jsxs(a,{color:"textSecondary",ml:1,sx:{textDecoration:"line-through"},children:["$",t.salesPrice]})]}),e.jsx(be,{name:"read-only",size:"small",value:t.rating,readOnly:!0})]})]})]})},o))})},De=[{title:"Andrew Grant",location:"El Salvador",avatar:v},{title:"Leo Pratt",location:"Bulgaria",avatar:w},{title:"Charles Nunez",location:"Nepal",avatar:f}],Pe=()=>e.jsx(r,{container:!0,spacing:3,children:De.map((i,n)=>e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsx(d,{children:e.jsx(m,{children:e.jsxs(s,{direction:"row",spacing:2,alignItems:"center",justifyContent:"space-between",children:[e.jsxs(s,{direction:"row",spacing:2,children:[e.jsx(l,{src:i.avatar,alt:i.avatar}),e.jsxs(c,{children:[e.jsx(a,{variant:"h6",children:i.title}),e.jsxs(a,{variant:"subtitle1",color:"textSecondary",display:"flex",alignItems:"center",gap:"3px",children:[e.jsx(A,{width:18})," ",i.location]})]})]}),e.jsx(h,{variant:"contained",color:"primary",children:"Follow"})]})})})},n))}),Re=[{title:"Andrew Grant",location:"El Salvador",avatar:v},{title:"Leo Pratt",location:"Bulgaria",avatar:w},{title:"Charles Nunez",location:"Nepal",avatar:f},{title:"Lora Powers",location:"Nepal",avatar:V}],Ee=()=>e.jsx(r,{container:!0,spacing:3,children:Re.map((i,n)=>e.jsx(r,{item:!0,xs:12,sm:6,lg:3,children:e.jsx(d,{children:e.jsxs(m,{children:[e.jsx(l,{src:i.avatar,sx:{height:80,width:80}}),e.jsx(s,{direction:"row",spacing:2,mt:3,children:e.jsxs(c,{children:[e.jsx(a,{variant:"h6",mb:1,children:i.title}),e.jsxs(s,{direction:"row",spacing:2,alignItems:"center",children:[e.jsxs(Ce,{children:[e.jsx(l,{sx:{height:28,width:28},alt:"Remy Sharp",src:v}),e.jsx(l,{sx:{height:28,width:28},alt:"Travis Howard",src:w}),e.jsx(l,{sx:{height:28,width:28},alt:"Cindy Baker",src:f})]}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"3 mutual friends"})]})]})}),e.jsxs(s,{spacing:2,mt:3,children:[e.jsx(h,{size:"large",variant:"text",color:"primary",children:"Add Friend"}),e.jsx(h,{size:"large",variant:"text",color:"secondary",children:"Remove"})]})]})})},n))}),Ge=[{name:"Facebook",icon:e.jsx(xe,{size:"18",color:"#1877F2"})},{name:"Instagram",icon:e.jsx(he,{size:"18",color:"#D7336D"})},{name:"Github",icon:e.jsx(pe,{size:"18",color:"#006097"})},{name:"Twitter",icon:e.jsx(ge,{size:"18",color:"#1C9CEA"})}],$e=[{name:"Andrew Grant",role:"Technology Director",avatar:v},{name:"Leo Pratt",role:"Telecom Analyst",avatar:w},{name:"Charles Nunez",role:"Environmental Specialist",avatar:f}],Fe=()=>{const i=z(),[n,t]=p.useState(!0);return u.useEffect(()=>{const o=setTimeout(()=>{t(!1)},700);return()=>clearTimeout(o)},[]),e.jsx(r,{container:!0,spacing:3,children:$e.map((o,g)=>e.jsx(r,{item:!0,xs:12,sm:4,children:e.jsxs(d,{children:[e.jsx(m,{children:e.jsxs(s,{direction:"column",gap:2,alignItems:"center",children:[n?e.jsx(b,{variant:"square",animation:"wave",width:"100%",height:160}):e.jsx(l,{alt:"Remy Sharp",src:o.avatar,sx:{width:"80px",height:"80px"}}),e.jsxs(c,{textAlign:"center",children:[e.jsx(a,{variant:"h5",children:o.name}),e.jsx(a,{variant:"caption",children:o.role})]})]})}),e.jsx(S,{}),e.jsx(c,{p:2,py:1,textAlign:"center",sx:{backgroundColor:i.palette.mode==="dark"?"rgba(0, 0, 0, 0.05)":"grey.100"},children:Ge.map(C=>e.jsx(j,{children:C.icon},C.name))})]})},g))})},Me=()=>{const[i,n]=p.useState(45),t=(o,g)=>{n(g)};return e.jsx(d,{children:e.jsxs(m,{sx:{p:"30px"},children:[e.jsx(a,{variant:"h5",children:"Settings"}),e.jsxs(s,{spacing:2,mt:3,children:[e.jsxs(s,{direction:"row",spacing:2,children:[e.jsx(l,{variant:"rounded",sx:{bgcolor:"primary.main",width:48,height:48},children:e.jsx(je,{width:22})}),e.jsxs(c,{width:"100%",children:[e.jsxs(c,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(a,{variant:"h6",children:"Sound"}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"45%"})]}),e.jsx(ye,{"aria-label":"Volume",value:i,onChange:t})]})]}),e.jsx(S,{}),e.jsxs(s,{direction:"row",spacing:2,children:[e.jsx(l,{variant:"rounded",sx:{bgcolor:"secondary.main",width:48,height:48},children:e.jsx(ue,{width:22})}),e.jsxs(c,{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",children:[e.jsxs(c,{children:[e.jsx(a,{variant:"h6",mb:1,children:"Chat"}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"Turn on chat during call"})]}),e.jsx(c,{children:e.jsx(Se,{})})]})]}),e.jsx(S,{})]}),e.jsxs(s,{direction:"row",justifyContent:"end",spacing:2,mt:2,children:[e.jsx(h,{variant:"outlined",color:"error",children:"Cancel"}),e.jsx(h,{variant:"contained",color:"primary",children:"Save"})]})]})})},Ne=[{title:"Andrew Grant",avatar:K},{title:"Leo Pratt",avatar:W}],qe=()=>{const[i,n]=p.useState(!0);return u.useEffect(()=>{const t=setTimeout(()=>{n(!1)},700);return()=>clearTimeout(t)},[]),e.jsx(r,{container:!0,spacing:3,children:Ne.map((t,o)=>e.jsx(r,{item:!0,xs:12,sm:6,children:e.jsx(d,{children:e.jsxs(m,{children:[e.jsxs(s,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:2,children:[e.jsx(a,{variant:"h6",mb:1,children:t.title}),e.jsx(j,{color:"secondary",children:e.jsx(ve,{width:20})})]}),i?e.jsx(b,{variant:"square",animation:"wave",width:"100%",height:160}):e.jsx(T,{component:"img",image:t.avatar,sx:{height:160,borderRadius:2}}),e.jsx(s,{spacing:2,mt:3,children:e.jsx(h,{size:"large",variant:"contained",color:"primary",children:"Gift to Friend ($50.00)"})})]})})},o))})},He=[{to:"/",title:"Home"},{title:"Cards"}],Et=()=>e.jsxs(Z,{title:"Cards",description:"this is Cards page",children:[e.jsx(_,{title:"Cards",items:He}),e.jsxs(r,{container:!0,spacing:3,children:[e.jsx(r,{item:!0,xs:12,children:e.jsx(Y,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(Le,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(ke,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(ze,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(Pe,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(Ee,{})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(Fe,{})}),e.jsx(r,{item:!0,xs:12,sm:6,lg:4,children:e.jsx(Me,{})}),e.jsx(r,{item:!0,xs:12,lg:8,children:e.jsx(qe,{})}),e.jsx(r,{item:!0,xs:12,sm:6,lg:4,children:e.jsx(Q,{})}),e.jsx(r,{item:!0,xs:12,sm:6,lg:4,children:e.jsx(Te,{})}),e.jsx(r,{item:!0,xs:12,sm:6,lg:4,children:e.jsx(X,{})})]})]});export{Et as default};
