import { useState, useEffect, useCallback } from "react";
import { Event } from "../../../server/model/event";

const useFetch = (
  offset: number
): { loading: boolean; list: Event[]; hasMore: boolean } => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Event[]>();
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      const res: Event[] = await fetch(
        `http://localhost:5000/api/events/${offset}/10`
      )
        .then((response) => response.json())
        .then((data) => {
          setList((list) => {
            if (list === undefined) {
              return data;
            } else {
              return [...list, ...data];
            }
          });
          return data;
        });
      setHasMore(res.length > 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [offset]);

  useEffect(() => {
    sendQuery();
  }, [offset]);

  return { loading, list, hasMore };
};

export default useFetch;
