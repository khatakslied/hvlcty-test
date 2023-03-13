import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActivityEditor from "./ActivityEditor";
import ConfirmationPopup from "./ConfirmationPopup";
import { deleteActivity } from "../store/activityActions";
import { SlTrash } from 'react-icons/sl';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activity = useSelector((state) =>
    state.activity.activities.find((a) => a.key === id)
  );
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    dispatch(deleteActivity(activity.key));
    setShowPopup(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

return (
    <div className="activity-detail">
      {activity ? (
        <>
          <ActivityEditor
            activity={activity}
            isEdit={true}
          />
          <div className="delete-button" onClick={() => setShowPopup(true)}>
            <p>Delete</p>
            <SlTrash size={24}/>
          </div>
          {showPopup && (
            <ConfirmationPopup
              message="Are you sure you want to delete this activity?"
              onConfirm={handleDelete}
              onCancel={handleCancel}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActivityDetail;