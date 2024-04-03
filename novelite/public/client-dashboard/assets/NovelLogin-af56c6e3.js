var D=Object.defineProperty,T=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var N=(i,t,a)=>t in i?D(i,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[t]=a,g=(i,t)=>{for(var a in t||(t={}))A.call(t,a)&&N(i,a,t[a]);if(w)for(var a of w(t))J.call(t,a)&&N(i,a,t[a]);return i},f=(i,t)=>T(i,_(t));import{a as R,q as V,r as u,j as e,s as L,b as S}from"./index-85be31c7.js";import{P as q}from"./PageContainer-c7f3623e.js";import{C as m}from"./CustomFormLabel-3bbd1afe.js";import{C as c}from"./CustomTextField-c11c1a65.js";import{L as X}from"./Logo-b557a8b6.js";import{k as Z,Q as x}from"./ReactToastify-bc43e8af.js";import{C as H,I as M}from"./CustomOutlinedInput-92568a86.js";import{X as Q,_ as $}from"./index.esm-d4445909.js";import{B as n}from"./Box-0292b75a.js";import{G as I}from"./Grid-37db235f.js";import{C as K}from"./Card-ab74aae4.js";import{T as Y}from"./Typography-080e93f2.js";import{S as W}from"./Stack-e4b9ef18.js";import{B as E}from"./Button-b973adf4.js";import{I as ee}from"./IconButton-17cd79e6.js";import{u as te}from"./useDispatch-def66b15.js";import"./TextField-a09933b0.js";import"./Select-7830f08f.js";import"./Modal-5b74a126.js";import"./useControlled-5bb948a4.js";import"./useSlotProps-4e75a496.js";import"./Paper-dee2bc62.js";import"./clsx.m-1229b3e0.js";import"./createStack-b75d18eb.js";import"./styled-224b1b3e.js";function Ge(){const i=R(),t=te(),{currentUser:a,isValidating:se,isLoading:ie,login:P,logout:ae,error:re,updateCurrentUser:oe,getUserCookie:ne}=V(),[O,le]=u.useState(!1),[h,k]=u.useState(!1),[j,F]=u.useState({userEmail:"",password:""}),[C,U]=u.useState({userName:"",email:"",phoneNumber:""}),b=s=>x.success(s,{toastId:"success"}),G=s=>x.error(s,{toastId:"error"}),d=s=>x.warn(s,{toastId:"warn"}),v=s=>{const r=s.target.id,l=s.target.value.trim();F(f(g({},j),{[r]:l}))},z=s=>{s.preventDefault();const{userEmail:r,password:l}=j;r!==""&&l!==""?P(r,l).then(o=>{b("Logged in sucessfully"),t(L(o.full_name)),console.log("Login User Name = ",o.full_name),t(S(r)),window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify({email:r})),console.log("inside then "+JSON.stringify(o)),setTimeout(()=>{i("/dashboard")},1500)}).catch(o=>{console.log("inside catch "+JSON.stringify(o.message)),G(o.message)}):d("Please fill all the details")},p=s=>{const r=s.target.id,l=s.target.value.trim();U(f(g({},C),{[r]:l}))},B=()=>{var s="^[0-9]+$";const{userName:r,email:l,phoneNumber:o}=C;if(r!==""&&l!==""&&o!=="")if(o.length!==10)d("Phone Number must contain 10 numbers");else if(!o.match(s))d("Please enter a valid phone number");else{let y={name:"Guest",email:"guest@mail.com"};t(L(y.name)),t(S(y.email)),b("Logging in as Guest"),setTimeout(()=>{i("/dashboard")},1500)}else d("Please fill all the details")};return e.jsx(q,{title:"Login - Novel Office",description:"this is Login page",children:e.jsxs(n,{sx:{position:"relative","&:before":{content:'""',background:"radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",backgroundSize:"400% 400%",animation:"gradient 15s ease infinite",position:"absolute",height:"100%",width:"100%",opacity:"0.3"}},children:[e.jsx(I,{container:!0,spacing:0,justifyContent:"center",sx:{height:"100vh"},children:e.jsx(I,{item:!0,xs:12,sm:12,lg:5,xl:4,display:"flex",justifyContent:"center",alignItems:"center",children:e.jsxs(K,{elevation:24,sx:{p:4,zIndex:1,width:"100%",maxWidth:{xs:"350px",md:"350px",lg:"450px"}},children:[e.jsx(n,{display:"flex",alignItems:"center",justifyContent:"center",children:e.jsx(X,{})}),e.jsxs(e.Fragment,{children:[e.jsx(Y,{fontWeight:"700",variant:"h3",mb:1}),O?e.jsxs(n,{children:[e.jsxs(W,{children:[e.jsxs(n,{children:[e.jsx(m,{htmlFor:"userName",children:"Name"}),e.jsx(c,{id:"userName",variant:"outlined",fullWidth:!0,autoComplete:"userName",onChange:p})]}),e.jsxs(n,{children:[e.jsx(m,{htmlFor:"email",children:"Email"}),e.jsx(c,{id:"email",type:"email",variant:"outlined",fullWidth:!0,autoComplete:"email",onChange:p})]}),e.jsxs(n,{children:[e.jsx(m,{htmlFor:"phoneNumber",children:"Phone number"}),e.jsx(c,{id:"phoneNumber",type:"text",variant:"outlined",fullWidth:!0,autoComplete:"current-phoneNumber",onChange:p})]})]}),e.jsx(n,{mt:3,children:e.jsx(E,{color:"primary",variant:"contained",size:"large",fullWidth:!0,onClick:B,type:"submit",children:"Sign In As Guest"})})]}):e.jsxs("form",{children:[e.jsxs(W,{children:[e.jsxs(n,{children:[e.jsx(m,{htmlFor:"userEmail",children:"Email"}),e.jsx(c,{id:"userEmail",variant:"outlined",autoComplete:"userEmail",placeholder:"example@gmail.com",fullWidth:!0,onChange:v})]}),e.jsxs(n,{children:[e.jsx(m,{htmlFor:"password",children:"Password"}),e.jsx(H,{type:h?"text":"password",endAdornment:e.jsx(M,{position:"end",children:e.jsx(ee,{"aria-label":"toggle password visibility",onClick:()=>{k(!h)},edge:"end",children:h?e.jsx(Q,{size:"20"}):e.jsx($,{size:"20"})})}),id:"password",onChange:v,placeholder:"*******",fullWidth:!0})]})]}),e.jsx(n,{mt:3,children:e.jsx(E,{color:"primary",variant:"contained",size:"large",fullWidth:!0,onClick:z,type:"submit",children:"Sign In"})})]})]})]})})}),e.jsx(Z,{position:"top-center",autoClose:1e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})})}export{Ge as default};