const $ = (selector, scope = document) => scope.querySelector(selector);

const html = document.documentElement;
const toastEl = $('#toast');
let toastTimer;

const themeKey = 'pcraft_theme_v2';
const stateKey = 'pcraft_state_v2';
const templatesKey = 'pcraft_templates_v2';

const BASE_TEMPLATES = [
  {
    id: 'qa_review',
    title: 'QA Review Blueprint',
    category: 'Quality Assurance',
    tags: ['Testing', 'Risk', 'Coverage'],
    desc: 'Structured QA review with risk assessment, acceptance criteria, and setup guidance.',
    pattern: `You are a senior QA lead.
Product: {{product}}
Scope: {{scope}}
Risks: {{risks}}

Write a concise test plan:
- Critical paths
- Edge cases
- Data/setup required
- Acceptance criteria

Present the plan as bullet points.`
  },
  {
    id: 'ux_critique',
    title: 'UX Critique Report',
    category: 'Research & UX',
    tags: ['Heuristics', 'Insights', 'Recommendations'],
    desc: 'Evaluate experiences with Nielsen heuristics and actionable fixes.',
    pattern: `Act as a UX researcher.
Target persona: {{target_persona}}
Flow reviewed: {{flow}}
Current constraints: {{constraints}}

Evaluate the experience using Nielsen heuristics. For each issue include:
- Evidence
- Impact
- Recommended fix

Rank issues from highest to lowest severity.`
  },
  {
    id: 'product_brief',
    title: 'Product Brief One-Pager',
    category: 'Product',
    tags: ['Strategy', 'Alignment', 'Planning'],
    desc: 'Summarise problem, goals, and metrics for a new initiative.',
    pattern: `Create a product brief with the following sections:

Title: {{title}}
Problem to solve: {{problem}}
Primary audience: {{audience}}
Goals and success metrics: {{goals}}
Constraints & risks: {{constraints}}

Deliverables:
- Scope and guardrails
- Launch timeline (high-level)
- Success definition`}
  },
  {
    id: 'bug_report',
    title: 'Bug Report Hand-off',
    category: 'Engineering',
    tags: ['Repro steps', 'Severity', 'Evidence'],
    desc: 'Capture reproducible bug reports with clear expectations.',
    pattern: `Document a bug report for {{component}}.

Environment: {{env}}
Preconditions: {{preconditions}}
Steps to reproduce:
1. {{step1}}
2. {{step2}}
3. {{step3}}
Expected result: {{expected}}
Actual result: {{actual}}

Include notes on logs, screenshots, or other evidence needed.`
  }
];

const els = {
  themeToggle: $('#themeToggle'),
  select: $('#tplSelect'),
  varsForm: $('#varsForm'),
  preview: $('#preview'),
  wordCount: $('#wordCount'),
  charCount: $('#charCount'),
  lastSaved: $('#lastSaved'),
  tplName: $('#tplName'),
  tplDescription: $('#tplDescription'),
  tplCategory: $('#tplCategory'),
  tplVarCount: $('#tplVarCount'),
  tplLineCount: $('#tplLineCount'),
  tplVariables: $('#tplVariables'),
  tplTags: $('#tplTags'),
  btnCopy: $('#btnCopy'),
  btnDownload: $('#btnDownload'),
  btnShare: $('#btnShare'),
  btnReset: $('#btnReset'),
  btnImport: $('#btnImport'),
  btnExport: $('#btnExport'),
  btnResetTemplates: $('#btnResetTemplates'),
  newTemplateForm: $('#newTplForm'),
  year: $('#year')
};

const storedTemplates = readJSON(templatesKey, []);
let templates = mergeTemplates(BASE_TEMPLATES, storedTemplates);

const defaultState = {
  id: templates[0]?.id ?? '',
  inputs: {},
  updatedAt: null
};

let state = readJSON(stateKey, defaultState);
if (!state || typeof state !== 'object') {
  state = { ...defaultState };
}
state.inputs = state.inputs && typeof state.inputs === 'object' ? state.inputs : {};
if (!templates.some(t => t.id === state.id)) {
  state.id = templates[0]?.id ?? '';
}

initTheme();
initialiseBuilder();
attachEvents();
updateYear();
updateLastSaved();

function initialiseBuilder() {
  rebuildInterface({ shouldSavePreview: false });
}

