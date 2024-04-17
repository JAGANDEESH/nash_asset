frappe.pages['spares-'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Spare page',
		single_column: true
	});

	$(frappe.render_template("spares_", {})).appendTo(page.body);

	page.set_title('Spares list');
	
	frappe.call({
		method:'master.master.page.spares_.spares_.get_spares_list',
		args: {},
		callback:function(response){
			var m = response.message;
			document.getElementById("Spares").innerHTML=m;
			console.log(m);
		}
	});
	var sparesform = document.querySelector("#sparesform");
	console.log(sparesform);
	sparesform.addEventListener("submit", function(event){
		event.preventDefault();

		var formData = {
			'item_code': document.querySelector("#item_code").value,
			'item_description': document.querySelector("#item_description").value,
			'uom': document.querySelector("#uom").value,
			'mfr_part_no': document.querySelector("#mfr_part_no").value,
			'initial_qty': document.querySelector("#initial_qty").value,
			'remaining_qty': document.querySelector("#remaining_qty").value,
			'used_qty': document.querySelector("#used_qty").value
		};
		console.log("FormData", formData);
		frappe.call({
			method: 'master.master.page.spares_.spares_.save_spares_list',
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