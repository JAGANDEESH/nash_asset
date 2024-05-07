# Copyright (c) 2024, mazework and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class PMSCHEDULE(Document):
    def after_insert(self):
        system_manager = frappe.get_value("machine_number", self.machine_number, "system_manager")

        # Create a PM Notification
        pm_notification = frappe.new_doc("PM NOTIFICATION LIST")
        pm_notification.system_manager = system_manager
        pm_notification.machine_number = self.machine_number
        pm_notification.machine_type = self.machine_type
        pm_notification.schedule_name = self.pm_schedule_name
        pm_notification.assigned_department = self.assigned_department,
        pm_notification.description = self.description
        pm_notification.plan_date = self.plan_date
        pm_notification.frequency = self.frequency
        pm_notification.check_list_number = self.checklist_number
        pm_notification.plant = self.plant
        pm_notification.docstatus = 1
        # Save the PM Notification
        pm_notification.insert(ignore_permissions=True)
        