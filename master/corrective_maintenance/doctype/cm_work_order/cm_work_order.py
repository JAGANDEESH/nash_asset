# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CmWorkOrder(Document):
    pass

@frappe.whitelist()
def insert_or_update_work_order(data):
    """
    Insert or update Cm Work Order from form data.
    :param data: Dictionary containing the work order data.
    """
    try:
        # Check if it's a new or existing work order
        if 'name' in data and frappe.db.exists('Cm Work Order', data['name']):
            # It's an update
            work_order = frappe.get_doc('Cm Work Order', data['name'])
            work_order.update(data)
            msg = "Updated"
        else:
            # It's a new entry
            work_order = frappe.new_doc('Cm Work Order')
            work_order.update(data)
            msg = "Inserted"
        
        work_order.save(ignore_permissions=True)
        frappe.db.commit()
        
        return {'status': True, 'message': f'Work Order {msg} Successfully', 'name': work_order.name}
    except Exception as e:
        return {'status': False, 'message': str(e)}

def prepare_data_and_call():
    # Example data, this should come from your client-side form submission
    data = {
        "root_cause": "Example root cause",
        "action_taken": "Replaced faulty part",
        "status": "Closed",
        "start_date_time": "2024-01-01 08:00:00",
        "end_date_time": "2024-01-01 12:00:00",
        "spares": [
            {"spare": "Spare A", "spare_uom": "pcs", "spare_qty": 2},
            {"spare": "Spare B", "spare_uom": "pcs", "spare_qty": 3}
        ]
    }

    # Simulating an insert or update
    result = insert_or_update_work_order(data)
    frappe.msgprint(result['message'])

