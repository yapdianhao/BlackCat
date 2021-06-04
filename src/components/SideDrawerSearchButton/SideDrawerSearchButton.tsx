import React from "react";
import { useDispatch } from "react-redux";

import styles from "./SideDrawerSearchButton.module.scss";
import { Event } from "../../../server/model/event";
import SearchIcon from "../SearchIcon/SearchIcon";

interface SideDrawerSearchButtonProps {
  handleSearchClick: React.MouseEventHandler<HTMLDivElement>;
  shouldShowSearchResults: boolean;
  shouldHandleSearchRange: boolean;
  searchResultsSummaryString: string;
  handleSearchRange: any;
}

const SideDrawerSearchButton: React.FC<SideDrawerSearchButtonProps> = (
  props
) => {
  const dispatch = useDispatch();

  const eventArr: Event[] = [];

  const handleClickSearch = async (e: any) => {
    props.handleSearchClick(e);
    if (props.shouldHandleSearchRange) {
      const filteredData = await props.handleSearchRange();
      for (const eventObj of filteredData) {
        eventArr.push(eventObj);
      }

      dispatch({
        type: "SET_EVENT",
        payload: eventArr,
      });
    }
  };

  return (
    <div
      onClick={
        props.searchResultsSummaryString.length === 0 ? null : handleClickSearch
      }
      className={
        props.searchResultsSummaryString.length === 0
          ? `${styles.searchButtonSidedrawerInactive}`
          : `${styles.searchButtonSidedrawer}`
      }
    >
      <div className={styles.searchButtonSidedrawerContents}>
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className={styles.searchButtonSidedrawerTitle}>
        {props.searchResultsSummaryString}
      </div>
    </div>
  );
};

export default SideDrawerSearchButton;
