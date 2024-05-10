# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

# import frappe
from __future__ import unicode_literals

def execute(filters=None):
    columns = [
        {"label": "Company Code", "fieldname": "company_code", "fieldtype": "Data", "options": "1"},
        {"label": "Company Name", "fieldname": "company_name", "fieldtype": "Data", "width": 120}
    ]

    data = [
        {"company_code": "John Doe", "company_name": 5000},
        {"company_code": "Jane Smith", "company_name": 6000}
    ]

    return columns, data