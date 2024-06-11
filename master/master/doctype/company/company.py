# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe 
from frappe.model.document import Document


class Company(Document):
	pass


@frappe.whitelist()
def get_value(Company):
	doc = frappe.get_doc('company',Company);
	field = doc.company_code
	
	return field

def validate(self):
	self.set_value()
def set_value(self):
	frappe.db.set_value('Company','vishnu','company_state','Bangalore')
	company_state,company_code = frappe.db.get_value('Company','company_state',['company_state','company_code'])
	frappe.msgprint("The Company state name is {0} Company code is {1}");


