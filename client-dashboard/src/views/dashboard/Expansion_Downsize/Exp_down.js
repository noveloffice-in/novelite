import React, { useEffect } from 'react'
import PageContainer from '../../../components/container/PageContainer'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        to: '/Expansion_Downsize',
        title: 'Expansion-Downsize',
    },
];

export default function () {

    const [action, setAction] = React.useState('Expansion');
    const [subAction, setSubAction] = React.useState('Seats');
    const [loading, setLoading] = React.useState(false);
    const [customerLocation, setCustomerLocation] = React.useState("");
    const [locationEmpty, setLocationEmpty] = React.useState(false);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);
    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);

    let value = ['Expansion', 'Downsize'];
    let subActions = ['Seats', 'Amenities', 'Both', 'Others']

    //-----------------------------------------------------------Toast functions--------------------------------------------------//
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });
    const notifyWarn = (msg) => toast.warn(msg, { toastId: "error" });

    //--------------------------------------------------------Locations fetching------------------------------------------------------//
    const { data: allLocations, error, isValidating } = useFrappeGetDocList('Property Location', {
        fields: ['location_name', 'short_name']
    });

    const handleChange = (event) => {
        setAction(event.target.value);
    };

    const handleSubAction = (event) => {
        setSubAction(event.target.value);
    };
    
    const handleLocation = (event) => {
        setCustomerLocation(event.target.value);
        setLocationEmpty(false);
    };

    const { createDoc } = useFrappeCreateDoc();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if(customerLocation === ""){
            setLocationEmpty(true);
            setLoading(false);
            return;
        } else {
            
            setLocationEmpty(false);
            let form = new FormData(e.target);
            let formObj = Object.fromEntries(form.entries());
            formObj.customer = companyName;
            formObj.customer_email = userEmail;
            formObj.location = customerLocation;
    
            let { action, sub_action } = formObj;
            console.log("Object = ", formObj);
    
            if (action !== "" && sub_action !== "") {
                createDoc('Expansion and Dowsize', formObj)
                    .then((res) => {
                        notifySuccess("Application submitted successfully");
                        setLoading(false);
                    }).catch((err) => {
                        notifyError(err);
                        setLoading(false);
                        console.log(err);
                    })
            } else {
                notifyWarn("please fill all the details");
                setLoading(false);
            }
        }

    }

    return (
        <PageContainer title="Expansion/Downsize - Novel Office">
            <Breadcrumb title="Expansion/Downsize" items={BCrumb} />
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: { xs: "90%", md: "50%", ls: "50%" },
                }}>
                    <Box sx={{ minWidth: 120 }}>
                        <form onSubmit={handleSubmit} style={{ minWidth: 120 }}>

                            {/* Location  */}
                            <FormControl fullWidth sx={{ mt: 2 }} >
                                <InputLabel id="demo-simple-select-label" error={locationEmpty} required>Location</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Location"
                                    onChange={handleLocation}
                                >
                                    {allLocations?.map((location) => {
                                        return (
                                            <MenuItem key={location.location_name} value={location.location_name}>{location.location_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            {/* Expansion / Downsize */}
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label">Expansion / Downsize</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name='action'
                                    id="demo-simple-select"
                                    value={action}
                                    label="Expansion / Downsize"
                                    onChange={handleChange}
                                >
                                    {
                                        value.map((element) => {
                                            return (
                                                <MenuItem value={element} key={element}>{element}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                            {/* Service */}
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label" >Service</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subAction}
                                    name='sub_action'
                                    label="Service"
                                    onChange={handleSubAction}
                                >
                                    {
                                        subActions.map((element) => {
                                            return (
                                                <MenuItem value={element} key={element}>{element}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                            {/* Description  */}
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <Box>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Additional info"
                                        multiline
                                        rows={2}
                                        style={{ width: '100%' }}
                                        name="description"
                                    />
                                </Box>
                            </FormControl>

                            <Button type='submit' variant="contained" sx={{ mt: 2 }} disabled={loading}>
                                {loading ? <CircularProgress color="inherit" size={26} /> : "Submit"}
                            </Button>

                        </form>
                        {/* <TextField onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" sx={{ mt: 2 }} />
                        <Button onClick={resetPassword}>Reset Password</Button> */}
                        {/* <TextField id="outlined-basic" label="cabins" variant="outlined" sx={{ mt: 2 }} /> */}
                    </Box>
                    {/* ---------------------------------------Toast Container Starts------------------------------------ */}
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

                </Box>
            </>
        </PageContainer>
    )
}
