const I18N = {
  ja: {
    title: "AIモデル戦闘力データベース",
    lead: "Gemini 2.5 Flash（2025年6月）= 100 を基準に、AIモデルの戦闘力とコストを横断比較します。",
    notice: "戦闘力は Gemini 2.5 Flash（2025年6月）= 100 を基準に、AA Intelligence Index をオッズ型換算した独自の相対性能指数（amp-scale-v1）です。数値の倍率は実際の能力・正答率の倍率ではありません。",
    filters: "検索・絞り込み",
    history: "更新履歴",
    listedModels: "掲載モデル", shownModels: "表示", lastUpdated: "データ更新", search: "検索",
    quickSortPower: "戦闘力順", quickSortValue: "コスパ順", quickSortCost: "安い順",
    allApps: "Lab 3776 アプリ一覧",
    searchPlaceholder: "モデル名・企業名で検索", provider: "企業", availability: "提供状態", access: "表示範囲", sort: "並び順",
    all: "すべて", active: "提供中", preview: "Preview", retired: "提供終了", unknownStatus: "未確認",
    majorServices: "主要サービス", generalAccess: "一般向け", freeAvailable: "無料利用あり", localAvailable: "ローカル可",
    sortPowerDesc: "現在戦闘力：高い順", sortCostPerformanceDesc: "コスパ：高い順", sortCostAsc: "標準コスト：安い順", sortAdoptedDesc: "AA元値：高い順",
    sortReleasedDesc: "公開日：新しい順", sortNameAsc: "モデル名：昇順",
    model: "モデル", currentPower: "現在戦闘力", standardCost: "標準コスト", costPerformance: "コスパ", adoptedPower: "AA元値",
    inputPrice: "Input", outputPrice: "Output", free: "無料", local: "Local", released: "公開",
    scrollHint: "モデル名を固定したまま右へスクロールできます →",
    emptyTitle: "該当するモデルはありません", emptyBody: "条件を変えてください。", loading: "データを読み込んでいます…",
    methodTitle: "表示値について",
    methodBody: "v5.0.1 のロジット座標と基準定数を凍結し、上限なく性能インフレを表現します。「~」付きは v4.3.2 実測から16ペアの凍結ブリッジで推定した参考値です（v4 範囲 16〜58 の外は外挿）。標準コストは Input 75% / Output 25% の標準API価格から算出します。",
    methodNote: "コスパは「戦闘力 ÷ 標準コスト」（対数バー表示）。推論トークン量や再試行は含まないため、高難度用途では必要十分な戦闘力を満たすモデルから選んでください。",
    scopeMajorNote: "主要サービス：OpenAI / Anthropic / Google / xAI（Grok） / Meta（Muse）",
    scopeGeneralNote: "一般向け：上記に加えて、Z.ai、DeepSeek、Kimi、Mistral、MiniMaxなど、Webやアプリから普通に導入・利用できるもの",
    scopeAllNote: "すべて：API-only、Local-only、CLI-only、過去モデルも含むDB全件",
    estTooltip: "v4.3.2 実測から凍結ブリッジで推定した参考値",
    extrapolatedTooltip: "v4.3.2 ペア範囲（16〜58）の外のため外挿による参考値",
    provisional: "仮公開", yes: "あり", no: "なし", unknown: "—",
    dataErrorTitle: "データを読み込めませんでした", dataErrorBody: "JSONファイルを確認してください。"
  },
  en: {
    title: "AI Model Power Database",
    lead: "Compare AI model power (anchored to Gemini 2.5 Flash June 2025 = 100) and API cost in one table.",
    notice: "Power is an independent odds-style relative performance index (amp-scale-v1) converted from AA Intelligence Index with Gemini 2.5 Flash (June 2025) = 100. Ratios are not literal capability or accuracy multipliers.",
    filters: "Search & filters",
    history: "History",
    listedModels: "Models", shownModels: "Showing", lastUpdated: "Data updated", search: "Search",
    quickSortPower: "Top power", quickSortValue: "Best value", quickSortCost: "Lowest cost",
    allApps: "All Lab 3776 apps",
    searchPlaceholder: "Search model or provider", provider: "Provider", availability: "Availability", access: "Scope", sort: "Sort",
    all: "All", active: "Active", preview: "Preview", retired: "Retired", unknownStatus: "Unverified",
    majorServices: "Major services", generalAccess: "General access", freeAvailable: "Free access", localAvailable: "Local available",
    sortPowerDesc: "Current power: high to low", sortCostPerformanceDesc: "Value: high to low", sortCostAsc: "Standard cost: low to high", sortAdoptedDesc: "AA raw: high to low",
    sortReleasedDesc: "Release date: newest", sortNameAsc: "Model name: A-Z",
    model: "Model", currentPower: "Current power", standardCost: "Standard cost", costPerformance: "Value", adoptedPower: "AA raw",
    inputPrice: "Input", outputPrice: "Output", free: "Free", local: "Local", released: "Released",
    scrollHint: "Model names stay fixed while you scroll right →",
    emptyTitle: "No matching models", emptyBody: "Change the filters and try again.", loading: "Loading data…",
    methodTitle: "About displayed values",
    methodBody: "Uses a permanently fixed v5.0.1 logit axis and frozen origin constant with no upper cap. Values marked with '~' are estimates converted from v4.3.2 via a frozen 16-pair bridge (extrapolated outside v4 16-58). Standard cost uses 75% input / 25% output standard API pricing.",
    methodNote: "Value = power ÷ standard cost (bars use log scale). Reasoning token overhead and retries are not included; pick models that meet your required power first.",
    scopeMajorNote: "Major services: OpenAI / Anthropic / Google / xAI (Grok) / Meta (Muse)",
    scopeGeneralNote: "General access: the above plus Z.ai, DeepSeek, Kimi, Mistral, MiniMax and others normally usable via web or app",
    scopeAllNote: "All: every database record, including API-only, local-only, CLI-only and older models",
    estTooltip: "Estimated from v4.3.2 via frozen logit-linear bridge",
    extrapolatedTooltip: "Extrapolated outside the v4.3.2 calibration pair range (16-58)",
    provisional: "Provisional", yes: "Yes", no: "No", unknown: "—",
    dataErrorTitle: "Could not load data", dataErrorBody: "Check the JSON files."
  }
};

