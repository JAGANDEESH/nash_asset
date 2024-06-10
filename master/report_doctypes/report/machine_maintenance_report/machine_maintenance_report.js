// Copyright (c) 2024, Admin and contributors
// For license information, please see license.txt

frappe.query_reports["Machine Maintenance Report"] = {
  onload(report) {
    report.page.add_inner_button("Refresh", () => {
      report.setup_filters();
      frappe.show_alert("Refreshing!", 5);

      report.refresh();
    });
  },
  filters: [
    {
      fieldname: "crsesn",
      label: __("Period From"),
      fieldtype: "Date",
    },
    {
      fieldname: "werks",
      label: __("Period To"),
      fieldtype: "Date",
    },
    {
      fieldname: "div_code",
      label: __("Shift"),
      fieldtype: "Link",
      options: "shift",
    },
    {
      fieldname: "plot_type",
      label: __("Department"),
      fieldtype: "Link",
      options: "Department",
    },
  ],
};