function attachEvents() {
  els.select?.addEventListener('change', handleTemplateChange);
  els.preview?.addEventListener('input', () => updateCounts(els.preview.value));
  els.btnCopy?.addEventListener('click', () => copyToClipboard(els.preview.value, 'Prompt copied'));
  els.btnDownload?.addEventListener('click', () => downloadTxt('prompt.txt', els.preview.value));
  els.btnShare?.addEventListener('click', handleShareTemplate);
  els.btnReset?.addEventListener('click', handleResetValues);
  els.btnImport?.addEventListener('click', handleImportTemplates);
  els.btnExport?.addEventListener('click', () => downloadTxt('my-templates.json', JSON.stringify(templates, null, 2)));
  els.btnResetTemplates?.addEventListener('click', handleRestoreDefaults);
  els.newTemplateForm?.addEventListener('submit', handleNewTemplateSubmit);
}

function initTheme() {
  const saved = localStorage.getItem(themeKey);
  const media = window.matchMedia('(prefers-color-scheme: light)');

  if (saved === 'light' || saved === 'dark') {
    html.dataset.theme = saved;
  } else {
    html.dataset.theme = media.matches ? 'light' : 'dark';
  }

  syncThemeToggle();

  els.themeToggle?.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(themeKey, html.dataset.theme);
    syncThemeToggle();
  });

  const handleSystemChange = (event) => {
    if (localStorage.getItem(themeKey)) return;
    html.dataset.theme = event.matches ? 'light' : 'dark';
    syncThemeToggle();
  };

  if (media.addEventListener) {
    media.addEventListener('change', handleSystemChange);
  } else if (media.addListener) {
    media.addListener(handleSystemChange);
  }
}

function syncThemeToggle() {
  if (!els.themeToggle) return;
  els.themeToggle.textContent = html.dataset.theme === 'light' ? '🌙' : '☀️';
  els.themeToggle.setAttribute('aria-label', html.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}

function rebuildInterface({ shouldSavePreview } = {}) {
  if (!templates.length) return;
  if (!templates.some(t => t.id === state.id)) {
    state.id = templates[0].id;
  }

  buildTemplateSelect(state.id);
  const tpl = getTemplate(state.id);
  const values = getCurrentValues();
  buildForm(tpl, values);
  updateMeta(tpl);
  renderAndUpdatePreview(tpl, values, { shouldSave: Boolean(shouldSavePreview) });
}

function buildTemplateSelect(selectedId) {
  if (!els.select) return;
  els.select.innerHTML = '';

  const groups = new Map();
  templates.forEach((tpl) => {
    const key = tpl.category?.trim() || 'General';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(tpl);
  });

  const multipleGroups = groups.size > 1;
  groups.forEach((items, label) => {
    if (multipleGroups) {
      const group = document.createElement('optgroup');
      group.label = label;
      items.forEach((tpl) => group.append(new Option(tpl.title, tpl.id)));
      els.select.append(group);
    } else {
      items.forEach((tpl) => els.select.append(new Option(tpl.title, tpl.id)));
    }
  });

  if (selectedId && templates.some(t => t.id === selectedId)) {
    els.select.value = selectedId;
  }
}

function buildForm(tpl, values = {}) {
  if (!els.varsForm) return;
  els.varsForm.innerHTML = '';
  const vars = extractVariables(tpl.pattern);

  if (!vars.length) {
    const empty = document.createElement('p');
    empty.textContent = 'This template has no variables.';
    empty.className = 'help';
    els.varsForm.append(empty);
    return;
  }

  vars.forEach((key) => {
    const label = document.createElement('label');
    label.className = 'field';

    const title = document.createElement('span');
    title.textContent = prettifyKey(key);
    label.append(title);

    const longFieldPattern = /(summary|details|context|steps|notes|analysis|report|description)/i;
    const isLong = longFieldPattern.test(key);
    const control = isLong ? document.createElement('textarea') : document.createElement('input');

    if (!isLong) control.type = 'text';
    control.name = key;
    control.value = values[key] ?? '';
    control.placeholder = `Enter ${prettifyKey(key).toLowerCase()}`;
    control.autocomplete = 'off';
    control.spellcheck = control.tagName === 'TEXTAREA';
    if (control.tagName === 'TEXTAREA') {
      control.rows = Math.max(3, Math.ceil((values[key]?.length || 0) / 80));
    }

    control.addEventListener('input', () => handleInputChange(control));
    label.append(control);
    els.varsForm.append(label);
  });
}

function handleInputChange(control) {
  if (!control?.name) return;
  ensureValueBucket();
  state.inputs[state.id][control.name] = control.value;
  renderAndUpdatePreview(getTemplate(state.id), getCurrentValues(), { shouldSave: true });
}

function renderAndUpdatePreview(tpl, values, { shouldSave }) {
  if (!els.preview) return;
  const text = renderTemplate(tpl.pattern, values);
  els.preview.value = text;
  updateCounts(text);
  if (shouldSave) {
    state.updatedAt = Date.now();
    persistState();
    updateLastSaved();
  } else {
    persistState();
  }
}

function handleTemplateChange() {
  if (!els.select) return;
  state.id = els.select.value;
  ensureValueBucket();
  const tpl = getTemplate(state.id);
  const values = getCurrentValues();
  buildForm(tpl, values);
  updateMeta(tpl);
  renderAndUpdatePreview(tpl, values, { shouldSave: true });
  toast(`Switched to “${tpl.title}”`);
}

function handleResetValues() {
  ensureValueBucket();
  state.inputs[state.id] = {};
  const tpl = getTemplate(state.id);
  buildForm(tpl, {});
  renderAndUpdatePreview(tpl, {}, { shouldSave: true });
  toast('Values cleared');
}

function handleShareTemplate() {
  const tpl = getTemplate(state.id);
  const snippet = JSON.stringify(tpl, null, 2);
  copyToClipboard(snippet, 'Template JSON copied');
}

function handleImportTemplates() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('Expected an array of templates.');
      const normalised = data.map(normaliseTemplate);
      templates = mergeTemplates(templates, normalised);
      persistTemplates();
      rebuildInterface({ shouldSavePreview: false });
      toast(`${normalised.length} template${normalised.length === 1 ? '' : 's'} imported`);
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }
  });
  input.click();
}

