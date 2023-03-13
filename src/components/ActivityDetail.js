import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActivityEditor from "./ActivityEditor";
import { deleteActivity } from "../store/activityActions";
import { SlTrash } from 'react-icons/sl';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activity = useSelector((state) =>
    state.activity.activities.find((a) => a.key === id)
  );

  const handleDelete = (key) => {
    dispatch(deleteActivity(key))
    navigate("/");
  }

  return (
    <div>
      {activity ? (
        <>
          <ActivityEditor
            activity={activity}
            isEdit={true}
          />
          <div>
            <p>Delete</p>
            <SlTrash size={24} onClick={() => handleDelete(activity.key)}/>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActivityDetail;