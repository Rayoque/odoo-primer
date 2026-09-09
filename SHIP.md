# SHIP — publish this primer

Suggested GitHub repository name: **`odoo-primer`**  
Canonical published kit: [github.com/Rayoque/odoo-primer](https://github.com/Rayoque/odoo-primer) (created by [Rayoque](https://github.com/Rayoque)). Fork under your own user if you want your own Pages site.  
This file is the go-live checklist. The remote is not created for you unless `gh` already works on your machine.

## 1. Create the repo and push

```bash
git init
git add .
git commit -m "Odoo Primer: modules, exercises, Docker lab, Pages site"
# Replace YOURUSER with your GitHub username (or push to an existing fork)
gh repo create YOURUSER/odoo-primer --public --source=. --remote=origin --push
# Or in the GitHub UI, then:
git remote add origin https://github.com/YOURUSER/odoo-primer.git
git branch -M main
git push -u origin main
```

Do not commit real passwords, backup zips, or Loom mp4s that blow the repo size.

## 2. Enable GitHub Pages

1. Repo **Settings → Pages**
2. Build and deployment: **Deploy from a branch**
3. Branch: **`main`**, folder: **`/docs`**
4. Save. Wait a minute.

Site URL shape: **`https://YOURUSER.github.io/odoo-primer/`**  
Canonical live site today: **https://rayoque.github.io/odoo-primer/**

`docs/.nojekyll` is present so Jekyll does not eat underscored paths. Opening `docs/index.html` locally also works (relative CSS/JS). Optional local server:

```bash
cd docs && python3 -m http.server 4173
```

No GitHub Actions workflow is required for the `/docs` folder method.

## 3. Module list (all built, not stubs)

| # | Module | HTML |
|---|---|---|
| 1 | Setup & navigation (Docker, databases, UI map) | `docs/modules/01-setup.html` |
| 2 | CRM + Sales pipeline | `docs/modules/02-crm-sales.html` |
| 3 | Inventory + products | `docs/modules/03-inventory.html` |
| 4 | Accounting basics for implementers | `docs/modules/04-accounting.html` |
| 5 | Custom module starter (scaffold, model, view, security) | `docs/modules/05-custom-module.html` |

Markdown mirrors: `modules/*.md`.

## 4. Day-1 start path

1. `cd setup && docker compose up -d`
2. http://localhost:8069 → database `primer_learn` (demo on)
3. Open the Pages site (or `docs/index.html`) → **Module 1**
4. Tick boxes; copy completion into `progress/TRACKER.md` and commit
5. Same week: Module 2 → Exercise 02 script (even without recording)

Details in `README.md` (under 5 minutes if Docker is already installed).

## 5. Exercises with portfolio sections

- `docs/exercises/01-wholesale-erp.html` — wholesale implementation theme
- `docs/exercises/02-lead-to-cash.html` — CRM/Sales/Inventory/Invoicing demo reel
- `docs/exercises/03-custom-delivery-module.html` — custom module / custom documents
- `docs/exercises/04-data-import.html` — contacts & products import

Demand citations: `docs/demand.html`.

## 6. After Pages is live

- Put the URL on the GitHub repo description
- Link it from the Upwork profile **after** Harborline screenshots exist
- Keep calling Harborline a lab
