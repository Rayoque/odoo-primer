# Module 3 — Inventory + products

**Time:** 40 min · **Prereq:** Modules 1–2 · **Produces:** on-hand quantity and a stock move you can read.

Site: [docs/modules/03-inventory.html](../docs/modules/03-inventory.html)

## Why this shows up on Upwork

A public wholesale implementation post asked for Sales, Inventory, Purchase, Accounting, and allocation from *on-hand* and *incoming linked to POs*, including partial allocation. Catalog listings sell POS + Inventory + Sales with warehouses, lots, barcodes, reordering rules. ERP specialist posts name Inventory / Stock next to CRM and Accounting. Website jobs still collapse into product records. Learn Inventory first.

## Vocabulary you must not mix up

| Word | Meaning |
|---|---|
| Storable / Goods tracked | Qty tracked. Uses Inventory. (Odoo 18 form: Goods vs Service, plus track inventory.) |
| Consumable / not tracked | Buy/sell without qty (packaging). |
| Service | No stock. Invoicing policy still matters. |
| Warehouse | Site with receipt/delivery policy (1-step, 2-step, 3-step). |
| Location | WH/Stock, Input, Customers, Vendors, inventory loss. |
| Quant | Qty of a product in a location (lot/package optional). |
| Stock move | Atomic A → B quantity. |
| Picking / transfer | Document grouping moves (receipt, delivery, internal). |
| Reordering rule | Min/max that can spawn RFQs. |

Default warehouse is **one-step**: Vendor → WH/Stock; WH/Stock → Customer. Two-step receipts leave goods in WH/Input until an internal transfer. Do not enable three-step picking on day 1 “for realism.”

**Routes:** Buy, Manufacture, MTO, Dropship. Harborline is a distributor: **Buy**, vendor set, reordering rule later. MTO ties each SO to a PO and fights “we also keep stock.”

**Valuation** is accounting (Module 4). Do not toggle automated valuation in this sitting unless a finance owner wrote the choice down. You still set product cost.

## Lab

### 1. Three products (8 min)

1. `HB-BEAN-25` — track inventory — $42 / cost $28 — sold and purchased — invoice **delivered quantities**.
2. `PK-BOX-12` — do **not** track inventory.
3. `SVC-ONB` — service — $250 — invoice ordered quantities.

Inventory tab note: “25kg bag, pallet = 40.” Purchase tab: vendor, price 28, delay 7 days.

- [ ] Three products you can explain in 20 seconds.

### 2. Warehouse tour (5 min)

Inventory → Configuration → Warehouses: incoming/outgoing steps. Enable Storage Locations if the Locations menu is hidden. Find WH/Stock, Partners/Customers, Partners/Vendors. Leave barcodes off unless a job names them.

- [ ] You can name receipt and delivery operations without the form.

### 3. Get stock in (10 min)

**A. Adjustment (fast):** count 100 bags into WH/Stock. Fine for a demo; not how a live distributor starts.

**B. Purchase receipt (preferred):** PO 100 bags → confirm → receive → validate. On-hand 100.

Open the product On Hand smart button (quant WH/Stock 100). Inventory reporting → Moves: source, destination, quantity, picking reference.

- [ ] On-hand is 100. You opened the **move**, not only the product form.

### 4. Deliver the sales order (10 min)

Re-open the Northwind SO or confirm a new 20-bag quotation. Delivery → reserved 20 → Validate. On-hand 80. If nothing reserves: not storable, wrong warehouse, or no quants. **Forecasted** includes incoming; **on-hand** does not. Salespeople promising same-day from forecast is a training ticket.

- [ ] Delivery validated. Moves show WH/Stock → Customers. SO delivered qty 20.

### 5. Reordering rule (7 min)

Min 40, max 120, multiple 20. Run scheduler or Replenish. If Purchase is installed and a vendor is set, expect an RFQ or a replenishment suggestion.

- [ ] Rule on HB-BEAN-25 with min/max you chose on purpose.

Lots/serials: food distributors often need them. Enable tracking and you cannot validate a receipt without a lot. Save for a second pass.

## Recall

1. Forecasted 50, on-hand 10 — the 40 may be incoming POs (and/or outgoing SO). Read the forecast report.
2. After receiving 100 and delivering 20 on a confirmed SO, on-hand should be 80. Forecasted ≠ on-hand (forecasted also counts incoming).
3. Service created no delivery — services are not storable.
4. Document vs atomic object — picking vs stock move; quants are balances.

## Done when

- Storable product with on-hand ≠ 0 that you **received**
- A delivery reduced on-hand
- You read source, dest, qty, reference on a move
- You can explain 1-step vs 2-step without Settings

## Implementer talk track

“We start with one warehouse and one-step receipts and deliveries. If goods sit in a dock for quality checks, we turn on two-step and train the internal transfer. I will show on-hand versus forecasted on your hero SKU so sales stops promising incoming stock as if it were on the floor. Reordering rules come after we know min/max from the buyer, not from my guess. Lots wait until you tell me the commodity actually needs them.”

Same-day review: from memory, write the source and destination locations for a one-step receipt and a one-step delivery. Then open a real move and check yourself.

## What to show on Upwork

Before/after: on-hand 0 → 100 → 20 delivered → 80. One **move list** screenshot, not only the receipts kanban. Proposal sentence: product types, one-step warehouse first, PO receipts, SO deliveries, min/max, lots if the commodity needs them. Pack into [Exercise 01](../exercises/01-wholesale-erp.md).

Next: [Module 4](04-accounting.md).
