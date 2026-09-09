# Module 4 — Accounting basics for implementers

**Time:** 45 min · **Prereq:** Modules 1–3 · **Produces:** posted invoice, bill, and payment on Community Invoicing.

Site: [docs/modules/04-accounting.html](../docs/modules/04-accounting.html)

## Why this shows up on Upwork

Wholesale and “full ERP” jobs name Accounting and Invoicing next to Sales and Inventory: invoices from orders/deliveries, payment status and aging, vendor bills from POs, chart of accounts, taxes. Show a posted customer invoice, a vendor bill, and a payment **with journal items visible**.

## Community vs Enterprise (honest)

The official Docker image is Community. Community **Invoicing** (`account`) covers charts via localization, customer invoices, vendor bills, credit notes, taxes, journals, payments, basic reports. Enterprise Accounting adds the marketed extras: bank sync, polished reconciliation, assets, follow-ups, consolidations, some analytic/budget tools, plus Studio. Odoo.sh is Enterprise. Do not install a random “accounting kit” you cannot explain. Do not demo Studio on Community.

You are not the client’s CPA. You make invoices post, taxes land, and payments mark invoices paid.

## The map

| Idea | Object | Implementer job |
|---|---|---|
| Chart of accounts | `account.account` | Loaded by localization. Add; archive; do not delete blindly. |
| Journal | `account.journal` | Sales, purchase, bank, cash, misc. |
| Tax | `account.tax` | On products and fiscal positions. |
| Fiscal position | `account.fiscal.position` | Export / out-of-state mapping. |
| Invoice | `account.move` out_invoice | Confirm = post. |
| Vendor bill | `account.move` in_invoice | From PO or standalone. |
| Journal items | `account.move.line` | Debit/credit truth. |
| Payment | `account.payment` | Hits bank/cash; marks invoices. |
| Sequence | `ir.sequence` | INV/2026/… — go-live obsession. |

In modern Odoo, invoices **are** journal entries. After post you credit-note; you do not delete.

**Product accounts** belong on the **product category**, not 400 SKUs by hand.

**Inventory valuation:** automated stock-into-ledger is where implementations go to die without a finance owner. For this lab, leave valuation manual unless you already understand the chart. Still set product cost.

**Configure in this order:** localization → COA tweaks → taxes/fiscal positions → journals/payment terms → product category accounts → then operational documents. First real invoice with 0% tax is a week-four fire.

## Lab

### 1. Open the chart (8 min)

Invoicing → Configuration → Chart of Accounts. Filter Receivable, Income, Expense. Note the beans category income account, one receivable, one bank journal. Company currency/country must match the screenshot story (US for Harborline).

- [ ] You wrote down receivable code, income code, bank journal name.

### 2. Tax on the product (5 min)

HB-BEAN-25 customer tax from the localization, or tax-exempt wholesale **said out loud**. Simple sales tax is clearer on a PDF.

- [ ] You can explain tax line = rate × base.

### 3. Customer invoice from the SO (10 min)

If Module 3 delivered beans, Create Invoice → regular invoice 20 bags → post. Open journal items: debit receivable, credit income, tax lines. If blocked, invoicing policy is delivery — finish Module 3 or invoice `SVC-ONB` standalone.

- [ ] Posted customer invoice; journal items screenshot.

### 4. Vendor bill (8 min)

Bill from the PO for 100 bags, or a standalone bill: vendor, 100 × 28, post. See payable credit.

- [ ] Posted vendor bill with a payable line.

### 5. Payment (8 min)

Register Payment on the customer invoice, Bank, full amount. State Paid or In Payment (version-dependent if bank rec is involved). Community without bank feeds still registers payments against invoices. Optional partial payment to see residual. Screenshot aged receivable if present.

- [ ] Invoice no longer “not paid” via a real payment, not a hacked state.

**Never:** delete posted moves; give salespeople Accountant rights “so they can fix it”; go live without a finance person signing taxes.

## Recall

1. Posted invoice model: `account.move` type out_invoice; lines `account.move.line`.
2. Studio on Community: no. Custom module or they buy Enterprise.
3. Taxes before the first real invoice: posted invoices freeze tax lines.
4. Wholesale goods: invoice on delivery so you do not bill what you could not ship. Services: ordered quantities.
5. Default income account: product category.

## Done when

- Posted customer invoice, items readable
- Posted vendor bill
- Registered payment
- You can name what Community does not include (Studio, sh, full Accounting suite)

## Implementer talk track

“I am not your CPA. I will load the localization, walk the chart, put income accounts on product categories, set taxes with whoever owns finance, and prove quote-to-cash with a posted invoice, journal items, and a payment. Community Invoicing does invoices, bills, taxes, and payments. Studio, bank feeds, and Odoo.sh mean Enterprise. If you need those, we price the edition honestly. I will not delete posted moves. We credit-note.”

Same-day review: name the model of a posted invoice and the three accounts you expect to see on a simple goods invoice (receivable, income, tax).

## What to show on Upwork

Trio: invoice form, journal items, paid banner. One sentence on localization. Title the piece “Quote-to-cash invoicing (Community)” not “Full Odoo Accounting implementation.” If the job is Enterprise, you configure on their staging, not your Docker file as their ledger.

Next: [Module 5](05-custom-module.md).
