/* =========================================================================
   THE HANGOVER — Thaïlande 2026 · interactions
   Chaque bloc est indépendant : si un élément n'existe pas, il est ignoré.
   ========================================================================= */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
root.classList.add('js');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(hover: hover) and (pointer: fine)').matches;
const RATE=38; // 1 € ≈ 38 ฿ (taux de travail, pas un taux garanti)
const fmt=n=>Math.round(n).toLocaleString('fr-FR');

/* ---------- Toast ---------- */
const toastEl=$('#toast');let toastTimer;
function toast(msg,ms=2600){if(!toastEl)return;toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),ms);}

/* ---------- Confettis ---------- */
function confetti(n=70){
  if(reduced)return;
  const colors=['#b9673d','#e2c48a','#b8c6a9','#3f7f7a','#f4efe6','#c0874d'];
  for(let i=0;i<n;i++){
    const c=document.createElement('span');c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[i%colors.length];
    c.style.setProperty('--x',(Math.random()*240-120)+'px');
    c.style.setProperty('--r',(Math.random()*1080-540)+'deg');
    c.style.setProperty('--t',(2+Math.random()*1.8)+'s');
    c.style.animationDelay=(Math.random()*.4)+'s';
    document.body.appendChild(c);setTimeout(()=>c.remove(),4600);
  }
}

/* ---------- En-tête, progression, menu ---------- */
const hdr=$('#hdr'),bar=$('#progress-bar');let lastY=scrollY;
function onScroll(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  if(bar)bar.style.transform=`scaleX(${h>0?y/h:0})`;
  if(hdr){
    hdr.classList.toggle('scrolled',y>40);
    const hide=y>500&&y>lastY+2&&!document.body.classList.contains('menu-open');
    if(y<lastY-2||y<500){hdr.classList.remove('hide');document.body.classList.remove('hdr-hidden');}
    else if(hide){hdr.classList.add('hide');document.body.classList.add('hdr-hidden');}
  }
  lastY=y;
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

const menuBtn=$('#menu-btn'),menu=$('#menu');
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  menuBtn?.setAttribute('aria-expanded',String(open));
  menuBtn?.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  if(menu){menu.setAttribute('aria-hidden',String(!open));menu.inert=!open;}
}
if(menu)menu.inert=true;
menuBtn?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
$$('#menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});

/* Lien actif dans la navigation */
const navLinks=$$('.hdr-nav a');
if('IntersectionObserver' in window&&navLinks.length){
  const map=new Map(navLinks.map(a=>[a.getAttribute('href').slice(1),a]));
  const io=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){navLinks.forEach(a=>a.classList.remove('active'));map.get(en.target.id)?.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});
  map.forEach((a,id)=>{const s=document.getElementById(id);if(s)io.observe(s);});
}

/* ---------- Apparitions + compteurs ---------- */
function countUp(el){
  const end=Number(el.dataset.count);if(reduced||!end){el.textContent=end;return;}
  const t0=performance.now(),dur=1400;
  (function step(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(end*e);if(p<1)requestAnimationFrame(step);})(t0);
}
if('IntersectionObserver' in window&&!reduced){
  const io=new IntersectionObserver(entries=>{entries.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('in');$$('[data-count]',en.target).forEach(countUp);io.unobserve(en.target);});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  $$('.reveal,.reveal-img').forEach(el=>io.observe(el));
}else{$$('.reveal,.reveal-img').forEach(el=>el.classList.add('in'));}

/* ---------- Parallaxe de la couverture ---------- */
const heroBg=$('.hero-bg');
if(heroBg&&!reduced){addEventListener('scroll',()=>{const y=scrollY;if(y<innerHeight*1.2)heroBg.style.transform=`translate3d(0,${y*.28}px,0)`;},{passive:true});}

/* ---------- Effets souris : inclinaison, magnétisme, curseur ---------- */
if(finePointer&&!reduced){
  $$('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--ry',(x*14)+'deg');el.style.setProperty('--rx',(-y*14)+'deg');});
    el.addEventListener('mouseleave',()=>{el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg');});
  });
  $$('[data-magnetic]').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.32}px)`;});
    el.addEventListener('mouseleave',()=>{el.style.transform='';});
  });
  const cur=$('.cursor'),ring=$('.cursor-ring'),dot=$('.cursor-dot');
  if(cur){
    document.body.classList.add('has-cursor');
    let mx=-100,my=-100,rx=-100,ry=-100;
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate3d(${mx}px,${my}px,0)`;cur.classList.remove('hidden');},{passive:true});
    (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;requestAnimationFrame(loop);})();
    document.addEventListener('mouseover',e=>{const t=e.target;cur.classList.toggle('view',!!t.closest('[data-zoom]'));cur.classList.toggle('hover',!t.closest('[data-zoom]')&&!!t.closest('a,button,label,summary,input,[role="tab"]'));});
    document.addEventListener('mousedown',()=>cur.classList.add('down'));
    document.addEventListener('mouseup',()=>cur.classList.remove('down'));
    document.addEventListener('mouseleave',()=>cur.classList.add('hidden'));
  }
}

