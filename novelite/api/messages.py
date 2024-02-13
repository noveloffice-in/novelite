import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def notify_message():
    notify_new_message()
    return True

def notify_new_message():
    frappe.publish_realtime("notify", {
        'msg': "Hello from server"
    })