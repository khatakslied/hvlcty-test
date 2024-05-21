import * as types from '../constants/actionTypes';
import { saveActivities, loadActivities } from '../utils/localStorage';

const initialState = {
  activities: loadActivities() || [],
  loading: false,
  error: '',
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACTIVITIES_REQUEST:
      saveActivities(action.payload);
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload,
        error: '',
      };
    case types.FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
        activities: [],
        error: action.payload,
      };
    case types.ADD_ACTIVITY:
      const updatedActivities = [...state.activities, action.payload];
      saveActivities(updatedActivities);
      return {
        ...state,
        activities: updatedActivities,
      };
    case types.MOVE_ACTIVITY: {
      const { key, offset } = action.payload;
      const activities = [...state.activities];
      const index = activities.findIndex((a) => a.key === key);
      const newIndex = index + offset;
      if (newIndex < 0 || newIndex >= activities.length) {
        return state;
      }
      const activity = activities[index];
      const newActivity = activities[newIndex];
      activities[index] = newActivity;
      activities[newIndex] = activity;
      saveActivities(activities);
      return {
        ...state,
        activities,
      };
    }
    case types.UPDATE_ACTIVITY: {
      const updatedActivity = action.payload;
      const activities = [...state.activities];
      const index = activities.findIndex((a) => a.key === updatedActivity.key);
      if (index < 0) {
        return state;
      }
      activities[index] = updatedActivity;
      saveActivities(activities);
      return {
        ...state,
        activities,
      };
    }
    case types.DELETE_ACTIVITY: {
      const key = action.payload;
      const updatedActivities = state.activities.filter(activity => activity.key !== key);
      saveActivities(updatedActivities);
      return {
        ...state,
        activities: updatedActivities,
      };
    }
    default:
      return state;
  }
};

export default activityReducer;
