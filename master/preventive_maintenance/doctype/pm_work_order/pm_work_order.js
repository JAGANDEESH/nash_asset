// frappe.ui.form.on('PM Schedule', {
//     refresh: function(frm) {
//         // Add a custom button to fetch and display PM Work Orders
//         frm.add_custom_button(__('Display Work Orders'), function() {
//             // Call a server method to get PM Work Orders
//             frappe.call({
//                 method: 'master.preventive_maintenance.doctype.pm_work_order.pm_work_order.get_work_orders',
//                 args: {
//                     pm_schedule_name: frm.doc.name
//                 },
//                 callback: function(response) {
//                     var work_orders = response.message;
//                     if (work_orders && work_orders.length > 0) {
//                         // Clear existing table
//                         frm.fields_dict['pm_work_order'].grid.remove_all();

//                         // Populate PM Work Order table
//                         work_orders.forEach(function(work_order) {
//                             var row = frappe.model.add_child(frm.doc, 'PM Work Order', 'pm_work_order');
//                             row.name = work_order.name;
//                             row.description = work_order.description;
//                         });

//                         // Refresh form to reflect changes
//                         frm.refresh_field('pm_work_order');
//                     } else {
//                         frappe.msgprint(__('No PM Work Orders found.'));
//                     }
//                 }
//             });
//         });
//     }
// });
