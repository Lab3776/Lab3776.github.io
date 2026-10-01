const I18N = {
  ja: {title:"更新履歴",back:"← モデル比較へ",lead:"モデル・評価方法・料金・ページなどの変更内容と、その理由を確認できます。",filters:"検索・絞り込み",search:"履歴を検索",searchPlaceholder:"更新箇所・変更内容・理由で検索",target:"更新箇所",type:"変更種別",from:"更新日（開始）",to:"更新日（終了）",sort:"並び替え",newest:"更新日：新しい順",oldest:"更新日：古い順",targetSort:"更新箇所順",changeSort:"変更内容順",reasonSort:"変更理由順",date:"更新日",change:"変更内容",reason:"変更理由",all:"すべて",registration:"登録",evaluation:"評価",price:"料金",metadata:"メタデータ",method:"計算方法",site:"サイト",empty:"条件に一致する履歴はありません。",loading:"読み込み中…",error:"履歴を読み込めませんでした。ページを再読み込みしてください。",scroll:"横スクロールで変更理由まで確認できます →",count:(n,total)=>`${n}件 / 全${total}件`},
  en: {title:"Update history",back:"← Model comparison",lead:"Explore changes to models, evaluation methods, pricing, pages and other database behavior, with the reasons behind them.",filters:"Search & filters",search:"Search history",searchPlaceholder:"Search update areas, changes or reasons",target:"Update area",type:"Change type",from:"Updated from",to:"Updated through",sort:"Sort",newest:"Date: newest first",oldest:"Date: oldest first",targetSort:"Update area",changeSort:"Change",reasonSort:"Reason",date:"Updated",change:"Change",reason:"Reason",all:"All",registration:"Registration",evaluation:"Evaluation",price:"Pricing",metadata:"Metadata",method:"Calculation method",site:"Site",empty:"No history matches these filters.",loading:"Loading…",error:"Unable to load history. Please reload the page.",scroll:"Scroll horizontally to read the reasons →",count:(n,total)=>`${n} of ${total} entries`}
};
const savedLanguage = localStorage.getItem("ai-model-power-lang");
const state = {lang: ["ja","en"].includes(savedLanguage) ? savedLanguage : (navigator.language.startsWith("ja") ? "ja" : "en"), entries: [], loaded: false, failed: false};
const $ = id => document.getElementById(id);
const t = key => I18N[state.lang][key] ?? key;
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const localized = (entry, field) => entry[`${field}_${state.lang}`] ?? entry[`${field}_ja`] ?? entry[field] ?? "";
const targetId = entry => entry.target_id || entry.model_id || entry.target || entry.model_name || entry.id;
const targetName = entry => entry[`target_${state.lang}`] || entry.target || entry.model_name || entry.target_id || entry.model_id || "—";
function populateFilters() {
  const targetValue = $("targetFilter").value;
  const typeValue = $("typeFilter").value;
  const targets = [...new Map(state.entries.map(e => [targetId(e), targetName(e)])).entries()].sort((a,b) => a[1].localeCompare(b[1],state.lang));
  const types = [...new Set(state.entries.map(e => e.type).filter(Boolean))].sort((a,b) => t(a).localeCompare(t(b),state.lang));
  $("targetFilter").innerHTML = `<option value="">${t("all")}</option>` + targets.map(([id,name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join("");
  $("typeFilter").innerHTML = `<option value="">${t("all")}</option>` + types.map(type => `<option value="${escapeHtml(type)}">${escapeHtml(t(type))}</option>`).join("");
  $("targetFilter").value = targetValue;
  $("typeFilter").value = typeValue;
}
function render() {
  if (!state.loaded) return;
  const query = $("searchInput").value.trim().toLocaleLowerCase(state.lang);
  const rows = state.entries.filter(e => {
    const date = e.updated_at.slice(0,10);
    return (!$("targetFilter").value || targetId(e) === $("targetFilter").value)
      && (!$("typeFilter").value || e.type === $("typeFilter").value)
      && (!$("dateFrom").value || date >= $("dateFrom").value)
      && (!$("dateTo").value || date <= $("dateTo").value)
      && (!query || `${targetName(e)} ${localized(e,"change")} ${localized(e,"reason")}`.toLocaleLowerCase(state.lang).includes(query));
  });
  const sort = $("sortSelect").value;
  rows.sort((a,b) => {
    if (sort.startsWith("date_")) return (sort === "date_asc" ? 1 : -1) * (Date.parse(a.updated_at) - Date.parse(b.updated_at)) || a.id.localeCompare(b.id);
    const value = e => sort === "target_asc" ? targetName(e) : localized(e,sort === "change_asc" ? "change" : "reason");
    return value(a).localeCompare(value(b),state.lang) || Date.parse(b.updated_at)-Date.parse(a.updated_at) || a.id.localeCompare(b.id);
  });
  const formatDate = value => new Intl.DateTimeFormat(state.lang === "ja" ? "ja-JP" : "en-US",{year:"numeric",month:"short",day:"numeric"}).format(new Date(`${value.slice(0,10)}T00:00:00`));
  $("historyList").innerHTML = rows.map(e => `<tr><td><time datetime="${escapeHtml(e.updated_at)}">${escapeHtml(formatDate(e.updated_at))}</time></td><td>${escapeHtml(targetName(e))}</td><td>${escapeHtml(localized(e,"change"))}</td><td>${escapeHtml(localized(e,"reason"))}</td></tr>`).join("");
  $("resultCount").textContent = I18N[state.lang].count(rows.length,state.entries.length);
  $("emptyState").hidden = rows.length > 0;
}
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = `${t("title")} | ${state.lang === "ja" ? "AIモデル戦闘力データベース" : "AI Model Power Database"}`;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  $("langToggle").textContent = state.lang === "ja" ? "EN" : "日本語";
  if (state.failed) $("loadingState").textContent = t("error");
  populateFilters(); render();
}
$("langToggle").addEventListener("click",()=>{state.lang = state.lang === "ja" ? "en" : "ja";localStorage.setItem("ai-model-power-lang",state.lang);applyLanguage();});
["searchInput","targetFilter","typeFilter","dateFrom","dateTo","sortSelect"].forEach(id => $(id).addEventListener("input",render));
applyLanguage();
const desktopControls = window.matchMedia("(min-width: 760px)");
const syncControls = () => { document.querySelector(".controls").open = desktopControls.matches; };
desktopControls.addEventListener("change", syncControls);
syncControls();
(async()=>{
  try {
    const response = await fetch("data/history.json",{cache:"no-store"});
    if (!response.ok) throw new Error(`History HTTP ${response.status}`);
    state.entries = (await response.json()).entries;
    state.loaded = true; $("loadingState").hidden = true; populateFilters(); render();
  } catch(error) {console.error(error);state.failed = true;$("loadingState").textContent = t("error");}
})();
