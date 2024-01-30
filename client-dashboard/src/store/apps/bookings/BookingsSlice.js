import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookingLocation: "",
    roomCategory:"",
    roomName: "",
    selectedSlots: [],
    price:""
  };

  export const BookingsSlice = createSlice({
    name: 'Bookings',
    initialState,
    reducers: {
      setBookingLocation: (state, action) => {
        state.bookingLocation = action.payload;
      },
      setRoomCategory: (state, action) => {
        state.roomCategory = action.payload;
      },
      setRoomName: (state, action) => {
        state.roomName = action.payload;
      },
      setSelectedSlotsStore: (state, action) => {
        state.selectedSlots = action.payload;
      },
      setPrice: (state, action) => {
        state.price = action.payload;
      }
    },
  });

  export const {setBookingLocation, setRoomCategory, setRoomName, setSelectedSlotsStore, setPrice} = BookingsSlice.actions;

  export default BookingsSlice.reducer