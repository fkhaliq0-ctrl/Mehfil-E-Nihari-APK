import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t}from"./itemDisplay-BmVlJTUT.js";import{t as n}from"./formatDate-B3XwAq24.js";import{c as r,i,l as a,o}from"./index-CCO2aU-y.js";import{t as s}from"./exceljs.min-D11IVER6.js";var c=e(s(),1),l=[`Invoice #`,`Date`,`Time`,`Payment`,`Items`,`Total (Rs)`],u=`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,d=`Mehfil-Full-Report`,f=/^\d{2}\/\d{2}\/\d{4}$/,p=`#,##0.00`;function m(e,t,n){let r=n===`excel`?`xlsx`:n===`pdf`?`pdf`:null;if(!r)throw Error(`format must be Excel or PDF`);if(!f.test(String(e||``))||!f.test(String(t||``)))throw Error(`dates must be DD/MM/YYYY`);return`${d}_${e.replace(/\//g,`-`)}_${t.replace(/\//g,`-`)}.${r}`}function h(e,t){if(!f.test(String(e||``))||!f.test(String(t||``)))throw Error(`Pick both From and To dates.`);let n=i(e),r=i(t);if(isNaN(n.getTime())||isNaN(r.getTime()))throw Error(`Pick both From and To dates.`);if(n.getTime()>r.getTime())throw Error(`From date must be on or before To date.`);return{from:e,to:t}}function g(e){let i=Array.isArray(e)?e:[],s=e=>o(e)?a(e):e.paymentMethod===`cash`?`Cash`:e.paymentMethod===`credit`?`Credit`:`UPI`,c=r(i),l={cash:c.cash,upi:c.upi,credit:c.credit,count:i.length};return l.grand=l.cash+l.upi+l.credit,{rows:i.map(e=>({invoice:e.invoiceNumber||e.id||`—`,date:n(e.date||``),time:e.time||(e.timestamp?new Date(e.timestamp).toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`,hour12:!0}):``),payment:s(e),items:(Array.isArray(e.items)?e.items:[]).map(e=>`${t(e.name,e.portion)} ×${e.qty}`).join(`, `),total:Number(e.total)||0})),totals:l}}async function _(e,{from:t,to:n}={}){let{rows:r,totals:i}=g(e),a=new c.default.Workbook,o=a.addWorksheet(`Full Report`,{views:[{state:`frozen`,ySplit:3}]});[14,12,12,10,64,12].forEach((e,t)=>{o.getColumn(t+1).width=e});let s=o.addRow([`Mehfil-E-Nihari — Full Report`]);s.getCell(1).font={bold:!0,size:14};let u=o.addRow([`Period: ${t} – ${n}`]);u.getCell(1).font={italic:!0},o.addRow(l).eachCell(e=>{e.font={bold:!0,color:{argb:`FFFFFFFF`}},e.fill={type:`pattern`,pattern:`solid`,fgColor:{argb:`FF1E293B`}}});for(let e of r){let t=o.addRow([e.invoice,e.date,e.time,e.payment,e.items,e.total]);t.getCell(6).numFmt=p}o.addRow([]);let d=o.addRow([`Summary`]);d.getCell(1).font={bold:!0,size:12};let f=(e,t)=>{let n=o.addRow([e,null,null,null,null,t]);n.getCell(1).font={bold:!0},n.getCell(6).numFmt=p};return f(`Cash`,i.cash),f(`UPI`,i.upi),f(`Credit`,i.credit),f(`Total (${i.count} bills)`,i.grand),await a.xlsx.writeBuffer()}var v=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),y=e=>`₹${(Number(e)||0).toLocaleString(`en-IN`)}`;function b(e,{from:t,to:n,title:r}={}){let{rows:i,totals:a}=g(e),o=i.map(e=>`  <tr><td>${v(e.invoice)}</td><td>${v(e.date)}</td><td>${v(e.time)}</td><td>${v(e.payment)}</td><td>${v(e.items)}</td><td class="n">${y(e.total)}</td></tr>`).join(`
`);return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${v(r||`${d}_${String(t).replace(/\//g,`-`)}_${String(n).replace(/\//g,`-`)}.pdf`)}</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; color: #111; margin: 24px; }
  h1 { font-size: 20px; margin: 0 0 2px; }
  .period { color: #555; font-size: 13px; margin: 0 0 14px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; }
  th, td { border: 1px solid #999; padding: 5px 7px; text-align: left; vertical-align: top; }
  th { background: #1e293b; color: #fff; }
  td.n { text-align: right; white-space: nowrap; }
  .summary { margin-top: 16px; width: 45%; font-size: 13px; }
  .summary td { border: none; padding: 3px 6px; }
  .summary .lbl { font-weight: bold; }
  .summary .tot td { border-top: 2px solid #333; font-weight: bold; font-size: 15px; }
  @media print { body { margin: 10mm; } }
</style>
</head>
<body>
<h1>Mehfil-E-Nihari — Full Report</h1>
<p class="period">Period: ${v(t)} – ${v(n)}</p>
<table>
  <thead><tr>${l.map(e=>`<th>${v(e)}</th>`).join(``)}</tr></thead>
  <tbody>
${o||`  <tr><td colspan="6">No bills in this period.</td></tr>`}
  </tbody>
</table>
<table class="summary">
  <tr><td class="lbl">Cash</td><td class="n">${y(a.cash)}</td></tr>
  <tr><td class="lbl">UPI</td><td class="n">${y(a.upi)}</td></tr>
  <tr><td class="lbl">Credit</td><td class="n">${y(a.credit)}</td></tr>
  <tr class="tot"><td>Total (${a.count} bills)</td><td class="n">${y(a.grand)}</td></tr>
</table>
</body>
</html>
`}function x({bytes:e,mime:t,name:n,doc:r,createObjectURL:i,revokeObjectURL:a}={}){let o=r||(typeof document<`u`?document:null),s=i||(typeof URL<`u`&&typeof URL.createObjectURL==`function`?URL.createObjectURL.bind(URL):null);if(!o||!o.body||!s)throw Error(`downloads are unavailable on this device`);let c=s(new Blob([e],{type:t})),l=o.createElement(`a`);l.href=c,l.download=n,o.body.appendChild(l);try{l.click()}finally{try{l.remove()}catch{}let e=a||(typeof URL<`u`&&typeof URL.revokeObjectURL==`function`?URL.revokeObjectURL.bind(URL):null);e&&setTimeout(()=>e(c),1e4)}return n}function S({html:e,name:t,doc:n}={}){let r=n||(typeof document<`u`?document:null);if(!r||!r.body)throw Error(`printing is unavailable on this device`);let i=r.createElement(`iframe`);i.setAttribute(`aria-hidden`,`true`),i.setAttribute(`title`,t),i.style.cssText=`position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;`,r.body.appendChild(i);try{let n=i.contentWindow,r=n&&n.document;if(!r)throw Error(`could not open the print view`);r.open(),r.write(e),r.close();let a=()=>{try{i.remove()}catch{}};return n.addEventListener(`afterprint`,a),n.focus(),n.print(),setTimeout(a,6e4),t}catch(e){try{i.remove()}catch{}throw e}}async function C({bills:e,from:t,to:n,format:r,doc:i}={}){h(t,n);let a=m(t,n,r);if(r===`excel`){let r=await _(e,{from:t,to:n});return x({bytes:r,mime:u,name:a,doc:i}),{name:a,bytes:r.byteLength??r.length??0,path:null}}if(r===`pdf`){let r=b(e,{from:t,to:n,title:a});return S({html:r,name:a,doc:i}),{name:a,bytes:r.length,path:null}}throw Error(`choose Excel or PDF`)}export{C as generateFullReport};