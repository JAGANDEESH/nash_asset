import frappe 
from frappe import _

@frappe.whitelist(allow_guest='True')
def get_machine_list():
    machine_list = frappe.get_all('Machine List', fields=['machine_number','machine_name','machine_description','type','makemodelcapacity','specification','commission_date','supplier__service_address','service_contact_person','service_contact_numbe','critical_spares_bom','power_consumption','required_air','required_gas','required_oilgrade','total_shot','remaining_shots','location','plant'])
    ht = "<table>"
    ht+= "<tr>"
    
    for i in machine_list[0].keys():
        ht += f'<th class="bg-success">{i}</th>'
        # ht +=f'<th class="bg-success">{i}</th>'        
    ht+= "</tr>"
    for j in machine_list:
        ht += "<tr>"
        for i,k in j.items():
            ht += f'<td>{k}</td>'

        ht += "</tr>"
    

    ht += "</table>"
    return ht

import json
@frappe.whitelist()
def save_machine_list(data):
    data = json.loads(data)
    print(data)

    machine_number = data['machine_number']
    machine_name = data['machine_name']
    machine_description = data['machine_description']
    type = data['type']
    makemodelcapacity = data['makemodelcapacity']
    specification = data['specification']
    commission_date = data['commission_date']
    supplier__service_address = data['supplier__service_address']
    service_contact_person = data['service_contact_person']
    service_contact_numbe = data['service_contact_numbe']
    critical_spares_bom = data['critical_spares_bom']
    power_consumption = data['power_consumption']
    required_air = data['required_air']
    required_gas = data['required_gas']
    required_oilgrade = data['required_oilgrade']
    total_shot = data['total_shot']
    remaining_shots = data['remaining_shots']
    location = data['location']
    plant = data['plant']

    machine_list = frappe.new_doc("Machine List")

    machine_list.machine_number =  machine_number
    machine_list.machine_name = machine_name
    machine_list.machine_description = machine_description
    machine_list.type =  type
    machine_list.makemodelcapacity = makemodelcapacity
    machine_list.specification =  specification
    machine_list.commission_date = commission_date
    machine_list.supplier__service_address = supplier__service_address
    machine_list.service_contact_person =  service_contact_person
    machine_list.service_contact_numbe = service_contact_numbe 
    machine_list.critical_spares_bom = critical_spares_bom
    machine_list.power_consumption =  power_consumption
    machine_list.required_air = required_air
    machine_list.required_gas = required_gas
    machine_list.required_oilgrade = required_oilgrade 
    machine_list.total_shot = total_shot
    machine_list.remaining_shots =  remaining_shots 
    machine_list.location = location
    machine_list.plant = plant
    machine_list.insert(ignore_permissions=True)
    return "Machine list sucessfully submitted"


