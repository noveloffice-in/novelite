import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFrappeCreateDoc } from 'frappe-react-sdk';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    let value = ['Expansion', 'Downsize'];
    let subActions = ['Seats', 'Aminites', 'Both', 'Other']

    //-----------------------------------------------------------Toast functions--------------------------------------------------//
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });

    const handleChange = (event) => {
        setAction(event.target.value);
    };

    const handleSubAction = (event) => {
        setSubAction(event.target.value);
    };

    const { createDoc } = useFrappeCreateDoc();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let form = new FormData(e.target);
        let formObj = Object.fromEntries(form.entries());

        let { action, sub_action, description } = formObj;

        if (action !== "" && sub_action !== "" && description !== "") {
            createDoc('Expansion and Dowsize', formObj)
                .then((res) => {
                    notifySuccess("Application submitted successfully");
                    setLoading(false);
                }).catch((err) => {
                    notifyError(err);
                    console.log(err);
                })
        }

        console.log("loading = ", loading);
    }

    return (
        <PageContainer title="Book Slots - Novel Office">
            <Breadcrumb title="Booking Slots" items={BCrumb} />
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: { xs: "90%", md: "50%", ls: "50%" },
                }}>
                    <Box sx={{ minWidth: 120 }}>
                        <form onSubmit={handleSubmit} style={{ minWidth: 120 }}>
                            <FormControl fullWidth>
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
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label" >Sub action</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subAction}
                                    name='sub_action'
                                    label="Sub action"
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

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <Box>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
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
                        {/* <TextField id="outlined-basic" label="Seats" variant="outlined" sx={{ mt: 2 }} />
                        <TextField id="outlined-basic" label="cabins" variant="outlined" sx={{ mt: 2 }} /> */}
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
