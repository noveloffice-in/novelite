import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
  numberOfNotifications: 0,
  owner: ""
};

export const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification.push(action.payload);
    },
    resetNotification: (state, action) => {
      state.notification = [];
    },
    setNotificationNumber: (state, action) => {
      state.numberOfNotifications = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    }
  },
});

export const { setNotification, setNotificationNumber, resetNotification, setOwner } = NotificationSlice.actions;

export default NotificationSlice.reducer