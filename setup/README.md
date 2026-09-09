# Local Odoo lab (Community, Docker)

This is the lightest reliable setup for the primer. No paid services.

## What you run

- **Odoo 18 Community** official image (`odoo:18.0`)
- **PostgreSQL 15** official image
- Extra addons from `setup/addons` mounted at `/mnt/extra-addons`

Official pattern: [Docker Hub — odoo](https://hub.docker.com/_/odoo) (compose + named volumes + extra addons).

## Day-1 commands (from this folder)

**Start here:** run compose, then create `primer_learn`. Open a **How?** only if a step stalls you.

```bash
cd setup
docker compose up -d
```

Wait until `docker compose logs web` shows the HTTP server. Then open [http://localhost:8069](http://localhost:8069).

<details>
<summary>How? — compose up</summary>

1. Terminal in this repo: `cd setup` then `docker compose up -d`. First run downloads images.
2. Check: `docker compose ps`. **Done looks like:** `primer-odoo` and `primer-db` both `Up`; web ports include `8069`.
3. `docker compose logs -f web` until you see a werkzeug / HTTP line (Ctrl+C stops following; containers keep running).
4. Open http://localhost:8069.

**Done looks like:** the database manager form, not a blank tab. Port already allocated → stop the other process or map `8070:8069`.

</details>

Master password (database manager): `primer-master-change-me`  
Change it in `config/odoo.conf` if this machine is reachable from a network.

<details>
<summary>How? — master password</summary>

Open `config/odoo.conf` and find `admin_passwd`. Type that exact string into the **Master Password** field on the database manager — not into the Email/Password login fields after a database exists.

**Done looks like:** Create / Backup / Duplicate / Drop work. If those buttons reject the password, you are using the admin *user* password by mistake.

</details>

## Create two databases

| Database | Demo data | Use |
|---|---|---|
| `primer_learn` | **On** | Click around, break things, quizzes |
| `primer_portfolio` | **Off** | Clean screenshots and Loom demos |

Country/localization: pick the country you will pretend to implement (United States is fine for Harborline labs). Localization loads the chart of accounts and taxes.

<details>
<summary>How? — create the database</summary>

1. Stay on http://localhost:8069 (or `/web/database/manager`).
2. **Master Password** from `odoo.conf`, **Database Name** `primer_learn`, then Email + Password (your login).
3. Language English, Country United States for Harborline labs.
4. Demo data checkbox: **on** for `primer_learn`. Later, a second database `primer_portfolio` with demo data **off**.
5. Click **Create database** and wait.

**Done looks like:** you are logged in to the home / app switcher, not still on the manager form.

</details>

Install at least: **CRM, Sales, Inventory, Purchase, Invoicing**.

## Stop / start / reset

```bash
docker compose stop
docker compose start
docker compose down          # keeps named volumes
docker compose down -v       # DESTROYS databases and filestore
```

## Custom modules

Put a folder with `__manifest__.py` in `addons/`. Restart `web`, enable developer mode, **Update Apps List**, install.

The lab module `primer_delivery_instruction` is already here.

## Odoo.sh (know it, do not need it)

[Odoo.sh](https://www.odoo.sh) is Odoo S.A.'s git-based hosting. It is **Enterprise-only**. Community databases cannot live there. For this primer, Docker is the path. In Upwork conversations you can say:

> If the client is on Enterprise I can work in Odoo.sh (branch → staging → prod). If they are on Community I stand up Docker/VPS with PostgreSQL, extra-addons, and backups.

## Odoo 19

Docker Hub also tags `odoo:19.0`. Inventory valuation language changed in 19 (periodic vs perpetual at invoicing). This primer pins **18.0** because Upwork posts still name 17/18 constantly and the 18 docs match the lab. If a job is 19, spin a second compose file with `image: odoo:19.0` on another port.

## Community vs Enterprise (honest line)

Community covers CRM, Sales, Inventory, Purchase, Invoicing, Website, eCommerce, MRP, and custom Python modules. Enterprise adds Studio, the fuller Accounting app, Odoo.sh, and other paid apps. Never demo Studio as if it exists on Community.
