# Copyright (c) 2023, Ragul KM and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password

import qrcode
from io import BytesIO
import base64
# from cryptography.fernet import Fernet
from Crypto.Cipher import AES

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
    



# Function to generate a QR code based on provided data
def generate_qrcode(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=3,
        border=1,
    )
    
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    img_byte_array = BytesIO()
    img.save(img_byte_array, format='PNG')
    img_byte_array.seek(0)

    base64_encoded_image = base64.b64encode(img_byte_array.read()).decode("utf-8")
    return base64_encoded_image
	
def encrypt_message(message):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(message.encode('utf-8'))
    return base64.b64encode(nonce + tag + ciphertext).decode('utf-8')

key = b'\x1e\xf3w\xcd<\xe1\x98\xcc\x0e\xe9\xe5\xb5\x97\x8d\x83`'

@frappe.whitelist(allow_guest=True)
def create_qr_codes(data):
    # document = frappe.get_doc("Room Bookings", doc)
    # if not document.qr_code:
    #     data = ""
    #     for fieldname, value in document.as_dict().items():
    #         if value:
    #             data += f"{fieldname}: {value}\n"

        # frappe.response['message'] = data
        # enc_msg = encrypt_message(data)
        # document.encrypted_data = enc_msg
        img = generate_qrcode(data)
        # img_binary = base64.b64decode(img)
        # file_data = frappe.get_doc({
        #     'doctype': 'File',
        #     'file_name': f'qrcode_image.png',  
        #     'attached_to_doctype': document.doctype,
        #     'attached_to_name': document.name,
        #     'content': img_binary,
        #     'is_private': 0,
        # })
        # file_data.save()
        # document.qr_code = file_data.file_url
        # document.save()
        return img
