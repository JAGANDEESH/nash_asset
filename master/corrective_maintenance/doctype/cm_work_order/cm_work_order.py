# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CmWorkOrder(Document):
	pass

# custom_app/custom_scripts/save_work_order.py

import frappe
from frappe import _

@frappe.whitelist()
def save_work_order(doc):
    try:
        # Extract data from the submitted form
        work_order_number = doc.get('workOrderNumber')
        spares = doc.get('spares', [])

        # Create a new instance of the Work Order document
        work_order = frappe.new_doc('Cm Work Order')
        work_order.work_order_number = work_order_number

        # Iterate over each spare part and add them to the child table
        for spare in spares:
            spare = spare.get('spare')
            spareUOM = spare.get('spareUOM')
            spareQty = spare.get('spareQty')

            if spare and spareUOM and spareQty:
                work_order.append('spare_parts', {
                    'spare': spare,
                    'spareUOM': spareUOM,
                    'spareQty': spareQty
                })

        # Save the Work Order document
        work_order.insert(ignore_permissions=True)

        # Return success message
        return _("Work Order {0} created successfully").format(work_order.name)

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Work Order Creation Failed"))
        return _("Failed to create Work Order. Please try again.")


#save data to db
# @frappe.whitelist()
# def my_list(data):
#     try:
#         # Insert the form data into the database
#         parent_doc_id = data.get("name")
#         child_doc = frappe.get_doc({
#             "doctype": "List of Cm work child",
#             "parent": parent_doc_id,
#             "root_cause": data.get("root_cause"),
#             "action_taken": data.get("action_taken"),
#             "status": data.get("status"),
#             "start_date_time": data.get("start_date_time"),
#             "end_date_time": data.get("end_date_time")
#         })
#         cm_work_order.insert(ignore_permissions=True)

#         # Save child table entries (spare_table)
#         child_doc = frappe.get_doc({
#                 "doctype": "Cm Spare Child",
#                 "parent": parent_doc_id,
#                 "spare": spare_data.get("spare"),
#                 "spare_uom": spare_data.get("spare_uom"),
#                 "spare_qty": spare_data.get("spare_qty")
#             })
#         child_doc.insert(ignore_permissions=True)

#         frappe.db.commit()
#         return _("Form submitted successfully!")

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), _("Form Submission Failed"))
#         return None

import frappe
from frappe import _

@frappe.whitelist()
def my_list(data):
    try:
        # Retrieve the parent document ID from the data
        parent_doc_id = data.get("name")

        # Create a new child document for the specified parent document (Cm Work Order)
        child_doc = frappe.get_doc({
            "doctype": "List of Cm work child",
            "parent": parent_doc_id,
            "root_cause": data.get("root_cause"),
            "action_taken": data.get("action_taken"),
            "status": data.get("status"),
            "start_date_time": data.get("start_date_time"),
            "end_date_time": data.get("end_date_time"),
        })
        child_doc.insert(ignore_permissions=True)

        frappe.db.commit()
        return _("Values stored successfully in child table!")

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Failed to store values in child table"))
        return None
