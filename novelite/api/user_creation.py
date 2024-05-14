import frappe
from frappe import _

# -------------------------------------------------User Creation------------------------------------------------------------
@frappe.whitelist()
def create_user():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    try:
        new_user = frappe.new_doc('User')
        new_user.app_user_type = data.get('app_user_type')
        new_user.customer = data.get('customer')
        new_user.email = data.get('email')
        new_user.first_name = data.get('first_name')
        new_user.new_password = data.get('new_password')
        new_user.role_profile_name = data.get('app_user_type')
        new_user.insert(ignore_permissions=True)
        
        return new_user
    
    except Exception as e:
        # Log the error
        frappe.log_error("Error in get_ticket_by_id: {}".format(e))
        
        # Return an error response
        frappe.response["http_status_code"] = 500
        return {"error": "An error occurred while creating the user.", "data": new_user}