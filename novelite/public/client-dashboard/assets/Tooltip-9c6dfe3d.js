import{_ as r,c as Wo,z as jo,r as p,u as fe,y as he,J as ge,j as g}from"./index-8b3b8eba.js";import{d as Te,g as be,s as Y,h as k,i as Bo,j as Pe,e as ve,b as F,a as ye,k as we}from"./Typography-1427830e.js";import{u as xe,a as N}from"./Grid-f4d7d3ed.js";import{M as Uo}from"./Popper-726b155e.js";import{u as Re,a as Ce}from"./useControlled-a5c8634c.js";import{G as Do}from"./Select-3a5e17b2.js";function Me(t){return be("MuiTooltip",t)}const Oe=Te("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),u=Oe,_e=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function $e(t){return Math.round(t*1e5)/1e5}const Le=t=>{const{classes:e,disableInteractive:n,arrow:a,touch:x,placement:R}=t,C={popper:["popper",!n&&"popperInteractive",a&&"popperArrow"],tooltip:["tooltip",a&&"tooltipArrow",x&&"touch",`tooltipPlacement${Wo(R.split("-")[0])}`],arrow:["arrow"]};return ye(C,Me,e)},Ee=Y(Uo,{name:"MuiTooltip",slot:"Popper",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.popper,!n.disableInteractive&&e.popperInteractive,n.arrow&&e.popperArrow,!n.open&&e.popperClose]}})(({theme:t,ownerState:e,open:n})=>r({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none"},!e.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},e.arrow&&{[`&[data-popper-placement*="bottom"] .${u.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${u.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${u.arrow}`]:r({},e.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${u.arrow}`]:r({},e.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Ie=Y("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.tooltip,n.touch&&e.touch,n.arrow&&e.tooltipArrow,e[`tooltipPlacement${Wo(n.placement.split("-")[0])}`]]}})(({theme:t,ownerState:e})=>r({backgroundColor:t.vars?t.vars.palette.Tooltip.bg:jo(t.palette.grey[700],.92),borderRadius:(t.vars||t).shape.borderRadius,color:(t.vars||t).palette.common.white,fontFamily:t.typography.fontFamily,padding:"4px 8px",fontSize:t.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:t.typography.fontWeightMedium},e.arrow&&{position:"relative",margin:0},e.touch&&{padding:"8px 16px",fontSize:t.typography.pxToRem(14),lineHeight:`${$e(16/14)}em`,fontWeight:t.typography.fontWeightRegular},{[`.${u.popper}[data-popper-placement*="left"] &`]:r({transformOrigin:"right center"},e.isRtl?r({marginLeft:"14px"},e.touch&&{marginLeft:"24px"}):r({marginRight:"14px"},e.touch&&{marginRight:"24px"})),[`.${u.popper}[data-popper-placement*="right"] &`]:r({transformOrigin:"left center"},e.isRtl?r({marginRight:"14px"},e.touch&&{marginRight:"24px"}):r({marginLeft:"14px"},e.touch&&{marginLeft:"24px"})),[`.${u.popper}[data-popper-placement*="top"] &`]:r({transformOrigin:"center bottom",marginBottom:"14px"},e.touch&&{marginBottom:"24px"}),[`.${u.popper}[data-popper-placement*="bottom"] &`]:r({transformOrigin:"center top",marginTop:"14px"},e.touch&&{marginTop:"24px"})})),ke=Y("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(({theme:t})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?t.vars.palette.Tooltip.bg:jo(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let A=!1;const So=new we;let w={x:0,y:0};function B(t,e){return(n,...a)=>{e&&e(n,...a),t(n,...a)}}const Fe=p.forwardRef(function(e,n){var a,x,R,C,q,Q,Z,oo,eo,to,ro,no,so,po,io,lo,ao,co,uo;const D=fe({props:e,name:"MuiTooltip"}),{arrow:mo=!1,children:S,components:M={},componentsProps:d={},describeChild:zo=!1,disableFocusListener:Vo=!1,disableHoverListener:fo=!1,disableInteractive:Ho=!1,disableTouchListener:Go=!1,enterDelay:ho=100,enterNextDelay:go=0,enterTouchDelay:Jo=700,followCursor:W=!1,id:Ko,leaveDelay:To=0,leaveTouchDelay:Xo=1500,onClose:bo,onOpen:Po,open:Yo,placement:vo="bottom",PopperComponent:j,PopperProps:m={},slotProps:f={},slots:O={},title:h,TransitionComponent:qo=Do,TransitionProps:Qo}=D,yo=he(D,_e),c=p.isValidElement(S)?S:g.jsx("span",{children:S}),wo=xe(),Zo=ge(),[T,xo]=p.useState(),[U,oe]=p.useState(null),_=p.useRef(!1),z=Ho||W,Ro=k(),V=k(),$=k(),Co=k(),[ee,Mo]=Re({controlled:Yo,default:!1,name:"Tooltip",state:"open"});let l=ee;const H=Ce(Ko),b=p.useRef(),L=Bo(()=>{b.current!==void 0&&(document.body.style.WebkitUserSelect=b.current,b.current=void 0),Co.clear()});p.useEffect(()=>L,[L]);const Oo=o=>{So.clear(),A=!0,Mo(!0),Po&&!l&&Po(o)},E=Bo(o=>{So.start(800+To,()=>{A=!1}),Mo(!1),bo&&l&&bo(o),Ro.start(wo.transitions.duration.shortest,()=>{_.current=!1})}),I=o=>{_.current&&o.type!=="touchstart"||(T&&T.removeAttribute("title"),V.clear(),$.clear(),ho||A&&go?V.start(A?go:ho,()=>{Oo(o)}):Oo(o))},G=o=>{V.clear(),$.start(To,()=>{E(o)})},{isFocusVisibleRef:_o,onBlur:te,onFocus:re,ref:ne}=Pe(),[,$o]=p.useState(!1),Lo=o=>{te(o),_o.current===!1&&($o(!1),G(o))},Eo=o=>{T||xo(o.currentTarget),re(o),_o.current===!0&&($o(!0),I(o))},Io=o=>{_.current=!0;const s=c.props;s.onTouchStart&&s.onTouchStart(o)},se=o=>{Io(o),$.clear(),Ro.clear(),L(),b.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Co.start(Jo,()=>{document.body.style.WebkitUserSelect=b.current,I(o)})},pe=o=>{c.props.onTouchEnd&&c.props.onTouchEnd(o),L(),$.start(Xo,()=>{E(o)})};p.useEffect(()=>{if(!l)return;function o(s){(s.key==="Escape"||s.key==="Esc")&&E(s)}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[E,l]);const ie=ve(c.ref,ne,xo,n);!h&&h!==0&&(l=!1);const J=p.useRef(),le=o=>{const s=c.props;s.onMouseMove&&s.onMouseMove(o),w={x:o.clientX,y:o.clientY},J.current&&J.current.update()},P={},K=typeof h=="string";zo?(P.title=!l&&K&&!fo?h:null,P["aria-describedby"]=l?H:null):(P["aria-label"]=K?h:null,P["aria-labelledby"]=l&&!K?H:null);const i=r({},P,yo,c.props,{className:F(yo.className,c.props.className),onTouchStart:Io,ref:ie},W?{onMouseMove:le}:{}),v={};Go||(i.onTouchStart=se,i.onTouchEnd=pe),fo||(i.onMouseOver=B(I,i.onMouseOver),i.onMouseLeave=B(G,i.onMouseLeave),z||(v.onMouseOver=I,v.onMouseLeave=G)),Vo||(i.onFocus=B(Eo,i.onFocus),i.onBlur=B(Lo,i.onBlur),z||(v.onFocus=Eo,v.onBlur=Lo));const ae=p.useMemo(()=>{var o;let s=[{name:"arrow",enabled:!!U,options:{element:U,padding:4}}];return(o=m.popperOptions)!=null&&o.modifiers&&(s=s.concat(m.popperOptions.modifiers)),r({},m.popperOptions,{modifiers:s})},[U,m]),y=r({},D,{isRtl:Zo,arrow:mo,disableInteractive:z,placement:vo,PopperComponentProp:j,touch:_.current}),X=Le(y),ko=(a=(x=O.popper)!=null?x:M.Popper)!=null?a:Ee,Fo=(R=(C=(q=O.transition)!=null?q:M.Transition)!=null?C:qo)!=null?R:Do,No=(Q=(Z=O.tooltip)!=null?Z:M.Tooltip)!=null?Q:Ie,Ao=(oo=(eo=O.arrow)!=null?eo:M.Arrow)!=null?oo:ke,ce=N(ko,r({},m,(to=f.popper)!=null?to:d.popper,{className:F(X.popper,m==null?void 0:m.className,(ro=(no=f.popper)!=null?no:d.popper)==null?void 0:ro.className)}),y),ue=N(Fo,r({},Qo,(so=f.transition)!=null?so:d.transition),y),de=N(No,r({},(po=f.tooltip)!=null?po:d.tooltip,{className:F(X.tooltip,(io=(lo=f.tooltip)!=null?lo:d.tooltip)==null?void 0:io.className)}),y),me=N(Ao,r({},(ao=f.arrow)!=null?ao:d.arrow,{className:F(X.arrow,(co=(uo=f.arrow)!=null?uo:d.arrow)==null?void 0:co.className)}),y);return g.jsxs(p.Fragment,{children:[p.cloneElement(c,i),g.jsx(ko,r({as:j!=null?j:Uo,placement:vo,anchorEl:W?{getBoundingClientRect:()=>({top:w.y,left:w.x,right:w.x,bottom:w.y,width:0,height:0})}:T,popperRef:J,open:T?l:!1,id:H,transition:!0},v,ce,{popperOptions:ae,children:({TransitionProps:o})=>g.jsx(Fo,r({timeout:wo.transitions.duration.shorter},o,ue,{children:g.jsxs(No,r({},de,{children:[h,mo?g.jsx(Ao,r({},me,{ref:oe})):null]}))}))}))]})}),je=Fe;export{je as T,u as t};
