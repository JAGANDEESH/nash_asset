frappe.listview_settings['PM WORK ORDER'] = {
    get_indicator: function(doc) {
        // Define indicators based on doc status or other criteria
        if (doc.work_order_status === 'Assigned') {
            return [__('Assigned'), 'green', 'work_order_status,=,Assigned'];
        } else if (doc.work_order_status === 'Cancel') {
            return [__('Cancel'), 'red', 'status,=,Cancel'];
        } 
    }

    
};


// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

// frappe.ui.form.on("PM WORK ORDER", {
// 	onload(frm) {

// 	},
// });
