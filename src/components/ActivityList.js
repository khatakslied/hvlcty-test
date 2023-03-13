import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities, moveActivity } from "../store/activityActions";
import ActivityEditor from "./ActivityEditor";
import ActivityCard from "./ActivityCard";

const ActivityList = () => {
  const activities = useSelector((state) => state.activity.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activities || activities.length === 0) {
      dispatch(fetchActivities(4));
    }
  }, [activities, dispatch]);

  const handleMoveUp = (activity) => {
    dispatch(moveActivity(activity.key, -1));
  };

  const handleMoveDown = (activity) => {
    dispatch(moveActivity(activity.key, 1));
  };

  return (
    <div className="activity-list">
      <h1>Not Another Lazy Sunday</h1>
      {activities ? (
        <div className="activities">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.key}
              activity={activity}
              onMoveUp={() => handleMoveUp(activity)}
              onMoveDown={() => handleMoveDown(activity)}
              isTop={index === 0}
              isBottom={index === activities.length - 1}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {activities && activities.length > 0 && activities.length < 6 && (
        <ActivityEditor />
      )}
    </div>
  );
};

export default ActivityList;
