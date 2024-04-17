import frappe 
from frappe import _
import frappe

@frappe.whitelist(allow_guest=True)
def get_bom_list():
    bom_list = frappe.get_all('BOM List', fields=['bom_id', 'description', 'mc_types'])

    ht = "<table>"
    ht += "<tr>"

    # Generate headings for BOM list fields
    for i in bom_list[0].keys():
        ht += f'<th class="bg-success">{i}</th>'
    ht += "<th class='bg-success'>Child Table</th>"
    ht += "</tr>"
    
    # Iterate through BOM list items
    for bom_item in bom_list:
        ht += "<tr>"
        
        # Populate BOM list data
        for key, value in bom_item.items():
            ht += f'<td>{value}</td>'
        
        # Call get_child_table() with the bom_id for each BOM item
        child_table_data = get_child_table(bom_item['bom_id'])
        
        # Populate child table data
        ht += f'<td>{child_table_data}</td>'
        
        ht += "</tr>"
    
    ht += "</table>"
    return ht

@frappe.whitelist(allow_guest=True)
def get_child_table(bom_id):
    child_table = frappe.get_all('BOM child table', filters={'parent': bom_id}, fields=['item_code', 'description', 'qty_used', 'uom'])
    
    if child_table and len(child_table) > 0:
        ht = "<table>"
        ht += "<tr>"
        
        # Generate headings for child table fields
        for key in child_table[0].keys():     
            ht += f'<th class="bg-success">{key}</th>'
        ht += "</tr>"
        
        # Populate child table data
        for child_item in child_table:
            ht += "<tr>"
            for _, value in child_item.items():
                ht += f'<td>{value}</td>'
            ht += "</tr>"
        
        ht += "</table>"
        return ht
    else:
        return ""  # Return an empty string if child_table is empty



import json
@frappe.whitelist()
def save_bom_list(data):
    data = json.loads(data)
    print(data)
    bom_id = data['bom_id']
    description = data['description']
    mc_types = data['mc_types']
    bom_items=data['bom_items']


    bom_list = frappe.new_doc("BOM List")
    bom_table = frappe.new_doc("BOM child table")
    bom_list.bom_id = bom_id
    bom_list.description = description
    bom_list.mc_types = mc_types
    bom_list.insert(ignore_permissions=True)

    for bom_item in bom_items:
        bom_table.item_code = bom_item.get("item_code")
        bom_table.description =bom_item.get('child_description')
        bom_table.qty_used = bom_item.get("qty_used")
        bom_table.uom =bom_item.get("uom")
        bom_table.parent =bom_item.get("parent")
        bom_table.parenttype = bom_item.get("parenttype") 
        bom_table.insert(ignore_permissions=True)
    
    return "Bom list sucessfully submitted"

    