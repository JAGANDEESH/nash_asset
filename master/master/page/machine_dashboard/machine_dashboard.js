frappe.pages['machine-dashboard'].on_page_load = function(wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Machine Dashboard',
        single_column: true
    });

    $(frappe.render_template("machine_dashboard",{})).appendTo(page.body);
        

// Company Page Navigation
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
};

// To get Doctype Company Information

// function start1(){
// frappe.call({
//         method: 'master.master.page.machine_dashboard.machine_dashboard.get_doctype', // Adjust this to your method's path (python file)
//         args: {
//             Company:"Company"
//         },

//         callback: function(r) {
//             var docs = r.message;
//             if (r.message) {
//                 var container = $('#doc_field'); // The #doc_field is the id name of the div in HTML file --- in here conly the values are append
//                 container.empty(); // Clear previous results

//                 // Dynamically create and append each company's info
//                 $.each(r.message, function(index, company) {
//                     container.append(
//                         $('<table>').addClass('company-info').append(
//                             $('<th>').text('Company-Name - ' + company.company_name),
//                             $('<td>').text('Company-Code - ' + company.company_code),
//                             $('<td>').text('Company-Email - ' + company.company_email),
//                             $('<td>').text('Company-Address - ' + company.company_address)
//                         )
//                     );
//                 });
//             }
//         }
//     });
// }
// start1();

// // Plant Information

// function start2(){

//     frappe.call({
//         method:'master.master.page.machine_dashboard.machine_dashboard.get_plantdoctype',
//         args:{
//             Plant:"Plant"
//         },

//         callback : function(r){
//             var docs2 = r.message;
//             if(r.message){
//                 var cont = $('#plant_field');
//                 cont.empty();

//                 $.each(r.message,function(index,Plant){
//                     cont.append(
//                         $('<table>').addClass('plant-info').append(
//                             $('<th>').text('Plant-code - ' + Plant.name1),
//                             $('<td>').text('Plant-Name - ' + Plant.code),
//                             $('<td>').text('State-Name - ' + Plant.state),
//                         )
//                     );
//                 });
//             }
//         }

//     })

// }

// start2();

// count for the boxes get from Company ---- Company Information

function start(){
frappe.call({
        method: 'master.master.page.machine_dashboard.machine_dashboard.get_count', // Adjust this to your method's path
        args: {
            "Company": "Company",
            "Plant":"Plant",
            "Location":"Location",
            "Department":"Department",
            "Spareslist":"Spares List",
            "Machinelist":"Machine List"

        },

        callback: function(r) {
            var counts = r.message;
            if(r.message) {
                document.getElementById("count1").innerHTML=counts[0];
                document.getElementById("count2").innerHTML=counts[1];
                document.getElementById("count3").innerHTML=counts[2];
                document.getElementById("count4").innerHTML=counts[3];
                document.getElementById("count5").innerHTML=counts[4];
                document.getElementById("count6").innerHTML=counts[5];
            }
        }
    });
}
start();

//Line chart

frappe.call({
    method:"master.master.page.machine_dashboard.machine_dashboard.get_count",
    args:{
            Company: "Company",
            Plant:"Plant",
            Location:"Location",
            Department:"Department",
            Spareslist:"Spares List",
            Machinelist:"Machine List"
    },
    callback: function(r){
            frappe.require("https://cdn.jsdelivr.net/npm/chart.js", function () {

                var ctx = document.getElementById("myChart").getContext("2d");
                var countline = r.message;
                var myChart = new Chart(ctx, {
        type: "line",
        title: "Wetter",
        data: {
          labels: ["Company", "Plant", "Location", "Department", "Spares List","Machine List"],
          datasets: [
            {
              label: "Count",
              data: [countline[0],countline[1], countline[2], countline[3],countline[4],countline[5]],
              backgroundColor: ["rgb(255, 99, 71)"],
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
            y: [
              {
                id: "left-y-axis",
                position: "left",
                ticks: {
                  stepSize: 1,
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
    }
})


// Pie-Chart

frappe.call({
    method:"master.master.page.machine_dashboard.machine_dashboard.get_count",
    args:{
            Company: "Company",
            Plant:"Plant",
            Location:"Location",
            Department:"Department",
            Spareslist:"Spares List",
            Machinelist:"Machine List"
    },
    callback: function(r){
        frappe.require("https://cdn.jsdelivr.net/npm/chart.js", function () {
  // Modernized and aesthetically enhanced code to initialize a chart
  var ctx = document.getElementById("myChart2").getContext("2d");
  var countpie = r.message;
  var myChart2 = new Chart(ctx, {
    type: "doughnut", // Switched to a doughnut chart for variety
    data: {
      labels: ["Company", "Plant", "Location", "Department", "Spares List","Machine list"], // Categories
      datasets: [{
        label: "# Count",
        data: [countpie[0], countpie[1], countpie[2], countpie[3],countpie[4],countpie[5]],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(153, 102, 255, 0.6)", // Purple
          "rgba(255, 159, 64, 0.6)"  // Orange
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Vote Distribution",
        fontColor: "#333",
        fontSize: 18,
      },
      legend: {
        labels: {
          fontColor: '#333',
          fontSize: 14,
        }
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFontColor: '#ffffff',
        bodyFontColor: '#ffffff',
        borderColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      cutoutPercentage: 50, // Adjust the doughnut's inner radius
    },
  });
});
    }
})


// Bar chart

frappe.call({
    method:"master.master.page.machine_dashboard.machine_dashboard.get_count",
    args:{
            Company: "Company",
            Plant:"Plant",
            Location:"Location",
            Department:"Department",
            Spareslist:"Spares List",
            Machinelist:"Machine List"

    },
    callback:function(r){
        frappe.require('https://cdn.jsdelivr.net/npm/chart.js', function() {
        var ctx = document.getElementById('chart').getContext('2d');
        var countbar = r.message;
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Company", "Plant", "Location", "Department", "Spares List","Macine List"],
                datasets: [{
                    label: '# count',
                    data: [countbar[0], countbar[1], countbar[2], countbar[3],countbar[4],countbar[5]],
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
                    y: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
    }
})


 


// To Set Route Master Dashboard

$(document).ready(function() {
  $('.nav-link1').click(function(e) {
    e.preventDefault(); // Prevent default anchor behavior

    var doctype = $(this).data('doctype');
    if (doctype) {
      // This will navigate to the List view of the specified doctype
      frappe.set_route('List', doctype);
    }
  });
});

// Company List Table

function start2() {
    // body...
    frappe.call({
        method:'master.master.page.machine_dashboard.machine_dashboard.get_company',
        args:{},

       callback:function(response){
         var v=response.message;
         document.getElementById("companyList").innerHTML = v;
        // console.log(v)
       }

    });
}
start2();


//Plant List Table

function start3() {
     // body...
    frappe.call({
        method:'master.master.page.machine_dashboard.machine_dashboard.get_plant',
        args:{},

       callback:function(response){
         var v=response.message;
         document.getElementById("plantList").innerHTML = v;
        // console.log(v)
       }

    });
 } 
start3();
  
// frappe.ready(function() {
//     // Listen for clicks on the button
//     $('#gotoCompanyInfo').on('click', function() {
//         // Redirect to the "Company-Info" page
//         frappe.set_route("company-info");
//     });
// });

