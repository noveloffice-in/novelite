import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/tickets/TicketSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EcommerceReducer from './apps/eCommerce/EcommerceSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import BlogReducer from './apps/blog/BlogSlice';
import NovelprofileReducer from './apps/userProfile/NovelProfileSlice';
import BookingsSliceReducer from './apps/bookings/BookingsSlice'

//For persist
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  customizer: CustomizerReducer,
  // chatReducer: ChatsReducer,
  // emailReducer: EmailReducer,
  // notesReducer: NotesReducer,
  // contactsReducer: ContactsReducer,
  ticketReducer: TicketReducer,
  // ecommerceReducer: EcommerceReducer,
  // userpostsReducer: UserProfileReducer,
  // blogReducer: BlogReducer,
  novelprofileReducer: NovelprofileReducer,
  bookingsSliceReducer : BookingsSliceReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
