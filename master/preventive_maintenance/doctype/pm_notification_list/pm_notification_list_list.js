frappe.listview_settings['PM NOTIFICATION LIST'] = {
    refresh: function(listview) {
        listview.page.add_inner_button("Generate Work Order", function() {
            var selected_rows = listview.get_checked_items();
            if (!selected_rows.length) {
                frappe.msgprint("Please select at least one checkbox.");
                return;
            }

            // Show dialog for work order details
            var dialog = new frappe.ui.Dialog({
                title: 'New Work Order',
                fields: [
                    { label: "Work Order Date", fieldname: "work_order_date", fieldtype: "Date" },
                    { label: "Assigned By", fieldname: "assigned_by", fieldtype: "Data" },
                    { label: "Work Order Status", fieldname: "work_order_status", fieldtype: "Data" },
                ],
                primary_action_label: 'Submit',
                primary_action: function(values) {
                    frappe.call({
                        method: 'master.preventive_maintenance.doctype.pm_notification_list.pm_notification_list.set_workorder',
                        args: {
                            work_order_date: values.work_order_date,
                            assigned_by: values.assigned_by,
                            work_order_status: values.work_order_status,
                            selected_rows: selected_rows.map(row => row.name)
                        },
                        callback: function(response) {
                            console.log(response);
                            frappe.msgprint(response.message);
                            listview.refresh();
                        }
                    });
                    dialog.hide();
                }
            });
            dialog.show();
        });
    }
};





// frappe.listview_settings['PM NOTIFICATION LIST'] = {
//     refresh: function(listview) {
//         listview.page.add_inner_button("Generate Work Order", function() {
//         });
//     }
// };
