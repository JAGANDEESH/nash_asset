import frappe
from frappe import _


# @frappe.whitelist()
# def my_list():
#     # Retrieve data for each field
#     uoms = frappe.get_all('uom', fields=["uom_code", "uom_name", "uom_status"])

#     # Extract each field data into separate lists
#     uom_codes = [{"uom_code": uom.get("uom_code")} for uom in uoms]

#     uom_names = [{"uom_name": uom.get("uom_name")} for uom in uoms]
    
#     uom_statuss = [{"uom_status": uom.get("uom_status")} for uom in uoms]

#     # Return all the data together
#     return  uom_codes,uom_names, uom_statuss,
@frappe.whitelist()
def my_list():
    # Retrieve data for each field
    uoms = frappe.get_all('UOM', fields=["uom_code", "uom_name", "uom_status"])

    # Return all the data together
    return uoms

import json
import frappe

@frappe.whitelist()
def save_uom_list(data):
    try:
        data = json.loads(data)

        uom_code = data.get('uom_code')
        uom_name = data.get('uom_name')
        uom_status = data.get('uom_status')

        if not uom_code or not uom_name or not uom_status:
            return "UOM code, name, and status are required."

        uom = frappe.new_doc("UOM")
        uom.uom_code = uom_code 
        uom.uom_name = uom_name
        uom.uom_status = uom_status.title()
        uom.insert(ignore_permissions=True)
        return "UOM successfully submitted"
    except Exception as e:
        frappe.log_error(f"Error saving UOM: {str(e)}")
        return "An error occurred while saving UOM."
