# Copyright (c) 2023, Ragul KM and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password

import datetime
from datetime import datetime

import qrcode
from io import BytesIO
import base64
import os
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
    

#-------------------- Function to generate a QR code based on provided data--------------------------------
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

@frappe.whitelist()
def create_qr_codes(data):
    # document = frappe.get_doc("Room Bookings", doc)
    # if not document.qr_code:
    #     data = ""
    #     for fieldname, value in document.as_dict().items():
    #         if value:
    #             data += f"{fieldname}: {value}\n"

        # frappe.response['message'] = data
        enc_msg = encrypt_message(data)
        # document.encrypted_data = enc_msg
        img = generate_qrcode(enc_msg)
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

#--------------------------- Function to validate meeting Room Login---------------------------------------
@frappe.whitelist(allow_guest=True)
def allowGuest(id):
    # id = "B-NTP - Kudlu Gate-2024-02-07-44284"
    curTime = datetime.datetime.now().strftime('%H:%M')
    doc = frappe.get_doc('Room Bookings', id)
    time_slots = doc.booking_timings
    result = False
    split_slots = time_slots.split(',')
    for i in split_slots:
        # st = i.split(' - ')
        start_time, end_time = i.split(' - ')
        if start_time <= curTime <= end_time:
            result = True
            break

    if result:
        return True
    else:
        return False
    
#--------------------------------- Function to validate exit Time-------------------------------------------
@frappe.whitelist(allow_guest=True)
def exitTime(id):
    curTime = datetime.datetime.now().strftime('%H:%M')
    doc = frappe.get_doc('Room Bookings', id)
    doc.exit_time = curTime
    doc.save()
    frappe.db.commit()
    return True


