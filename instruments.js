/* VYUHA — site instruments.
   Every figure shown is either verified from the repository (layer names,
   module count, render output, precedence order) or an explicitly illustrative
   derivation. No measured coefficient values appear here. */
(function(){"use strict";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(i){return document.getElementById(i);}
function onView(el,fn,th){if(!el)return;
  var o=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){fn();o.unobserve(e.target);}});},{threshold:th||.3});
  o.observe(el);}
function vis(el){if(!el)return false;var r=el.getBoundingClientRect();
  return r.bottom>0&&r.top<innerHeight;}

/* ============================================================
   0 — THE AI FACTORY WORKFLOW
   Nine stages from board mandate to re-adjudication. Elapsed
   times are the enterprise pattern, labelled as such on the panel.
   ============================================================ */
(function(){
  var host=$("wfRows"),btn=$("wfBtn"),st=$("wfSt");
  if(!host) return;

  var W=[
    {n:"1",k:"MANDATE",q:"What are we committing to, by when, under whose law?",
     o:"board, CIO",t:"a slide and a date",c:0,v:"the constraints the solver is handed"},
    {n:"2",k:"DEMAND",q:"Which workloads, which models, what token profile, what SLO?",
     o:"AI platform",t:"spreadsheet &middot; weeks",c:0,v:"workload genome, versioned, agentic fan-out carried as a distribution"},
    {n:"3",k:"SIZING",q:"How much silicon, of which generation, in what topology?",
     o:"solution architect",t:"spreadsheet &middot; weeks",c:0,v:"kernel solve from dated coefficients; refuses on an undated one"},
    {n:"4",k:"SITING",q:"Where can it physically go, energized when, under whose jurisdiction?",
     o:"data centre, procurement",t:"a different spreadsheet &middot; weeks",c:0,v:"same solve, continued &mdash; answers in kilowatts, months and exclusions"},
    {n:"5",k:"STRUCTURE",q:"Buy, lease, colo, neocloud or hybrid &mdash; capex or opex?",
     o:"CFO, procurement",t:"business case &middot; weeks",c:0,v:"Pareto set, each option carrying what it surrenders"},
    {n:"6",k:"BUILD",q:"Bare metal through to day-two operations.",
     o:"infrastructure engineering",t:"bespoke project &middot; months",c:1,v:"ten GitOps layers rendered from one declarative file"},
    {n:"7",k:"ADMIT",q:"What may run, who may run it, and where may data go?",
     o:"security, compliance",t:"policy documents &middot; ad hoc",c:1,v:"egress decided per call on declared, asserted and recorded inputs"},
    {n:"8",k:"ACCOUNT",q:"Who consumed what, at what unit cost?",
     o:"FinOps",t:"showback &middot; contested",c:1,v:"attribution with bands where telemetry cannot be exact"},
    {n:"9",k:"RE-ADJUDICATE",q:"Is the decision still the right one?",
     o:"nobody",t:"does not happen",c:0,v:"new supply-graph snapshot, same solve, a dated diff against the last one",
     gap:true}
  ];

  host.innerHTML=W.map(function(x){
    return '<div class="wf-r'+(x.gap?" gap":"")+'">'+
      '<span class="wf-n">'+x.n+'</span>'+
      '<span class="wf-q"><i>'+x.k+'</i>'+x.q+'</span>'+
      '<span class="wf-o">'+x.o+'</span>'+
      '<span class="wf-t">'+x.t+
        '<i class="'+(x.c?"has":"non")+'">'+(x.c?"platform category exists":"no software")+'</i></span>'+
      '<span class="wf-v">'+x.v+'</span></div>';}).join("");

  var rowsEl=[].slice.call(host.querySelectorAll(".wf-r")),timers=[];
  function run(){
    timers.forEach(clearTimeout); timers=[];
    rowsEl.forEach(function(r){r.classList.remove("on");r.classList.remove("lit");});
    st.textContent="TRACING"; st.className="st mono";
    var step=reduce?0:260;
    rowsEl.forEach(function(r,i){
      timers.push(setTimeout(function(){ r.classList.add("on"); },200+i*step));
    });
    /* second sweep lights the VYUHA column */
    var after=200+rowsEl.length*step+(reduce?0:420);
    rowsEl.forEach(function(r,i){
      timers.push(setTimeout(function(){
        r.classList.add("lit");
        if(i===rowsEl.length-1){ st.textContent="STAGE 9 HAS NO OWNER"; st.className="st mono bad"; }
      },after+i*(reduce?0:150)));
    });
  }
  btn.addEventListener("click",run);
  onView($("wf"),run,.15);
})();

