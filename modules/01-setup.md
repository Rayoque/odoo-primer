# Module 1 — Setup & navigation

**Time:** 35 min · **Prereq:** Docker Engine or Desktop with Compose · **Produces:** running Odoo 18 Community, two-database habit, UI map screenshot.

Site version: [docs/modules/01-setup.html](../docs/modules/01-setup.html)

**Start here:** do Lab steps 1→5 below. Open a **How?** only if a step stalls you. Background is optional and collapsed at the end.

## Lab

### 1. Start the stack (8 min)

```bash
cd setup
docker compose up -d
docker compose ps
docker compose logs --tail=80 web
```

- [ ] `primer-odoo` and `primer-db` are up. Browser loads http://localhost:8069.

<details>
<summary>How?</summary>

1. In a terminal, from this repo: `cd setup` then `docker compose up -d`.
2. Run `docker compose ps`. **Done looks like:** both `primer-odoo` and `primer-db` show `Up` (or `Up (healthy)`). `primer-odoo` PORTS include `0.0.0.0:8069->8069/tcp`.
3. Open http://localhost:8069. **Done looks like:** the Odoo database manager (a create-database form), not a blank tab and not a Python traceback.

If the page will not load: wait 20–40 seconds on first start, then `docker compose logs --tail=80 web` and look for a werkzeug / HTTP line. If the log says the port is already allocated, stop the other process or change the compose mapping to `8070:8069` and use http://localhost:8070.

</details>

If 8069 is busy, map `8070:8069` instead. Official image pattern: [hub.docker.com/_/odoo](https://hub.docker.com/_/odoo) — Postgres required, extra addons at `/mnt/extra-addons`, filestore volume on `/var/lib/odoo`.

### 2. Create `primer_learn` (7 min)

1. Master password: `primer-master-change-me` unless you changed `odoo.conf`.
2. Database name: `primer_learn`.
3. Email + password: yours. Do not commit them.
4. Country: United States (Harborline exercises).
5. Demo data: **on**.
6. Wait while localization and assets load.

<details>
<summary>How?</summary>

1. You should already be on http://localhost:8069 — that *is* the database manager when no database exists. Bookmark `http://localhost:8069/web/database/manager` for later.
2. **Master Password** (top field): `primer-master-change-me` unless you edited `setup/config/odoo.conf` (`admin_passwd`). This is *not* your future login password.
3. **Database Name:** `primer_learn`.
4. **Email** = the login you will type later. **Password** = pick one and store it in a password manager, not in git.
5. Language: English. Country: United States (Harborline labs).
6. **Demo data:** tick the checkbox so it is on.
7. Click **Create database**. Wait. Do not refresh in a panic.

**Done looks like:** the Odoo home / app switcher (a grid of app icons) after login — not still sitting on the manager form.

</details>

- [ ] You can log in and see the app switcher.

### 3. Install four apps (6 min)

Apps → install **CRM**, **Sales**, **Inventory**, **Invoicing**. Install **Purchase** if you want PO receipts in Module 3. Do not install Website “while you are here.”

- [ ] Those four show as installed.

<details>
<summary>How?</summary>

1. Click the **app switcher** (the 9-dot grid, top-left).
2. Click **Apps**.
3. Use the **search box** at the top of the Apps screen. Search **CRM**, open the card, click **Install**.
4. Repeat for **Sales**, **Inventory**, **Invoicing**. One install at a time.

**Done looks like:** each of the four cards no longer shows Install; the app appears in the app switcher grid.

</details>

### 4. Developer mode (4 min)

Settings → bottom → **Activate the developer mode**. You get the bug menu, Settings → Technical, and Apps → **Update Apps List**.

- [ ] Bug icon visible. Technical menu visible.

<details>
<summary>How?</summary>

1. App switcher (9-dot grid, top-left) → **Settings**.
2. You land on **General Settings**. Scroll all the way to the **bottom** of that page.
3. Click the text link **Activate the developer mode** (not a big primary button).

**Done looks like:** a bug icon in the top bar (systray, near the user avatar, top-right). Settings now has a **Technical** menu. Apps gains **Update Apps List**.

If it disappears after logout: same path again, or add `?debug=1` to the URL (example: `http://localhost:8069/odoo?debug=1`).

</details>

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

<details>
<summary>How?</summary>

**UI map**

1. Click the **app switcher** (9-dot grid, top-left). Capture the grid of installed apps.
2. Open any form — easiest: Settings → Users & Companies → Users → your user. Chatter is the panel on the **right**; expand it if it is collapsed.
3. Also click once: **Discuss**, **Settings**, and the **user menu** (top-right avatar).
4. Save as `portfolio/setup/01-ui-map.png`.

**Backup**

1. Open `http://localhost:8069/web/database/manager`.
2. On the `primer_learn` row, click **Backup**.
3. Master password: same as create-DB (`primer-master-change-me` unless you changed it).

**Done looks like:** a PNG on disk, and a zip download or at least the password prompt. Do not commit the zip to git.

</details>

Create `primer_portfolio` when you are not tired: demo data **off**. Mixing “Azure Interior” into Upwork shots looks like a tutorial tab.

**Filestore and database are a pair.** A SQL dump without `/var/lib/odoo/filestore/<db>` is a half backup. `docker compose down -v` destroys both.

<details>
<summary>Background (optional)</summary>

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

</details>

## Recall prompts

Close the extra tabs. Answer from what you just did in the lab — not from later modules.

1. **You can log into Odoo as admin, but you cannot create a new database. What password is missing, and where do you use it?**  
   The **master password** (`admin_passwd` / `primer-master-change-me` in this lab). It unlocks `/web/database/manager`. Your admin login password only opens one database.

2. **When you created `primer_learn`, should demo data be on or off — and why for Module 1?**  
   **On** for `primer_learn`, so menus and sample records exist while you learn navigation. (Portfolio DBs later often use demo **off**.)

3. **Name the four apps this primer asked you to install in Module 1.**  
   CRM, Sales, Inventory, and Invoicing. (Purchase is optional for later stock receipts.)

4. **How do you turn on developer mode, and what should you see when it worked?**  
   Settings → scroll to the bottom → **Activate the developer mode** (or add `?debug=1` to the URL). You should see the bug/beetle icon and Settings → Technical.

5. **You ran a Backup from the database manager. What are you trying to practice, and should that zip go in git?**  
   Practicing undo: download a zip (include filestore if offered). Do **not** commit the zip to git — it is local recovery, not a repo artifact.

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
