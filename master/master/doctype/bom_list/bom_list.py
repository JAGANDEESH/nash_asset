# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class BOMList(Document):
	pass

# @frappe.whitelist()
# def get_item_description(item_code):
#     description = fetch_description(item_code)
#     return description
# def fetch_description(item_code):
#     item_doc = frappe.get_doc("Spares List",item_code)
#     description = item_doc.description
#     return description
# class BOMList(Document):
#     def submit_value(self,values):
#         self.bom_id = values.get('bom_id')
#         self.description = values.get('description')
#         self.mc_types = values.get('mc_types')
#         self.bom_table = values.get('bom_table')
#         self.save()
            
# @frappe.whitelist()
# def fetch_bom_values(doctype,**kwargs):
#     bom_table = json.loads(kwargs.get('bom_table','{}'))
#     todo = frappe.get_doc({"doctype":"BOM List", "bom_id":kwargs.get('bom_id',''),'description':kwargs.get('description',''),'mc_types':kwargs.get('mc_types',''),'bom_table':bom_table})
#     todo.insert(ignore_permissions = True)

#     todo.submit()

#     return "test"

