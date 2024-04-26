# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CheckList(Document):
	pass


# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_entry_count ():
#     count = frappe.db.count("Check List")
#     return count

# import frappe
# from frappe import _
# @frappe.whitelist()
# def get_count():
#     # Logic to fetch the count from the database
#     count = frappe.db.count("Check List")  # Example: Assuming "Check List" is the doctype name
#     return count

# import frappe
# from frappe.model.document import Document

# @frappe.whitelist()
# def add_checklist(checklist_number, checklist_description, machine_type_name):
#     # Check if a document with the given checklist_number already exists
#     existing_checklist = frappe.get_all("Check List", filters={"checklist_number": checklist_number})
    
#     if existing_checklist:
#         # If a document with the same checklist_number already exists, update it
#         check_list = frappe.get_doc("Check List", existing_checklist[0].name)
#         check_list.update({
#             "checklist_description": checklist_description,
#             "machine_type_name": machine_type_name
#         })
#         check_list.save()
#         return "Checklist updated successfully."
#     else:
#         # If no document exists with the provided checklist_number, create a new one
#         check_list = frappe.get_doc({
#             "doctype": "Check List",
#             "checklist_number": checklist_number,
#             "checklist_description": checklist_description,
#             "machine_type_name": machine_type_name
#         })
#         check_list.insert()
#         return "New checklist added successfully."
