// // Copyright (c) 2024, mazework and contributors
// // For license information, please see license.txt


frappe.ui.form.on('Cm Work Order Request', {
    validate: function (frm) {
        assign = frm.get_docinfo().assignments
        console.log(assign[0].owner)
        if (assign.length > 0) {
            if (assign[0].owner) {
                console.log(assign[0].owner)
                frm.set_value('pro_status', 'Assigned');
                console.log("Assigned")
            } else {
                frm.set_value('pro_status', 'New'); // Adjust this line if needed
                console.log("ELSE=====>")
            }
        }
    }
});

