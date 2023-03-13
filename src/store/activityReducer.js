import * as types from '../constants/actionTypes';

const initialState = {
  activities: [],
  loading: false,
  error: '',
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACTIVITIES_REQUEST:
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
      return {
        ...state,
        activities: [...state.activities, action.payload],
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
        console.log("NO!")
        return state;
      }
      activities[index] = updatedActivity;
      return {
        ...state,
        activities,
      };
    }
    case types.DELETE_ACTIVITY: {
      console.log(action.payload); //
      const key = action.payload;
      const updatedActivities = state.activities.filter(activity => activity.key !== key);
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
