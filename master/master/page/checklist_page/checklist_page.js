frappe.pages["checklist_page"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "None",
    single_column: true,
  });
  $(frappe.render_template("checklist_page", {})).appendTo(page.body);

  // var checkform = document.querySelector("#checkform");
  // checkform.querySelector("#submit", function (event) {
  //   // Prevent the default form submission behavior
  //   event.preventDefault();

  //   // Gather form data
  //   var checklistNumber = document.querySelector("#checklist_number").value;
  //   var checklistDescription = document.querySelector(
  //     "#checklist_description"
  //   ).value;
  //   var machineType = document.querySelector("#machine_type").value;

  //   var checkItems = [];

  //   // Select all elements with class 'check-item' to collect multiple child entries
  //   var checkItemElements = document.querySelectorAll(".check-item");

  //   // Iterate over each 'check-item' element to gather its values
  //   checkItemElements.forEach(function (checkItemElement) {
  //     var checkPoint = checkItemElement.querySelector(".ct1").value;
  //     var checkFor = checkItemElement.querySelector(".ct2").value;
  //     var standardSpecValue = checkItemElement.querySelector(".ct3").value;
  //     var actionToBeTaken = checkItemElement.querySelector(".ct4").value;
  //     var desc = checkItemElement.querySelector(".ct5").value;
  //     var profile = checkItemElement.querySelector(".ct6").value;

  //     // Push values to the checkItems array
  //     checkItems.push({
  //       check_point: checkPoint,
  //       check_for: checkFor,
  //       standard_spec__value: standardSpecValue,
  //       action_to_be_taken: actionToBeTaken,
  //       desc: desc,
  //       profile: profile,
  //       parent: checklistNumber,
  //       parenttype: "Check List",
  //     });
  //   });

  //   var formData = {
  //     checklist_number: checklistNumber,
  //     checklist_description: checklistDescription,
  //     machine_type: machineType,
  //     check_items: checkItems,
  //   };

  //   console.log("formData", formData); // Log formData to check its structure

  //   // Make an AJAX call to the server to save the form data
  //   frappe.call({
  //     method:
  //       "master.master.page.checklist_page.checklist_page.save_check_list",
  //     args: {
  //       data: formData,
  //     },
  //     callback: function (response) {
  //       console.log("Response from server:", response); // Log response from server
  //       if (response && response.message) {
  //         alert("You successfully submitted");
  //         // Disable submit button to prevent multiple submissions
  //         checkform.querySelector('[type="submit"]').disabled = true; // Disabling submit button
  //       } else {
  //         alert("Failed to create the Checklist");
  //       }
  //     },
  //     error: function (err) {
  //       console.error("Error occurred:", err);
  //       alert("An error occurred while submitting the form");
  //     },
  //   });
  // });

  var checkform = document.querySelector("#checkform");

  checkform.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Gather form data
    var formData = {
      checklist_number: document.querySelector("#checklist_number").value,
      checklist_description: document.querySelector("#checklist_description")
        .value,
      machine_type: document.querySelector("#machine_type").value,
      check_items: [
        {
          check_point: document.querySelector("#ct1").value,
          check_for: document.querySelector("#ct2").value,
          standard_spec__value: document.querySelector("#ct3").value,
          action_to_be_taken: document.querySelector("#ct4").value,
          desc: document.querySelector("#ct5").value,
          profile: document.querySelector("#ct6").value,
          parent: document.querySelector("#checklist_number").value,
          parenttype: "Check List",
        },
      ],
    };

    console.log("formData", formData); // Log formData to check its structure

    // Make an AJAX call to the server to save the form data
    frappe.call({
      method:
        "master.master.page.checklist_page.checklist_page.save_check_list",
      args: {
        data: formData,
      },
      callback: function (response) {
        console.log("Response from server:", response); // Log response from server
        if (response && response.message) {
          alert("You successfully submitted");
          // Disable submit button to prevent multiple submissions
          submitButton.disabled = true; // Where is `submitButton` defined?
        } else {
          alert("Failed to create the Checklist");
        }
      },
      error: function (err) {
        console.error("Error occurred:", err);
        alert("An error occurred while submitting the form");
      },
    });
  });
};

