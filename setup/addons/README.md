# Extra addons (mounted at `/mnt/extra-addons`)

Drop custom modules here. Each module is a folder with `__manifest__.py`.

This repo already includes **`primer_delivery_instruction`** — the lab module for Module 5 and Exercise 03.

## After you add or change a module

```bash
docker compose restart web
```

Then in Odoo: **Apps → Update Apps List** (developer mode) → search the module → **Install** or **Upgrade**.
