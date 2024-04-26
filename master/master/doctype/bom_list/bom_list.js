// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

frappe.ui.form.on("BOM List", {
    onload(frm) {
        frm.add_custom_button('Show the DT', () => {
            
        }, 'BOM');
    },

    on_submit(frm) {
        frappe.msgprint("You successfully submitted 🎉");
    },

    refresh(frm) {
        if (frm.is_new()) {
            let d = new frappe.ui.Dialog({
                title: "Enter The BOM List",
                fields: [{
                        label: "BOM ID",
                        fieldname: "bom_id",
                        fieldtype: "Int"
                    },
                    {
                        label: "Description",
                        fieldname: "description",
                        fieldtype: "Small Text"
                    }
                ],
                primary_action_label: 'Save',
                primary_action(values) {
					console.log("values", values);
                    frm.set_value('bom_id', values.bom_id);
                    frm.set_value('description', values.description);
                    d.hide();
                }
            });
            d.show();
        }
    }
});
