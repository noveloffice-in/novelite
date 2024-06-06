import frappe
from frappe import _
from io import BytesIO
import base64

# ----------------------------------------Adding Data and attachment to Issue Comment For Client------------------------------------------------
@frappe.whitelist()
def addDataToIssueCommentForClient():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    try: 
        ticket_id = data.get('issue_id')
        issue_cmt_id = data.get('parentId')
        if 'file' in data:
            file_data = data['file']
            file_data = file_data.split(',')[1]
            file_binary = base64.b64decode(file_data)
            
            file_format = data['file'].split(';')[0].split('/')[1]
            f_name = data['message'].split('.')[0].split(' ')[0]
            file_name = f"{f_name}.{file_format}"

            content_type = None 

            if file_format in ['png', 'jpg', 'jpeg', 'heif', 'hevc', 'heic']:
                content_type = "image/" + file_format
            elif file_format in ['pdf', 'doc', 'docx']:
                content_type = "application/" + file_format
            elif file_format == 'mov':
                content_type = "video/quicktime"
            elif file_format == 'mp4':
                content_type = "video/mp4"
            
            doc = frappe.get_doc("Issue Comment For Client", issue_cmt_id)
            doc.seen_by_employee = 0
            
            file_doc = frappe.get_doc({
                "doctype": "File",
                "file_name": file_name,
                "folder": "Home",
                "is_private": 0,
                "content": file_binary,
                "content_type": content_type,
                "attached_to_doctype": "Issue Comment For Client",
                "attached_to_name": doc.name
            })
            file_doc.insert(ignore_permissions=True)

            doc.all_amessages = []
            doc.append('all_messages', {
                "comment_by_email": data.get('comment_by_email'),
                'message': data.get('message'),
                "seen_by_customer": 1,
                "attachment": file_doc.file_url
            })
            doc.save()
            # doc.db_set("attachment", file_doc.file_url)
            
        else:
            doc = frappe.get_doc("Issue Comment For Client", {"ticket_id": ticket_id})
            doc.seen_by_employee = 0
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
    
# -----------------------------------Getting data from Issue Comment For Client and update unread messages------------------------------------
@frappe.whitelist()
def get_ticket_by_id():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    try:
        ticket_id = data.get('issue_id')
        
        # Fetch the document based on the ticket_id
        doc = frappe.get_doc("Issue Comment For Client", {"ticket_id": ticket_id})

        # Update only if unread messages are not 0
        if doc.unread_messages != 0:
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
    