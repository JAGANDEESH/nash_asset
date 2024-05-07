frappe.pages["test-page"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "",
    single_column: true,
  });
  $(frappe.render_template("test_page", {})).appendTo(page.body);

  document.querySelectorAll(".card-body").forEach(function (element) {
    element.addEventListener("click", handleClick);
  });
};

//pie chart
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

//graph
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

function fetchEntryCount() {
  frappe.call({
    method: "master.master.page.test_page.test_page.get_entry_count",
    args: {
      Plant: "Plant",
      Company: "Company",
      Location: "Location",
      Checklist: "Check List",
      UOM: "UOM",
      BOMlist: "BOM List",
    },
    callback: function (response) {
      var counts = response.message; // Assuming response.message is an array of counts

      document.getElementById("countElementId1").innerHTML = counts[0];
      document.getElementById("countElementId2").innerHTML = counts[1];
      document.getElementById("countElementId3").innerHTML = counts[2];
      document.getElementById("countElementId4").innerHTML = counts[3];
      document.getElementById("countElementId5").innerHTML = counts[4];
      document.getElementById("countElementId6").innerHTML = counts[5];
    },
  });
}
fetchEntryCount();
function handleClick() {
  fetchEntryCount();
}

//table view
function viewList() {
  frappe.call({
    method: "master.master.page.test_page.test_page.my_list",
    args: {
      machine_number: "",
      machine_name: "",
      type: "",
      total_shot: "",
      plant: "",
    },
    callback: function (response) {
      if (response.message) {
        var lists = response.message;
        var machineNames = lists[0] || [];
        var machineNumbers = lists[1] || [];
        var types = lists[2] || [];
        var totalShots = lists[3] || [];
        var plants = lists[4] || [];

        // Assuming you have a table with id "data_table" in your HTML
        var table = document.getElementById("data_table");

        // Clear existing rows if any
        table.innerHTML = "";

        // Create table header row
        var headerRow = table.insertRow();
        var headerCell1 = headerRow.insertCell(0);
        var headerCell2 = headerRow.insertCell(1);
        var headerCell3 = headerRow.insertCell(2);
        var headerCell4 = headerRow.insertCell(3);
        var headerCell5 = headerRow.insertCell(4);
        headerCell1.innerHTML = "Machine Name";
        headerCell2.innerHTML = "Machine Number";
        headerCell3.innerHTML = "Type";
        headerCell4.innerHTML = "Total Shot";
        headerCell5.innerHTML = "Plant";

        // Populate table with data
        var maxLength = Math.max(
          machineNames.length,
          machineNumbers.length,
          types.length,
          totalShots.length,
          plants.length
        );
        for (var i = 0; i < maxLength; i++) {
          var newRow = table.insertRow();
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          cell1.innerHTML = machineNames[i] ? machineNames[i].machine_name : "";
          cell2.innerHTML = machineNumbers[i]
            ? machineNumbers[i].machine_number
            : "";
          cell3.innerHTML = types[i] ? types[i].type : "";
          cell4.innerHTML = totalShots[i] ? totalShots[i].total_shot : "";
          cell5.innerHTML = plants[i] ? plants[i].plant : "";
        }
      } else {
        console.error("Error: No data returned from the backend.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

viewList();

//sidebar

$(document).ready(function () {
  $(".clickable").on("click", function () {
    var doctype = $(this).data("doctype");
    var route = $(this).data("route");
    frappe.set_route(route, doctype);
    window.location.reload();
  });
});

function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var content = document.querySelector(".content");
  var remainingWidth = window.innerWidth - 50;
  if (sidebar.style.width === "50px") {
    sidebar.style.width = "250px";
    content.style.marginLeft = "10px";
  } else {
    sidebar.style.width = "50px";
    content.style.marginLeft = "-180px";
    content.style.width = remainingWidth + "-20%";
    content.style.position = "fixed";
  }
}
//entries
