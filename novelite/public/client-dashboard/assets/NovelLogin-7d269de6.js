var T=Object.defineProperty,B=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var w=(i,t,r)=>t in i?T(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r,g=(i,t)=>{for(var r in t||(t={}))_.call(t,r)&&w(i,r,t[r]);if(N)for(var r of N(t))J.call(t,r)&&w(i,r,t[r]);return i},f=(i,t)=>B(i,A(t));import{x as Z,z as q,r as u,j as e,A as L,a1 as I}from"./index-04377d97.js";import{P as H}from"./PageContainer-2f62e6a0.js";import{C as m}from"./CustomFormLabel-668d81fd.js";import{C as c}from"./CustomTextField-8daccf80.js";import{L as Q}from"./Logo-2c6a3f11.js";import{k as R,Q as x}from"./ReactToastify-c2ed0659.js";import{C as V,I as X}from"./CustomOutlinedInput-30166209.js";import{n as $,o as K}from"./index.esm-9d91062d.js";import{B as a}from"./Box-813d869b.js";import{G as S}from"./Grid-221a358d.js";import{C as M}from"./Card-3573abfa.js";import{T as Y}from"./Typography-bb79e852.js";import{S as E}from"./Stack-6cfaee22.js";import{b as P}from"./Button-c5e61555.js";import{I as ee}from"./IconButton-df0456a9.js";import{u as te}from"./useDispatch-b34ec476.js";import"./TextField-b030cac4.js";import"./Select-0799aaff.js";import"./ListContext-ba6ebeac.js";import"./useFormControl-d47d110e.js";import"./useControlled-532257fc.js";import"./Modal-4156c4e5.js";import"./createStack-eff5bd02.js";import"./styled-fbbe0d5e.js";function Ue(){const i=Z(),t=te(),{currentUser:r,isValidating:se,isLoading:ie,login:W,logout:re,error:oe,updateCurrentUser:ae,getUserCookie:ne}=q(),[k,le]=u.useState(!1),[h,F]=u.useState(!1),[j,O]=u.useState({userEmail:"",password:""}),[C,U]=u.useState({userName:"",email:"",phoneNumber:""}),b=s=>x.success(s,{toastId:"success"}),z=s=>x.error(s,{toastId:"error"}),d=s=>x.warn(s,{toastId:"warn"}),v=s=>{const n=s.target.id,l=s.target.value.trim();O(f(g({},j),{[n]:l}))},G=s=>{s.preventDefault();const{userEmail:n,password:l}=j;n!==""&&l!==""?W(n,l).then(o=>{b("Logged in sucessfully"),t(L(o.full_name)),console.log("Login User Name = ",o.full_name),t(I(n)),console.log("inside then "+JSON.stringify(o)),setTimeout(()=>{i("/dashboard")},1500)}).catch(o=>{console.log("inside catch "+JSON.stringify(o.message)),z(o.message)}):d("Please fill all the details")},p=s=>{const n=s.target.id,l=s.target.value.trim();U(f(g({},C),{[n]:l}))},D=()=>{var s="^[0-9]+$";const{userName:n,email:l,phoneNumber:o}=C;if(n!==""&&l!==""&&o!=="")if(o.length!==10)d("Phone Number must contain 10 numbers");else if(!o.match(s))d("Please enter a valid phone number");else{let y={name:"Guest",email:"guest@mail.com"};t(L(y.name)),t(I(y.email)),b("Logging in as Guest"),setTimeout(()=>{i("/dashboard")},1500)}else d("Please fill all the details")};return e.jsx(H,{title:"Login - Novel Office",description:"this is Login page",children:e.jsxs(a,{sx:{position:"relative","&:before":{content:'""',background:"radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",backgroundSize:"400% 400%",animation:"gradient 15s ease infinite",position:"absolute",height:"100%",width:"100%",opacity:"0.3"}},children:[e.jsx(S,{container:!0,spacing:0,justifyContent:"center",sx:{height:"100vh"},children:e.jsx(S,{item:!0,xs:12,sm:12,lg:5,xl:4,display:"flex",justifyContent:"center",alignItems:"center",children:e.jsxs(M,{elevation:24,sx:{p:4,zIndex:1,width:"100%",maxWidth:{xs:"350px",md:"350px",lg:"450px"}},children:[e.jsx(a,{display:"flex",alignItems:"center",justifyContent:"center",children:e.jsx(Q,{})}),e.jsxs(e.Fragment,{children:[e.jsx(Y,{fontWeight:"700",variant:"h3",mb:1}),k?e.jsxs(a,{children:[e.jsxs(E,{children:[e.jsxs(a,{children:[e.jsx(m,{htmlFor:"userName",children:"Name"}),e.jsx(c,{id:"userName",variant:"outlined",fullWidth:!0,autoComplete:"userName",onChange:p})]}),e.jsxs(a,{children:[e.jsx(m,{htmlFor:"email",children:"Email"}),e.jsx(c,{id:"email",type:"email",variant:"outlined",fullWidth:!0,autoComplete:"email",onChange:p})]}),e.jsxs(a,{children:[e.jsx(m,{htmlFor:"phoneNumber",children:"Phone number"}),e.jsx(c,{id:"phoneNumber",type:"text",variant:"outlined",fullWidth:!0,autoComplete:"current-phoneNumber",onChange:p})]})]}),e.jsx(a,{mt:3,children:e.jsx(P,{color:"primary",variant:"contained",size:"large",fullWidth:!0,onClick:D,type:"submit",children:"Sign In As Guest"})})]}):e.jsxs("form",{children:[e.jsxs(E,{children:[e.jsxs(a,{children:[e.jsx(m,{htmlFor:"userEmail",children:"Email"}),e.jsx(c,{id:"userEmail",variant:"outlined",autoComplete:"userEmail",placeholder:"sample@email.com",fullWidth:!0,onChange:v})]}),e.jsxs(a,{children:[e.jsx(m,{htmlFor:"password",children:"Password"}),e.jsx(V,{type:h?"text":"password",endAdornment:e.jsx(X,{position:"end",children:e.jsx(ee,{"aria-label":"toggle password visibility",onClick:()=>{F(!h)},edge:"end",children:h?e.jsx($,{size:"20"}):e.jsx(K,{size:"20"})})}),id:"password",onChange:v,placeholder:"*******",fullWidth:!0})]})]}),e.jsx(a,{mt:3,children:e.jsx(P,{color:"primary",variant:"contained",size:"large",fullWidth:!0,onClick:G,type:"submit",children:"Sign In"})})]})]})]})})}),e.jsx(R,{position:"top-center",autoClose:1e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})})}export{Ue as default};