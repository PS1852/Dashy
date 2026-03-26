# SubMapify — B2B Sales Pipeline Dashboard

A fully self-contained, production-grade **B2B Sales Outreach & Pipeline Tracking Dashboard** built as a single HTML file. No server, no build tools, no npm — just open `index.html` in any browser.

![SubMapify Dashboard](https://img.shields.io/badge/Status-Ready_to_Use-22d3ee?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/External_Dependencies-CDN_Only-34d399?style=for-the-badge)
![Single File](https://img.shields.io/badge/Distribution-Single_HTML_File-a78bfa?style=for-the-badge)

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/PS1852/SubMapify-Dashboard.git
cd SubMapify-Dashboard

# That's it — open in your browser
open index.html
```

Or just [download `index.html`](./index.html) directly and open it. No installation required.

---

## ✨ Features

### 6-Tab Navigation

| Tab | Description |
|-----|-------------|
| **Pipeline** | Kanban board with one column per active sales stage — count, total value, and cards per column |
| **Follow-ups** | Split view of Overdue (red) and Due Today (amber) leads — live count badge on tab |
| **Hot Leads** | Card grid of all hot-temperature, non-closed leads sorted by priority |
| **Closed Deals** | Summary stats (revenue won, deals lost, win rate) + full closed deal table |
| **All Leads** | Sortable, filterable full data table — search, 4 dropdowns, click-to-sort columns |
| **Analytics** | 6 KPI cards + horizontal bar chart (leads by status) + donut chart (leads by source) |

### Lead Data Model

Each lead tracks:
- **Identity**: Company, Contact Name, Email, Phone, LinkedIn URL
- **Qualification**: Source, Status, Temperature, Priority, Decision Maker flag
- **Activity**: Last Contact date, Next Follow-up date, Meeting Status
- **Deal**: Deal Value (optional), Notes

### Full CRUD
- **Add** leads via the `+ New Lead` button (top right)
- **Edit** any lead by clicking its card or table row
- **Delete** with a two-step inline confirmation (no browser `confirm()` dialogs — safe in iframes and sandboxes)

### Smart UX
- Overdue follow-ups highlighted in **red** with a warning icon (⚠)
- Due-today follow-ups highlighted in **amber** with a dot (●)
- Decision makers flagged with a **star** (★)
- Follow-ups tab shows a **live count badge** that updates as you edit leads
- Field Protocol Rules panel pinned to the bottom, collapsed by default

---

## 🎨 Design

- **Theme**: Dark editorial — deep navy background, cyan accent (`#22d3ee`)
- **Typography**: `Bricolage Grotesque` (display/headers) + `DM Sans` (body)
- **Charts**: Pure SVG donut + CSS div-based bar chart — no chart libraries
- **Color coding**:
  - Temperature: Cold (slate) / Warm (amber) / Hot (orange)
  - Status: Each stage has a unique color
  - Priority: Low (slate) / Medium (cyan) / High (red)
  - Source: Call (blue) / Email (purple) / LinkedIn (cyan) / Referral (green)

---

## 🛠 Technical Details

### Stack
- **React 18** via `unpkg.com` CDN (`react.production.min.js` + `react-dom.production.min.js`)
- **Babel Standalone** via `unpkg.com` CDN for JSX transpilation
- **Google Fonts** for typography (`Bricolage Grotesque` + `DM Sans`)
- Zero npm packages, zero build steps

### Constraints (by design)
- ✅ Single `.html` file — no external files
- ✅ All state in-memory (no `localStorage`, no cookies, no server)
- ✅ No UI libraries (no MUI, Tailwind, Bootstrap, Chakra, shadcn)
- ✅ No chart libraries (charts are pure `<div>` + `<svg>`)
- ✅ No `window.confirm()` / `alert()` / `prompt()` — all dialogs are React state
- ✅ Works in sandboxed iframes

### Seed Data
Pre-loaded with **12 realistic leads** covering:
- All 7 statuses (including 1 Closed Won + 1 Closed Lost)
- All 4 sources
- All 3 temperatures
- All 3 priorities
- Relative dates: overdue, due today, and upcoming follow-ups

---

## 📋 Field Protocol Rules

The collapsible panel at the bottom of the app enforces three sales discipline rules:

1. **Log every interaction** — Update the record after every call, email, or LinkedIn message.
2. **Set a follow-up date** — Always set a next follow-up date before closing the session.
3. **Move leads forward** — If no progress in 7 days, mark temperature as Cold.

---

## 📁 Repository Structure

```
SubMapify-Dashboard/
└── index.html          # The entire app — open this in any browser
└── README.md           # This file
```

---

## 🔧 Customization

Since everything is in a single file, customization is straightforward:

**Change the color scheme** — edit the CSS variables at the top of `<style>`:
```css
:root {
  --accent: #22d3ee;   /* change this to your brand color */
  --bg: #080a12;       /* background */
  --surface: #111425;  /* card surface */
}
```

**Change seed data** — edit the `SEED` array in the `<script type="text/babel">` block.

**Add a new pipeline stage** — add to the `STATUSES` and `PIPELINE_STATUSES` arrays, and add a color entry to `SC`.

---

## 🌐 Browser Support

Works in all modern browsers:
- Chrome / Edge 90+
- Firefox 90+
- Safari 14+

> **Note**: Babel Standalone transpiles JSX on page load, so first render may take ~1 second on slower connections. This is expected and normal for a CDN-only setup.

---

## 📄 License

MIT — use freely for personal or commercial projects.

---

*Built with React 18 + Babel Standalone. No build tools. No server. Just open and use.*
