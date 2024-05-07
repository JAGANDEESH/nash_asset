# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class PMWORKORDER(Document):
    def after_insert(self):
        frappe.db.set_value("PM WORK ORDER", self.name, {"work_order_number": self.name, "docstatus": 1})
        frappe.db.commit()
        
