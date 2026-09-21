const SUPABASE_URL='https://ymfnjqueeijlbngbkzue.supabase.co';
const SUPABASE_KEY='sb_publishable_m0Flyr-F5ufagmxwlcGZKA_w16bhIfT';
const sb=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
const dogs=[
['Aaron','6 años · grande · macho','assets/dogs/aaron.jpg'],['Anto','3 años · grande · hembra','assets/dogs/anto.jpg'],['Bad','3 años · XXL · macho','assets/dogs/bad.jpg'],['Carballito','En adopción','assets/dogs/carballito.jpg'],['Choky','En adopción','assets/dogs/choky.jpg'],['Coca','5 años · mediana · hembra','assets/dogs/coca.jpg'],['Estrellita','En adopción','assets/dogs/estrellita.jpg'],['Gal','En adopción','assets/dogs/gal.jpg'],['Harper','En adopción','assets/dogs/harper.jpg'],['Lisa','En adopción','assets/dogs/lisa.jpg'],['Lobito','En adopción','assets/dogs/lobito.jpg'],['Maya','En adopción','assets/dogs/maya.jpg'],['Pancho','En adopción','assets/dogs/pancho.jpg'],['Pit','En adopción','assets/dogs/pit.jpg'],['Polo','En adopción','assets/dogs/polo.jpg'],['Rody','En adopción','assets/dogs/rody.jpg'],['Sandy','En adopción','assets/dogs/sandy.jpg'],['Scooby','En adopción','assets/dogs/scooby.jpg'],['Simpa','En adopción','assets/dogs/simpa.jpg'],['Thor','En adopción','assets/dogs/thor.jpg'],['Tuli','En adopción','assets/dogs/tuli.jpg']];
const stories={Aaron:`AARON es macho, está castrado, vacunas al día, tiene aproximadamente 6 años y es de tamaño grande.\n\nEs muy cariñoso con las personas y se lleva bien con perras hembras.\n\nFue encontrado en un grave estado de abandono, con una bichera en la cabeza. Después de recibir los cuidados necesarios, logró recuperarse por completo y hoy se encuentra en excelente condiciones.`,Coca:`COCA es hembra, está castrada, vacunas al día, tiene aproximadamente 5 años y es de tamaño mediano.\n\nEs súper amorosa con las personas y se lleva bien tanto con hembras como con machos.\n\nFue encontrada junto a sus bebés en el cementerio. Todos ellos encontraron una familia, pero Coca todavía sigue esperando la suya. Ya pasaron 3 años desde su rescate.`,Bad:`BAD tiene aproximadamente 3 años, está castrado, vacunas al día y es de tamaño XXL.\n\nEs súper juguetón, extremadamente bueno y se lleva muy bien con otros perros.\n\nFue encontrado en pleno invierno, durmiendo entre las hojas y con una fuerte neumonía.`,Anto:`Anto tiene aproximadamente 3 años, está castrada, vacunas al día y es de tamaño grande.\n\nEs muy cariñosa, le encantan los mimos y se lleva bien con otros perros.\n\nFue encontrada en un baldío junto a sus bebés, que lamentablemente ya habían fallecido. Anto también estaba en un estado delicado y tuvo que luchar por su vida tras atravesar una fuerte infección.\n\nLogró salir adelante y hoy se encuentra excelente, lista para dejar atrás su historia y encontrar una familia.`};

const heroDogs = dogs.map(([name,meta,img]) => ({name, meta, img}));
let heroIndex = Math.max(0, heroDogs.findIndex(d => d.name === 'Coca'));
let heroTimer = null;
function setHeroDog(index, initial=false){
  const card=document.querySelector('#heroCard');
  const img=document.querySelector('#heroDog');
  const name=document.querySelector('#heroDogName');
  const meta=document.querySelector('#heroDogMeta');
  if(!card || !img || !name || !meta) return;
  const dog=heroDogs[index];
  if(!initial){
    card.classList.add('is-changing');
    window.setTimeout(()=>{
      img.src=dog.img;
      img.alt=`${dog.name}, perro en adopción`;
      name.textContent=dog.name.toUpperCase();
      meta.textContent=dog.meta;
      card.classList.remove('is-changing');
    },260);
  }else{
    img.src=dog.img;
    img.alt=`${dog.name}, perro en adopción`;
    name.textContent=dog.name.toUpperCase();
    meta.textContent=dog.meta;
  }
}
function startHeroCarousel(){
  setHeroDog(heroIndex,true);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroTimer=window.setInterval(()=>{
    heroIndex=(heroIndex+1)%heroDogs.length;
    setHeroDog(heroIndex);
  },5200);
}
startHeroCarousel();
function renderDogs(){const el=document.querySelector('#dogs');el.innerHTML=dogs.map(([n,meta,img])=>`<article class="dog-card"><img loading="lazy" src="${img}" alt="${n}, perro en adopción"><div class="pad"><h3>${n}</h3><p>${meta}</p><button class="mini-btn" data-dog="${n}">CONOCER →</button></div></article>`).join('');el.querySelectorAll('[data-dog]').forEach(b=>b.onclick=()=>openDog(b.dataset.dog))}
function openDog(name){const d=dogs.find(x=>x[0]===name);document.querySelector('#dogModalContent').innerHTML=`<img class="modal-dog" src="${d[2]}" alt="${name}"><span class="eyebrow">EN ADOPCIÓN</span><h2>${name}</h2><p><b>${d[1]}</b></p><p class="story">${stories[name]||'Está esperando una familia responsable que le dé una segunda oportunidad. Conocelo, completá la solicitud y el equipo de la ONG se comunicará con vos.'}</p><div class="modal-actions"><button class="btn primary" onclick="openAdopt('${name}')">QUIERO ADOPTAR A ${name.toUpperCase()} ❤️</button></div>`;document.querySelector('#dogModal').showModal()}
function openAdopt(name){
  document.querySelector('#dogModal').close();
  document.querySelector('#adoptTitle').textContent=`QUIERO ADOPTAR A ${name.toUpperCase()}`;
  document.querySelector('#animalId').value=name;
  document.querySelector('#animalInterest').value=name;
  document.querySelector('#formMsg').textContent='';
  document.querySelector('#adoptModal').showModal();
  document.querySelector('#adoptModal').scrollTop=0;
}

