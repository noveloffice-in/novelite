import React from 'react'
import { Box } from '@mui/system'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material/styles';

export default function Slots({ slotsData, selectedSlots, setSelectedSlots, intervals }) {
    const theme = useTheme(); // Access the current theme

    //--------------------------------------------------------Sorting Slots only for 24 hrs format------------------------------------------------------//
    // Function to convert slot time to minutes since midnight
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Custom sort function for slots
    const sortSlots = (slots) => {
        return slots.sort((a, b) => {
            const startTimeA = timeToMinutes(a.split(' - ')[0]);
            const startTimeB = timeToMinutes(b.split(' - ')[0]);
            return startTimeA - startTimeB;
        });
    };
    //--------------------------------------------------------Sorting Slots for all Time formats------------------------------------------------------//
    // Function to convert slot time to a comparable format 
    // const convertTimeTo24Hour = (time) => {
    //     let [hours, minutesPart] = time.split(':');
    //     const minutes = minutesPart.substring(0, 2);
    //     const amPm = minutesPart.substring(3);

    //     if (amPm === 'PM' && hours !== '12') {
    //         hours = parseInt(hours, 10) + 12;
    //     } else if (amPm === 'AM' && hours === '12') {
    //         hours = '00';
    //     }

    //     return `${hours}:${minutes}`;
    // };
    // // Custom sort function for slots
    // const sortSlots = (slots) => {
    //     return slots.sort((a, b) => {
    //         const startTimeA = convertTimeTo24Hour(a.split(' - ')[0]);
    //         const startTimeB = convertTimeTo24Hour(b.split(' - ')[0]);
    //         return startTimeA.localeCompare(startTimeB);
    //     });
    // };

    // console.log("slotsData = ", slotsData);

    //--------------------------------------------------------Checking Booked Dates and disbling------------------------------------------------------//

    const isSlotBooked = (slotId) => {
        let mergedArray = [];
        slotsData?.forEach((element) => {
            mergedArray = mergedArray.concat(element.booking_timings.split(','));
        })
        return mergedArray?.some(slot => slot === slotId);
    };

    //--------------------------------------------------------Adding Selected Slots to an Array------------------------------------------------------//

    const handleFormat = (event, time) => {
        const sortedSlots = sortSlots(time);
        console.log(sortedSlots);
        setSelectedSlots(sortedSlots);
        // setSelectedSlots(time);
    };

    //------------------------------------------------------------------------END---------------------------------------------------------------------//
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(8, 1fr)', ls: 'repeat(9, 1fr)' }, gap: '16px' }}>
            {intervals?.length !== 0 && intervals.map((el, i) => {
                return (
                    <ToggleButtonGroup
                        value={selectedSlots}
                        onChange={handleFormat}
                        aria-label="text formatting"
                        key={el + i}
                    >
                        <ToggleButton value={el} disabled={isSlotBooked(el)} variant="contained" key={i}
                            sx={{
                                width: '100%',
                                border: theme.palette.mode === 'dark' ? '1px solid grey' : '1px solid grey',
                                // boxShadow: theme.palette.mode === 'dark' ? '1px 1px 2px grey' : '1px 1px 2px grey',
                                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#154c79' : '#5462D6',
                                    color: 'white',
                                    boxShadow: theme.palette.mode === 'dark' ? '2px 2px 2px black' : '2px 2px 2px grey',
                                },
                                // '&:hover': {
                                //     backgroundColor: 'gray',
                                //     color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                // },
                                '&.Mui-disabled': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                    color: theme.palette.mode === 'dark' ? 'grey' : 'grey',
                                }
                            }}
                        >
                            {el.split('-')[0]} - {el.split('-')[1]}
                        </ToggleButton>
                    </ToggleButtonGroup>
                )
            })}
        </Box>
    )
}
