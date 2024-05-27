import { FormControl, MenuItem, Select, TextField, Tooltip, Typography, Button, InputLabel, DialogTitle, CircularProgress } from '@mui/material'
import { Box, Stack, borderRadius, height, padding } from '@mui/system'
import { useFrappeCreateDoc, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import React, { useEffect, useRef, useState } from 'react'
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../../store/apps/userProfile/NovelProfileSlice';
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Attachment
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';

//Ac vent image
import acVent from '../../../assets/images/acVent/AC Vent Number Identification.jpg'

import { tooltipClasses } from '@mui/material/Tooltip';
import { stubFalse } from 'lodash';
import { setIssueType } from '../../../store/apps/tickets/TicketSlice';

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

//Attachment Style
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

//Custom tooltip
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        // backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        // fontSize: theme.typography.pxToRem(12),
        // border: '1px solid #dadde9',
        padding: '10px',
    },
}));

export default function RaiseTicket({ handleClose1, filterLocation, setFilterLocation, setOpen1, mutate, submitTicket, setShowLoading, issueTypesArray }) {

    const dispatch = useDispatch();
    const customerName = useSelector((state) => state.novelprofileReducer.fullName);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const customerEmailId = useSelector((state) => state.novelprofileReducer.userEmail);
    const [attachment, setAttachment] = useState(null);
    const [openToolTip, setOpenToolTip] = useState(false);

    const [contactErr, setContactErr] = useState(false);
    const [contactNumErr, setContactNumErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [ticketLocation, setTicketocation] = useState("");

    const priorityOptions = ["High", "Medium", "Low"];

    const [issuePriority, setIssuePriority] = useState(priorityOptions[0])

    const [ticketData, setTicketData] = useState({
        subject: "",
        description: "",
        location: localStorage.getItem('location') || filterLocation,
        issueType: "",
        issueSubType: "",
        contactName: "",
        contactNumber: "",
        alternateEmail: "",
        customer: companyName,
        email: '',
        file: "",
        fileName: "",
        ventNumber: "",
        creation_via: "Ticket",
        priority: issuePriority
    });

    //--------------------------------------------------------Locations fetching------------------------------------------------------//
    const { data: allLocations, error, isValidating } = useFrappeGetDocList('Property Location', {
        fields: [ 'location_name', 'short_name']
    });

    console.log("Locations = ", allLocations);

    const locationsDropdown = [
        { shortName: 'NTP', fullName: 'Novel Tech Park - Kudlu Gate' },
        { shortName: 'NOM', fullName: 'Novel Office Marathahalli' },
        { shortName: 'NOC', fullName: 'Novel Office Central - MG Road' },
        { shortName: 'NOQ', fullName: 'Novel Office Queens- Queens Road' },
        { shortName: 'NOW', fullName: 'Novel Office WorkHub- Whitefield' },
        { shortName: 'NBP', fullName: 'Novel Business Park - Adugodi' },
        { shortName: 'NOB', fullName: 'Novel Office Brigade' },
    ]


    let issueOptions = {
        "IT and Network": ["Internet not working | Slow Internet", "LAN Port", "LAN Cable", "Patch Cord issue", "Computer", "Sytem/Desktop", "EPAbx Setup", "GSM Issue", "Server", "Other"],
        "Parking": ["Request Additional Parking", "New Parking Sticker | New Parking User", "P.S. Lost", "Pay and Park", "P.S. Downsize", "Other"],
        "Security and Access": ["Access card Damaged", "Access card not working", "Access card lost", "New Access card", "Temporary Access Cards", "Other"],
        "Gate Pass": ["MAF", "Other"],
        "Documents and Accounts": ["Rental Agreement", "NOC", "Utility Bill", "Property Tax", "Property Agreement", "Other"],
        "Accounts and Billing": ["Incorrect Invoice", "Duplicate Charges", "GST Inclusion", "Unknown Charges", "TDS", "Credit Note", "Other"],
        "House Keeping": ["Cleaning Required", "Foul Odour", "Food Spill", "Dust Bin Clearing", "Cardboard Removal", "Carpet Cleaning", "Other"],
        "Office Space Modification": ["Desk Expansion | Downsize", "Chair Issues", "Layout Change", "Ammenities : Pedestal, Storage Box 4Ft & 6Ft, Frosting, White Board", "Beading Issue", "Sound Issue", "Door Issues", "Carpet Issues", "Blinds Issue", "Other"],
        "Restroom | Common Area": ["Washroom", "Cleaning", "Tap Leakage", "Tissue Paper Replacement", "Foul Smell", "Wet Floor", "Soap Refill", "Faucet Leak", "Other"],
        "AC": ["Too Hot", "Too Cold", "AC not Working", "Facade Area Issues", "Other"],
        "Electrical": ["Light Not Working", "Light Flickering", "Dim Light Replacement", "Power Socket Issue", "Access Controller", "Acess Controller repair", "Elevator | Lift not working", "Extra UPS | RAW Requirement", "Emergency Light", "Frequent Power Outage", "Other"],
        "Meeting Room | Conference Room Booking": ["Book Meeting  Room", "Book Conference Room", "Other"]
    };

    const [issueName, setIssueName] = useState([
        "IT and Network",
        "Parking",
        "Security and Access",
        "Gate Pass",
        "Documents and Accounts",
        "Accounts and Billing",
        "House Keeping",
        "Office Space Modification",
        "Restroom | Common Area",
        "AC",
        "Electrical",
        "Meeting Room | Conference Room Booking",
        "Other"
    ]);
    const [issueDropdown, setIssueDropdown] = useState(issueName[0]);
    const [issueTypeDropdown, setIssueTypeDropdown] = useState(issueOptions[issueDropdown] ? issueOptions[issueDropdown][0] : "");
    const [issueTypeOptions, setIssueTypeOptions] = useState(issueOptions[issueDropdown] || []);

    const issueType = useSelector((state) => state.ticketReducer.issueType);
    const [issuetypeNew, setIssueTypeNew] = useState(issueType);
    const [issueSubtypeNew, setIssueSubTypeNew] = useState('');

    //For outer submit btn trigger
    const isFirstRender = useRef(true);

    useEffect(() => {
        setTicketData(prevState => ({
            ...prevState,
            subject: `${issuetypeNew} - ${issueSubtypeNew}`
        }));
    }, [issuetypeNew, issueSubtypeNew]);

    //For outer submit btn trigger
    useEffect(() => {
        if (!isFirstRender.current) {
            riseTicket();
        } else {
            isFirstRender.current = false;
        }
    }, [submitTicket])

    //----------------------------------------------------------Issue types and subtypes fetch-----------------------------------------------//
    //Subtypes
    let { data: issueSubTypesArray } = useFrappeGetDocList('Issue SubType', {
        fields: ['name', 'issue_type'],
        filters: [['issue_type', 'in', `${issuetypeNew}, Other`]],
        orderBy: {
            field: 'name',
            order: 'asc',
        },
    });

    if (issueSubTypesArray) {

        const otherItems = issueSubTypesArray.filter(item => item.name === 'Other');

        // Filter the items without name 'Other'
        const nonOtherItems = issueSubTypesArray.filter(item => item.name !== 'Other');

        // Concatenate the nonOtherItems array with otherItems array
        issueSubTypesArray = [...nonOtherItems, ...otherItems];
    }


    //----------------------------------------------------------Issue and Issue Type Dropdown change-----------------------------------------------//
    const handleIssueDropdownChange = (e) => {
        const selectedIssue = e.target.value;
        dispatch(setIssueType(selectedIssue));
        setIssueTypeNew(selectedIssue);
        // setIssueDropdown(selectedIssue);
        // const newIssueTypeOptions = issueOptions[selectedIssue] || ["Other"];
        // setIssueTypeOptions(newIssueTypeOptions);
        // setIssueTypeDropdown(newIssueTypeOptions[0]);
        // updateTicketData("issue", selectedIssue);
        // updateTicketData("issueType", newIssueTypeOptions[0]);
    };

    const handleIssueTypeDropdownChange = (e) => {
        const selectedIssueType = e.target.value;
        setIssueSubTypeNew(selectedIssueType);
        // setIssueTypeDropdown(selectedIssueType);
        // updateTicketData("issueType", selectedIssueType);
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
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

    const handleTicketDataChange = (e) => {
        const { name, value } = e.target;
        setTicketData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const checkFileFormat = (file) => {
        if (!file) {
            return false;
        } else if (file.size > 5242880) {
            return true;
        }
        const extension = file.name.split('.').pop().toLowerCase();
        const allowedFormats = ['pdf', 'png', 'jpg', 'mp4'];
        if (!allowedFormats.includes(extension)) {
            return true;
        }
        return false;
    }

    const riseTicket = () => {
        const updatedTicketData = {
            ...ticketData,
            issueType: issuetypeNew,
            issueSubType: issueSubtypeNew,
        };
        setContactErr(false);
        setShowLoading(true);
        setContactNumErr(false);
        setEmailErr(false);

        if (ticketLocation === "") {
            notifyWarn("Please Select the location");
            setShowLoading(false);
            return;
        }

        if (issuetypeNew === "Other" || issueSubtypeNew.includes("Other")) {
            if (updatedTicketData.subject === "") {
                notifyWarn("Please fill the ticket title");
                setShowLoading(false);
                return;
            }
        }

        if (issuetypeNew !== "Other") {
            if (issueSubtypeNew === '') {
                notifyWarn("Please select issue sub type");
                setShowLoading(false);
                return;
            }
        }

        if (updatedTicketData.contactName === "") {
            notifyWarn("Please fill the contact Name");
            setContactErr(true);
            setShowLoading(false);
        } else if (updatedTicketData.contactNumber === "") {
            notifyWarn("Please fill the contact Number");
            setContactNumErr(true);
            setShowLoading(false);
        } else if (updatedTicketData.email === "") {
            notifyWarn("Please fill the email id");
            setEmailErr(true);
            setShowLoading(false);
        } else if (updatedTicketData.contactNumber.length > 10) {
            notifyWarn("Please enter only 10 numbers");
            setShowLoading(false);
        } else if (checkFileFormat(attachment)) {
            notifyWarn("File size cannot be more than 5MB and must be in PDF, PNG, JPG, or MP4 format");
            setShowLoading(false);
        } else {
            setShowLoading(true);
            const updatedTicketData = {
                ...ticketData,
                issueType: issuetypeNew,
                issueSubType: issueSubtypeNew,
            };

            const ticketDetails = {
                subject: updatedTicketData.subject,
                description: updatedTicketData.description,
                location: ticketLocation,
                issue_type: updatedTicketData.issueType,
                custom_issue_subtype: updatedTicketData.issueSubType,
                contact_name: updatedTicketData.contactName,
                contact_phone: updatedTicketData.contactNumber,
                contact_email: updatedTicketData.email,
                contact_email_alternative: updatedTicketData.alternateEmail,
                customer: companyName,
                vent_number: updatedTicketData.ventNumber,
                priority: issuePriority,
                creation_via: "Ticket",
            }

            if (attachment) {
                const reader = new FileReader();
                reader.readAsDataURL(attachment);
                reader.onloadend = function () {
                    const base64data = reader.result;

                    // Include base64 data in ticketDetails
                    ticketDetails.file = base64data;
                    ticketDetails.fileName = attachment.name.split('.')[0];
                    handleClose1();

                    //,   Axios call
                    createIssue(ticketDetails);

                    //,Frappe Hook to create Issue 
                    // const create = createDoc('Issue', ticketDetails).then(() => {
                    //     notifySuccess('Ticket created Successfully');
                    //     setTimeout(() => {
                    //         setShowLoading(false);
                    //         setOpen1(false);
                    //         mutate();
                    //     }, 1000);
                    // }).catch((err) => {
                    //     console.log("inside catch " + JSON.stringify(err.message));
                    //     setShowLoading(false);
                    //     notifyError(err.message);
                    // })
                }
            } else {
                handleClose1();
                createIssue(ticketDetails);
                console.log("ticket details = ", ticketDetails);
                setShowLoading(false);
            }
        }
    }

    const createIssue = (ticket) => {
        //,Custom api to create an Issue
        axios.post('/api/method/novelite.api.api.issue', ticket)
            .then((res) => {
                console.log("Response = ", res);
                notifySuccess('Ticket created Successfully');
                setTimeout(() => {
                    setShowLoading(false);
                    setOpen1(false);
                    mutate();
                }, 1000);
            }).catch((err) => {
                console.log("inside catch " + JSON.stringify(err.message));
                setShowLoading(false);
                notifyError(err.message);
            })
    }

    //----------------------------------------------------------Location dropdown-----------------------------------------------//
    // const handleLocationChange = (e) => {
    //     let changedLocation = e.target.value;
    //     setFilterLocation(changedLocation);
    //     setTicketData(prev => ({ ...prev, location: changedLocation }));
    //     dispatch(setLocation(changedLocation));
    //     console.log("Location = ", changedLocation);
    //     if (e.target.value !== 'Property Location') {
    //         localStorage.setItem('location', changedLocation);
    //     }
    // }

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

                {/* -------------------------------------Location Dropdown-------------------------------------------  */}
                {/* <Tooltip disableFocusListener disableTouchListener placement="top" TransitionComponent={Zoom} title="Property for which you want to rise ticket">
                    {confirmedLocations?.length >= 2 ?
                        (<Box>
                            <FormControl fullWidth sx={{ mt: 2 }} >
                                <InputLabel id="demo-simple-select-label">Property Location</InputLabel>
                                <Select
                                    // disabled={confirmedLocations?.length === 2}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filterLocation}
                                    label="Property Location"
                                    onChange={handleLocationChange}
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
                </Tooltip> */}
                {/* -------------------------------------Location Dropdown-------------------------------------------  */}
                <Tooltip disableFocusListener disableTouchListener placement="top" TransitionComponent={Zoom} title="Property for which you want to rise ticket">
                    <Box>
                        <FormControl fullWidth sx={{ mt: 2 }} >
                            <InputLabel id="demo-simple-select-label" required>Property Location</InputLabel>
                            <Select
                                // disabled={confirmedLocations?.length === 2}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={ticketLocation}
                                label="Property Location"
                                onChange={(e) => { setTicketocation(e.target.value) }}
                            >
                                {allLocations?.map((location) => {
                                    return (
                                        <MenuItem key={location.short_name} value={location.short_name}>{location.location_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Tooltip>

                {/* -------------------------------------Issue type, Issue subtype dropdown-------------------------------------------  */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel required>Issue type</InputLabel>
                    <Select label="Issue type" value={issuetypeNew} onChange={handleIssueDropdownChange}>
                        {issueTypesArray?.map(issue => (
                            <MenuItem key={issue.name} value={issue.name}>{issue.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {issuetypeNew !== "Other" && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel required>Issue sub type</InputLabel>
                        <Select
                            // value={issueTypeDropdown}
                            label="Issue sub type"
                            onChange={handleIssueTypeDropdownChange}
                        >
                            {issueSubTypesArray && issueSubTypesArray?.map(subType => (
                                <MenuItem key={subType.name} value={subType.name}>{subType.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* -------------------------------------Ticket subject-------------------------------------------  */}
                {issuetypeNew === "Other" || issueSubtypeNew.includes("Other") ? (
                    <TextField
                        label="Ticket Title"
                        variant="standard"
                        sx={{ width: '100%', mt: 2, ml: 1 }}
                        name="subject"
                        value={ticketData.subject}
                        onChange={handleInputChange}
                    />
                ) : null}

                {/* -------------------------------------Vent number-------------------------------------------  */}
                {issuetypeNew === 'AC' ? <Stack sx={{ mt: 1 }} justifyContent='end' alignItems='center' flexDirection='row'>
                    <TextField
                        label="Vent number"
                        name='ventNumber'
                        variant="standard"
                        sx={{ width: '100%', mt: 2, ml: 1 }}
                        // value={}
                        onChange={handleInputChange}
                    />
                    <HtmlTooltip placement="left" TransitionComponent={Zoom} sx={{ transform: 'translate(-14px, 51px)' }}
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={() => { setOpenToolTip(stubFalse) }}
                        open={openToolTip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={
                            <>
                                <img src={acVent}
                                    width='100%' alt="img"
                                />
                                <Typography variant='p'>AC vent Number</Typography>
                            </>
                        }>
                        <HelpIcon onClick={() => { setOpenToolTip(!openToolTip) }} sx={{ mb: '-2rem' }} />
                    </HtmlTooltip>
                </Stack> : null}

                {/* -------------------------------------Ticket Description-------------------------------------------  */}
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

                {/* -------------------------------------Priority-------------------------------------------  */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select label="Priority" value={issuePriority} onChange={(e) => { setIssuePriority(e.target.value) }}>
                        {priorityOptions?.map(element => (
                            <MenuItem key={element} value={element}>{element}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* -------------------------------------Attach file-------------------------------------------  */}
                <Box>
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2 }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<AttachFileIcon />}
                        >
                            Attach file
                            <VisuallyHiddenInput type="file" onChange={(e) => setAttachment(e.target.files[0])} />
                        </Button>
                        {attachment && <Typography variant='p'>{attachment.name}</Typography>}
                    </Box>
                    <Typography pt={1} variant='body2' color="grey">Allowed formats 'png', 'jpg', 'jpeg', 'pdf' upto 5MB </Typography>
                </Box>

                {/* -------------------------------------Contact Details-------------------------------------------  */}
                <DialogTitle sx={{ ml: "-2.2em", mb: "-1rem" }}>Contact Details</DialogTitle>

                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row", ls: "row" }, gap: 2 }}>
                    <Box>
                        {contactErr ?
                            (<TextField error label="Contact Name" variant="standard" required style={{ width: '100%', marginTop: '16px' }} name="contactName" onChange={handleInputChange} />)
                            :
                            (<TextField label="Contact Name" variant="standard" required style={{ width: '100%', marginTop: '16px' }} name="contactName" onChange={handleInputChange} />)
                        }
                        {
                            contactNumErr ?
                                (<TextField error label="Contact Number" variant="standard" required style={{ width: '100%', marginTop: '16px' }} name="contactNumber" onChange={handleInputChange} />)
                                :
                                (<TextField label="Contact Number" variant="standard" required style={{ width: '100%', marginTop: '16px' }} name="contactNumber" onChange={handleInputChange} />)
                        }
                    </Box>
                    <Box>
                        {
                            emailErr ?
                                (<TextField label="Email" error required variant="standard" style={{ width: '100%', marginTop: '16px' }} name="email" value={ticketData.email} onChange={handleInputChange} />)
                                :
                                (<TextField label="Email" required variant="standard" style={{ width: '100%', marginTop: '16px' }} name="email" value={ticketData.email} onChange={handleInputChange} />)
                        }
                        <TextField label="Alternate Email (Optional)" variant="standard" style={{ width: '100%', marginTop: '16px' }} name="alternateEmail" onChange={handleInputChange} />
                    </Box>
                </Box>

                {/* <Button variant="contained" sx={{ mt: 2 }} onClick={riseTicket} disabled={confirmedLocations?.length === 1 || showLoading}>
                    {showLoading ? <CircularProgress color="inherit" size={26} /> : "Submit"}
                </Button> */}
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
