(function(){
  const form = document.getElementById('pb-form');
  if(!form) return;

  const fields = ['goal','audience','style','tone','constraints'];
  const preview = document.getElementById('preview');
  const copyBtn = document.getElementById('copyPrompt');
  const dlBtn   = document.getElementById('downloadPrompt');
  const KEY = 'promptcraft:v1';

  function read(){
    const d={}; fields.forEach(f=>d[f]=(form.elements[f]?.value||'').trim()); return d;
  }
  function tpl(d){
    return [
`You are a helpful assistant.`,
`GOAL: ${d.goal||'—'}`,
`AUDIENCE: ${d.audience||'—'}`,
`STYLE: ${d.style||'—'}`,
`TONE: ${d.tone||'—'}`,
`CONSTRAINTS: ${d.constraints||'—'}`,
`TASK: Write the output clearly with a short subject/title and 2–4 concise paragraphs. Avoid fluff.`
    ].join('\n');
  }
  function render(){
    const d=read(); preview.textContent=tpl(d);
    localStorage.setItem(KEY, JSON.stringify(d));
  }

  // hydrate
  try{ const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
    fields.forEach(f=>{ if(saved[f]) form.elements[f].value=saved[f]; });
  }catch{}
  render();

  form.addEventListener('input',render);

  copyBtn?.addEventListener('click', async (e)=>{
    e.preventDefault();
    try{ await navigator.clipboard.writeText(preview.textContent);
      copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy',1100);
    }catch{ alert('Clipboard blocked. Select & copy manual.'); }
  });

  dlBtn?.addEventListener('click',(e)=>{
    e.preventDefault();
    const blob=new Blob([preview.textContent],{type:'text/plain;charset=utf-8'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='prompt.txt'; a.click(); URL.revokeObjectURL(a.href);
  });
})();
