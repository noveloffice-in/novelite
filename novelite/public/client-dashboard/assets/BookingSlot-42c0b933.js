import{r as b,c as J,_ as z,x as Y,a0 as gt,u as tt,j as i,e as O,a as mt,I as ft,a7 as bt,a8 as ht,a9 as Bt,aa as xt}from"./index-85be31c7.js";import{P as vt}from"./PageContainer-c7f3623e.js";import{B as $t}from"./Breadcrumb-ace335c9.js";import{C as K}from"./ChildCard-81ab892d.js";import{u as yt,G as Ct}from"./Grid-37db235f.js";import{B as Tt}from"./Box-0292b75a.js";import{b as et,g as ot,s as rt,B as St,d as at,a as st,T as X}from"./Typography-080e93f2.js";import{g as kt}from"./getValidReactChildren-adba0319.js";import{a as H}from"./colorManipulator-78646366.js";import{k as Rt,Q as Z}from"./ReactToastify-bc43e8af.js";import{F as Dt,I as Nt,S as Mt}from"./Select-7830f08f.js";import{M as jt}from"./MenuItem-ce319505.js";import{B as _t}from"./Button-b973adf4.js";import{S as Ot}from"./Stack-e4b9ef18.js";import{u as zt}from"./useDispatch-def66b15.js";import"./index.esm-d4445909.js";import"./useSlotProps-4e75a496.js";import"./Link-2ca6b9cb.js";import"./Box-b16eb2c3.js";import"./Card-ab74aae4.js";import"./Paper-dee2bc62.js";import"./CardHeader-57e6a480.js";import"./Divider-312eb10c.js";import"./CardContent-c9d4e4d7.js";import"./clsx.m-1229b3e0.js";import"./Modal-5b74a126.js";import"./useControlled-5bb948a4.js";import"./createStack-b75d18eb.js";import"./styled-224b1b3e.js";function Gt(t){return ot("MuiToggleButton",t)}const Wt=et("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]),P=Wt,It=b.createContext({}),nt=It,Pt=b.createContext(void 0),it=Pt;function Lt(t,o){return o===void 0||t===void 0?!1:Array.isArray(o)?o.indexOf(t)>=0:t===o}const Ft=["value"],wt=["children","className","color","disabled","disableFocusRipple","fullWidth","onChange","onClick","selected","size","value"],Ut=t=>{const{classes:o,fullWidth:r,selected:s,disabled:d,size:h,color:T}=t,B={root:["root",s&&"selected",d&&"disabled",r&&"fullWidth",`size${J(h)}`,T]};return st(B,Gt,o)},At=rt(St,{name:"MuiToggleButton",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[o.root,o[`size${J(r.size)}`]]}})(({theme:t,ownerState:o})=>{let r=o.color==="standard"?t.palette.text.primary:t.palette[o.color].main,s;return t.vars&&(r=o.color==="standard"?t.vars.palette.text.primary:t.vars.palette[o.color].main,s=o.color==="standard"?t.vars.palette.text.primaryChannel:t.vars.palette[o.color].mainChannel),z({},t.typography.button,{borderRadius:(t.vars||t).shape.borderRadius,padding:11,border:`1px solid ${(t.vars||t).palette.divider}`,color:(t.vars||t).palette.action.active},o.fullWidth&&{width:"100%"},{[`&.${P.disabled}`]:{color:(t.vars||t).palette.action.disabled,border:`1px solid ${(t.vars||t).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:t.vars?`rgba(${t.vars.palette.text.primaryChannel} / ${t.vars.palette.action.hoverOpacity})`:H(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${P.selected}`]:{color:r,backgroundColor:t.vars?`rgba(${s} / ${t.vars.palette.action.selectedOpacity})`:H(r,t.palette.action.selectedOpacity),"&:hover":{backgroundColor:t.vars?`rgba(${s} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:H(r,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${s} / ${t.vars.palette.action.selectedOpacity})`:H(r,t.palette.action.selectedOpacity)}}}},o.size==="small"&&{padding:7,fontSize:t.typography.pxToRem(13)},o.size==="large"&&{padding:15,fontSize:t.typography.pxToRem(15)})}),Et=b.forwardRef(function(o,r){const s=b.useContext(nt),{value:d}=s,h=Y(s,Ft),T=b.useContext(it),B=gt(z({},h,{selected:Lt(o.value,d)}),o),x=tt({props:B,name:"MuiToggleButton"}),{children:l,className:a,color:p="standard",disabled:S=!1,disableFocusRipple:c=!1,fullWidth:L=!1,onChange:R,onClick:v,selected:D,size:G="medium",value:W}=x,F=Y(x,wt),N=z({},x,{color:p,disabled:S,disableFocusRipple:c,fullWidth:L,size:G}),w=Ut(N),$=y=>{v&&(v(y,W),y.defaultPrevented)||R&&R(y,W)},g=T||"";return i.jsx(At,z({className:at(h.className,w.root,a,g),disabled:S,focusRipple:!c,ref:r,onClick:$,onChange:R,value:W,ownerState:N,"aria-pressed":D},F,{children:l}))}),Ht=Et;function Jt(t){return ot("MuiToggleButtonGroup",t)}const Vt=et("MuiToggleButtonGroup",["root","selected","vertical","disabled","grouped","groupedHorizontal","groupedVertical","fullWidth","firstButton","lastButton","middleButton"]),n=Vt,Yt=["children","className","color","disabled","exclusive","fullWidth","onChange","orientation","size","value"],Qt=t=>{const{classes:o,orientation:r,fullWidth:s,disabled:d}=t,h={root:["root",r==="vertical"&&"vertical",s&&"fullWidth"],grouped:["grouped",`grouped${J(r)}`,d&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return st(h,Jt,o)},qt=rt("div",{name:"MuiToggleButtonGroup",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:r}=t;return[{[`& .${n.grouped}`]:o.grouped},{[`& .${n.grouped}`]:o[`grouped${J(r.orientation)}`]},{[`& .${n.firstButton}`]:o.firstButton},{[`& .${n.lastButton}`]:o.lastButton},{[`& .${n.middleButton}`]:o.middleButton},o.root,r.orientation==="vertical"&&o.vertical,r.fullWidth&&o.fullWidth]}})(({ownerState:t,theme:o})=>z({display:"inline-flex",borderRadius:(o.vars||o).shape.borderRadius},t.orientation==="vertical"&&{flexDirection:"column"},t.fullWidth&&{width:"100%"},{[`& .${n.grouped}`]:z({},t.orientation==="horizontal"?{[`&.${n.selected} + .${n.grouped}.${n.selected}`]:{borderLeft:0,marginLeft:0}}:{[`&.${n.selected} + .${n.grouped}.${n.selected}`]:{borderTop:0,marginTop:0}})},t.orientation==="horizontal"?{[`& .${n.firstButton},& .${n.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${n.lastButton},& .${n.middleButton}`]:{marginLeft:-1,borderLeft:"1px solid transparent",borderTopLeftRadius:0,borderBottomLeftRadius:0}}:{[`& .${n.firstButton},& .${n.middleButton}`]:{borderBottomLeftRadius:0,borderBottomRightRadius:0},[`& .${n.lastButton},& .${n.middleButton}`]:{marginTop:-1,borderTop:"1px solid transparent",borderTopLeftRadius:0,borderTopRightRadius:0}},t.orientation==="horizontal"?{[`& .${n.lastButton}.${P.disabled},& .${n.middleButton}.${P.disabled}`]:{borderLeft:"1px solid transparent"}}:{[`& .${n.lastButton}.${P.disabled},& .${n.middleButton}.${P.disabled}`]:{borderTop:"1px solid transparent"}})),Kt=b.forwardRef(function(o,r){const s=tt({props:o,name:"MuiToggleButtonGroup"}),{children:d,className:h,color:T="standard",disabled:B=!1,exclusive:x=!1,fullWidth:l=!1,onChange:a,orientation:p="horizontal",size:S="medium",value:c}=s,L=Y(s,Yt),R=z({},s,{disabled:B,fullWidth:l,orientation:p,size:S}),v=Qt(R),D=b.useCallback(($,g)=>{if(!a)return;const y=c&&c.indexOf(g);let M;c&&y>=0?(M=c.slice(),M.splice(y,1)):M=c?c.concat(g):[g],a($,M)},[a,c]),G=b.useCallback(($,g)=>{a&&a($,c===g?null:g)},[a,c]),W=b.useMemo(()=>({className:v.grouped,onChange:x?G:D,value:c,size:S,fullWidth:l,color:T,disabled:B}),[v.grouped,x,G,D,c,S,l,T,B]),F=kt(d),N=F.length,w=$=>{const g=$===0,y=$===N-1;return g&&y?"":g?v.firstButton:y?v.lastButton:v.middleButton};return i.jsx(qt,z({role:"group",className:at(v.root,h),ref:r,ownerState:R},L,{children:i.jsx(nt.Provider,{value:W,children:F.map(($,g)=>i.jsx(it.Provider,{value:w(g),children:$},g))})}))}),Xt=Kt;function Zt({slotsData:t,selectedSlots:o,setSelectedSlots:r,intervals:s}){const d=yt(),h=l=>{const[a,p]=l.split(":").map(Number);return a*60+p},T=l=>l.sort((a,p)=>{const S=h(a.split(" - ")[0]),c=h(p.split(" - ")[0]);return S-c}),B=l=>{let a=[];return t==null||t.forEach(p=>{a=a.concat(p.booking_timings.split(","))}),a==null?void 0:a.some(p=>p===l)},x=(l,a)=>{const p=T(a);console.log(p),r(p)};return i.jsx(Tt,{sx:{display:"grid",gridTemplateColumns:{xs:"repeat(3, 1fr)",md:"repeat(8, 1fr)",ls:"repeat(9, 1fr)"},gap:"16px"},children:(s==null?void 0:s.length)!==0&&s.map((l,a)=>i.jsx(Xt,{value:o,onChange:x,"aria-label":"text formatting",children:i.jsxs(Ht,{value:l,disabled:B(l),variant:"contained",sx:{width:"100%",border:(d.palette.mode==="dark","1px solid grey"),color:d.palette.mode==="dark"?"white":"black","&.Mui-selected":{backgroundColor:d.palette.mode==="dark"?"#154c79":"#5462D6",color:"white",boxShadow:d.palette.mode==="dark"?"2px 2px 2px black":"2px 2px 2px grey"},"&.Mui-disabled":{backgroundColor:"rgba(0, 0, 0, 0.12)",color:(d.palette.mode==="dark","grey")}},children:[l.split("-")[0]," - ",l.split("-")[1]]},a)},l+a))})}function Ne(){const[t,o]=b.useState(`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}-${String(new Date().getDate()).padStart(2,"0")}`),[r,s]=b.useState([]),[d,h]=b.useState([]),[T,B]=b.useState(""),x=O(e=>e.bookingsSliceReducer.roomName),l=O(e=>e.bookingsSliceReducer.roomCategory),a=O(e=>e.bookingsSliceReducer.bookingLocation),p=O(e=>e.novelprofileReducer.account_type),S=O(e=>e.novelprofileReducer.companyName),c=O(e=>e.novelprofileReducer.location),L=O(e=>e.novelprofileReducer.leadsID),R=mt(),v=zt();let D=30,G=7;const W=[{to:"/dashboard",title:"Home"},{to:"/location",title:"Location"},{to:"/category",title:"Category"},{to:"/bookings",title:x},{to:"/bookingslot",title:"Booking Slots"}],N=O(e=>e.bookingsSliceReducer.price)/2*r.length,w=N*(18/100),$=N+w;b.useEffect(()=>{const e=[],u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],j=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];for(let k=0;k<G;k++){const m=new Date;m.setDate(m.getDate()+k);const _=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`,f=`${String(m.getDate()).padStart(2,"0")}-${j[m.getMonth()]}`,C=u[m.getDay()];e.push({date:_,day:C,formattedDate:f})}h(e),B(e[0].day)},[G]);const g=e=>Z.warn(e,{toastId:"warn"}),y=e=>Z.error(e,{toastId:"error"});let M="",U="",Q=[];const{data:V}=ft("Room Booking Settings","Room Booking Settings"),{data:q,isLoading:lt}=bt("/novelite.api.api.getAllData");let A;if(q&&(A=Object.values(q.message.reduce((e,{name:u,room:j,from_time:k,to_time:m,booking_date:_})=>(e[u]?e[u].booking_timings+=`,${k} - ${m}`:e[u]={name:u,room:j,booking_timings:`${k} - ${m}`,booking_date:_},e),{})),A=A.filter(e=>e.room===x&&e.booking_date===t)),d.length!==0){let e=V==null?void 0:V.availability_of_slots.find(u=>u.day_of_week==T);M=e==null?void 0:e.from_time,U=e==null?void 0:e.to_time,U==="23:59:59"&&(U="24:00:00")}if(M!==void 0&&U!==void 0){const e=f=>{var E;const[C,I]=(E=f==null?void 0:f.split(":"))==null?void 0:E.map(Number);return C*60+I},u=f=>{const C=Math.floor(f/60)%24,I=f%60;return`${String(C).padStart(2,"0")}:${String(I).padStart(2,"0")}`},j=e(M),m=e(U)-j,_=Math.floor(m/D);for(let f=0;f<_;f++){const C=j+f*D,I=C+D,E=I>=1440?0:I;Q.push(`${u(C)} - ${u(E)}`)}}const dt=e=>{s([]),B(e.day),o(e.date)},{call:ct}=ht("/novelite.api.api.addDataToDoc"),ut=()=>{let e=`${r}`,u=`${L}-${c}`,[j,k,m]=t.split("-"),_=`${j}-${k}-${m}`,f={location:a,room:x,price:$,room_type:l,customer:S,client_type:p,booking_date:_,customer_lead_id:u,booking_timings:e,booking_status:"Blocked Temporarily"};r.length!==0?ct(f).then(()=>{v(Bt(r)),v(xt(_)),s([]),R("/payment_summary")}).catch(C=>{y(C.message),console.log("inside catch "+JSON.stringify(C.message))}):g("Please Select any slot to continue")};function pt(e){if(Number.isInteger(e)){let u=e.toString();return u.length>3?u.slice(0,-3)+","+u.slice(-3):u}else return new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}return i.jsxs(vt,{title:"Book Slots - Novel Office",children:[i.jsx($t,{title:"Booking Slots",items:W}),i.jsxs(Dt,{sx:{minWidth:130,mb:2,mr:4},children:[i.jsx(Nt,{id:"demo-simple-select-label",children:"Select Date"}),i.jsx(Mt,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:t,label:"Select Date",children:d==null?void 0:d.map(e=>i.jsx(jt,{value:e.date,onClick:()=>dt(e),children:e.formattedDate},e.date))})]}),!lt&&i.jsx(Zt,{slotsData:A,intervals:Q,selectedSlots:r,setSelectedSlots:s}),i.jsxs(Ct,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",mt:2,children:[i.jsx(K,{title:"",children:i.jsx(_t,{variant:"contained",color:"primary",onClick:ut,children:"Proceed"})}),i.jsx(K,{title:"",children:i.jsxs(Ot,{children:[i.jsxs(X,{variant:"h4",mb:.5,children:["Price : ₹ ",pt(N)]}),i.jsx(X,{variant:"h6",color:"primary",children:"(* GST not included)"})]})})]}),i.jsx(Rt,{position:"top-center",autoClose:1e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})}export{Ne as default};