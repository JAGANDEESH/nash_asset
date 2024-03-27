import frappe
from frappe.model.document import Document

@frappe.whitelist()
def get_entry_count(Plant):
    count = frappe.db.count(Plant)
    return count

# machine = machine_dashboard()
# machine.frappe_call()