import React, { useState, useEffect, useRef } from "react";

import "../styles/EventDetailsBody.scss";
import { Event } from "../server/model/event";
import { User } from "../server/model/user";
import { Comment } from "../server/model/comment";
import {
  renderDate,
  renderMonth,
  renderYear,
  renderMinutes,
  renderHour,
  renderAmPm,
  getDayDiff,
} from "../helper/DateHelper";
import ReactionBar from "./ReactionBar";
import ReplyBar from "./ReplyBar";
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

interface EventDetailsBodyProps {
  eventToRender: Event;
}

const EventDetailsBody: React.FC<EventDetailsBodyProps> = (props) => {
  const [detailTabSelected, setDetailTabSelected] = useState(true);
  const [participantTabSelected, setParticipantTabSelected] = useState(false);
  const [commentsTabSelected, setCommentsTabSelected] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [showMoreLikes, setShowMoreLikes] = useState(false);
  const [showMoreGoing, setShowMoreGoing] = useState(false);
  const [likesUsersUrl, setLikesUsersUrl] = useState<string[]>([]);
  const [goingUsersUrl, setGoingUsersUrl] = useState<string[]>([]);
  const [eventPoster, setEventPoster] = useState<User>();
  const [didDivOverflow, setDidDivOverflow] = useState(false);
  const [userIsCommenting, setUserIsCommenting] = useState(false);
  const [commentedUsers, setCommentedUsers] = useState(
    props.eventToRender.eventComments
  );
  const [commentingUserList, setCommentingUsersList] = useState<User[]>([]);

  const longDescRef = useRef(null);

  const peopleWhoLikes = props.eventToRender.usersLikeEvent;
  const peopleWhoGoes = props.eventToRender.usersGoingEvent;

  let expanded = true;
  const commentUserIds = props.eventToRender.eventComments.map(
    (cmt: Comment) => cmt.commentedBy
  );

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

  const handleClickCommentButton = () => {
    setUserIsCommenting(!userIsCommenting);
    console.log(userIsCommenting);
  };

  const handleClickSend = async (message: string) => {
    setCommentedUsers([
      ...commentedUsers,
      {
        commentedBy: 1,
        commentTimeBefore: 0,
        commentContent: message,
      },
    ]);
    const newCommentUser = await fetch(`http://localhost:5000/api/users/1`)
      .then((response) => response.json())
      .then((data) => data);

    setCommentingUsersList([...commentingUserList, newCommentUser]);
  };

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

  const fetchEventPosterUrl = async () => {
    await fetch(
      `http://localhost:5000/api/users/${props.eventToRender.eventPostedBy}`
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setEventPoster(data);
      });
  };

  const fetchUrl = async (userLst: User[]) => {
    let urlList: string[] = [];
    for (let i = 0; i < userLst.length; i++) {
      const response = await fetch(
        `http://localhost:5000/api/users/${userLst[i].userId}`
      );
      const data = await response.json();
      urlList.push(data.userImgUrl);
    }
    console.log(urlList);
    setLikesUsersUrl(urlList);
  };

  const fetchCommentingUsers = async () => {
    let commentUserList: User[] = [];
    for (let i = 0; i < commentUserIds.length; i++) {
      const response = await fetch(
        `http://localhost:5000/api/users/${commentUserIds[i]}`
      );
      const data = await response.json();
      commentUserList.push(data);
    }
    console.log(commentUserList);
    setCommentingUsersList(commentUserList);
  };

  const didTextOverflow = () => {
    const node = longDescRef.current;
    if (node) {
      const isOverflowing =
        node.clientWidth < node.scrollWidth ||
        node.clientHeight < node.scrollHeight;
      console.log("reached");
      return isOverflowing;
    }
    return false;
  };

  useEffect(() => {
    fetchEventPosterUrl();
    fetchUrl(peopleWhoLikes);
    setDidDivOverflow(didTextOverflow());
    fetchCommentingUsers();
  }, []);

  console.log(commentedUsers);
  console.log(commentingUserList);

  return (
    <>
      <div className="event-details-body">
        <div className="event-header">
          <div className="event-channel-name">
            {props.eventToRender.eventChannel}
          </div>
          <div className="filler"></div>
        </div>
        <div className="event-title">{props.eventToRender.eventName}</div>
        <div className="event-info-row">
          <div className="event-info-col-img">
            {eventPoster === undefined ? null : (
              <img
                src={String(eventPoster.userImgUrl)}
                className="event-profile-pic"
              />
            )}
          </div>
          <div className="event-info-row-publish-details-area">
            <div className="event-info-col-publish-details">
              <div className="username">
                {eventPoster && eventPoster.userName}
              </div>
              <div className="last-publish">{`Published ${getDayDiff(
                props.eventToRender.eventPostedOn
              )} day${
                getDayDiff(props.eventToRender.eventPostedOn) > 1 ? "s" : ""
              } ago`}</div>
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
          {props.eventToRender.eventGalleryUrls &&
            props.eventToRender.eventGalleryUrls.map(
              (url: string, idx: number) => <img src={url} key={idx} />
            )}
        </div>
        <div className="desc">
          <div
            className={showHidden ? "text-area-unhidden" : "text-area-hidden"}
            ref={longDescRef}
          >
            {props.eventToRender.eventDescription}
          </div>
          {showHidden || !didDivOverflow ? null : (
            <div className="blur-effect" />
          )}
          {didDivOverflow ? (
            <div className="expand-btn">
              <button onClick={handleShowHiddenButtonClick}>
                {showHidden ? "VIEW LESS" : "VIEW ALL"}
              </button>
            </div>
          ) : null}
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
              <div>{`${renderDate(
                new Date(props.eventToRender.eventStartDateTime)
              )} ${renderMonth(
                new Date(props.eventToRender.eventStartDateTime)
              )} ${renderYear(
                new Date(props.eventToRender.eventStartDateTime)
              )}`}</div>
            </div>
          </div>
          <div className="time-col-big-row">{`${renderHour(
            new Date(props.eventToRender.eventStartDateTime)
          )}: ${renderMinutes(
            new Date(props.eventToRender.eventStartDateTime)
          )} ${renderAmPm(
            new Date(props.eventToRender.eventStartDateTime)
          )}`}</div>
          <div className="time-col">
            <div className="time-col-row">
              <DateToIcon />
              <div>{`${renderDate(
                new Date(props.eventToRender.eventEndDateTime)
              )} ${renderMonth(
                new Date(props.eventToRender.eventEndDateTime)
              )} ${renderYear(
                new Date(props.eventToRender.eventEndDateTime)
              )}`}</div>
            </div>
          </div>
          <div className="time-col-big-row">{`${renderHour(
            new Date(props.eventToRender.eventEndDateTime)
          )}: ${renderMinutes(
            new Date(props.eventToRender.eventEndDateTime)
          )} ${renderAmPm(
            new Date(props.eventToRender.eventEndDateTime)
          )}`}</div>
        </div>
        <hr className="divider" />
        <div className="section-starter">
          <div className="section-shape" />
          <div className="section-text">Where</div>
        </div>
        <div className="location">{props.eventToRender.eventLocation}</div>
        <div className="loc-map">
          <img src={String(googleMaps)} />
        </div>
        <hr className="divider" />
        <div className="going-list-outline">
          <div className="going-list-title">
            <CheckIcon />
            {`${props.eventToRender.usersGoingEvent.length} going`}
          </div>
          <div className="going-list-people-col">
            {/* {renderList(peopleWhoLikes)} */}
          </div>
        </div>
        <hr className="divider" />
        <div className="going-list-outline">
          <div className="going-list-title">
            <HeartIcon />
            {`${props.eventToRender.usersLikeEvent.length} likes`}
          </div>
          <div className="going-list-people-col">
            {/* {renderList(peopleWhoLikes)} */}
          </div>
        </div>
        <hr className="divider" />
        {commentedUsers.map((comment: Comment, idx: number) => {
          return (
            <div className="comment-list-area">
              <div className="comment-user-profile-pic">
                <img
                  src={
                    commentingUserList[idx] &&
                    String(commentingUserList[idx].userImgUrl)
                  }
                />
              </div>
              <div className="comment-details-layout">
                <div className="comment-details">
                  <div className="comment-username">
                    {commentingUserList[idx] &&
                      commentingUserList[idx].userName}
                  </div>
                  <div className="comment-time">{`${comment.commentTimeBefore} hours ago`}</div>
                  <div className="filler"></div>
                </div>
                <div className="comment-words">{comment.commentContent}</div>
              </div>
              <div className="reply-button">
                <ReplyIcon />
              </div>
            </div>
          );
        })}
      </div>
      {userIsCommenting ? (
        <ReplyBar
          handleClickCancelIcon={handleClickCommentButton}
          handleSendIcon={handleClickSend}
        />
      ) : (
        <ReactionBar handleClickCommentButton={handleClickCommentButton} />
      )}
    </>
  );
};

export default EventDetailsBody;
