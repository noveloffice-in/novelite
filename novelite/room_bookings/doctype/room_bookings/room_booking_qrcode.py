# import frappe
# from frappe.model.document import Document
# import json

# import qrcode
# from io import BytesIO
# import base64
# import os
# from cryptography.fernet import Fernet
# from cryptography.hazmat.primitives import hashes
# from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC


# Function to generate a QR code based on provided data
# def generate_qrcode(data):
#     qr = qrcode.QRCode(
#         version=1,
#         error_correction=qrcode.constants.ERROR_CORRECT_L,
#         box_size=3,
#         border=1,
#     )
    
#     qr.add_data(data)
#     qr.make(fit=True)

#     img = qr.make_image(fill_color="black", back_color="white")

#     img_byte_array = BytesIO()
#     img.save(img_byte_array, format='PNG')
#     img_byte_array.seek(0)

#     base64_encoded_image = base64.b64encode(img_byte_array.read()).decode("utf-8")
#     return base64_encoded_image
	


# @frappe.whitelist(allow_guest=True)
# def create_qr_codes(doc):
#     document = frappe.get_doc("Room Bookings", doc)
#     if not document.qr_code:
#         data = ""
#         for fieldname, value in document.as_dict().items():
#             if value:
#                 data += f"{fieldname}: {value}\n"

#         key = b'uKOIQ0nkDJIpYzdDC120OPHUYZz6aIkI9uj3lMIiSWo='
#         f = Fernet(key)
#         data = data.encode('utf-8')
#         token = str(f.encrypt(data))
#         document.encrypted_data = token
#         img = generate_qrcode(token)
#         img_binary = base64.b64decode(img)
#         file_data = frappe.get_doc({
#             'doctype': 'File',
#             'file_name': f'qrcode_image.png',  
#             'attached_to_doctype': document.doctype,
#             'attached_to_name': document.name,
#             'content': img_binary,
#             'is_private': 0,
#         })
#         file_data.save()
#         document.qr_code = file_data.file_url
#         document.save()



# @frappe.whitelist(allow_guest=True)
# def create_qr_codes(doc):
#     document = frappe.get_doc("Room Bookings", doc)
#     if not document.qr_code:
#         data = ""
#         for fieldname, value in document.as_dict().items():
#             if value:
#                 data += f"{fieldname}: {value}\n"

#         key = b'uKOIQ0nkDJIpYzdDC120OPHUYZz6aIkI9uj3lMIiSWo='
#         f = Fernet(key)
        
#         # No need to convert data to bytes explicitly
#         token = f.encrypt(data.encode('utf-8'))
        
#         document.encrypted_data = token
#         img = generate_qrcode(token)
#         img_binary = base64.b64decode(img)
        
#         file_data = frappe.get_doc({
#             'doctype': 'File',
#             'file_name': f'qrcode_image.png',  
#             'attached_to_doctype': document.doctype,
#             'attached_to_name': document.name,
#             'content': img_binary,
#             'is_private': 0,
#         })
#         file_data.save()
        
#         document.qr_code = file_data.file_url
#         document.save()