from odoo import fields, models


class PrimerDeliveryInstruction(models.Model):
    _name = "primer.delivery.instruction"
    _description = "Delivery Instruction"
    _order = "id desc"

    name = fields.Char(required=True, default="Handling note")
    sale_id = fields.Many2one(
        "sale.order",
        string="Sales Order",
        required=True,
        ondelete="cascade",
        index=True,
    )
    partner_id = fields.Many2one(
        related="sale_id.partner_id",
        store=True,
        readonly=True,
    )
    instruction = fields.Text(required=True)
    handling = fields.Selection(
        [
            ("standard", "Standard"),
            ("fragile", "Fragile"),
            ("keep_dry", "Keep dry"),
            ("appointment", "Delivery by appointment"),
        ],
        default="standard",
        required=True,
    )
    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("confirmed", "Confirmed"),
            ("done", "Done"),
        ],
        default="draft",
        required=True,
    )

    def action_confirm(self):
        self.write({"state": "confirmed"})

    def action_done(self):
        self.write({"state": "done"})
