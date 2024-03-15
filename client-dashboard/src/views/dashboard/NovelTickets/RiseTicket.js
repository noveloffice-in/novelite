import { FormControl, MenuItem, Select, TextField, Tooltip, Typography, Button, InputLabel, DialogContentText } from '@mui/material'
import { Box } from '@mui/system'
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import React, { useState } from 'react'
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
        userName: "",
        contactNumber: "",
        email: "",
        creation_via: "Ticket"
    });

    const issueOptions = {
        "IT": ["Hardware", "Software", "Network"],
        "Parking": ["Availability", "Access", "Security"],
        "Security and Access": ["Keycard Issue", "Surveillance", "Visitor Access"],
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

    //----------------------------------------------------------Issue and Issue Type Dropdown change-----------------------------------------------//
    const handleIssueDropdownChange = (e) => {
        const selectedIssue = e.target.value;
        setIssueDropdown(selectedIssue);
        if (selectedIssue !== "Other") {
            const newIssueTypeOptions = issueOptions[selectedIssue];
            setIssueTypeOptions(newIssueTypeOptions);
            setIssueTypeDropdown(newIssueTypeOptions[0]);
            // Update ticketData for issue and issueType
            setTicketData(prevState => ({
                ...prevState,
                issue: selectedIssue,
                issueType: newIssueTypeOptions[0]
            }));
        } else {
            setIssueTypeOptions([]);
            setIssueTypeDropdown("");
            // Update ticketData for issue and clear issueType
            setTicketData(prevState => ({
                ...prevState,
                issue: selectedIssue,
                issueType: ""
            }));
        }
    };

    const handleIssueTypeDropdownChange = (e) => {
        setIssueTypeDropdown(e.target.value);
    };
    //----------------------------------------------------------Contact-----------------------------------------------//
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicketData(prevState => ({
            ...prevState,
            [name]: value
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
                }}
            >
                <TextField
                    id="standard-basic"
                    label="Ticket Title"
                    variant="standard"
                    style={{ width: '100%' }}
                    name="subject"
                    value={ticketData.subject} 
                    onChange={handleTicketDataChange}
                />

                <Tooltip disableFocusListener disableTouchListener placement="right-end" TransitionComponent={Zoom} title="Property for which you want to rise ticket">
                    {confirmedLocations?.length >= 2 ?
                        (<Box>
                            <FormControl fullWidth sx={{ mt: 2 }} >
                                <InputLabel id="demo-simple-select-label">Property Location</InputLabel>
                                <Select
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

                <DialogContentText sx={{ mt: 2 }}>
                    Contact Details
                </DialogContentText>

                <TextField label="User Name" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="userName" onChange={handleInputChange} />
                <TextField label="Contact Number" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="contactNumber" onChange={handleInputChange} />
                <TextField label="Email (Optional)" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="email" onChange={handleInputChange} />

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