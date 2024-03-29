// import { Button, Typography } from '@mui/material';
// import { Box } from '@mui/system';
// import { useFrappeDocTypeEventListener, useFrappeEventListener, useFrappeGetDocCount, useFrappeGetDocList, useFrappeUpdateDoc } from 'frappe-react-sdk'
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';

// export default function Notifications() {

//     const fullName = useSelector((state) => state.novelprofileReducer.fullName);
//     let notifyData = null;

//     const { updateDoc, loading } = useFrappeUpdateDoc()
//     const resetNotificationCount = () => {
//         localStorage.setItem('noti', 0);
//         // console.log("Reset");
//         notifyData?.forEach(notification => {
//             updateDoc("Notifications CD", notification.name, { read: 'yes' })
//         });
//         mutate();
//     }

//     setTimeout(() => {
//         mutate();
//     }, 1000);

//     useFrappeDocTypeEventListener("Notifications CD", (e) => {
//         console.log("Hello ");
//     })
//     useFrappeEventListener('comment_added', (data) => {
//         console.log("Event = " + data);
//     })

//     const { data, error, isValidating, mutate } = useFrappeGetDocList('Notifications CD', {
//         fields: ['name', 'customer_name', 'notification_message', 'send_to_all', 'read'],
//         filters: [['read', '=', 'no'], ['customer_name', '=', fullName]],
//         orderBy: {
//             field: 'creation',
//             order: 'asc', //desc
//         },
//     });

//     if (data) {
//         notifyData = data;
//     }

//     return (
//         <Box>
//             {data && data.map((notification) => {
//                 return (
//                     <Typography key={notification.notification_message}>{notification.notification_message}</Typography>
//                 )
//             })}
//             {!loading && <Button onClick={resetNotificationCount}>Mark as read</Button>}
//         </Box>
//     )
// }
