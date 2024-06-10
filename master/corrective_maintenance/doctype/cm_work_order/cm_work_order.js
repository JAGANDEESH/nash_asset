frappe.ui.form.on("Cm Work Order", {
  refresh(frm) {
    function renderedListOfCmWorkOrder(frm) {
      console.log("Rendering List of CM Work Order...");
      let html_list = `
              <style>
          .navbar .nav-item {
              margin-right: -65px;
          }
          .navbar .navbar-nav .nav-link {
              padding: 0;
          }
          .form-container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          
          form {
              display: flex;
              width:100%;
              flex-direction: column;
          }
          #addspare,#addlist{
          width: 10vw;
          }
          label {
              font-weight: bold;
          }
          
          input[type="datetime-local"], textarea, select, input[type="text"], input[type="number"] {
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
              resize: vertical;
          }
          
          textarea {
              height: 80px;
          }
          button, [type=button], [type=reset], [type=submit] {
              width: 9vw;
          }
          button {
              background-color: #A0BFB9;
              color: white;
              padding: 10px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              outline: none;
          }
          
          button:hover {
              background-color: #BC8F8F;
          }
          
          table {
              width: 100%;
              border-collapse: collapse;
          }
          
          th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
          }
          
          th {
              background-color: #eee;
          }
          
          button[type="button"] {
              padding: 5px 5px;
          }
          </style>
          
                  <div class="form-container">
                      <form>
                          <h2>List Of Cm Work Order</h2>
      
                          <label for="rootCause">Root Cause:</label>
                          <textarea id="rootCause" name="root_cause" required></textarea>
      
                          <label for="actionTaken">Action Taken:</label>
                          <textarea id="actionTaken" name="action_taken" required></textarea>
      
                          <label for="status">Status:</label>
                          <select id="status" name="status">
                              <option value="inprogress">In Progress</option>
                              <option value="closed">Closed</option>
                          </select>
      
                          <label for="startDateTime">Starting Date and Time:</label>
                          <input type="datetime-local" id="startDateTime" name="startDateTime" required>
      
                          <label for="endDateTime">Closing Date and Time:</label>
                          <input type="datetime-local" id="endDateTime" name="endDateTime">
      
                          <h3>Spares Used</h3>
                          <table id="sparesTable">
                              <thead>
                                  <tr>
                                      <th>Spare</th>
                                      <th>Spare UOM</th>
                                      <th>Spare Qty</th>
                                      <th>Add</th>
                                      <th>Remove</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td><input type="text" name="spare[]" required></td>
                                  <td><input type="text" name="spareUOM[]" required></td>
                                  <td><input type="number" name="spareQty[]" required></td>
                                  <td><button type="button" id="addspare">Add Spare</button></td>
                                  <td><button type="button">Remove</button></td>
                                  </tr>
                              </tbody>
                          </table><br>
                          <button type="button" id="addlist">Add List</button><br><br>
                          <button type="button" id="removelist">Remove List</button><br><br>
                      </form>
                  </div>
              `;
      $(frm.fields_dict["list_section"].wrapper).html(html_list);

      var childTable = cur_frm.add_child("list_cm_work_order"); // OnRefresh Add List Default one value
      cur_frm.refresh_fields("list_cm_work_order");

      var childTable = cur_frm.add_child("cm_work_spare"); // OnRefresh Add Spare Default one value
      cur_frm.refresh_fields("cm_work_spare");

      // Delegate the click event for adding a spare row to the document
      $(document).on("click", "#addspare", function () {
        let table = $(this)
          .closest(".form-container")
          .find("#sparesTable tbody")[0];
        let newRow = table.rows[0].cloneNode(true);
        newRow.cells[0].getElementsByTagName("input")[0].value = "";
        newRow.cells[1].getElementsByTagName("input")[0].value = "";
        newRow.cells[2].getElementsByTagName("input")[0].value = "";
        table.appendChild(newRow);

        var child = frm.add_child("cm_work_spare");
        frappe.model.set_value(child.doctype, child.name, "fieldname", "value"); // Set default values if needed

        // Refresh the child table to show the new row
        frm.refresh_field("cm_work_spare");
      });

      // Delegate the click event for adding the entire form and table
      $(document).on("click", "#addlist", function () {
        let originalContainer = $(this).closest(".form-container");
        let newContainer = originalContainer.clone(true);

        var child = frm.add_child("list_cm_work_order");
        frappe.model.set_value(child.doctype, child.name, "fieldname", "value"); // Set default values if needed

        // Refresh the child table to show the new row
        frm.refresh_field("list_cm_work_order");
        frm.trigger("list_cm_work_order_add", "List of Cm work child");

        // Reset all input fields in the cloned form
        newContainer.find("input, select, textarea").each(function () {
          $(this).val("");
          if (
            $(this).attr("type") === "checkbox" ||
            $(this).attr("type") === "radio"
          ) {
            $(this).prop("checked", false);
          }
        });

        // Clear the spares table rows except the first one
        let newTableBody = newContainer.find("#sparesTable tbody");
        let firstRow = newTableBody[0].rows[0].cloneNode(true);
        firstRow.cells[0].getElementsByTagName("input")[0].value = "";
        firstRow.cells[1].getElementsByTagName("input")[0].value = "";
        firstRow.cells[2].getElementsByTagName("input")[0].value = "";
        newTableBody.html(""); // Clear existing rows
        newTableBody.append(firstRow); // Add cloned first row

        originalContainer.after(newContainer);
      });

      // Delegate the click event for removing a spare row
      $(document).on("click", 'button[type="button"]', function () {
        if ($(this).text() === "Remove") {
          let row = $(this).closest("tr");
          let tbody = row.closest("tbody");
          if (tbody.find("tr").length > 1) {
            let rowIndex = row.index(); // Get the index of the row in the tbody

            // Check if the child exists in the Frappe form's data structure
            if (
              frm.doc.cm_work_spare &&
              rowIndex < frm.doc.cm_work_spare.length
            ) {
              // Remove the child from the backend
              frm.get_field("cm_work_spare").grid.grid_rows[rowIndex].remove();
              frm.refresh_field("cm_work_spare");
            }

            // Remove the row visually
            row.remove();
          }
        }
      });

      // Delegate the click event for removing the entire form and spares table
      $(document).on("click", "#removelist", function () {
        $(this).closest(".form-container").remove();
        let row = $(this).closest("tr");
        let tbody = row.closest("tbody");
        if (tbody.find("tr").length > 1) {
          let rowIndex = row.index(); // Get the index of the row in the tbody

          // Check if the child exists in the Frappe form's data structure
          if (
            frm.doc.list_cm_work_order &&
            rowIndex < frm.doc.list_cm_work_order.length
          ) {
            // Remove the child from the backend
            frm
              .get_field("list_cm_work_order")
              .grid.grid_rows[rowIndex].remove();
            frm.refresh_field("list_cm_work_order");
          }

          // Remove the row visually
          row.remove();
        }
      });

      document.addEventListener("DOMContentLoaded", function () {
        const addButton = document.getElementById("addlist"); // Get the add button

        addButton.addEventListener("click", function () {
          const rowsContainer = document.querySelector("rows"); // Get the container to add rows to

          // Create the new rows structure to append
          const newRow = document.createElement("div");
          newRow.className = "rows"; // Set class name

          // Create first grid-row
          const firstGridRow = document.createElement("div");
          firstGridRow.className = "grid-row";
          firstGridRow.setAttribute(
            "data-name",
            "new-list-of-cm-work-child-mvqoodnlvn"
          );
          firstGridRow.setAttribute("data-idx", "1");

          // Create second grid-row
          const secondGridRow = document.createElement("div");
          secondGridRow.className = "grid-row";
          secondGridRow.setAttribute(
            "data-name",
            "new-list-of-cm-work-child-ekvscyxtqr"
          );
          secondGridRow.setAttribute("data-idx", "2");

          // Append grid rows to the newRow element
          newRow.appendChild(firstGridRow);
          newRow.appendChild(secondGridRow);

          // Append the new rows to the container
          rowsContainer.appendChild(newRow);
        });
      });
      frm.refresh_field("list_cm_work_order");
    }

    renderedListOfCmWorkOrder(frm);
  },
});
frappe.ui.form.on("List of Cm work child", {
  list_cm_work_order_add: function (frm, cdt, cdn) {
    console.log(frm.doc.list_cm_work_order);
    frm.trigger("renderedListOfCmWorkOrder");
  },
});
