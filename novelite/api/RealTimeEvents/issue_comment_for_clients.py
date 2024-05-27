import frappe
from frappe.realtime import publish_realtime

doctype_name = "Issue Comment For Client"

@frappe.whitelist()
def on_update(doc, method):

    all_messages = doc.all_messages
    if all_messages and len(all_messages) > 0:
        message = doc.all_messages[-1]
        senders = ['noveloffice', 'vibgyornet', 'poseidon']
        sender_found = False
        for sender in senders:
            if sender in message.comment_by_email:
                sender_found = True
                break
        
        if sender_found and doc.unread_messages > 0:
            doc_list = frappe.get_list("Novelite Notifications", filters = { "doc_name": doc.name })

            message = f"You have {doc.unread_messages} unread message(s) in {doc.ticket_id}."

            if len(doc_list) == 1:
                frappe.set_value("Novelite Notifications", doc_list[0].name, "unread_messages", doc.unread_messages)
                frappe.set_value("Novelite Notifications", doc_list[0].name, "message", message)
            else:
                print("2")
                novelite_notifications_doc = frappe.new_doc("Novelite Notifications")
                novelite_notifications_doc.document_type = doctype_name
                novelite_notifications_doc.doc_name = doc.name
                novelite_notifications_doc.show_to = doc.raised_by
                novelite_notifications_doc.unread_messages = doc.unread_messages
                novelite_notifications_doc.message = message
                novelite_notifications_doc.save()
            
            frappe.publish_realtime(
                f"new_notification",
                {
                    'issue_name': doc,
                    'notification': message
                }
            )
            
