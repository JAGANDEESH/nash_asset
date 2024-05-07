// frappe.ui.form.on('Cm Work Order', {
//     refresh(frm) {
//         // Add a custom button
//         frm.add_custom_button('Spare Add', function() {
//             // Logic to show the three fields
//             frm.set_df_property('spare', 'hidden', 0); // Replace 'field_name_1' with your actual field name
//             frm.set_df_property('spare_uom', 'hidden', 0); // Replace 'field_name_2' with your actual field name
//             frm.set_df_property('spare_qty', 'hidden', 0); // Replace 'field_name_3' with your actual field name
//             // Optionally, refresh the fields to ensure they are updated on the form
//             frm.refresh_field('spare');
//             frm.refresh_field('sapre_uom');
//             frm.refresh_field('spare_qty');
//         });
//     }
// });
// frappe.ui.form.on("Cm Work Order", {
//   onload: function () {
//     document.addEventListener("DOMContentLoaded", () => {
//       const addParentButton = document.querySelector(".add-parent");
//       const deleteParentButton = document.querySelector(".delete-parent");

//       // Function to handle click on Add Parent button
//       addParentButton.addEventListener("click", () => {
//         const formContainer = document.querySelector("#form-container");
//         const clonedFormContainer = formContainer.cloneNode(true);
//         document.body.appendChild(clonedFormContainer);

//         // Add event listeners to the cloned form container
//         setupFormContainer(clonedFormContainer);
//       });

//       // Function to handle click on Delete Parent button
//       deleteParentButton.addEventListener("click", () => {
//         const formContainers = document.querySelectorAll("#form-container");
//         if (formContainers.length > 1) {
//           const lastFormContainer = formContainers[formContainers.length - 1];
//           lastFormContainer.remove();
//         } else {
//           alert("Cannot delete the only parent");
//         }
//       });

//       // Function to set up event listeners for a form container
//       function setupFormContainer(container) {
//         const addChildButton = container.querySelector(".add-child");
//         const childContainer = container.querySelector(".child-container");

//         // Function to handle click on delete button within a child row
//         const handleDeleteButtonClick = (event) => {
//           const button = event.target;
//           if (button.classList.contains("delete-child")) {
//             const parentChild = button.closest(".child");
//             const children = childContainer.querySelectorAll(".child");

//             if (children.length > 1) {
//               parentChild.remove();
//             } else {
//               alert("Cannot delete the only row");
//             }
//           }
//         };

//         // Add event listener for adding child rows within this container
//         addChildButton.addEventListener("click", () => {
//           const lastChild = childContainer.lastElementChild.cloneNode(true);
//           lastChild.querySelectorAll("input").forEach((input) => {
//             input.value = "";
//           });
//           childContainer.appendChild(lastChild);
//         });

//         // Event delegation for delete buttons inside child container
//         childContainer.addEventListener("click", handleDeleteButtonClick);
//       }

//       // Set up event listeners for the initial form container
//       setupFormContainer(document.querySelector("#form-container"));
//     });
//   },
// });

frappe.ui.form.on("Cm Work Order", {
  refresh(frm) {
    // Event handler to add a new row to the spare parts table
    $(document).on("click", "#addRow", function () {
      let table = $(this)
        .closest(".form-container")
        .find("#sparesTable tbody")[0];
      let newRow = table.rows[0].cloneNode(true);
      newRow.cells[0].getElementsByTagName("input")[0].value = "";
      newRow.cells[1].getElementsByTagName("input")[0].value = "";
      newRow.cells[2].getElementsByTagName("input")[0].value = "";
      table.appendChild(newRow);
    });

    // Event handler to add a new parent form
    $(document).on("click", "#addParent", function () {
      alert("Parent Added");
      let originalContainer = $(".form-container:last");
      let newContainer = originalContainer.clone(true);

      // Reset input fields in the cloned form
      newContainer.find('input[type="text"]').val("");

      // Clear table rows except the first one
      newContainer.find("#sparesTable tbody tr:not(:first)").remove();

      // Insert the new parent form after the last form container
      originalContainer.after(newContainer);
    });

    // Event handler to remove a spare row
    $(document).on("click", ".delete-child", function () {
      let tbody = $(this).closest("tbody");
      if (tbody.find("tr").length > 1) {
        $(this).closest("tr").remove();
      }
    });

    // Event handler to delete a parent form
    $(document).on("click", ".delete-parent", function () {
      let parentContainer = $(this).closest(".form-container");
      if ($(".form-container").length > 1) {
        parentContainer.remove();
        alert("Parent deleted");
      } else {
        frappe.msgprint(__("Cannot delete the only parent form."));
      }
    });

    // Prevent default form submission
    $(document).on("submit", "form", function (e) {
      e.preventDefault();
      frappe.msgprint(__("Form submitted successfully!"));
    });
  },
});

//getting data to get stored to db
document.addEventListener("DOMContentLoaded", function () {
  console.log("Hello world testing"); // Ensure this line is logging

  var cmworkorderForm = document.querySelector("#my-form");

  cmworkorderForm.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-primary")) {
      e.preventDefault(); // Use e.preventDefault() instead of event.preventDefault()

      var formData = {
        root_cause: document.querySelector("#root-cause").value,
        action_taken: document.querySelector("#action-taken").value,
        status: document.querySelector("#status").value,
        start_date_time: document.querySelector("#start-datetime").value,
        end_date_time: document.querySelector("#end-datetime").value,
        spare: document.querySelector("#ct1").value,
        spare_uom: document.querySelector("#ct2").value,
        spare_qty: document.querySelector("#ct3").value,
      };

      console.log("formData", formData);

      // Assuming frappe.call() is properly defined elsewhere
      frappe.call({
        method:
          "corrective_maintenance.doctype.cm_work_order.cm_work_order.my_list",
        args: {
          data: formData,
        },
        callback: function (response) {
          console.log("Response from server:", response);
          if (response && response.message) {
            alert("Form submitted successfully!");
            cmworkorderForm.reset();
          } else {
            alert("Failed to submit form.");
          }
        },
        error: function (err) {
          console.error("Error occurred:", err);
          alert("An error occurred while submitting the form");
        },
      });
    }
  });
});
