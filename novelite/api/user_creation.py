import frappe
from frappe import _

# -------------------------------------------------User Creation------------------------------------------------------------
@frappe.whitelist()
def check_user():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    user_email = data.get('userEmail')
    
    try:
        user_list = frappe.get_list("User", filters={ "name": user_email })
        if len(user_list) > 0:
            return True
        else:
            return False

    except Exception as e:
        frappe.log_error("Error in check_user: {}".format(e))
        # Return an error response
        frappe.response["http_status_code"] = 500
        return {"error": "An error occurred while checking the user.", "data": user_email}

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
        new_user.last_name = data.get('last_name')
        new_user.role_profile_name = data.get('app_user_type')
        new_user.send_welcome_email = 1
        new_user.insert(ignore_permissions=True)
        
        return new_user
    
    except Exception as e:
        # Log the error
        frappe.log_error("Error in get_ticket_by_id: {}".format(e))
        
        # Return an error response
        frappe.response["http_status_code"] = 500
        return {"error": "An error occurred while creating the user.", "data": new_user}

# -------------------------------------------------Modify App User Permissions------------------------------------------------------------
@frappe.whitelist()
def modify_app_user_permission():

    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    permission_arr = data.get('permissions')
    try:
        app_user_list = frappe.get_list("App Users", filters={ "name": data.get('name') })
        if app_user_list and len(app_user_list) > 0:
            app_user = frappe.get_doc("App Users", app_user_list[0].name)
            # Future user case if needed to set app user
            # app_user.user_type = user_type
            app_user.permissions = []

            if permission_arr:
                for permission in permission_arr:
                    app_user.append("permissions", {
                        "doctype": "App Permissions",
                        "permissions": permission
                    })

            app_user.save()

            return "Success Message"
        else:
            return "App user has not been created yet."
    except Exception as e:
        return f"Error: {str(e)}"
    
# ------------------------------------------Update app user status----------------------------------------------------------
@frappe.whitelist()
def update_app_user_status(doc, method):
    try:
        user_doc = frappe.get_doc("User", doc.email)
        if user_doc:
            if user_doc.app_user_type == "Property Customer":
                app_user = frappe.get_doc("App Users", {"user": doc.email})
                
                if app_user:
                    if user_doc.enabled == 1:
                        if app_user.user_status != 'Active':
                            app_user.user_status = 'Active'
                            app_user.save()
                            return {"success": _("User status updated successfully.")}
                        else:
                            return {"info": _("User status is already set to Active.")}
                    else:
                        if app_user.user_status != 'In-Active':
                            app_user.user_status = 'In-Active'
                            app_user.save()
                            return {"success": _("User status updated successfully.")}
                        else:
                            return {"info": _("User status is already set to In-Active.")}
        else:
            return {"error": _("No document found for the provided user email.")}

    except Exception as e:
        frappe.log_error(_("Error in updating user status: {0}").format(str(e)))
        return {"error": _("An error occurred while updating user status. Please try again later.")}