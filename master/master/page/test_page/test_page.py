# Assuming this code resides in a Python file within a Frappe app
# In your Frappe custom app


# Inside your Frappe app, in the master module (or relevant module)

import frappe
from frappe import _

@frappe.whitelist()
def get_entry_count (Plant,Company,Location,Checklist,UOM,BOMlist ):
    count1 = frappe.db.count(Plant)
    count2 = frappe.db.count(Company)
    count3 = frappe.db.count(Location)
    count4 = frappe.db.count(Checklist)
    count5 = frappe.db.count(UOM)
    count6 = frappe.db.count(BOMlist)
    return count1,count2,count3,count3,count4,count5,count6



@frappe.whitelist()
def my_list(machine_number, machine_name):
    # Retrieve data for each field
    machines = frappe.get_all('Machine List', fields=["machine_number", "machine_name", "type", "total_shot", "plant"])

    # Extract each field data into separate lists
    machine_names = [{"machine_name": machine.get("machine_name")} for machine in machines]
    machine_numbers = [{"machine_number": machine.get("machine_number")} for machine in machines]
    machine_types = [{"type": machine.get("type")} for machine in machines]
    total_shots = [{"total_shot": machine.get("total_shot")} for machine in machines]
    plants = [{"plant": machine.get("plant")} for machine in machines]

    # Return all the data together
    return machine_names, machine_numbers, machine_types, total_shots, plants


#doctype entry



