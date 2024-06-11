import frappe
from frappe.model.document import Document
import json

class PMNOTIFICATIONLIST(Document):
    def after_insert(self):
        frappe.db.set_value("PM NOTIFICATION LIST",self.name,"notification_id", self.name)
        frappe.db.commit()

@frappe.whitelist()
def set_workorder(work_order_date, assigned_to, work_order_status, child_rows):
        # Create a new work order
        work_order = frappe.new_doc("PM WORK ORDER")
        work_order.work_order_date = work_order_date
        work_order.assigned_to = assigned_to
        work_order.work_order_status = work_order_status

        child_rows = json.loads(child_rows)
        for row in child_rows:

            notification = frappe.get_doc("PM NOTIFICATION LIST", row['pm_notification_fk'])
            # frappe.db.set_value("PM NOTIFICATION LIST", row['pm_notification_fk'], {'docstatus': 2})
            # frappe.errprint(str(row['pm_notification_fk']))
            # Create work order items
            pm_work_order = frappe.new_doc("PMW child")
            pm_work_order.pm_notification_fk = row['pm_notification_fk']
            work_order.append("pm_notification", pm_work_order)

            #set the value from pm Notification Machine Numbers
            machine = frappe.get_doc('PM SCHEDULE',notification.schedule_no)
            machineno = machine.machine_number
            pm_workorder_machineno = frappe.new_doc("pm workorder machineno")
            pm_workorder_machineno.machine_number = machineno
            work_order.append("machine_number", pm_workorder_machineno)

            checklists=frappe.db.get_all('Check Lists Child',
                        filters={
                        'parent': notification.check_list_number
                           },
                  fields=['check_point', 'check_for', 'standard_spec__value', 'action_to_be_taken']
                   )
            for checklist in checklists:
                check_point = checklist.get('check_point')
                check_for = checklist.get('check_for')
                standard_spec__value = checklist.get('standard_spec__value')
                action_to_be_taken = checklist.get('action_to_be_taken')
                print(f"Check Point: {check_point}")
                print(f"Check For: {check_for}")
                print(f"Standard Spec / Value: {standard_spec__value}")
                print(f"Action to be Taken: {action_to_be_taken}")
                work_order.append("pm_workorder_checklist_child",frappe.get_doc({
                        "doctype":"pm workorder checklist child",
                        'notification_id':row['pm_notification_fk'],
                        "check_point": check_point,
                        "check_for": check_for,
                        "standard_spec__value": standard_spec__value,         
                        "action_to_be_taken": action_to_be_taken
                    })
                )
          
        work_order.insert(ignore_permissions=True)
        #After generate the workorder the selected pm notification change the docstatus 2
        closed_notification = frappe.get_doc('PM WORK ORDER', work_order.name)
        notification_ids = closed_notification.pm_notification
        for name in notification_ids:
            pm_doc = frappe.get_doc("PM NOTIFICATION LIST",name.pm_notification_fk)
            pm_doc.docstatus = 2
            pm_doc.save()
        return {"message": "Work orders created successfully"}


#generate the workordeer number 
@frappe.whitelist()
def get_upcoming_wo_name():
    try:
         last_work_order_number = frappe.get_last_doc('PM WORK ORDER')
    except frappe.DoesNotExistError:
         last_work_order_number = None
    if last_work_order_number:
        numeric_part = int(last_work_order_number.work_order_number.split("-")[-1])
        new_numeric_part = numeric_part + 1
        new_work_order_number = f"PMW-{new_numeric_part:06d}"
        return new_work_order_number

    else:
        # If no previous work order number found, start with 1
        new_work_order_number = "PMW-000001"
        return new_work_order_number
 