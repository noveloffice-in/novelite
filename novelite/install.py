import frappe

def before_install():
	pass

def after_install():
	add_default_lead_statuses()
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