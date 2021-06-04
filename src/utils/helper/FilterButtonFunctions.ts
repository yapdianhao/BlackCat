export const getAll = async (): Promise<Response> => {
  const filteredData = await fetch("http://localhost:5000/api/events")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return filteredData;
};

const getToday = async (): Promise<Response> => {
  const filteredData = await fetch("http://localhost:5000/api/eventstoday")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return filteredData;
};

const getTomorrow = async (): Promise<Response> => {
  const filteredData = await fetch("http://localhost:5000/api/eventstomorrow")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return filteredData;
};

const getThisWeek = async (): Promise<Response> => {
  const filteredData = await fetch("http://localhost:5000/api/eventsthisweek")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return filteredData;
};

const getThisMonth = async (): Promise<Response> => {
  // filter with same month;
  const filteredData = await fetch("http://localhost:5000/api/eventsthismonth")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return filteredData;
};

export const getByChannel = async (
  filterChannelName?: string
): Promise<Response> => {
  const filteredData = await fetch(
    `http://localhost:5000/api/filterchannel/${filterChannelName}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return filteredData;
};

export default [getToday, getTomorrow, getThisWeek, getThisMonth];
