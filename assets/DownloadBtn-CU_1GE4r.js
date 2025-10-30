const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Py-Y6mPf.js","assets/index-oMLw5Pkj.css"])))=>i.map(i=>d[i]);
import{c as p,r as _,j as o,a as b,I as x,T as h,_ as w,D}from"./index-Py-Y6mPf.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],v=p("download",j),y=({onChangeFile:e,data:d,settings:a,...s})=>{const[L,n]=_.useState(!1);async function r(){const{pdf:l}=await w(async()=>{const{pdf:u}=await import("./index-Py-Y6mPf.js").then(f=>f.b);return{pdf:u}},__vite__mapDeps([0,1])),i=a.mv===""?"Relatorio":a.mv.trim();n(!0),e&&e(!0);const m=await l(o.jsx(D,{data:d,settings:a})).toBlob();e&&e(!1),n(!1);const c=URL.createObjectURL(m),t=document.createElement("a");t.href=c,t.download=`${i}_${new Date().toLocaleDateString()}.pdf`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(c)}return o.jsxs(b,{...s,onClick:r,children:[o.jsx(x,{children:o.jsx(v,{})}),o.jsx(h,{children:"Download"})]})};export{y as default};
