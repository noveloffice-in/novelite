import frappe
from frappe.realtime import publish_realtime

@frappe.whitelist()
def event_insert(doc, method):
    # Publish real-time data when a new issue is inserted
    all_messages = doc.all_messages
    if all_messages and len(all_messages) > 0:
        message = doc.all_messages[-1]
        senders = ['noveloffice', 'vibgyornet', 'poseidon']
        sender_found = False
        for sender in senders:
            if sender in message.comment_by_email:
                sender_found = True
                break

        if sender_found:
            frappe.publish_realtime(f"new_message", {'issue_name': doc, 'notification': f"New message from Novel Office in {doc.ticket_id}"})
            
