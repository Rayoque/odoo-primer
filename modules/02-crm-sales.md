# Module 2 — CRM + Sales pipeline

**Time:** 40 min · **Prereq:** Module 1 · **Produces:** one won deal with a sales order.

Site: [docs/modules/02-crm-sales.html](../docs/modules/02-crm-sales.html)

## Why this shows up on Upwork

Implementation posts list CRM and Sales next to Inventory and Accounting. Catalog services sell sales pipelines: quotations, price lists, delivery order generation. A wholesale distribution job described sales orders that allocate from on-hand and incoming stock — Sales talking to Inventory.

A kanban full of demo cards named “Interest in your products” looks like a trial. A Harborline lead that becomes a quotation with real product codes looks like an implementer.

## Objects on the path

Lead → Opportunity → Quotation → Sales order → Delivery → Invoice

| Record | Model | Job |
|---|---|---|
| Lead | `crm.lead` type lead | Unqualified inbound. Optional; **off by default**. |
| Opportunity | same model, type opportunity | Qualified deal on the kanban. |
| Quotation | `sale.order` draft/sent | Price proposal. Not revenue yet. |
| Sales order | `sale.order` state sale | Confirmed. Deliveries and invoices. |
| Contact | `res.partner` | Customer. Search before you create. |

Leads and opportunities are **the same model** with a type flag. Quotations and orders are **the same model** with a state. Confirming a quote does not copy it into a second document.

### Settings that change the product

- CRM → Settings → **Leads**. If off, you only see Opportunities. Many “our CRM is confusing” tickets are this checkbox.
- Sales teams and stages: default New / Qualified / Proposition / Won is enough today.
- Product **invoicing policy**: ordered vs delivered quantities. Wholesale physical goods almost always want **delivered quantities**.

## Lab — one Harborline deal

Use `primer_learn`. Repeat later on `primer_portfolio`.

### 1. Turn on Leads (3 min)

Enable Leads, Save. Create lead **Northwind — Q4 beans trial**, expected revenue 1,200, Maya Chen / Northwind Grocers, notes: 20 bags organic black beans, net 30, Oakland dock.

- [ ] Leads menu exists; that lead exists.

### 2. Qualify (5 min)

**Convert to Opportunity**. Create the customer if needed (company + contact). Find it on CRM → Pipeline. Drag New → Qualified. Schedule activity: Call, due tomorrow, “confirm pallet count.”

- [ ] Opportunity on the kanban with an activity; chatter shows conversion.

### 3. Quotation (10 min)

**New Quotation** from the opportunity. Customer must be the company, not a duplicate person. Line: `HB-BEAN-25` Organic Black Beans 25kg, storable, price 42, cost 28, invoicing policy delivered quantities, qty 20. Payment terms 30 days if loaded.

Send or mark sent. Opportunity smart button Quotations = 1.

- [ ] Quotation linked, 20 × beans, customer is the company.

### 4. Confirm (5 min)

Confirm. Banner: Sales Order. Delivery smart button appears if the product is storable. Do not validate delivery yet if stock is 0 — that is Module 3. Mark the opportunity **Won**.

- [ ] Order state is Sales Order; opportunity Won; you can hop records without search.

### 5. Invoice optional (5 min)

Ordered quantities → Create Invoice now. Delivered quantities → Odoo refuses until you deliver. That refusal is correct. Either invoice `SVC-ONB` as a service or write the block in your notes.

- [ ] Posted invoice **or** a written note that beans wait on the stock move.

## Gotchas

**Duplicate partners.** Free-typed lead names create extra `res.partner` rows. Always search; merge under Contacts if you already made a mess.

**Sales vs CRM menus.** Quotes live in Sales. Pipeline lives in CRM. Train with smart buttons.

Other landmines: 0-price lines; consumable when they needed stock; wrong sales team so “My Pipeline” looks empty; pricelist currency ≠ company currency.

## Recall

1. Models: lead/opportunity = `crm.lead`; quotation/order = `sale.order`.
2. No Leads menu: CRM Settings checkbox, then access rights.
3. Create Invoice disabled on storable products: invoicing policy is delivered qty and delivery not validated.
4. Draw the six-step flow without looking.

## Done when

- You can point at one deal and hop lead → opportunity → quotation → order
- You know whether Leads are enabled and why
- You can say when Odoo will not invoice a physical product
- Screenshots: kanban, quotation lines, confirmed SO header

## Implementer talk track (say this on a call)

“Leads are optional in Odoo. I will turn them on if your inbound is messy and you want a qualification gate. Opportunities live on a kanban per sales team. A quotation is the same record as the sales order — confirm changes the state, it does not duplicate the document. Physical goods should invoice on delivered quantities so you never bill what you could not ship. I will not fill the pipeline with demo data on your staging database.”

If the buyer’s post mentions price lists or online signature, that is a second sitting: Sales → Settings → Pricelists / Quotations. Do not enable every checkbox today.

Same-day review (10 min): close Odoo, draw Lead → Opportunity → Quotation → Order → Delivery → Invoice on paper, then mark which two records share a model.

## What to show on Upwork

Feeds [Exercise 02](../exercises/02-lead-to-cash.md). Strip of 4 numbered screenshots. Profile line: CRM + Sales, quote-to-order, invoicing policy explained. Do not claim lead scoring or automation you did not configure.

Next: [Module 3](03-inventory.md).
