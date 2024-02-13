import{aH as J,a as Z,E as Q,r as d,j as O,aI as Oe,_ as v,u as Te}from"./index-2906e08f.js";import{_ as we,m as ye,d as ee,e as fe,n as pe,f as he,g as Re,a as ke,s as ie,c as re,b as Se}from"./Typography-209bc2bc.js";import{e as De,u as Fe,a as me}from"./Grid-3f9fb81c.js";import{o as j,a as ae,c as Ee}from"./useControlled-a976d232.js";function Ae(t){const o=t.documentElement.clientWidth;return Math.abs(window.innerWidth-o)}const xe={disabled:!1};var Be=function(o){return o.scrollTop},X="unmounted",U="exited",$="entering",G="entered",se="exiting",L=function(t){we(o,t);function o(n,r){var e;e=t.call(this,n,r)||this;var s=r,a=s&&!s.isMounting?n.enter:n.appear,l;return e.appearStatus=null,n.in?a?(l=U,e.appearStatus=$):l=G:n.unmountOnExit||n.mountOnEnter?l=X:l=U,e.state={status:l},e.nextCallback=null,e}o.getDerivedStateFromProps=function(r,e){var s=r.in;return s&&e.status===X?{status:U}:null};var i=o.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(r){var e=null;if(r!==this.props){var s=this.state.status;this.props.in?s!==$&&s!==G&&(e=$):(s===$||s===G)&&(e=se)}this.updateStatus(!1,e)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var r=this.props.timeout,e,s,a;return e=s=a=r,r!=null&&typeof r!="number"&&(e=r.exit,s=r.enter,a=r.appear!==void 0?r.appear:s),{exit:e,enter:s,appear:a}},i.updateStatus=function(r,e){if(r===void 0&&(r=!1),e!==null)if(this.cancelNextCallback(),e===$){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:J.findDOMNode(this);s&&Be(s)}this.performEnter(r)}else this.performExit();else this.props.unmountOnExit&&this.state.status===U&&this.setState({status:X})},i.performEnter=function(r){var e=this,s=this.props.enter,a=this.context?this.context.isMounting:r,l=this.props.nodeRef?[a]:[J.findDOMNode(this),a],f=l[0],p=l[1],E=this.getTimeouts(),T=a?E.appear:E.enter;if(!r&&!s||xe.disabled){this.safeSetState({status:G},function(){e.props.onEntered(f)});return}this.props.onEnter(f,p),this.safeSetState({status:$},function(){e.props.onEntering(f,p),e.onTransitionEnd(T,function(){e.safeSetState({status:G},function(){e.props.onEntered(f,p)})})})},i.performExit=function(){var r=this,e=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:J.findDOMNode(this);if(!e||xe.disabled){this.safeSetState({status:U},function(){r.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:se},function(){r.props.onExiting(a),r.onTransitionEnd(s.exit,function(){r.safeSetState({status:U},function(){r.props.onExited(a)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(r,e){e=this.setNextCallback(e),this.setState(r,e)},i.setNextCallback=function(r){var e=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,e.nextCallback=null,r(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},i.onTransitionEnd=function(r,e){this.setNextCallback(e);var s=this.props.nodeRef?this.props.nodeRef.current:J.findDOMNode(this),a=r==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=l[0],p=l[1];this.props.addEndListener(f,p)}r!=null&&setTimeout(this.nextCallback,r)},i.render=function(){var r=this.state.status;if(r===X)return null;var e=this.props,s=e.children;e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef;var a=Z(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return Q.createElement(ye.Provider,{value:null},typeof s=="function"?s(r,a):Q.cloneElement(Q.Children.only(s),a))},o}(Q.Component);L.contextType=ye;L.propTypes={};function K(){}L.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:K,onEntering:K,onEntered:K,onExit:K,onExiting:K,onExited:K};L.UNMOUNTED=X;L.EXITED=U;L.ENTERING=$;L.ENTERED=G;L.EXITING=se;const Le=L,_e=t=>t.scrollTop;function be(t,o){var i,n;const{timeout:r,easing:e,style:s={}}=t;return{duration:(i=s.transitionDuration)!=null?i:typeof r=="number"?r:r[o.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof e=="object"?e[o.mode]:e,delay:s.transitionDelay}}const Ue=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function $e(t){const o=parseInt(t.getAttribute("tabindex")||"",10);return Number.isNaN(o)?t.contentEditable==="true"||(t.nodeName==="AUDIO"||t.nodeName==="VIDEO"||t.nodeName==="DETAILS")&&t.getAttribute("tabindex")===null?0:t.tabIndex:o}function je(t){if(t.tagName!=="INPUT"||t.type!=="radio"||!t.name)return!1;const o=n=>t.ownerDocument.querySelector(`input[type="radio"]${n}`);let i=o(`[name="${t.name}"]:checked`);return i||(i=o(`[name="${t.name}"]`)),i!==t}function He(t){return!(t.disabled||t.tagName==="INPUT"&&t.type==="hidden"||je(t))}function We(t){const o=[],i=[];return Array.from(t.querySelectorAll(Ue)).forEach((n,r)=>{const e=$e(n);e===-1||!He(n)||(e===0?o.push(n):i.push({documentOrder:r,tabIndex:e,node:n}))}),i.sort((n,r)=>n.tabIndex===r.tabIndex?n.documentOrder-r.documentOrder:n.tabIndex-r.tabIndex).map(n=>n.node).concat(o)}function Ke(){return!0}function Ge(t){const{children:o,disableAutoFocus:i=!1,disableEnforceFocus:n=!1,disableRestoreFocus:r=!1,getTabbable:e=We,isEnabled:s=Ke,open:a}=t,l=d.useRef(!1),f=d.useRef(null),p=d.useRef(null),E=d.useRef(null),T=d.useRef(null),y=d.useRef(!1),u=d.useRef(null),w=ee(o.ref,u),S=d.useRef(null);d.useEffect(()=>{!a||!u.current||(y.current=!i)},[i,a]),d.useEffect(()=>{if(!a||!u.current)return;const c=j(u.current);return u.current.contains(c.activeElement)||(u.current.hasAttribute("tabIndex")||u.current.setAttribute("tabIndex","-1"),y.current&&u.current.focus()),()=>{r||(E.current&&E.current.focus&&(l.current=!0,E.current.focus()),E.current=null)}},[a]),d.useEffect(()=>{if(!a||!u.current)return;const c=j(u.current),b=R=>{S.current=R,!(n||!s()||R.key!=="Tab")&&c.activeElement===u.current&&R.shiftKey&&(l.current=!0,p.current&&p.current.focus())},g=()=>{const R=u.current;if(R===null)return;if(!c.hasFocus()||!s()||l.current){l.current=!1;return}if(R.contains(c.activeElement)||n&&c.activeElement!==f.current&&c.activeElement!==p.current)return;if(c.activeElement!==T.current)T.current=null;else if(T.current!==null)return;if(!y.current)return;let N=[];if((c.activeElement===f.current||c.activeElement===p.current)&&(N=e(u.current)),N.length>0){var A,M;const _=!!((A=S.current)!=null&&A.shiftKey&&((M=S.current)==null?void 0:M.key)==="Tab"),B=N[0],D=N[N.length-1];typeof B!="string"&&typeof D!="string"&&(_?D.focus():B.focus())}else R.focus()};c.addEventListener("focusin",g),c.addEventListener("keydown",b,!0);const k=setInterval(()=>{c.activeElement&&c.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(k),c.removeEventListener("focusin",g),c.removeEventListener("keydown",b,!0)}},[i,n,r,s,a,e]);const P=c=>{E.current===null&&(E.current=c.relatedTarget),y.current=!0,T.current=c.target;const b=o.props.onFocus;b&&b(c)},C=c=>{E.current===null&&(E.current=c.relatedTarget),y.current=!0};return O.jsxs(d.Fragment,{children:[O.jsx("div",{tabIndex:a?0:-1,onFocus:C,ref:f,"data-testid":"sentinelStart"}),d.cloneElement(o,{ref:w,onFocus:P}),O.jsx("div",{tabIndex:a?0:-1,onFocus:C,ref:p,"data-testid":"sentinelEnd"})]})}function ze(t){return typeof t=="function"?t():t}const Xe=d.forwardRef(function(o,i){const{children:n,container:r,disablePortal:e=!1}=o,[s,a]=d.useState(null),l=ee(d.isValidElement(n)?n.ref:null,i);if(fe(()=>{e||a(ze(r)||document.body)},[r,e]),fe(()=>{if(s&&!e)return pe(i,s),()=>{pe(i,null)}},[i,s,e]),e){if(d.isValidElement(n)){const f={ref:l};return d.cloneElement(n,f)}return O.jsx(d.Fragment,{children:n})}return O.jsx(d.Fragment,{children:s&&Oe.createPortal(n,s)})});function Ye(t){const o=j(t);return o.body===t?ae(t).innerWidth>o.documentElement.clientWidth:t.scrollHeight>t.clientHeight}function Y(t,o){o?t.setAttribute("aria-hidden","true"):t.removeAttribute("aria-hidden")}function ge(t){return parseInt(ae(t).getComputedStyle(t).paddingRight,10)||0}function qe(t){const i=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(t.tagName)!==-1,n=t.tagName==="INPUT"&&t.getAttribute("type")==="hidden";return i||n}function ve(t,o,i,n,r){const e=[o,i,...n];[].forEach.call(t.children,s=>{const a=e.indexOf(s)===-1,l=!qe(s);a&&l&&Y(s,r)})}function oe(t,o){let i=-1;return t.some((n,r)=>o(n)?(i=r,!0):!1),i}function Ve(t,o){const i=[],n=t.container;if(!o.disableScrollLock){if(Ye(n)){const s=Ae(j(n));i.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${ge(n)+s}px`;const a=j(n).querySelectorAll(".mui-fixed");[].forEach.call(a,l=>{i.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${ge(l)+s}px`})}let e;if(n.parentNode instanceof DocumentFragment)e=j(n).body;else{const s=n.parentElement,a=ae(n);e=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:n}i.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{i.forEach(({value:e,el:s,property:a})=>{e?s.style.setProperty(a,e):s.style.removeProperty(a)})}}function Je(t){const o=[];return[].forEach.call(t.children,i=>{i.getAttribute("aria-hidden")==="true"&&o.push(i)}),o}class Qe{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(o,i){let n=this.modals.indexOf(o);if(n!==-1)return n;n=this.modals.length,this.modals.push(o),o.modalRef&&Y(o.modalRef,!1);const r=Je(i);ve(i,o.mount,o.modalRef,r,!0);const e=oe(this.containers,s=>s.container===i);return e!==-1?(this.containers[e].modals.push(o),n):(this.containers.push({modals:[o],container:i,restore:null,hiddenSiblings:r}),n)}mount(o,i){const n=oe(this.containers,e=>e.modals.indexOf(o)!==-1),r=this.containers[n];r.restore||(r.restore=Ve(r,i))}remove(o,i=!0){const n=this.modals.indexOf(o);if(n===-1)return n;const r=oe(this.containers,s=>s.modals.indexOf(o)!==-1),e=this.containers[r];if(e.modals.splice(e.modals.indexOf(o),1),this.modals.splice(n,1),e.modals.length===0)e.restore&&e.restore(),o.modalRef&&Y(o.modalRef,i),ve(e.container,o.mount,o.modalRef,e.hiddenSiblings,!1),this.containers.splice(r,1);else{const s=e.modals[e.modals.length-1];s.modalRef&&Y(s.modalRef,!1)}return n}isTopModal(o){return this.modals.length>0&&this.modals[this.modals.length-1]===o}}function Ze(t){return typeof t=="function"?t():t}function et(t){return t?t.props.hasOwnProperty("in"):!1}const tt=new Qe;function nt(t){const{container:o,disableEscapeKeyDown:i=!1,disableScrollLock:n=!1,manager:r=tt,closeAfterTransition:e=!1,onTransitionEnter:s,onTransitionExited:a,children:l,onClose:f,open:p,rootRef:E}=t,T=d.useRef({}),y=d.useRef(null),u=d.useRef(null),w=ee(u,E),[S,P]=d.useState(!p),C=et(l);let c=!0;(t["aria-hidden"]==="false"||t["aria-hidden"]===!1)&&(c=!1);const b=()=>j(y.current),g=()=>(T.current.modalRef=u.current,T.current.mount=y.current,T.current),k=()=>{r.mount(g(),{disableScrollLock:n}),u.current&&(u.current.scrollTop=0)},R=he(()=>{const h=Ze(o)||b().body;r.add(g(),h),u.current&&k()}),N=d.useCallback(()=>r.isTopModal(g()),[r]),A=he(h=>{y.current=h,h&&(p&&N()?k():u.current&&Y(u.current,c))}),M=d.useCallback(()=>{r.remove(g(),c)},[c,r]);d.useEffect(()=>()=>{M()},[M]),d.useEffect(()=>{p?R():(!C||!e)&&M()},[p,M,C,e,R]);const _=h=>x=>{var F;(F=h.onKeyDown)==null||F.call(h,x),!(x.key!=="Escape"||x.which===229||!N())&&(i||(x.stopPropagation(),f&&f(x,"escapeKeyDown")))},B=h=>x=>{var F;(F=h.onClick)==null||F.call(h,x),x.target===x.currentTarget&&f&&f(x,"backdropClick")};return{getRootProps:(h={})=>{const x=De(t);delete x.onTransitionEnter,delete x.onTransitionExited;const F=v({},x,h);return v({role:"presentation"},F,{onKeyDown:_(F),ref:w})},getBackdropProps:(h={})=>{const x=h;return v({"aria-hidden":!0},x,{onClick:B(x),open:p})},getTransitionProps:()=>{const h=()=>{P(!1),s&&s()},x=()=>{P(!0),a&&a(),e&&M()};return{onEnter:Ee(h,l==null?void 0:l.props.onEnter),onExited:Ee(x,l==null?void 0:l.props.onExited)}},rootRef:w,portalRef:A,isTopModal:N,exited:S,hasTransition:C}}const ot=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],rt={entering:{opacity:1},entered:{opacity:1}},st=d.forwardRef(function(o,i){const n=Fe(),r={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:e,appear:s=!0,children:a,easing:l,in:f,onEnter:p,onEntered:E,onEntering:T,onExit:y,onExited:u,onExiting:w,style:S,timeout:P=r,TransitionComponent:C=Le}=o,c=Z(o,ot),b=d.useRef(null),g=ee(b,a.ref,i),k=m=>I=>{if(m){const h=b.current;I===void 0?m(h):m(h,I)}},R=k(T),N=k((m,I)=>{_e(m);const h=be({style:S,timeout:P,easing:l},{mode:"enter"});m.style.webkitTransition=n.transitions.create("opacity",h),m.style.transition=n.transitions.create("opacity",h),p&&p(m,I)}),A=k(E),M=k(w),_=k(m=>{const I=be({style:S,timeout:P,easing:l},{mode:"exit"});m.style.webkitTransition=n.transitions.create("opacity",I),m.style.transition=n.transitions.create("opacity",I),y&&y(m)}),B=k(u),D=m=>{e&&e(b.current,m)};return O.jsx(C,v({appear:s,in:f,nodeRef:b,onEnter:N,onEntered:A,onEntering:R,onExit:_,onExited:B,onExiting:M,addEndListener:D,timeout:P},c,{children:(m,I)=>d.cloneElement(a,v({style:v({opacity:0,visibility:m==="exited"&&!f?"hidden":void 0},rt[m],S,a.props.style),ref:g},I))}))}),it=st;function at(t){return Re("MuiBackdrop",t)}ke("MuiBackdrop",["root","invisible"]);const lt=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],ct=t=>{const{classes:o,invisible:i}=t;return Se({root:["root",i&&"invisible"]},at,o)},dt=ie("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:i}=t;return[o.root,i.invisible&&o.invisible]}})(({ownerState:t})=>v({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},t.invisible&&{backgroundColor:"transparent"})),ut=d.forwardRef(function(o,i){var n,r,e;const s=Te({props:o,name:"MuiBackdrop"}),{children:a,className:l,component:f="div",components:p={},componentsProps:E={},invisible:T=!1,open:y,slotProps:u={},slots:w={},TransitionComponent:S=it,transitionDuration:P}=s,C=Z(s,lt),c=v({},s,{component:f,invisible:T}),b=ct(c),g=(n=u.root)!=null?n:E.root;return O.jsx(S,v({in:y,timeout:P},C,{children:O.jsx(dt,v({"aria-hidden":!0},g,{as:(r=(e=w.root)!=null?e:p.Root)!=null?r:f,className:re(b.root,l,g==null?void 0:g.className),ownerState:v({},c,g==null?void 0:g.ownerState),classes:b,ref:i,children:a}))}))}),ft=ut;function pt(t){return Re("MuiModal",t)}ke("MuiModal",["root","hidden","backdrop"]);const ht=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],mt=t=>{const{open:o,exited:i,classes:n}=t;return Se({root:["root",!o&&i&&"hidden"],backdrop:["backdrop"]},pt,n)},Et=ie("div",{name:"MuiModal",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:i}=t;return[o.root,!i.open&&i.exited&&o.hidden]}})(({theme:t,ownerState:o})=>v({position:"fixed",zIndex:(t.vars||t).zIndex.modal,right:0,bottom:0,top:0,left:0},!o.open&&o.exited&&{visibility:"hidden"})),xt=ie(ft,{name:"MuiModal",slot:"Backdrop",overridesResolver:(t,o)=>o.backdrop})({zIndex:-1}),bt=d.forwardRef(function(o,i){var n,r,e,s,a,l;const f=Te({name:"MuiModal",props:o}),{BackdropComponent:p=xt,BackdropProps:E,className:T,closeAfterTransition:y=!1,children:u,container:w,component:S,components:P={},componentsProps:C={},disableAutoFocus:c=!1,disableEnforceFocus:b=!1,disableEscapeKeyDown:g=!1,disablePortal:k=!1,disableRestoreFocus:R=!1,disableScrollLock:N=!1,hideBackdrop:A=!1,keepMounted:M=!1,onBackdropClick:_,open:B,slotProps:D,slots:m}=f,I=Z(f,ht),h=v({},f,{closeAfterTransition:y,disableAutoFocus:c,disableEnforceFocus:b,disableEscapeKeyDown:g,disablePortal:k,disableRestoreFocus:R,disableScrollLock:N,hideBackdrop:A,keepMounted:M}),{getRootProps:x,getBackdropProps:F,getTransitionProps:Pe,portalRef:Ce,isTopModal:Ne,exited:le,hasTransition:ce}=nt(v({},h,{rootRef:i})),z=v({},h,{exited:le}),H=mt(z),q={};if(u.props.tabIndex===void 0&&(q.tabIndex="-1"),ce){const{onEnter:W,onExited:V}=Pe();q.onEnter=W,q.onExited=V}const de=(n=(r=m==null?void 0:m.root)!=null?r:P.Root)!=null?n:Et,ue=(e=(s=m==null?void 0:m.backdrop)!=null?s:P.Backdrop)!=null?e:p,te=(a=D==null?void 0:D.root)!=null?a:C.root,ne=(l=D==null?void 0:D.backdrop)!=null?l:C.backdrop,Me=me({elementType:de,externalSlotProps:te,externalForwardedProps:I,getSlotProps:x,additionalProps:{ref:i,as:S},ownerState:z,className:re(T,te==null?void 0:te.className,H==null?void 0:H.root,!z.open&&z.exited&&(H==null?void 0:H.hidden))}),Ie=me({elementType:ue,externalSlotProps:ne,additionalProps:E,getSlotProps:W=>F(v({},W,{onClick:V=>{_&&_(V),W!=null&&W.onClick&&W.onClick(V)}})),className:re(ne==null?void 0:ne.className,E==null?void 0:E.className,H==null?void 0:H.backdrop),ownerState:z});return!M&&!B&&(!ce||le)?null:O.jsx(Xe,{ref:Ce,container:w,disablePortal:k,children:O.jsxs(de,v({},Me,{children:[!A&&p?O.jsx(ue,v({},Ie)):null,O.jsx(Ge,{disableEnforceFocus:b,disableAutoFocus:c,disableRestoreFocus:R,isEnabled:Ne,open:B,children:d.cloneElement(u,q)})]}))})}),Rt=bt;export{ft as B,it as F,Rt as M,Xe as P,Le as T,Ae as a,be as g,_e as r};
