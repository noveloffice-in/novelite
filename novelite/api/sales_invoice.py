import frappe

@frappe.whitelist()
def get_invoice_documents():
    data = frappe.request.json

    if data is None:
        frappe.throw("No data provided")

    try:
        customer = data.get('customer')

        # Fetch all sales invoice documents
        invoices = frappe.get_all("Sales Invoice", filters={'customer': customer}, fields=["name", "status",  'due_date', 'rounded_total', 'location'])

        # Categorize the invoices based on status
        categorized_invoices = []

        for invoice in invoices:
            status = invoice.get("status")
            new_status = None
            
            # Categorize invoices
            if status in ["Overdue", "Unpaid", "Partly Paid", "Unpaid and Discounted", "Overdue and Discounted", "Partly Paid and Discounted"]:
                new_status = "Pending"
            elif status in ["Paid", "Credit Note Issued"]:
                new_status = "Paid"
            elif status in ["Return"]:
                new_status = "Credit Note"
            else:
                new_status = status

            # Append new status to the document
            invoice["new_status"] = new_status
            # Remove old status from the document
            invoice.pop("status", None)

            categorized_invoices.append(invoice)

        return categorized_invoices

    except Exception as e:
        frappe.log_error(f"Error in fetching invoice documents: {str(e)}")
        frappe.response["http_status_code"] = 500
        return {"error": str(e)}
