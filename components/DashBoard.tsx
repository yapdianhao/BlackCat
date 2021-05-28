import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import "../styles/Dashboard.scss";
import { Event } from "../server/model/event";
import { store } from "../store/store";
import useFetch from "../helper/useFetch";
import EventCard from "./EventCard";
import Divider from "./Divider";
import NoActivity from "./NoActivity";
import ResultSummary from "./ResultSummary";

interface DashBoardProps {
  shouldShowSearchResults: boolean;
  clearUserSearchedResults: React.MouseEventHandler<HTMLDivElement>;
}

const Dashboard: React.FC<DashBoardProps> = (props) => {
  const [offset, setOffset] = useState(0);
  const { loading, error, list, hasMore } = useFetch(offset);
  const observer = useRef<IntersectionObserver>();
  const searchedResults: Event[] = store.getState().eventsReducer;

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((offset) => offset + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="dashboard">
      {props.shouldShowSearchResults ? (
        <div>
          <ResultSummary
            summaryCount={searchedResults && searchedResults.length}
            clearSearchResults={props.clearUserSearchedResults}
          />
        </div>
      ) : null}
      {props.shouldShowSearchResults ? (
        searchedResults && searchedResults.length > 0 ? (
          searchedResults &&
          searchedResults.map((eventPost: Event, idx: number) => {
            return (
              <div key={eventPost.eventId}>
                <EventCard eventToRender={eventPost} />
                <Divider />
              </div>
            );
          })
        ) : (
          <div className="no-activity-area">
            <NoActivity />
          </div>
        )
      ) : (
        list &&
        list.map((eventPost: Event, idx: number) => {
          if (idx + 1 === list.length) {
            return (
              <div key={eventPost.eventId} ref={lastItemRef}>
                <EventCard eventToRender={eventPost} />
                <Divider />
              </div>
            );
          } else
            return (
              <div key={eventPost.eventId}>
                <EventCard eventToRender={eventPost} />
                <Divider />
              </div>
            );
        })
      )}
    </div>
  );
};

export default Dashboard;
