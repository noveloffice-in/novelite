from __future__ import unicode_literals
import click
import frappe

def before_uninstall():
	delete_custom_fields()

def delete_custom_fields():
	if frappe.get_meta("User").has_field("app_user_type"):
		click.secho("* Uninstalling Custom Fields from User")

		fieldnames = (
			"app_user_type",
			"customer",
		)

		for fieldname in fieldnames:
			frappe.db.delete("Custom Field", {"name": "User-" + fieldname})

		frappe.clear_cache(doctype="User")