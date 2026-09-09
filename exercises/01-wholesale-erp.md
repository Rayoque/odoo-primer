# EX01 — Harborline wholesale ERP

**Time:** 40–45 min · **Prereq:** Modules 1–4 · **DB:** `primer_portfolio` (demo off)

HTML: [docs/exercises/01-wholesale-erp.html](../docs/exercises/01-wholesale-erp.html)

## Demand theme (not a fake stat)

Public Upwork job *Odoo Implementation for Wholesale Distribution (Inventory + Accounting + Custom Documents)* asked for Sales, Inventory, Purchase, Accounting/Invoicing, sales allocation from on-hand and incoming PO stock, invoices from orders/deliveries, vendor bills, payments, chart of accounts, custom documents. Other posts (*setup ERP, modules, API, data import* and *Odoo ERP Specialist*) list the same module cluster. You practice that cluster. You do not claim those clients.

Sources: [docs/demand.html](../docs/demand.html).

## Company brief (fiction)

Harborline Wholesale exports dry goods from Oakland. One warehouse, one-step receipts and deliveries.

Wants: company partners with a buyer contact; storable products with cost and list, invoice on delivery; PO → receipt → on-hand → SO → delivery → invoice → payment; reordering rule on the hero SKU; Net 30.

Out of scope: lots, multi-warehouse, Studio, website. Custom documents = EX03.

## Checklist

- [ ] Company renamed Harborline Wholesale. Apps: Sales, Inventory, Purchase, Invoicing.
- [ ] Partners and products (CSVs in `setup/sample-data/` or typed). Categories have income accounts.
- [ ] PO 80 beans → receive. SO 20 to Northwind → deliver → invoice on delivered qty → payment. Reorder min 40 max 120. Optional second SO to talk forecast vs on-hand.
- [ ] Folder `portfolio/harborline-erp/` with numbered PNGs and a 4-sentence README that says this is a lab.

**Partial allocation talking point:** forecasted includes incoming POs; confirmed SO reserves on-hand. Do not fake a custom allocator today.

## Done when

A stranger can follow PNG 01→08. No Azure Interior names. You can narrate forecast vs on-hand in 30 seconds.

## What to show on Upwork

**Artifacts:** `01-company-apps.png` … `08-reorder.png` (company, products, PO/receipt, on-hand, SO/delivery, invoice items, payment, min/max).

**Loom (3:30):** lab disclaimer; storable beans invoice-on-delivery; PO receive; SO deliver; invoice items; payment; forecast vs on-hand; no Studio.

**Proposal:** implement the Sales–Purchase–Inventory–Invoicing loop for distributors; one-step warehouse first; invoices on delivered quantities; can walk their staging the same way.

**Do not claim:** multi-company, landed costs, automated valuation, or that you implemented the named Upwork buyer’s company.
