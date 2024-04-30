<h3>Hello Team,</h3>

<p>A <b>{{doc.room_type}}</b>booking request has been made by <b>"{{ doc.customer }}"</b> on <b>"{{ doc.booking_date }}"</b> at <b>"{{ doc.from_time }}"</b>.</p>

<h4>More Details:</h4>

<ul>
    <li>Location: {{ doc.location }}</li>
    <li>Room Name: {{ doc.room }}</li>
    <li>Booking Date: {{ doc.booking_date }}</li>
    <li>From Time: {{ doc.from_time }}</li>
    <li>To Time: {{ doc.to_time }}</li>
    <li>Description: {{ doc.description }}</li>
</ul>

<p>Kindly check the availability and confirm.</p>
