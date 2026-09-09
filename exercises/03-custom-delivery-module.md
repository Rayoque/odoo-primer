# EX03 — Custom delivery instructions module

**Time:** 40–45 min · **Prereq:** Module 5 · **Artifact:** git folder

HTML: [docs/exercises/03-custom-delivery-module.html](../docs/exercises/03-custom-delivery-module.html)

## Demand theme

Wholesale post included *custom documents* and Studio. Other jobs: “develop or modify custom modules,” “basic customization & automation.” Catalog cards: customization, module development, report writing. Studio is Enterprise. This exercise is the Community-shaped answer: a tiny module in git.

## What you ship

Module `primer_delivery_instruction` in `setup/addons/`. Install, demo, pack like a client delivery.

- [ ] Installed on `primer_portfolio`. Fragile handling note on a Harborline SO and in the Primer menu.
- [ ] `sales.lab` is Primer User: create yes, delete no. Screenshot. Manager can delete.
- [ ] `portfolio/delivery-module/HANDOFF.md` with depends, groups, upgrade notes.

Optional: add `print_on_delivery` boolean, upgrade. Skip QWeb PDF in this sitting.

## Done when

A reviewer can compose up, install, and see the smart button without you. HANDOFF.md names groups exactly. No core `sale` files copied into the addon.

## What to show on Upwork

**GitHub:** `setup/addons/primer_delivery_instruction/` (public under Rayoque). Not a zip of Odoo.

**Screenshots:** manifest, Apps card, SO button, Primer list, ACL + user groups, delete denied.

**Loom (2:30):** Community, no Studio, extra-addons, install, note on SO, sales.lab ACL, `_name` / `_inherit` / CSV.

**Proposal:** upgrade-safe module in git for custom fields and small documents; example delivery handling notes with User vs Manager rights.

**Do not claim:** OWL expertise or “20+ custom modules.”