/* ---------- Effet d'onde au clic ---------- */
document.addEventListener('pointerdown',e=>{
  const el=e.target.closest('.btn,.filter,.stepper button,.food-tabs button,.map-stop,.copy');if(!el||reduced)return;
  const r=el.getBoundingClientRect(),s=Math.max(r.width,r.height)*2.2,sp=document.createElement('span');
  sp.className='ripple';sp.style.width=sp.style.height=s+'px';sp.style.left=(e.clientX-r.left-s/2)+'px';sp.style.top=(e.clientY-r.top-s/2)+'px';
  if(getComputedStyle(el).position==='static')el.style.position='relative';
  el.style.overflow='hidden';el.appendChild(sp);setTimeout(()=>sp.remove(),700);
});

/* ---------- Compte à rebours, mode « Jour J », horloges ---------- */
const ARRIVAL=new Date('2026-12-07T00:00:00+07:00').getTime(); // minuit, heure thaïlandaise
const END=new Date('2026-12-23T00:00:00+07:00').getTime();
const PLACES={phuket:'Phuket',khaolak:'Khao Lak',chiangmai:'Chiang Mai',bangkok:'Bangkok'};
const thaiDate=d=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
const fmtFR=new Intl.DateTimeFormat('fr-FR',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Paris'});
const fmtTH=new Intl.DateTimeFormat('fr-FR',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Bangkok'});
const cd={d:$('#count-days'),h:$('#count-hours'),m:$('#count-minutes'),s:$('#count-seconds')};
function setUnit(el,v){if(!el)return;const t=String(v).padStart(2,'0');if(el.textContent!==t){el.textContent=t;if(!reduced){el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick');}}}
let lastToday='';
function markToday(){
  const today=thaiDate(new Date());if(today===lastToday)return;lastToday=today;
  $$('.day').forEach(d=>d.classList.toggle('is-today',d.dataset.date===today));
}
function updateCount(){
  const now=Date.now(),strip=$('#compte');
  const fr=$('#clock-fr'),th=$('#clock-th');if(fr)fr.textContent=fmtFR.format(now);if(th)th.textContent=fmtTH.format(now);
  if(now<ARRIVAL){
    const left=ARRIVAL-now;
    setUnit(cd.d,Math.floor(left/864e5));setUnit(cd.h,Math.floor(left%864e5/36e5));setUnit(cd.m,Math.floor(left%36e5/6e4));setUnit(cd.s,Math.floor(left%6e4/1e3));
    return;
  }
  strip?.classList.add('on-trip');$('#count-trip')?.removeAttribute('hidden');markToday();
  const kicker=$('#count-kicker'),title=$('#count-title'),fill=$('#trip-fill'),link=$('#trip-today-link');
  if(now<END){
    const day=Math.min(16,Math.floor((now-ARRIVAL)/864e5)+1);
    const todayEl=$('.day.is-today');const place=todayEl?PLACES[todayEl.dataset.place]:'';
    if(kicker)kicker.textContent=`Jour ${day} / 16${place?' · '+place:''}`;
    if(title)title.innerHTML='On y est. <em>Profitez.</em>';
    if(fill)fill.style.width=(day/16*100)+'%';
  }else{
    if(kicker)kicker.textContent='Voyage terminé';
    if(title)title.innerHTML='Ce qui s\'est passé en Thaïlande… <em>reste ici.</em>';
    if(fill)fill.style.width='100%';
    if(link){link.textContent='Revoir le programme →';}
  }
}
updateCount();setInterval(updateCount,1000);
$('#trip-today-link')?.addEventListener('click',e=>{const t=$('.day.is-today');if(!t)return;e.preventDefault();applyFilter('all');t.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});t.querySelector('details')?.setAttribute('open','');});

/* ---------- Programme : filtres, déplier, rail ---------- */
const filters=$$('.filter[data-filter]'),days=$$('.day');
function applyFilter(f){
  filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===f));
  days.forEach(d=>{const show=f==='all'||d.dataset.place===f;d.hidden=!show;if(show)d.classList.add('in');});
  updateRail();
}
filters.forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.filter)));
$$('[data-show-days]').forEach(a=>a.addEventListener('click',()=>applyFilter(a.dataset.showDays)));
const expandBtn=$('#expand-all');
expandBtn?.addEventListener('click',()=>{const open=expandBtn.getAttribute('aria-pressed')!=='true';expandBtn.setAttribute('aria-pressed',String(open));expandBtn.textContent=open?'Tout replier':'Tout déplier';$$('.day-details').forEach(d=>d.open=open);updateRail();});

