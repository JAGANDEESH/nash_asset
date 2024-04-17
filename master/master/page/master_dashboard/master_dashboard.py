import frappe 
from frappe import _

@frappe.whitelist()
def check_result(UOM,plant,sparesList,MachineList,MachineType,BOMList):
    UOM = frappe.db.count(UOM)
    plant = frappe.db.count(plant)
    sparesList = frappe.db.count(sparesList)
    MachineList = frappe.db.count(MachineList)  
    MachineType = frappe.db.count(MachineType)
    BOMList = frappe.db.count(BOMList)
    return UOM,plant,sparesList,MachineList,MachineType,BOMList


@frappe.whitelist(allow_guest='True')
def get_machine_list():
    machine_list = frappe.get_all('Machine List', fields=['machine_number', 'machine_name','type', 'plant', 'total_shot','remaining_shots'])
    ht = "<table>"
    ht+= "<tr>"
    
    for i in machine_list[0].keys():
        ht += f'<th class="bg-success">{i}</th>'
        
    ht+= "</tr>"
    for j in machine_list:
        ht += "<tr>"
        for i,k in j.items():
            ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht

