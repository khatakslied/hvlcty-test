import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addActivity, updateActivity } from "../store/activityActions";

const ActivityEditor = ({ activity, isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [participants, setParticipants] = useState(0);
  const [price, setPrice] = useState(0);
  const [accessibility, setAccessibility] = useState(0);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (isEdit) {
      setActivityName(activity.activity);
      setActivityType(activity.type);
      setParticipants(activity.participants);
      setPrice(activity.price);
      setAccessibility(activity.accessibility);
      setKey(activity.key);
    }
  }, [activity, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      key: key || "m" + Math.floor(Math.random() * 1000000),
      activity: activityName,
      type: activityType,
      participants,
      price,
      accessibility,
    };
    if (isEdit) {
      dispatch(updateActivity(newActivity));
    } else {
      dispatch(addActivity(newActivity));
    }
    navigate("/");
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    if (
      [
        "education",
        "recreational",
        "social",
        "diy",
        "charity",
        "cooking",
        "relaxation",
        "music",
        "busywork",
      ].includes(value)
    ) {
      setActivityType(value);
    }
  };

  const handleParticipantsChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 8) {
      setParticipants(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 1) {
      setPrice(parseFloat(value).toFixed(1));
    }
  };

  const handleAccessibilityChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 1) {
      setAccessibility(parseFloat(value).toFixed(1));
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Update Activity" : "Add New Activity"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Activity Name:</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setActivityName(e.target.value)
              }
            }}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={activityType} onChange={handleTypeChange} required>
            <option value="">Select type</option>
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">DIY</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
            </select>
        </div>
        <div>
          <label>Participants:</label>
          <input
            type="number"
            value={participants}
            onChange={handleParticipantsChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.1"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <label>Accessibility:</label>
          <input
            type="number"
            step="0.1"
            value={accessibility}
            onChange={handleAccessibilityChange}
            required
          />
        </div>
        <button type="submit">{isEdit ? "Update Activity" : "Add Activity"}</button>
      </form>
    </div>
  );
};

export default ActivityEditor;

