import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Event } from "../server/model/event";
import { store } from "../store/store";

const useFetch = (offset: number) => {
  //const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<Event[]>();
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    console.log("here");
    try {
      setLoading(true);
      setError(false);
      const res: Event[] = await fetch(
        `http://localhost:5000/api/events/${offset}/10`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setList((list) => {
            if (list === undefined) {
              // dispatch({
              //   type: "SET_EVENT",
              //   payload: data,
              // });
              return data;
            } else {
              // dispatch({
              //   type: "SET_EVENT",
              //   payload: [...list, ...data],
              // });
              return [...list, ...data];
            }
          });
          console.log(store.getState());
          return data;
        });
      // setList((list) => Array.from(new Set([...list, ...res])));
      setHasMore(res.length > 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [offset]);

  useEffect(() => {
    sendQuery();
  }, [offset]);

  return { loading, error, list, hasMore };
};

export default useFetch;
