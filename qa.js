const {chromium}=require('playwright');
const path=require('path');
const URL='file://'+path.join(__dirname,'index.html');
const VPS=[[1680,1000],[1440,900],[1180,820],[900,1000],[768,1024],[430,932],[360,780]];

(async()=>{
  const b=await chromium.launch();
  let fail=0;
  for(const [w,h] of VPS){
    const pg=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
    const errs=[];
    pg.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts\.googleapis|fonts\.gstatic|ERR_NAME|ERR_PROXY/.test(m.text()))errs.push('console: '+m.text());});
    pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
    await pg.goto(URL,{waitUntil:'load'});
    // walk the whole page so every IntersectionObserver fires
    await pg.evaluate(async()=>{
      document.documentElement.style.scrollBehavior='auto';   // the CSS sets smooth
      const H=document.documentElement.scrollHeight;
      for(let y=0;y<H;y+=350){window.scrollTo({top:y,behavior:'instant'});
        await new Promise(r=>setTimeout(r,120));}
      window.scrollTo({top:H,behavior:'instant'});
      await new Promise(r=>setTimeout(r,300));
      window.scrollTo({top:0,behavior:'instant'});
    });
    await pg.waitForTimeout(9000);

    const over=await pg.evaluate(vw=>{
      const bad=[];
      document.querySelectorAll('*').forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.width===0&&r.height===0)return;
        if(el.ownerSVGElement)return;            // masked decorative geometry
        if(r.right>vw+1.5||r.left<-1.5){
          const cs=getComputedStyle(el);
          if(cs.position==='fixed'||cs.position==='absolute')return;
          // legitimate: inside a horizontally scrollable container
          for(let p=el.parentElement;p;p=p.parentElement){
            const ov=getComputedStyle(p).overflowX;
            if(ov==='auto'||ov==='scroll')return;
          }
          bad.push(el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+
            (el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).join('.'):'')+
            ' r='+Math.round(r.right)+' l='+Math.round(r.left));
        }
      });
      return [...new Set(bad)].slice(0,10);
    },w);

    const st=await pg.evaluate(()=>({
      sw:document.documentElement.scrollWidth,
      cw:document.documentElement.clientWidth,
      rays:document.querySelectorAll('#burst line').length,
      revealLeft:[...document.querySelectorAll('.reveal')].filter(e=>!e.classList.contains('in')).length,
      wf:(document.getElementById('wfSt')||{}).textContent,
      wfOn:document.querySelectorAll('.wf-r.on').length,
      wfLit:document.querySelectorAll('.wf-r.lit').length,
      ch:(document.getElementById('chSt')||{}).textContent,
      chVals:[...document.querySelectorAll('#chRail .cn-v')].filter(e=>e.textContent.trim()).length,
      adj:(document.getElementById('adjSt')||{}).textContent,
      adjChip:!!document.querySelector('#adjV .chip'),
      en:(document.getElementById('enSt')||{}).textContent,
      enVd:[...document.querySelectorAll('#enGrid .en-row:not(.en-axis) .vd')].filter(e=>e.textContent!=='pending').length,
      amp:(document.getElementById('ampSt')||{}).textContent,
      ampB:(document.getElementById('ampB')||{}).textContent,
      lf:(document.getElementById('lfSt')||{}).textContent,
      lfOn:document.querySelectorAll('.lf-l.on').length,
      lfOut:((document.getElementById('lfOut')||{}).textContent||'').slice(0,40)
    }));
    const ok = st.sw<=st.cw+1 && over.length===0 && errs.length===0 &&
               st.rays===104 && st.chVals===10 && st.adjChip &&
               st.enVd===5 && st.lfOn===10 && st.lfOut.includes('99 files') &&
               st.wfOn===9 && st.wfLit===9;
    if(!ok)fail++;
    console.log(`${ok?'PASS':'FAIL'} ${w}x${h}  sw=${st.sw}/${st.cw} rays=${st.rays} wf=${st.wfOn}/${st.wfLit} `+
      `reveal-left=${st.revealLeft} chain=${st.ch}(${st.chVals}/10) adj=${st.adj} `+
      `en=${st.en}(${st.enVd}/5) amp=${st.amp}/${st.ampB} lf=${st.lf}(${st.lfOn}/10)`);
    if(over.length)console.log('   overflow: '+over.join(' | '));
    if(errs.length)console.log('   errors: '+errs.join(' | '));
    await pg.close();
  }

  // reduced motion
  const pg=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const e2=[];pg.on('pageerror',e=>e2.push(e.message));
  pg.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts\.g|ERR_NAME|ERR_PROXY/.test(m.text()))e2.push(m.text());});
  await pg.goto(URL,{waitUntil:'load'});
  await pg.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';
    const H=document.documentElement.scrollHeight;
    for(let y=0;y<H;y+=400){window.scrollTo({top:y,behavior:'instant'});
      await new Promise(r=>setTimeout(r,80));}});
  await pg.waitForTimeout(2500);
  const rm=await pg.evaluate(()=>({
    revealLeft:[...document.querySelectorAll('.reveal')].filter(e=>!e.classList.contains('in')).length,
    chVals:[...document.querySelectorAll('#chRail .cn-v')].filter(e=>e.textContent.trim()).length,
    wfLit:document.querySelectorAll('.wf-r.lit').length,
    lfOut:((document.getElementById('lfOut')||{}).textContent||'').includes('99 files'),
    adjChip:!!document.querySelector('#adjV .chip')}));
  const rmok=rm.revealLeft===0&&rm.chVals===10&&rm.lfOut&&rm.adjChip&&rm.wfLit===9&&e2.length===0;
  if(!rmok)fail++;
  console.log(`${rmok?'PASS':'FAIL'} reduced-motion  reveal-left=${rm.revealLeft} wf=${rm.wfLit}/9 chain=${rm.chVals}/10 lf=${rm.lfOut} adj=${rm.adjChip} errs=${e2.length}`);
  if(e2.length)console.log('   errors: '+e2.join(' | '));

  // reader modal
  await pg.evaluate(()=>{window.scrollTo(0,0);document.querySelector('.ins-card').click();});
  await pg.waitForTimeout(500);
  const rd=await pg.evaluate(()=>({open:document.getElementById('reader').classList.contains('open'),
    len:document.getElementById('readerBody').textContent.length}));
  const rdok=rd.open&&rd.len>1500;
  if(!rdok)fail++;
  console.log(`${rdok?'PASS':'FAIL'} insight reader  open=${rd.open} chars=${rd.len}`);
  await pg.close();

  await b.close();
  console.log(fail?`\n${fail} FAILING CHECK(S)`:'\nALL CHECKS PASS');
  process.exit(fail?1:0);
})();
