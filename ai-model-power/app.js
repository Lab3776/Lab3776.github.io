const I18N = {
  ja: {
    title: "AIモデル戦闘力データベース",
    lead: "AIモデルの現在戦闘力とコストを中心に比較します。",
    notice: "戦闘力は公開資料から相対的に推定する独自の参考指標です。現在の登録値は初期の暫定評価です。",
    filters: "検索・絞り込み",
    history: "更新履歴",
    listedModels: "掲載モデル", lastUpdated: "データ更新", search: "検索",
    searchPlaceholder: "モデル名・企業名で検索", provider: "企業", availability: "提供状態", access: "表示範囲", sort: "並び順",
    all: "すべて", active: "提供中", preview: "Preview", retired: "提供終了", unknownStatus: "未確認",
    majorServices: "主要サービス", generalAccess: "一般向け", freeAvailable: "無料利用あり", localAvailable: "ローカル可",
    sortPowerDesc: "現在戦闘力：高い順", sortCostPerformanceDesc: "コスパ：高い順", sortCostAsc: "標準コスト：安い順", sortAdoptedDesc: "採用戦闘力：高い順",
    sortReleasedDesc: "公開日：新しい順", sortNameAsc: "モデル名：昇順",
    model: "モデル", currentPower: "現在戦闘力", standardCost: "標準コスト", costPerformance: "コスパ", adoptedPower: "採用戦闘力",
    inputPrice: "Input", outputPrice: "Output", free: "無料", local: "Local", released: "公開",
    scrollHint: "モデル名を固定したまま右へスクロールできます →",
    emptyTitle: "該当するモデルはありません", emptyBody: "条件を変えてください。", loading: "データを読み込んでいます…",
    methodTitle: "表示値について",
    methodBody: "現在戦闘力は採用戦闘力を最新基準へ換算した値です。標準コストはInput 75% / Output 25%として現時点の標準API価格から自動計算します。",
    methodNote: "コスパは「現在戦闘力 ÷ 標準コスト」。高いほど、1ドルあたりの参考性能が高いことを示します。",
    scopeMajorNote: "主要サービス：OpenAI / Anthropic / Google / xAI（Grok）",
    scopeGeneralNote: "一般向け：上記に加えて、Z.ai、DeepSeek、Kimiなど、Webやアプリから普通に導入・利用できるもの",
    scopeAllNote: "すべて：API-only、Local-only、CLI-only、過去モデルも含むDB全件",
    provisional: "仮公開", yes: "あり", no: "なし", unknown: "—",
    dataErrorTitle: "データを読み込めませんでした", dataErrorBody: "JSONファイルを確認してください。"
  },
  en: {
    title: "AI Model Power Database",
    lead: "Compare current model power and cost at a glance.",
    notice: "Power is an independent relative reference index derived from public evidence. Current entries are provisional evaluations.",
    filters: "Search & filters",
    history: "History",
    listedModels: "Models", lastUpdated: "Data updated", search: "Search",
    searchPlaceholder: "Search model or provider", provider: "Provider", availability: "Availability", access: "Scope", sort: "Sort",
    all: "All", active: "Active", preview: "Preview", retired: "Retired", unknownStatus: "Unverified",
    majorServices: "Major services", generalAccess: "General access", freeAvailable: "Free access", localAvailable: "Local available",
    sortPowerDesc: "Current power: high to low", sortCostPerformanceDesc: "Value: high to low", sortCostAsc: "Standard cost: low to high", sortAdoptedDesc: "Adopted power: high to low",
    sortReleasedDesc: "Release date: newest", sortNameAsc: "Model name: A-Z",
    model: "Model", currentPower: "Current power", standardCost: "Standard cost", costPerformance: "Value", adoptedPower: "Adopted power",
    inputPrice: "Input", outputPrice: "Output", free: "Free", local: "Local", released: "Released",
    scrollHint: "Model names stay fixed while you scroll right →",
    emptyTitle: "No matching models", emptyBody: "Change the filters and try again.", loading: "Loading data…",
    methodTitle: "About displayed values",
    methodBody: "Current power converts adopted power to the latest reference. Standard cost is calculated from currently available standard API pricing using 75% input and 25% output.",
    methodNote: "Value = current power ÷ standard cost. Higher means more reference performance per dollar.",
    scopeMajorNote: "Major services: OpenAI / Anthropic / Google / xAI (Grok)",
    scopeGeneralNote: "General access: the above plus Z.ai, DeepSeek, Kimi and others that can be normally installed and used through the web or an app",
    scopeAllNote: "All: every database record, including API-only, local-only, CLI-only and older models",
    provisional: "Provisional", yes: "Yes", no: "No", unknown: "—",
    dataErrorTitle: "Could not load data", dataErrorBody: "Check the JSON files."
  }
};

