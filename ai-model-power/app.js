const I18N = {
  ja: {
    eyebrow: "LAB 3776 / PUBLIC DATABASE",
    title: "AIモデル戦闘力データベース",
    lead: "各社AIモデルの参考性能、価格、無料利用、ローカル実行可否を横断比較するためのデータベースです。",
    notice: "戦闘力は複数の公開資料から相対的に推定する独自の参考指標です。絶対的なベンチマーク値ではありません。",
    listedModels: "掲載モデル", lastUpdated: "データ更新", search: "検索",
    searchPlaceholder: "モデル名・企業名で検索", provider: "企業", availability: "提供状態", access: "利用形態", sort: "並び順",
    all: "すべて", active: "提供中", preview: "Preview", retired: "提供終了",
    freeAvailable: "無料利用あり", localAvailable: "ローカル可",
    sortPowerDesc: "現在戦闘力：高い順", sortAdoptedDesc: "採用戦闘力：高い順", sortPriceAsc: "出力価格：安い順",
    sortReleasedDesc: "公開日：新しい順", sortNameAsc: "モデル名：昇順",
    model: "モデル", currentPower: "現在戦闘力", adoptedPower: "採用戦闘力", outputPrice: "出力価格", free: "無料", local: "Local", released: "公開",
    emptyTitle: "該当するモデルはありません", emptyBody: "条件を変えてください。", loading: "データを読み込んでいます…",
    noDataTitle: "モデルデータはまだ登録されていません", noDataBody: "データ構造と画面の仮版を公開中です。",
    methodTitle: "戦闘力について",
    methodBody: "採用戦闘力は、公式情報や信頼できる第三者ベンチマークを複数参照して相対的に決めます。現在戦闘力は、ベンチマークの世代差を共通モデルから換算して再計算します。",
    methodNote: "評価根拠と変更履歴はモデルごとに追跡できる構成を予定しています。",
    provisional: "仮公開", yes: "あり", no: "なし", unknown: "—", perMillion: "/ 1M tokens",
    dataErrorTitle: "データを読み込めませんでした", dataErrorBody: "JSONファイルを確認してください。"
  },
  en: {
    eyebrow: "LAB 3776 / PUBLIC DATABASE",
    title: "AI Model Power Database",
    lead: "A database for comparing reference performance, pricing, free access and local availability across AI models.",
    notice: "Power is an independent reference index estimated relatively from multiple public sources. It is not an absolute benchmark score.",
    listedModels: "Models", lastUpdated: "Data updated", search: "Search",
    searchPlaceholder: "Search model or provider", provider: "Provider", availability: "Availability", access: "Access", sort: "Sort",
    all: "All", active: "Active", preview: "Preview", retired: "Retired",
    freeAvailable: "Free access", localAvailable: "Local available",
    sortPowerDesc: "Current power: high to low", sortAdoptedDesc: "Adopted power: high to low", sortPriceAsc: "Output price: low to high",
    sortReleasedDesc: "Release date: newest", sortNameAsc: "Model name: A-Z",
    model: "Model", currentPower: "Current power", adoptedPower: "Adopted power", outputPrice: "Output price", free: "Free", local: "Local", released: "Released",
    emptyTitle: "No matching models", emptyBody: "Change the filters and try again.", loading: "Loading data…",
    noDataTitle: "No model data has been registered yet", noDataBody: "The provisional UI and data structure are currently published.",
    methodTitle: "About Power",
    methodBody: "Adopted power is set relatively using multiple official sources and trusted third-party benchmarks. Current power is recalculated by converting benchmark-generation differences from overlapping models.",
    methodNote: "Evaluation evidence and change history will be traceable per model.",
    provisional: "Provisional", yes: "Yes", no: "No", unknown: "—", perMillion: "/ 1M tokens",
    dataErrorTitle: "Could not load data", dataErrorBody: "Check the JSON files."
  }
};