/* ============================================================
   1 — THE DERIVATION CHAIN
   ============================================================ */
(function(){
  var rail=$("chRail"),out=$("chOut"),btn=$("chBtn"),st=$("chSt");
  if(!rail) return;

  var N=[
    {l:"token<br>profile",      v:"2.4k / 310"},
    {l:"KV<br>geometry",        v:"160 KiB/tok"},
    {l:"HBM<br>resident",       v:"98 GiB"},
    {l:"decode<br>throughput",  v:"2.6k tok/s"},
    {l:"accelerator<br>count",  v:"160 devices"},
    {l:"power<br>envelope",     v:"308 kW"},
    {l:"rack<br>count",         v:"7 racks"},
    {l:"energization<br>date",  v:"Q3 2027"},
    {l:"jurisdictional<br>admissibility", v:"2 of 5"},
    {l:"Pareto set<br>of placements", v:"2 placements"}
  ];
  var LOG=[
    ['Claims triage, 70B class, FP8. <span class="g">180k user actions/hour</span> at peak.',
     '<span class="m">  agentic fan-out applied: 2.05M inferences/hour, not 180k.</span>'],
    ['GQA, 80 layers, 8 KV heads. <span class="g">160 KiB of KV per token</span>, FP8.',
     '<span class="m">  geometry read from the generation table, not interpolated.</span>'],
    ['70 GiB weights + 28 GiB KV at 64-way concurrency = <span class="g">98 GiB resident</span>.',
     '<span class="m">  two devices minimum. The memory floor is geometry, not a guess.</span>'],
    ['Decode is bandwidth-bound: <span class="g">2.6k output tok/s</span> per replica.',
     '<span class="m">  coefficient dated. An undated coefficient would halt here.</span>'],
    ['176.7k tok/s required at peak &rarr; 68 replicas &rarr; <span class="g">160 devices</span>.',
     '<span class="m">  20 nodes of 8. Headroom carried explicitly, not assumed.</span>'],
    ['204 kW IT + fabric, storage, management &rarr; <span class="g">308 kW facility</span>.',
     '<span class="m">  this is the link every sizing tool stops short of.</span>'],
    ['At this facility’s usable rack density: <span class="g">7 racks</span>, 5 compute + 2 fabric.',
     ''],
    ['308 kW must be energized by <span class="g">Q3 2027</span>.',
     '<span class="bad">  3 of 5 candidate placements excluded here. Announced ≠ rentable.</span>'],
    ['ITAR scope and data residency arbitrated at LEGALITY.',
     '<span class="bad">  1 further candidate excluded. The cheapest one. Cost did not enter.</span>'],
    ['<span class="ok">2 admissible placements</span>, each with what it surrenders.',
     '<span class="m">  snapshot sg-2026-11-20. Replays bit-identically.</span>']
  ];

  rail.innerHTML=N.map(function(n){
    return '<div class="cn"><span class="cn-d"></span><span class="cn-l">'+n.l+
           '</span><span class="cn-v"></span></div>';}).join("");
  var cells=[].slice.call(rail.querySelectorAll(".cn"));

  var timers=[],running=false;
  function clearAll(){timers.forEach(clearTimeout);timers=[];
    cells.forEach(function(c){c.className="cn";
      c.querySelector(".cn-v").textContent="";});}

  function run(){
    if(running) return; running=true; clearAll();
    out.innerHTML=""; st.textContent="DERIVING"; st.className="st mono";
    var step=reduce?0:760;
    N.forEach(function(n,i){
      timers.push(setTimeout(function(){
        if(i>0) cells[i-1].className="cn done";
        cells[i].className="cn on"+(i===7||i===8?" stop":"");
        cells[i].querySelector(".cn-v").innerHTML=n.v;
        LOG[i].forEach(function(line){ if(line) out.innerHTML+=line+"\n"; });
        out.scrollTop=out.scrollHeight;
        if(i===N.length-1){
          cells[i].className="cn done";
          st.textContent="2 ADMISSIBLE"; st.className="st mono ok";
          running=false;
        }
      },300+i*step));
    });
  }
  btn.addEventListener("click",run);
  onView($("ch"),run,.25);
})();

