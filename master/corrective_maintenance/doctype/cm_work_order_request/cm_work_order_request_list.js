frappe.listview_settings['Cm Work Order Request'] = {
    formatters: {
         pro_status(val) {
             if (val=="Assigned"){
           return "<span class='indicator-pill green'>"+__(val)+"</span>"
           }else{
            return "<span class='indicator-pill red'>"+__(val)+"</span>"
              }
         }
     }
 
 
 }