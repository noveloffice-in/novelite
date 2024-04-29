var Pe=Object.defineProperty;var ce=Object.getOwnPropertySymbols;var $e=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable;var le=(e,o,n)=>o in e?Pe(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,oe=(e,o)=>{for(var n in o||(o={}))$e.call(o,n)&&le(e,n,o[n]);if(ce)for(var n of ce(o))Re.call(o,n)&&le(e,n,o[n]);return e};import{r as f,A as O,_ as p,j as t,c as D,B as we,u as he,Z as be,e as U,aj as Ie,a9 as Ae,a8 as Be,ap as Me,a4 as Le,R as Te,L as Ne}from"./index-5a3f6a76.js";import{P as Fe}from"./PageContainer-ec8a92a5.js";import{B as _e}from"./Breadcrumb-fdd77327.js";import{C as de}from"./ChildCard-7fb0986e.js";import{B as W}from"./Box-0fb41966.js";import{g as G,a as V,s as w,d as _,b as H,B as fe,r as ge,T as u}from"./Typography-36c6dc69.js";import{S as T}from"./Stack-84eaf471.js";import{r as xe}from"./createSvgIcon-7fadfa12.js";import{B as Y}from"./Button-0fcc9acd.js";import{M as ze}from"./Modal-4ae20275.js";import{u as Ce,f as De}from"./useFormControl-c4cdf3b7.js";import{S as qe}from"./Stack-5dffdf82.js";import{u as ve}from"./useControlled-ede9ea79.js";import{c as ne}from"./Grid-40636f23.js";import{u as Ue,c as re}from"./useSlot-df301bfc.js";import{M as We}from"./Paper-73496770.js";import{C as Ee}from"./Collapse-165bf685.js";import{u as Oe}from"./useDispatch-794f7d90.js";import"./index.esm-21a277c7.js";import"./useSlotProps-52eb16c2.js";import"./Link-71046a3e.js";import"./Box-4fe6d763.js";import"./Card-f5a04433.js";import"./CardHeader-64a3d8c5.js";import"./Divider-0b7a029c.js";import"./dividerClasses-1168dda4.js";import"./CardContent-66ebae48.js";import"./createStack-3bc4d5d9.js";import"./styled-071a7d88.js";import"./ownerWindow-46c4bc4a.js";const Ge=f.createContext({}),ye=Ge;function Ve(e){return V("MuiAccordion",e)}const He=G("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),ee=He,Qe=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],Ze=re(),Je=e=>{const{classes:o,square:n,expanded:r,disabled:a,disableGutters:s}=e;return H({root:["root",!n&&"rounded",r&&"expanded",a&&"disabled",!s&&"gutters"],region:["region"]},Ve,o)},Ke=w(We,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:n}=e;return[{[`& .${ee.region}`]:o.region},o.root,!n.square&&o.rounded,!n.disableGutters&&o.gutters]}})(({theme:e})=>{const o={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],o),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],o)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${ee.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${ee.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}},({theme:e})=>({variants:[{props:o=>!o.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:o=>!o.disableGutters,style:{[`&.${ee.expanded}`]:{margin:"16px 0"}}}]})),Xe=f.forwardRef(function(o,n){const r=Ze({props:o,name:"MuiAccordion"}),{children:a,className:s,defaultExpanded:l=!1,disabled:c=!1,disableGutters:d=!1,expanded:g,onChange:C,square:S=!1,slots:v={},slotProps:P={},TransitionComponent:B,TransitionProps:y}=r,m=O(r,Qe),[h,k]=ve({controlled:g,default:l,name:"Accordion",state:"expanded"}),N=f.useCallback(z=>{k(!h),C&&C(z,!h)},[h,C,k]),[M,...F]=f.Children.toArray(a),$=f.useMemo(()=>({expanded:h,disabled:c,disableGutters:d,toggle:N}),[h,c,d,N]),I=p({},r,{square:S,disabled:c,disableGutters:d,expanded:h}),R=Je(I),A=p({transition:B},v),Q=p({transition:y},P),[i,q]=Ue("transition",{elementType:Ee,externalForwardedProps:{slots:A,slotProps:Q},ownerState:I});return t.jsxs(Ke,p({className:_(R.root,s),ref:n,ownerState:I,square:S},m,{children:[t.jsx(ye.Provider,{value:$,children:M}),t.jsx(i,p({in:h,timeout:"auto"},q,{children:t.jsx("div",{"aria-labelledby":M.props.id,id:M.props["aria-controls"],role:"region",className:R.region,children:F})}))]}))}),Ye=Xe;function eo(e){return V("MuiAccordionDetails",e)}G("MuiAccordionDetails",["root"]);const oo=["className"],to=re(),no=e=>{const{classes:o}=e;return H({root:["root"]},eo,o)},ro=w("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,o)=>o.root})(({theme:e})=>({padding:e.spacing(1,2,2)})),so=f.forwardRef(function(o,n){const r=to({props:o,name:"MuiAccordionDetails"}),{className:a}=r,s=O(r,oo),l=r,c=no(l);return t.jsx(ro,p({className:_(c.root,a),ref:n,ownerState:l},s))}),ao=so;function io(e){return V("MuiAccordionSummary",e)}const co=G("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),E=co,lo=["children","className","expandIcon","focusVisibleClassName","onClick"],uo=re(),po=e=>{const{classes:o,expanded:n,disabled:r,disableGutters:a}=e;return H({root:["root",n&&"expanded",r&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",n&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",n&&"expanded"]},io,o)},mo=w(fe,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,o)=>o.root})(({theme:e})=>{const o={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],o),[`&.${E.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${E.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${E.disabled})`]:{cursor:"pointer"},variants:[{props:n=>!n.disableGutters,style:{[`&.${E.expanded}`]:{minHeight:64}}}]}}),ho=w("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,o)=>o.content})(({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:o=>!o.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${E.expanded}`]:{margin:"20px 0"}}}]})),bo=w("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,o)=>o.expandIconWrapper})(({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${E.expanded}`]:{transform:"rotate(180deg)"}})),fo=f.forwardRef(function(o,n){const r=uo({props:o,name:"MuiAccordionSummary"}),{children:a,className:s,expandIcon:l,focusVisibleClassName:c,onClick:d}=r,g=O(r,lo),{disabled:C=!1,disableGutters:S,expanded:v,toggle:P}=f.useContext(ye),B=h=>{P&&P(h),d&&d(h)},y=p({},r,{expanded:v,disabled:C,disableGutters:S}),m=po(y);return t.jsxs(mo,p({focusRipple:!1,disableRipple:!0,disabled:C,component:"div","aria-expanded":v,className:_(m.root,s),focusVisibleClassName:_(m.focusVisible,c),onClick:B,ref:n,ownerState:y},g,{children:[t.jsx(ho,{className:m.content,ownerState:y,children:a}),l&&t.jsx(bo,{className:m.expandIconWrapper,ownerState:y,children:l})]}))}),go=fo;function xo(e){return V("PrivateSwitchBase",e)}G("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Co=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],vo=e=>{const{classes:o,checked:n,disabled:r,edge:a}=e,s={root:["root",n&&"checked",r&&"disabled",a&&`edge${D(a)}`],input:["input"]};return H(s,xo,o)},yo=w(fe)(({ownerState:e})=>p({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),jo=w("input",{shouldForwardProp:ge})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),ko=f.forwardRef(function(o,n){const{autoFocus:r,checked:a,checkedIcon:s,className:l,defaultChecked:c,disabled:d,disableFocusRipple:g=!1,edge:C=!1,icon:S,id:v,inputProps:P,inputRef:B,name:y,onBlur:m,onChange:h,onFocus:k,readOnly:N,required:M=!1,tabIndex:F,type:$,value:I}=o,R=O(o,Co),[A,Q]=ve({controlled:a,default:!!c,name:"SwitchBase",state:"checked"}),i=Ce(),q=j=>{k&&k(j),i&&i.onFocus&&i.onFocus(j)},z=j=>{m&&m(j),i&&i.onBlur&&i.onBlur(j)},K=j=>{if(j.nativeEvent.defaultPrevented)return;const Z=j.target.checked;Q(Z),h&&h(j,Z)};let L=d;i&&typeof L=="undefined"&&(L=i.disabled);const X=$==="checkbox"||$==="radio",b=p({},o,{checked:A,disabled:L,disableFocusRipple:g,edge:C}),x=vo(b);return t.jsxs(yo,p({component:"span",className:_(x.root,l),centerRipple:!0,focusRipple:!g,disabled:L,tabIndex:null,role:void 0,onFocus:q,onBlur:z,ownerState:b,ref:n},R,{children:[t.jsx(jo,p({autoFocus:r,checked:a,defaultChecked:c,className:x.input,disabled:L,id:X?v:void 0,name:y,onChange:K,readOnly:N,ref:B,required:M,ownerState:b,tabIndex:F,type:$},$==="checkbox"&&I===void 0?{}:{value:I},P)),A?s:S]}))}),So=ko,Po=ne(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),$o=ne(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Ro=ne(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function wo(e){return V("MuiCheckbox",e)}const Io=G("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),te=Io,Ao=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],Bo=e=>{const{classes:o,indeterminate:n,color:r,size:a}=e,s={root:["root",n&&"indeterminate",`color${D(r)}`,`size${D(a)}`]},l=H(s,wo,o);return p({},o,l)},Mo=w(So,{shouldForwardProp:e=>ge(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:n}=e;return[o.root,n.indeterminate&&o.indeterminate,o[`size${D(n.size)}`],n.color!=="default"&&o[`color${D(n.color)}`]]}})(({theme:e,ownerState:o})=>p({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:we(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${te.checked}, &.${te.indeterminate}`]:{color:(e.vars||e).palette[o.color].main},[`&.${te.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),Lo=t.jsx($o,{}),To=t.jsx(Po,{}),No=t.jsx(Ro,{}),Fo=f.forwardRef(function(o,n){var r,a;const s=he({props:o,name:"MuiCheckbox"}),{checkedIcon:l=Lo,color:c="primary",icon:d=To,indeterminate:g=!1,indeterminateIcon:C=No,inputProps:S,size:v="medium",className:P}=s,B=O(s,Ao),y=g?C:d,m=g?C:l,h=p({},s,{color:c,indeterminate:g,size:v}),k=Bo(h);return t.jsx(Mo,p({type:"checkbox",inputProps:p({"data-indeterminate":g},S),icon:f.cloneElement(y,{fontSize:(r=y.props.fontSize)!=null?r:v}),checkedIcon:f.cloneElement(m,{fontSize:(a=m.props.fontSize)!=null?a:v}),ownerState:h,ref:n,className:_(k.root,P)},B,{classes:k}))}),_o=Fo;function zo(e){return V("MuiFormControlLabel",e)}const Do=G("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),J=Do,qo=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],Uo=e=>{const{classes:o,disabled:n,labelPlacement:r,error:a,required:s}=e,l={root:["root",n&&"disabled",`labelPlacement${D(r)}`,a&&"error",s&&"required"],label:["label",n&&"disabled"],asterisk:["asterisk",a&&"error"]};return H(l,zo,o)},Wo=w("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:n}=e;return[{[`& .${J.label}`]:o.label},o.root,o[`labelPlacement${D(n.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>p({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${J.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${J.label}`]:{[`&.${J.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),Eo=w("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${J.error}`]:{color:(e.vars||e).palette.error.main}})),Oo=f.forwardRef(function(o,n){var r,a;const s=he({props:o,name:"MuiFormControlLabel"}),{className:l,componentsProps:c={},control:d,disabled:g,disableTypography:C,label:S,labelPlacement:v="end",required:P,slotProps:B={}}=s,y=O(s,qo),m=Ce(),h=(r=g!=null?g:d.props.disabled)!=null?r:m==null?void 0:m.disabled,k=P!=null?P:d.props.required,N={disabled:h,required:k};["checked","name","onChange","value","inputRef"].forEach(A=>{typeof d.props[A]=="undefined"&&typeof s[A]!="undefined"&&(N[A]=s[A])});const M=De({props:s,muiFormControl:m,states:["error"]}),F=p({},s,{disabled:h,labelPlacement:v,required:k,error:M.error}),$=Uo(F),I=(a=B.typography)!=null?a:c.typography;let R=S;return R!=null&&R.type!==u&&!C&&(R=t.jsx(u,p({component:"span"},I,{className:_($.label,I==null?void 0:I.className),children:R}))),t.jsxs(Wo,p({className:_($.root,l),ownerState:F,ref:n},y,{children:[f.cloneElement(d,N),k?t.jsxs(qe,{display:"block",children:[R,t.jsxs(Eo,{ownerState:F,"aria-hidden":!0,className:$.asterisk,children:[" ","*"]})]}):R]}))}),Go=Oo;function Vo({price:e,selectedSlots:o,tittle:n}){e=e/2;const r=e*(o==null?void 0:o.length),a=r*(18/100),s=o.map(c=>c.split(","));function l(c){if(Number.isInteger(c)){let d=c.toString();return d.length>3?d.slice(0,-3)+","+d.slice(-3):d}else return new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(c)}return t.jsxs(W,{p:2,children:[t.jsx(u,{variant:"h5",fontWeight:600,mb:3,children:n}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:3,children:[t.jsx(u,{variant:"h6",fontWeight:400,children:"Number of slots"}),t.jsx(u,{variant:"h6",children:o==null?void 0:o.length})]}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:3,children:[t.jsx(u,{variant:"h6",fontWeight:400,children:"Total hours"}),t.jsxs(u,{variant:"h6",children:[(o==null?void 0:o.length)/2," hr"]})]}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:3,children:[t.jsx(u,{variant:"h6",fontWeight:400,children:"Slots timings"}),t.jsx(T,{justifyContent:"space-between",children:s==null?void 0:s.map((c,d)=>t.jsx(u,{variant:"h6",color:"primary",mb:.5,children:c},c+d))})]}),t.jsx("hr",{}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:1,mt:2,children:[t.jsx(u,{variant:"h6",children:"Total"}),t.jsxs(u,{variant:"h5",color:"success",children:["₹ ",l(r)]})]}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:1,children:[t.jsx(u,{variant:"h6",children:"GST (18%)"}),t.jsxs(u,{variant:"h5",color:"success",children:["₹ ",l(a)]})]}),t.jsxs(T,{direction:"row",justifyContent:"space-between",mb:1,children:[t.jsx(u,{variant:"h6",children:"Grand Total "}),t.jsxs(u,{variant:"h5",color:"success",children:["₹ ",l(r+a)]})]})]})}var se={},Ho=be;Object.defineProperty(se,"__esModule",{value:!0});var je=se.default=void 0,Qo=Ho(xe()),Zo=t;je=se.default=(0,Qo.default)((0,Zo.jsx)("path",{d:"M12 5.99 19.53 19H4.47zM12 2 1 21h22zm1 14h-2v2h2zm0-6h-2v4h2z"}),"WarningAmberOutlined");var ae={},Jo=be;Object.defineProperty(ae,"__esModule",{value:!0});var ke=ae.default=void 0,Ko=Jo(xe()),Xo=t;ke=ae.default=(0,Ko.default)((0,Xo.jsx)("path",{d:"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"}),"ArrowForwardIosSharp");const Yo={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:24,p:4},ue=w(e=>t.jsx(Ye,oe({disableGutters:!0,elevation:0,square:!0},e)))(({theme:e})=>({border:`1px solid ${e.palette.divider}`,"&:not(:last-child)":{borderBottom:0},"&::before":{display:"none"}})),pe=w(e=>t.jsx(go,oe({expandIcon:t.jsx(ke,{sx:{fontSize:"0.9rem"}})},e)))(({theme:e})=>({backgroundColor:e.palette.mode==="dark"?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, .03)",flexDirection:"row-reverse","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:e.spacing(1)}})),me=w(ao)(({theme:e})=>({padding:e.spacing(2),borderTop:"1px solid rgba(0, 0, 0, .125)"}));function Bt(){let e=U(i=>i.bookingsSliceReducer.price);const o=U(i=>i.bookingsSliceReducer.date),n=U(i=>i.bookingsSliceReducer.roomName),r=U(i=>i.bookingsSliceReducer.roomCategory),a=U(i=>i.bookingsSliceReducer.bookingLocation),s=U(i=>i.bookingsSliceReducer.selectedSlots),[l,c]=f.useState(!1),d=Oe(),[g,C]=f.useState(0),[S,v]=f.useState(!1),{updateDoc:P,error:B}=Ie();Ae();const y=[{to:"/dashboard",title:"Home"},{to:"/location",title:a},{to:"/category",title:r},{to:"/bookings",title:n},{to:"/bookingslot",title:"Booking Slots"},{to:"/payment_summary",title:"Payment Summary"}],{data:m,isLoading:h}=Be("/novelite.api.api.getAllData");f.useEffect(()=>{let i;m&&(i=Object.values(m.message.reduce((b,{name:x,room:j,from_time:Z,to_time:ie,booking_date:Se})=>(b[x]?b[x].booking_timings+=`,${Z} - ${ie}`:b[x]={name:x,room:j,booking_timings:`${Z} - ${ie}`,booking_date:Se},b),{})));function q(b,x){if(b.size!==x.size)return!1;for(let j of b)if(!x.has(j))return!1;return!0}const z=new Set(s),K=i==null?void 0:i.find(b=>{const x=new Set(b.booking_timings.split(","));return q(x,z)});if(K){let b=K.name;d(Me(b)),Le.post("/api/method/novelite.api.api.create_qr_codes",{data:`{"id":"${b}", "location":"${a}", "booking_date":"${o}", "booking_timings":"${s}", "room_type":"${r}", "room":"${n}"}`}).then(x=>{P("Room Bookings",b,{qr_code:`data:image/png;base64,${x.data.message}`}).then(()=>{console.log("Added QR code to Doc")}).catch(j=>{console.log(j)})})}let L=localStorage.getItem("endTime");L||(L=new Date().getTime()+10*60*1e3,localStorage.setItem("endTime",L));const X=setInterval(()=>{const b=new Date().getTime(),x=L-b;x<0?(clearInterval(X),localStorage.removeItem("endTime"),C(0)):C(x)},1e3);return()=>clearInterval(X)},[m,s]);const k=Math.floor(g%(1e3*60*60)/(1e3*60)),N=Math.floor(g%(1e3*60)/1e3),[M,F]=Te.useState("panel1"),$=i=>(q,z)=>{F(z?i:!1)},I=()=>c(!0),R=()=>{c(!1),v(!1)},A=i=>v(i.target.checked),Q=()=>{console.log(S)};return t.jsxs(Fe,{title:"Payment Summary - Novel Office",children:[t.jsx(_e,{title:"Payment Summary",items:y}),t.jsx(W,{bgcolor:"warning.light",textAlign:"center",children:t.jsxs(T,{justifyContent:"center",alignItems:"center",flexDirection:"row",children:[t.jsx(W,{color:"warning.main",children:t.jsx(je,{sx:{marginRight:"0.5rem",marginBottom:"-0.4rem"}})}),t.jsxs(u,{color:"warning.main",m:1,variant:"h5",fontWeight:600,children:["Selected Slots will be blocked for ",k.toLocaleString("en-US",{minimumIntegerDigits:2}),":",N.toLocaleString("en-US",{minimumIntegerDigits:2})," mins"]})]})}),t.jsx(W,{my:3,children:t.jsx(de,{children:t.jsx(Vo,{price:e,selectedSlots:s,tittle:"Payment Summary"})})}),t.jsxs(W,{children:[t.jsx(de,{children:t.jsxs(T,{children:[t.jsx(u,{variant:"h6",fontWeight:400,mb:2,children:"Payment Type"}),t.jsxs(ue,{expanded:M==="panel1",onChange:$("panel1"),children:[t.jsx(pe,{"aria-controls":"panel1d-content",id:"panel1d-header",children:t.jsx(u,{children:"Add to invoice"})}),t.jsxs(me,{children:[t.jsxs(u,{mb:2,children:["1)  Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",t.jsx("br",{}),"2)  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. ",t.jsx("br",{}),"3)  Suspendisse malesuada lacus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit."]}),t.jsx(Y,{variant:"contained",onClick:I,children:"Add to Invoice"})]})]}),t.jsxs(ue,{expanded:M==="panel2",onChange:$("panel2"),children:[t.jsx(pe,{"aria-controls":"panel2d-content",id:"panel2d-header",children:t.jsx(u,{children:"Pay now (Coming Soon)"})}),t.jsxs(me,{children:[t.jsx(u,{mb:2,children:"Comming Soon"}),t.jsx(Y,{variant:"contained",disabled:!0,children:"Pay Now"})]})]})]})}),t.jsx(ze,{open:l,onClose:R,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:t.jsxs(W,{sx:Yo,children:[t.jsxs(u,{mb:2,children:["1)  Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",t.jsx("br",{}),"2)  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. ",t.jsx("br",{}),"3)  Suspendisse malesuada lacus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",t.jsx(Go,{required:!0,control:t.jsx(_o,{onChange:i=>{A(i)}}),label:"I agree to terms and conditions"})]}),t.jsx(Y,{variant:"contained",onClick:Q,disabled:!S,children:"Confirm Bookings"})]})})]}),t.jsx(T,{direction:"row",justifyContent:"space-between",mt:2,children:t.jsx(Y,{color:"secondary",variant:"contained",component:Ne,to:"/bookingslot",children:"Back"})})]})}export{Bt as default};