const state = {
  lang: localStorage.getItem("ai-model-power-lang") || (navigator.language?.toLowerCase().startsWith("ja") ? "ja" : "en"),
  models: [], evaluations: [], prices: [], priceRule: null, bridges: null, updatedAt: null,
  sortKey: "current_power",
  sortDir: "desc"
};

const DEFAULT_SORT_DIR = {
  current_power: "desc",
  cost_performance: "desc",
  adopted_power: "desc",
  released: "desc",
  standard_cost: "asc",
  input_price: "asc",
  output_price: "asc",
  name: "asc"
};

const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key] ?? key;
const MAJOR_PROVIDERS = new Set(["OpenAI", "Anthropic", "Google", "xAI", "SpaceXAI", "Meta"]);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[ch]);
}

function latestIso(...values) {
  return values.filter(Boolean).sort().at(-1) || null;
}

const MODEL_FAMILY_ALIASES = new Map([
  ["google-gemini-3-1-pro", "google-gemini-3-1-pro-preview"],
  ["google-gemini-3-flash", "google-gemini-3-flash-preview-reasoning"],
  ["google-gemini-3-pro", "google-gemini-3-pro-preview-high"],
  ["openai-o4-mini", "openai-o4-mini-high"],
  ["openai-gpt-4-5", "openai-gpt-4-5-preview"],
  ["anthropic-claude-sonnet-3-7", "anthropic-claude-3-7-sonnet-reasoning"],
  ["openai-o3-mini", "openai-o3-mini-high"]
]);
const CANONICAL_MODEL_FAMILY_IDS = new Set(MODEL_FAMILY_ALIASES.values());

