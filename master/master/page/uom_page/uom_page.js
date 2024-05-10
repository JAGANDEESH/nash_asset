frappe.pages["uom_page"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "",
    single_column: true,
  });
  $(frappe.render_template("uom_page", {})).appendTo(page.body);

  //entering data to get stored in db
  var addBtns = document.querySelector("#submit");
  addBtns.addEventListener("click", function (event) {
    event.preventDefault();

    var uomCode = document.querySelector("#uomCode").value;
    var uomName = document.querySelector("#uomName").value;
    var status = document.querySelector("#status").value;

    // Client-side validation
    if (!uomCode || !uomName || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    var formData = {
      uom_code: uomCode,
      uom_name: uomName,
      uom_status: status,
    };

    frappe.call({
      method: "master.master.page.uom_page.uom_page.save_uom_list",
      args: { data: formData },
      callback: function (response) {
        console.log("response", response);
        if (
          response &&
          response.message &&
          response.message === "UOM successfully submitted"
        ) {
          alert("UOM successfully submitted");
          // Clear form fields if submission is successful
          document.querySelector("#uomCode").value = "";
          document.querySelector("#uomName").value = "";
          document.querySelector("#status").value = "";
        } else {
          alert("Failed to submit UOM. Please try again later.");
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
    method: "master.master.page.uom_page.uom_page.my_list",
    callback: function (response) {
      if (response.message) {
        var lists = response.message;

        // id "data_table" in your HTML
        var table = document.getElementById("data_table");

        // Clear existing rows if any
        table.innerHTML = "";

        // Create table header row

        // Populate table with data
        lists.forEach(function (uom) {
          var newRow = table.insertRow();
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          cell1.innerHTML = uom.uom_code || "";
          cell2.innerHTML = uom.uom_name || "";
          cell3.innerHTML = uom.uom_status || "";
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
