// ===== Helpers =====
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const toast = (msg) => { const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),1200); };
const copy = async (text) => { try { await navigator.clipboard.writeText(text||""); toast("Copied"); } catch { alert("Clipboard blocked. Copy manually."); } };
const downloadTxt = (name, text) => { const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([text||""],{type:"text/plain"})); a.download=name; a.click(); URL.revokeObjectURL(a.href); };

// ===== Theme toggle =====
(() => {
  const html = document.documentElement;
  const saved = localStorage.getItem("theme");
  html.dataset.theme = saved || "dark";
  const btn = $("#themeToggle");
  const sync = () => btn && (btn.textContent = html.dataset.theme === "light" ? "🌙" : "☀️");
  sync();
  btn?.addEventListener("click", () => {
    html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", html.dataset.theme);
    sync();
  });
})();

// ===== Templates =====
const TEMPLATES = [
  {
    id: "qa_review",
    title: "QA Review",
    desc: "Structured QA review focusing on risks and test scope.",
    pattern:
`You are a senior QA lead.
Product: {{product}}
Scope: {{scope}}
Risks: {{risks}}

Write a concise test plan:
- Critical paths
- Edge cases
- Data/setup required
- Acceptance criteria

Output as bullet points.`
  },
  {
    id: "ux_critique",
    title: "UX Critique",
    desc: "Heuristic evaluation with actionable suggestions.",
    pattern:
`Act as a UX researcher.
Target: {{target_persona}}
Flow: {{flow}}
Constraints: {{constraints}}

Evaluate using Nielsen heuristics.
For each issue include:
- Evidence
- Impact
- Suggested fix

Keep it crisp and ranked by severity.`
  },
  {
    id: "product_brief",
    title: "Product Brief",
    desc: "One-pager product brief for alignment.",
    pattern:
`Write a product brief.

Title: {{title}}
Problem: {{problem}}
Audience: {{audience}}
Goals: {{goals}}
Constraints: {{constraints}}

Deliverables:
- Scope
- Success metrics
- Timeline (high-level)

Use clear headings and lists.`
  },
  {
    id: "bug_report",
    title: "Bug Report",
    desc: "Repro steps and expected vs actual.",
    pattern:
`Bug report for {{component}}

Environment: {{env}}
Preconditions: {{preconditions}}
Steps to reproduce:
1) {{step1}}
2) {{step2}}
Expected: {{expected}}
Actual: {{actual}}

Include logs/screenshot hints.`
  }
];

// ===== Builder logic =====
const stateKey = "pcraft_state_v1";

const extractVars = (str) => {
  const set = new Set();
  (str.match(/{{\s*[\w.-]+\s*}}/g) || []).forEach(m => set.add(m.slice(2,-2).trim()));
  return [...set];
};

const render = (tpl, values) =>
  tpl.replace(/{{\s*([\w.-]+)\s*}}/g, (_,k)=> (values[k] ?? ""));

function saveState(obj){
  localStorage.setItem(stateKey, JSON.stringify(obj));
}
function loadState(){
  try { return JSON.parse(localStorage.getItem(stateKey)||"null") } catch { return null }
}

function buildTemplateSelect(){
  const sel = $("#tplSelect");
  sel.innerHTML = TEMPLATES.map(t => `<option value="${t.id}">${t.title}</option>`).join("");
}

function buildForm(pattern, prevValues={}){
  const vars = extractVars(pattern);
  const form = $("#varsForm");
  form.innerHTML = vars.map(k => `
    <label class="block">
      <span>${k}</span>
      <input name="${k}" value="${(prevValues[k]||"").toString().replace(/"/g,"&quot;")}" placeholder="Enter ${k}">
    </label>
  `).join("");

  // bind live update
  form.querySelectorAll("input").forEach(inp=>{
    inp.addEventListener("input", updatePreview);
  });
}

function current(){
  const id = $("#tplSelect").value;
  const tpl = TEMPLATES.find(t=>t.id===id);
  const values = Object.fromEntries($$("#varsForm input").map(i=>[i.name, i.value]));
  return {id, tpl, values};
}

function updatePreview(){
  const { tpl, values } = current();
  $("#preview").value = render(tpl.pattern, values);
  saveState({ id: tpl.id, values });
}

function resetAll(){
  const { tpl } = current();
  buildForm(tpl.pattern, {});
  $("#preview").value = render(tpl.pattern, {});
  saveState({ id: tpl.id, values: {} });
  toast("Cleared");
}

// Init
(function init(){
  buildTemplateSelect();

  const saved = loadState();
  if (saved?.id && TEMPLATES.some(t=>t.id===saved.id)) {
    $("#tplSelect").value = saved.id;
  }
  const tpl = TEMPLATES.find(t=>t.id===$("#tplSelect").value) || TEMPLATES[0];
  buildForm(tpl.pattern, saved?.values||{});
  $("#preview").value = render(tpl.pattern, saved?.values||{});
})();

// Events
$("#tplSelect").addEventListener("change", () => {
  const tpl = TEMPLATES.find(t=>t.id===$("#tplSelect").value);
  buildForm(tpl.pattern, {});
  $("#preview").value = render(tpl.pattern, {});
  saveState({ id: tpl.id, values: {} });
});

$("#btnCopy").addEventListener("click", (e)=>{ e.preventDefault(); copy($("#preview").value); });
$("#btnDownload").addEventListener("click", (e)=>{ e.preventDefault(); downloadTxt("prompt.txt", $("#preview").value); });
$("#btnReset").addEventListener("click", (e)=>{ e.preventDefault(); resetAll(); });

// Import/Export JSON (custom templates)
$("#btnExport").addEventListener("click", (e)=>{
  e.preventDefault();
  downloadTxt("my-templates.json", JSON.stringify(TEMPLATES, null, 2));
});

$("#btnImport").addEventListener("click", (e)=>{
  e.preventDefault();
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = "application/json";
  inp.onchange = async () => {
    const file = inp.files?.[0]; if (!file) return;
    try{
      const text = await file.text();
      const arr = JSON.parse(text);
      if (!Array.isArray(arr)) throw new Error("Invalid JSON");
      // simple merge by id
      const map = new Map(TEMPLATES.map(t=>[t.id,t]));
      arr.forEach(t => t?.id && t?.pattern && map.set(t.id, t));
      const merged = [...map.values()];
      // replace globals
      while (TEMPLATES.length) TEMPLATES.pop();
      merged.forEach(x=>TEMPLATES.push(x));
      buildTemplateSelect();
      toast("Templates imported");
    }catch(err){ alert("Import failed: " + err.message); }
  };
  inp.click();
});
