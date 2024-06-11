// Copyright (c) 2024, mazework and contributors
// For license information, please see license.txt

frappe.ui.form.on("Department", {
	onload: function(frm) {  
        if(frm.doc.__islocal){
            frm.set_value('created_date', frappe.datetime.now_datetime()); 
            frm.set_value('created_by', frappe.session.user_fullname);  
        }
    }  
});
