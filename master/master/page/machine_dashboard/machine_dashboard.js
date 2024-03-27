frappe.pages['machine-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Machine Dashboard',
		single_column: true
	});
	$(frappe.render_template("machine_dashboard",{})).appendTo(page.body);
}


frappe.require("https://cdn.jsdelivr.net/npm/chart.js", function () {
  // Code to execute after chart.js is loaded
  // For example, you can initialize a chart here
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    title: "Wetter",
    data: {
      labels: ["FBE", "BE", "ME", "EE", "FEE"],
      datasets: [
        {
          label: "# of Votes",
          data: [2, 9, 55, 20, 1],
          backgroundColor: "rgb(255, 99, 71)",
          borderColor: ["rgba(255, 99, 132, 1)"],
          tension: 0.5,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Wetterdaten",
      },
      scales: {
        yAxis: [
          {
            id: "left-y-axis",
            position: "left",
            ticks: {
              stepSize: 10,
            },
          },
          {
            id: "right-y-axis",
            position: "right",
            ticks: {
              stepSize: 100,
            },
          },
        ],
      },
    },
  });
});
frappe.require("https://cdn.jsdelivr.net/npm/chart.js", function () {
  // Code to execute after chart.js is loaded
  // For example, you can initialize a chart here
  var ctx = document.getElementById("myCharts").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie", // Change chart type to 'pie'
    data: {
      labels: ["FBE", "BE", "ME", "EE", "FEE"],
      datasets: [
        {
          label: "# of Votes",
          data: [2, 9, 55, 20, 1],
          backgroundColor: [
            "rgba(255, 99, 71, 0.5)", // Adjust the background color with opacity
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 71, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Wetterdaten",
      },
    },
  });
});

frappe.pages['machine-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Machine Dashboard',
		single_column: true
	});
	frappe.call({
    method: "master.master.page.machine_dashboard.get_entry_count",
    args: {
        doctype: "Plant",
    },
    callback: function (r) {
        var count = r.message;
        document.getElementById("count").innerHTML=count;
    },
});
 function handleClick() {
  fetchEntryCount();
}
}