function submitAdoption(e){
  const form=e.target;
  const msg=document.querySelector('#formMsg');
  if(!form.checkValidity()){
    e.preventDefault();
    form.reportValidity();
    msg.className='form-msg error';
    msg.textContent='No es posible continuar: faltan completar uno o más campos obligatorios. Revisá los campos marcados.';
    const first=form.querySelector(':invalid');
    if(first){first.scrollIntoView({behavior:'smooth',block:'center'});first.focus({preventScroll:true});}
    return false;
  }
  msg.className='form-msg';
  msg.textContent='Enviando solicitud…';
  return true;
}
async function renderCampaigns(){const el=document.querySelector('#campaigns');let rows=[];if(sb){const r=await sb.from('campanias_donacion').select('*').eq('activa',true).order('creado_en',{ascending:false});if(!r.error)rows=r.data||[]}if(!rows.length)rows=[{titulo:'Rescate en curso',descripcion:'Ayudanos a cubrir veterinaria, alimento y medicamentos.',objetivo:300000,recaudado:0,activa:true}];el.innerHTML=rows.map(c=>{const pct=Math.min(100,Math.round((Number(c.recaudado)/Math.max(1,Number(c.objetivo)))*100));return `<article class="campaign"><div class="campaign-top"><div><span class="eyebrow">🐶 CAMPAÑA ACTIVA</span><h3>${c.titulo}</h3></div><b>${pct}%</b></div><p class="small">${c.descripcion||''}</p><div class="progress"><span style="width:${pct}%"></span></div><b>$${Number(c.recaudado).toLocaleString('es-AR')} / $${Number(c.objetivo).toLocaleString('es-AR')}</b></article>`}).join('')}
const mp={mensual:'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084806ff3b701806ffba6f40001',100000:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/5d620248-b247-41b9-87af-e25c0c67e3a4/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-fb4f69e1-91c4-4134-9568-99d370de8f5f&router-request-id=324064f7-607d-4bbd-b2d8-86e9df65cf1c&source=link',50000:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/39c7ad4a-2226-4afe-95a0-a588981fbc03/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-7c6a8d4d-d4c4-4630-9e39-abc182e634d5&router-request-id=482632a9-7909-4631-be87-bf89855a904e&source=link',10000:'https://mpago.la/2ipb2a3',5000:'https://mpago.la/2Y41ryF',2000:'https://mpago.la/1F1Mvhu',1000:'https://mpago.la/2jGANSg',500:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/44ccbb95-fd5a-4ce9-9929-7038b445291a/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-51c3b5d2-0291-4e27-9436-02a0fc82a77b&router-request-id=0bd92ea1-6a13-495e-a009-90cdfb6906cf&source=link',other:'https://link.mercadopago.com.ar/donarotromonto'};
function renderMP(){const vals=[500,1000,2000,5000,10000,50000,100000];document.querySelector('#mpButtons').innerHTML=vals.map(v=>`<a target="_blank" rel="noopener" href="${mp[v]}">$${v.toLocaleString('es-AR')}</a>`).join('')+`<a target="_blank" rel="noopener" href="${mp.other}">Otro monto</a><a target="_blank" rel="noopener" href="${mp.mensual}">Mensual ❤️</a>`}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelector('#adoptForm').addEventListener('submit',submitAdoption);renderDogs();renderMP();renderCampaigns();

const menuBtn=document.querySelector('#menuBtn');
const mobileMenu=document.querySelector('#mobileMenu');
if(menuBtn && mobileMenu){
  menuBtn.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
    menuBtn.textContent=open?'×':'☰';
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Abrir menú');
    menuBtn.textContent='☰';
  }));
}
