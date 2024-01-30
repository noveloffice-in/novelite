import React from 'react'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb'
import {
    Typography,
    Grid,
    InputAdornment,
    Stack,
    Button,
    Box,
    Card,
    FormGroup,
    FormControlLabel,
    Divider,
} from '@mui/material';
import { IconHelp } from '@tabler/icons';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../../components/forms/theme-elements/CustomOutlinedInput';
import ParentCard from '../../../components/shared/ParentCard';

//Form 2
import {
    Stepper,
    Step,
    StepLabel,
    Alert,
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

const steps = ['Account', 'Profile', 'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    
    const isStepOptional = (step) => step === 1;

    const isStepSkipped = (step) => skipped.has(step);

    const BCrumb = [
        {
            to: '/dashboard',
            title: 'Home',
        },
        {
            to: '/location',
            title: 'Location',
        },
        {
            to: '/category',
            title: 'Category',
        },
        {
            to: '/bookings',
            title: 'Bookings',
        },
        {
            to: '/bookingslot',
            title: 'Booking Slots',
        },
        {
            to: '/checkout',
            title: 'Checkout',
        },
    ];


    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // eslint-disable-next-line consistent-return
    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <CustomFormLabel htmlFor="Name">Name</CustomFormLabel>
                        <CustomTextField
                            id="Name"
                            variant="outlined"
                            fullWidth
                        />
                        <CustomFormLabel htmlFor="Email">Email</CustomFormLabel>
                        <CustomTextField
                            id="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                        />
                        <CustomFormLabel htmlFor="Password">Password</CustomFormLabel>
                        <CustomTextField
                            id="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <CustomFormLabel htmlFor="Fname">First Name</CustomFormLabel>
                        <CustomTextField
                            id="Fname"
                            variant="outlined"
                            fullWidth
                        />
                        <CustomFormLabel htmlFor="Lname">Last Name</CustomFormLabel>
                        <CustomTextField
                            id="Lname"
                            type="text"
                            variant="outlined"
                            fullWidth
                        />
                        <CustomFormLabel htmlFor="Address">Address</CustomFormLabel>
                        <CustomTextField
                            id="Address"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <Box>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="cs-co" sx={{ mt: 0 }}>
                                                Card Number
                                            </CustomFormLabel>
                                            <CustomTextField id="cs-co" placeholder="1250 4521 5630 1540" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CustomFormLabel htmlFor="cs-name" sx={{ mt: 0 }}>
                                                Name
                                            </CustomFormLabel>
                                            <CustomTextField id="cs-name" placeholder="John Deo" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <CustomFormLabel htmlFor="cs-exdate" sx={{ mt: 0 }}>
                                                Exp. Date
                                            </CustomFormLabel>
                                            <CustomTextField id="cs-exdate" placeholder="MM/YY" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <CustomFormLabel htmlFor="cs-code" sx={{ mt: 0 }}>
                                                CCV Code
                                            </CustomFormLabel>
                                            <CustomOutlinedInput
                                                id="cs-code"
                                                placeholder="456"
                                                fullWidth
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconHelp width="20" />
                                                    </InputAdornment>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );
            default:
                break;
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Stack>
            <Breadcrumb title="Checkout / Payment" items={BCrumb} style={{ marginBottom: "none" }} />

            <PageContainer title="Checkout - Novel Office">
                <ParentCard title='Form'>
                    <Box width="100%">
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Stack spacing={2} mt={3}>
                                    <Alert severity='success' mt={2}>All steps completed - you&apos;re finished</Alert>

                                    <Box textAlign="right">
                                        <Button onClick={handleReset} variant="contained" color="error">
                                            Reset
                                        </Button>
                                    </Box>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Box>{handleSteps(activeStep)}</Box>

                                <Box display="flex" flexDirection="row" mt={3}>
                                    <Button
                                        color="inherit"
                                        variant="contained"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box flex="1 1 auto" />

                                    <Button
                                        onClick={handleNext}
                                        variant="contained"
                                        color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </ParentCard>
            </PageContainer>
        </Stack>
    )
}
