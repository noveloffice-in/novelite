import frappe

def on_comment(doc, method):
    # doc is the Comment document that was just inserted

    # Check if the comment is on the particular DocType you're interested in
    if doc.reference_doctype == "Issue":
        # Perform your logic here
        # For example, send a notification, log an event, etc.
        frappe.publish_realtime(event='comment_added', message='A comment was added', user=doc.owner, doctype=doc.reference_doctype, docname=doc.reference_name)