const state = {
  lang: localStorage.getItem("ai-model-power-lang") || (navigator.language?.toLowerCase().startsWith("ja") ? "ja" : "en"),
  models: [], evaluations: [], prices: [], priceRule: null, bridges: null, updatedAt: null
};

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key] ?? key;
const MAJOR_PROVIDERS = new Set(["OpenAI", "Anthropic", "Google", "xAI", "SpaceXAI"]);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[ch]);
}

function latestIso(...values) {
  return values.filter(Boolean).sort().at(-1) || null;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = state.lang === "ja" ? "AIモデル戦闘力データベース | Lab 3776" : "AI Model Power Database | Lab 3776";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  $("langToggle").textContent = state.lang === "ja" ? "EN" : "日本語";
  render();
}

async function loadData() {
  try {
    const paths = ["models", "evaluations", "prices", "benchmark-bridges", "major-history-models", "major-history-evaluations"];
    const [models, evaluations, prices, bridges, historyModels, historyEvaluations] = await Promise.all(paths.map(name =>
      fetch(`data/${name}.json`, {cache: "no-store"}).then(r => r.ok ? r.json() : Promise.reject(r.status))
    ));
    state.models = [...(models.models || []), ...(historyModels.models || [])];
    state.evaluations = [...(evaluations.evaluations || []), ...(historyEvaluations.evaluations || [])];
    state.prices = prices.prices || [];
    state.priceRule = prices.standard_cost_rule || {input_weight: .75, output_weight: .25};
    state.bridges = bridges;
    state.updatedAt = latestIso(models.updated_at, evaluations.updated_at, prices.updated_at, bridges.updated_at, historyModels.updated_at, historyEvaluations.updated_at);
    populateProviders();
    $("loadingState").hidden = true;
    render();
  } catch (error) {
    console.error(error);
    $("loadingState").hidden = false;
    $("loadingState").innerHTML = `<strong>${escapeHtml(t("dataErrorTitle"))}</strong><p>${escapeHtml(t("dataErrorBody"))}</p>`;
  }
}

