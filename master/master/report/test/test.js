// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

frappe.query_reports["test"] = {
  filters: [
    {
      fieldname: "company_code",
      label: __("Company Code"),
      fieldtype: "Data",
      options: "1",
      default: frappe.defaults.get_user_default("company"),
    },
    {
      fieldname: "company_name",
      label: __("Company Name"),
      fieldtype: "Data",
      options: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"],
      default: "Yearly",
      depends_on: 'eval:doc.company=="Gadget Technologies Pvt. Ltd."',
    },
  ],
};
