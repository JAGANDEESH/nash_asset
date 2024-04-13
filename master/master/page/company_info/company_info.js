frappe.pages['company-info'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Company',
        single_column: true
    });

    // Ensure the template exists and is loaded correctly
    $(frappe.render_template("company_info", {})).appendTo(page.body);

    // Handling form submission
    var companyForm = document.querySelector("#companyform");
    if (companyForm) {
        console.log(companyForm);

        companyForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var formData = {
                'Company_Code': document.querySelector("#com_code").value,
                'Company_Name': document.querySelector("#com_name").value,
                'Company_Country': document.querySelector("#com_country").value,
                'Company_State': document.querySelector("#com_state").value,
                'Company_City': document.querySelector("#com_city").value,
                'Company_Pincode': document.querySelector("#com_pincode").value,
                'Company_Phone': document.querySelector("#com_phone").value,
                'Company_Mobile': document.querySelector("#com_mobile").value,
                'Company_Gstinno': document.querySelector("#com_gstinno").value,
                'Company_Website': document.querySelector("#com_website").value,
                'Company_Status': document.querySelector("#com_status").value
            };

            console.log("FormData", formData);

            frappe.call({
                method: 'master.master.page.company_info.company_info.save_Company',
                args: {
                    'data': formData
                },
                callback: function(response) {
                    console.log(response);
                    if (response.message) {
                        alert("You successfully submitted");
                    } else {
                        alert("Failed to create company. Please check the form data.");
                    }
                },
                error: function() {
                    alert("An error occurred while processing your request.");
                }
            });
        });
    } else {
        console.log("Company form not found.");
    }
};
