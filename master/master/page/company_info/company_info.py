import frappe
from frappe import _

@frappe.whitelist()
def get_count(Company,Plant,Location,Department,Spareslist,Machinelist):
    Company_count = frappe.db.count(Company);
    Plant_count = frappe.db.count(Plant);
    Location_count = frappe.db.count(Location);
    Department_count = frappe.db.count(Department);
    Spare_count = frappe.db.count(Spareslist);
    Machine_count = frappe.db.count(Machinelist);

    return Company_count,Plant_count,Location_count,Department_count,Spare_count,Machine_count
    
@frappe.whitelist()
def get_doctype(Company):
    doc = frappe.db.get_all('Company',fields=['company_code','company_name','company_email','company_address']);

    return doc

@frappe.whitelist()
def get_plantdoctype(Plant):
    doc2 = frappe.db.get_all('Plant',fields=['code','name1','state']);

    return doc2


import json
@frappe.whitelist()
def save_Company(data):
    data = json.loads(data)
    print(data)
    Company_Code = data['com_code']
    Company_Name = data['com_name']
    Company_Country = data['com_country']
    Company_State = data['com_state']
    Company_City = data['com_city']
    Company_Pincode = data['com_pincode']
    Company_Phone = data['com_phone']
    Company_Mobile = data['com_mobile']
    Company_GstinNo = data['com_gstinno']
    Company_Website = data['com_website']
    Company_Status = data['com_status']



    Company = frappe.new_doc("Company")

    Company.Company_Code = Company_Code
    Company.Company_Name = Company_Name
    Company.Company_Country = Company_Country
    Company.Company_State = Company_State
    Company.Company_City = Company_City
    Company.Company_Pincode = Company_Pincode
    Company.Company_Mobile = Company_Mobile
    Company.Company_Phone = Company_Phone
    Company.Company_GstinNo = Company_GstinNo
    Company.Company_Website = Company_Website
    Company.Company_Status = Company_Status
    

    Company.insert(ignore_permissions=True)
    return "Company sucessfully submitted"