/* Ouverture/fermeture animée des détails */
$$('.day-details').forEach(det=>{
  const sum=det.querySelector('summary'),body=det.querySelector('.day-detail-content');
  sum?.addEventListener('click',e=>{
    if(reduced||!body||!body.animate)return;
    e.preventDefault();
    if(det.open){const h=body.offsetHeight;body.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:380,easing:'cubic-bezier(.2,.75,.2,1)'}).onfinish=()=>{det.open=false;updateRail();};}
    else{det.open=true;const h=body.offsetHeight;body.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:480,easing:'cubic-bezier(.2,.75,.2,1)'});}
  });
});

const timeline=$('#timeline'),rail=$('#timeline-fill');
function updateRail(){
  if(!timeline||!rail)return;
  const r=timeline.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));
  rail.style.setProperty('--p',p.toFixed(4));
}
addEventListener('scroll',updateRail,{passive:true});addEventListener('resize',updateRail);updateRail();

/* ---------- Photos : secours si une image ne charge pas ---------- */
const FALLBACK='https://images.unsplash.com/photo-1713361060470-50510cc39729?auto=format&fit=crop&w=1000&q=75';
$$('img').forEach(img=>{
  const fail=()=>{if(img.dataset.fallbackUsed){img.style.visibility='hidden';return;}img.dataset.fallbackUsed='1';img.src=FALLBACK;};
  img.addEventListener('error',fail);
  if(img.complete&&img.naturalWidth===0&&img.getAttribute('src'))fail();
});

/* ---------- Galerie plein écran ---------- */
(function(){
  const lb=document.createElement('div');lb.className='lightbox';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo agrandie');
  lb.innerHTML='<button type="button" class="lb-btn lb-close" aria-label="Fermer">✕</button><button type="button" class="lb-btn lb-prev" aria-label="Photo précédente">←</button><img alt=""><p></p><button type="button" class="lb-btn lb-next" aria-label="Photo suivante">→</button>';
  document.body.appendChild(lb);
  const big=$('img',lb),cap=$('p',lb);let list=[],idx=0,lastFocus=null;
  // Chaque photo appartient à un groupe : la galerie ne fait défiler que les photos du même groupe
  // (une étape, les journées d'une même étape, les plats…), jamais tout le site.
  const NAMES={phuket:'Phuket',khaolak:'Khao Lak',chiangmai:'Chiang Mai',bangkok:'Bangkok'};
  function groupOf(img){
    const stage=img.closest('.stage');if(stage)return{key:'stage:'+stage.id,label:NAMES[stage.id.replace('fiche-','')]||''};
    const day=img.closest('.day');if(day)return{key:'day:'+day.dataset.place,label:(NAMES[day.dataset.place]||'')+' · jour après jour'};
    const stay=img.closest('.stay');if(stay)return{key:'stay:'+stay.id,label:'Hébergement'};
    if(img.closest('.dish'))return{key:'dishes',label:'Bouffe du coin'};
    return{key:'solo:'+$$('[data-zoom]').indexOf(img),label:''};
  }
  let label='';
  const visible=img=>{const k=groupOf(img).key;return $$('[data-zoom]').filter(i=>i.offsetParent!==null&&groupOf(i).key===k);};
  function show(i){idx=(i+list.length)%list.length;const im=list[idx];big.src=im.currentSrc||im.src;big.alt=im.alt;cap.innerHTML='';cap.append(im.alt||'Photo du voyage');if(list.length>1||label){const s=document.createElement('small');s.textContent=[label,list.length>1?`${idx+1} / ${list.length}`:''].filter(Boolean).join(' · ');cap.append(s);}}
  function open(img){list=visible(img);if(!list.length)list=[img];label=groupOf(img).label;lb.classList.toggle('lb-single',list.length<2);lastFocus=document.activeElement;show(Math.max(0,list.indexOf(img)));lb.classList.add('open');document.body.classList.add('lightbox-open');$('.lb-close',lb).focus();}
  function close(){lb.classList.remove('open');document.body.classList.remove('lightbox-open');lastFocus?.focus?.();}
  $$('[data-zoom]').forEach(img=>{
    img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Agrandir : '+(img.alt||'photo'));
    img.addEventListener('click',e=>{e.preventDefault();open(img);});
    img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img);}});
  });
  $('.lb-close',lb).addEventListener('click',close);
  $('.lb-prev',lb).addEventListener('click',()=>show(idx-1));
  $('.lb-next',lb).addEventListener('click',()=>show(idx+1));
  lb.addEventListener('click',e=>{if(e.target===lb)close();});
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);});
  let sx=null;lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(idx+(dx<0?1:-1));sx=null;});
})();

