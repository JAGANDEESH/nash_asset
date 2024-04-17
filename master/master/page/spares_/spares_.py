import frappe 
from frappe import _
from frappe.model.document import Document
@frappe.whitelist(allow_guest='True')
def get_spares_list():
    spares_list = frappe.get_all('Spares List', fields=['item_code','item_description','uom','mfr_part_no','initial_qty','remaining_qty','used_qty'])
    ht = "<table>"
    ht+= "<tr>"
    
    for i in spares_list[0].keys():
        ht += f'<th class="bg-success">{i}</th>'
        
    ht+= "</tr>"
    for j in spares_list:
        ht += "<tr>"
        for i,k in j.items():
            ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht


import json
@frappe.whitelist()
def save_spares_list(data):
    data = json.loads(data)
    print(data)
    item_code = data['item_code']
    item_description = data['item_description']
    uom = data['uom']
    mfr_part_no = data['mfr_part_no']
    initial_qty = data['initial_qty']
    remaining_qty = data['remaining_qty']
    used_qty = data['used_qty']

    spares_list = frappe.new_doc("Spares List")

    spares_list.item_code = item_code
    spares_list.item_description = item_description
    spares_list.uom = uom
    spares_list.mrf_part_no = mfr_part_no
    spares_list.initial_qty = initial_qty
    spares_list.remaining_qty = remaining_qty
    spares_list.used_qty = used_qty
    spares_list.insert(ignore_permissions=True)
    return "Spares list sucessfully submitted"