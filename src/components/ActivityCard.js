import React from "react";
import { Link } from 'react-router-dom';
import { BsArrowDownSquare, BsArrowUpSquare, BsCurrencyDollar, BsPencil, BsTrash3 } from 'react-icons/bs';

const ActivityCard = ({ activity, onMoveUp, onMoveDown, isTop, isBottom }) => {
  const typeLabel = activity.type.charAt(0).toUpperCase() + activity.type.slice(1);
  const participantsLabel = activity.participants > 1 ? `Friends needed: ${activity.participants - 1}` : 'Solo';
  
  const priceIcons = [];
  if (activity.price === 0) {
    priceIcons.push(<span key={0}>Free</span>);
  } else {
    const numIcons = activity.price <= 0.1 ? 1 : activity.price >= 1 ? 4 : 2;
    for (let i = 0; i < numIcons; i++) {
      priceIcons.push(<BsCurrencyDollar key={i} size={24}/>);
    }
  }

  return (
    <div className={`activity-card ${activity.type}`}>
      <div className="white-space">
        <div className="info">
          <div className="activity">
              <h3>{activity.activity}</h3>
              <Link to={`/activity/${activity.key}`}>
                <BsPencil size={32}/>
              </Link>
                <BsTrash3 size={32}/>
          </div>
          <p className="type">{typeLabel}</p>
          <p>{participantsLabel}</p>
          <p>{priceIcons}</p>
          <p>Ease: {activity.accessibility}</p>
        </div>
        <div className="arrows">
          {!isTop && <BsArrowUpSquare onClick={onMoveUp} size={32}/>}
          {!isBottom && <BsArrowDownSquare onClick={onMoveDown} size={32}/>}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
