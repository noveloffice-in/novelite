import frappe
import click

from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def before_install():
	pass

def after_install():
	add_default_lead_statuses()
	add_custom_fields_in_user()
	frappe.db.commit()
	
def add_default_lead_statuses():
	statuses = {
		"Novel Office Brigade - Whitefield",
		"Novel Office Brigade",
		"Novel Business Park - Adugodi",
		"Novel Office WorkHub - Whitefield",
		"Novel Office Queens - Queens Road",
		"Novel Office Central - MG Road",
		"Novel Office Marathahalli",
		"Novel Tech Park - Kudlu Gate"
	}

	for status in statuses:
		if frappe.db.exists("Property Location", status):
			continue

		doc = frappe.new_doc("Property Location")
		doc.location_name = status
		doc.insert()

def add_custom_fields_in_user():
	if not frappe.get_meta("User").has_field("app_user_type"):
		click.secho("* Installing Custom Fields in User")

		create_custom_fields(
			{
				"User":[
					{
						"fieldname":"app_user_type",
						"fieldtype":"Select",
						"options":"Select an Option \nNovel Employee \nProperty Customer",
						"label": "App User Type",
						"reqd": 1,
						"insert_after": "",
					},
					{
						"fieldname":"customer",
						"fieldtype":"Link",
						"options":"Customer",
						"label": "Customer",
						"insert_after": "app_user_type",
					},
				]
			}
		)

		frappe.clear_cache(doctype="User")