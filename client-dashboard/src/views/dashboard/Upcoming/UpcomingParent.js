import React from 'react'

export default function UpcomingParent({ Component }) {

    let bookings = {
        heading: "Bookings feature upcoming",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
    }
    let gatepass = {
        heading: "Gate Pass feature upcoming",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
    }

    if (window.location.href.split("/")[4] === 'location') {
        return (<Component tittle={"Bookings"} bookings={bookings} />)
    } else if (window.location.href.split("/")[4] === 'gatepass') {
        return (<Component tittle={"Gate Pass"} bookings={gatepass} />)
    }
    return (<Component tittle={"Tittle"} />)
}
