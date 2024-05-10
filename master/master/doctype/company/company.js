// // Copyright (c) 2024, mazework and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Company", {
	refresh(frm) {
		frm.add_custom_button('compnay 1',()=>{
			frappe.msgprint(__('Hi This is Company 1 Doctype'));
		},'Com_List')

		frm.add_custom_button('compnay 2',()=>{
			frappe.msgprint(__('Hi This is Company 2 Doctype'));
		},'Com_List')


// Dialog Box

        if(frm.is_new()){
        let d = new frappe.ui.Dialog({
            title : "Enter The Company Name and Company Code",
            fields:[{
                label:"Company Name",
                fieldname:"company_name",
                fieldtype:"Data"
            },
            {
            label:"Company Code",
                fieldname:"company_code",
                fieldtype:"Data"  
            }],
            primary_action_label:'Save',
            primary_action(values){
                frm.set_value('company_name',values.company_name)
                frm.set_value('company_code',values.company_code)
                d.hide();
            }
        });
        d.show();
    }
	},
    
});

frappe.ui.form.on('Company' ,{
    refresh(frm){
        frm.add_custom_button("Plant List",()=>{
            frappe.set_route('List','Plant');
        })
        
    }
})
// frappe.listview_settings['Company'] = {
//     refresh: function(listview) {
//         listview.page.add_inner_button("Company Name", function() {
//         	frappe.call({
//                 method: 'master.master.doctype.company.get_value',
//                 args: {docname: frm.Company},
//                 callback: function(r) {
//                     if(!r.exc) {
//                         frappe.msgprint(`The value of the field is: ${r.message}`);
                        
//                     }
//                 }
//             });

//         });;
//     },
// };



// frm.remove_custom_button('Plant List');