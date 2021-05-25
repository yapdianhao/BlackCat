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
import SingleCommentIcon from "./SingleCommentIcon";
import HeartIcon from "./HeartIcon";
import CheckIcon from "./CheckIcon";
import ExpandArrowIcon from "./ExpandArrowIcon";
import ReplyIcon from "./ReplyIcon";
import CheckIconOutline from "./CheckIconOutline";

const profilePic = require("../images/Street-Dance-01.jpg");
const googleMaps = require("../images/gmap.png");

const EventDetailsBody = () => {
  const [detailTabSelected, setDetailTabSelected] = useState(true);
  const [participantTabSelected, setParticipantTabSelected] = useState(false);
  const [commentsTabSelected, setCommentsTabSelected] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [showMoreLikes, setShowMoreLikes] = useState(false);

  const peopleWhoLikes = [
    profilePic,
    profilePic,
    profilePic,
    profilePic,
    profilePic,
  ];

  let expanded = true;

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

  const handleClickSeeMoreLikes = () => {
    setShowMoreLikes(!showMoreLikes);
  };

  console.log(showMoreLikes);

  const renderList = (lst: any) => {
    if (lst.length <= 7) {
      return (
        <div className="going-list-people-row">
          {lst.map((source: any, idx: number) => (
            <img src={String(source)} />
          ))}
        </div>
      );
    } else {
      if (!expanded) {
        const headList = lst.slice(0, 7);
        return (
          <div
            className={`going-list-people-row ${
              showMoreLikes ? "upside-down-svg" : "upright-svg"
            }`}
          >
            {headList.map((source: any, idx: number) => {
              if (idx != 6) {
                return <img src={String(source)} />;
              } else {
                return (
                  <ExpandArrowIcon
                    handleClickShowMore={handleClickSeeMoreLikes}
                  />
                );
              }
            })}
          </div>
        );
      } else {
        let slicedList = generateEqualLengthList(lst);
        console.log(slicedList);
        return slicedList.map((subList: any, index: any) => {
          if (index == slicedList.length - 1) {
            return generateLastList(subList);
          } else {
            return generateNormalList(subList);
          }
        });
      }
    }
  };

  const generateEqualLengthList = (lst: any) => {
    const ansList = [];
    let idx = 0;
    while (idx < lst.length) {
      let maxLength = Math.min(idx + 7, lst.length);
      ansList.push(lst.slice(idx, maxLength));
      idx = maxLength;
    }
    return ansList;
  };

  const generateNormalList = (lst: any) => {
    return (
      <div className="going-list-people-row">
        {lst.map((source: any) => {
          return <img src={String(source)} />;
        })}
      </div>
    );
  };

  const generateLastList = (lst: any) => {
    lst.push(null);
    return (
      <div
        className={`going-list-people-row ${
          showMoreLikes ? "upside-down-svg" : "upright-svg"
        }`}
      >
        {lst.map((source: any, idx: number) => {
          if (idx != lst.length - 1) {
            return <img src={String(source)} />;
          } else {
            return (
              <ExpandArrowIcon handleClickShowMore={handleClickSeeMoreLikes} />
            );
          }
        })}
      </div>
    );
  };

  return (
    <>
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
          <div
            className={showHidden ? "text-area-unhidden" : "text-area-hidden"}
          >
            this is a very long text this is really a very long text how long
            can it be it can be very long more than two lines more than three
            lines this is going to be very very long wow long long text!! but
            its not long enough so here are more words long long words this is a
            veryverylongword word word word this is a very long text this is
            really a very long text how long can it be it can be very long more
            than two lines more than three lines this is going to be very very
            long wow long long text!! but its not long enough so here are more
            words long long words this is a veryverylongword word word word his
            is a very long text this is really a very long text how long can it
            be it can be very long more than two lines more than three lines
            this is going to be very very long wow long long text!! but its not
            long enough so here are more words long long words this is a
            veryverylongword word word word his is a very long text this is
            really a very long text how long can it be it can be very long more
            than two lines more than three lines this is going to be very very
            long wow long long text!! but its not long enough so here are more
            words long long words this is a veryver
          </div>
          {showHidden ? null : <div className="blur-effect" />}
          <div className="expand-btn">
            <button onClick={handleShowHiddenButtonClick}>
              {showHidden ? "VIEW LESS" : "VIEW ALL"}
            </button>
          </div>
        </div>
        <hr className="divider" />
        <div className="section-starter">
          <div className="section-shape" />
          <div className="section-text">When</div>
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
              <DateToIcon />
              <div>5 April 2015</div>
            </div>
          </div>
          <div className="time-col-big-row">8:30 pm</div>
        </div>
        <hr className="divider" />
        <div className="section-starter">
          <div className="section-shape" />
          <div className="section-text">Where</div>
        </div>
        <div className="location">
          Marina Bay Sands, 10 Bayfront Avenue, s297483902745, XXX Road
          Singapore
        </div>
        <div className="loc-map">
          <img src={String(googleMaps)} />
        </div>
        <hr className="divider" />
        <div className="going-list-outline">
          <div className="going-list-title">
            <CheckIcon />
            34 going
          </div>
          <div className="going-list-people-col">
            {renderList(peopleWhoLikes)}
          </div>
        </div>
        <hr className="divider" />
        <div className="going-list-outline">
          <div className="going-list-title">
            <CheckIcon />7 likes
          </div>
          <div className="going-list-people-col">
            {renderList(peopleWhoLikes)}
          </div>
        </div>
        <hr className="divider" />
        <div className="comment-list-area">
          <div className="comment-user-profile-pic">
            <img src={String(profilePic)} />
          </div>
          <div className="comment-details-layout">
            <div className="comment-details">
              <div className="comment-username">Ed Sheeran</div>
              <div className="comment-time">9 hours ago</div>
              <div className="filler"></div>
            </div>
            <div className="comment-words">
              This is a comment a comment ment of the event.
            </div>
          </div>
          <div className="reply-button">
            <ReplyIcon />
          </div>
        </div>
        <div className="comment-list-area">
          <div className="comment-user-profile-pic">
            <img src={String(profilePic)} />
          </div>
          <div className="comment-details-layout">
            <div className="comment-details">
              <div className="comment-username">Ed Sheeran</div>
              <div className="comment-time">9 hours ago</div>
              <div className="filler"></div>
            </div>
            <div className="comment-words">
              This is a comment a comment ment of the event.
            </div>
          </div>
          <div className="reply-button">
            <ReplyIcon />
          </div>
        </div>
        <div className="comment-list-area">
          <div className="comment-user-profile-pic">
            <img src={String(profilePic)} />
          </div>
          <div className="comment-details-layout">
            <div className="comment-details">
              <div className="comment-username">Ed Sheeran</div>
              <div className="comment-time">9 hours ago</div>
              <div className="filler"></div>
            </div>
            <div className="comment-words">
              This is a comment a comment ment of the event.
            </div>
          </div>
          <div className="reply-button">
            <ReplyIcon />
          </div>
        </div>
        <div className="comment-list-area">
          <div className="comment-user-profile-pic">
            <img src={String(profilePic)} />
          </div>
          <div className="comment-details-layout">
            <div className="comment-details">
              <div className="comment-username">Ed Sheeran</div>
              <div className="comment-time">9 hours ago</div>
              <div className="filler"></div>
            </div>
            <div className="comment-words">
              This is a comment a comment ment of the event.
            </div>
          </div>
          <div className="reply-button">
            <ReplyIcon />
          </div>
        </div>
        <div className="comment-list-area">
          <div className="comment-user-profile-pic">
            <img src={String(profilePic)} />
          </div>
          <div className="comment-details-layout">
            <div className="comment-details">
              <div className="comment-username">Ed Sheeran</div>
              <div className="comment-time">9 hours ago</div>
              <div className="filler"></div>
            </div>
            <div className="comment-words">
              This is a comment a comment ment of the event.
            </div>
          </div>
          <div className="reply-button">
            <ReplyIcon />
          </div>
        </div>
      </div>
      <div className="utilities-bar">
        <div className="blue-button">
          <SingleCommentIcon />
        </div>
        <div className="blue-button">
          <HeartIcon />
        </div>
        <div className="yellow-button">
          <CheckIconOutline />
          <div>Going</div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsBody;