/* ============================================================
   2 — THREE-VALUED ADJUDICATION
   Precedence verified in backend/tests/lab: LEGALITY > PHYSICS >
   DELIVERABILITY > ECONOMICS > PREFERENCE, arbitrated not summed.
   ============================================================ */
(function(){
  var pre=$("adjPre"),rows=$("adjRows"),vbox=$("adjV"),btn=$("adjBtn"),st=$("adjSt"),nm=$("adjName");
  if(!rows) return;

  var CLASSES=["LEGALITY","PHYSICS","DELIVERABILITY","ECONOMICS","PREFERENCE"];

  var CAND=[
    {name:"candidate A &middot; domestic campus, confirmed interconnection",
     checks:[
       {c:0,n:"data residency &mdash; regulated records",v:"PASS"},
       {c:0,n:"export control scope &mdash; ITAR",v:"PASS"},
       {c:1,n:"power envelope 308 kW",v:"PASS"},
       {c:1,n:"fabric topology &amp; rail alignment",v:"PASS"},
       {c:2,n:"energized by Q3 2027",v:"PASS"},
       {c:2,n:"silicon available at quantity",v:"PASS"},
       {c:3,n:"blended 36-month cost",v:"PASS"},
       {c:4,n:"operator preference",v:"PASS"}],
     decide:4,verdict:"PASS",chip:"pass",
     why:"Admissible. It is not the cheapest candidate in the set, and the set it is being compared against is only the candidates that closed at all."},

    {name:"candidate B &middot; offshore campus, 31% lower blended cost",
     checks:[
       {c:0,n:"data residency &mdash; regulated records",v:"VIOLATION"},
       {c:0,n:"export control scope &mdash; ITAR",v:"VIOLATION"},
       {c:1,n:"power envelope 308 kW",v:"PASS"},
       {c:1,n:"fabric topology &amp; rail alignment",v:"PASS"},
       {c:2,n:"energized by Q3 2027",v:"PASS"},
       {c:2,n:"silicon available at quantity",v:"PASS"},
       {c:3,n:"blended 36-month cost",v:"PASS"},
       {c:4,n:"operator preference",v:"PASS"}],
     decide:0,verdict:"VIOLATION",chip:"viol",
     why:"Excluded at LEGALITY. The 31% cost advantage is never evaluated, because there is no score anywhere in the engine on which a cost saving and a residency breach could be traded."},

    {name:"candidate C &middot; domestic campus, interconnection study open",
     checks:[
       {c:0,n:"data residency &mdash; regulated records",v:"PASS"},
       {c:0,n:"export control scope &mdash; ITAR",v:"UNEVALUABLE"},
       {c:1,n:"power envelope 308 kW",v:"PASS"},
       {c:1,n:"fabric topology &amp; rail alignment",v:"PASS"},
       {c:2,n:"energized by Q3 2027",v:"UNEVALUABLE"},
       {c:2,n:"silicon available at quantity",v:"PASS"},
       {c:3,n:"blended 36-month cost",v:"PASS"},
       {c:4,n:"operator preference",v:"PASS"}],
     decide:0,verdict:"UNEVALUABLE",chip:"unev",
     why:"Two checks could not be evaluated, so neither passed. Personnel-screening scope is a determination for an empowered official; the interconnection study is incomplete. Both clear when recorded with who determined it, when, and in what scope &mdash; never by a flag."}
  ];

  pre.innerHTML=CLASSES.map(function(c,i){
    return '<div class="adj-step" data-c="'+i+'">'+(i+1)+'. '+c+'</div>';}).join("");
  var steps=[].slice.call(pre.querySelectorAll(".adj-step"));

  var idx=-1,timers=[],busy=false;
  function clearAll(){timers.forEach(clearTimeout);timers=[];
    steps.forEach(function(s){s.className="adj-step";});}

  function render(k){
    if(busy) return; busy=true; clearAll();
    var C=CAND[k];
    rows.innerHTML=C.checks.map(function(x){
      return '<div class="adj-r" data-c="'+x.c+'"><span class="nm">'+x.n+
             '</span><span class="vd">pending</span></div>';}).join("");
    var rr=[].slice.call(rows.querySelectorAll(".adj-r"));
    nm.innerHTML="ADJUDICATION &middot; "+C.name.toUpperCase();
    vbox.innerHTML='<span class="mono" style="color:#79839F;font-size:11px">arbitrating\u2026</span>';
    st.textContent="ARBITRATING"; st.className="st mono";

    var gap=reduce?0:560,shown=0;
    CLASSES.forEach(function(_,ci){
      if(ci>C.decide) return;
      timers.push(setTimeout(function(){
        steps.forEach(function(s){s.classList.remove("on");});
        steps[ci].classList.add("on");
        var hit=false;
        rr.forEach(function(r){
          if(+r.dataset.c!==ci) return;
          var x=C.checks[rr.indexOf(r)];
          r.classList.add("lit");
          var vd=r.querySelector(".vd");
          vd.textContent=x.v.toLowerCase();
          vd.className="vd "+(x.v==="PASS"?"pass":x.v==="VIOLATION"?"viol":"unev");
          if(x.v!=="PASS") hit=true;
        });
        steps[ci].classList.remove("on");
        steps[ci].classList.add(hit?"hit":"pass");
        shown++;
        if(ci===C.decide){
          timers.push(setTimeout(function(){
            vbox.innerHTML='<span class="chip '+C.chip+'">'+C.verdict+'</span>'+
                           '<span class="adj-why">'+C.why+'</span>';
            st.textContent=C.verdict;
            st.className="st mono "+(C.chip==="pass"?"ok":C.chip==="viol"?"bad":"");
            busy=false;
          },reduce?0:420));
        }
      },260+ci*gap));
    });
    if(C.decide<CLASSES.length-1){
      timers.push(setTimeout(function(){
        for(var i=C.decide+1;i<CLASSES.length;i++)
          steps[i].style.opacity=".4";
      },260+(C.decide+1)*gap));
    } else { steps.forEach(function(s){s.style.opacity="";}); }
  }
  function next(){ steps.forEach(function(s){s.style.opacity="";});
    idx=(idx+1)%CAND.length; render(idx); }
  btn.addEventListener("click",next);
  onView($("adj"),next,.25);
})();