/* ---------- Copier l'adresse ---------- */
async function copyText(t){
  try{await navigator.clipboard.writeText(t);return true;}
  catch(e){const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy');}catch(_){}ta.remove();return ok;}
}
$$('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const ok=await copyText(b.dataset.copy);
  b.textContent=ok?'Copié ✓':'Échec';b.classList.toggle('done',ok);
  if(ok)toast('Adresse copiée : prête à coller dans Grab ou à montrer au chauffeur.');
  setTimeout(()=>{b.textContent='Copier';b.classList.remove('done');},2200);
}));

/* ---------- Carte interactive ---------- */
(function(){
  const el=$('#travel-map');if(!el)return;
  if(!window.L){el.innerHTML='<p class="map-fallback">La carte nécessite une connexion internet pour charger OpenStreetMap.</p>';return;}
  const places=[
    {name:'Phuket · Rawai',coords:[7.78,98.32],label:'7–11 décembre · 4 nuits',hotel:'Blue Palm Seafront Resort',c:'#3f7f7a',zoom:11},
    {name:'Khao Lak',coords:[8.70,98.25],label:'11–14 décembre · 3 nuits',hotel:'Khaolak Relax Resort',c:'#4f7f97',zoom:11},
    {name:'Chiang Mai · Hang Dong',coords:[18.70,98.93],label:'14–19 décembre · 5 nuits',hotel:'At Leaf Villa',c:'#7d8a52',zoom:11},
    {name:'Bangkok · Sukhumvit 71',coords:[13.72,100.60],label:'19–22 décembre · 3 nuits',hotel:'Somerset Sukhumvit 71',c:'#c0874d',zoom:12}
  ];
  const map=L.map(el,{scrollWheelZoom:false,dragging:!L.Browser.mobile,tap:false,zoomControl:true});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  const markers=places.map((p,i)=>{
    const icon=L.divIcon({className:'',html:`<div class="pin" style="--c:${p.c}">${String(i+1).padStart(2,'0')}</div>`,iconSize:[38,38],iconAnchor:[19,19],popupAnchor:[0,-18]});
    const m=L.marker(p.coords,{icon,title:p.name,keyboard:true}).addTo(map);
    m.bindPopup(`<strong>${p.name}</strong><br>${p.label}<br><span style="color:#7b8277">${p.hotel}</span>`);
    return m;
  });
  L.polyline(places.map(p=>p.coords),{color:'#b9673d',weight:4,opacity:1,className:'route-line'}).addTo(map);
  L.control.scale({imperial:false}).addTo(map);
  const bounds=L.latLngBounds(places.map(p=>p.coords));
  const fitAll=()=>map.fitBounds(bounds,{padding:[40,40]});
  fitAll();setTimeout(()=>{map.invalidateSize();fitAll();},400);
  const btns=$$('.map-stop');
  btns.forEach(b=>b.addEventListener('click',()=>{
    btns.forEach(x=>x.classList.toggle('active',x===b));
    if(b.dataset.stop==='all'){map.closePopup();reduced?fitAll():map.flyToBounds(bounds,{padding:[40,40],duration:1.2});return;}
    const i=Number(b.dataset.stop),p=places[i];
    reduced?map.setView(p.coords,p.zoom):map.flyTo(p.coords,p.zoom,{duration:1.4});
    setTimeout(()=>markers[i].openPopup(),reduced?0:1300);
  }));
})();

