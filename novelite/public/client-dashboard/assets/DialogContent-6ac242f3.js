import{r as W,A as ve,j as V,_ as j,u as Se,c as te}from"./index-5a3f6a76.js";import{t as St,f as tt,u as rt,b as Te,v as Tt,s as ie,g as Be,a as Le,d as Oe}from"./Typography-36c6dc69.js";import{a as ot}from"./ownerWindow-46c4bc4a.js";import{P as Bt,B as Lt,M as Nt,F as Ht}from"./Modal-4ae20275.js";import{u as Ft}from"./useSlotProps-52eb16c2.js";import{u as Ut}from"./Grid-40636f23.js";import{M as dt}from"./Paper-73496770.js";import{a as Vt}from"./useControlled-ede9ea79.js";const It={disableDefaultClasses:!1},qt=W.createContext(It);function Xt(e){const{disableDefaultClasses:t}=W.useContext(qt);return r=>t?"":e(r)}const vt="base";function Yt(e){return`${vt}--${e}`}function _t(e,t){return`${vt}-${e}-${t}`}function mt(e,t){const r=St[t];return r?Yt(r):_t(e,t)}function zt(e,t){const r={};return t.forEach(o=>{r[o]=mt(e,o)}),r}var S="top",H="bottom",F="right",T="left",Ne="auto",me=[S,H,F,T],re="start",ue="end",Kt="clippingParents",ht="viewport",pe="popper",Gt="reference",nt=me.reduce(function(e,t){return e.concat([t+"-"+re,t+"-"+ue])},[]),gt=[].concat(me,[Ne]).reduce(function(e,t){return e.concat([t,t+"-"+re,t+"-"+ue])},[]),Jt="beforeRead",Qt="read",Zt="afterRead",er="beforeMain",tr="main",rr="afterMain",or="beforeWrite",nr="write",ar="afterWrite",ir=[Jt,Qt,Zt,er,tr,rr,or,nr,ar];function q(e){return e?(e.nodeName||"").toLowerCase():null}function L(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Z(e){var t=L(e).Element;return e instanceof t||e instanceof Element}function N(e){var t=L(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function He(e){if(typeof ShadowRoot=="undefined")return!1;var t=L(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function sr(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var o=t.styles[r]||{},n=t.attributes[r]||{},a=t.elements[r];!N(a)||!q(a)||(Object.assign(a.style,o),Object.keys(n).forEach(function(l){var s=n[l];s===!1?a.removeAttribute(l):a.setAttribute(l,s===!0?"":s)}))})}function lr(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(o){var n=t.elements[o],a=t.attributes[o]||{},l=Object.keys(t.styles.hasOwnProperty(o)?t.styles[o]:r[o]),s=l.reduce(function(i,c){return i[c]="",i},{});!N(n)||!q(n)||(Object.assign(n.style,s),Object.keys(a).forEach(function(i){n.removeAttribute(i)}))})}}const pr={name:"applyStyles",enabled:!0,phase:"write",fn:sr,effect:lr,requires:["computeStyles"]};function I(e){return e.split("-")[0]}var Q=Math.max,Ce=Math.min,oe=Math.round;function We(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function yt(){return!/^((?!chrome|android).)*safari/i.test(We())}function ne(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var o=e.getBoundingClientRect(),n=1,a=1;t&&N(e)&&(n=e.offsetWidth>0&&oe(o.width)/e.offsetWidth||1,a=e.offsetHeight>0&&oe(o.height)/e.offsetHeight||1);var l=Z(e)?L(e):window,s=l.visualViewport,i=!yt()&&r,c=(o.left+(i&&s?s.offsetLeft:0))/n,p=(o.top+(i&&s?s.offsetTop:0))/a,v=o.width/n,y=o.height/a;return{width:v,height:y,top:p,right:c+v,bottom:p+y,left:c,x:c,y:p}}function Fe(e){var t=ne(e),r=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:o}}function bt(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&He(r)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function X(e){return L(e).getComputedStyle(e)}function cr(e){return["table","td","th"].indexOf(q(e))>=0}function z(e){return((Z(e)?e.ownerDocument:e.document)||window.document).documentElement}function De(e){return q(e)==="html"?e:e.assignedSlot||e.parentNode||(He(e)?e.host:null)||z(e)}function at(e){return!N(e)||X(e).position==="fixed"?null:e.offsetParent}function fr(e){var t=/firefox/i.test(We()),r=/Trident/i.test(We());if(r&&N(e)){var o=X(e);if(o.position==="fixed")return null}var n=De(e);for(He(n)&&(n=n.host);N(n)&&["html","body"].indexOf(q(n))<0;){var a=X(n);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return n;n=n.parentNode}return null}function he(e){for(var t=L(e),r=at(e);r&&cr(r)&&X(r).position==="static";)r=at(r);return r&&(q(r)==="html"||q(r)==="body"&&X(r).position==="static")?t:r||fr(e)||t}function Ue(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ce(e,t,r){return Q(e,Ce(t,r))}function ur(e,t,r){var o=ce(e,t,r);return o>r?r:o}function xt(){return{top:0,right:0,bottom:0,left:0}}function wt(e){return Object.assign({},xt(),e)}function Ot(e,t){return t.reduce(function(r,o){return r[o]=e,r},{})}var dr=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,wt(typeof t!="number"?t:Ot(t,me))};function vr(e){var t,r=e.state,o=e.name,n=e.options,a=r.elements.arrow,l=r.modifiersData.popperOffsets,s=I(r.placement),i=Ue(s),c=[T,F].indexOf(s)>=0,p=c?"height":"width";if(!(!a||!l)){var v=dr(n.padding,r),y=Fe(a),u=i==="y"?S:T,O=i==="y"?H:F,d=r.rects.reference[p]+r.rects.reference[i]-l[i]-r.rects.popper[p],m=l[i]-r.rects.reference[i],b=he(a),P=b?i==="y"?b.clientHeight||0:b.clientWidth||0:0,x=d/2-m/2,f=v[u],h=P-y[p]-v[O],g=P/2-y[p]/2+x,w=ce(f,g,h),E=i;r.modifiersData[o]=(t={},t[E]=w,t.centerOffset=w-g,t)}}function mr(e){var t=e.state,r=e.options,o=r.element,n=o===void 0?"[data-popper-arrow]":o;n!=null&&(typeof n=="string"&&(n=t.elements.popper.querySelector(n),!n)||bt(t.elements.popper,n)&&(t.elements.arrow=n))}const hr={name:"arrow",enabled:!0,phase:"main",fn:vr,effect:mr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ae(e){return e.split("-")[1]}var gr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function yr(e,t){var r=e.x,o=e.y,n=t.devicePixelRatio||1;return{x:oe(r*n)/n||0,y:oe(o*n)/n||0}}function it(e){var t,r=e.popper,o=e.popperRect,n=e.placement,a=e.variation,l=e.offsets,s=e.position,i=e.gpuAcceleration,c=e.adaptive,p=e.roundOffsets,v=e.isFixed,y=l.x,u=y===void 0?0:y,O=l.y,d=O===void 0?0:O,m=typeof p=="function"?p({x:u,y:d}):{x:u,y:d};u=m.x,d=m.y;var b=l.hasOwnProperty("x"),P=l.hasOwnProperty("y"),x=T,f=S,h=window;if(c){var g=he(r),w="clientHeight",E="clientWidth";if(g===L(r)&&(g=z(r),X(g).position!=="static"&&s==="absolute"&&(w="scrollHeight",E="scrollWidth")),g=g,n===S||(n===T||n===F)&&a===ue){f=H;var D=v&&g===h&&h.visualViewport?h.visualViewport.height:g[w];d-=D-o.height,d*=i?1:-1}if(n===T||(n===S||n===H)&&a===ue){x=F;var C=v&&g===h&&h.visualViewport?h.visualViewport.width:g[E];u-=C-o.width,u*=i?1:-1}}var R=Object.assign({position:s},c&&gr),M=p===!0?yr({x:u,y:d},L(r)):{x:u,y:d};if(u=M.x,d=M.y,i){var k;return Object.assign({},R,(k={},k[f]=P?"0":"",k[x]=b?"0":"",k.transform=(h.devicePixelRatio||1)<=1?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",k))}return Object.assign({},R,(t={},t[f]=P?d+"px":"",t[x]=b?u+"px":"",t.transform="",t))}function br(e){var t=e.state,r=e.options,o=r.gpuAcceleration,n=o===void 0?!0:o,a=r.adaptive,l=a===void 0?!0:a,s=r.roundOffsets,i=s===void 0?!0:s,c={placement:I(t.placement),variation:ae(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,it(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:l,roundOffsets:i})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,it(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const xr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:br,data:{}};var we={passive:!0};function wr(e){var t=e.state,r=e.instance,o=e.options,n=o.scroll,a=n===void 0?!0:n,l=o.resize,s=l===void 0?!0:l,i=L(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&c.forEach(function(p){p.addEventListener("scroll",r.update,we)}),s&&i.addEventListener("resize",r.update,we),function(){a&&c.forEach(function(p){p.removeEventListener("scroll",r.update,we)}),s&&i.removeEventListener("resize",r.update,we)}}const Or={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:wr,data:{}};var Pr={left:"right",right:"left",bottom:"top",top:"bottom"};function Pe(e){return e.replace(/left|right|bottom|top/g,function(t){return Pr[t]})}var Cr={start:"end",end:"start"};function st(e){return e.replace(/start|end/g,function(t){return Cr[t]})}function Ve(e){var t=L(e),r=t.pageXOffset,o=t.pageYOffset;return{scrollLeft:r,scrollTop:o}}function Ie(e){return ne(z(e)).left+Ve(e).scrollLeft}function Dr(e,t){var r=L(e),o=z(e),n=r.visualViewport,a=o.clientWidth,l=o.clientHeight,s=0,i=0;if(n){a=n.width,l=n.height;var c=yt();(c||!c&&t==="fixed")&&(s=n.offsetLeft,i=n.offsetTop)}return{width:a,height:l,x:s+Ie(e),y:i}}function Er(e){var t,r=z(e),o=Ve(e),n=(t=e.ownerDocument)==null?void 0:t.body,a=Q(r.scrollWidth,r.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),l=Q(r.scrollHeight,r.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),s=-o.scrollLeft+Ie(e),i=-o.scrollTop;return X(n||r).direction==="rtl"&&(s+=Q(r.clientWidth,n?n.clientWidth:0)-a),{width:a,height:l,x:s,y:i}}function qe(e){var t=X(e),r=t.overflow,o=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+n+o)}function Pt(e){return["html","body","#document"].indexOf(q(e))>=0?e.ownerDocument.body:N(e)&&qe(e)?e:Pt(De(e))}function fe(e,t){var r;t===void 0&&(t=[]);var o=Pt(e),n=o===((r=e.ownerDocument)==null?void 0:r.body),a=L(o),l=n?[a].concat(a.visualViewport||[],qe(o)?o:[]):o,s=t.concat(l);return n?s:s.concat(fe(De(l)))}function Me(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Rr(e,t){var r=ne(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function lt(e,t,r){return t===ht?Me(Dr(e,r)):Z(t)?Rr(t,r):Me(Er(z(e)))}function $r(e){var t=fe(De(e)),r=["absolute","fixed"].indexOf(X(e).position)>=0,o=r&&N(e)?he(e):e;return Z(o)?t.filter(function(n){return Z(n)&&bt(n,o)&&q(n)!=="body"}):[]}function kr(e,t,r,o){var n=t==="clippingParents"?$r(e):[].concat(t),a=[].concat(n,[r]),l=a[0],s=a.reduce(function(i,c){var p=lt(e,c,o);return i.top=Q(p.top,i.top),i.right=Ce(p.right,i.right),i.bottom=Ce(p.bottom,i.bottom),i.left=Q(p.left,i.left),i},lt(e,l,o));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Ct(e){var t=e.reference,r=e.element,o=e.placement,n=o?I(o):null,a=o?ae(o):null,l=t.x+t.width/2-r.width/2,s=t.y+t.height/2-r.height/2,i;switch(n){case S:i={x:l,y:t.y-r.height};break;case H:i={x:l,y:t.y+t.height};break;case F:i={x:t.x+t.width,y:s};break;case T:i={x:t.x-r.width,y:s};break;default:i={x:t.x,y:t.y}}var c=n?Ue(n):null;if(c!=null){var p=c==="y"?"height":"width";switch(a){case re:i[c]=i[c]-(t[p]/2-r[p]/2);break;case ue:i[c]=i[c]+(t[p]/2-r[p]/2);break}}return i}function de(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=o===void 0?e.placement:o,a=r.strategy,l=a===void 0?e.strategy:a,s=r.boundary,i=s===void 0?Kt:s,c=r.rootBoundary,p=c===void 0?ht:c,v=r.elementContext,y=v===void 0?pe:v,u=r.altBoundary,O=u===void 0?!1:u,d=r.padding,m=d===void 0?0:d,b=wt(typeof m!="number"?m:Ot(m,me)),P=y===pe?Gt:pe,x=e.rects.popper,f=e.elements[O?P:y],h=kr(Z(f)?f:f.contextElement||z(e.elements.popper),i,p,l),g=ne(e.elements.reference),w=Ct({reference:g,element:x,strategy:"absolute",placement:n}),E=Me(Object.assign({},x,w)),D=y===pe?E:g,C={top:h.top-D.top+b.top,bottom:D.bottom-h.bottom+b.bottom,left:h.left-D.left+b.left,right:D.right-h.right+b.right},R=e.modifiersData.offset;if(y===pe&&R){var M=R[n];Object.keys(C).forEach(function(k){var U=[F,H].indexOf(k)>=0?1:-1,B=[S,H].indexOf(k)>=0?"y":"x";C[k]+=M[B]*U})}return C}function Ar(e,t){t===void 0&&(t={});var r=t,o=r.placement,n=r.boundary,a=r.rootBoundary,l=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,c=i===void 0?gt:i,p=ae(o),v=p?s?nt:nt.filter(function(O){return ae(O)===p}):me,y=v.filter(function(O){return c.indexOf(O)>=0});y.length===0&&(y=v);var u=y.reduce(function(O,d){return O[d]=de(e,{placement:d,boundary:n,rootBoundary:a,padding:l})[I(d)],O},{});return Object.keys(u).sort(function(O,d){return u[O]-u[d]})}function Wr(e){if(I(e)===Ne)return[];var t=Pe(e);return[st(e),t,st(t)]}function Mr(e){var t=e.state,r=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var n=r.mainAxis,a=n===void 0?!0:n,l=r.altAxis,s=l===void 0?!0:l,i=r.fallbackPlacements,c=r.padding,p=r.boundary,v=r.rootBoundary,y=r.altBoundary,u=r.flipVariations,O=u===void 0?!0:u,d=r.allowedAutoPlacements,m=t.options.placement,b=I(m),P=b===m,x=i||(P||!O?[Pe(m)]:Wr(m)),f=[m].concat(x).reduce(function(ee,_){return ee.concat(I(_)===Ne?Ar(t,{placement:_,boundary:p,rootBoundary:v,padding:c,flipVariations:O,allowedAutoPlacements:d}):_)},[]),h=t.rects.reference,g=t.rects.popper,w=new Map,E=!0,D=f[0],C=0;C<f.length;C++){var R=f[C],M=I(R),k=ae(R)===re,U=[S,H].indexOf(M)>=0,B=U?"width":"height",$=de(t,{placement:R,boundary:p,rootBoundary:v,altBoundary:y,padding:c}),A=U?k?F:T:k?H:S;h[B]>g[B]&&(A=Pe(A));var Y=Pe(A),K=[];if(a&&K.push($[M]<=0),s&&K.push($[A]<=0,$[Y]<=0),K.every(function(ee){return ee})){D=R,E=!1;break}w.set(R,K)}if(E)for(var ge=O?3:1,Ee=function(_){var le=f.find(function(be){var G=w.get(be);if(G)return G.slice(0,_).every(function(Re){return Re})});if(le)return D=le,"break"},se=ge;se>0;se--){var ye=Ee(se);if(ye==="break")break}t.placement!==D&&(t.modifiersData[o]._skip=!0,t.placement=D,t.reset=!0)}}const jr={name:"flip",enabled:!0,phase:"main",fn:Mr,requiresIfExists:["offset"],data:{_skip:!1}};function pt(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ct(e){return[S,F,H,T].some(function(t){return e[t]>=0})}function Sr(e){var t=e.state,r=e.name,o=t.rects.reference,n=t.rects.popper,a=t.modifiersData.preventOverflow,l=de(t,{elementContext:"reference"}),s=de(t,{altBoundary:!0}),i=pt(l,o),c=pt(s,n,a),p=ct(i),v=ct(c);t.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":v})}const Tr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Sr};function Br(e,t,r){var o=I(e),n=[T,S].indexOf(o)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,l=a[0],s=a[1];return l=l||0,s=(s||0)*n,[T,F].indexOf(o)>=0?{x:s,y:l}:{x:l,y:s}}function Lr(e){var t=e.state,r=e.options,o=e.name,n=r.offset,a=n===void 0?[0,0]:n,l=gt.reduce(function(p,v){return p[v]=Br(v,t.rects,a),p},{}),s=l[t.placement],i=s.x,c=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=i,t.modifiersData.popperOffsets.y+=c),t.modifiersData[o]=l}const Nr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Lr};function Hr(e){var t=e.state,r=e.name;t.modifiersData[r]=Ct({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Fr={name:"popperOffsets",enabled:!0,phase:"read",fn:Hr,data:{}};function Ur(e){return e==="x"?"y":"x"}function Vr(e){var t=e.state,r=e.options,o=e.name,n=r.mainAxis,a=n===void 0?!0:n,l=r.altAxis,s=l===void 0?!1:l,i=r.boundary,c=r.rootBoundary,p=r.altBoundary,v=r.padding,y=r.tether,u=y===void 0?!0:y,O=r.tetherOffset,d=O===void 0?0:O,m=de(t,{boundary:i,rootBoundary:c,padding:v,altBoundary:p}),b=I(t.placement),P=ae(t.placement),x=!P,f=Ue(b),h=Ur(f),g=t.modifiersData.popperOffsets,w=t.rects.reference,E=t.rects.popper,D=typeof d=="function"?d(Object.assign({},t.rects,{placement:t.placement})):d,C=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),R=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,M={x:0,y:0};if(g){if(a){var k,U=f==="y"?S:T,B=f==="y"?H:F,$=f==="y"?"height":"width",A=g[f],Y=A+m[U],K=A-m[B],ge=u?-E[$]/2:0,Ee=P===re?w[$]:E[$],se=P===re?-E[$]:-w[$],ye=t.elements.arrow,ee=u&&ye?Fe(ye):{width:0,height:0},_=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:xt(),le=_[U],be=_[B],G=ce(0,w[$],ee[$]),Re=x?w[$]/2-ge-G-le-C.mainAxis:Ee-G-le-C.mainAxis,$t=x?-w[$]/2+ge+G+be+C.mainAxis:se+G+be+C.mainAxis,$e=t.elements.arrow&&he(t.elements.arrow),kt=$e?f==="y"?$e.clientTop||0:$e.clientLeft||0:0,Ye=(k=R==null?void 0:R[f])!=null?k:0,At=A+Re-Ye-kt,Wt=A+$t-Ye,_e=ce(u?Ce(Y,At):Y,A,u?Q(K,Wt):K);g[f]=_e,M[f]=_e-A}if(s){var ze,Mt=f==="x"?S:T,jt=f==="x"?H:F,J=g[h],xe=h==="y"?"height":"width",Ke=J+m[Mt],Ge=J-m[jt],ke=[S,T].indexOf(b)!==-1,Je=(ze=R==null?void 0:R[h])!=null?ze:0,Qe=ke?Ke:J-w[xe]-E[xe]-Je+C.altAxis,Ze=ke?J+w[xe]+E[xe]-Je-C.altAxis:Ge,et=u&&ke?ur(Qe,J,Ze):ce(u?Qe:Ke,J,u?Ze:Ge);g[h]=et,M[h]=et-J}t.modifiersData[o]=M}}const Ir={name:"preventOverflow",enabled:!0,phase:"main",fn:Vr,requiresIfExists:["offset"]};function qr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Xr(e){return e===L(e)||!N(e)?Ve(e):qr(e)}function Yr(e){var t=e.getBoundingClientRect(),r=oe(t.width)/e.offsetWidth||1,o=oe(t.height)/e.offsetHeight||1;return r!==1||o!==1}function _r(e,t,r){r===void 0&&(r=!1);var o=N(t),n=N(t)&&Yr(t),a=z(t),l=ne(e,n,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(o||!o&&!r)&&((q(t)!=="body"||qe(a))&&(s=Xr(t)),N(t)?(i=ne(t,!0),i.x+=t.clientLeft,i.y+=t.clientTop):a&&(i.x=Ie(a))),{x:l.left+s.scrollLeft-i.x,y:l.top+s.scrollTop-i.y,width:l.width,height:l.height}}function zr(e){var t=new Map,r=new Set,o=[];e.forEach(function(a){t.set(a.name,a)});function n(a){r.add(a.name);var l=[].concat(a.requires||[],a.requiresIfExists||[]);l.forEach(function(s){if(!r.has(s)){var i=t.get(s);i&&n(i)}}),o.push(a)}return e.forEach(function(a){r.has(a.name)||n(a)}),o}function Kr(e){var t=zr(e);return ir.reduce(function(r,o){return r.concat(t.filter(function(n){return n.phase===o}))},[])}function Gr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Jr(e){var t=e.reduce(function(r,o){var n=r[o.name];return r[o.name]=n?Object.assign({},n,o,{options:Object.assign({},n.options,o.options),data:Object.assign({},n.data,o.data)}):o,r},{});return Object.keys(t).map(function(r){return t[r]})}var ft={placement:"bottom",modifiers:[],strategy:"absolute"};function ut(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(o){return!(o&&typeof o.getBoundingClientRect=="function")})}function Qr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,o=r===void 0?[]:r,n=t.defaultOptions,a=n===void 0?ft:n;return function(s,i,c){c===void 0&&(c=a);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},ft,a),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},v=[],y=!1,u={state:p,setOptions:function(b){var P=typeof b=="function"?b(p.options):b;d(),p.options=Object.assign({},a,p.options,P),p.scrollParents={reference:Z(s)?fe(s):s.contextElement?fe(s.contextElement):[],popper:fe(i)};var x=Kr(Jr([].concat(o,p.options.modifiers)));return p.orderedModifiers=x.filter(function(f){return f.enabled}),O(),u.update()},forceUpdate:function(){if(!y){var b=p.elements,P=b.reference,x=b.popper;if(ut(P,x)){p.rects={reference:_r(P,he(x),p.options.strategy==="fixed"),popper:Fe(x)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(C){return p.modifiersData[C.name]=Object.assign({},C.data)});for(var f=0;f<p.orderedModifiers.length;f++){if(p.reset===!0){p.reset=!1,f=-1;continue}var h=p.orderedModifiers[f],g=h.fn,w=h.options,E=w===void 0?{}:w,D=h.name;typeof g=="function"&&(p=g({state:p,options:E,name:D,instance:u})||p)}}}},update:Gr(function(){return new Promise(function(m){u.forceUpdate(),m(p)})}),destroy:function(){d(),y=!0}};if(!ut(s,i))return u;u.setOptions(c).then(function(m){!y&&c.onFirstUpdate&&c.onFirstUpdate(m)});function O(){p.orderedModifiers.forEach(function(m){var b=m.name,P=m.options,x=P===void 0?{}:P,f=m.effect;if(typeof f=="function"){var h=f({state:p,name:b,instance:u,options:x}),g=function(){};v.push(h||g)}})}function d(){v.forEach(function(m){return m()}),v=[]}return u}}var Zr=[Or,Fr,xr,pr,Nr,jr,Ir,hr,Tr],eo=Qr({defaultModifiers:Zr});const Dt="Popper";function to(e){return mt(Dt,e)}zt(Dt,["root"]);const ro=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],oo=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function no(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function je(e){return typeof e=="function"?e():e}function ao(e){return e.nodeType!==void 0}const io=()=>Te({root:["root"]},Xt(to)),so={},lo=W.forwardRef(function(t,r){var o;const{anchorEl:n,children:a,direction:l,disablePortal:s,modifiers:i,open:c,placement:p,popperOptions:v,popperRef:y,slotProps:u={},slots:O={},TransitionProps:d}=t,m=ve(t,ro),b=W.useRef(null),P=tt(b,r),x=W.useRef(null),f=tt(x,y),h=W.useRef(f);rt(()=>{h.current=f},[f]),W.useImperativeHandle(y,()=>x.current,[]);const g=no(p,l),[w,E]=W.useState(g),[D,C]=W.useState(je(n));W.useEffect(()=>{x.current&&x.current.forceUpdate()}),W.useEffect(()=>{n&&C(je(n))},[n]),rt(()=>{if(!D||!c)return;const B=Y=>{E(Y.placement)};let $=[{name:"preventOverflow",options:{altBoundary:s}},{name:"flip",options:{altBoundary:s}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Y})=>{B(Y)}}];i!=null&&($=$.concat(i)),v&&v.modifiers!=null&&($=$.concat(v.modifiers));const A=eo(D,b.current,j({placement:g},v,{modifiers:$}));return h.current(A),()=>{A.destroy(),h.current(null)}},[D,s,i,c,v,g]);const R={placement:w};d!==null&&(R.TransitionProps=d);const M=io(),k=(o=O.root)!=null?o:"div",U=Ft({elementType:k,externalSlotProps:u.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:M.root});return V.jsx(k,j({},U,{children:typeof a=="function"?a(R):a}))}),po=W.forwardRef(function(t,r){const{anchorEl:o,children:n,container:a,direction:l="ltr",disablePortal:s=!1,keepMounted:i=!1,modifiers:c,open:p,placement:v="bottom",popperOptions:y=so,popperRef:u,style:O,transition:d=!1,slotProps:m={},slots:b={}}=t,P=ve(t,oo),[x,f]=W.useState(!0),h=()=>{f(!1)},g=()=>{f(!0)};if(!i&&!p&&(!d||x))return null;let w;if(a)w=a;else if(o){const C=je(o);w=C&&ao(C)?ot(C).body:ot(null).body}const E=!p&&i&&(!d||x)?"none":void 0,D=d?{in:p,onEnter:h,onExited:g}:void 0;return V.jsx(Bt,{disablePortal:s,container:w,children:V.jsx(lo,j({anchorEl:o,direction:l,disablePortal:s,modifiers:c,ref:r,open:d?!x:p,placement:v,popperOptions:y,popperRef:u,slotProps:m,slots:b},P,{style:j({position:"fixed",top:0,left:0,display:E},O),TransitionProps:D,children:n}))})});var Xe={};Object.defineProperty(Xe,"__esModule",{value:!0});var Et=Xe.default=void 0,co=uo(W),fo=Tt;function Rt(e){if(typeof WeakMap!="function")return null;var t=new WeakMap,r=new WeakMap;return(Rt=function(o){return o?r:t})(e)}function uo(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var r=Rt(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(a!=="default"&&Object.prototype.hasOwnProperty.call(e,a)){var l=n?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(o,a,l):o[a]=e[a]}return o.default=e,r&&r.set(e,o),o}function vo(e){return Object.keys(e).length===0}function mo(e=null){const t=co.useContext(fo.ThemeContext);return!t||vo(t)?e:t}Et=Xe.default=mo;const ho=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],go=ie(po,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),yo=W.forwardRef(function(t,r){var o;const n=Et(),a=Se({props:t,name:"MuiPopper"}),{anchorEl:l,component:s,components:i,componentsProps:c,container:p,disablePortal:v,keepMounted:y,modifiers:u,open:O,placement:d,popperOptions:m,popperRef:b,transition:P,slots:x,slotProps:f}=a,h=ve(a,ho),g=(o=x==null?void 0:x.root)!=null?o:i==null?void 0:i.Root,w=j({anchorEl:l,container:p,disablePortal:v,keepMounted:y,modifiers:u,open:O,placement:d,popperOptions:m,popperRef:b,transition:P},h);return V.jsx(go,j({as:s,direction:n==null?void 0:n.direction,slots:{root:g},slotProps:f!=null?f:c},w,{ref:r}))}),Xo=yo;function bo(e){return Le("MuiDialog",e)}const xo=Be("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),Ae=xo,wo=W.createContext({}),Oo=wo,Po=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],Co=ie(Lt,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),Do=e=>{const{classes:t,scroll:r,maxWidth:o,fullWidth:n,fullScreen:a}=e,l={root:["root"],container:["container",`scroll${te(r)}`],paper:["paper",`paperScroll${te(r)}`,`paperWidth${te(String(o))}`,n&&"paperFullWidth",a&&"paperFullScreen"]};return Te(l,bo,t)},Eo=ie(Nt,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),Ro=ie("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.container,t[`scroll${te(r.scroll)}`]]}})(({ownerState:e})=>j({height:"100%","@media print":{height:"auto"},outline:0},e.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},e.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),$o=ie(dt,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.paper,t[`scrollPaper${te(r.scroll)}`],t[`paperWidth${te(String(r.maxWidth))}`],r.fullWidth&&t.paperFullWidth,r.fullScreen&&t.paperFullScreen]}})(({theme:e,ownerState:t})=>j({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},t.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},t.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!t.maxWidth&&{maxWidth:"calc(100% - 64px)"},t.maxWidth==="xs"&&{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${Ae.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.maxWidth&&t.maxWidth!=="xs"&&{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`,[`&.${Ae.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[t.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},t.fullWidth&&{width:"calc(100% - 64px)"},t.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${Ae.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),ko=W.forwardRef(function(t,r){const o=Se({props:t,name:"MuiDialog"}),n=Ut(),a={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{"aria-describedby":l,"aria-labelledby":s,BackdropComponent:i,BackdropProps:c,children:p,className:v,disableEscapeKeyDown:y=!1,fullScreen:u=!1,fullWidth:O=!1,maxWidth:d="sm",onBackdropClick:m,onClose:b,open:P,PaperComponent:x=dt,PaperProps:f={},scroll:h="paper",TransitionComponent:g=Ht,transitionDuration:w=a,TransitionProps:E}=o,D=ve(o,Po),C=j({},o,{disableEscapeKeyDown:y,fullScreen:u,fullWidth:O,maxWidth:d,scroll:h}),R=Do(C),M=W.useRef(),k=A=>{M.current=A.target===A.currentTarget},U=A=>{M.current&&(M.current=null,m&&m(A),b&&b(A,"backdropClick"))},B=Vt(s),$=W.useMemo(()=>({titleId:B}),[B]);return V.jsx(Eo,j({className:Oe(R.root,v),closeAfterTransition:!0,components:{Backdrop:Co},componentsProps:{backdrop:j({transitionDuration:w,as:i},c)},disableEscapeKeyDown:y,onClose:b,open:P,ref:r,onClick:U,ownerState:C},D,{children:V.jsx(g,j({appear:!0,in:P,timeout:w,role:"presentation"},E,{children:V.jsx(Ro,{className:Oe(R.container),onMouseDown:k,ownerState:C,children:V.jsx($o,j({as:x,elevation:24,role:"dialog","aria-describedby":l,"aria-labelledby":B},f,{className:Oe(R.paper,f.className),ownerState:C,children:V.jsx(Oo.Provider,{value:$,children:p})}))})}))}))}),Yo=ko;function Ao(e){return Le("MuiDialogContent",e)}Be("MuiDialogContent",["root","dividers"]);function _o(e){return Le("MuiDialogTitle",e)}const Wo=Be("MuiDialogTitle",["root"]),Mo=Wo,jo=["className","dividers"],So=e=>{const{classes:t,dividers:r}=e;return Te({root:["root",r&&"dividers"]},Ao,t)},To=ie("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dividers&&t.dividers]}})(({theme:e,ownerState:t})=>j({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(e.vars||e).palette.divider}`,borderBottom:`1px solid ${(e.vars||e).palette.divider}`}:{[`.${Mo.root} + &`]:{paddingTop:0}})),Bo=W.forwardRef(function(t,r){const o=Se({props:t,name:"MuiDialogContent"}),{className:n,dividers:a=!1}=o,l=ve(o,jo),s=j({},o,{dividers:a}),i=So(s);return V.jsx(To,j({className:Oe(i.root,n),ownerState:s,ref:r},l))}),zo=Bo;export{Yo as D,Xo as M,zo as a,Oo as b,Ae as d,_o as g};
