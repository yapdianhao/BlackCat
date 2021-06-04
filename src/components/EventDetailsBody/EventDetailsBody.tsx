/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";

import styles from "./EventDetailsBody.module.scss";
import { Event } from "../../../server/model/event";
import { User } from "../../../server/model/user";
import { Comment } from "../../../server/model/comment";
import {
  renderDate,
  renderMonth,
  renderYear,
  renderMinutes,
  renderHour,
  renderAmPm,
  getDayDiff,
} from "../../../src/utils/helper/DateHelper";
import ReactionBar from "../ReactionBar/ReactionBar";
import ReplyBar from "../ReplyBar/ReplyBar";
import CommentIcon from "../CommentIcon/CommentIcon";
import CommentIconOutline from "../CommentIconOutline/CommentIconOutline";
import PeopleIconOutline from "../PeopleIconOutline/PeopleIconOutline";
import PeopleIcon from "../PeopleIcon/PeopleIcon";
import InfoIcon from "../InfoIcon/InfoIcon";
import InfoIconOutline from "../InfoIconOutline/InfoIconOutline";
import DateFromIcon from "../DateFromIcon/DateFromIcon";
import DateToIcon from "../DateToIcon/DateToIcon";
import HeartIconOutline from "../HeartIconOutline/HeartIconOutline";
import ExpandArrowIcon from "../ExpandArrowIcon/ExpandArrowIcon";
import ReplyIcon from "../ReplyIcon/ReplyIcon";
import CheckIconOutline from "../CheckIconOutline/CheckIconOutline";

