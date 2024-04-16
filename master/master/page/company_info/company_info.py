import frappe
from frappe import _
from frappe.model.document import Document

# @frappe.whitelist()
# def get_count(Company,Plant,Location,Department,Spareslist,Machinelist):
#     Company_count = frappe.db.count(Company);
#     Plant_count = frappe.db.count(Plant);
#     Location_count = frappe.db.count(Location);
#     Department_count = frappe.db.count(Department);
#     Spare_count = frappe.db.count(Spareslist);
#     Machine_count = frappe.db.count(Machinelist);

#     return Company_count,Plant_count,Location_count,Department_count,Spare_count,Machine_count
    
# @frappe.whitelist()
# def get_doctype(Company):
#     doc = frappe.db.get_all('Company',fields=['company_code','company_name','company_email','company_address']);

#     return doc


@frappe.whitelist(allow_guest='True')
def get_company():
    company = frappe.get_all('Company', fields=['company_code','company_name','company_address','company_state','company_country','company_city','company_email','company_pincode','company_phone','company_mobile','company_website','company_gstinno','company_status'])
    ht = "<table>"
    ht+= "<tr>"
    
    for i in company[0].keys():
        ht += f'<th style="background-color:#558b21">{i}</th>'

    ht+= "</tr>"
    for j in company:
        ht += "<tr>"
        for i,k in j.items():
            ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht

import json
@frappe.whitelist()
def save_Company(data):
    data = json.loads(data)
    print(data)
    company_code = data['company_code']
    company_name = data['company_name']
    company_address = data['company_address']
    company_country = data['company_country']
    company_state = data['company_state']
    company_city = data['company_city']
    company_email = data['company_email']
    company_pincode = data['company_pincode']
    company_phone = data['company_phone']
    company_mobile = data['company_mobile']
    company_gstinno = data['company_gstinno']
    company_website = data['company_website']
    company_status = data['company_status']



    company = frappe.new_doc("Company")

    company.company_code = company_code
    company.company_name = company_name
    company.company_address = company_address
    company.company_country = company_country
    company.company_state = company_state
    company.company_city = company_city
    company.company_email = company_email
    company.company_pincode = company_pincode
    company.company_mobile = company_mobile
    company.company_phone = company_phone
    company.company_gstinno = company_gstinno
    company.company_website = company_website
    company.company_status = company_status
    
    company.insert(ignore_permissions=True)
    return "Company sucessfully submitted"