# ----------------------------------------Fetching Issue Data------------------------------------------------
import frappe

@frappe.whitelist()
def get_issue_data():

    data = frappe.request.json
    
    if data is None:
        frappe.throw("No data provided")

    userEmail = data.get('userEmail')
    filterLocation = data.get('filterLocation')
    try:
        # Check if filter_location is "ALL"
        if filterLocation == "ALL":
            # Get issues raised by the user with the provided email
            issues = frappe.get_all("Issue", filters={"raised_by": userEmail})
        else:
            # Get issues raised by the user with the provided email and filter by location
            issues = frappe.get_all("Issue", filters={"raised_by": userEmail, "location": filterLocation})
        
        # Initialize a list to store the modified issues
        modified_issues = []

        for issue in issues:
            issue_doc = frappe.get_doc("Issue", issue.name)
            
            # Get issue comments for the current issue
            issue_comments = frappe.get_all("Issue Comment For Client", filters={"ticket_id": issue.name},
                                           fields = ["unread_messages"] )
            
            unread_messages = {}
            if issue_comments:
                # Extract unread_messages from the first comment
                unread_messages = {"unread_messages": issue_comments[0].unread_messages}
                # return unread_messages
            issue_doc.update(unread_messages)

            modified_issues.append(issue_doc)
            issue_doc.save()


        return modified_issues

    except Exception as e:
        frappe.log_error(f"Error in fetching issue data: {str(e)}")
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}

