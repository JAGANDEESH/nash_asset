import frappe
from frappe import _

@frappe.whitelist()
def my_list():
    # Retrieve data for each field
    matrix = frappe.get_all('Escalation Matrixs', fields=["stage", "duration_one","int_eijl", "role_one","duration_two","int_tjwl","role_two","status"])

    # Return all the data together
    return matrix

import json

@frappe.whitelist()
def save_matrix_list(data):
    try:
        loaded_data = json.loads(data)

        stage = loaded_data.get('stage')
        duration_one = loaded_data.get('duration_one')
        int_eijl = loaded_data.get('int_eijl')
        role_one = loaded_data.get('role_one')
        duration_two = loaded_data.get('duration_two')
        int_tjwl = loaded_data.get('int_tjwl')
        role_two = loaded_data.get('role_two')
        status = loaded_data.get('status')

        # Validate required fields
        if not all([stage, duration_one, int_eijl, role_one, duration_two, int_tjwl, role_two, status]):
            return "All fields are required."

        matrix = frappe.new_doc("Escalation Matrixs")
        matrix.stage = stage 
        matrix.duration_one = duration_one
        matrix.int_eijl = int_eijl
        matrix.role_one = role_one
        matrix.duration_two = duration_two
        matrix.int_tjwl = int_tjwl
        matrix.role_two = role_two
        matrix.status = status
        matrix.insert(ignore_permissions=True)
        return "Matrix successfully submitted"
    except Exception as e:
        error_message = str(e)
        frappe.log_error(f"Error saving Matrix: {error_message}", "save_matrix_list")
        return error_message