@frappe.whitelist()
def getAllData():
    data = frappe.db.sql('''
        SELECT 
            rb.name, rb.room, rb.location, bt.from_time, bt.to_time, rb.booking_date 
        FROM 
            `tabRoom Bookings` rb
        JOIN 
            `tabRoom Booking Time Slots` bt ON rb.name = bt.parent;
        ''', as_dict=True)
    
    converted_data = []
    for row in data:
        from_time = row['from_time']
        to_time = row['to_time']
        booking_date = row['booking_date']

        from_hours = from_time.seconds // 3600
        from_minutes = (from_time.seconds // 60) % 60
        to_hours = to_time.seconds // 3600
        to_minutes = (to_time.seconds // 60) % 60

        from_time_str = '{:02d}:{:02d}'.format(from_hours, from_minutes)
        to_time_str = '{:02d}:{:02d}'.format(to_hours, to_minutes)

        converted_data.append({
            'name': row['name'],
            'room': row['room'],
            'from_time': from_time_str,
            'to_time': to_time_str,
            'booking_date': booking_date
            # Add other fields as needed
        })
        
    return converted_data


@frappe.whitelist()
def addDataToDoc():
    # Get the data from the HTTP request
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")  # Handle case where no data is provided

    # Now you can continue with your existing logic to process the data
    item_info = frappe.new_doc("Room Bookings")
    item_info.room = data.get('room')
    item_info.price = data.get('price')
    item_info.customer = data.get('customer')
    item_info.location = data.get('location')
    item_info.room_type = data.get('room_type')
    item_info.client_type = data.get('client_type')
    item_info.booking_date = data.get('booking_date')
    item_info.booking_status = data.get('booking_status')
    item_info.customer_lead_id = data.get('customer_lead_id')
    # item_info.booking_timings = data.get('booking_timings')
    # Save the item_info before adding booked_timings
    item_info.insert()

    # # Split booking_timings string into individual timings
    timings_list = data.get('booking_timings').split(',')

    # # Add each timing to the booked_timings table
    for timing_str in timings_list:
        from_time_str, to_time_str = timing_str.strip().split(' - ')
        from_time_obj = datetime.strptime(from_time_str, '%H:%M').time()
        to_time_obj = datetime.strptime(to_time_str, '%H:%M').time()

        item_info.append("booked_timings", {
            "from_time": from_time_obj,
            "to_time": to_time_obj,
            "enter_time":"00:00:00",
            "exit_time":"00:00:00"
        })

    # Save the item_info again after adding booked_timings
    item_info.save()
    
    return "Data added successfully"


@frappe.whitelist()
def issue():
    # Get data from frappe.form_dict
    data = frappe.form_dict

    try:
        # Extract file data from base64 encoded string
        if 'file' in data:
            file_data = data['file']
            file_data = file_data.split(',')[1]  # Remove the data URI prefix
            # file_type = file_data.split(',')[0] 
            file_binary = base64.b64decode(file_data)

        # Create a new Issue document and populate it with the received data
        issue_info = frappe.new_doc("Issue")
        issue_info.subject = data.get('subject', "")
        issue_info.customer = data.get('customer', "")
        issue_info.issue_type = data.get('issue_type', "")
        issue_info.vent_number = data.get('vent_number', "")
        issue_info.custom_issue_subtype = data.get('custom_issue_subtype', "")
        issue_info.location = data.get('location', "")
        issue_info.description = data.get('description', "")
        issue_info.contact_name = data.get('contact_name', "")
        issue_info.contact_phone = data.get('contact_phone', "")
        issue_info.contact_email = data.get('contact_email', "")
        issue_info.priority = data.get('priority', "")
        issue_info.contact_email_alternative = data.get('contact_email_alternative', "")

        issue_info.insert(ignore_permissions=True)

        if 'file' in data and 'fileName' in data:
            file_format = data['file'].split(';')[0].split('/')[1]
            file_name = f"{data['fileName']}.{file_format}"

            if file_format in ['png', 'jpg', 'jpeg', 'pdf']:
                content_type = "image/" + file_format
            elif file_format == 'mp4':
                content_type = "video/mp4"

            file_doc = frappe.get_doc({
                "doctype": "File",
                "file_name": file_name,
                "folder": "Home",
                "is_private": 0,
                "content": file_binary,  # Here we use the binary data
                "content_type": content_type,
                "attached_to_doctype": "Issue",
                "attached_to_name": issue_info.name  # This should now be valid
            })
            file_doc.insert(ignore_permissions=True)

            issue_info.db_set("attachment", file_doc.file_url)

        return _("Issue created successfully")
    except Exception as e:
        return str(e)
    

# --------------------------------Creating Records in Visiting PP----------------------------------------------------------

@frappe.whitelist()
def addDataToleadsAndVisitorParking():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    # lead_id = data.get('billingLead')
    
    # if lead_id:
    #     doc = frappe.get_doc("Leads", lead_id)
    #     for i in doc.complementary_table:
    #         i.vp_used = i.vp_used + 100
    #         i.save()
    #     doc.save()
    # else:
    #     frappe.throw("Lead ID not provided")

    # Create and insert the Visitor Parking Pass document first to get a valid 'name'
    vps = frappe.new_doc("Visitor Parking Pass")
    vps.customer = data.get('customer', "")
    vps.customer_email = data.get('customerEmail', "")
    vps.lead_id = data.get('billingLead', "")
    vps.billing_entity = data.get('billingLoc', "")
    vps.visitor_name = data.get('visitorName', "")
    vps.vehicle_type = data.get('vehicleType', "")
    vps.visit_location = data.get('visitLocation', "")
    vps.visitor_email = data.get('visitorEmail', "")
    vps.vehicle_no = data.get('vehicleNumber', "")
    visit_date = frappe.utils.getdate(data.get('visitingDate')) if data.get('visitingDate') else ""
    vps.visit_date = visit_date
    vps.visit_time = data.get('visitingTime', "")
    
    vps.insert()  # This generates a 'name' for the vps document

    # Now generate the QR code
    qr_code_data = generate_qrcode(data)

    # And save the QR code as a File document in Frappe, attaching it to the Visitor Parking Pass
    qr_code_file = save_qr_code_file(qr_code_data, vps.name)  # Now vps has a valid name
    
    # Finally, update the Visitor Parking Pass document with the QR code file's URL
    vps.db_set("custom_qr_code", qr_code_file.file_url)

    return "Done!"

def save_qr_code_file(qr_code_data, reference_name):
    # Convert base64 string back to binary for file saving
    qr_code_binary = base64.b64decode(qr_code_data)

    # Create a new File doc and set its properties
    file_doc = frappe.get_doc({
        "doctype": "File",
        "file_name": f"qr_code_{reference_name}.png",
        "folder": "Home",
        "is_private": 1,
        "content": qr_code_binary,  # Here we use the binary data
        "attached_to_doctype": "Visitor Parking Pass",
        "attached_to_name": reference_name  # This should now be valid
    })
    file_doc.insert(ignore_permissions=True)
    return file_doc

# --------------------------------Deleting Records in Visiting PP----------------------------------------------------------

@frappe.whitelist()
def removeDataFromLeadsAndVisitorParking(vps_id):
    # First, find the Visitor Parking Pass document
    vps_doc = frappe.get_doc("Visitor Parking Pass", vps_id)
    
    if not vps_doc:
        frappe.throw(f"Visitor Parking Pass with ID {vps_id} not found")
    
    # Decrease vp_used by 100
    # lead_id = vps_doc.lead_id
    # if lead_id:
    #     lead_doc = frappe.get_doc("Leads", lead_id)
    #     for i in lead_doc.complementary_table:
    #         i.vp_used = max(0, i.vp_used - 100)  # Ensure vp_used doesn't go below 0
    #         i.save()
    #     lead_doc.save()
    # else:
    #     frappe.throw("Lead ID not provided in Visitor Parking Pass")
    
    # Delete the Visitor Parking Pass document
    frappe.delete_doc("Visitor Parking Pass", vps_id, ignore_permissions=True)
    
    return "Done!"


# ----------------------------------------Adding Data to Issue Comment For Client------------------------------------------------
@frappe.whitelist()
def addDataToIssueCommentForClient():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")
        
    try: 
        ticket_id = data.get('issue_id')
        
        doc = frappe.get_doc("Issue Comment For Client", ticket_id)
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
# Define a custom endpoint using the `frappe.whitelist` decorator
@frappe.whitelist(allow_guest=True)
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
                    "username": user.name,
                    "permissions": permissions_list
                })
            
            # Return the user data as a JSON response
            return user_permissions
    
    except Exception as e:
        # Handle any errors
        frappe.log_error(_("Error in fetching user permissions by email: {0}").format(str(e)))
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}

