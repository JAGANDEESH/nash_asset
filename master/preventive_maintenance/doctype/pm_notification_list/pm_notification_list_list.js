frappe.listview_settings['PM NOTIFICATION LIST'] = {
    onload: function(listview) {
		frappe.route_options = {
			"docstatus": ["in",[0,1]]
		}
    },

    refresh: function(listview) {
        listview.page.add_inner_button("Generate Work Order", function() {
            var selected_rows = listview.get_checked_items();
            if (!selected_rows.length) {
                frappe.msgprint("Please select at least one checkbox.");
                return;
            }
            
            var a_namePromise = new Promise(function(resolve, reject) {
                frappe.call({
                    method: 'master.preventive_maintenance.doctype.pm_notification_list.pm_notification_list.get_upcoming_wo_name',
                    // args: {
                    //     // You can pass any arguments here if required
                    // },
                    callback: function(response) {
                        var message = response.message;
                        resolve(message); // Resolve the Promise with the value of a_name
                    }
                });
            });
            var name; 
            a_namePromise.then(function(a_name) {
                
                var dialog = new frappe.ui.Dialog({
                    title: 'New Work Order',
                    fields: [
                        { label: "Work Order Number", fieldname: "work_order_number", fieldtype: "Data",default:a_name, read_only: 1 },
                        { label: "Work Order Date", fieldname: "work_order_date", fieldtype: "Date",default:"Today",read_only: 1 },
                        { label: "Assigned To", fieldname: "assigned_to", fieldtype: "Data" },
                        { label: "Work Order Status", fieldname: "work_order_status", fieldtype: "Data",options: ['Assigned'], default: 'Assigned',read_only: 1 },
                    ],
                    primary_action_label: 'Submit',
                    primary_action: function(values) {
                        // Send selected rows to the server
                        frappe.call({
                            method: 'master.preventive_maintenance.doctype.pm_notification_list.pm_notification_list.set_workorder',
                            args: {
                                work_order_date: values.work_order_date,    
                                assigned_to: values.assigned_to,
                                work_order_status: values.work_order_status,
                                'child_rows': selected_rows.map(function(row) {
                                    return {
                                        'pm_notification_fk': row.name,
                                    };
                                })
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
            
        });
        // disable_checkbox(listview)
    },
};

// function disable_checkbox(listview){
//     console.log(listview.data)
//     listview.data.forEach((d,i) =>{
//         if(d.docstatus == 1){
//             // console.log("Disable Checkbox", $(".list-row-container")[i]);
//             $($(".list-row-container")[i]).find('.list-row-checkbox').attr('disabled',true)
//         }
//     })
// }

function get_upcoming_wo_name(data) {
            return data
}


// frappe.listview_settings['PM NOTIFICATION LIST'] = {
//     refresh: function(listview) {
//         listview.page.add_inner_button("Generate Work Order", function() {
//         });
//     }
// };


