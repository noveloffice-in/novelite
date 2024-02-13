# Copyright (c) 2023, Ragul KM and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password

import datetime
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


@frappe.whitelist(allow_guest=True)
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


# @frappe.whitelist(allow_guest=True)
# def addDataToDoc(data):
#     # for data in datas:
#     item_info = frappe.new_doc("Room Bookings")
#     item_info.booking_date = data['booking_date']
#     item_info.booking_status = data['booking_status']
#     item_info.client_type = data['client_type']
#     item_info.customer = data['customer']
#     item_info.customer_lead_id = data['customer_lead_id']
#     item_info.location = data['location']
#     item_info.price = data['price']
#     item_info.room = data['room']
#     item_info.room_type = data['room_type']
    
#     # Save the item_info before adding booked_timings
#     item_info.insert()
    
#     # Split booking_timings string into individual timings
#     timings_list = data['booking_timings'].split(',')
    
#     # Add each timing to the booked_timings table
#     for timing_str in timings_list:
#         from_time_str, to_time_str = timing_str.split(' - ')
#         from_time_obj = datetime.strptime(from_time_str, '%H:%M').time()
#         to_time_obj = datetime.strptime(to_time_str, '%H:%M').time()
        
#         item_info.append("booked_timings", {
#             "from_time": from_time_obj,
#             "to_time": to_time_obj
#         })
        
#     # Save the item_info again after adding booked_timings
#     item_info.save()
        
#     return "Data added successfully"

# @frappe.whitelist(methods=['POST'])

@frappe.whitelist(allow_guest=True)
def addDataToDoc():
    # Get the data from the HTTP request
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")  # Handle case where no data is provided

    # Now you can continue with your existing logic to process the data
    item_info = frappe.new_doc("Room Bookings")
    item_info.booking_date = data.get('booking_date')
    item_info.booking_status = data.get('booking_status')
    item_info.client_type = data.get('client_type')
    item_info.customer = data.get('customer')
    item_info.customer_lead_id = data.get('customer_lead_id')
    item_info.location = data.get('location')
    item_info.price = data.get('price')
    item_info.room = data.get('room')
    item_info.room_type = data.get('room_type')

    # Save the item_info before adding booked_timings
    item_info.insert()

    # Split booking_timings string into individual timings
    timings_list = data.get('booking_timings').split(',')

    # Add each timing to the booked_timings table
    for timing_str in timings_list:
        from_time_str, to_time_str = timing_str.strip().split(' - ')
        from_time_obj = datetime.strptime(from_time_str, '%H:%M').time()
        to_time_obj = datetime.strptime(to_time_str, '%H:%M').time()

        item_info.append("booked_timings", {
            "from_time": from_time_obj,
            "to_time": to_time_obj
        })

    # Save the item_info again after adding booked_timings
    item_info.save()
    
    return "Data added successfully"
