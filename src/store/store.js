import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activityReducer';

export default configureStore({
  reducer: {
    activity: activityReducer,
  },
});
