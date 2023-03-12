import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ActivityEditor from "./ActivityEditor";

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = useSelector((state) =>
    state.activity.activities.find((a) => a.key === id)
  );

  return (
    <div>
      {activity ? (
        <>
          {/* <h3>{activity.activity}</h3>
          <p>Type: {activity.type}</p>
          <p>Participants: {activity.participants}</p>
          <p>Price: {activity.price}</p> */}
          <ActivityEditor
            activity={activity}
            isEdit={true}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActivityDetail;