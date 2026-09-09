# Odoo Primer

Short Odoo 18 Community modules plus Upwork-aligned exercises that produce portfolio artifacts (screenshots, Loom scripts, a custom module folder, before/after imports).

MIT licensed.

## Start today’s session in under 5 minutes

1. Install [Docker](https://docs.docker.com/get-docker/) if you do not have it (`docker compose version` should work).
2. From this repo:

```bash
cd setup
docker compose up -d
```

3. Open [http://localhost:8069](http://localhost:8069). Master password: `primer-master-change-me` (change it in `setup/config/odoo.conf` if the machine is not only yours).
4. Create database `primer_learn`, demo data **on**, country United States.
5. Open the site: `docs/index.html` in a browser, or:

```bash
cd docs
python3 -m http.server 4173
```

Then http://localhost:4173 — start **Module 1**. Tick checkboxes as you go (saved in the browser). Mirror them in [`progress/TRACKER.md`](progress/TRACKER.md).

If Docker is already up from yesterday, skip to step 5 and open the next unchecked item on the home page.

## What this is

| Path | Time | Output |
|---|---|---|
| [Module 1 — Setup & navigation](docs/modules/01-setup.html) | 35 min | Running lab, UI map |
| [Module 2 — CRM + Sales](docs/modules/02-crm-sales.html) | 40 min | Lead → order |
| [Module 3 — Inventory](docs/modules/03-inventory.html) | 40 min | Receipt, delivery, stock move |
| [Module 4 — Accounting for implementers](docs/modules/04-accounting.html) | 45 min | Invoice, bill, payment |
| [Module 5 — Custom module](docs/modules/05-custom-module.html) | 45 min | Installed addon + ACL |
| [Exercises](docs/exercises/index.html) | 30–45 min each | Upwork artifacts |

Module 5 is **custom modules**, not Website/eCommerce — higher overlap with public implementation and customization jobs. Notes and links: [`docs/demand.html`](docs/demand.html).

## Stack

- Official `odoo:18.0` + `postgres:15` (see [Docker Hub odoo](https://hub.docker.com/_/odoo))
- Extra addons: `setup/addons/` including lab module `primer_delivery_instruction`
- **Odoo.sh** is Enterprise-only; mentioned so you can talk about it, not required

Full compose notes: [`setup/README.md`](setup/README.md) and [`docs/setup.html`](docs/setup.html).

## Sticky bits

- [How to learn](docs/how-to-learn.html) — 25–45 min sittings, retrieval
- [Progress tracker](docs/progress.html) + [`progress/TRACKER.md`](progress/TRACKER.md)
- [Spaced review](docs/review.html) + [`progress/REVIEW.md`](progress/REVIEW.md)
- [Portfolio packing](docs/portfolio.html)

## Ship to GitHub Pages

See [`SHIP.md`](SHIP.md). Enable Pages from the `docs/` folder on branch `main`.

## License

[MIT](LICENSE) © 2026 Rayoque. Odoo is a trademark of Odoo S.A. This is an independent learning kit, not an official Odoo product.
