import frappe

from frappe import _

@frappe.whitelist()
def get_entry_count (Department):
    count = frappe.db.count(Department)

    return count