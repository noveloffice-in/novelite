import { FormControl, MenuItem, Select, TextField, Tooltip, Typography, Button, InputLabel, DialogContentText, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import React, { useEffect, useState } from 'react'
import Zoom from '@mui/material/Zoom';
//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

export default function RiseTicket({ confirmedLocations, ticketLocation, handleChange }) {
    const [ticketData, setTicketData] = useState({
        subject: "",
        description: "",
        location: ticketLocation,
        issue: "",
        issueType: "",
        name: "",
        contactNumber: "",
        email: "",
        alternateEmail: "",
        creation_via: "Ticket"
    });

    const issueOptions = {
        "IT": ["Hardware", "Software", "Network", "Other"],
        "Parking": ["Availability", "Access", "Security", "Other"],
        "Security and Access": ["Keycard Issue", "Surveillance", "Visitor Access", "Other"],
    };

    const [issueName, setIssueName] = useState([
        "IT",
        "Parking",
        "Security and Access",
        "Documents",
        "Accounts and Billing",
        "Office Space Modification",
        "Plumbing",
        "AC",
        "Electrical",
        "Meeting Room/ Conference Room Booking",
        "Other"
    ]);
    const [issueDropdown, setIssueDropdown] = useState(issueName[0]);
    const [issueTypeDropdown, setIssueTypeDropdown] = useState(issueOptions[issueDropdown] ? issueOptions[issueDropdown][0] : "");
    const [issueTypeOptions, setIssueTypeOptions] = useState(issueOptions[issueDropdown] || []);

    useEffect(() => {
        if (issueDropdown !== "Other" && issueTypeDropdown !== "Other") {
            setTicketData(prevState => ({
                ...prevState,
                subject: `${issueDropdown} - ${issueTypeDropdown}`
            }));
        }
    }, [issueDropdown, issueTypeDropdown]);

    //----------------------------------------------------------Issue and Issue Type Dropdown change-----------------------------------------------//
    const handleIssueDropdownChange = (e) => {
        const selectedIssue = e.target.value;
        setIssueDropdown(selectedIssue);
        const newIssueTypeOptions = issueOptions[selectedIssue] || ["Other"];
        setIssueTypeOptions(newIssueTypeOptions);
        setIssueTypeDropdown(newIssueTypeOptions[0]);
        updateTicketData("issue", selectedIssue);
        updateTicketData("issueType", newIssueTypeOptions[0]);
    };

    const handleIssueTypeDropdownChange = (e) => {
        const selectedIssueType = e.target.value;
        setIssueTypeDropdown(selectedIssueType);
        updateTicketData("issueType", selectedIssueType);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateTicketData(name, value);
    };

    const updateTicketData = (field, value) => {
        setTicketData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    //----------------------------------------------------------Raise a Ticket-----------------------------------------------//
    const { createDoc, isCompleted, } = useFrappeCreateDoc();
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

    const handleTicketDataChange = (e) => {
        const { name, value } = e.target;
        setTicketData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const riseTicket = () => {
        const updatedTicketData = {
            ...ticketData,
            issueType: issueTypeDropdown,
        };
        console.log(updatedTicketData);
        if (ticketData.subject === "" || ticketData.description === "") {
            notifyWarn("Please fill the details");
        } else if (ticketData.location === 'ALL' || ticketData.location === '') {
            notifyWarn("Please Select the Location");
        } else {
            const updatedTicketData = {
                ...ticketData,
                issueType: issueTypeDropdown,
            };
            console.log(updatedTicketData);
            notifySuccess('Ticket created Successfully');
            //, const create = createDoc('Issue', ticketData).then(() => {
            //     notifySuccess('Ticket created Successfully');
            //     setOpen1(false);
            //     mutate();
            // }).catch((err) => {
            //     console.log("inside catch " + JSON.stringify(err.message));
            //     notifyError(err.message);
            // })
        }
    }


    return (
        <>
            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: '90%',
                }}>

                <Tooltip disableFocusListener disableTouchListener placement="top" TransitionComponent={Zoom} title="Property for which you want to rise ticket">
                    {confirmedLocations?.length >= 2 ?
                        (<Box>
                            <FormControl fullWidth sx={{ mt: 2 }} >
                                <InputLabel id="demo-simple-select-label">Property Location</InputLabel>
                                <Select
                                    disabled = {confirmedLocations?.length === 2}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ticketLocation}
                                    label="Property Location"
                                    onChange={handleChange}
                                >
                                    {confirmedLocations?.map((location) => {
                                        return (
                                            <MenuItem key={location.shortName} value={location.shortName}>{location.fullName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>) :
                        (<Typography variant='h4' sx={{ mt: 2 }}>This customer is not linked to any Location</Typography>)
                    }
                </Tooltip>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Issue</InputLabel>
                    <Select value={issueDropdown} label="Issue" onChange={handleIssueDropdownChange}>
                        {issueName.map(issue => (
                            <MenuItem key={issue} value={issue}>{issue}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {issueDropdown !== "Other" && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Issue Type</InputLabel>
                        <Select
                            value={issueTypeDropdown}
                            label="Issue Type"
                            onChange={handleIssueTypeDropdownChange}
                        >
                            {issueTypeOptions.map(issueType => (
                                <MenuItem key={issueType} value={issueType}>{issueType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {issueTypeDropdown === "Other" ? (
                    <TextField
                        label="Ticket Title"
                        variant="standard"
                        sx={{ width: '100%', mt: 2, ml:1 }}
                        name="subject"
                        value={ticketData.subject}
                        onChange={handleInputChange}
                    />
                ) : null}

                <Box sx={{ mt: 2 }} >
                    <TextField
                        id="outlined-multiline-static"
                        label="Ticket Description"
                        multiline
                        rows={2}
                        style={{ width: '100%' }}
                        name="description"
                        value={ticketData.description}
                        onChange={handleTicketDataChange}
                    />
                </Box>

                <DialogTitle sx={{ ml: "-2.2em", mb:"-1rem" }}>Contact Details</DialogTitle>

                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2 }}>
                    <Box>
                        <TextField label="Name" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="name" onChange={handleInputChange} />
                        <TextField label="Contact Number" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="contactNumber" onChange={handleInputChange} />
                    </Box>
                    <Box>
                        <TextField label="Email (Optional)" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="email" onChange={handleInputChange} />
                        <TextField label="Alternate Email (Optional)" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="alternateEmail" onChange={handleInputChange} />
                    </Box>
                </Box>

                <Button variant="contained" sx={{ mt: 2 }} onClick={riseTicket} disabled={confirmedLocations?.length === 1}>
                    Submit
                </Button>
            </Box>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
