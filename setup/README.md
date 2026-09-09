# Local Odoo lab (Community, Docker)

This is the lightest reliable setup for the primer. No paid services.

## What you run

- **Odoo 18 Community** official image (`odoo:18.0`)
- **PostgreSQL 15** official image
- Extra addons from `setup/addons` mounted at `/mnt/extra-addons`

Official pattern: [Docker Hub — odoo](https://hub.docker.com/_/odoo) (compose + named volumes + extra addons).

## Day-1 commands (from this folder)

```bash
cd setup
docker compose up -d
```

Wait until `docker compose logs web` shows the HTTP server. Then open [http://localhost:8069](http://localhost:8069).

Master password (database manager): `primer-master-change-me`  
Change it in `config/odoo.conf` if this machine is reachable from a network.

## Create two databases

| Database | Demo data | Use |
|---|---|---|
| `primer_learn` | **On** | Click around, break things, quizzes |
| `primer_portfolio` | **Off** | Clean screenshots and Loom demos |

Country/localization: pick the country you will pretend to implement (United States is fine for Harborline labs). Localization loads the chart of accounts and taxes.

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