/* ============================================================
   3 — ENERGIZATION GATE
   ============================================================ */
(function(){
  var grid=$("enGrid"),btn=$("enBtn"),st=$("enSt");
  if(!grid) return;

  var SCALE=30, NEED=10;   /* months from now */
  var S=[
    {n:"domestic campus A",s:"confirmed interconnection",m:6, conf:true, v:"ADMISSIBLE",k:"in"},
    {n:"domestic campus B",s:"announced, not confirmed", m:8, conf:false,v:"EXCLUDED", k:"out"},
    {n:"offshore campus C", s:"confirmed interconnection",m:9, conf:true, v:"ADMISSIBLE",k:"in"},
    {n:"domestic colo D",   s:"confirmed, queue position 41",m:25,conf:true,v:"EXCLUDED",k:"out"},
    {n:"domestic campus E", s:"study incomplete",         m:0, conf:false,v:"UNEVALUABLE",k:""}
  ];

  grid.innerHTML=S.map(function(x){
    return '<div class="en-row"><span class="site">'+x.n+'<i>'+x.s+'</i></span>'+
      '<span class="en-bar"><span class="en-fill'+(x.conf?" conf":"")+'"></span>'+
      '<span class="en-need" style="left:'+(NEED/SCALE*100)+'%"></span></span>'+
      '<span class="vd">pending</span></div>';}).join("")+
    '<div class="en-row en-axis"><span class="site"></span><span class="en-bar en-ticks">'+
      [0,6,12,18,24,30].map(function(m){return '<i style="left:'+(m/SCALE*100)+'%">'+
        (m?"+"+m+"mo":"now")+'</i>';}).join("")+
    '</span><span class="vd"></span></div>';

  var fills=[].slice.call(grid.querySelectorAll(".en-fill")),
      vds=[].slice.call(grid.querySelectorAll(".en-row:not(.en-axis) .vd")),
      timers=[];

  function run(){
    timers.forEach(clearTimeout); timers=[];
    st.textContent="GATING"; st.className="st mono";
    fills.forEach(function(f){f.style.width="0";});
    vds.forEach(function(v){v.textContent="pending";v.className="vd";});
    S.forEach(function(x,i){
      timers.push(setTimeout(function(){
        fills[i].style.width=(x.m?Math.min(100,x.m/SCALE*100):4)+"%";
        timers.push(setTimeout(function(){
          vds[i].textContent=x.v.toLowerCase();
          vds[i].className="vd "+x.k;
          if(i===S.length-1){ st.textContent="2 OF 5 ADMISSIBLE"; st.className="st mono bad"; }
        },reduce?0:760));
      },200+i*(reduce?0:300)));
    });
  }
  btn.addEventListener("click",run);
  onView($("en"),run,.25);
})();

