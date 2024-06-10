frappe.listview_settings['PM WORK ORDER'] = {
    onload: function(listview) {
        listview.refresh();
    },
    onreload: function(listview) {
        listview.page.sidebar.find('a:contains("Submitted")').text('Assigned');
    },
    get_indicator: function(doc) {
        if (doc.work_order_status === 'Assigned') {
            return [__('Assigned'), 'green', 'work_order_status,=,Assigned'];
        } else if (doc.work_order_status === 'cancel') {
            return [__('cancel'), 'red', 'work_order_status,=,cancel'];
        }
    },
    
};

frappe.ui.form.on('PM WORK ORDER', {
    refresh: function(frm) {
        // Add a custom button
        frm.add_custom_button(__('Update'), function() {
            frappe.call({
                method: 'master.preventive_maintenance.doctype.pm_work_order.pm_work_order.update_status',  // Adjust the path to your update_status function
                args: {
                    docname: frm.doc.name,
                    name : frm.doc.name,
                    fieldname :{
                        status : 'Inprogress',
                        work_order_status : 'Inprogress'
                    }
                },
                callback: function(response) {
                    if (!response.exc) {
                        frappe.msgprint(__('Status updated to InProgress'));
                    } else {
                        frappe.msgprint(__('Status updated to Assigned'));
                    }
                    frm.reload_doc(); 
                }              
                
            });
        });
    }
});
