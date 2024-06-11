frappe.pages['project'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Schedule',
		single_column: true
	});
	$(frappe.render_template("project", {})).appendTo(page.body);

	frappe.call({
        method:'master.master.page.project.project.get_project',
        args: {},
        callback:function(response){
            var m = response.message;
            document.getElementById("project").innerHTML=m;
            console.log("my------>",m);
        }
    });

    // Handling form submission
    var projectform = document.querySelector("#projectform");
    if (projectform) {
        console.log("form---->",projectform);

        projectform.addEventListener("submit", function(event) {
            event.preventDefault();

            var formData = {
                'project_name': document.querySelector("#project_name").value,
                'customer_name': document.querySelector("#customer_name").value,
                'project_status': document.querySelector("#project_status").value,
                'developer_name': document.querySelector("#developer_name").value,
                'actual_effort_days': document.querySelector("#actual_effort_days").value,
                'start_date': document.querySelector("#start_date").value,
                'end_date': document.querySelector("#end_date").value,
                'over_due_days': document.querySelector("#over_due_days").value,
                'project_cost': document.querySelector("#project_cost").value,
                'payment_recieved': document.querySelector("#payment_recieved").value,
                'pending_payment': document.querySelector("#pending_payment").value
            }

            console.log("FormData", formData);

            frappe.call({
                method: 'master.master.page.project.project.save_project',
                args: {
                    'data': formData
                },
                callback: function(response){
                    console.log(response);
                    if(response.message){
                        alert("You successfully submitted");
                    }
                    else {
                        alert("Failed");
                    }
                }
            });
        });
        
    }
}