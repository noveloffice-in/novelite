from . import __version__ as app_version

app_name = "novelite"
app_title = "Novelite"
app_publisher = "Ragul KM"
app_description = "App for Novel"
app_email = "ragul.k@noveloffice.in"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/novelite/css/novelite.css"
app_include_js = "/assets/novelite/js/novelite.js"

# include js, css files in header of web template
# web_include_css = "/assets/novelite/css/novelite.css"
# web_include_js = "/assets/novelite/js/novelite.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "novelite/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "novelite.utils.jinja_methods",
#	"filters": "novelite.utils.jinja_filters"
# }

# Installation
# ------------

before_install = "novelite.install.before_install"
after_install = "novelite.install.after_install"

# Uninstallation
# ------------

before_uninstall = "novelite.uninstall.before_uninstall"
# after_uninstall = "novelite.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "novelite.utils.before_app_install"
# after_app_install = "novelite.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "novelite.utils.before_app_uninstall"
# after_app_uninstall = "novelite.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "novelite.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

override_doctype_class = {
	"User": "novelite.api.overridden_classes.user_overridden.User_Overriden"
}

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
    # "*": {
    #     "after_insert": "novelite.api.messages.emit_todo_update",
    # }
     "Issue Comment For Client": {
        "on_update": "novelite.api.RealTimeEvents.issue_comment_for_clients.on_update"
    },
    "User": {
        "on_update": "novelite.api.user_creation.update_app_user_status"
    },
    # "Notifications CD":{
    #     "after_insert": "novelite.messages.on_comment"
    # }
# "after_insert": "my_custom_app.my_custom_app.doctype.my_custom_doctype.my_custom_script.on_comment"
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"novelite.tasks.all"
#	],
#	"daily": [
#		"novelite.tasks.daily"
#	],
#	"hourly": [
#		"novelite.tasks.hourly"
#	],
#	"weekly": [
#		"novelite.tasks.weekly"
#	],
#	"monthly": [
#		"novelite.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "novelite.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "novelite.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "novelite.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["novelite.utils.before_request"]
# after_request = ["novelite.utils.after_request"]

# Job Events
# ----------
# before_job = ["novelite.utils.before_job"]
# after_job = ["novelite.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"novelite.auth.validate"
# ]

website_route_rules = [{'from_route': '/client-dashboard/<path:app_path>', 'to_route': 'client-dashboard'},]