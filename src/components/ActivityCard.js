import React from "react";
import { Link } from 'react-router-dom';
import { SlArrowDown, SlArrowUp, SlPencil, SlWallet, SlUser, SlPeople, SlEnergy, SlGraduation, SlGameController, SlBubbles, SlWrench, SlPresent, SlFire, SlCup, SlMusicToneAlt, SlHourglass } from 'react-icons/sl';

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

  const typeLabel = activity.type.charAt(0).toUpperCase() + activity.type.slice(1);
  const TypeIcon = typeIcons[activity.type];

  const participantsLabel = activity.participants > 1 ? `Friends needed: ${activity.participants - 1}` : 'Solo';
  const ParticipantsIcon = activity.participants > 1 ? SlPeople : SlUser;

  const priceRanges = [
    { maxPrice: 0.1, label: 'Free', numIcons: 0 },
    { maxPrice: 0.3, label: 'Cheap', numIcons: 1 },
    { maxPrice: 0.6, label: 'Expensive', numIcons: 2 },
    { maxPrice: Infinity, label: 'Very Expensive', numIcons: 3 }
  ];
  
  const priceRange = priceRanges.find(range => activity.price <= range.maxPrice);
  const priceLabel = priceRange ? priceRange.label : 'Free';
  const numPriceIcons = priceRange ? priceRange.numIcons : 0;
  
  const priceIcons = [];
  for (let i = 0; i < numPriceIcons; i++) {
    priceIcons.push(<SlWallet key={i} size={24}/>);
  }

  const effortRanges = [
    { maxAccessibility: 0.1, label: 'Easy-peasy', numIcons: 0 },
    { maxAccessibility: 0.4, label: 'Some effort needed', numIcons: 1 },
    { maxAccessibility: 0.7, label: 'Significant effort needed', numIcons: 2 },
    { maxAccessibility: Infinity, label: 'Massive effort needed', numIcons: 3 }
  ];
  
  const effortRange = effortRanges.find(range => activity.accessibility <= range.maxAccessibility);
  const effortLabel = effortRange ? effortRange.label : 'Easy-peasy';
  const numEffortIcons = effortRange ? effortRange.numIcons : 0;
  
  const effortIcons = [];
  for (let i = 0; i < numEffortIcons; i++) {
    effortIcons.push(<SlEnergy key={i} size={24}/>);
  }

  return (
    <div className={`activity-card ${activity.type}`}>
      <div className="white-space">
        <div className="info">
          <div className="activity">
            <div>
              <h3>{activity.activity}
              </h3>
              <Link to={`/activity/${activity.key}`}>
                <SlPencil size={20} title="Edit" className="edit"/>
              </Link>
            </div>
            <div className={`type ${activity.type}`}>
              <TypeIcon size={24} />
              <p>
                {typeLabel}
              </p>
            </div>
          </div>
          <div className="details">
            <div className="detail participants">
              <ParticipantsIcon size ={24} />
              <p>{participantsLabel}</p>
            </div>
            <div className="detail price ">
              {priceIcons}
              <p>{priceLabel}</p>
            </div>
            <div className="detail effort">
              {effortIcons}
              <p>{effortLabel}</p>
            </div>
          </div>
        </div>
        <div className="arrows">
          {!isTop && <SlArrowUp onClick={onMoveUp} size={20} className="arrow-button"/>}
          {!isBottom && <SlArrowDown onClick={onMoveDown} size={20} className="arrow-button"/>}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
