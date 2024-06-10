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
    // {
    //   fieldname: "period_from",
    //   label: __("Period From"),
    //   fieldtype: "MultiSelectList",
    //   options: from_period(),
    // },
    // {
    //   fieldname: "period_to",
    //   label: __("Period To"),
    //   fieldtype: "MultiSelectList",
    //   options: to_period(),
    // },
    {
      fieldname: "shift",
      label: __("Shift"),
      fieldtype: "MultiSelectList",
      options: shift(),
    },
    {
      fieldname: "department",
      label: __("Department"),
      fieldtype: "MultiSelectList",
      options: department(),
    },
  ],
};

function shift() {
  let values = [];
  frappe.call({
    method:
      "master.report_doctypes.report.machine_maintenance_report.machine_maintenance_report.get_shift",
    callback: function (r) {
      if (r.message) {
        r.message.forEach((row) =>
          values.push({ value: row.shift_name, description: row.shift_name })
        );
      }
    },
  });

  return values;
}

function department() {
  let values = [];
  frappe.call({
    method:
      "master.report_doctypes.report.machine_maintenance_report.machine_maintenance_report.get_department",
    callback: function (r) {
      if (r.message) {
        r.message.forEach((row) =>
          values.push({
            value: row.department_name1,
            description: row.department_name1,
          })
        );
      }
    },
  });

  return values;
}
