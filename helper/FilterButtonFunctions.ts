export const getAll = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/events")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getToday = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/eventstoday")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getTomorrow = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/eventstomorrow")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getThisWeek = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/eventsthisweek")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getThisMonth = async (filterChannelName?: string) => {
  // filter with same month;
  const filteredData = await fetch("http://localhost:5000/api/eventsthismonth")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

export const getByChannel = async (filterChannelName?: string) => {
  const filteredData = await fetch(
    `http://localhost:5000/api/filterchannel/${filterChannelName}`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

export default [getToday, getTomorrow, getThisWeek, getThisMonth];
