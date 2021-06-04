import React from "react";
import { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";

import styles from "./Dashboard.module.scss";
import { Event } from "../../../server/model/event";
import { store } from "../../utils/store/store";
import useFetch from "../../../src//utils/helper/useFetch";
import EventCard from "../EventCard/EventCard";
import Divider from "../Divider/Divider";
import NoActivity from "../NoActivity/NoActivity";
import ResultSummary from "../ResultSummary/ResultSummary";

interface DashBoardProps {
  shouldShowSearchResults: boolean;
  clearUserSearchedResults: React.MouseEventHandler<HTMLDivElement>;
  searchResultsSummaryString: string;
}

const Dashboard: React.FC<DashBoardProps> = (props) => {
  const [offset, setOffset] = useState(0);
  const { loading, list, hasMore } = useFetch(offset);
  const observer = useRef<IntersectionObserver>();
  const searchedResults = store.getState().eventsReducer;

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
    <div className={styles.dashboard}>
      {props.shouldShowSearchResults ? (
        <div>
          <ResultSummary
            searchResultSummaryString={props.searchResultsSummaryString}
            summaryCount={searchedResults && searchedResults.length}
            clearSearchResults={props.clearUserSearchedResults}
          />
        </div>
      ) : null}
      {props.shouldShowSearchResults ? (
        searchedResults && searchedResults.length > 0 ? (
          searchedResults &&
          searchedResults.map((eventPost: Event) => {
            return (
              <div key={eventPost.eventId}>
                <EventCard eventToRender={eventPost} />
                <Divider />
              </div>
            );
          })
        ) : (
          <div className={styles.noActivityArea}>
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

const mapStateToProps = (state: any) => {
  return {
    searchedResults: state.eventsReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);
