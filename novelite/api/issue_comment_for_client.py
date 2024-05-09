import frappe
from frappe import _

# ----------------------------------------Adding Data to Issue Comment For Client------------------------------------------------
@frappe.whitelist()
def addDataToIssueCommentForClient():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")
        
    try: 
        ticket_id = data.get('issue_id')
        
        doc = frappe.get_doc("Issue Comment For Client", {"ticket_id": ticket_id})
        # for item in doc.all_amessages:
        doc.append('all_messages', {
            'message': data.get('message'),
            "comment_by_email": data.get('comment_by_email'),
            "seen_by_customer": 1,
        })
        doc.save()
        return "Message sent successfully"
    except Exception as e:
        frappe.log_error(_("Error in message sending: ").format(str(e)))
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}
    
# ----------------------------------------Getting data from Issue Comment For Client------------------------------------------------
@frappe.whitelist()
def get_ticket_by_id():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    try:
        ticket_id = data.get('issue_id')
        
        # Fetch the document based on the ticket_id
        doc = frappe.get_doc("Issue Comment For Client", {"ticket_id": ticket_id})

        for item in doc.all_messages:
            item.seen_by_customer = 1
        doc.save()
        
        # Return the document as a JSON response
        return doc
    
    except Exception as e:
        # Log the error
        frappe.log_error("Error in get_ticket_by_id: {}".format(e))
        
        # Return an error response
        frappe.response["http_status_code"] = 500
        return {"error": "An error occurred while fetching the ticket."}