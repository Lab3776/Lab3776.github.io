# AI model comparison: update history

`history.html` displays `data/history.json`. It supports Japanese/English, text search,
model/type/date filters and sorting by date, model, change or reason.

When changing model records, evaluations or prices, append a history entry in the
same source change. Keep existing entries, including entries for retired or removed
models. Each entry stores a stable unique `id`, an ISO `updated_at` (with timezone),
`model_id`, the historical `model_name` (including variant), `type` (`registration`,
`evaluation`, `price`, `metadata`), and Japanese/English `change_*` and `reason_*`.
Keep the reason concrete and grounded in the evaluation or pricing evidence.
`source_commit` is an optional provenance pointer for imported historical records.
Update the history file's `updated_at` when appending an entry. The comparison page's
data update date continues to reflect model/evaluation/price/benchmark data updates.

Initial history imports the existing evaluation records and verified pricing and
release-date changes from Git. It covers model data changes, rather than every UI
edit. It does not display before/after value columns.
