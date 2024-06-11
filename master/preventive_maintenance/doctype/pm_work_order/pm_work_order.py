import frappe
from frappe.model.document import Document

class PMWORKORDER(Document):
    def after_insert(self):
        frappe.db.set_value("PM WORK ORDER", self.name, "work_order_number", self.name)
        frappe.db.set_value("PM WORK ORDER", self.name, "docstatus", 1)
        frappe.db.commit()

@frappe.whitelist()
def update_status(docname):
    # Fetch the current docstatus
    current_status = frappe.db.get_value('PM WORK ORDER', docname, 'docstatus')

    if current_status == 0:
        frappe.db.set_value('PM WORK ORDER', docname, 'docstatus', 1)
        frappe.db.set_value('PM WORK ORDER', docname, 'work_order_status', 'Assigned')

    # Commit the changes to the database
    frappe.db.commit()

@frappe.whitelist()
def inprogress_status(docname):
    # Fetch the current docstatus
    current_status = frappe.db.get_value('PM WORK ORDER', docname, 'docstatus')

    if current_status == 1:
        frappe.db.set_value('PM WORK ORDER', docname, 'docstatus', 0)
        frappe.db.set_value('PM WORK ORDER', docname, 'work_order_status', 'Inprogress')

    # Commit the changes to the database
    frappe.db.commit()
