# Assuming this code resides in a Python file within a Frappe app
# In your Frappe custom app


# Inside your Frappe app, in the master module (or relevant module)

import frappe
from frappe import _

@frappe.whitelist()
def get_entry_count(Plant, Company, Location, Checklist, UOM, BOMlist):
    count1 = frappe.db.count('Plant', filters={'name': Plant})
    count2 = frappe.db.count('Company', filters={'name': Company})
    count3 = frappe.db.count('Location', filters={'name': Location})
    count4 = frappe.db.count('Checklist', filters={'name': Checklist})
    count5 = frappe.db.count('UOM', filters={'name': UOM})
    count6 = frappe.db.count('BOMlist', filters={'name': BOMlist})
    return count1, count2, count3, count4, count5, count6

