{
    "name": "Primer Delivery Instructions",
    "version": "18.0.1.0.0",
    "category": "Sales/Sales",
    "summary": "Delivery handling notes on sales orders, with user vs manager security",
    "description": """
Portfolio lab module for the Odoo Primer.
Adds a Delivery Instruction model linked to sale.order, list/form views,
a smart button on the order, and two security groups.
    """,
    "author": "Odoo Primer contributors",
    "website": "https://rayoque.github.io/odoo-primer/",
    "license": "LGPL-3",
    "depends": ["sale_management", "stock"],
    "data": [
        "security/security.xml",
        "security/ir.model.access.csv",
        "views/delivery_instruction_views.xml",
        "views/sale_order_views.xml",
    ],
    "installable": True,
    "application": False,
}
