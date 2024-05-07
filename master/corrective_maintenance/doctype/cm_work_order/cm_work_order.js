frappe.ui.form.on('Cm Work Order', {
    refresh(frm) {
        // Add a custom button
        frm.add_custom_button('Spare Add', function() {
            // Logic to show the three fields
            frm.set_df_property('spare', 'hidden', 0); // Replace 'field_name_1' with your actual field name
            frm.set_df_property('spare_uom', 'hidden', 0); // Replace 'field_name_2' with your actual field name
            frm.set_df_property('spare_qty', 'hidden', 0); // Replace 'field_name_3' with your actual field name
            // Optionally, refresh the fields to ensure they are updated on the form
            frm.refresh_field('spare');
            frm.refresh_field('spare_uom');
            frm.refresh_field('spare_qty');
        });
    }
});
