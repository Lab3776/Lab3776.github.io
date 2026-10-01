# AI model comparison: data and update history

## Default comparison scope

The database may contain general-access, API-only, CLI-only, local-only, special-purpose and retired models. The top page uses three display scopes:

- **Major services**: OpenAI / Anthropic / Google / xAI (Grok). This is the default scope.
- **General access**: Major services plus Z.ai, DeepSeek, Kimi and other models that can be normally installed and used through a web service or app.
- **All**: every database record, including API-only, local-only, CLI-only and older models.

The Major services scope is a subset of General access: the model/profile must satisfy `general_access_available` and its provider must be one of OpenAI, Anthropic, Google or xAI/Grok. Retired models are excluded separately by the default `active` status filter.

`data/models.json` uses `general_access_available` for the General access decision.

- `true`: the evaluated model/profile can be reached without direct API setup, terminal commands, or manually installing model files.
- Qualifying routes include a web service, App Store / Google Play app, or normal Windows / macOS installer.
- GUI products such as Work, Cursor or Antigravity also qualify when the model is directly selectable and usable from the app.
- `false`: direct API/CLI access is required, the normal install path is command based, or the user must obtain/install the model itself (for example through Ollama, Bionic or LM Studio).
- A model can be `general_access_available: true` and also support API or local execution.

This field describes access difficulty rather than provider popularity or technical capability.

## Public update history

`history.html` displays `data/history.json`. It supports Japanese/English, text search,
update-area/type/date filters and sorting by date, update area, change or reason.

The public history is for the whole database, not only model records. Record meaningful
changes to model data, evaluations, prices, calculation or conversion methods, and site
behavior/pages when they are useful to users.

For new entries, prefer a stable `target_id` and a human-readable `target`. When the
update-area label itself should be localized, use `target_ja` and `target_en`; `target`
is the fallback. Examples include a model/profile name, `計算方法` / `Calculation method`,
`トップページ` / `Top page`, or `履歴ページ` / `History page`. Existing imported entries
that use `model_id` and `model_name` remain supported for backward compatibility.

Each entry also stores a stable unique `id`, an ISO `updated_at` (with timezone), `type`,
and Japanese/English `change_*` and `reason_*` fields. Useful types include
`registration`, `evaluation`, `price`, `metadata`, `method`, and `site`; other types may be
added when needed. Keep the reason concrete and grounded in the relevant evidence or
design decision.

`source_commit` is an optional provenance pointer for imported historical records.
Update the history file's `updated_at` when appending an entry. The comparison page's
data update date continues to reflect model/evaluation/price/benchmark data updates.

Initial history imports the existing evaluation records and verified pricing and
release-date changes from Git. Existing model entries are retained as-is. The history
does not display dedicated before/after value columns.
