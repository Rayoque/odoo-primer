# Module 5 — Custom module starter

**Time:** 45 min · **Prereq:** Modules 1–2, addons mount · **Produces:** installed addon with model, views, ACL demo.

Site: [docs/modules/05-custom-module.html](../docs/modules/05-custom-module.html)

## Why this, not Website, for Module 5

Website/eCommerce work exists on Upwork (catalog “high-conversion Odoo website,” history lines like “Odoo Website Updates”). Implementation posts, though, keep asking for *customization*, *custom modules*, *custom documents*, and Python. Catalog cards repeat “customization, module development, report writing.” The wholesale job wanted custom documents on Sales/Inventory/Accounting.

A module is a GitHub artifact. Website can be a later track.

Rules: never edit core; extra-addons only; depend on official apps; security files before views that need new-model ACL; version `18.0.x.y.z`.

## Anatomy

Path: `setup/addons/primer_delivery_instruction/`

```
primer_delivery_instruction/
  __init__.py
  __manifest__.py
  models/
    delivery_instruction.py   # _name = primer.delivery.instruction
    sale_order.py             # _inherit = sale.order
  views/
    delivery_instruction_views.xml
    sale_order_views.xml
  security/
    security.xml              # groups
    ir.model.access.csv
```

**Manifest:** version `18.0.1.0.0`, depends `sale_management` + `stock`, data order: groups XML → ACL CSV → views. License LGPL-3.

**New model:** name, many2one to `sale.order`, related partner (`store=True` so the list is searchable), handling selection, state, confirm/done buttons. Teaching this beats only adding a Char on `sale.order` because you must write ACL.

**Inheritance:** one2many, count, window action. XML xpath: stat button on `button_box`, notebook page. Odoo 18 list views use `<list>`.

`_name` creates a table. `_inherit` patches an existing model.

## Lab

### 1. Confirm the mount (5 min)

```bash
docker compose -f setup/docker-compose.yml exec web ls /mnt/extra-addons
docker compose -f setup/docker-compose.yml restart web
```

- [ ] Directory visible in the container.

### 2. Read the Python (10 min)

Answer: `_name` vs `_inherit`; why `ondelete="cascade"`; why related partner is stored.

- [ ] One sentence each in your tracker.

### 3. Install (10 min)

Developer mode → Update Apps List. Clear the Apps filter (`application: True`) — this module is `application: False`. Search Primer Delivery. Install. Primer menu + SO Instructions button.

Create an instruction on the Northwind SO: Fragile, “Do not double-stack. Call Maya 30 min out.” Confirm.

- [ ] List shows the record; smart button count 1.

### 4. Security (12 min)

User `sales.lab`: Sales / User + **Primer Delivery / User** (not Manager). Incognito: edit works, **delete** should fail (`perm_unlink=0`). Manager/admin can unlink. Remove the group: Access Error.

CSV: `model_primer_delivery_instruction` is `model_` + technical name with dots → underscores. Groups must exist before the CSV references them (hence XML first in the manifest).

- [ ] User vs Manager unlink reproduced.

### 5. Change and upgrade (8 min)

Add a field, put it on the list, restart after Python, **Upgrade** after XML/CSV. Manifest data files load on install/upgrade, not every page view.

- [ ] Screenshot pack: manifest, Primer list, SO button, User denied delete.

## ACL vs record rules

**ACL:** can this group CRUD this model? **Record rules:** which rows? This lab has no record rule on purpose. Empty `group_id` on ACL = everyone — usually a mistake.

`odoo-bin scaffold` is awkward in the official Docker image. Hand-built folders are how many Community jobs look. On Odoo.sh the git repo *is* extra-addons.

## Recall

1. Manifest order: groups XML → ACL CSV → views.
2. `_name` new model; `_inherit` extend in place.
3. Module hidden in Apps: default filter is applications.
4. Read but not delete: `perm_unlink=0` on the User row — not a record rule.
5. Python change: restart the process; XML snapshots need upgrade.

## Done when

- Installs without traceback
- Instruction from SO and from Primer menu
- User vs Manager unlink demo
- You can explain why this beats editing `sale/models/sale_order.py` in core

## Implementer talk track

“I do not edit Odoo core. Small documents and extra fields ship as an extra-addons module: Python model, XML views, groups, ACL. You get a git folder you can take to another host. Studio is Enterprise-only; on Community this is the equivalent. I will demo User versus Manager on delete so access is not ‘everyone is admin.’”

Same-day review: without opening files, write the manifest `data:` order and the meaning of `_name` versus `_inherit`. Then open the CSV and confirm `perm_unlink` on User is 0.

Website/eCommerce remains a later lab using the same Harborline products. Custom modules overlap more with the implementation and customization posts sampled on 2026-09-01.

## What to show on Upwork

[Exercise 03](../exercises/03-custom-delivery-module.md). Pack the module folder, not all of Odoo.

> Small upgrade-safe module: extra delivery handling notes on the sales order, warehouse-facing list, User/Manager ACL. Same pattern for “add a field / custom document” instead of core edits or Studio.

Website/eCommerce lite remains valid later with the same products. It was not the center of the implementation posts sampled. See [docs/demand.html](../docs/demand.html).
