// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

// frappe.ui.form.on("PM NOTIFICATION LIST", {
// 	refresh(frm) {

// 	},
// });


// frappe.listview_settings['PM NOTIFICATION LIST'] = {
//     refresh: function(listview) {
//         listview.page.add_inner_button("Generate Work Order", function() {
//             frappe.call({
//                 method: "frappe.client.get_list",
//                 args: {
//                     doctype: "PM WORK ORDER",
//                     fields: ["work_order_number", "work_order_date", "assigned_by", "work_order_status"]
//                 },
//                 callback: function(response) {
//                     const documents = response.message;
//                     // Display the desired fields for each document
//                     if (documents && documents.length > 0) {
//                         documents.forEach(doc => {
//                             message += `Work Order Number: ${doc.work_order_number}<br>`;
//                             message += `Work Order Date: ${doc.work_order_date}<br>`;
//                             message += `Assigned By: ${doc.assigned_by}<br>`;
//                             message += `Work Order Status: ${doc.work_order_status}<br>`;
//                             message += "<br>";
//                         });
//                         frappe.msgprint(message);
//                     }
//                 }
//             }); 
//         });
//     }
// };

