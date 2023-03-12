import * as types from '../constants/actionTypes';
import axios from 'axios';

// Action creators
export const fetchActivitiesRequest = () => ({
  type: types.FETCH_ACTIVITIES_REQUEST,
});

export const fetchActivitiesSuccess = (activities) => ({
  type: types.FETCH_ACTIVITIES_SUCCESS,
  payload: activities,
});

export const fetchActivitiesFailure = (error) => ({
  type: types.FETCH_ACTIVITIES_FAILURE,
  payload: error,
});

export const fetchActivities = (count) => {
  return (dispatch) => {
    dispatch(fetchActivitiesRequest());
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(axios.get('https://www.boredapi.com/api/activity'));
    }
    Promise.all(requests)
    .then((responses) => {
      const activities = responses.reduce((acc, curr) => {
        if (!acc.some((a) => a.key === curr.data.key)) {
          acc.push(curr.data);
        }
        return acc;
      }, []);
      dispatch(fetchActivitiesSuccess(activities));
    })
    .catch((error) => {
      dispatch(fetchActivitiesFailure(error.message));
    });
  };
};

export const addActivity = (activity) => ({
  type: types.ADD_ACTIVITY,
  payload: activity,
});

export const moveActivity = (key, offset) => ({
  type: types.MOVE_ACTIVITY,
  payload: { key, offset },
});

export const updateActivity = (key, updatedActivity) => ({
  type: types.UPDATE_ACTIVITY,
  payload: { key, updatedActivity },
});