# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CmWorkOrderRequest(Document):
    def after_insert(self):
        frappe.db.set_value("Cm Work Order Request",self.name,"wo_request_no",self.name)
        frappe.db.commit()
    def after_save(self, doc):
        print('sdfghjk')
        


# class CmWorkOrderRequest(Document):
#     def validate(self):
#         super().validate()
#         self.update_pro_status_based_on_assignment()

#     def update_pro_status_based_on_assignment(self):
#         # Check if the document is assigned to someone
#         assignments = frappe.get_all("ToDo", filters={
#             "reference_type": self.doctype,
#             "reference_name": self.name,
#             "status": "Open"
#         })
#         if assignments:
#             self.pro_status = "Assigned"
#         else:
#             self.pro_status = "New"

# @frappe.whitelist()
# def check_assignments_and_update_status(docname):
#     doc = frappe.get_doc("Cm Work Order Request", docname)
#     doc.update_pro_status_based_on_assignment()
#     doc.save()
#     return {"status": "success"}


	
	