/* ============================================================
   4 — AGENT AMPLIFICATION
   Illustrative fan-out draw. The architectural claim is that the
   quantity is a distribution, not that it has a particular mean.
   ============================================================ */
(function(){
  var A=$("ampA"),B=$("ampB"),DA=$("ampDA"),DB=$("ampDB"),
      R=$("ampRatio"),btn=$("ampBtn"),st=$("ampSt");
  if(!A) return;

  function draw(){ /* skewed: planning turns + tools + retries + summarise */
    var plan=2+Math.floor(Math.random()*3),
        tools=2+Math.floor(Math.random()*7),
        retry=Math.random()<.38?1+Math.floor(Math.random()*3):0,
        sub=Math.random()<.3?3+Math.floor(Math.random()*6):0;
    return plan+tools*2+retry+sub+1;
  }
  function dots(host,n,cls,done){
    host.innerHTML="";
    var i,els=[];
    for(i=0;i<n;i++){var d=document.createElement("span");
      d.className="amp-dot"+(cls&&i%3===1?" tool":"");host.appendChild(d);els.push(d);}
    if(reduce){els.forEach(function(d){d.classList.add("on");});if(done)done();return;}
    els.forEach(function(d,j){setTimeout(function(){d.classList.add("on");
      if(j===els.length-1&&done)done();},j*52);});
  }
  var t=[];
  function run(){
    t.forEach(clearTimeout); t=[];
    var n=draw();
    st.textContent="SAMPLING"; st.className="st mono";
    A.textContent="1"; B.textContent="0"; R.innerHTML="&mdash;";
    dots(DA,1,false,null);
    var c=0,iv=null;
    dots(DB,n,true,function(){
      st.textContent=n+"×"; st.className="st mono bad";
      R.innerHTML='this draw: <span style="color:#F7B948">'+n+'×</span> &nbsp;&middot;&nbsp; '+
        'fan-out is a distribution, so an estate is sized against a tail, not a mean';
    });
    iv=setInterval(function(){ c+=Math.max(1,Math.ceil(n/14));
      if(c>=n){c=n;clearInterval(iv);} B.textContent=c; },reduce?0:52);
    if(reduce){clearInterval(iv);B.textContent=n;}
  }
  btn.addEventListener("click",run);
  onView($("amp"),run,.3);
})();

