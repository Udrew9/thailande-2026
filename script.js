const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.day').forEach(day=>{day.hidden=filter!=='all'&&day.dataset.place!==filter;});}));
const checks=[...document.querySelectorAll('.checklist input[type="checkbox"]')];const key='thailande2026-checklist';try{const saved=JSON.parse(localStorage.getItem(key)||'[]');checks.forEach((c,i)=>c.checked=Boolean(saved[i]));checks.forEach(c=>c.addEventListener('change',()=>localStorage.setItem(key,JSON.stringify(checks.map(x=>x.checked)))));}catch(e){/* Checklist still works for this session if storage is unavailable. */}
if(window.L){const map=L.map('travel-map',{scrollWheelZoom:false}).setView([15.7,99.2],5);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);const places=[{name:'Phuket · Rawai',coords:[7.78,98.32],label:'7–11 décembre · 4 nuits'},{name:'Khao Lak',coords:[8.64,98.25],label:'11–14 décembre · 3 nuits'},{name:'Chiang Mai',coords:[18.79,98.98],label:'14–19 décembre · 5 nuits'},{name:'Bangkok',coords:[13.74,100.53],label:'19–22 décembre · 3 nuits'}];const points=places.map((p,i)=>{const marker=L.circleMarker(p.coords,{radius:8,color:'#f5f2eb',weight:3,fillColor:['#547e78','#547e78','#8b986e','#b47a50'][i],fillOpacity:1}).addTo(map);marker.bindPopup(`<strong>${p.name}</strong><br>${p.label}`);return p.coords;});L.polyline(points,{color:'#788875',weight:2,dashArray:'6 8',opacity:.8}).addTo(map);L.control.scale({imperial:false}).addTo(map);setTimeout(()=>map.invalidateSize(),300);}else{const target=document.getElementById('travel-map');if(target)target.innerHTML='<p style="padding:20px">La carte nécessite une connexion internet pour charger OpenStreetMap.</p>';}

document.querySelectorAll('.stop-card').forEach((card,i)=>{const ids=['#fiche-phuket','#fiche-khaolak','#fiche-chiangmai','#fiche-bangkok'];const a=card.querySelector('.stop-info>a');if(a){a.href=ids[i];a.textContent='Découvrir cette étape ↗';}});


// Compte à rebours jusqu'au départ de France : 7 décembre 2026 à 00:00.
(function(){
 const target=new Date('2026-12-07T00:00:00+01:00').getTime();
 const update=()=>{
  const left=Math.max(0,target-Date.now());
  const days=Math.floor(left/86400000), hours=Math.floor(left%86400000/3600000), mins=Math.floor(left%3600000/60000);
  const d=document.getElementById('count-days'),h=document.getElementById('count-hours'),m=document.getElementById('count-minutes');
  if(d){d.textContent=String(days).padStart(2,'0');h.textContent=String(hours).padStart(2,'0');m.textContent=String(mins).padStart(2,'0');}
 };
 update();setInterval(update,60000);
})();

// Estimateur interactif du budget des activités.
(function(){
 const range=document.getElementById('travellers-range');
 const checks=[...document.querySelectorAll('.calculator-options input[type="checkbox"]')];
 const count=document.getElementById('travellers-count'), euros=document.getElementById('calc-euros'), baht=document.getElementById('calc-baht');
 const update=()=>{
  if(!range||!euros||!baht)return;
  const people=Number(range.value);let low=0,high=0;
  checks.forEach(c=>{if(c.checked){low+=Number(c.dataset.min||0);high+=Number(c.dataset.max||0);}});
  count.textContent=people+' '+(people>1?'personnes':'personne');
  euros.textContent=Math.round(low*people/38).toLocaleString('fr-FR')+'–'+Math.round(high*people/38).toLocaleString('fr-FR')+' €';
  baht.textContent=(low*people).toLocaleString('fr-FR')+'–'+(high*people).toLocaleString('fr-FR')+' ฿';
 };
 range?.addEventListener('input',update);checks.forEach(c=>c.addEventListener('change',update));update();
})();

// Si une photo distante ne répond pas, on tente une image de secours adaptée au sujet.
document.querySelectorAll('img').forEach(img=>{
 img.addEventListener('error',()=>{
  if(img.dataset.fallbackUsed){img.style.display='none';return;}
  img.dataset.fallbackUsed='1';
  const alt=(img.alt||'').toLowerCase();
  let id='photo-1500530855697-b586d89ba3ee';
  if(/bangkok|ville|marché|retour/.test(alt))id='photo-1512453979798-5ea266f8880c';
  else if(/temple|chiang|cuisine/.test(alt))id='photo-1528181304800-259b08848526';
  else if(/éléphant|elephant/.test(alt))id='photo-1564760055775-d63b17a55c44';
  else if(/hôtel|hotel|resort|villa/.test(alt))id='photo-1540541338287-41700207dee6';
  else if(/mer|plage|island|phi phi|similan|bateau|lagon/.test(alt))id='photo-1507525428034-b723cf961d3e';
  img.src='https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1000&q=80';
 },{once:true});
});

// Galerie plein écran : cliquer sur une photo pour l'agrandir.
(function(){
 const overlay=document.createElement('div');overlay.className='photo-lightbox';overlay.innerHTML='<button type="button" aria-label="Fermer">×</button><img alt=""><p></p>';document.body.appendChild(overlay);
 const big=overlay.querySelector('img'),caption=overlay.querySelector('p');
 const close=()=>{overlay.classList.remove('open');document.body.classList.remove('lightbox-open');};
 overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.tagName==='BUTTON')close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 document.querySelectorAll('.hotel-gallery img,.day-visual img,.destination-details img').forEach(img=>{
  img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Agrandir : '+(img.alt||'photo'));
  const open=()=>{if(!img.naturalWidth)return;big.src=img.src;big.alt=img.alt;caption.textContent=img.alt||'Photo du voyage';overlay.classList.add('open');document.body.classList.add('lightbox-open');};
  img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 });
})();