const state = {
  lang: localStorage.getItem("ai-model-power-lang") || (navigator.language?.toLowerCase().startsWith("ja") ? "ja" : "en"),
  models: [], evaluations: [], prices: [], bridges: null,
  updatedAt: null
};

const $ = (id) => document.getElementById(id);

function t(key) { return I18N[state.lang][key] ?? key; }

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = state.lang === "ja" ? "AIモデル戦闘力データベース | Lab 3776" : "AI Model Power Database | Lab 3776";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  $("langToggle").textContent = state.lang === "ja" ? "EN" : "日本語";
  render();
}

function latestIso(...values) {
  return values.filter(Boolean).sort().at(-1) || null;
}

async function loadData() {
  try {
    const [models, evaluations, prices, bridges] = await Promise.all([
      fetch("data/models.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(r.status)),
      fetch("data/evaluations.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(r.status)),
      fetch("data/prices.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(r.status)),
      fetch("data/benchmark-bridges.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(r.status))
    ]);
    state.models = models.models || [];
    state.evaluations = evaluations.evaluations || [];
    state.prices = prices.prices || [];
    state.bridges = bridges;
    state.updatedAt = latestIso(models.updated_at, evaluations.updated_at, prices.updated_at, bridges.updated_at);
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
  const current = $("providerFilter").value;
  const providers = [...new Set(state.models.map(m => m.provider).filter(Boolean))].sort((a,b) => a.localeCompare(b));
  $("providerFilter").querySelectorAll("option:not(:first-child)").forEach(o => o.remove());
  for (const provider of providers) {
    const option = document.createElement("option");
    option.value = provider;
    option.textContent = provider;
    option.translate = false;
    $("providerFilter").appendChild(option);
  }
  if (providers.includes(current)) $("providerFilter").value = current;
}

function getLatestEvaluation(modelId) {
  return state.evaluations
    .filter(e => e.model_id === modelId)
    .sort((a,b) => String(b.evaluated_at || "").localeCompare(String(a.evaluated_at || "")))[0] || null;
}

function getLatestPrice(modelId) {
  return state.prices
    .filter(p => p.model_id === modelId && p.active !== false)
    .sort((a,b) => String(b.effective_from || "").localeCompare(String(a.effective_from || "")))[0] || null;
}

function convertPower(adoptedPower, basis) {
  if (adoptedPower == null || !basis || !state.bridges?.current_reference) return adoptedPower;
  const target = state.bridges.current_reference;
  if (basis.benchmark !== target.benchmark) return adoptedPower;
  if (basis.version === target.version) return adoptedPower;

  const edges = state.bridges.bridges || [];
  const queue = [{ version: basis.version, value: Number(adoptedPower), visited: new Set([basis.version]) }];
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
      queue.push({ version: edge.to_version, value, visited });
    }
  }
  return adoptedPower;
}

function buildRows() {
  return state.models.map(model => {
    const evaluation = getLatestEvaluation(model.id);
    const price = getLatestPrice(model.id);
    const adoptedPower = evaluation?.adopted_power ?? null;
    return {
      ...model,
      evaluation,
      price,
      adoptedPower,
      currentPower: convertPower(adoptedPower, evaluation?.basis),
      outputPrice: price?.output_usd_per_million_tokens ?? null,
      freeAccess: Boolean(model.free_access || price?.free_tier),
      localAvailable: Boolean(model.local_available)
    };
  });
}

function filteredRows() {
  const q = $("searchInput").value.trim().toLowerCase();
  const provider = $("providerFilter").value;
  const status = $("statusFilter").value;
  const access = $("accessFilter").value;
  const sort = $("sortSelect").value;
  let rows = buildRows().filter(row => {
    if (q && !`${row.name || ""} ${row.provider || ""}`.toLowerCase().includes(q)) return false;
    if (provider && row.provider !== provider) return false;
    if (status && row.status !== status) return false;
    if (access === "free" && !row.freeAccess) return false;
    if (access === "local" && !row.localAvailable) return false;
    return true;
  });

  const numDesc = key => (a,b) => (b[key] ?? -Infinity) - (a[key] ?? -Infinity);
  switch (sort) {
    case "adopted_power_desc": rows.sort(numDesc("adoptedPower")); break;
    case "price_asc": rows.sort((a,b) => (a.outputPrice ?? Infinity) - (b.outputPrice ?? Infinity)); break;
    case "released_desc": rows.sort((a,b) => String(b.released_at || "").localeCompare(String(a.released_at || ""))); break;
    case "name_asc": rows.sort((a,b) => String(a.name || "").localeCompare(String(b.name || ""))); break;
    default: rows.sort(numDesc("currentPower"));
  }
  return rows;
}

function statusText(status) {
  return t(status === "preview" ? "preview" : status === "retired" ? "retired" : "active");
}

function formatDate(value) {
  if (!value) return t("unknown");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(state.lang === "ja" ? "ja-JP" : "en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function formatPrice(value) {
  if (value == null) return t("unknown");
  const n = Number(value);
  const formatted = n === 0 ? "$0" : `$${n < 1 ? n.toPrecision(2) : n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  return `${formatted} ${t("perMillion")}`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function cardHtml(row) {
  return `<article class="model-card">
    <div class="model-title-row">
      <div translate="no">
        <h2 class="model-name">${escapeHtml(row.name)}</h2>
        <div class="provider">${escapeHtml(row.provider || "—")}</div>
      </div>
      <span class="status-badge ${escapeHtml(row.status || "active")}">${escapeHtml(statusText(row.status))}</span>
    </div>
    <div class="power-row">
      <div class="power-box current"><span class="metric-label">${escapeHtml(t("currentPower"))}</span><strong class="power-value">${row.currentPower ?? "—"}</strong></div>
      <div class="power-box"><span class="metric-label">${escapeHtml(t("adoptedPower"))}</span><strong class="power-value">${row.adoptedPower ?? "—"}</strong></div>
    </div>
    <div class="model-meta">
      <div class="meta-item"><span>${escapeHtml(t("outputPrice"))}</span><strong>${escapeHtml(formatPrice(row.outputPrice))}</strong></div>
      <div class="meta-item"><span>${escapeHtml(t("free"))}</span><strong class="${row.freeAccess ? "yes" : "no"}">${escapeHtml(row.freeAccess ? t("yes") : t("no"))}</strong></div>
      <div class="meta-item"><span>${escapeHtml(t("local"))}</span><strong class="${row.localAvailable ? "yes" : "no"}">${escapeHtml(row.localAvailable ? t("yes") : t("no"))}</strong></div>
      <div class="meta-item"><span>${escapeHtml(t("released"))}</span><strong>${escapeHtml(formatDate(row.released_at))}</strong></div>
    </div>
  </article>`;
}

function render() {
  if (!$("modelList")) return;
  const rows = filteredRows();
  $("modelCount").textContent = state.models.length.toLocaleString(state.lang === "ja" ? "ja-JP" : "en-US");
  $("updatedAt").textContent = formatDate(state.updatedAt);
  $("modelList").innerHTML = rows.map(cardHtml).join("");

  const noData = state.models.length === 0 && $("loadingState").hidden;
  const empty = $("emptyState");
  if (noData) {
    empty.hidden = false;
    empty.innerHTML = `<strong>${escapeHtml(t("noDataTitle"))}</strong><p>${escapeHtml(t("noDataBody"))}</p>`;
  } else if (rows.length === 0 && state.models.length > 0) {
    empty.hidden = false;
    empty.innerHTML = `<strong>${escapeHtml(t("emptyTitle"))}</strong><p>${escapeHtml(t("emptyBody"))}</p>`;
  } else {
    empty.hidden = true;
  }
}

$("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "ja" ? "en" : "ja";
  localStorage.setItem("ai-model-power-lang", state.lang);
  applyLanguage();
});

["searchInput", "providerFilter", "statusFilter", "accessFilter", "sortSelect"].forEach(id => {
  $(id).addEventListener(id === "searchInput" ? "input" : "change", render);
});

applyLanguage();
loadData();