/* ---------- Calculateur de budget ---------- */
(function(){
  const input=$('#travellers-range'),count=$('#travellers-count'),eur=$('#calc-euros'),baht=$('#calc-baht'),pp=$('#calc-pp');
  const checks=$$('.calc-options input[type="checkbox"]');if(!input||!eur)return;
  let shown=[0,0];
  function animate(lo,hi){
    const from=shown.slice(),t0=performance.now(),dur=reduced?0:550;
    (function step(t){const p=dur?Math.min(1,(t-t0)/dur):1,e=1-Math.pow(1-p,3);const a=from[0]+(lo-from[0])*e,b=from[1]+(hi-from[1])*e;eur.textContent=`${fmt(a)}–${fmt(b)} €`;if(p<1)requestAnimationFrame(step);else shown=[lo,hi];})(t0);
  }
  function update(){
    const people=Math.min(6,Math.max(1,Number(input.value)||3));input.value=people;
    let lo=0,hi=0;checks.forEach(c=>{if(c.checked){lo+=Number(c.dataset.min||0);hi+=Number(c.dataset.max||0);}});
    count.textContent=people+' '+(people>1?'personnes':'personne');
    animate(lo*people/RATE,hi*people/RATE);
    baht.textContent=`${fmt(lo*people)}–${fmt(hi*people)} ฿`;
    if(pp)pp.textContent=`soit ${fmt(lo/RATE)}–${fmt(hi/RATE)} € par personne`;
  }
  $$('.stepper button').forEach(b=>b.addEventListener('click',()=>{input.value=Math.min(6,Math.max(1,Number(input.value)+Number(b.dataset.step)));update();}));
  checks.forEach(c=>c.addEventListener('change',update));update();
})();

/* ---------- Convertisseur € / ฿ ---------- */
(function(){
  const e=$('#conv-eur'),t=$('#conv-thb'),sw=$('#conv-swap');if(!e||!t)return;
  const round=v=>Math.round(v*100)/100;
  e.addEventListener('input',()=>{t.value=e.value===''?'':Math.round(Number(e.value)*RATE);});
  t.addEventListener('input',()=>{e.value=t.value===''?'':round(Number(t.value)/RATE);});
  const presets=[10,20,50,100,1];let k=0;
  sw?.addEventListener('click',()=>{sw.classList.toggle('spin');k=(k+1)%presets.length;e.value=presets[k];t.value=Math.round(presets[k]*RATE);});
})();

/* ---------- Bingo du voyage ---------- */
(function(){
  const cells=$$('#bingo button');if(cells.length!==16)return;
  const KEY='thehangover-bingo-v1';
  const LINES=[[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],[0,5,10,15],[3,6,9,12]];
  let state=Array(16).fill(false);
  try{const s=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(s))state=state.map((_,i)=>Boolean(s[i]));}catch(e){}
  let prevLines=-1;
  function render(celebrate){
    cells.forEach((c,i)=>c.setAttribute('aria-pressed',String(state[i])));
    const done=LINES.filter(l=>l.every(i=>state[i]));
    cells.forEach(c=>c.classList.remove('win'));done.flat().forEach(i=>cells[i].classList.add('win'));
    const n=state.filter(Boolean).length;
    $('#bingo-count').textContent=n;$('#bingo-lines').textContent=done.length;
    if(celebrate&&prevLines>=0&&done.length>prevLines){
      if(n===16){confetti(160);toast('Carton plein ! Légendes de la Thaïlande 🏆',3800);}
      else{confetti(80);toast('BINGO ! Une ligne : le dernier à avoir validé paie sa tournée 🍻',3600);}
    }
    prevLines=done.length;
  }
  cells.forEach((c,i)=>c.addEventListener('click',()=>{state[i]=!state[i];try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}render(true);}));
  $('#bingo-reset')?.addEventListener('click',()=>{if(!confirm('Remettre le bingo à zéro ?'))return;state=Array(16).fill(false);try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}render(false);});
  render(false);
})();

/* ---------- Lexique : cartes à retourner ---------- */
$$('.lex').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'))));

