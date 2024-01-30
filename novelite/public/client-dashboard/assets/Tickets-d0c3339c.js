import{r as g,ar as T,e as u,j as e,as as f,at as C,au as h}from"./index-f22446e5.js";import{B as k}from"./Breadcrumb-c1517ab0.js";import{P as b}from"./PageContainer-53646ac6.js";import{H as v}from"./index.esm-e0300107.js";import{B as d}from"./Box-f8c4e902.js";import{T as S}from"./TextField-eaaf417f.js";import{T as w,a as y,b as L,c as x,d as n,e as P}from"./TableRow-5d89add1.js";import{T as r,s as B}from"./Typography-493ceae3.js";import{S as A}from"./Stack-58acc4b3.js";import{A as I}from"./Avatar-934745ac.js";import{C as R}from"./Chip-22604cd4.js";import{T as W}from"./Tooltip-c24d37bb.js";import{I as D}from"./IconButton-dffcd583.js";import{P as O}from"./Pagination-3bcc2fb9.js";import{u as j}from"./useDispatch-ce130263.js";import{G as c}from"./Grid-6c01a67e.js";import{C as z}from"./ChildCard-37e943a8.js";import"./Link-f430d0ec.js";import"./FormControl-902fa994.js";import"./utils-5ebfb48b.js";import"./useFormControl-c5cffc22.js";import"./isMuiElement-0a1be5b6.js";import"./useId-6ded1857.js";import"./formControlState-02eb4045.js";import"./Select-8c02317b.js";import"./Popover-9060c6fe.js";import"./Modal-99caf082.js";import"./Fade-6b4e951e.js";import"./utils-e57cfcaa.js";import"./ownerDocument-613eb639.js";import"./ownerWindow-698471fc.js";import"./createChainedFunction-0bab83cf.js";import"./Portal-bdf58041.js";import"./Paper-eafa25ad.js";import"./Grow-1067b88b.js";import"./List-24f7ff12.js";import"./ListContext-74b9cccd.js";import"./useControlled-7a3bcd39.js";import"./InputBase-6d6630d9.js";import"./createStack-e9d30bfe.js";import"./styled-af0837ae.js";import"./Popper-7c45775d.js";import"./createPopper-319e19c4.js";import"./LastPage-13b3e262.js";import"./Card-99a14ea7.js";import"./CardHeader-53ac68d8.js";import"./Divider-efe6cf9e.js";import"./dividerClasses-0b6de4a8.js";import"./CardContent-621adc32.js";const E=()=>{const l=j();g.useEffect(()=>{l(T())},[l]);const a=(t,o,s)=>{switch(o){case"total_tickets":return t.filter(i=>!i.deleted&&i.ticketTitle.toLocaleLowerCase().includes(s));case"Pending":return t.filter(i=>!i.deleted&&i.Status==="Pending"&&i.ticketTitle.toLocaleLowerCase().includes(s));case"Closed":return t.filter(i=>!i.deleted&&i.Status==="Closed"&&i.ticketTitle.toLocaleLowerCase().includes(s));case"Open":return t.filter(i=>!i.deleted&&i.Status==="Open"&&i.ticketTitle.toLocaleLowerCase().includes(s));default:throw new Error(`Unknown filter: ${o}`)}},p=u(t=>a(t.ticketReducer.tickets,t.ticketReducer.currentFilter,t.ticketReducer.ticketSearch));return e.jsxs(d,{mt:4,children:[e.jsx(d,{sx:{maxWidth:"260px",ml:"auto"},mb:3,children:e.jsx(S,{size:"small",label:"Search",fullWidth:!0,onChange:t=>l(f(t.target.value))})}),e.jsx(w,{children:e.jsxs(y,{children:[e.jsx(L,{children:e.jsxs(x,{children:[e.jsx(n,{children:e.jsx(r,{variant:"h6",children:"Id"})}),e.jsx(n,{children:e.jsx(r,{variant:"h6",children:"Ticket"})}),e.jsx(n,{children:e.jsx(r,{variant:"h6",children:"Assigned To"})}),e.jsx(n,{children:e.jsx(r,{variant:"h6",children:"Status"})}),e.jsx(n,{children:e.jsx(r,{variant:"h6",children:"Date"})}),e.jsx(n,{align:"right",children:e.jsx(r,{variant:"h6",children:"Action"})})]})}),e.jsx(P,{children:p.map(t=>e.jsxs(x,{hover:!0,children:[e.jsx(n,{children:t.Id}),e.jsx(n,{children:e.jsxs(d,{children:[e.jsx(r,{variant:"h6",fontWeight:"500",noWrap:!0,children:t.ticketTitle}),e.jsx(r,{color:"textSecondary",noWrap:!0,sx:{maxWidth:"250px"},variant:"subtitle2",fontWeight:"400",children:t.ticketDescription})]})}),e.jsx(n,{children:e.jsxs(A,{direction:"row",gap:"10px",alignItems:"center",children:[e.jsx(I,{src:t.thumb,alt:t.thumb,width:"35",sx:{borderRadius:"100%"}}),e.jsx(r,{variant:"h6",children:t.AgentName})]})}),e.jsx(n,{children:e.jsx(R,{sx:{backgroundColor:t.Status==="Open"?o=>o.palette.success.light:t.Status==="Closed"?o=>o.palette.error.light:t.Status==="Pending"?o=>o.palette.warning.light:t.Status==="Moderate"},size:"small",label:t.Status})}),e.jsx(n,{children:e.jsx(r,{children:t.Date})}),e.jsx(n,{align:"right",children:e.jsx(W,{title:"Delete Ticket",children:e.jsx(D,{onClick:()=>l(C(t.Id)),children:e.jsx(v,{size:"18"})})})})]},t.Id))})]})}),e.jsx(d,{my:3,display:"flex",justifyContent:"center",children:e.jsx(O,{count:10,color:"primary"})})]})},m=B(d)(()=>({padding:"30px",transition:"0.1s ease-in",cursor:"pointer",color:"inherit","&:hover":{transform:"scale(1.03)"}})),F=()=>{const l=j(),a=u(s=>s.ticketReducer.tickets),p=a.filter(s=>s.Status==="Pending").length,t=a.filter(s=>s.Status==="Open").length,o=a.filter(s=>s.Status==="Closed").length;return e.jsxs(c,{container:!0,spacing:3,textAlign:"center",children:[e.jsx(c,{item:!0,xs:12,sm:6,lg:3,children:e.jsxs(m,{onClick:()=>l(h("total_tickets")),sx:{backgroundColor:"primary.light",color:"primary.main"},children:[e.jsx(r,{variant:"h3",children:a.length}),e.jsx(r,{variant:"h6",children:"Total Tickets"})]})}),e.jsx(c,{item:!0,xs:12,sm:6,lg:3,children:e.jsxs(m,{onClick:()=>l(h("Pending")),sx:{backgroundColor:"warning.light",color:"warning.main"},children:[e.jsx(r,{variant:"h3",children:p}),e.jsx(r,{variant:"h6",children:"Pending Tickets"})]})}),e.jsx(c,{item:!0,xs:12,sm:6,lg:3,children:e.jsxs(m,{onClick:()=>l(h("Open")),sx:{backgroundColor:"success.light",color:"success.main"},children:[e.jsx(r,{variant:"h3",children:t}),e.jsx(r,{variant:"h6",children:"Open Tickets"})]})}),e.jsx(c,{item:!0,xs:12,sm:6,lg:3,children:e.jsxs(m,{onClick:()=>l(h("Closed")),sx:{backgroundColor:"error.light",color:"error.main"},children:[e.jsx(r,{variant:"h3",children:o}),e.jsx(r,{variant:"h6",children:"Closed Tickets"})]})})]})},H=[{to:"/",title:"Home"},{title:"Tickets"}],Oe=()=>e.jsxs(b,{title:"Tickets App",description:"this is Note page",children:[e.jsx(k,{title:"Tickets app",items:H}),e.jsxs(z,{children:[e.jsx(F,{}),e.jsx(E,{})]})]});export{Oe as default};
