frappe.pages["escalation_matrix"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "",
    single_column: true,
  });
  $(frappe.render_template("escalation_matrix", {})).appendTo(page.body);

  //entering data to get stored in db
  var addBtns = document.querySelector("#submit");
  addBtns.addEventListener("click", function (event) {
    event.preventDefault();

    var stage = document.querySelector("#stage").value;
    var durationOne = document.querySelector("#durationOne").value;
    var enterDurationOne = document.querySelector("#enterDurationOne").value;
    var roleOne = document.querySelector("#roleOne").value;
    var durationTwo = document.querySelector("#durationTwo").value;
    var enterDurationTwo = document.querySelector("#enterDurationTwo").value;
    var roleTwo = document.querySelector("#roleTwo").value;
    var status = document.querySelector("#status").value;

    // Client-side validation
    if (
      !stage ||
      !durationOne ||
      !enterDurationOne ||
      !roleOne ||
      !durationTwo ||
      !enterDurationTwo ||
      !roleTwo ||
      !status
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    var formData = {
      stage: stage,
      duration_one: durationOne,
      int_eijl: enterDurationOne,
      role_one: roleOne,
      duration_two: durationTwo,
      int_tjwl: enterDurationTwo,
      role_two: roleTwo,
      status: status,
    };
    console.log("FormData", formData);

    frappe.call({
      method:
        "master.master.page.escalation_matrix.escalation_matrix.save_matrix_list",
      args: { data: formData },
      callback: function (response) {
        console.log("response", response);
        if (
          response &&
          response.message &&
          response.message === "Matrix successfully submitted"
        ) {
          alert("Matrix successfully submitted");
          // Reload the page
          location.reload();
        } else {
          alert("Failed to submit Matrix. Please try again later.");
        }
      },
      error: function (err) {
        console.log("Error:", err);
        alert("An error occurred. Please try again later.");
      },
    });
  });
};

//showing table from db
function viewList() {
  frappe.call({
    method: "master.master.page.escalation_matrix.escalation_matrix.my_list",
    callback: function (response) {
      if (response.message) {
        var lists = response.message;

        // id "data_table" in your HTML
        var table = document.getElementById("data_table");

        // Clear existing rows if any
        table.innerHTML = "";

        // Create table header row

        // Populate table with data
        lists.forEach(function (matrix) {
          var newRow = table.insertRow();
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5);
          var cell7 = newRow.insertCell(6);
          var cell8 = newRow.insertCell(7);
          cell1.innerHTML = matrix.stage || "";
          cell2.innerHTML = matrix.duration_one || "";
          cell3.innerHTML = matrix.int_eijl || "";
          cell4.innerHTML = matrix.role_one || "";
          cell5.innerHTML = matrix.duration_two || "";
          cell6.innerHTML = matrix.int_tjwl || "";
          cell7.innerHTML = matrix.role_two || "";
          cell8.innerHTML = matrix.status || "";
        });
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
