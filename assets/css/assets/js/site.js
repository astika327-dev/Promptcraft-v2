// smooth scroll for internal links
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
});

// CONTACT (mailto + WA, copy email)
(function(){
  const form = document.getElementById('mailForm');
  const copyBtn = document.getElementById('copyEmail');
  const waLink  = document.getElementById('wa');

  const OWNER_EMAIL = 'astika327@gmail.com';
  const WA_NUMBER   = '6282146178461'; // internasional tanpa "+"

  if(copyBtn){
    copyBtn.addEventListener('click', async (e)=>{
      e.preventDefault();
      try{
        await navigator.clipboard.writeText(astika327@gmail.com);
        copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy Email',1200);
      }catch{ alert('Clipboard blocked. Email: '+astika327@gmail.com); }
    });
  }

  function getPayload(){
    if(!form) return null;
    const n = form.elements['name']?.value.trim();
    const m = form.elements['email']?.value.trim();
    const msg = form.elements['msg']?.value.trim();
    if(!msg) return null;
    return {n,m,msg};
  }

  form?.addEventListener('submit',(e)=>{
    const p = getPayload(); if(!p){ e.preventDefault(); alert('Write a short message.'); return; }
    const subject = encodeURIComponent(`Inquiry from ${p.n||'Visitor'}`);
    const body = encodeURIComponent(`${p.msg}\n\n— ${p.n||'Visitor'} (${p.m||'-'})`);
    form.action = `mailto:${astika327@gmail.com}?subject=${subject}&body=${body}`;
  });

  waLink?.addEventListener('click',(e)=>{
    const p = getPayload(); if(!p){ e.preventDefault(); alert('Short message first.'); return; }
    waLink.href = `https://wa.me/${6282146178461}?text=${encodeURIComponent(p.msg)}`;
  });
})();
