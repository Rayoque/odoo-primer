# Module 1 — Setup & navigation

**Time:** 35 min · **Prereq:** Docker Engine or Desktop with Compose · **Produces:** running Odoo 18 Community, two-database habit, UI map screenshot.

Site version: [docs/modules/01-setup.html](../docs/modules/01-setup.html)

## Why this shows up on Upwork

Open jobs along the lines of “setup ERP, modules, API, data import” and “Odoo ERP Specialist” start with *setup Odoo (cloud or on-premise)*, users, then CRM / Sales / Inventory / Accounting. Nobody pays for “I installed Docker” as a standalone gig. They do bounce implementers who cannot create a database, turn on developer mode, or explain Community vs Enterprise.

Narrate this: “I stand up Community on Docker with PostgreSQL, extra-addons, named volumes; for Enterprise clients I work in their Odoo.sh.”

## Concepts to retrieve later

### Four products people confuse

| Name | What it is | Money |
|---|---|---|
| Odoo Community | LGPL server + apps. Official Docker image is this. | Software $0. Hosting: your machine or VPS. |
| Odoo Enterprise | Same core plus paid apps (Studio, fuller Accounting, …) | Per-user subscription to Odoo S.A. |
| Odoo Online | SaaS at odoo.com. Weak for extra-addons. | Trial then paid. |
| Odoo.sh | Git hosting + staging. **Enterprise-only.** | Bundled with Enterprise hosting. |

### Process vs data

Odoo is a Python process. PostgreSQL holds records. The **filestore** holds attachments. Lose one of the three and you have a mystery. Compose in this repo keeps DB and filestore in Docker named volumes so `docker compose down` (without `-v`) does not wipe the lab.

### Master password vs admin user

The master password (`admin_passwd`) gates `/web/database/manager`: create, duplicate, drop, backup. The admin user is a `res.users` row *inside* a database. Mixing them up is a classic first-week failure.

### Apps vs modules

An **app** is a module with a store icon (`application: True`). Technical modules hide until developer mode. “Install CRM” is Apps. “Upgrade my custom module” is also Apps, after **Update Apps List**.

## Lab

### 1. Start the stack (8 min)

```bash
cd setup
docker compose up -d
docker compose ps
docker compose logs --tail=80 web
```

- [ ] `primer-odoo` and `primer-db` are up. Browser loads http://localhost:8069.

If 8069 is busy, map `8070:8069` instead. Official image pattern: [hub.docker.com/_/odoo](https://hub.docker.com/_/odoo) — Postgres required, extra addons at `/mnt/extra-addons`, filestore volume on `/var/lib/odoo`.

### 2. Create `primer_learn` (7 min)

1. Master password: `primer-master-change-me` unless you changed `odoo.conf`.
2. Database name: `primer_learn`.
3. Email + password: yours. Do not commit them.
4. Country: United States (Harborline exercises).
5. Demo data: **on**.
6. Wait while localization and assets load.

- [ ] You can log in and see the app switcher.

### 3. Install four apps (6 min)

Apps → install **CRM**, **Sales**, **Inventory**, **Invoicing**. Install **Purchase** if you want PO receipts in Module 3. Do not install Website “while you are here.”

- [ ] Those four show as installed.

### 4. Developer mode (4 min)

Settings → bottom → **Activate the developer mode**. You get the bug menu, Settings → Technical, and Apps → **Update Apps List**.

- [ ] Bug icon visible. Technical menu visible.

### 5. Users and company (5 min)

Settings → Users & Companies → Company is `res.company`. On the portfolio database you will rename it Harborline Wholesale (lab). Create a second user `warehouse.lab` with Inventory / User only — you need a non-admin in Module 5.

## UI map (screenshot sitting)

Open each once. Capture the app switcher.

| Control | Where | For |
|---|---|---|
| App switcher | Top-left | Installed apps |
| Search / `/` | Center | Jump to menus |
| Discuss | App | Inbox; chatter also lives on records |
| Settings | App | Company, users, technical |
| User menu | Top-right | Preferences, debug, log out |
| Chatter | Right of forms | Log, notes, activities |
| Kanban / list / form | View switcher | Same model, different `ir.ui.view` |
| Filters / Group By | Search bar | Later: domains |

Database manager: `http://localhost:8069/web/database/manager`. Practice **Backup** once.

- [ ] Screenshot `portfolio/setup/01-ui-map.png`
- [ ] You clicked through backup (password prompt)

Create `primer_portfolio` when you are not tired: demo data **off**. Mixing “Azure Interior” into Upwork shots looks like a tutorial tab.

**Filestore and database are a pair.** A SQL dump without `/var/lib/odoo/filestore/<db>` is a half backup. `docker compose down -v` destroys both.

## Recall

1. Where do product images go if you back up SQL only? → Filestore.
2. You can log in as admin but cannot create a database. → Missing master password.
3. Client says “Odoo.sh, Community Edition.” → sh is Enterprise; ask which edition they run.
4. Custom module folder copied but not in Apps. → Mount, restart, developer mode, Update Apps List, then install.
5. Name three compose mounts/volumes. → Filestore, `/etc/odoo`, `/mnt/extra-addons`, plus Postgres data.

## Done when

- localhost:8069 serves `primer_learn` without errors
- CRM, Sales, Inventory, Invoicing installed
- Developer mode on; Settings → Technical opens
- You can explain master password vs admin user in one sentence
- A UI-map screenshot exists on disk

## What to show on Upwork

Do not lead a proposal with Docker. Keep this sitting as proof you can start day one:

- Database manager (password blurred) + Harborline company form
- Line: “I run Odoo 18 Community locally on Docker (Postgres + extra-addons). I can work in your Odoo.sh if you are on Enterprise.”
- Optional 60-second compose-to-login Loom only if the job is hosting/setup

Next: [Module 2](02-crm-sales.md).