function handleRestoreDefaults() {
  const proceed = confirm('Restore the default template library? Custom templates will be removed.');
  if (!proceed) return;
  templates = mergeTemplates(BASE_TEMPLATES, []);
  persistTemplates();
  state.inputs = {};
  state.id = templates[0]?.id ?? '';
  state.updatedAt = Date.now();
  rebuildInterface({ shouldSavePreview: true });
  toast('Default templates restored');
}

function handleNewTemplateSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  try {
    const payload = {
      id: formData.get('id') || formData.get('title'),
      title: formData.get('title'),
      desc: formData.get('desc'),
      category: formData.get('category'),
      tags: formData.get('tags'),
      pattern: formData.get('pattern')
    };
    const template = normaliseTemplate(payload);
    const existingIndex = templates.findIndex(t => t.id === template.id);
    if (existingIndex >= 0) {
      templates[existingIndex] = template;
      toast(`Template “${template.title}” updated`);
    } else {
      templates.push(template);
      toast(`Template “${template.title}” saved`);
    }
    persistTemplates();
    state.id = template.id;
    ensureValueBucket();
    rebuildInterface({ shouldSavePreview: false });
    form.reset();
  } catch (error) {
    alert(error.message);
  }
}

function ensureValueBucket() {
  if (!state.id) return;
  if (!state.inputs[state.id]) {
    state.inputs[state.id] = {};
  }
}

function updateMeta(tpl) {
  if (!tpl) return;
  if (els.tplName) els.tplName.textContent = tpl.title;
  if (els.tplDescription) {
    els.tplDescription.textContent = tpl.desc?.trim() || 'Add a short description for this template.';
  }
  if (els.tplCategory) els.tplCategory.textContent = tpl.category || 'General';

  const placeholders = extractVariables(tpl.pattern);
  const lineCount = countLines(tpl.pattern);
  if (els.tplVarCount) els.tplVarCount.textContent = placeholders.length;
  if (els.tplLineCount) els.tplLineCount.textContent = `${lineCount} line${lineCount === 1 ? '' : 's'}`;

  populateTagList(els.tplVariables, placeholders, {
    renderItem: (li, item) => {
      const code = document.createElement('code');
      code.textContent = `{{${item}}}`;
      li.append(code);
    },
    emptyLabel: 'No variables'
  });

  const tags = tpl.tags?.length ? tpl.tags : [];
  populateTagList(els.tplTags, tags, { emptyLabel: 'Custom' });
}

function populateTagList(container, items = [], { renderItem, emptyLabel } = {}) {
  if (!container) return;
  container.innerHTML = '';
  if (!items.length) {
    const li = document.createElement('li');
    li.className = 'tag-list__empty';
    li.textContent = emptyLabel || '—';
    container.append(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement('li');
    if (renderItem) {
      renderItem(li, item);
    } else {
      li.textContent = item;
    }
    container.append(li);
  });
}

