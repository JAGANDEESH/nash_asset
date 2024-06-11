frappe.ui.form.on('Cm Work Order', {

    onload_post_render(frm) {
        async function setupInitial(frm) {
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
            .addspare,.addlist,.removelist{
                width: 10vw;
                margin: 10px;
            }
            button, [type=button], [type=reset], [type=submit] {
                width: 9vw;
            }
            button {
                background-color: #ac82c5c4;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                outline: none;
            }
            
            button:hover {
                background-color: #e6baffc4;
                color:black;
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
                        <h2>List Of Cm Work Order</h2>
                        <form class='main-div'>
                        </form>
                    </div>
                `;
            $(frm.fields_dict['list_section'].wrapper).html(html_list);

            // Delegate the click event for adding a spare row to the document

            // frm.refresh_field("list_cm_work_order");
            let response = await frappe.xcall("master.corrective_maintenance.doctype.cm_work_order.cm_work_order.get_spare_list")
            // Log the response to debug
            console.log("Response:", response);
            console.log("Type of response.message:", typeof response.message);
            console.log("Is response.message an array?", Array.isArray(response.message));

            // Ensure response.message is an array
            if (Array.isArray(response)) {
                // render_cm_workorder_tables(response.message);
                frm.sparelist = response;
            } else {
                console.error("Expected an array but got:", response);
                frm.sparelist = []
            }


        }
        

        setupInitial(frm).then(() => {
            cur_frm.trigger("setup_listener")
            cur_frm.trigger('add_cm_workorder')
        });
        // cur_frm.events.add_cm_sparechild(cur_frm, 1)

    },
    add_cm_workorder: function (frm) {
        // let newContainer = originalContainer.clone(true);
        var child = frm.add_child("list_cm_work_order");
        cur_frm.events.add_cm_sparechild(cur_frm, child.idx);
        frm.refresh_field("list_cm_work_order");
        frm.trigger('list_cm_work_order_add', "List of Cm work child");
    },
    add_cm_sparechild: function (frm, idx) {
        var child = frm.add_child("cm_work_spare");
        frappe.model.set_value("Cm Spare Child", child.name, 'cm_workorder_idx', idx)
        frm.refresh_field("cm_work_spare");
        frm.trigger('cm_work_spare_add', "Cm Spare Child")
    },

    render_cm_workorder_table: function (frm, spareList) {
        let originalContainer = $(frm.fields_dict.list_section.wrapper).find('.main-div');
        originalContainer.html("")
        let table_rows_cm_workorder = frm.doc.list_cm_work_order
        table_rows_cm_workorder.forEach((child) => {
            let spareHTML = "";
            let cm_sparelist = frm.doc.cm_work_spare.filter(c => c.cm_workorder_idx == child.idx);
            // console.log("cm_sparelist",cm_sparelist);
            //for
            let spareSelectHTML = "<select class='form-control' >";
            let spare_list = frm.sparelist || [];
            cm_sparelist.forEach((innerchild) => {
                let spare_template = `<tr class="main-child-row" data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}">
                <td class = "spare-select-cell"><select name="spare" class='spare form-control' ><option disabled value="" selected>Select a Spare</option>
                ${spare_list.map((spare) => `<option value='${spare}' ${innerchild.spare == spare ? "selected" : ""} >${spare}</option>`)}
                </select>
                </td>

                <td>
                    <select class="spare_uom" name="spare_uom" style="width: 200px; padding: 5px; font-size: 14px;>
                        <option  disabled value="" selected >Select UOM</option>
                        <option value="" ${innerchild.spare_uom === "" ? "selected" : ""}>Select the UOM</option>
                        <option value="Number" ${innerchild.spare_uom === "Number" ? "selected" : ""}>Number</option>
                        <option value="Box" ${innerchild.spare_uom === "Box" ? "selected" : ""}>Box</option>
                        <option value="Bottle" ${innerchild.spare_uom === "Bottle" ? "selected" : ""}>Bottle</option>
                        <option value="Bundle" ${innerchild.spare_uom === "Bundle" ? "selected" : ""}>Bundle</option>
                        <option value="Packet" ${innerchild.spare_uom === "Packet" ? "selected" : ""}>Packet</option>
                        <option value="Bar" ${innerchild.spare_uom === "Bar" ? "selected" : ""}>Bar</option>


                    </select> 
            <td><input type="number" class="spare_qty" name="spare_qty" value = ${innerchild.spare_qty || ""} ></td>

            <td><button data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}" type="button" class="addspare" >Add Spare</button></td>
            <td><button data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}" type="button" class="">Remove</button></td>
            </tr>`
                spareHTML += spare_template;
            });
            // append spare template to spareHTML
            //endfor
            var cm_workorder_template = `
            <div class="row main-row" data-cdt="${child.doctype}" data-cdn="${child.name}">
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <label for="root_Cause" style="font-weight: bold; margin-bottom: 5px;">Root Cause:</label><br>
                <textarea class="rootCause" name="root_cause" required style="width: 100%; height: 100px;">${child.root_cause || ""}</textarea>
            </div>
            <div class="col-12">
                <label for="action_Taken" style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Action Taken:</label><br>
                <textarea class="actionTaken" name="action_taken" required style="width: 100%; height: 100px;">${child.action_taken || ""}</textarea>
            </div>
            <div class="col-12">
                <label for="status" style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Status:</label>
                <select class="status" name="status" style="width: 100%; padding: 5px; margin-bottom: 10px;">
                    <option value="Inprogress" ${child.status == 'Inprogress' ? "selected" : ""}>Inprogress</option>
                    <option value="Closed" ${child.status == 'Closed' ? "selected" : ""}>Closed</option>
                </select>
            </div>
            <div class="col-6">
                <label for="starting_date_and_time" style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Starting Date and Time:</label>
                <input type="datetime-local" class="startDateTime" value="${child.starting_date_and_time || ''}" name="starting_date_and_time" required style="width: 100%; padding: 5px; margin-bottom: 10px;">
            </div>
            <div class="col-6">
                <label for="closing_date_and_time" style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Closing Date and Time:</label>
                <input type="datetime-local" class="endDateTime" value="${child.closing_date_and_time || ''}" name="closing_date_and_time" style="width: 100%; padding: 5px; margin-bottom: 10px;"><br><br>
            </div>
        </div>
    </div>
           <div class="col-12"> 
               <h3>Spares Used</h3>
               <table class="sparesTable">
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
                        ${spareHTML}
                   </tbody>
               </table>      
           </div><br><br>
           <button data-cdt="${child.doctype}" data-cdn="${child.name}" type="button" class="addlist">Add List</button>
           <button data-cdt="${child.doctype}" data-cdn="${child.name}" type="button" class="removelist">Remove List</button><br><br>
           </div>
           </div></div><br><br><br>`;
            originalContainer.append(cm_workorder_template);
        })

        // frappe.model.set_value(child.doctype, child.name, 'fieldname', 'value'); // Set default values if needed
        // Refresh the child table to show the new row
    },
    setup_listener: function (frm) {
        $(document).on('click', '.addspare', function () {
            let row = $(this).closest('.main-row');
            let cdn = row.data('cdn');
            let cdt = row.data('cdt');
            let cm_order = frm.doc.list_cm_work_order.find(o => o.name == cdn)
            cur_frm.events.add_cm_sparechild(frm, cm_order.idx)
        });

        // Delegate the click event for adding the entire form and table
        $(document).on('click', '.addlist', function () {
            cur_frm.trigger('add_cm_workorder')
        });

        // Delegate the click event for removing a spare row
        $(document).on('click', 'button[type="button"]', function () {
            if ($(this).text() === 'Remove') {
                let row = $(this).closest('tr');
                let tbody = row.closest('tbody');
                if (tbody.find('tr').length > 1) {
                    let rowIndex = row.index();  // Get the index of the row in the tbody

                    // Check if the child exists in the Frappe form's data structure
                    if (frm.doc.cm_work_spare && rowIndex < frm.doc.cm_work_spare.length) {
                        // Remove the child from the backend
                        frm.get_field('cm_work_spare').grid.grid_rows[rowIndex].remove();
                        frm.refresh_field('cm_work_spare');
                    }

                    // Remove the row visually
                    row.remove();
                }
            }
        });


        // Delegate the click event for removing the entire form and spares table
        $(document).on('click', '.removelist', function () {
            let remove_cdn = $(this).data('cdn')
            // $(this).closest('.form-container').remove();
            // console.log("Attempting to remove entries with empty 'root_cause'...");
            let remove_cdn_index = frm.doc.list_cm_work_order.findIndex(f => f.name == remove_cdn);

            frm.get_field('list_cm_work_order').grid.grid_rows[remove_cdn_index].remove();
            frm.refresh_field("list_cm_work_order");
            frm.trigger('render_cm_workorder_table');
        });



        document.addEventListener('DOMContentLoaded', function () {
            const addButton = document.getElementById('addlist'); // Get the add button

            addButton.addEventListener('click', function () {
                const rowsContainer = document.querySelector('rows'); // Get the container to add rows to

                // Create the new rows structure to append
                const newRow = document.createElement('div');
                newRow.className = 'rows'; // Set class name

                // Create first grid-row
                const firstGridRow = document.createElement('div');
                firstGridRow.className = 'grid-row';
                firstGridRow.setAttribute('data-name', 'new-list-of-cm-work-child-mvqoodnlvn');
                firstGridRow.setAttribute('data-idx', '1');

                // Create second grid-row
                const secondGridRow = document.createElement('div');
                secondGridRow.className = 'grid-row';
                secondGridRow.setAttribute('data-name', 'new-list-of-cm-work-child-ekvscyxtqr');
                secondGridRow.setAttribute('data-idx', '2');

                // Append grid rows to the newRow element
                newRow.appendChild(firstGridRow);
                newRow.appendChild(secondGridRow);

                // Append the new rows to the container
                rowsContainer.appendChild(newRow);
            });
        });
        $(document).on('change', '.rootCause ,.actionTaken,.startDateTime,.endDateTime,.status', function (e) {
            let fieldname = e.target.name
            let fieldvalue = e.target.value
            let row = $(this).closest('.main-row');
            let cdn = row.data('cdn');
            let cdt = row.data('cdt');
            frappe.model.set_value(cdt, cdn, fieldname, fieldvalue).then(() => {
                frm.refresh_field("list_cm_work_order");
                frm.trigger('render_cm_workorder_table');
            });
        }),

            $(document).on('change', '.spare,.spare_uom,.spare_qty', function (e) {
                let fieldname = e.target.name
                let fieldvalue = e.target.value
                let row = $(this).closest('.main-child-row');
                let cdn = row.data('cdn');
                let cdt = row.data('cdt');
                frappe.model.set_value(cdt, cdn, fieldname, fieldvalue).then(() => {
                    frm.refresh_field("cm_work_spare");
                    frm.trigger('render_cm_workorder_table');
                });
            });
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
frappe.ui.form.on("List of Cm work child", {
    list_cm_work_order_add: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    list_cm_work_order_remove: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    root_cause: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    action_taken: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    status: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    starting_date_and_time: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    closing_date_and_time: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
})

frappe.ui.form.on("Cm Spare Child", {
    cm_work_spare_add: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    cm_work_spare_add: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    spare: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    spare_uom: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    },
    spare_qty: function (frm, cdt, cdn) {
        frm.trigger('render_cm_workorder_table')
    }
})