/* ============================================================
   5 — LAB FABRIC STACK
   Layers and descriptions are the repository's own module table.
   Render output verified: 99 files written to ./lab-repo.
   ============================================================ */
(function(){
  var host=$("lfStack"),out=$("lfOut"),btn=$("lfBtn"),st=$("lfSt");
  if(!host) return;

  var L=[
    {l:"L0",m:"vyuha-infra",   d:"machine pools, validated OS image, RDMA fabric, facility access control"},
    {l:"L1",m:"vyuha-cluster", d:"OpenShift or Kubernetes, CNI with Multus, storage classes, Argo CD app-of-apps"},
    {l:"L2",m:"vyuha-nvidia",  d:"GPU Operator, driver, toolkit, device plugin, MIG manager, DCGM, NIM"},
    {l:"L3",m:"vyuha-tenancy", d:"per-tenant namespace, quota, default-deny network policy, RBAC, priority class"},
    {l:"L4",m:"vyuha-govern",  d:"admission policy, hash-chained audit ledger, image policy, personnel control"},
    {l:"L5",m:"vyuha-meter",   d:"consumption pipeline, chargeback or showback statement with attribution bands"},
    {l:"L6",m:"vyuha-portal",  d:"developer portal, instance-shape catalog, approval and quota flow"}
  ];
  var X=[
    {m:"vyuha-blueprint",d:"the declarative definition, its parser and the reconciler"},
    {m:"vyuha-serving",  d:"blueprint joined to the sizing kernel — which models, on which harness, within this lab"},
    {m:"vyuha-gateway",  d:"the per-inference-call egress decision, hash-chained"}
  ];

  host.innerHTML=L.map(function(x){
    return '<div class="lf-l"><span class="ly">'+x.l+'</span><span class="mo">'+x.m+
           '</span><span class="d">'+x.d+'</span></div>';}).join("")+
    X.map(function(x){
    return '<div class="lf-l"><span class="ly">&mdash;</span><span class="mo">'+x.m+
           '</span><span class="d">'+x.d+'</span></div>';}).join("");

  var rowsEl=[].slice.call(host.querySelectorAll(".lf-l")),timers=[];
  /* column-reverse: L0 renders at the bottom, so animate in DOM order */
  function run(){
    timers.forEach(clearTimeout); timers=[];
    rowsEl.forEach(function(r){r.classList.remove("on");});
    out.innerHTML=""; st.textContent="RECONCILING"; st.className="st mono";
    rowsEl.forEach(function(r,i){
      timers.push(setTimeout(function(){
        r.classList.add("on");
        if(i===rowsEl.length-1){
          timers.push(setTimeout(function(){
            out.innerHTML='<b>99 files written to ./lab-repo</b> &nbsp;&middot;&nbsp; '+
              'Terraform, manifests, pinned Helm values, Argo app-of-apps &nbsp;&middot;&nbsp; '+
              'second reconciler pass empty';
            st.textContent="CONVERGED"; st.className="st mono ok";
          },reduce?0:420));
        }
      },240+i*(reduce?0:300)));
    });
  }
  btn.addEventListener("click",run);
  onView($("lf"),run,.2);
})();
})();
