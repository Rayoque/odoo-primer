# EX04 — Contacts + products import

**Time:** 25–35 min · **Prereq:** Module 1

HTML: [docs/exercises/04-data-import.html](../docs/exercises/04-data-import.html)

## Demand theme

Upwork post *Odoo freelancer needed: setup ERP, modules, API, data import. Send portfolio & quote* listed “Data import (clients, products, etc.)” in scope. Import is how implementations start. Before/after is visible.

## Files

- `setup/sample-data/contacts.csv`
- `setup/sample-data/products.csv`

Use the list-view Import wizard. Test one row, then the rest. Duplicate the DB first.

Contacts: `is_company`, country name, `customer_rank` / `supplier_rank`. Parent Maya under Harborline in the UI if the CSV did not.

Products: map `type` to the 18 field names. Professional move: create one product by hand, **export**, match headers. Screenshot that.

- [ ] CSV columns reviewed
- [ ] Import without a leftover traceback
- [ ] Before empty list / after Harborline + HB-* references

## Done when

At least 3 companies and 3 products from CSV. You saved an export template. You wrote down one mapping gotcha.

## What to show on Upwork

Before/after, same filter. Sanitized CSV in the folder. Proposal: import via wizard after exporting a sample row for that version; always on a duplicate database first. Do not claim ETL/API middleware — that is a later track.
