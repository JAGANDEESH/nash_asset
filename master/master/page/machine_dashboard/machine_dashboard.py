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

@frappe.whitelist()
def get_company():
    company_info = frappe.get_all('Company', fields=['company_code', 'company_name', 'company_email', 'company_address'])
    ht = '<table>'
    ht+= '<tr >'
    
    for i in company_info[0].keys():
        ht += f'<th class="bg-danger">{i}</th>'
        
    ht+= "</tr>"
    for j in company_info:
        ht += "<tr>"
        for i,k in j.items():
            if k=="Active":


                ht += f'<td class="  bg-success btn act">{k}</td>'

            elif k=="Inactive":

                ht += f'<td class=" bg-primary btn ina">{k}</td>'
            else:
                ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht


@frappe.whitelist()
def get_plant():
    company_info = frappe.get_all('Plant', fields=['code', 'name1','state'])
    ht = '<table>'
    ht+= '<tr >'
    
    for i in company_info[0].keys():
        ht += f'<th class="head">{i}</th>'
        
    ht+= "</tr>"
    for j in company_info:
        ht += "<tr>"
        for i,k in j.items():
            if k=="Active":


                ht += f'<td class="  bg-success btn act">{k}</td>'

            elif k=="Inactive":

                ht += f'<td class=" bg-primary btn ina">{k}</td>'
            else:
                ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht

# machine = machine_dashboard()
# machine.frappe_call()