frappe.pages['company-info'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Company',
        single_column: true
    });

    // Ensure the template exists and is loaded correctly
    $(frappe.render_template("company_info", {})).appendTo(page.body);


    function navigateTo(route) {
        // Use Frappe's built-in routing function to navigate
        frappe.set_route(route);
    }

    // Event listener to handle clicks on navigation links
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            navigateTo(this.getAttribute('data-route')); // Get route from data-route attribute and navigate
        });
    });

    
    frappe.call({
        method:'master.master.page.company_info.company_info.get_company',
        args: {},
        callback:function(response){
            var m = response.message;
            document.getElementById("company").innerHTML=m;
            console.log(m);
        }
    });

    // Handling form submission
    var companyform = document.querySelector("#companyform");
    if (companyform) {
        console.log(companyform);

        companyform.addEventListener("submit", function(event) {
            event.preventDefault();

            var formData = {
                
                'company_code': document.querySelector("#company_code").value,
                'company_name': document.querySelector("#company_name").value,
                'company_address': document.querySelector("#company_address").value,
                'company_country': document.querySelector("#company_country").value,
                'company_state': document.querySelector("#company_state").value,
                'company_city': document.querySelector("#company_city").value,
                'company_email': document.querySelector("#company_email").value,
                'company_pincode': document.querySelector("#company_pincode").value,
                'company_phone': document.querySelector("#company_phone").value,
                'company_mobile': document.querySelector("#company_mobile").value,
                'company_gstinno': document.querySelector("#company_gstinno").value,
                'company_website': document.querySelector("#company_website").value,
                'company_status': document.querySelector("#company_status").value
            };

            console.log("FormData", formData);

            frappe.call({
                method: 'master.master.page.company_info.company_info.save_Company',
                args: {
                    'data': formData
                },
                callback: function(response){
                    console.log(response);
                    if(response.message){
                        alert("You successfully submitted");
                    }
                    else {
                        alert("Failed to create Spares.");
                    }
                }
            });
        });
        
    }
    
        function validateInput(event){
            var input = event.target;
            input.value = input.value.replace(/\D/g, '')
            if (event.which < 48 || event.which > 57) {
            event.preventDefault();
          }
        }
};