function modelFamilyKey(model) {
  const id = String(model?.id || "").trim().toLowerCase();
  const canonicalId = MODEL_FAMILY_ALIASES.get(id) || (CANONICAL_MODEL_FAMILY_IDS.has(id) ? id : null);
  if (canonicalId) return `canonical|${canonicalId}`;
  if (id === "openai-o3" || id === "openai-o3-pro") return `canonical|${id}`;
  return `${String(model?.provider || "").trim().toLowerCase()}|${String(model?.name || "").trim().toLowerCase()}`;
}

function mergeCatalogModels(baseModels, historyModels) {
  const history = historyModels || [];
  const historyKeys = new Set(history.map(modelFamilyKey));
  return [
    ...(baseModels || []).filter(model => !historyKeys.has(modelFamilyKey(model))),
    ...history
  ];
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
    state.models = mergeCatalogModels(models.models || [], historyModels.models || []);
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

function computeScaledPower(adoptedPower, basis) {
  const empty = {raw: null, isEstimated: false, isExtrapolated: false, basisVersion: basis?.version || null};
  if (adoptedPower == null || !basis?.benchmark || !basis?.version) return empty;
  const s = Number(adoptedPower);
  if (!Number.isFinite(s) || s <= 0 || s >= 100) return empty;

  const scale = state.bridges?.scale;
  const tf = state.bridges?.version_transforms?.[basis.benchmark]?.[basis.version];
  if (!scale || !tf) return empty;

  const logit = Math.log(s / (100 - s));
  let theta;
  if (tf.type === "logit_identity") theta = logit;
  else if (tf.type === "logit_linear") theta = Number(tf.a) * logit + Number(tf.b);
  else return empty;

  const alpha = Number(scale.alpha);
  const originPower = Number(scale.origin_power);
  const thetaRef = Number(scale.theta_ref);
  if (!Number.isFinite(theta) || !Number.isFinite(alpha) || !Number.isFinite(originPower) || !Number.isFinite(thetaRef)) return empty;

  const raw = originPower * Math.exp(alpha * (theta - thetaRef));
  if (!Number.isFinite(raw) || raw <= 0) return empty;

  const range = tf.covered_from_range;
  const isExtrapolated = Array.isArray(range) && range.length === 2 ? (s < range[0] || s > range[1]) : false;
  return {
    raw,
    isEstimated: Boolean(tf.is_estimated),
    isExtrapolated,
    basisVersion: basis.version
  };
}

function standardCost(price) {
  if (!price || price.input_usd_per_million_tokens == null || price.output_usd_per_million_tokens == null) return null;
  const input = Number(price.input_usd_per_million_tokens);
  const output = Number(price.output_usd_per_million_tokens);
  if (!Number.isFinite(input) || !Number.isFinite(output) || input < 0 || output < 0) return null;
  return input * Number(state.priceRule?.input_weight ?? .75) + output * Number(state.priceRule?.output_weight ?? .25);
}

function costPerformance(currentPower, cost) {
  if (currentPower == null || cost == null) return null;
  const p = Number(currentPower);
  const c = Number(cost);
  if (!Number.isFinite(p) || !Number.isFinite(c) || p <= 0 || c <= 0) return null;
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
    const scaled = computeScaledPower(adoptedPower, evaluation?.basis);
    const cost = standardCost(price);
    return {
      ...model,
      evaluation,
      price,
      adoptedPower,
      basisVersion: scaled.basisVersion,
      currentPower: scaled.raw,
      isEstimated: scaled.isEstimated,
      isExtrapolated: scaled.isExtrapolated,
      standardCost: cost,
      costPerformance: costPerformance(scaled.raw, cost),
      inputPrice: price?.input_usd_per_million_tokens ?? null,
      outputPrice: price?.output_usd_per_million_tokens ?? null,
      freeAccess: nullableBool(model.free_access, price?.free_tier),
      localAvailable: model.local_available == null ? null : Boolean(model.local_available),
      generalAccessAvailable: model.general_access_available === true
    };
  });
}

function parseSortToken(token) {
  const match = String(token || "").match(/^(.+)_(asc|desc)$/);
  if (!match) return {key: "current_power", dir: "desc"};
  return {key: match[1], dir: match[2]};
}

