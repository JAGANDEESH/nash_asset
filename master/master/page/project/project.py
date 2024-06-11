import frappe
from frappe import _
from frappe.model.document import Document

@frappe.whitelist(allow_guest='True')
def get_project():
    project = frappe.get_all('Project details', fields=['project_name','customer_name','project_status','developer_name','actual_effort_days','start_date','end_date','over_due_days','project_cost','payment_recieved','pending_payment'])
    ht = "<table>"
    ht+= "<tr>"
    
    for i in project[0].keys():
            print(i)
            ht += f'<th style=" text-align:center; padding:10px; border:1px solid black; border-collapse:collapse; font-size:13px; font-weight:bold;">{i}</th>'

    ht+= "</tr>"
    for j in project:
        ht += "<tr>"
        for i,k in j.items():
            ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht

import json
@frappe.whitelist()
def save_project(data):
    data = json.loads(data)
    print("Data------>",data)
    project_name = data['project_name']
    customer_name = data['customer_name']
    project_status = data['project_status']
    developer_name = data['developer_name']
    actual_effort_days = data['actual_effort_days']
    start_date = data['start_date']
    end_date = data['end_date']
    over_due_days = data['over_due_days']
    project_cost = data['project_cost']
    payment_recieved = data['payment_recieved']
    pending_payment = data['pending_payment']
    

    project = frappe.new_doc("Project details")

    project.project_name = project_name
    project.customer_name = customer_name
    project.project_status = project_status
    project.developer_name = developer_name
    project.actual_effort_days = actual_effort_days
    project.start_date = start_date
    project.end_date = end_date
    project.over_due_days = over_due_days
    project.project_cost = project_cost
    project.payment_recieved = payment_recieved
    project.pending_payment = pending_payment
    
    
    project.insert(ignore_permissions=True)
    return "project sucessfully submitted"

