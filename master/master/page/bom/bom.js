frappe.pages['bom'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BOM List',
		single_column: true
	});
	$(frappe.render_template("bom", {})).appendTo(page.body);

	frappe.call({
		method:'master.master.page.bom.bom.get_bom_list',
		args:{},
		callback:function(response){
			var m = response.message;
			document.getElementById("bom").innerHTML=m;
			console.log(m);
		}
	});
	// frappe.call({
	// 	methoget_child_tabled:'master.master.page.bom.bom.get_child_table',
	// 	args:{
	// 		'bom_id': document.querySelector("#bom_id").value
	// 	},
	// 	callback:function(response){
	// 		var mes = response.message;
	// 		document.getElementById("child_bom").innerHTML=mes;
	// 		console.log(mes);
	// 	}
	// })


		var bomform = document.querySelector('#bomform');
		bomform.addEventListener("submit", function(event) {
			event.preventDefault();
	
			var formData = {
				'bom_id': document.querySelector("#bom_id").value,
				'description': document.querySelector('#description').value,
				'mc_types': document.querySelector('#mc_types').value,
				'bom_items':[{
					'item_code':document.querySelector('#item_code').value,
					'child_description':document.querySelector('#description1').value,
					'qty_used':document.querySelector('#qty_used').value,
					"uom":document.querySelector('#uom').value,	
					'parent':document.querySelector("#bom_id").value,
					'parenttype':"BOM List"
				}
				]

			};
			console.log("FormData", formData);
	
			frappe.call({
				method: 'master.master.page.bom.bom.save_bom_list',
				args: {
					'data': formData
				},
				callback: function(response) {
					console.log(response);
					if (response.message) {
						alert("You successfully submitted");
					} else {
						alert("Failed to create the BOM");
					}
				}
			});
		});	
}

//validate for avoid text and allow only numbers
function validateInput(event){
	var input = event.target;
	input.value = input.value.replace(/\D/g, '')
	if (event.which < 48 || event.which > 57) {
	event.preventDefault();
	
  }
  page.reset();
}

//add the row to the child tableFormData
function addRow() {
    var table = document.getElementById("myTable");
    var newRow = table.insertRow(-1); 
    newRow.innerHTML = `
        <td><input type="checkbox"></td>
        <td><input type="text" class="value" onkeypress="validateInput(event)"></td>
        <td><textarea class="value"></textarea></td>
        <td><input type="text" class="value" onkeypress="validateInput(event)"></td>
		<td><select class="value"><option>Number</option><option>Bar</option></select></td>
    `;
}


//delete the particular row in table
function deleteRow() {
	var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
	var rows = table.rows;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var chkbox = row.cells[0].getElementsByTagName('input')[0];
		if (chkbox.checked) {
			table.deleteRow(i);
			i--; // Adjust the index as rows are deleted
		}
	}
}

