import frappe
from frappe import _


@frappe.whitelist()
def my_list():
    # Retrieve data for each field from parent table
    checklists = frappe.get_all('Check List', fields=["name", "checklist_number", "checklist_description", "machine_type"])

    # Retrieve data for each field from child table
    for checklist in checklists:
        checklist['child_table'] = frappe.get_all('Check Lists Child',
                                                   filters={'parent': checklist['name']},
                                                   fields=["check_point", "check_for", "standard_spec__value", "action_to_be_taken", "desc", "profile"])

    # Return all the data together
    return checklists

# @frappe.whitelist()
# def my_list():
#     # Retrieve data for each field
#     checklists = frappe.get_all('Check List', fields=["checklist_number", "checklist_description", "machine_type"])

#     # Return all the data together
#     return checklists



# @frappe.whitelist()
# def my_list():
#     # Retrieve data for each field
#     checklist = frappe.get_all('Check List', fields=["checklist_number", "checklist_description", "machine_type"]),

#     # Return the list of dictionaries
#     return checklist
 

#  @frappe.whitelist()
# def my_list():
#     # Retrieve data for each field
#     checklist = frappe.get_all('Check List', fields=["checklist_number", "checklist_description", "machine_type"]),
#     checklistchild = frappe.get_all('Check Lists Child',field=["check_point","check_for","standard_spec__value","action_to_be_taken","desc","profile"])

#     # Return the list of dictionaries
#     return checklist ,checklistchild


#entering data to get stored in db table

# @frappe.whitelist()
# def my_method(data):
#         doc = frappe.get_doc({
#             "doctype": "Check List",  # Replace 'YourDocType' with the actual doctype name
#             "field1": data.get("checklist_number"),  # Replace 'field1' with the actual field names
#             "field2": data.get("checklist_description"),
#             "filed3" : data.get("machine_type")
#         })
        
#         # Save the document
#         doc.insert()

# import frappe
# from frappe import _

# @frappe.whitelist()
# def submit_checklist(data):
#     checklist_data = frappe.parse_json(data)
    
#     # Create a new instance of the checklist DocType
#     checklist = frappe.new_doc('Check List')
    
#     # Set the fields of the checklist document
#     checklist.checklist_number = checklist_data.get('checklist_number')
#     checklist.checklist_description = checklist_data.get('checklist_description')
#     checklist.machine_type = checklist_data.get('machine_type')
    
#     # Save the checklist document
#     checklist.insert(ignore_permissions=True)
    
#     return {'status': 'success'}


# adding data from html to db table 
# import json
# import frappe

# @frappe.whitelist()
# def submit_checklist(data):
#     data = json.loads(data)
#     print(data)
#     checklist_number = data['checklist_number']
#     checklist_description = data['checklist_description']
#     machine_type = data['machine_type']
    
#     check_list = frappe.new_doc("Check List")  # Assuming "Check List" is the correct doctype
    
#     check_list.checklist_number = checklist_number
#     check_list.checklist_description = checklist_description
#     check_list.machine_type = machine_type
#     check_list.insert(ignore_permissions=True)
#     return "Checklist added"

# import json   #main table view
# @frappe.whitelist()
# def save_check_list(data):
#     try:
#         data = json.loads(data)

#         checklist_number = data['checklist_number']
#         checklist_description = data['checklist_description']
#         machine_type = data['machine_type']

#         check_list = frappe.new_doc("Check List")

#         check_list.checklist_number = checklist_number
#         check_list.checklist_description = checklist_description
#         check_list.machine_type = machine_type
#         check_list.insert(ignore_permissions=True)
#         return "Check list sucessfully submitted"
#     except Exception as  e:
#         print(e)

import json

@frappe.whitelist()
def save_check_list(data):
    try:
        data = json.loads(data)
        print(data)
        # Extract data for parent table
        checklist_number = data['checklist_number']
        checklist_description = data['checklist_description']
        machine_type = data['machine_type']
        check_items_data = data["check_items"]

        # Create a new Check List document
        check_list = frappe.new_doc("Check List")
        check_list.checklist_number = checklist_number
        check_list.checklist_description = checklist_description
        check_list.machine_type = machine_type
        check_list.insert(ignore_permissions=True)

        # Save child table data
        for item_data in check_items_data:
            # Create a new instance of child document for each item
            child_doc = frappe.new_doc("Check Lists Child")
            child_doc.check_point = item_data['check_point']
            child_doc.check_for = item_data['check_for']
            child_doc.standard_spec__value = item_data['standard_spec__value']
            child_doc.action_to_be_taken = item_data['action_to_be_taken']
            child_doc.desc = item_data['desc']
            child_doc.profile = item_data['profile']
            child_doc.parent = check_list.name  # Set parent to the checklist name
            child_doc.parenttype = "Check List"
            child_doc.insert(ignore_permissions=True)

        return "Check list successfully submitted"
    except Exception as e:
        print(e)
        return "An error occurred while submitting the check list"




# import json
# @frappe.whitelist()
# def save_bom_list(data):
#     data = json.load(data)
#     print(data)
#     bom_id = data['bom_id']
#     description = data['description']
#     mc_types = data['mc_types']

#     bom_list = frappe.new_doc("BOM List")

#     bom_list.bom_id = bom_id
#     bom_list.description = description
#     bom_list.mc_types = mc_types
#     bom_list.insert(ignore_permissions=True)
#     return "Bom list sucessfully submitted"

#get select option from machine type

@frappe.whitelist()
def select_type():
    machineType = frappe.get_all("Machine Type",fields=["machine_type"])
    return machineType