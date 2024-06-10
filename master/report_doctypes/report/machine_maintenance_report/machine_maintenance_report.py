import frappe
import json
from frappe import _
from urllib.parse import unquote

def execute(filters=None):
    
    columns = [
        {
            "label": "Maintenance Type",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Breakdown Slip",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Shift",
            "fieldname":"shift_name",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Reporting Date",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Report Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Closing Date",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Closing Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Breakdown Minutes",
            "width": 110,
            "align": "left"
        },
        {
            "label": "Section",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Machine ID",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Machine Name",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Segment",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Department",
            "fieldname":"deparment_name1",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Report by",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Production Start Date and Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Work Start Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Work End Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Handover Time",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Attended By",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Production Incharge",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Maintenance Incharge",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Auxiliaries Name",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Breakdown Group",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Category",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Horizontal Deployment",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Deployment Action",
            "width": 200,
            "align": "left"
        },
        {
            "label": "Read Status",
            "width": 200,
            "align": "left"
        }
    ]


    shift = filters.get("shift") or ""
    shifts = ','.join(unquote(e) for e in shift)
    
    department = filters.get("department") or ""
    departments = ','.join(unquote(e) for e in department)
    
    

    tabshift, = frappe.qb.Tables('tabshift')
    query = frappe.qb.from_(tabshift) \
    .select(
        tabshift.shift_name.as_('shift_name'))
    
    
    tabDepartment, = frappe.qb.Tables('tabDepartment')
    query1 = frappe.qb.from_('tabdepartmnet') \
        .select(
            tabDepartment.deparment_name1.as_("deparment_name1")
        )
    
    if shifts:
        query = query.where(tabshift.shift_name.isin(shifts.split(',')))
        
    if departments:
        query1 = query1.where(tabDepartment.deparment_name1.isin(departments.split(',')))
        
    mydata = query.run(as_dict=True)
    mydata1 = query.run(as_dict=True)
    return [columns, mydata , mydata1]

@frappe.whitelist()
def get_shift():
    result = frappe.db.sql(""" SELECT DISTINCT `shift_name` FROM `tabshift` """,as_dict=True)
    return result

@frappe.whitelist()
def get_department():
    result = frappe.db.sql(""" SELECT DISTINCT `deparment_name1` FROM `tabDepartment` """,as_dict=True)
    return result