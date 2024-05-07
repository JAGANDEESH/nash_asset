// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Check List", {
// 	refresh(frm) {

// 	},
// });

// frappe.ui.form.on("Check List", {
//   refresh(frm) {
//     if ("Check List" && frm.doc.checklist_number) {
//       frm.add_custom_button(__("My Button"), () => {
//         frappe.set_route("Form", "Check List", frm.doc.checklist_number);
//         frappe.msgprint("Congrats");
//       });
//     }
//   },
// });

// function ButtonFunction(listview) {
//   console.log("ButtonFunction");
// }

// frappe.listview_settings["Check List"] = {
//   refresh: function (listview) {
//     listview.page.add_inner_button("ID/Status", function () {
//       ButtonFunction(listview);
//     });
//   },
// };

//dbcount
// function fetchEntryCount() {
//   frappe.call({
//     method: "master.master.doctype.check_list.check_list.get_entry_count",
//     args: {},
//     callback: function (response) {
//       var count = response.message;
//       document.getElementById(button).innerHTML = count;
//     },
//   });
// }
// fetchEntryCount();

// function ButtonFunction(listview) {
//   console.log("Hello world");
// }

// frappe.listview_settings["Check List"] = {
//   refresh: function (listview) {
//     listview.page.add_inner_button("ID/Status", function () {
//       ButtonFunction(listview);
//     });
//   },
// };
