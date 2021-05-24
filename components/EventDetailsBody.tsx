import React, { useState } from "react";

import "../styles/EventDetailsBody.scss";

const profilePic = require("../images/Street-Dance-01.jpg");

const EventDetailsBody = () => {
  const [detailTabSelected, setDetailTabSelected] = useState(true);
  const [participantTabSelected, setParticipantTabSelected] = useState(false);
  const [commentsTabSelected, setCommentsTabSelected] = useState(false);

  const handleDetailTabClicked = () => {
    setDetailTabSelected(true);
    setParticipantTabSelected(false);
    setCommentsTabSelected(false);
  };

  const handleParticipantTabSelected = () => {
    setDetailTabSelected(false);
    setParticipantTabSelected(true);
    setCommentsTabSelected(false);
  };

  const handleCommentsTabSelected = () => {
    setDetailTabSelected(false);
    setParticipantTabSelected(false);
    setCommentsTabSelected(true);
  };

  return (
    <div className="event-details-body">
      <div className="event-header">
        <div className="event-channel-name">Channel Name</div>
        <div className="filler"></div>
      </div>
      <div className="event-title">
        Activity title may be more than one line may be longer
      </div>
      <div className="event-info-row">
        <div className="event-info-col-img">
          <img src={String(profilePic)} className="event-profile-pic" />
        </div>
        <div className="event-info-row-publish-details-area">
          <div className="event-info-col-publish-details">
            <div className="username">Username</div>
            <div className="last-publish">Published 2 days ago</div>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="event-stats">
        <div
          onClick={handleDetailTabClicked}
          className={`individual-stats ${
            detailTabSelected ? "chosen" : "not-chosen"
          }`}
        >
          details
        </div>
        <div
          onClick={handleParticipantTabSelected}
          className={`individual-stats ${
            participantTabSelected ? "chosen" : "not-chosen"
          }`}
        >
          participants
        </div>
        <div
          onClick={handleCommentsTabSelected}
          className={`individual-stats ${
            commentsTabSelected ? "chosen" : "not-chosen"
          }`}
        >
          comments
        </div>
      </div>
      <hr className="divider" />
    </div>
  );
};

export default EventDetailsBody;
