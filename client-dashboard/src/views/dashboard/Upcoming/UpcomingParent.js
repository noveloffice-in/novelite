import React from 'react'

export default function UpcomingParent({ Component }) {

    let bookings = {
        heading: "Bookings feature upcoming",
        content: "You'll soon be able to conveniently reserve meeting and conference rooms directly within the app. Stay tuned for this exciting feature update!"
    }
    let gatepass = {
        heading: "Gate pass feature upcoming",
        content: "The gate pass feature will soon be seamlessly integrated into our web app, offering enhanced convenience for all users. Stay tuned for this exciting addition to manage your access with ease!"
    }

    if (window.location.href.split("/")[4] === 'location') {
        return (<Component tittle={"Bookings"} bookings={bookings} />)
    } else if (window.location.href.split("/")[4] === 'gatepass') {
        return (<Component tittle={"Gate pass"} bookings={gatepass} />)
    }
    return (<Component tittle={"Tittle"} />)
}
