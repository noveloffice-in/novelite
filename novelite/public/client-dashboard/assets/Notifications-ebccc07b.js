import{z as c,am as m,aK as d,aL as f,ae as u,j as t}from"./index-8bfed645.js";import{B as p}from"./Box-ad3e37bf.js";import{T as g}from"./Typography-47156341.js";import{b as _}from"./Button-93499bee.js";function y(){const i=c(e=>e.novelprofileReducer.fullName);let o=null;const{updateDoc:n,loading:r}=m(),l=()=>{localStorage.setItem("noti",0),o==null||o.forEach(e=>{n("Notifications CD",e.name,{read:"yes"})}),s()};setTimeout(()=>{s()},1e3),d("Notifications CD",e=>{console.log("Hello ")}),f("comment_added",e=>{console.log("Event = "+e)});const{data:a,error:x,isValidating:N,mutate:s}=u("Notifications CD",{fields:["name","customer_name","notification_message","send_to_all","read"],filters:[["read","=","no"],["customer_name","=",i]],orderBy:{field:"creation",order:"asc"}});return a&&(o=a),t.jsxs(p,{children:[a&&a.map(e=>t.jsx(g,{children:e.notification_message},e.notification_message)),!r&&t.jsx(_,{onClick:l,children:"Mark as read"})]})}export{y as default};