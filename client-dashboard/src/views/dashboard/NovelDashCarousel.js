import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

//Images
import img1 from '../../assets/images/offices/1.webp'
import img2 from '../../assets/images/offices/2.webp'
import img3 from '../../assets/images/offices/3.webp'
import img4 from '../../assets/images/offices/4.webp'
import img5 from '../../assets/images/offices/5.webp'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: `${img1}`,
    },
    {
        label: 'Bird',
        imgPath:`${img2}`,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: `${img3}`,
    },
    {
        label: 'Goč, Serbia',
        imgPath:`${img4}`,
    },
    // {
    //     label: 'Goč, Serbia',
    //     imgPath:`${img5}`,
    // },
];


export default function NovelDashCarousel() {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: '100vw', flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: { xs: 200, md: 350, lg: 350 },
                                    display: 'block',
                                    maxWidth: '90vw',
                                    overflow: 'hidden',
                                    width: { xs: '90%', md: '70%', lg: '70%' },
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{visibility:'hidden'}}
                        >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{visibility:'hidden'}}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>

    );
}
