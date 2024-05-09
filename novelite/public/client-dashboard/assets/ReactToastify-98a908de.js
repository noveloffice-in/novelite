var ye=Object.defineProperty,ve=Object.defineProperties;var Te=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var re=(e,t,o)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,f=(e,t)=>{for(var o in t||(t={}))ie.call(t,o)&&re(e,o,t[o]);if(X)for(var o of X(t))le.call(t,o)&&re(e,o,t[o]);return e},M=(e,t)=>ve(e,Te(t));var ne=(e,t)=>{var o={};for(var s in e)ie.call(e,s)&&t.indexOf(s)<0&&(o[s]=e[s]);if(e!=null&&X)for(var s of X(e))t.indexOf(s)<0&&le.call(e,s)&&(o[s]=e[s]);return o};import{r as p,R as v}from"./index-8b3b8eba.js";function fe(e){var t,o,s="";if(typeof e=="string"||typeof e=="number")s+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(o=fe(e[t]))&&(s&&(s+=" "),s+=o);else for(t in e)e[t]&&(s&&(s+=" "),s+=t);return s}function D(){for(var e,t,o=0,s="";o<arguments.length;)(e=arguments[o++])&&(t=fe(e))&&(s&&(s+=" "),s+=t);return s}const U=e=>typeof e=="number"&&!isNaN(e),H=e=>typeof e=="string",N=e=>typeof e=="function",J=e=>H(e)||N(e)?e:null,oe=e=>p.isValidElement(e)||H(e)||N(e)||U(e);function Ee(e,t,o){o===void 0&&(o=300);const{scrollHeight:s,style:u}=e;requestAnimationFrame(()=>{u.minHeight="initial",u.height=s+"px",u.transition=`all ${o}ms`,requestAnimationFrame(()=>{u.height="0",u.padding="0",u.margin="0",setTimeout(t,o)})})}function ee(e){let{enter:t,exit:o,appendPosition:s=!1,collapse:u=!0,collapseDuration:l=300}=e;return function(n){let{children:a,position:I,preventExitTransition:C,done:T,nodeRef:h,isIn:_}=n;const i=s?`${t}--${I}`:t,d=s?`${o}--${I}`:o,m=p.useRef(0);return p.useLayoutEffect(()=>{const r=h.current,c=i.split(" "),b=O=>{O.target===h.current&&(r.dispatchEvent(new Event("d")),r.removeEventListener("animationend",b),r.removeEventListener("animationcancel",b),m.current===0&&O.type!=="animationcancel"&&r.classList.remove(...c))};r.classList.add(...c),r.addEventListener("animationend",b),r.addEventListener("animationcancel",b)},[]),p.useEffect(()=>{const r=h.current,c=()=>{r.removeEventListener("animationend",c),u?Ee(r,T,l):T()};_||(C?c():(m.current=1,r.className+=` ${d}`,r.addEventListener("animationend",c)))},[_]),v.createElement(v.Fragment,null,a)}}function ce(e,t){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const x={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const o=this.list.get(e).filter(s=>s!==t);return this.list.set(e,o),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const o=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(o)})}},Y=e=>{let u=e,{theme:t,type:o}=u,s=ne(u,["theme","type"]);return v.createElement("svg",f({viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${o})`},s))},se={info:function(e){return v.createElement(Y,f({},e),v.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return v.createElement(Y,f({},e),v.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return v.createElement(Y,f({},e),v.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return v.createElement(Y,f({},e),v.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return v.createElement("div",{className:"Toastify__spinner"})}};function Ce(e){const[,t]=p.useReducer(i=>i+1,0),[o,s]=p.useState([]),u=p.useRef(null),l=p.useRef(new Map).current,n=i=>o.indexOf(i)!==-1,a=p.useRef({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:n,getToast:i=>l.get(i)}).current;function I(i){let{containerId:d}=i;const{limit:m}=a.props;!m||d&&a.containerId!==d||(a.count-=a.queue.length,a.queue=[])}function C(i){s(d=>i==null?[]:d.filter(m=>m!==i))}function T(){const{toastContent:i,toastProps:d,staleId:m}=a.queue.shift();_(i,d,m)}function h(i,d){let j=d,{delay:m,staleId:r}=j,c=ne(j,["delay","staleId"]);if(!oe(i)||function(k){return!u.current||a.props.enableMultiContainer&&k.containerId!==a.props.containerId||l.has(k.toastId)&&k.updateId==null}(c))return;const{toastId:b,updateId:O,data:g}=c,{props:y}=a,B=()=>C(b),A=O==null;A&&a.count++;const L=M(f(M(f({},y),{style:y.toastStyle,key:a.toastKey++}),Object.fromEntries(Object.entries(c).filter(k=>{let[P,w]=k;return w!=null}))),{toastId:b,updateId:O,data:g,closeToast:B,isIn:!1,className:J(c.className||y.toastClassName),bodyClassName:J(c.bodyClassName||y.bodyClassName),progressClassName:J(c.progressClassName||y.progressClassName),autoClose:!c.isLoading&&(z=c.autoClose,q=y.autoClose,z===!1||U(z)&&z>0?z:q),deleteToast(){const k=ce(l.get(b),"removed");l.delete(b),x.emit(4,k);const P=a.queue.length;if(a.count=b==null?a.count-a.displayedToast:a.count-1,a.count<0&&(a.count=0),P>0){const w=b==null?a.props.limit:1;if(P===1||w===1)a.displayedToast++,T();else{const Q=w>P?P:w;a.displayedToast=Q;for(let R=0;R<Q;R++)T()}}else t()}});var z,q;L.iconOut=function(k){let{theme:P,type:w,isLoading:Q,icon:R}=k,$=null;const V={theme:P,type:w};return R===!1||(N(R)?$=R(V):p.isValidElement(R)?$=p.cloneElement(R,V):H(R)||U(R)?$=R:Q?$=se.spinner():(he=>he in se)(w)&&($=se[w](V))),$}(L),N(c.onOpen)&&(L.onOpen=c.onOpen),N(c.onClose)&&(L.onClose=c.onClose),L.closeButton=y.closeButton,c.closeButton===!1||oe(c.closeButton)?L.closeButton=c.closeButton:c.closeButton===!0&&(L.closeButton=!oe(y.closeButton)||y.closeButton);let F=i;p.isValidElement(i)&&!H(i.type)?F=p.cloneElement(i,{closeToast:B,toastProps:L,data:g}):N(i)&&(F=i({closeToast:B,toastProps:L,data:g})),y.limit&&y.limit>0&&a.count>y.limit&&A?a.queue.push({toastContent:F,toastProps:L,staleId:r}):U(m)?setTimeout(()=>{_(F,L,r)},m):_(F,L,r)}function _(i,d,m){const{toastId:r}=d;m&&l.delete(m);const c={content:i,props:d};l.set(r,c),s(b=>[...b,r].filter(O=>O!==m)),x.emit(4,ce(c,c.props.updateId==null?"added":"updated"))}return p.useEffect(()=>(a.containerId=e.containerId,x.cancelEmit(3).on(0,h).on(1,i=>u.current&&C(i)).on(5,I).emit(2,a),()=>{l.clear(),x.emit(3,a)}),[]),p.useEffect(()=>{a.props=e,a.isToastActive=n,a.displayedToast=o.length}),{getToastToRender:function(i){const d=new Map,m=Array.from(l.values());return e.newestOnTop&&m.reverse(),m.forEach(r=>{const{position:c}=r.props;d.has(c)||d.set(c,[]),d.get(c).push(r)}),Array.from(d,r=>i(r[0],r[1]))},containerRef:u,isToastActive:n}}function ue(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function de(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function be(e){const[t,o]=p.useState(!1),[s,u]=p.useState(!1),l=p.useRef(null),n=p.useRef({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,a=p.useRef(e),{autoClose:I,pauseOnHover:C,closeToast:T,onClick:h,closeOnClick:_}=e;function i(g){if(e.draggable){g.nativeEvent.type==="touchstart"&&g.nativeEvent.preventDefault(),n.didMove=!1,document.addEventListener("mousemove",c),document.addEventListener("mouseup",b),document.addEventListener("touchmove",c),document.addEventListener("touchend",b);const y=l.current;n.canCloseOnClick=!0,n.canDrag=!0,n.boundingRect=y.getBoundingClientRect(),y.style.transition="",n.x=ue(g.nativeEvent),n.y=de(g.nativeEvent),e.draggableDirection==="x"?(n.start=n.x,n.removalDistance=y.offsetWidth*(e.draggablePercent/100)):(n.start=n.y,n.removalDistance=y.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent/100))}}function d(g){if(n.boundingRect){const{top:y,bottom:B,left:A,right:L}=n.boundingRect;g.nativeEvent.type!=="touchend"&&e.pauseOnHover&&n.x>=A&&n.x<=L&&n.y>=y&&n.y<=B?r():m()}}function m(){o(!0)}function r(){o(!1)}function c(g){const y=l.current;n.canDrag&&y&&(n.didMove=!0,t&&r(),n.x=ue(g),n.y=de(g),n.delta=e.draggableDirection==="x"?n.x-n.start:n.y-n.start,n.start!==n.x&&(n.canCloseOnClick=!1),y.style.transform=`translate${e.draggableDirection}(${n.delta}px)`,y.style.opacity=""+(1-Math.abs(n.delta/n.removalDistance)))}function b(){document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",b),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",b);const g=l.current;if(n.canDrag&&n.didMove&&g){if(n.canDrag=!1,Math.abs(n.delta)>n.removalDistance)return u(!0),void e.closeToast();g.style.transition="transform 0.2s, opacity 0.2s",g.style.transform=`translate${e.draggableDirection}(0)`,g.style.opacity="1"}}p.useEffect(()=>{a.current=e}),p.useEffect(()=>(l.current&&l.current.addEventListener("d",m,{once:!0}),N(e.onOpen)&&e.onOpen(p.isValidElement(e.children)&&e.children.props),()=>{const g=a.current;N(g.onClose)&&g.onClose(p.isValidElement(g.children)&&g.children.props)}),[]),p.useEffect(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||r(),window.addEventListener("focus",m),window.addEventListener("blur",r)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",m),window.removeEventListener("blur",r))}),[e.pauseOnFocusLoss]);const O={onMouseDown:i,onTouchStart:i,onMouseUp:d,onTouchEnd:d};return I&&C&&(O.onMouseEnter=r,O.onMouseLeave=m),_&&(O.onClick=g=>{h&&h(g),n.canCloseOnClick&&T()}),{playToast:m,pauseToast:r,isRunning:t,preventExitTransition:s,toastRef:l,eventHandlers:O}}function pe(e){let{closeToast:t,theme:o,ariaLabel:s="close"}=e;return v.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:u=>{u.stopPropagation(),t(u)},"aria-label":s},v.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},v.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Ie(e){let{delay:t,isRunning:o,closeToast:s,type:u="default",hide:l,className:n,style:a,controlledProgress:I,progress:C,rtl:T,isIn:h,theme:_}=e;const i=l||I&&C===0,d=M(f({},a),{animationDuration:`${t}ms`,animationPlayState:o?"running":"paused",opacity:i?0:1});I&&(d.transform=`scaleX(${C})`);const m=D("Toastify__progress-bar",I?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${_}`,`Toastify__progress-bar--${u}`,{"Toastify__progress-bar--rtl":T}),r=N(n)?n({rtl:T,type:u,defaultClassName:m}):D(m,n);return v.createElement("div",{role:"progressbar","aria-hidden":i?"true":"false","aria-label":"notification timer",className:r,style:d,[I&&C>=1?"onTransitionEnd":"onAnimationEnd"]:I&&C<1?null:()=>{h&&s()}})}const _e=e=>{const{isRunning:t,preventExitTransition:o,toastRef:s,eventHandlers:u}=be(e),{closeButton:l,children:n,autoClose:a,onClick:I,type:C,hideProgressBar:T,closeToast:h,transition:_,position:i,className:d,style:m,bodyClassName:r,bodyStyle:c,progressClassName:b,progressStyle:O,updateId:g,role:y,progress:B,rtl:A,toastId:L,deleteToast:z,isIn:q,isLoading:F,iconOut:j,closeOnClick:k,theme:P}=e,w=D("Toastify__toast",`Toastify__toast-theme--${P}`,`Toastify__toast--${C}`,{"Toastify__toast--rtl":A},{"Toastify__toast--close-on-click":k}),Q=N(d)?d({rtl:A,position:i,type:C,defaultClassName:w}):D(w,d),R=!!B||!a,$={closeToast:h,type:C,theme:P};let V=null;return l===!1||(V=N(l)?l($):p.isValidElement(l)?p.cloneElement(l,$):pe($)),v.createElement(_,{isIn:q,done:z,position:i,preventExitTransition:o,nodeRef:s},v.createElement("div",M(f({id:L,onClick:I,className:Q},u),{style:m,ref:s}),v.createElement("div",M(f({},q&&{role:y}),{className:N(r)?r({type:C}):D("Toastify__toast-body",r),style:c}),j!=null&&v.createElement("div",{className:D("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!F})},j),v.createElement("div",null,n)),V,v.createElement(Ie,M(f({},g&&!R?{key:`pb-${g}`}:{}),{rtl:A,theme:P,delay:a,isRunning:t,isIn:q,closeToast:h,hide:T,type:C,style:O,className:b,controlledProgress:R,progress:B||0}))))},te=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},Le=ee(te("bounce",!0));ee(te("slide",!0));ee(te("zoom"));ee(te("flip"));const me=p.forwardRef((e,t)=>{const{getToastToRender:o,containerRef:s,isToastActive:u}=Ce(e),{className:l,style:n,rtl:a,containerId:I}=e;function C(T){const h=D("Toastify__toast-container",`Toastify__toast-container--${T}`,{"Toastify__toast-container--rtl":a});return N(l)?l({position:T,rtl:a,defaultClassName:h}):D(h,J(l))}return p.useEffect(()=>{t&&(t.current=s.current)},[]),v.createElement("div",{ref:s,className:"Toastify",id:I},o((T,h)=>{const _=h.length?f({},n):M(f({},n),{pointerEvents:"none"});return v.createElement("div",{className:C(T),style:_,key:`container-${T}`},h.map((i,d)=>{let{content:m,props:r}=i;return v.createElement(_e,M(f({},r),{isIn:u(r.toastId),style:M(f({},r.style),{"--nth":d+1,"--len":h.length}),key:`toast-${r.key}`}),m)}))}))});me.displayName="ToastContainer",me.defaultProps={position:"top-right",transition:Le,autoClose:5e3,closeButton:pe,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let ae,S=new Map,G=[],Oe=1;function ge(){return""+Oe++}function Re(e){return e&&(H(e.toastId)||U(e.toastId))?e.toastId:ge()}function W(e,t){return S.size>0?x.emit(0,e,t):G.push({content:e,options:t}),t.toastId}function Z(e,t){return M(f({},t),{type:t&&t.type||e,toastId:Re(t)})}function K(e){return(t,o)=>W(t,Z(e,o))}function E(e,t){return W(e,Z("default",t))}E.loading=(e,t)=>W(e,Z("default",f({isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1},t))),E.promise=function(e,t,o){let s,{pending:u,error:l,success:n}=t;u&&(s=H(u)?E.loading(u,o):E.loading(u.render,f(f({},o),u)));const a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},I=(T,h,_)=>{if(h==null)return void E.dismiss(s);const i=M(f(f({type:T},a),o),{data:_}),d=H(h)?{render:h}:h;return s?E.update(s,f(f({},i),d)):E(d.render,f(f({},i),d)),_},C=N(e)?e():e;return C.then(T=>I("success",n,T)).catch(T=>I("error",l,T)),C},E.success=K("success"),E.info=K("info"),E.error=K("error"),E.warning=K("warning"),E.warn=E.warning,E.dark=(e,t)=>W(e,Z("default",f({theme:"dark"},t))),E.dismiss=e=>{S.size>0?x.emit(1,e):G=G.filter(t=>e!=null&&t.options.toastId!==e)},E.clearWaitingQueue=function(e){return e===void 0&&(e={}),x.emit(5,e)},E.isActive=e=>{let t=!1;return S.forEach(o=>{o.isToastActive&&o.isToastActive(e)&&(t=!0)}),t},E.update=function(e,t){t===void 0&&(t={}),setTimeout(()=>{const o=function(s,u){let{containerId:l}=u;const n=S.get(l||ae);return n&&n.getToast(s)}(e,t);if(o){const{props:s,content:u}=o,l=M(f(f({delay:100},s),t),{toastId:t.toastId||e,updateId:ge()});l.toastId!==e&&(l.staleId=e);const n=l.render||u;delete l.render,W(n,l)}},0)},E.done=e=>{E.update(e,{progress:1})},E.onChange=e=>(x.on(4,e),()=>{x.off(4,e)}),E.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},E.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},x.on(2,e=>{ae=e.containerId||e,S.set(ae,e),G.forEach(t=>{x.emit(0,t.content,t.options)}),G=[]}).on(3,e=>{S.delete(e.containerId||e),S.size===0&&x.off(0).off(1).off(5)});export{E as Q,D as c,me as k};
