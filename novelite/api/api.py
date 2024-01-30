# Copyright (c) 2023, Ragul KM and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password

@frappe.whitelist(allow_guest=True)
def sign_up():
    try:
        # Extract data from request body
        data = frappe.form_dict

        # Create a new document instance for the Client Main Doctype
        client_main = frappe.new_doc("Client Main")

        # Set fields for the new document
        client_main.name1 = data.get('name')
        client_main.email = data.get('email')
        client_main.phone = data.get('phone')
        client_main.user_type = data.get('user_type')
        client_main.password = data.get('password')

        # Save the document to create a new record
        client_main.save()

        # Commit changes to the database
        frappe.db.commit()

        return {"status": "success", "message": "Client Main record created successfully"}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), 'create_client_main API failed')
        return {"status": "error", "message": str(e)}

@frappe.whitelist(allow_guest=True)
def login():
    try:
        # Extract data from request body
        data = frappe.form_dict

        # Retrieve username and password from data
        username = data.get('username')
        password = data.get('password')

        # Check if a user with the given username exists
        user_exists = frappe.db.exists('Client Main', {'email': username})

        if user_exists:
            # Retrieve the user document
            user_doc = frappe.get_doc('Client Main', user_exists)
            serverPass = get_decrypted_password("Client Main" , user_doc.name, "password", False)

            # Check if the password matches
            # Assuming the passwords are hashed, use the appropriate method to verify the password
            if frappe.safe_decode(password) == serverPass:
                # Password matches, return user data
                return {
                    "status": "success",
                    "data": {
                        "name": user_doc.name1,
                        "email": user_doc.email,
                        "phone": user_doc.phone,
                        "user_type": user_doc.user_type,
                        "serverPass": serverPass
                        # Include other fields as needed
                    }
                }
            else:
                # Password does not match
                return {"status": "error", "message": "Wrong Password", "serverPass": serverPass}
        else:
            # Username does not exist
            return {"status": "error", "message": "User not exist"}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), 'login API failed')
        return {"status": "error", "message": str(e)}
