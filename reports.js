export const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(n)||0);
export const sum=(items,type)=>items.filter(t=>!type||t.type===type).reduce((a,t)=>a+Number(t.amount||0),0);
export function monthTotals(items,year,month){const a=items.filter(t=>{const d=new Date(t.date+"T00:00:00");return d.getFullYear()===year&&d.getMonth()===month;});return{income:sum(a,"income"),expense:sum(a,"expense"),savings:sum(a,"income")-sum(a,"expense")};}
export function drawChart(canvas,labels,series){
 if(!canvas)return;const w=Math.max(280,canvas.clientWidth),h=250,dpr=devicePixelRatio||1;canvas.width=w*dpr;canvas.height=h*dpr;const c=canvas.getContext("2d");c.scale(dpr,dpr);
 const css=getComputedStyle(document.body),muted=css.getPropertyValue("--muted").trim(),line=css.getPropertyValue("--line").trim(),max=Math.max(1,...series.flatMap(s=>s.values))*1.18,left=42,right=10,top=15,bottom=32,ph=h-top-bottom,pw=w-left-right;
 c.clearRect(0,0,w,h);c.font="10px DM Sans";c.fillStyle=muted;c.strokeStyle=line;
 for(let i=0;i<=4;i++){let y=top+ph*i/4;c.beginPath();c.moveTo(left,y);c.lineTo(w-right,y);c.stroke();let n=max*(1-i/4);c.fillText(n>=100000?"₹"+(n/100000).toFixed(1)+"L":n>=1000?"₹"+Math.round(n/1000)+"k":"₹"+Math.round(n),3,y+3);}
 const group=pw/labels.length,bw=Math.min(17,group/(series.length+1));
 labels.forEach((label,i)=>{series.forEach((s,j)=>{let v=s.values[i]||0,bh=v/max*ph,x=left+i*group+group/2-(series.length*bw+(series.length-1)*3)/2+j*(bw+3),y=top+ph-bh;c.fillStyle=s.color;c.fillRect(x,y,bw,bh);});c.fillStyle=muted;c.textAlign="center";c.fillText(label,left+i*group+group/2,h-10);});c.textAlign="left";
}
function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
export function exportCsv(items){const rows=[["Description","Category","Date","Type","Amount"],...items.map(t=>[t.description,t.category,t.date,t.type,t.amount])];const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");download(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}),"finora-transactions.csv");}
export function exportPdf(items){
 const lines=["FINORA 2.1 — TRANSACTION REPORT","Generated: "+new Date().toLocaleDateString("en-IN"),"","DATE       TYPE      CATEGORY          DESCRIPTION                 AMOUNT","-".repeat(82),...items.map(t=>`${t.date}  ${t.type.toUpperCase().padEnd(8)} ${t.category.slice(0,15).padEnd(15)} ${t.description.slice(0,26).padEnd(26)} ${money(t.amount)}`),"","Income: "+money(sum(items,"income")),"Expenses: "+money(sum(items,"expense"))];
 const content="BT\n/F1 9 Tf\n45 790 Td\n13 TL\n"+lines.slice(0,48).map((s,i)=>(i?"T* ":"")+"("+s.replace(/[^\x20-\x7E]/g,"").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")+") Tj").join("\n")+"\nET";
 const objs=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>","<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",`<< /Length ${content.length} >>\nstream\n${content}\nendstream`];
 let pdf="%PDF-1.4\n",offset=[0];objs.forEach((o,i)=>{offset.push(pdf.length);pdf+=`${i+1} 0 obj\n${o}\nendobj\n`;});let x=pdf.length;pdf+=`xref\n0 6\n0000000000 65535 f \n${offset.slice(1).map(n=>String(n).padStart(10,"0")+" 00000 n ").join("\n")}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${x}\n%%EOF`;download(new Blob([pdf],{type:"application/pdf"}),"finora-transactions.pdf");
}