/* ---------- On mange quoi ce soir ? ---------- */
(function(){
  const btn=$('#picker-btn'),out=$('#picker-dish'),note=$('#picker-note'),porkEl=$('#picker-pork'),noPork=$('#picker-nopork');if(!btn||!out)return;
  // pork : 'non' = sans porc · 'option' = existe avec ou sans porc · 'oui' = le porc est l'ingrédient principal
  const ALL=[
    {n:'Pad thaï',pork:'option'},{n:'Khao soi',pork:'option'},{n:'Pad kra pao',pork:'option'},{n:'Tom yum goong',pork:'non'},
    {n:'Som tam',pork:'non'},{n:'Massaman curry',pork:'option'},{n:'Curry vert',pork:'option'},{n:'Khao man gai',pork:'non'},
    {n:'Gai yang (poulet grillé)',pork:'non'},{n:'Khao pad kung',pork:'non'},{n:'Moo ping & riz gluant',pork:'oui'},{n:'Moo kratha (barbecue thaï)',pork:'oui'},
    {n:'Pad see ew',pork:'option'},{n:'Fruits de mer grillés',pork:'non'},{n:'Mango sticky rice (en plat principal, on assume)',pork:'non'}
  ];
  const PORK={
    non:['pork-no','Sans porc'],
    option:['pork-maybe','Porc possible : demander « gai » (poulet) ou « kung » (crevettes)'],
    oui:['pork-yes','Contient du porc']
  };
  const KEY='thehangover-sansporc';
  try{noPork.checked=localStorage.getItem(KEY)==='1';}catch(e){}
  noPork?.addEventListener('change',()=>{try{localStorage.setItem(KEY,noPork.checked?'1':'0');}catch(e){}toast(noPork.checked?'Tirage sans porc activé 👍':'Tirage avec tous les plats');});
  let dishes=ALL;
  const notes=['Le destin a parlé. Pas de discussion.','Validé à l\'unanimité (d\'une personne).','Demandez « phet nit noi » si vous tenez à vos papilles.','Celui qui râle paie l\'addition.','Ce soir, on dit « aroi mak » au moins une fois.','Bonne pioche. Le 7-Eleven attendra.'];
  let last=-1,busy=false;
  btn.addEventListener('click',()=>{
    if(busy)return;busy=true;btn.disabled=true;out.classList.remove('landed');out.classList.add('rolling');note.textContent='Ça tourne…';
    if(porkEl)porkEl.hidden=true;
    const prev=dishes[last];dishes=noPork?.checked?ALL.filter(d=>d.pork!=='oui'):ALL;last=dishes.indexOf(prev);
    let i=0;const total=reduced?1:18;
    (function roll(){
      let r;do{r=Math.floor(Math.random()*dishes.length);}while(r===last&&dishes.length>1);
      out.textContent=dishes[r].n;i++;
      if(i<total){setTimeout(roll,40+i*i*1.3);return;}
      last=r;out.classList.remove('rolling');void out.offsetWidth;out.classList.add('landed');
      if(porkEl){const [cls,txt]=PORK[dishes[r].pork];porkEl.className='pork '+cls;porkEl.textContent=txt;porkEl.hidden=false;}
      note.textContent=notes[Math.floor(Math.random()*notes.length)];busy=false;btn.disabled=false;
    })();
  });
})();

/* ---------- Onglets des adresses ---------- */
(function(){
  const tabs=$$('.food-tabs [role="tab"]');if(!tabs.length)return;
  function select(tab,focus){
    tabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;const p=document.getElementById(t.getAttribute('aria-controls'));if(p)p.hidden=!on;});
    if(focus)tab.focus();
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>select(t));
    t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length],true);}});
  });
})();

/* ---------- Checklist (même clé qu'avant : les cases déjà cochées sont conservées) ---------- */
(function(){
  const checks=$$('.checklist input[type="checkbox"]'),key='thailande2026-checklist';if(!checks.length)return;
  const fill=$('#check-fill'),cnt=$('#check-count');
  function progress(){const n=checks.filter(c=>c.checked).length;if(fill)fill.style.width=(n/checks.length*100)+'%';if(cnt)cnt.textContent=`${n} / ${checks.length} confirmé${n>1?'s':''}`;}
  try{const saved=JSON.parse(localStorage.getItem(key)||'[]');checks.forEach((c,i)=>c.checked=Boolean(saved[i]));}catch(e){}
  checks.forEach(c=>c.addEventListener('change',()=>{try{localStorage.setItem(key,JSON.stringify(checks.map(x=>x.checked)));}catch(e){}progress();if(checks.every(x=>x.checked)){confetti(90);toast('Tout est réservé. Plus qu\'à faire les valises ✈️');}}));
  progress();
})();

/* ---------- Petit secret : cliquer 5 fois sur le « T. » ---------- */
(function(){
  const mark=$('#brand-mark');if(!mark)return;let n=0,timer;
  mark.addEventListener('click',()=>{n++;clearTimeout(timer);timer=setTimeout(()=>n=0,1800);if(n>=5){n=0;confetti(120);toast('🥴 Personne ne se souvient de rien… Bienvenue dans The Hangover.',4200);}});
})();

})();
