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
def get_user_permissions_by_email(company_name, user_email):
    try:
        data = frappe.db.sql(
            '''
            SELECT 
                au.*,
                GROUP_CONCAT(ap.permissions) AS permissions
            FROM 
                `tabApp Users` au 
            LEFT JOIN 
                `tabApp Permissions` ap 
            ON 
                au.name = ap.parent 
            WHERE 
                au.company_name = %s 
            AND 
                au.name != %s
            GROUP BY 
                au.name
            ''', 
            (company_name, user_email), as_dict=True)

        # Convert permissions from a comma-separated string to a list
        for record in data:
            permissions = []
            if record['permissions']:
                for permission in record['permissions'].split(','):
                    permissions.append({"permittedComponent": permission})
                record['permissions'] = permissions

        return list(data)

    except Exception as e:
        frappe.log_error(f"An error occurred: {str(e)}")
        return {"error": "An error occurred while processing the request. Please try again later."}


# ----------------------------------------Updating Permissions------------------------------------------------
@frappe.whitelist()
def update_permissions():
    data = frappe.request.json
    permission_arr = data.get('permissions_array')
    user_email = data.get('user_email')
    user_type = data.get('user_type')
    # return user_email

    try:
        app_user = frappe.get_doc("App Users", user_email)
        # return app_user.name
        app_user.user_type = user_type
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
    
# ---------------------------------------------------------------------------------------------------------------------------
#-> This is the same method without sql query, search this method by name.
# TODO -> Use this if needed
# @frappe.whitelist()
# def get_user_permissions_by_email(company_name, user_email):
#     users_with_permissions = []

#     # Fetch list of app users based on company_name and excluding the specified user_email
#     app_users = frappe.get_all("App Users",
#                                 filters={"company_name": company_name, "user": ("!=", user_email)},
#                                 fields=["name", "user_name", "user", "company_name"])

#     for user in app_users:
#         user_permissions = []

#         # Fetch permissions for each user
#         permissions = frappe.get_all("App Permissions",
#                                       filters={"parent": user["name"]},
#                                       fields=["permissions"])

#         for permission in permissions:
#             user_permissions.append(permission["permissions"])

#         # Construct user object with permissions
#         user_data = {
#             "user_name": user["user_name"],
#             "user_email": user["user"],
#             "company_name": user["company_name"],
#             "permissions": user_permissions
#         }

#         users_with_permissions.append(user_data)

#     return users_with_permissions
