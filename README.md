# Airtable Clone — 1 Week Sprint Plan

## Day 1 — Project scaffolding + auth + base/table creation
*T3 stack, Postgres, Google OAuth, base/table data model*

- [✅] Init T3 app (`create-t3-app`) — NextAuth, Prisma, tRPC, Tailwind; deploy skeleton to Vercel
- [ ] Configure Google OAuth via NextAuth; protect routes
- [ ] Design Postgres schema: `User`, `Base`, `Table`, `Column`, `Row`, `Cell` — cells stored as JSONB value per (row, column) for dynamic column flexibility
- [ ] tRPC routers: `base.create`, `base.list`, `table.create`, `table.list`
- [ ] Airtable-matched sidebar UI: bases list, table tabs, top nav bar — pixel-match Airtable's left nav, colored base icons, tab strip

**✓ End of day:** Can log in with Google, create a base, create tables inside it — deployed to Vercel

---

## Day 2 — Core table UI + cell editing + keyboard nav
*TanStack Table, editable cells, arrow/tab navigation*

- [ ] Integrate TanStack Table with server data; render rows + columns
- [ ] Dynamic column add — Text and Number types with type-safe input rendering
- [ ] Click-to-edit cells: inline input, optimistic update via tRPC `cell.upsert`
- [ ] Keyboard nav: Arrow keys, Tab / Shift+Tab, Enter to commit, Esc to cancel — track active cell with React state; focus management on cell mount
- [ ] New table → seed with Faker.js default rows (10 rows, 4 columns)
- [ ] Airtable visual pass: row numbers, column header styling, cell selection highlight, add-column `+` button

**✓ End of day:** Fully interactive table — add columns, edit cells, navigate with keyboard

---

## Day 3 — 100k row performance — virtualization + infinite scroll
*TanStack Virtualizer, tRPC cursor pagination, 100k seed button*

- [ ] Switch data fetching to `useInfiniteQuery` with cursor-based pagination (fetch 100 rows/page)
- [ ] Wrap table body in `@tanstack/react-virtual` — only render visible rows in DOM; use `overscan: 5` and fixed row height (34px) for performance
- [ ] Intersection observer at bottom sentinel → auto-fetch next page as user scrolls
- [ ] "Add 100k rows" button → background tRPC mutation using Postgres `INSERT ... SELECT generate_series` + Faker data, batched in chunks of 1000 inside a transaction
- [ ] Add Postgres index on `(tableId, createdAt)` for cursor pagination
- [ ] Skeleton loading rows while fetching next page

**✓ End of day:** 100k rows scroll without lag; DOM stays lean; loading states visible

> ⚠️ **Risk:** Virtualizer + TanStack Table integration needs careful ref wiring — allocate 2h buffer here

---

## Day 4 — Search, filter, sort — all at DB level
*Global search, column filters, sort — pushed to Prisma/SQL*

- [ ] Global search bar → tRPC `rows.list` accepts `search` param → Prisma `WHERE cell.value ILIKE '%q%'` with 300ms debounce
- [ ] Column filter UI (filter icon in header):
  - [ ] Text: is empty, is not empty, contains, not contains, equals
  - [ ] Number: greater than, less than
- [ ] Sort on column header click — A→Z / Z→A for text; asc/desc for number — `ORDER BY` appended in Prisma query
- [ ] All filter/sort/search params serialized into URL query string — shareable and back-button safe
- [ ] Active filter/sort indicator chips in toolbar with "Clear all" button
- [ ] Loading spinner + row count while query is in-flight

**✓ End of day:** Search, filter, and sort all work against the DB — performant at any row count

---

## Day 5 — Views + polish + ship
*Named views, hide/show columns, polish, Slack updates*

- [ ] Add `View` model to Prisma: `{ id, tableId, name, filters: Json, sorts: Json, hiddenColumns: Json, search: String }`
- [ ] tRPC: `view.create`, `view.update`, `view.list`, `view.delete`
- [ ] Views tab strip (Airtable-style left sidebar under table name); clicking a view loads its saved config
- [ ] Hide/show columns panel — checkbox list, persisted per view
- [ ] Full Airtable UI polish pass: toolbar icons (filter, sort, hide, search), empty state illustrations, loading skeletons everywhere
- [ ] Write and send Day 1–5 Slack update messages timestamped
- [ ] Final Vercel deploy + smoke test with 100k+ rows

**✓ End of day:** Views fully functional; complete polished Airtable clone shipped

---

## Key architectural notes

- [ ] **Schema:** JSONB cells give flexibility for dynamic columns without migrations; add functional indexes for filter/sort performance
- [ ] **Performance:** Cursor pagination + TanStack Virtualizer = DOM never holds more than ~50 rows; 1M row scrolling is feasible
- [ ] **Filtering:** All search/filter/sort flows through tRPC into Prisma `where` / `orderBy` — never filter in JS
- [ ] **Views:** Just saved JSON blobs (filters, sorts, hiddenColumns, search) — load into the same query pipeline from Day 4
- [ ] **Infra:** Use `pgBouncer` or `@prisma/adapter-pg` to avoid Postgres connection exhaustion on Vercel serverless functions