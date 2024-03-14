# In my_custom_app/my_custom_app/doctype/my_custom_doctype/my_custom_script.py

import frappe

def on_comment(doc, method):
    # doc is the Comment document that was just inserted
    frappe.publish_realtime(event='comment_added', message= doc)
    print("-------------------------------Hello---------------------------")
    print(f"Published comment_added event for {doc.name} with method {method}")

    # Check if the comment is on the particular DocType you're interested in
    # if doc.reference_doctype == "YourDocType":
    # Perform your logic here
    # For example, send a notification, log an event, etc.
