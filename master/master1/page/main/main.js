frappe.pages['main'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "",
		single_column: true
	});
	// page.set_title("my page");
	// page.set_indicator("ok","red");
	// let $btn = page.set_primary_action('login', () => frappe.msgprint("login is created"), 'octicon octicon-plus');
	// let $btnone= page.set_secondary_action('login', () => frappe.msgprint("login is created"), 'octicon octicon-plus');
    // page.add_menu_item('send mail',()=>frappe.msgprint("Send Email"));
	// page.add_action_item('send mail',()=>frappe.msgprint("Send Email"));
	// page.add_inner_button("inner",()=>frappe.msgprint("inner work"));// add a normal inner button
	// page.add_inner_button('Update Posts', () => update_posts())
	// // page.change_inner_button_type('Update Posts',"ohhh", 'primary');		
	// let field = page.add_field({
	// 	label: 'Status',
	// 	fieldtype: 'Select',
	// 	fieldname: 'status',
	// 	options: [
	// 		'Open',
	// 		'Closed',
	// 		'Cancelled'
	// 	],
	// 	change() {
	// 		frappe.msgprint(field.get_value());
	// 	}
	// });
	$(frappe.render_template("main",{
		data:"hi frappe"
	})).appendTo(page.body);
	
}

frappe.require('https://cdn.jsdelivr.net/npm/chart.js', function() {
        // Code to execute after chart.js is loaded
        // For example, you can initialize a chart here
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
    title: 'Wetter',
    data: {
        labels: ["FBE", "BE", "ME", "EE", "FEE"],
        datasets: [{label: '# of Votes',
        data: [2, 9, 55, 20, 1],
        backgroundColor: 'rgb(255, 99, 71)',
        borderColor: [
            'rgba(255, 99, 132, 1)'],
        tension:0.5
    }]
    },
    options: {
        title: {
            display: true,
            text: 'Wetterdaten'
        },
        scales: {
            yAxes: [{
                id: 'left-y-axis',
                position: 'left',
                ticks: {
                    stepSize: 10
                }
            }, {
                id: 'right-y-axis',
                position: 'right',
                ticks: {
                    stepSize: 100
                }
            }]
        }
    }
        });
    });
	frappe.require('https://cdn.jsdelivr.net/npm/chart.js', function() {
      var ctx = document.getElementById('myPieChart').getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Pie Chart Example'
          }
        }
      });
    });
	frappe.require('https://cdn.jsdelivr.net/npm/chart.js', function() {
		var ctx = document.getElementById('myBarChart').getContext('2d');
		var myBarChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ["FBE", "BE", "ME", "EE", "FEE"],
				datasets: [{
					label: '# of Votes',
					data: [2, 4, 1, 20, 1],
					backgroundColor: [
						'rgba(255, 99, 132, 0.5)',
						'rgba(54, 162, 235, 0.5)',
						'rgba(255, 206, 86, 0.5)',
						'rgba(75, 192, 192, 0.5)',
						'rgba(153, 102, 255, 0.5)',
						'rgba(255, 159, 64, 0.5)'
					  ],
					borderColor: 'rgba(255, 99, 71, 1)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	});
	function fetchEntryCount() {
		frappe.call({
		  method: "master.master1.page.main.main.get_entry_count",
		  args: {
			Department: "Department",
		
			// Plant: "Company",
			// Plant: "Location",
			// Plant: "Check List",
			// Plant: "UOM"
		
		},
		  callback: function (response) {
			var count =response.message;
		    document.getElementById("count").innerHTML=count;
		  },
		});
	  }
	  
	
		fetchEntryCount();
	  