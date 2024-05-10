// frappe.listview_settings["Check List"] = {
//   refresh: function (listview) {
//     listview.page.add_inner_button(__("Get Count"), function () {
//       frappe.call({
//         method: "master.master.doctype.check_list.check_list.get_count",
//         args: {
//           Checklist: "Check List",
//         },
//         callback: function (r) {
//           if (r.message) {
//             frappe.msgprint("Count: " + r.message);
//           }
//         },
//       });
//     });
//   },
// };

// frappe.listview_settings["Check List"] = {
//   onload: function (listview) {
//     // Add your custom JavaScript code here
//     listview.page.add_inner_button(__("Add List"), function () {
//       // Display a dialog box to input new checklist data
//       var dialog = new frappe.ui.Dialog({
//         title: __("Add List"),
//         fields: [
//           {
//             label: __("Checklist Number"),
//             fieldname: "checklist_number",
//             fieldtype: "Data",
//             reqd: 1,
//           },
//           {
//             label: __("Checklist Description"),
//             fieldname: "checklist_description",
//             fieldtype: "Data",
//             reqd: 1,
//           },
//           {
//             label: __("M/C Types"),
//             fieldname: "machine_type_name",
//             fieldtype: "Data",
//             reqd: 1,
//           },
//         ],
//         primary_action: function () {
//           var values = dialog.get_values();
//           if (values) {
//             // Call a custom function to add the checklist
//             addChecklist(values, function (response) {
//               if (response.message && response.message.status === "success") {
//                 frappe.show_alert(__("Values stored successfully"), 5);
//                 var doc = frappe.model.sync(response.message)[0];
//                 frappe.set_route("List", doc.doctype, doc.name);
//               } else {
//                 frappe.msgprint(__("Error storing values"));
//               }
//             });
//             dialog.hide();
//           }
//         },
//       });
//       dialog.show();
//     });
//   },
// };

// // Function to add the checklist using AJAX call
// function addChecklist(data, callback) {
//   frappe.call({
//     method: "master.master.doctype.check_list.check_list.add_checklist",
//     args: {
//       checklist_number: data.checklist_number,
//       checklist_description: data.checklist_description,
//       machine_type_name: data.machine_type_name,
//     },
//     callback: function (response) {
//       callback(response);
//     },
//   });
// }
