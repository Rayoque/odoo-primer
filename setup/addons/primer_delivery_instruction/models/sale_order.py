from odoo import api, fields, models


class SaleOrder(models.Model):
    _inherit = "sale.order"

    primer_instruction_ids = fields.One2many(
        "primer.delivery.instruction",
        "sale_id",
        string="Delivery instructions",
    )
    primer_instruction_count = fields.Integer(
        compute="_compute_primer_instruction_count",
    )

    @api.depends("primer_instruction_ids")
    def _compute_primer_instruction_count(self):
        for order in self:
            order.primer_instruction_count = len(order.primer_instruction_ids)

    def action_open_primer_instructions(self):
        self.ensure_one()
        return {
            "type": "ir.actions.act_window",
            "name": "Delivery instructions",
            "res_model": "primer.delivery.instruction",
            "view_mode": "list,form",
            "domain": [("sale_id", "=", self.id)],
            "context": {"default_sale_id": self.id},
        }
