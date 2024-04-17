frappe.pages['master-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Master Dashboard',
		single_column: true
	});
$(frappe.render_template("master_dashboard", {})).appendTo(page.body);
document.querySelectorAll(".ol-md-6 col-xl-4").forEach(function (element) {
  element.addEventListener("click", handleClick);
});
};
frappe.require("https://cdn.jsdelivr.net/npm/chart.js", function () {
  
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    title: "Wetter",
    data: {
      labels: ["close", "New", "Improgress", "Completed", "Assigned"],
      datasets: [
        {
          label: "# of Votes",
          data: [11, 10, 40, 15, 10],
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
        yAxes: [
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
  var ctx = document.getElementById("myCharts").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie", 
    data: {
      labels: ["close", "New", "Improgress", "Completed", "Assigned"],
      datasets: [
        {
          label: "# of Votes",
          data: [11, 15, 30, 20, 15],
          backgroundColor: [
            "rgba(255, 99, 71, 0.5)", 
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



frappe.call({
  method: 'master.master.page.master_dashboard.master_dashboard.check_result',
  args: {
      UOM: 'UOM',
      plant: "Plant",
      sparesList:'Spares List',
      MachineList:'Machine List' ,
      MachineType :'Machine Type',
      BOMList:'BOM List',
  },
  callback: function (response) {
      if (response.message) {
          var count = response.message;
          document.getElementById("one").innerHTML = count[0];
          document.getElementById("two").innerHTML = count[1];
          document.getElementById("three").innerHTML = count[2];
          document.getElementById("four").innerHTML = count[3];
          document.getElementById("five").innerHTML = count[4];
          document.getElementById("six").innerHTML = count[5];
      } else {
          console.error("No response message received.");
      }
  },
  error: function (err) {
      console.error("Error fetching entry count:", err);
  }
});

window.onload = function () {
fetchEntryCount();
};



frappe.call({
  method:'master.master.page.master_dashboard.master_dashboard.get_machine_list',
  args:{},
  callback:function(response){
      var m = response.message;
      document.getElementById("List").innerHTML=m;
      console.log(m)
  }

  })

$(document).ready(function() {
    // Function to handle the toggling of collapse sections
    function toggleCollapse(sectionId) {
        $(sectionId).collapse('toggle');
    }

    // Event listeners for each menu item
    $('.Company').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Company", "List");
    });

    $('.Plant').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Plant", "List");
    });

    $('.Location').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Location", "List");
    });

    $('.Department').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Department", "List");
    });

    $('.Shift').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Shift", "List");
    });

    $('.Type').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Machine Type", "List");
    });

    $('.Spares').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Spares List", "List");
    });

    $('.BOM').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "BOM List", "List");
    });

    $('.Machine').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Machine List", "List");
    });

    $('.Check').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Check List", "List");
    });

    $('.UOM').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "UOM", "List");
    });

    $('.Escalation').on('click', function() {
        toggleCollapse('#dashboardCollapse');
        frappe.set_route("List", "Escalation Matrixs", "List");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const menuIcon = document.querySelectorAll(".fa-caret-down");

  menuIcon.forEach(function(icon) {
      icon.addEventListener("click", function() {
          const sidebar = document.querySelector(".sidebar");
          sidebar.classList.toggle("collapsed");
      });
  });
});