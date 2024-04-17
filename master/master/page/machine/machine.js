frappe.pages['machine'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Machine list',
		single_column: true
	});
	$(frappe.render_template("machine",{})).appendTo(page.body);

	frappe.call({
		method:'master.master.page.machine.machine.get_machine_list',
		args:{},
		callback:function(response){
			var m = response.message;
			document.getElementById("Machine_list").innerHTML=m;
			console.log(m);
		}
	});
	var machineform = document.querySelector('#machineform');
	machineform.addEventListener("submit",function(event){
		event.preventDefault();

		var formData = {
			'machine_number' : document.querySelector('#machine_number').value,
			'machine_name': document.querySelector('#machine_name').value,
			'machine_description': document.querySelector('#machine_description').value,
			'type': document.querySelector('#type').value,
			'makemodelcapacity': document.querySelector('#makemodelcapacity').value,
			'specification': document.querySelector('#specification').value,
			'commission_date': document.querySelector('#commission_date').value,
			'supplier__service_address': document.querySelector('#supplier__service_address').value,
			'service_contact_person': document.querySelector('#service_contact_person').value,
			'service_contact_numbe': document.querySelector('#service_contact_numbe').value,
			'critical_spares_bom': document.querySelector('#critical_spares_bom').value,
			'power_consumption': document.querySelector('#power_consumption').value,
			'required_air': document.querySelector('#required_air').value,
			'required_gas': document.querySelector('#required_gas').value,
			'required_oilgrade': document.querySelector('#required_oilgrade').value,
			'total_shot': document.querySelector('#total_shot').value,
			'remaining_shots': document.querySelector('#remaining_shots').value,
			'location': document.querySelector('#location').value,
			'plant': document.querySelector('#plant').value,

		};
		console.log("FormData", formData);
	
			frappe.call({
				method: 'master.master.page.machine.machine.save_machine_list',
				args: {
					'data': formData
				},
				callback: function(response) {
					console.log(response);
					if (response.message) {
						alert("You successfully submitted");
					} else {
						alert("Failed to create the Machine List");
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