import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  companyName: "",
  userEmail: "",
  account_type: "",
  location: "",
  userImage: "",
  leadsID:[]
};

export const NovelProfileSlice = createSlice({
  name: 'UserProfile',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setAccountType: (state, action) => {
      state.account_type = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setLeadsID: (state, action) => {
      state.leadsID = action.payload;
    }
  },
});

export const { setUser, setUserEmail, setAccountType, setLocation, setCompanyName, setUserImage, setLeadsID } = NovelProfileSlice.actions;

export default NovelProfileSlice.reducer