function compareNullableNum(a, b, dir) {
  const av = a == null || !Number.isFinite(Number(a)) ? null : Number(a);
  const bv = b == null || !Number.isFinite(Number(b)) ? null : Number(b);
  if (av === null && bv === null) return 0;
  if (av === null) return 1;
  if (bv === null) return -1;
  return dir === "asc" ? av - bv : bv - av;
}

function compareNullableStr(a, b, dir) {
  const av = a ? String(a) : "";
  const bv = b ? String(b) : "";
  if (!av && !bv) return 0;
  if (!av) return 1;
  if (!bv) return -1;
  return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
}

function filteredRows(allRows) {
  const q = $("searchInput").value.trim().toLowerCase();
  const provider = $("providerFilter").value;
  const status = $("statusFilter").value;
  const access = $("accessFilter").value;

  const rows = allRows.filter(row => {
    if (q && !`${row.name || ""} ${row.variant || ""} ${row.provider || ""}`.toLowerCase().includes(q)) return false;
    if (provider && row.provider !== provider) return false;
    if (status && row.status !== status) return false;
    if (access === "major" && !(row.generalAccessAvailable && MAJOR_PROVIDERS.has(row.provider))) return false;
    if (access === "general" && !row.generalAccessAvailable) return false;
    if (access === "free" && row.freeAccess !== true) return false;
    if (access === "local" && row.localAvailable !== true) return false;
    return true;
  });

  const {sortKey, sortDir} = state;
  rows.sort((a, b) => {
    if (sortKey === "cost_performance") return compareNullableNum(a.costPerformance, b.costPerformance, sortDir);
    if (sortKey === "standard_cost") return compareNullableNum(a.standardCost, b.standardCost, sortDir);
    if (sortKey === "adopted_power") return compareNullableNum(a.adoptedPower, b.adoptedPower, sortDir);
    if (sortKey === "input_price") return compareNullableNum(a.inputPrice, b.inputPrice, sortDir);
    if (sortKey === "output_price") return compareNullableNum(a.outputPrice, b.outputPrice, sortDir);
    if (sortKey === "released") return compareNullableStr(a.released_at, b.released_at, sortDir);
    if (sortKey === "name") return compareNullableStr(a.name, b.name, sortDir);
    return compareNullableNum(a.currentPower, b.currentPower, sortDir);
  });
  return rows;
}