function populateProviders() {
  const select = $("providerFilter");
  const current = select.value;
  select.querySelectorAll("option:not(:first-child)").forEach(option => option.remove());
  [...new Set(state.models.map(m => m.provider).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))
    .forEach(provider => {
      const option = document.createElement("option");
      option.value = provider;
      option.textContent = provider;
      option.translate = false;
      select.appendChild(option);
    });
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function getLatestEvaluation(modelId) {
  return state.evaluations
    .filter(e => e.model_id === modelId && e.superseded !== true)
    .sort((a, b) => String(b.evaluated_at || "").localeCompare(String(a.evaluated_at || "")))[0] || null;
}

function getLatestPrice(modelId) {
  return state.prices
    .filter(p => p.model_id === modelId && p.active !== false)
    .sort((a, b) => String(b.effective_from || "").localeCompare(String(a.effective_from || "")))[0] || null;
}

function convertPower(adoptedPower, basis) {
  if (adoptedPower == null || !basis || !state.bridges?.current_reference) return adoptedPower;
  const target = state.bridges.current_reference;
  if (basis.benchmark !== target.benchmark || basis.version === target.version) return adoptedPower;

  const edges = state.bridges.bridges || [];
  const queue = [{version: basis.version, value: Number(adoptedPower), visited: new Set([basis.version])}];
  while (queue.length) {
    const node = queue.shift();
    if (node.version === target.version) return Math.round(node.value);
    for (const edge of edges.filter(e => e.benchmark === basis.benchmark && e.from_version === node.version)) {
      if (node.visited.has(edge.to_version)) continue;
      let value = node.value;
      if (edge.type === "linear") value = Number(edge.a ?? 1) * value + Number(edge.b ?? 0);
      else if (edge.type === "multiplier") value *= Number(edge.factor ?? 1);
      else continue;
      const visited = new Set(node.visited);
      visited.add(edge.to_version);
      queue.push({version: edge.to_version, value, visited});
    }
  }
  return adoptedPower;
}

function standardCost(price) {
  if (!price) return null;
  const input = Number(price.input_usd_per_million_tokens);
  const output = Number(price.output_usd_per_million_tokens);
  if (!Number.isFinite(input) || !Number.isFinite(output)) return null;
  return input * Number(state.priceRule?.input_weight ?? .75) + output * Number(state.priceRule?.output_weight ?? .25);
}

function costPerformance(currentPower, cost) {
  const p = Number(currentPower);
  const c = Number(cost);
  if (!Number.isFinite(p) || !Number.isFinite(c) || c <= 0) return null;
  return p / c;
}

function nullableBool(modelValue, priceValue = null) {
  if (modelValue === true || priceValue === true) return true;
  if (modelValue === false) return false;
  return null;
}

function availabilityText(value) {
  if (value == null) return t("unknown");
  return value ? t("yes") : t("no");
}

function availabilityClass(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  return "";
}

function buildRows() {
  return state.models.map(model => {
    const evaluation = getLatestEvaluation(model.id);
    const price = getLatestPrice(model.id);
    const adoptedPower = evaluation?.adopted_power ?? null;
    const currentPower = convertPower(adoptedPower, evaluation?.basis);
    const cost = standardCost(price);
    return {
      ...model,
      evaluation,
      price,
      adoptedPower,
      currentPower,
      standardCost: cost,
      costPerformance: costPerformance(currentPower, cost),
      inputPrice: price?.input_usd_per_million_tokens ?? null,
      outputPrice: price?.output_usd_per_million_tokens ?? null,
      freeAccess: nullableBool(model.free_access, price?.free_tier),
      localAvailable: model.local_available == null ? null : Boolean(model.local_available),
      generalAccessAvailable: model.general_access_available === true
    };
  });
}

function filteredRows() {
  const q = $("searchInput").value.trim().toLowerCase();
  const provider = $("providerFilter").value;
  const status = $("statusFilter").value;
  const access = $("accessFilter").value;
  const sort = $("sortSelect").value;

  const rows = buildRows().filter(row => {
    if (q && !`${row.name || ""} ${row.variant || ""} ${row.provider || ""}`.toLowerCase().includes(q)) return false;
    if (provider && row.provider !== provider) return false;
    if (status && row.status !== status) return false;
    if (access === "major" && !(row.generalAccessAvailable && MAJOR_PROVIDERS.has(row.provider))) return false;
    if (access === "general" && !row.generalAccessAvailable) return false;
    if (access === "free" && row.freeAccess !== true) return false;
    if (access === "local" && row.localAvailable !== true) return false;
    return true;
  });

  const numDesc = key => (a, b) => (b[key] ?? -Infinity) - (a[key] ?? -Infinity);
  if (sort === "cost_performance_desc") rows.sort(numDesc("costPerformance"));
  else if (sort === "standard_cost_asc") rows.sort((a, b) => (a.standardCost ?? Infinity) - (b.standardCost ?? Infinity));
  else if (sort === "adopted_power_desc") rows.sort(numDesc("adoptedPower"));
  else if (sort === "released_desc") rows.sort((a, b) => String(b.released_at || "").localeCompare(String(a.released_at || "")));
  else if (sort === "name_asc") rows.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  else rows.sort(numDesc("currentPower"));
  return rows;
}

function statusText(status) {
  if (status === "active") return t("active");
  if (status === "preview") return t("preview");
  if (status === "retired") return t("retired");
  return t("unknownStatus");
}

function formatDate(value) {
  if (!value) return t("unknown");
  const match = String(value).match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  if (!match) return value;
  const [, year, month, day] = match;
  if (!month) return state.lang === "ja" ? `${year}年` : year;
  const date = new Date(Number(year), Number(month) - 1, Number(day || 1));
  if (Number.isNaN(date.getTime())) return value;
  const options = day
    ? {year: "numeric", month: "short", day: "numeric"}
    : {year: "numeric", month: "long"};
  return new Intl.DateTimeFormat(state.lang === "ja" ? "ja-JP" : "en-US", options).format(date);
}

function formatMoney(value) {
  if (value == null || !Number.isFinite(Number(value))) return t("unknown");
  return `$${Number(value).toFixed(2)}`;
}

function formatCostPerformance(value) {
  if (value == null || !Number.isFinite(Number(value))) return t("unknown");
  return Math.round(Number(value)).toString();
}

function rowHtml(row) {
  const displayName = row.variant ? `${row.name} ${row.variant}` : row.name;
  const statusClass = row.status === "preview" ? "status-preview" : row.status === "retired" ? "no" : row.status === "active" ? "status-active" : "";
  return `<div class="table-row model-row">
    <div class="model-cell" translate="no"><span class="model-name">${escapeHtml(displayName)}</span><span class="model-sub">${escapeHtml(row.provider || "—")}</span></div>
    <div class="metric-cell current-power"><strong>${row.currentPower ?? "—"}</strong></div>
    <div class="metric-cell standard-cost"><strong>${escapeHtml(formatMoney(row.standardCost))}</strong></div>
    <div class="metric-cell cost-performance"><strong>${escapeHtml(formatCostPerformance(row.costPerformance))}</strong></div>
    <div class="metric-cell"><strong>${row.adoptedPower ?? "—"}</strong></div>
    <div class="metric-cell">${escapeHtml(formatMoney(row.inputPrice))}</div>
    <div class="metric-cell">${escapeHtml(formatMoney(row.outputPrice))}</div>
    <div class="metric-cell ${availabilityClass(row.freeAccess)}">${escapeHtml(availabilityText(row.freeAccess))}</div>
    <div class="metric-cell ${availabilityClass(row.localAvailable)}">${escapeHtml(availabilityText(row.localAvailable))}</div>
    <div class="metric-cell">${escapeHtml(formatDate(row.released_at))}</div>
    <div class="metric-cell ${statusClass}">${escapeHtml(statusText(row.status))}</div>
  </div>`;
}

function render() {
  if (!$("modelList")) return;
  const rows = filteredRows();
  $("modelCount").textContent = state.models.length.toLocaleString(state.lang === "ja" ? "ja-JP" : "en-US");
  $("updatedAt").textContent = state.updatedAt ? formatDate(state.updatedAt) : t("unknown");
  $("modelList").innerHTML = rows.map(rowHtml).join("");

  const empty = $("emptyState");
  if (rows.length === 0 && state.models.length > 0 && $("loadingState").hidden) {
    empty.hidden = false;
    empty.innerHTML = `<strong>${escapeHtml(t("emptyTitle"))}</strong><p>${escapeHtml(t("emptyBody"))}</p>`;
  } else {
    empty.hidden = true;
  }
}

["searchInput", "providerFilter", "statusFilter", "accessFilter", "sortSelect"].forEach(id => {
  $(id).addEventListener(id === "searchInput" ? "input" : "change", render);
});

$("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "ja" ? "en" : "ja";
  localStorage.setItem("ai-model-power-lang", state.lang);
  applyLanguage();
});

applyLanguage();
const desktopControls = window.matchMedia("(min-width: 760px)");
const syncControls = () => { document.querySelector(".controls").open = desktopControls.matches; };
desktopControls.addEventListener("change", syncControls);
syncControls();
loadData();