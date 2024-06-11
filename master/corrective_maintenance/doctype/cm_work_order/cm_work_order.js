frappe.ui.form.on('Cm Work Order', {
    onload_post_render: function(frm) {
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
                        width: 100%;
                        flex-direction: column;
                    }
                    .addspare, .addlist, .removelist {
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
                        color: black;
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
                    <form class='main-div'></form>
                </div>
            `;
            $(frm.fields_dict['list_section'].wrapper).html(html_list);

            let response;
            try {
                response = await frappe.xcall("master.corrective_maintenance.doctype.cm_work_order.cm_work_order.get_spare_list");
                console.log("Response:", response);
            } catch (error) {
                console.error("Error fetching spare list:", error);
                response = { message: [] };
            }

            if (Array.isArray(response.message)) {
                frm.sparelist = response.message;
            } else {
                console.error("Expected an array but got:", response);
                frm.sparelist = [];
            }
        }

        setupInitial(frm).then(() => {
            frm.trigger("setup_listener");
            frm.trigger('add_cm_workorder');
        });
    },
    add_cm_workorder: function(frm) {
        let child = frm.add_child("list_cm_work_order");
        frm.events.add_cm_sparechild(frm, child.idx);
        frm.refresh_field("list_cm_work_order");
        frm.trigger('list_cm_work_order_add');
    },
    add_cm_sparechild: function(frm, idx) {
        let child = frm.add_child("cm_work_spare");
        frappe.model.set_value(child.doctype, child.name, 'cm_workorder_idx', idx);
        frm.refresh_field("cm_work_spare");
        frm.trigger('cm_work_spare_add');
    },
    render_cm_workorder_table: function(frm) {
        let originalContainer = $(frm.fields_dict.list_section.wrapper).find('.main-div');
        originalContainer.html("");
        let table_rows_cm_workorder = frm.doc.list_cm_work_order || [];
        table_rows_cm_workorder.forEach(child => {
            let spareHTML = "";
            let cm_sparelist = frm.doc.cm_work_spare.filter(c => c.cm_workorder_idx == child.idx);
            let spare_list = frm.sparelist || [];
            cm_sparelist.forEach(innerchild => {
                let spare_template = `
                    <tr class="main-child-row" data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}">
                        <td class="spare-select-cell">
                            <select name="spare" class='spare form-control'>
                                <option disabled value="" selected>Select a Spare</option>
                                ${spare_list.map(spare => `<option value='${spare}' ${innerchild.spare == spare ? "selected" : ""}>${spare}</option>`).join('')}
                            </select>
                        </td>
                        <td>
                            <select class="spare_uom" name="spare_uom" style="width: 200px; padding: 5px; font-size: 14px;">
                                <option disabled value="" selected>Select UOM</option>
                                <option value="Number" ${innerchild.spare_uom === "Number" ? "selected" : ""}>Number</option>
                                <option value="Box" ${innerchild.spare_uom === "Box" ? "selected" : ""}>Box</option>
                                <option value="Bottle" ${innerchild.spare_uom === "Bottle" ? "selected" : ""}>Bottle</option>
                                <option value="Bundle" ${innerchild.spare_uom === "Bundle" ? "selected" : ""}>Bundle</option>
                                <option value="Packet" ${innerchild.spare_uom === "Packet" ? "selected" : ""}>Packet</option>
                                <option value="Bar" ${innerchild.spare_uom === "Bar" ? "selected" : ""}>Bar</option>
                            </select>
                        </td>
                        <td><input type="number" class="spare_qty" name="spare_qty" value="${innerchild.spare_qty || ""}"></td>
                        <td><button data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}" type="button" class="addspare">Add Spare</button></td>
                        <td><button data-cdt="${innerchild.doctype}" data-cdn="${innerchild.name}" type="button" class="removespare">Remove</button></td>
                    </tr>`;
                spareHTML += spare_template;
            });

            let cm_workorder_template = `
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
                        <label for="cm_work_spare" style="font-weight: bold; margin-bottom: 10px;">Spares Used:</label>
                        <table class="table cm_work_spare" style="margin-top: 10px; margin-bottom: 20px;">
                            <thead>
                                <tr>
                                    <th>Spare</th>
                                    <th>Spare UOM</th>
                                    <th>Spare Qty</th>
                                    <th>Add</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody class="spare-container">
                                ${spareHTML}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12">
                        <button type="button" class="addlist">Add List</button>
                        <button type="button" class="removelist">Remove</button>
                    </div>
                </div>
                <hr>
            `;
            originalContainer.append(cm_workorder_template);
        });

        frm.trigger('setup_event_listeners');
    },
    setup_listener: function(frm) {
        frm.fields_dict['list_section'].wrapper.on('click', '.addlist', function(e) {
            e.preventDefault();
            frm.trigger("add_cm_workorder");
            frm.trigger("render_cm_workorder_table");
        });

        frm.fields_dict['list_section'].wrapper.on('click', '.removelist', function(e) {
            e.preventDefault();
            let mainRow = $(this).closest(".main-row");
            let cdt = mainRow.attr("data-cdt");
            let cdn = mainRow.attr("data-cdn");

            let cm_workorder = locals[cdt][cdn];
            let cm_spare = frm.doc.cm_work_spare.filter(c => c.cm_workorder_idx == cm_workorder.idx);
            cm_spare.forEach(child => {
                frm.get_field('cm_work_spare').grid.grid_rows_by_docname[child.name].remove();
            });

            frm.get_field('list_cm_work_order').grid.grid_rows_by_docname[cdn].remove();
            frm.trigger("render_cm_workorder_table");
        });

        frm.fields_dict['list_section'].wrapper.on('click', '.addspare', function(e) {
            e.preventDefault();
            let mainchildrow = $(this).closest(".main-child-row");
            let cm_workorder_row = mainchildrow.closest(".main-row");
            let cm_workorder_idx = cm_workorder_row.attr("data-cdn");
            let child = frm.add_child("cm_work_spare");
            let current_cm_workorder = frm.doc.list_cm_work_order.find(d => d.name === cm_workorder_idx);

            if (current_cm_workorder) {
                frappe.model.set_value(child.doctype, child.name, 'cm_workorder_idx', current_cm_workorder.idx);
            }

            frm.trigger("render_cm_workorder_table");
        });

        frm.fields_dict['list_section'].wrapper.on('click', '.removespare', function(e) {
            e.preventDefault();
            let mainchildrow = $(this).closest(".main-child-row");
            let cdt = mainchildrow.attr("data-cdt");
            let cdn = mainchildrow.attr("data-cdn");
            frm.get_field('cm_work_spare').grid.grid_rows_by_docname[cdn].remove();
            frm.trigger("render_cm_workorder_table");
        });
    },
    list_cm_work_order_add: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn];
        if (!child.root_cause) child.root_cause = "";
        if (!child.action_taken) child.action_taken = "";
        if (!child.status) child.status = "Inprogress";
        if (!child.starting_date_and_time) child.starting_date_and_time = "";
        if (!child.closing_date_and_time) child.closing_date_and_time = "";
    },
    cm_work_spare_add: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn];
        if (!child.spare) child.spare = "";
        if (!child.spare_uom) child.spare_uom = "";
        if (!child.spare_qty) child.spare_qty = 0;
    },
    setup_event_listeners: function(frm) {
        frm.fields_dict['list_section'].wrapper.on('change', 'textarea.rootCause', function(e) {
            let row = $(this).closest('.main-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'root_cause', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'textarea.actionTaken', function(e) {
            let row = $(this).closest('.main-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'action_taken', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'select.status', function(e) {
            let row = $(this).closest('.main-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'status', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'input.startDateTime', function(e) {
            let row = $(this).closest('.main-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'starting_date_and_time', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'input.endDateTime', function(e) {
            let row = $(this).closest('.main-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'closing_date_and_time', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'select.spare', function(e) {
            let row = $(this).closest('.main-child-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'spare', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'select.spare_uom', function(e) {
            let row = $(this).closest('.main-child-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'spare_uom', $(this).val());
        });

        frm.fields_dict['list_section'].wrapper.on('change', 'input.spare_qty', function(e) {
            let row = $(this).closest('.main-child-row');
            let cdt = row.attr('data-cdt');
            let cdn = row.attr('data-cdn');
            frappe.model.set_value(cdt, cdn, 'spare_qty', $(this).val());
        });
    }
});
