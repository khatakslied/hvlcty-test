import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { SlArrowDownCircle, SlArrowUpCircle, SlPencil, SlTrash, SlWallet, SlUser, SlPeople, SlEnergy, SlGraduation, SlGameController, SlBubbles, SlWrench, SlPresent, SlFire, SlCup, SlMusicToneAlt, SlHourglass } from 'react-icons/sl';
import { deleteActivity } from "../store/activityActions";

const typeIcons = {
  education: SlGraduation,
  recreational: SlGameController,
  social: SlBubbles,
  diy: SlWrench,
  charity: SlPresent,
  cooking: SlFire,
  relaxation: SlCup,
  music: SlMusicToneAlt,
  busywork: SlHourglass,
};

const ActivityCard = ({ activity, onMoveUp, onMoveDown, isTop, isBottom }) => {

  const dispatch = useDispatch();

  const typeLabel = activity.type.charAt(0).toUpperCase() + activity.type.slice(1);
  const TypeIcon = typeIcons[activity.type];

  const participantsLabel = activity.participants > 1 ? `Friends needed: ${activity.participants - 1}` : 'Solo';
  const ParticipantsIcon = activity.participants > 1 ? SlPeople : SlUser;

  let priceLabel;
  let numPriceIcons;
  if (activity.price === 0) {
    priceLabel = 'Free';
    numPriceIcons = 0;
  } else if (activity.price < 0.3) {
    priceLabel = 'Cheap';
    numPriceIcons = 1;
  } else if (activity.price < 0.6) {
    priceLabel = 'Expensive';
    numPriceIcons = 2;
  } else {
    priceLabel = 'Very Expensive';
    numPriceIcons = 3;
  }
  
  const priceIcons = [];
  for (let i = 0; i < numPriceIcons; i++) {
    priceIcons.push(<SlWallet key={i} size={24}/>);
  }

  let effortLabel;
  let numEffortIcons;
  if (activity.accessibility === 0) {
    effortLabel = 'Piece of cake';
    numEffortIcons = 0;
  } else if (activity.accessibility < 0.3) {
    effortLabel = 'Some effort needed';
    numEffortIcons = 1;
  } else if (activity.accessibility < 0.6) {
    effortLabel = 'Significant effort needed';
    numEffortIcons = 2;
  } else {
    effortLabel = 'Insane effort needed';
    numEffortIcons = 3;
  }
  
  const effortIcons = [];
  for (let i = 0; i < numEffortIcons; i++) {
    priceIcons.push(<SlEnergy key={i} size={24}/>);
  }

  return (
    <div className={`activity-card ${activity.type}`}>
      <div className="white-space">
        <div className="info">
          <div className="activity">
              <h3>{activity.activity}</h3>
              <Link to={`/activity/${activity.key}`}>
                <SlPencil size={32}/>
              </Link>
              <SlTrash size={32} onClick={() => dispatch(deleteActivity(activity.key))}/>
          </div>
          <div className={`type ${activity.type}`}>
            <TypeIcon size={24} />
            <p>
              {typeLabel}
            </p>
          </div>
          <p>
            <ParticipantsIcon size ={24} />
            {participantsLabel}
          </p>
          <p>
            {priceIcons}
            {priceLabel}
          </p>
          <p>
            {effortIcons}
            {effortLabel}
          </p>
        </div>
        <div className="arrows">
          {!isTop && <SlArrowUpCircle onClick={onMoveUp} size={32}/>}
          {!isBottom && <SlArrowDownCircle onClick={onMoveDown} size={32}/>}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
