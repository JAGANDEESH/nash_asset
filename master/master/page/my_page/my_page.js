frappe.pages['my-page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'My Page',
		single_column: true
	});
	page.set_title('Vishnu\'s Page');
	page.set_title_sub('Frappe Developer');

	page.set_indicator('Pending', 'orange')
	page.clear_indicator()

	page.set_primary_action('New', () => create_new(), 'octicon octicon-plus')
	// page.clear_primary_action()
	let $btn = page.set_secondary_action('Refresh', () => refresh(), 'octicon octicon-sync')
	page.clear_primary_action()
	page.clear_secondary_action()

	// page.add_menu_item('Send Email',()=> open_email_dialog(), true)
	// page.clear_menu()

	// page.add_action_item('Delete',()=> delete_items())
	// page.clear_action_menu()

	// add a normal inner button
	page.add_inner_button('Update Posts', () => update_posts())

	// add a dropdown button in a group
	page.add_inner_button('New Post', () => new_post(), 'Make')

	page.change_inner_button_type('Update Posts', null, 'primary');

	page.change_inner_button_type('Delete Posts', 'Actions', 'danger')


		// remove inner button
	page.remove_inner_button('Update Posts')

	// remove dropdown button in a group
	page.remove_inner_button('New Post', 'Make')

	let field = page.add_field({
		label: 'Status',
		fieldtype: 'Select',
		fieldname: 'status',
		options: [
			'Open',
			'Closed',
			'Cancelled'
		],
		change() {
			console.log(field.get_value());
		}

		
	});
	let values = page.get_form_values()
	console.log(values)
// { status: 'Open', priority: 'Low' }

	


}