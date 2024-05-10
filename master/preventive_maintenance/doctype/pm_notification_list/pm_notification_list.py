# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class PMNOTIFICATIONLIST(Document):
	def after_insert(self):
		frappe.db.set_value("PM NOTIFICATION LIST",self.name,"notification_id", self.name)
		frappe.db.commit()

@frappe.whitelist()
def set_workorder(work_order_date, assigned_by, work_order_status, selected_rows):
    # Create a new work order
    work_order = frappe.new_doc("PM WORK ORDER")
    work_order.work_order_date = work_order_date
    work_order.assigned_by = assigned_by
    work_order.work_order_status = work_order_status
    work_order.save()
    selected_rows = json.loads(selected_rows)
    # Associate the work order with selected checkboxes
    for row_id in selected_rows:
        pm_notification_list = frappe.get_doc("PM NOTIFICATION LIST", row_id)
        pm_notification_list .work_order = work_order.name
        pm_notification_list .save()
    frappe.db.commit()

    return "Work order created successfully"
