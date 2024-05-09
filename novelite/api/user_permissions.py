import frappe
from frappe import _

# ----------------------------------------Getting App Users and permissions------------------------------------------------
@frappe.whitelist()
def get_document_by_email(user_email):
    try:
        document = frappe.get_doc("App Users", {"user": user_email})
        return document
    except Exception as e:
        frappe.log_error(_("Error in fetching document by email: {0}").format(str(e)))
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}

# ----------------------------------------Getting Members and their permissions------------------------------------------------
@frappe.whitelist()
def get_user_permissions_by_email(user_email):
    try:
        # Query the document based on the user email
        app_user = frappe.get_doc("App Users", {"user": user_email})
        
        # Initialize a list to store user data
        user_permissions = []
        
        if app_user.user_type == "Admin":
            # Iterate through members
            for member in app_user.get("members"):
                # Fetch user data from app users
                user = frappe.get_doc("App Users", member.user)
                
                # Initialize a list to store permissions for the current member
                permissions_list = []
                
                # Iterate through permissions of the current member
                for permission in user.permissions:
                    permissions_list.append({
                        "permittedComponent": permission.permissions,
                    })
                
                # Append username and permissions to the list
                user_permissions.append({
                    "userEmail": user.name,
                    "userName":user.user_name,
                    "userRole": user.user_type,
                    "permissions": permissions_list
                })
            
            # Return the user data as a JSON response
            return user_permissions
    
    except Exception as e:
        # Handle any errors
        frappe.log_error(_("Error in fetching user permissions by email: {0}").format(str(e)))
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}

# ----------------------------------------Updating Permissions------------------------------------------------
@frappe.whitelist()
def update_permissions():
    data = frappe.request.json
    permission_arr = data.get('permissions_array')
    user_email = data.get('user_email')
    # return user_email

    try:
        app_user = frappe.get_doc("App Users", user_email)
        # return app_user.name
        app_user.permissions = []

        if permission_arr:
            for permission in permission_arr:
                app_user.append("permissions", {
                    "doctype": "App Permissions",
                    "permissions": permission.get("permittedComponent")
                })

        app_user.save()

        return "Permissions updated successfully"
    except Exception as e:
        return f"Error: {str(e)}"
    