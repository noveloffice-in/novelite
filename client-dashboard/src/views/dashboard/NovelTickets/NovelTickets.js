import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import NovelTicketFilter from './NovelTicketFilter';
import NovelTicketsList from './NovelTicketsList';
import { useSelector } from 'react-redux';
import { useFrappeDocTypeEventListener, useFrappeDocumentEventListener, useFrappeEventListener, useFrappeGetDoc, useFrappeGetDocCount } from 'frappe-react-sdk';
import io from 'socket.io-client';

const BCrumb = [
    {
        to: '/dashboard',
        title: 'Home',
    },
    {
        title: 'Tickets',
    },
];

export default function NovelTickets() {

    const userEmail = useSelector((state) => state.novelprofileReducer.userEmail);
    const userLocation = useSelector((state) => state.novelprofileReducer.location);
    const companyName = useSelector((state) => state.novelprofileReducer.companyName);

    const [filterLocation, setFilterLocation] = useState(userLocation);

    useEffect(() => {
        let location = localStorage.getItem('location');
        if (location !== 'Property Location') {
            setFilterLocation(location);
        }
    }, [userLocation, setFilterLocation]);

    if (filterLocation === null) {
        setFilterLocation("ALL");
    }

    //-> -------------------------------------------Checking Socket---------------------------------------------------------
    



    //? Where should we use useSWRSubscription

    // socket.io("connect", ()=>{
    //     console.log("Socket.io  is Connected");
    // })

    // useEffect(() => {
    //     // Assuming your Frappe server is running on the same host but different port
    //     const socket = io('http://localhost:9000');

    //     socket.on('connect', () => {
    //         console.log('Connected to Frappe WebSocket server');
    //     });

    //     // Listen for the todo_update event
    //     socket.on('todo_update', (data) => {
    //         console.log('Document Update:', data);
    //         // Perform actions based on the update
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         socket.off('todo_update');
    //         socket.disconnect();
    //     };
    // }, []);

    // useDocumentUpdateListener();


    // socket.on('message', (message) => {
    //     console.log("Message from server is = ", message);
    // })
    //-> ----------------------------------------Checking Server side events----------------------------------------------------

    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const eventSource = new EventSource('http://10.80.4.54:8000/api/method/novelite.api.messages.stream');

    //     eventSource.onmessage = (event) => {
    //         console.log("Event = ", event);
    //         const eventData = JSON.parse(event.data);
    //         setMessages(eventData.message);
    //     };

    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);

    // console.log("Messages = ", messages);


    //--------------------------------------------------------Getting total count-------------------------------------------//
    const { data } = useFrappeGetDocCount(
        'Issue',
        filterLocation === "ALL" ? ['raised_by', '=', userEmail] : [['raised_by', '=', userEmail], ['location', '=', filterLocation]],
        false,
    );
    const totalPages = Math.ceil(data / 10) || 1;


    //--------------------------------------------------------Fetch Lead's Locations-----------------------------------------//
    // Fetch location of customers from leads
    const getLeadsId = () => {
        const { data, error, isValidating, mutate } = useFrappeGetDoc(
            'Customer',
            `${companyName}`
        );
        // console.log("CompanyName = ", companyName);
        return data?.leads.map(lead => lead.confirmed_location);
    }

    var confirmedLocations = getLeadsId();
    confirmedLocations = confirmedLocations?.map(location => {
        switch (location) {
            case 'NTP':
                return { shortName: location, fullName: 'NTP-Kudlu Gate' };
            case 'NOM':
                return { shortName: location, fullName: 'NOM-Marathahalli' };
            case 'NOC':
                return { shortName: location, fullName: 'NOC-MG Road' };
            case 'NOQ':
                return { shortName: location, fullName: 'NOQ-Brigade Road' };
            case 'NOW':
                return { shortName: location, fullName: 'NOW-Whitefield' };
            case 'NBP':
                return { shortName: location, fullName: 'NBP-Adugodi' };
            case 'NOB':
                return { shortName: location, fullName: 'NBP-ITPL' };
            default: return { shortName: location, fullName: location };
        }
    });
    confirmedLocations?.unshift({ shortName: "ALL", fullName: "ALL" });

    //-----------------------------------------------------------END---------------------------------------------------------//

    return (
        <PageContainer title="Tickets - Novel Office" description="this is Note page">
            <Breadcrumb title="Tickets" items={BCrumb} />
            <ChildCard>
                <NovelTicketFilter userEmail={userEmail} filterLocation={filterLocation} />
                <NovelTicketsList userEmail={userEmail} totalPages={totalPages} confirmedLocations={confirmedLocations}
                    filterLocation={filterLocation} setFilterLocation={setFilterLocation} />
            </ChildCard>
        </PageContainer>
    )
}