function updateCounts(text) {
  if (els.wordCount) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    els.wordCount.textContent = `${words} word${words === 1 ? '' : 's'}`;
  }
  if (els.charCount) {
    const chars = text.length;
    els.charCount.textContent = `${chars} character${chars === 1 ? '' : 's'}`;
  }
}

function updateYear() {
  if (!els.year) return;
  els.year.textContent = new Date().getFullYear();
}

function updateLastSaved() {
  if (!els.lastSaved) return;
  if (!state.updatedAt) {
    els.lastSaved.textContent = 'Progress auto-saves locally as you type.';
    els.lastSaved.removeAttribute('title');
    return;
  }
  const diff = Date.now() - state.updatedAt;
  let label;
  if (diff < 60_000) label = 'Saved moments ago';
  else if (diff < 3_600_000) label = `Saved ${Math.round(diff / 60_000)} minute${Math.round(diff / 60_000) === 1 ? '' : 's'} ago`;
  else if (diff < 86_400_000) label = `Saved ${Math.round(diff / 3_600_000)} hour${Math.round(diff / 3_600_000) === 1 ? '' : 's'} ago`;
  else {
    const days = Math.round(diff / 86_400_000);
    label = `Saved ${days} day${days === 1 ? '' : 's'} ago`;
  }
  els.lastSaved.textContent = label;
  els.lastSaved.title = new Date(state.updatedAt).toLocaleString();
}

function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1500);
}

async function copyToClipboard(text, successMessage) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text ?? '');
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text ?? '';
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    if (successMessage) toast(successMessage);
  } catch (error) {
    alert('Clipboard blocked. Copy manually.');
  }
}

function downloadTxt(filename, text) {
  const blob = new Blob([text || ''], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast(`${filename} downloaded`);
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Failed to read ${key}`, error);
    return fallback;
  }
}

function persistState() {
  try {
    localStorage.setItem(stateKey, JSON.stringify(state));
  } catch (error) {
    console.warn('State could not be saved', error);
  }
}

function persistTemplates() {
  try {
    localStorage.setItem(templatesKey, JSON.stringify(templates));
  } catch (error) {
    console.warn('Templates could not be saved', error);
  }
}

function mergeTemplates(base, extra) {
  const map = new Map();
  base.forEach((tpl) => {
    const normalised = normaliseTemplate(tpl);
    map.set(normalised.id, normalised);
  });
  extra.forEach((tpl) => {
    try {
      const normalised = normaliseTemplate(tpl);
      map.set(normalised.id, normalised);
    } catch (error) {
      console.warn('Skipped template during merge', error);
    }
  });
  return Array.from(map.values());
}

function normaliseTemplate(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Template must be an object.');
  }
  const idSource = String(raw.id ?? '').trim() || String(raw.title ?? '').trim();
  const id = idSource.toLowerCase().replace(/[^a-z0-9_-]+/g, '_').replace(/_{2,}/g, '_').replace(/^_|_$/g, '');
  if (!id) throw new Error('Template identifier is required.');

  const pattern = String(raw.pattern ?? '').replace(/\r\n/g, '\n');
  if (!pattern.trim()) throw new Error('Template pattern cannot be empty.');

  const tags = normaliseTags(raw.tags);
  const title = String(raw.title ?? '').trim() || id.replace(/[_-]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const category = String(raw.category ?? '').trim() || 'General';
  const desc = String(raw.desc ?? '').trim();

  return { id, title, category, tags, desc, pattern };
}

function normaliseTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function extractVariables(pattern) {
  const matches = pattern.match(/{{\s*[\w.-]+\s*}}/g) || [];
  return Array.from(new Set(matches.map((token) => token.slice(2, -2).trim())));
}

function renderTemplate(pattern, values) {
  return pattern.replace(/{{\s*([\w.-]+)\s*}}/g, (_, key) => values?.[key] ?? '');
}

function getTemplate(id) {
  return templates.find((tpl) => tpl.id === id) || templates[0];
}

function getCurrentValues() {
  ensureValueBucket();
  return state.inputs[state.id];
}

function countLines(str) {
  const clean = str.replace(/\r\n/g, '\n').trim();
  if (!clean) return 0;
  return clean.split('\n').length;
}

function prettifyKey(key) {
  return key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}