//to upload file from local
$(document).ready(function () {
  $("#imageUpload").change(function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
});

//checkbox
// function toggleAll(source) {
//   checkboxes = document.getElementsByName("checkbox");
//   for (var i = 0, n = checkboxes.length; i < n; i++) {
//     checkboxes[i].checked = source.checked;
//   }
// }

// function cancelForm() {
//   // Implement cancel functionality here, like redirecting to another page or clearing form fields
//   alert("list Deleted ");
// }

// function SubmitForm() {
//   window.location.reload();
// }

// $(document).ready(function () {
//   $("#data_table").DataTable({
//     lengthMenu: [
//       [10, 25, 50, -1],
//       [10, 25, 50, "All"],
//     ], // Define page length options
//   });
// });

//checklist table
// function viewList() {
//   frappe.call({
//     method: "master.master.page.checklist_page.checklist_page.my_list",
//     callback: function (response) {
//       if (response.message) {
//         var lists = response.message;
//         var checklistNumbers = lists[0];
//         var checklistDescriptions = lists[1];
//         var mCTypes = lists[2];

//         // Assuming you have a table with id "data_table" in your HTML
//         var table = document.getElementById("data_table");

//         // Clear existing rows if any
//         table.innerHTML = "";

//         // Create table header row
//         var thead = table.createTHead(); // Create thead element
//         var headerRow = thead.insertRow(); // Insert a row in the thead
//         var headerCell1 = headerRow.insertCell(0);
//         var headerCell2 = headerRow.insertCell(1);
//         var headerCell3 = headerRow.insertCell(2);
//         headerCell1.innerHTML = "Checklist Number";
//         headerCell2.innerHTML = "Checklist Description";
//         headerCell3.innerHTML = "Machine Type Name";

//         // Create tbody element
//         var tbody = table.createTBody();

//         // Populate table with data
//         var maxLength = Math.max(
//           checklistNumbers.length,
//           checklistDescriptions.length,
//           mCTypes.length
//         );
//         for (var i = 0; i < maxLength; i++) {
//           var newRow = tbody.insertRow();
//           var cell1 = newRow.insertCell(0);
//           var cell2 = newRow.insertCell(1);
//           var cell3 = newRow.insertCell(2);

//           // Access values from the objects
//           cell1.innerHTML = checklistNumbers[i]
//             ? checklistNumbers[i].value || ""
//             : "";
//           cell2.innerHTML = checklistDescriptions[i]
//             ? checklistDescriptions[i].value || ""
//             : "";
//           cell3.innerHTML = mCTypes[i] ? mCTypes[i].value || "" : "";
//         }
//       } else {
//         console.error("Error: No data returned from the backend.");
//       }
//     },
//     error: function (xhr, status, error) {
//       console.error("Error:", error);
//     },
//   });
// }
// viewList();

//main
// function viewList() {
//   frappe.call({
//     method: "master.master.page.checklist_page.checklist_page.my_list",
//     callback: function (response) {
//       if (response.message) {
//         var checklists = response.message;

//         // Access properties of each object correctly
//         var table = document.getElementById("data_table");

//         // Clear existing rows if any
//         table.innerHTML = "";

//         // Populate table with data
//         for (var i = 0; i < checklists.length; i++) {
//           var newRow = table.insertRow();
//           var cell1 = newRow.insertCell(0);
//           var cell2 = newRow.insertCell(1);
//           var cell3 = newRow.insertCell(2);

//           cell1.innerHTML = checklists[i].checklist_number || "";
//           cell2.innerHTML = checklists[i].checklist_description || "";
//           cell3.innerHTML = checklists[i].machine_type || "";
//         }
//       } else {
//         console.error("Error: No data returned from the backend.");
//       }
//     },
//     error: function (xhr, status, error) {
//       console.error("Error:", error);
//     },
//   });
// }

// viewList();

// function colorChange() {
//   var color = document.getElementById("data_table");
//   var text = color.textContent.trim();
//   if (text === "Checklist Number" || text === "Checklist Description") {
//     color.style.backgroundColor = "rgb(249, 200, 109)";
//   } else {
//     color.style.backgroundColor = "rgb(249, 200, 109)";
//   }
// }
function viewList() {
  frappe.call({
    method: "master.master.page.checklist_page.checklist_page.my_list",
    callback: function (response) {
      if (response.message) {
        var checklists = response.message;

        // Access properties of each object correctly
        var table = document.getElementById("data_table");

        // Clear existing rows if any
        table.innerHTML = "";

        // Populate table with data
        for (var i = 0; i < checklists.length; i++) {
          var newRow = table.insertRow();
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5);
          var cell7 = newRow.insertCell(6);
          var cell8 = newRow.insertCell(7);
          var cell9 = newRow.insertCell(8);

          cell1.innerHTML = checklists[i].checklist_number || "";
          cell2.innerHTML = checklists[i].checklist_description || "";
          cell3.innerHTML = checklists[i].machine_type || "";

          // Child table data
          var childData = checklists[i].child_table || [];
          for (var j = 0; j < childData.length; j++) {
            cell4.innerHTML += childData[j].check_point + "<br>";
            cell5.innerHTML += childData[j].check_for + "<br>";
            cell6.innerHTML += childData[j].standard_spec__value + "<br>";
            cell7.innerHTML += childData[j].action_to_be_taken + "<br>";
            cell8.innerHTML += childData[j].desc + "<br>";
            cell9.innerHTML += childData[j].profile + "<br>";
          }
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

//adding row on checklist using add button
var rowCount = 1; // Initialize a counter for generating unique IDs

function addRow(button) {
  var row = button.parentNode.parentNode.cloneNode(true); // Clone the row
  var cancelButton = document.createElement("button"); // Create cancel button
  cancelButton.textContent = "Cancel";
  cancelButton.style =
    "border:none; border-radius:4px; color:white ; background-color:red";
  cancelButton.onclick = function () {
    // Add onclick event to cancel button
    this.parentNode.parentNode.remove(); // Remove the row on cancel button click
  };
  rowCount++; // Increment the counter for generating unique IDs
  row.querySelectorAll("input[type='text']").forEach(function (input) {
    // Update IDs of text inputs
    input.id = input.id.slice(0, -1) + rowCount; // Update the ID
  });
  row.querySelector("input[type='file']").id = "ct6" + rowCount; // Update ID of file input
  row.querySelector("img").id = "imagePreview" + rowCount; // Update ID of image
  row.querySelector("td:last-child").innerHTML = ""; // Clear the last cell content
  row.querySelector("td:last-child").appendChild(cancelButton); // Append cancel button
  button.textContent = "Add"; // Change the button text back to '+'
  button.onclick = function () {
    // Add onclick event to '+' button
    addRow(this);
  };
  button.parentNode.parentNode.parentNode.appendChild(row); // Append the cloned row
}

//js for entering data in html to get stored in db

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .querySelector(".data-enter")
//     .addEventListener("submit", function (e) {
//       e.preventDefault(); // Prevent the form from submitting normally

//       // Get form data
//       var formData = {
//         checklist_number: document.querySelector("#checklist_number").value,
//         checklist_description: document.querySelector("#checklist_description")
//           .value,
//         mc_types: document.querySelector("#mc_types").value,
//       };

//       // Log that the function is being called
//       console.log("Calling Python function...");

//       // Call Python function directly using Frappe's client-side API
//       frappe.call({
//         method: "master.master.page.checklist_page.checklist_page.my_method", // Name of your Python method
//         args: {
//           data: formData,
//         },
//         callback: function (response) {
//           // Handle response from the server
//           if (response.message.status === "Success") {
//             // Data inserted successfully
//             console.log("Data inserted successfully");
//           } else {
//             // Error occurred
//             console.error("Error:", response.message.message);
//           }
//         },
//       });
//     });
// });

// function enterDetails() {
//   $(document).ready(function () {
//     // Submit form data
//     $("#checkform").submit(function (event) {
//       event.preventDefault(); // Prevent default form submission

//       // Collect form data
//       var formData = {
//         checklist_number: $("#checklist_number").val(),
//         checklist_description: $("#checklist_description").val(),
//         machine_type: $("#machine_type").val(),
//         // Add other form fields here
//       };

//       // Send AJAX request to the server
//       frappe.call({
//         method:
//           "master.master.page.checklist_page.checklist_page.save_check_list",
//         args: {
//           data: formData,
//         },
//         callback: function (response) {
//           console.log(response);
//           if (response.message) {
//             // Success: Document created
//             alert("Department created successfully!");
//             // Optionally, redirect or perform other actions
//           } else {
//             // Error: Failed to create document
//             alert("Failed to create department.");
//           }
//         },
//         error: function (xhr, status, error) {
//           // Handle AJAX errors
//           console.error(xhr.responseText);
//           alert(
//             "Error occurred while processing the request. Please try again."
//           );
//         },
//       });
//     });
//   });
// }
// enterDetails();

//adding data from html to db
// enterDetails = () => {

// var checklist = document.getElementById("checkform");
// console.log("checklist", checklist);
// if (checklist) {

// };
// enterDetails()

// Function to fetch machine types from the server
function fetchMachineTypes() {
  frappe.call({
    method: "master.master.page.checklist_page.checklist_page.select_type",
    callback: function (response) {
      var machineTypes = response.message; // List of machine types from server
      var selectElement = document.getElementById("machine_type");

      // Clear existing options
      selectElement.innerHTML = "";

      // Add default option
      var defaultOption = document.createElement("option");
      defaultOption.text = "Select Machine Type";
      defaultOption.value = "";
      selectElement.appendChild(defaultOption);

      // Add machine types as options
      machineTypes.forEach(function (machineType) {
        var option = document.createElement("option");
        option.text = machineType.machine_type;
        option.value = machineType.machine_type; // You may need to adjust this depending on the value you want to use
        selectElement.appendChild(option);
      });
    },
  });
}

// Call the function to fetch machine types when the page loads
fetchMachineTypes();

//multiple child entries
// Function to get values from all child fields
function getChildFieldValues() {
  var childFieldValues = []; // Array to store values from child fields

  // Select all rows with class 'child-row'
  var childRows = document.querySelectorAll(".child-row");

  // Loop through each child row
  childRows.forEach(function (row) {
    var childData = {}; // Object to store data from current child row

    // Select child fields within the current row
    var checklistNumber = row.querySelector(".checklist-number").value;
    var checklistDescription = row.querySelector(
      ".checklist-description"
    ).value;
    var machineType = row.querySelector(".machine-type").value;
    var checkPoint = row.querySelector(".check-point").value;
    var checkFor = row.querySelector(".check-for").value;
    var standardSpecValue = row.querySelector(".standard-spec-value").value;
    var actionToBeTaken = row.querySelector(".action-to-be-taken").value;
    var desc = row.querySelector(".desc").value;
    var profile = row.querySelector(".profile").value;

    // Assign values to the object properties
    childData.checklist_number = checklistNumber;
    childData.checklist_description = checklistDescription;
    childData.machine_type = machineType;
    childData.check_point = checkPoint;
    childData.check_for = checkFor;
    childData.standard_spec_value = standardSpecValue;
    childData.action_to_be_taken = actionToBeTaken;
    childData.desc = desc;
    childData.profile = profile;

    // Push the object containing values from the current row to the array
    childFieldValues.push(childData);
  });

  return childFieldValues; // Return the array of values from all child fields
}

// Example usage
var valuesFromChildFields = getChildFieldValues();
console.log(valuesFromChildFields); // Log the values obtained from all child fields
