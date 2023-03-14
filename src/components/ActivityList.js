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
      <div className="title">
        <h1>Not Another Lazy Sunday</h1>
        {activities && activities.length < 6 ? (
          <p>End the Sunday Scaries with this app! Get random ideas for activities to make the most out of your day off. Feeling ambitious? Add your own tasks.</p>
        ): (
          <p>Ok, maybe that is a little TOO ambitious. It is Sunday, after all.</p>
        )}
      </div>
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
      {activities && activities.length > 0 && activities.length < 6 && <ActivityEditor />}
      {activities && activities.length >= 6 && (
        <div>
          <p>Overly ambitious user, take it easy. Even the best of us need rest!</p>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