import googleMaps from "../images/gmap.png";

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
  const [mainUser, setMainUser] = useState<User>();
  const [didDivOverflow, setDidDivOverflow] = useState(false);
  const [userIsCommenting, setUserIsCommenting] = useState(false);
  const [userLikesThisEvent, setUserLikesThisEvent] = useState(
    props.eventToRender.usersLikeEvent
      .map((user: User) => user.userId)
      .includes(+localStorage.getItem("authenticatedUser"))
  );
  const [userGoingThisEvent, setUserGoingThisEvent] = useState(
    props.eventToRender.usersGoingEvent
      .map((user: User) => user.userId)
      .includes(+localStorage.getItem("authenticatedUser"))
  );
  const [commentedUsers, setCommentedUsers] = useState(
    props.eventToRender.eventComments
  );
  const [commentingUserList, setCommentingUsersList] = useState<User[]>([]);
  const [placeHolder, setPlaceholder] = useState("Leave your comment here");

  const longDescRef = useRef(null);
  const descRef = useRef(null);
  const bottomRef = useRef(null);
  const participantsRef = useRef(null);
  const commentsRef = useRef(null);

  const peopleWhoLikes = props.eventToRender.usersLikeEvent;
  const peopleWhoGoes = props.eventToRender.usersGoingEvent;

  const commentUserIds = props.eventToRender.eventComments.map(
    (cmt: Comment) => cmt.commentedBy
  );

  const sendCommentToBackend = async (message: string) => {
    const newComment: Comment = {
      commentedBy: 1,
      commentTimeBefore: 0,
      commentContent: message,
    };
    await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
  };

  const sendCommentUnderEvent = async (message: string) => {
    const newComment: Comment = {
      commentedBy: 1,
      commentTimeBefore: 0,
      commentContent: message,
    };
    await fetch(
      `http://localhost:5000/api/events/${props.eventToRender.eventId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
  };

  const handleDetailTabClicked = () => {
    setDetailTabSelected(true);
    setParticipantTabSelected(false);
    setCommentsTabSelected(false);
    descRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleParticipantTabSelected = () => {
    setDetailTabSelected(false);
    setParticipantTabSelected(true);
    setCommentsTabSelected(false);
    participantsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommentsTabSelected = () => {
    setDetailTabSelected(false);
    setParticipantTabSelected(false);
    setCommentsTabSelected(true);
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShowHiddenButtonClick = () => {
    setShowHidden(!showHidden);
  };

  const handleClickSeeMoreLikes = () => {
    setShowMoreLikes(!showMoreLikes);
  };

  const handleClickSeeMoreGoing = () => {
    setShowMoreGoing(!showMoreGoing);
  };

  const handleClickCommentButton = () => {
    setUserIsCommenting(!userIsCommenting);
    setPlaceholder("Leave your comment here");
  };

  const handleClickReplyButton = (replyTo: string) => {
    setUserIsCommenting(true);
    setPlaceholder(replyTo);
  };

  // send commend to backend
  const handleClickSend = async (message: string) => {
    setCommentedUsers([
      ...commentedUsers,
      {
        commentedBy: +localStorage.getItem("authenticatedUser"),
        commentTimeBefore: 0,
        commentContent: message,
      },
    ]);
    const newCommentUser = await fetch(`http://localhost:5000/api/users/1`)
      .then((response) => response.json())
      .then((data) => data);

    setCommentingUsersList([...commentingUserList, newCommentUser]);
    sendCommentToBackend(message);
    sendCommentUnderEvent(message);
  };

  // update likes list, push to first
  const handleUserClicksLike = async () => {
    if (!userLikesThisEvent)
      setLikesUsersUrl([...likesUsersUrl, mainUser.userImgUrl]);
    else {
      setLikesUsersUrl(
        likesUsersUrl.filter((url) => url != mainUser.userImgUrl)
      );
    }
    await fetch(
      `http://localhost:5000/api/likesevent/${props.eventToRender.eventId}/${mainUser.userId}`
    );
    setUserLikesThisEvent(!userLikesThisEvent);
  };

  // update going list, push to first
  const handleUserClicksGoing = async () => {
    if (!userGoingThisEvent)
      setGoingUsersUrl([...goingUsersUrl, mainUser.userImgUrl]);
    else {
      setGoingUsersUrl(goingUsersUrl.slice(1));
    }
    await fetch(
      `http://localhost:5000/api/goingevent/${props.eventToRender.eventId}/${mainUser.userId}`
    );
    setUserGoingThisEvent(!userGoingThisEvent);
  };

  const renderLikesList = (lst: string[]) => {
    // small amount of people
    if (lst.length <= 7) {
      return (
        <div className={styles.goingListPeopleRow}>
          {lst.map((source: any, idx: number) => (
            <img src={source} key={idx} />
          ))}
        </div>
      );
    } else {
      // large amount of people. not showing. svg must point down.
      if (!showMoreLikes) {
        const headList = lst.slice(0, 7);
        return (
          <div
            className={`${styles.goingListPeopleRow} ${styles.upsideDownSvg}`}
          >
            {headList.map((source: any, idx: number) => {
              if (idx != 6) {
                return <img src={source} />;
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
        // large amount of people , showing. svg must point
        const slicedList = generateEqualLengthList(lst);
        return slicedList.map((subList: any, index: number) => {
          if (index == slicedList.length - 1) {
            return generateLastList(subList, handleClickSeeMoreLikes);
          } else {
            return generateNormalList(subList);
          }
        });
      }
    }
  };

  const renderGoingList = (lst: string[]) => {
    // small amount of people
    if (lst.length <= 7) {
      return (
        <div className={styles.goingListPeopleRow}>
          {lst.map((source: any, idx: number) => (
            <img src={source} key={idx} />
          ))}
        </div>
      );
    } else {
      // large amount of people. not showing
      if (!showMoreGoing) {
        const headList = lst.slice(0, 7);
        return (
          <div
            className={`${styles.goingListPeopleRow} ${styles.upsideDownSvg}`}
          >
            {headList.map((source: any, idx: number) => {
              if (idx != 6) {
                return <img src={source} />;
              } else {
                return (
                  <ExpandArrowIcon
                    handleClickShowMore={handleClickSeeMoreGoing}
                  />
                );
              }
            })}
          </div>
        );
      } else {
        // large amount of people , showing
        const slicedList = generateEqualLengthList(lst);
        if (slicedList[slicedList.length - 1].length % 7 == 0) {
          slicedList.push([]); // if last row full, svg icon start new row.
        }
        return slicedList.map((subList: any, index: any) => {
          if (index == slicedList.length - 1) {
            // not full can add icon at back
            // full, check in generatelastlist function, cannot check here.
            return generateLastList(subList, handleClickSeeMoreGoing);
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
      const maxLength = Math.min(idx + 7, lst.length);
      ansList.push(lst.slice(idx, maxLength));
      idx = maxLength;
    }
    return ansList;
  };

  const generateNormalList = (lst: any) => {
    return (
      <div className={styles.goingListPeopleRow}>
        {lst.map((source: any, idx: number) => {
          return <img src={source} key={idx} />;
        })}
      </div>
    );
  };

  const generateLastList = (
    lst: any,
    expandButtonFn: React.MouseEventHandler<SVGSVGElement>
  ) => {
    lst.push(null);
    return (
      <div className={styles.goingListPeopleRow}>
        {lst.map((source: any, idx: number) => {
          if (idx != lst.length - 1) {
            return <img src={source} />;
          } else {
            return <ExpandArrowIcon handleClickShowMore={expandButtonFn} />;
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
        setEventPoster(data);
      });
  };

  const fetchUrl = async (
    userLst: User[],
    fetchParticipantsFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const urlList: string[] = [];
    for (let i = 0; i < userLst.length; i++) {
      const response = await fetch(
        `http://localhost:5000/api/users/${userLst[i].userId}`
      );
      const data = await response.json();
      urlList.push(data.userImgUrl);
    }
    fetchParticipantsFunction(urlList);
  };

  const fetchCommentingUsers = async () => {
    const commentUserList: User[] = [];
    for (let i = 0; i < commentUserIds.length; i++) {
      const response = await fetch(
        `http://localhost:5000/api/users/${commentUserIds[i]}`
      );
      const data = await response.json();
      commentUserList.push(data);
    }
    setCommentingUsersList(commentUserList);
  };

  const didTextOverflow = () => {
    const node = longDescRef.current;
    if (node) {
      const isOverflowing =
        node.clientWidth < node.scrollWidth ||
        node.clientHeight < node.scrollHeight;
      return isOverflowing;
    }
    return false;
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchAuthenticatedUser = async () => {
    await fetch(
      `http://localhost:5000/api/users/${localStorage.getItem(
        "authenticatedUser"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMainUser(data);
      });
  };

  useEffect(() => {
    fetchEventPosterUrl();
    fetchUrl(peopleWhoLikes, setLikesUsersUrl);
    fetchUrl(peopleWhoGoes, setGoingUsersUrl);
    setUserGoingThisEvent(
      peopleWhoGoes
        .map((user) => user.userId)
        .includes(+localStorage.getItem("authenticatedUser"))
    );
    setUserLikesThisEvent(
      peopleWhoLikes
        .map((user) => user.userId)
        .includes(+localStorage.getItem("authenticatedUser"))
    );
    setDidDivOverflow(didTextOverflow());
    fetchCommentingUsers();
    fetchAuthenticatedUser();
  }, []);

  return (
    <>
      <div className={styles.eventDetailsBody}>
        <div className={styles.eventHeader}>
          <div className={styles.eventChannelName}>
            {props.eventToRender.eventChannel}
          </div>
          <div className={styles.filler}></div>
        </div>
        <div className={styles.eventTitle}>{props.eventToRender.eventName}</div>
        <div className={styles.eventInfoRow}>
          <div className={styles.eventInfoColImg}>
            {eventPoster === undefined ? null : (
              <img
                src={eventPoster.userImgUrl}
                className={styles.eventProfilePic}
              />
            )}
          </div>
          <div className={styles.eventInfoRowPublishDetailsArea}>
            <div className={styles.eventInfoColPublishDetails}>
              <div className={styles.username}>
                {eventPoster && eventPoster.userName}
              </div>
              <div className={styles.lastPublish}>{`Published ${getDayDiff(
                props.eventToRender.eventPostedOn
              )} day${
                getDayDiff(props.eventToRender.eventPostedOn) > 1 ? "s" : ""
              } ago`}</div>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.eventStats}>
          <div
            onClick={handleDetailTabClicked}
            className={`${styles.individualStats} ${
              detailTabSelected ? `${styles.chosen}` : `${styles.notChosen}`
            }`}
          >
            {detailTabSelected ? <InfoIcon /> : <InfoIconOutline />}
            Details
          </div>
          <div
            onClick={handleParticipantTabSelected}
            className={`${styles.individualStats} ${
              participantTabSelected
                ? `${styles.chosen}`
                : `${styles.notChosen}`
            }`}
          >
            {participantTabSelected ? <PeopleIcon /> : <PeopleIconOutline />}
            Participants
          </div>
          <div
            onClick={handleCommentsTabSelected}
            className={`${styles.individualStats} ${
              commentsTabSelected ? `${styles.chosen}` : `${styles.notChosen}`
            }`}
          >
            {commentsTabSelected ? <CommentIcon /> : <CommentIconOutline />}
            Comments
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.gallery} ref={descRef}>
          {props.eventToRender.eventGalleryUrls &&
            props.eventToRender.eventGalleryUrls.map(
              (url: string, idx: number) => <img src={url} key={idx} />
            )}
        </div>
        <div className={styles.desc}>
          <div
            className={
              showHidden
                ? `${styles.textAreaHidden}`
                : `${styles.textAreaUnhidden}`
            }
            ref={longDescRef}
          >
            {props.eventToRender.eventDescription}
          </div>
          {showHidden || !didDivOverflow ? null : (
            <div className={styles.blurEffect} />
          )}
          {didDivOverflow ? (
            <div className={styles.expandBtn}>
              <button onClick={handleShowHiddenButtonClick}>
                {showHidden ? "VIEW LESS" : "VIEW ALL"}
              </button>
            </div>
          ) : null}
        </div>
        <hr className={styles.divider} />
        <div className={styles.sectionStarter}>
          <div className={styles.sectionShape} />
          <div className={styles.sectionText}>When</div>
        </div>
        <div className={styles.timeRow}>
          <div className={styles.timeCol}>
            <div className={styles.timeColRow}>
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
          <div className={styles.timeColBigRow}>{`${
            renderHour(new Date(props.eventToRender.eventStartDateTime)) < 10
              ? "0" +
                renderHour(new Date(props.eventToRender.eventStartDateTime))
              : renderHour(new Date(props.eventToRender.eventStartDateTime))
          }: ${
            renderMinutes(new Date(props.eventToRender.eventStartDateTime)) < 10
              ? "0" +
                renderMinutes(new Date(props.eventToRender.eventStartDateTime))
              : renderMinutes(new Date(props.eventToRender.eventStartDateTime))
          } ${renderAmPm(
            new Date(props.eventToRender.eventStartDateTime)
          )}`}</div>
          <div className={styles.timeCol}>
            <div className={styles.timeColRow}>
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
          <div className={styles.timeColBigRow}>{`${
            renderHour(new Date(props.eventToRender.eventEndDateTime)) < 10
              ? "0" + renderHour(new Date(props.eventToRender.eventEndDateTime))
              : renderHour(new Date(props.eventToRender.eventEndDateTime))
          }: ${
            renderMinutes(new Date(props.eventToRender.eventEndDateTime)) < 10
              ? "0" +
                renderMinutes(new Date(props.eventToRender.eventEndDateTime))
              : renderMinutes(new Date(props.eventToRender.eventEndDateTime))
          } ${renderAmPm(
            new Date(props.eventToRender.eventEndDateTime)
          )}`}</div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.sectionStarter}>
          <div className={styles.sectionShape} />
          <div className={styles.sectionText}>Where</div>
        </div>
        <div className={styles.location}>
          {props.eventToRender.eventLocation}
        </div>
        <div className={styles.locMap}>
          <img src={googleMaps} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.goingListOutline} ref={participantsRef}>
          <div className={styles.goingListTitle}>
            <CheckIconOutline />

            {`${goingUsersUrl.length} going`}
          </div>
          <div className={styles.goingListPeopleCol}>
            {renderGoingList(goingUsersUrl)}
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.goingListOutline}>
          <div className={styles.goingListTitle}>
            <HeartIconOutline />

            {`${likesUsersUrl.length} likes`}
          </div>
          <div className={styles.goingListPeopleCol}>
            {renderLikesList(likesUsersUrl)}
          </div>
        </div>
        <hr className={styles.divider} />
        <div ref={commentsRef}>
          {commentedUsers.map((comment: Comment, idx: number) => {
            return (
              <div className={styles.commentListArea} key={idx}>
                <div className={styles.commentUserProfilePic}>
                  <img
                    src={
                      commentingUserList[idx] &&
                      commentingUserList[idx].userImgUrl
                    }
                  />
                </div>
                <div className={styles.commentDetailsLayout}>
                  <div className={styles.commentDetails}>
                    <div className={styles.commentUsername}>
                      {commentingUserList[idx] &&
                        commentingUserList[idx].userName}
                    </div>
                    <div
                      className={styles.commentTime}
                    >{`${comment.commentTimeBefore} hours ago`}</div>
                    <div className={styles.filler}></div>
                  </div>
                  <div className={styles.commentWords}>
                    {comment.commentContent}
                  </div>
                </div>
                <div className={styles.replyButton}>
                  <ReplyIcon
                    handleReplyIconClick={handleClickReplyButton}
                    scrollToBottom={scrollToBottom}
                    replyTo={`@ ${
                      commentingUserList[idx] &&
                      commentingUserList[idx].userName
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div ref={bottomRef}>
        {userIsCommenting ? (
          <ReplyBar
            handleClickCancelIcon={handleClickCommentButton}
            handleSendIcon={handleClickSend}
            placeHolder={placeHolder}
          />
        ) : (
          <ReactionBar
            handleClickCommentButton={handleClickCommentButton}
            handleClickLike={handleUserClicksLike}
            handleClickGoing={handleUserClicksGoing}
            doesUserLike={userLikesThisEvent}
            isUserGoing={userGoingThisEvent}
          />
        )}
      </div>
    </>
  );
};

export default EventDetailsBody;