function syncQuickAndHeaderUi() {
  const access = $("accessFilter").value;
  document.querySelectorAll("[data-quick-access]").forEach(btn => {
    const active = btn.dataset.quickAccess === access;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  const sortToken = `${state.sortKey}_${state.sortDir}`;
  const sortSelect = $("sortSelect");
  if ([...sortSelect.options].some(opt => opt.value === sortToken)) {
    sortSelect.value = sortToken;
  }

  document.querySelectorAll("[data-quick-sort]").forEach(btn => {
    const active = btn.dataset.quickSort === sortToken;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelectorAll(".sort-btn[data-sort-key]").forEach(btn => {
    const active = btn.dataset.sortKey === state.sortKey;
    btn.classList.toggle("is-active", active);
    if (active) {
      btn.dataset.dir = state.sortDir;
      btn.parentElement?.setAttribute("aria-sort", state.sortDir === "asc" ? "ascending" : "descending");
    } else {
      delete btn.dataset.dir;
      btn.parentElement?.removeAttribute("aria-sort");
    }
  });
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

function formatPower(value, isEstimated) {
  if (value == null || !Number.isFinite(Number(value)) || Number(value) <= 0) return t("unknown");
  const locale = state.lang === "ja" ? "ja-JP" : "en-US";
  const num = Number(value);
  const text = num < 1 ? "<1" : Math.round(num).toLocaleString(locale);
  return isEstimated ? `~${text}` : text;
}

function formatCostPerformance(value) {
  if (value == null || !Number.isFinite(Number(value)) || Number(value) <= 0) return t("unknown");
  const locale = state.lang === "ja" ? "ja-JP" : "en-US";
  const num = Number(value);
  return num < 1 ? "<1" : Math.round(num).toLocaleString(locale);
}

function rowHtml(row, index, maxPower) {
  const displayName = row.variant ? `${row.name} ${row.variant}` : row.name;
  const statusClass = row.status === "preview" ? "status-preview" : row.status === "retired" ? "no" : row.status === "active" ? "status-active" : "";
  const rank = index + 1;
  const rankClass = rank <= 3 ? "rank-num rank-top" : "rank-num";
  const pct = row.currentPower != null && row.currentPower > 0 && maxPower > 1
    ? Math.max(6, Math.min(100, Math.round((Math.log(Math.max(1, row.currentPower)) / Math.log(maxPower)) * 100)))
    : 0;
  const barHtml = row.currentPower != null ? `<span class="power-bar" aria-hidden="true"><span class="power-bar-fill${row.isEstimated ? " is-est" : ""}" style="width:${pct}%"></span></span>` : "";
  const powerTitle = row.isExtrapolated ? t("extrapolatedTooltip") : row.isEstimated ? t("estTooltip") : "";
  const powerClass = row.isEstimated ? "power-est" : "";
  const rawVer = row.basisVersion ? `<span class="raw-ver">v${escapeHtml(row.basisVersion)}</span>` : "";
  return `<div class="table-row model-row">
    <div class="model-cell" translate="no"><div class="model-head-line"><span class="${rankClass}">${rank}</span><span class="model-name">${escapeHtml(displayName)}</span></div><span class="model-sub">${escapeHtml(row.provider || "—")}</span></div>
    <div class="metric-cell current-power"${powerTitle ? ` title="${escapeHtml(powerTitle)}"` : ""}><strong class="${powerClass}">${escapeHtml(formatPower(row.currentPower, row.isEstimated))}</strong>${barHtml}</div>
    <div class="metric-cell standard-cost"><strong>${escapeHtml(formatMoney(row.standardCost))}</strong></div>
    <div class="metric-cell cost-performance"><strong>${escapeHtml(formatCostPerformance(row.costPerformance))}</strong></div>
    <div class="metric-cell raw-cell"><strong>${row.adoptedPower ?? "—"}</strong>${rawVer}</div>
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
  syncQuickAndHeaderUi();
  const allRows = buildRows();
  const maxPower = allRows.reduce((max, r) => (r.currentPower != null && r.currentPower > max ? r.currentPower : max), 0);
  const rows = filteredRows(allRows);
  const locale = state.lang === "ja" ? "ja-JP" : "en-US";
  if ($("shownCount")) $("shownCount").textContent = rows.length.toLocaleString(locale);
  $("modelCount").textContent = state.models.length.toLocaleString(locale);
  $("updatedAt").textContent = state.updatedAt ? formatDate(state.updatedAt) : t("unknown");
  $("modelList").innerHTML = rows.map((row, index) => rowHtml(row, index, maxPower)).join("");

  const empty = $("emptyState");
  if (rows.length === 0 && state.models.length > 0 && $("loadingState").hidden) {
    empty.hidden = false;
    empty.innerHTML = `<strong>${escapeHtml(t("emptyTitle"))}</strong><p>${escapeHtml(t("emptyBody"))}</p>`;
  } else {
    empty.hidden = true;
  }
}

["searchInput", "providerFilter", "statusFilter", "accessFilter"].forEach(id => {
  $(id).addEventListener(id === "searchInput" ? "input" : "change", render);
});

$("sortSelect").addEventListener("change", () => {
  const parsed = parseSortToken($("sortSelect").value);
  state.sortKey = parsed.key;
  state.sortDir = parsed.dir;
  render();
});

document.querySelectorAll("[data-quick-access]").forEach(btn => {
  btn.addEventListener("click", () => {
    $("accessFilter").value = btn.dataset.quickAccess;
    render();
  });
});

document.querySelectorAll("[data-quick-sort]").forEach(btn => {
  btn.addEventListener("click", () => {
    const parsed = parseSortToken(btn.dataset.quickSort);
    state.sortKey = parsed.key;
    state.sortDir = parsed.dir;
    render();
  });
});

document.querySelectorAll(".sort-btn[data-sort-key]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.sortKey;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    } else {
      state.sortKey = key;
      state.sortDir = DEFAULT_SORT_DIR[key] || "desc";
    }
    render();
  });
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