<h3>Hi Sir/Madam,</h3>

<p>I want to book a <b>{{doc.room_type}}</b>, Please find the booking details below.</p>

<h4>Booking Details</h4>

<ul>
    <li>Customer: {{ doc.customer }}</li>
    <li>Location: {{ doc.location }}</li>
    <li>Room Type: {{ doc.room_type }}</li>
    <li>Room Name: {{ doc.room }}</li>
    <li>Booking Date: {{ doc.booking_date }}</li>
    <li>From Time: {{ doc.from_time }}</li>
    <li>To Time: {{ doc.to_time }}</li>
    <li>Description: {{ doc.description }}</li>
</ul>