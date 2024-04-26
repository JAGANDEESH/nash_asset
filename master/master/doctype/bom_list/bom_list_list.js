// frappe.listview_settings['BOM List'] = {
//     onload: function (listview) {
//         ButtonFunction();
//     }
// };
//     const table_fields = [
//         {
//             fieldname: "item_code",
//             fieldtype: "Link",
//             in_list_view: 1,
//             label: "Item Code",
//             options: "Spares List",
           
//         },
//         {
//             fetch_from: "item_code.item_description",
//             fieldname: "description",
//             fieldtype: "Data",
//             in_list_view: 1,
//             label: "Description",
//         },
//         {
//             fieldname: "qty_used",
//             fieldtype: "Data",
//             in_list_view: 1,
//             label: "Qty Used",
//         },
//         {
//             fieldname: "uom",
//             fieldtype: "Select",
//             in_list_view: 1,
//             label: "UOM",
//             options: "Number\n Barcode",
//             fetch_from: "item_code.uom",

//         },
//     ];

//     var dialog = new frappe.ui.Dialog({
//         title: 'Enter BOM Details',
//         fields: [
//             { label: 'BOM ID', fieldname: 'bom_id', fieldtype: 'Data' },
//             { label: 'Description', fieldname: 'description', fieldtype: 'Small Text' },
//             { label: 'M/C Types', fieldname: 'mc_types', fieldtype: 'Link', options: 'Machine Type' },
//             { label: 'BOM Table', fieldname: 'bom_table', fieldtype: 'Table', options: 'BOM child table', fields: table_fields }
//         ],
//         primary_action_label: 'Submit',
//         primary_action:function(values) {
//             // var bomid = values.bom_id;
//             frappe.call({
//                 method :"master.master.doctype.bom_list.bom_list.fetch_bom_values",
//                 args:{
//                     'doctype':'BOM List',
//                     'bom_id':values.bom_id,
//                     'description':values.description,
//                     'mc_types':values.mc_types,
//                     'bom_table':values.bom_table
//                 },
//                 callback:function(responce){
//                     console.log(responce);
//                     bom_values = responce.message
//                 }
//             });
//             dialog.hide();
//         }
//     });
//     dialog.show();
    