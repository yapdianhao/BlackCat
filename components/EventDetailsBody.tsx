import React, { useState } from "react";

import "../styles/EventDetailsBody.scss";
import CommentIcon from "./CommentIcon";
import CommentIconOutline from "./CommentIconOutline";
import PeopleIconOutline from "./PeopleIconOutline";
import PeopleIcon from "./PeopleIcon";
import InfoIcon from "./InfoIcon";
import InfoIconOutline from "./InfoIconOutline";
import DateFromIcon from "./DateFromIcon";
import DateToIcon from "./DateToIcon";

const profilePic = require("../images/Street-Dance-01.jpg");

const EventDetailsBody = () => {
  const [detailTabSelected, setDetailTabSelected] = useState(true);
  const [participantTabSelected, setParticipantTabSelected] = useState(false);
  const [commentsTabSelected, setCommentsTabSelected] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

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

  const handleShowHiddenButtonClick = () => {
    setShowHidden(!showHidden);
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
          {detailTabSelected ? <InfoIcon /> : <InfoIconOutline />}
          Details
        </div>
        <div
          onClick={handleParticipantTabSelected}
          className={`individual-stats ${
            participantTabSelected ? "chosen" : "not-chosen"
          }`}
        >
          {participantTabSelected ? <PeopleIcon /> : <PeopleIconOutline />}
          Participants
        </div>
        <div
          onClick={handleCommentsTabSelected}
          className={`individual-stats ${
            commentsTabSelected ? "chosen" : "not-chosen"
          }`}
        >
          {commentsTabSelected ? <CommentIcon /> : <CommentIconOutline />}
          Comments
        </div>
      </div>
      <hr className="divider" />
      <div className="gallery">
        <img src={String(profilePic)} />
        <img src={String(profilePic)} />
        <img src={String(profilePic)} />
        <img src={String(profilePic)} />
        <img src={String(profilePic)} />
      </div>
      <div className="desc">
        <div className={showHidden ? "text-area-unhidden" : "text-area-hidden"}>
          this is a very long text this is really a very long text how long can
          it be it can be very long more than two lines more than three lines
          this is going to be very very long wow long long text!! but its not
          long enough so here are more words long long words this is a
          veryverylongword word word word this is a very long text this is
          really a very long text how long can it be it can be very long more
          than two lines more than three lines this is going to be very very
          long wow long long text!! but its not long enough so here are more
          words long long words this is a veryverylongword word word word his is
          a very long text this is really a very long text how long can it be it
          can be very long more than two lines more than three lines this is
          going to be very very long wow long long text!! but its not long
          enough so here are more words long long words this is a
          veryverylongword word word word his is a very long text this is really
          a very long text how long can it be it can be very long more than two
          lines more than three lines this is going to be very very long wow
          long long text!! but its not long enough so here are more words long
          long words this is a veryver
        </div>
        {showHidden ? null : <div className="blur-effect" />}
        <div className="expand-btn">
          <button onClick={handleShowHiddenButtonClick}>
            {showHidden ? "VIEW LESS" : "VIEW ALL"}
          </button>
        </div>
      </div>
      <hr className="divider" />
      <div className="section-time-starter">
        <div className="section-time-shape" />
        <div className="section-time-text">When</div>
      </div>
      <div className="time-row">
        <div className="time-col">
          <div className="time-col-row">
            <DateFromIcon />
            <div>5 April 2015</div>
          </div>
        </div>
        <div className="time-col-big-row">8:30 pm</div>
        <div className="time-col">
          <div className="time-col-row">
            <DateFromIcon />
            <div>5 April 2015</div>
          </div>
        </div>
        <div className="time-col-big-row">8:30 pm</div>
      </div>
    </div>
  );
};

export default EventDetailsBody;
