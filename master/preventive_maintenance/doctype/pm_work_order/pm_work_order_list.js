frappe.listview_settings["PM WORK ORDER"] = {
  onload: function (listview) {
    listview.refresh();
  },
};

frappe.ui.form.on("PM WORK ORDER", {
  refresh: function (frm) {
    frm.add_custom_button(__("Assign"), function () {
      frappe.call({
        method:
          "master.preventive_maintenance.doctype.pm_work_order.pm_work_order.update_status",
        args: {
          docname: frm.doc.name,
          name: frm.doc.name,
          fieldname: {
            status: "Assigned",
            work_order_status: "Assigned",
          },
        },
        callback: function (response) {
          console.log(response);
          if (!response.exc) {
            frappe.msgprint(__("Status updated to Assigned"));
          } else {
            frappe.msgprint(__("An error occurred while updating the status"));
          }
          frm.reload_doc();
        },
      });
    });

    frm.add_custom_button(__("Inprogress"), function () {
      frappe.call({
        method:
          "master.preventive_maintenance.doctype.pm_work_order.pm_work_order.inprogress_status",
        args: {
          docname: frm.doc.name,
          name: frm.doc.name,
          fieldname: {
            status: "Inprogress",
            work_order_status: "Inprogress",
          },
        },
        callback: function (response) {
          console.log(response);
          if (!response.exc) {
            frappe.msgprint(__("Status updated to Inprogress"));
          } else {
            frappe.msgprint(__("An error occurred while updating the status"));
          }
          frm.reload_doc();
        },
      });
    });
  },
});
