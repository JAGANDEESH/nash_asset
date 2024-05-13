frappe.query_reports["Corrective Maintenance Report"] = {
  onload(report) {
    report.page.add_inner_button("Refresh", () => {
      report.setup_filters();
      frappe.show_alert("Refreshing!", 5);

      report.refresh();
    });
  },
  filters: [
    {
      fieldname: "work_order_number",
      label: __("Work Order Number"),
      fieldtype: "Link",
      options: "Cm Work Order Request",
    },
    {
      fieldname: "machine_type",
      label: __("Machine Type"),
      fieldtype: "Link",
      options: "Machine Type",
    },
    {
      fieldname: "machine_number",
      label: __("Machine Number"),
      fieldtype: "Link",
      options: "Machine List",
    },

    {
      fieldname: "department",
      label: __("Department"),
      fieldtype: "Link",
      options: "Department",
    },
    {
      fieldname: "work_order_request_number",
      label: __("Work Order Request Number"),
      fieldtype: "Link",
      options: "Cm Work Order Request",
    },
    {
      fieldname: "status",
      label: __("Status"),
      fieldtype: "Select",
      options: ["", "Open", "Inprogress", "Completed", "Reopen", "Closed"],
    },
  ],
};
