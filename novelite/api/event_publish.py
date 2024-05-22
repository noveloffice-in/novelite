import frappe
from frappe.realtime import publish_realtime

@frappe.whitelist()
def event_insert(doc, method):
    # Publish real-time data when a new issue is inserted
    frappe.publish_realtime('new_issue', {'issue_name': "Event Published"})
