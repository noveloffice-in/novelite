import frappe
from frappe.core.doctype.user.user import User
from frappe import STANDARD_USERS
from frappe.utils import (
	get_formatted_email
)

class User_Overriden(User):
     
    def send_welcome_mail_to_user(self):
        from frappe.utils import get_url

        link = self.reset_password()
        subject = None
        method = frappe.get_hooks("welcome_email")
        if method:
            subject = frappe.get_attr(method[-1])()
        if not subject:
            site_name = frappe.db.get_default("site_name") or frappe.get_conf().get("site_name")
            if site_name:
                subject = _("Welcome to {0}").format(site_name)
            else:
                subject = _("Complete Registration")

        self.send_login_mail(
            subject,
            "new_user",
            dict(
                link=link,
                site_url=get_url(),
            ),
        )
    
    def send_login_mail(self, subject, template, add_args, now=None):
        """send mail with login details"""
        from frappe.utils import get_url
        from frappe.utils.user import get_user_fullname

        created_by = get_user_fullname(frappe.session["user"])
        if created_by == "Guest":
            created_by = "Administrator"

        args = {
            "first_name": self.first_name or self.last_name or "user",
            "user": self.name,
            "title": subject,
            "login_url": get_url(),
            "created_by": created_by,
        }

        args.update(add_args)

        sender = (
            frappe.session.user not in STANDARD_USERS and get_formatted_email(frappe.session.user) or None
        )

        cc = ""
        bcc = ""

        if self.app_user_type == "Novel Employee":
            sender = "erpnextreports@noveloffice.in"
        else:
            sender = "no-reply@noveloffice.in"
            subject = "Welcome to Novel Office App"
            cc = ["ashwin.r@noveloffice.in", "neeraj.s@noveloffice.in"]
            # cc = ["prabhudev.a@noveloffice.in", "saumyaranjan.p@noveloffice.in"]
            bcc = "webdeveloper@noveloffice.in"

        if template == "password_reset":
            sender = "no-reply@noveloffice.in"
            
        frappe.sendmail(
            recipients=self.email,
            sender=sender,
            cc=cc,
            bcc=bcc,
            subject=subject,
            template=template,
            args=args,
            header=[subject, "green"],
            delayed=(not now) if now is not None else self.flags.delay_emails,
            retry=3,
        )