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
  const filteredData = await fetch("http://localhost:5000/api/events/today")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getTomorrow = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/events/tomorrow")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getThisWeek = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/events/thisweek")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getThisMonth = async (filterChannelName?: string) => {
  // filter with same month;
  const filteredData = await fetch("http://localhost:5000/api/events/thismonth")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getLater = async (filterChannelName?: string) => {
  const filteredData = await fetch("http://localhost:5000/api/events/later")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

export const getByChannel = async (filterChannelName?: string) => {
  const filteredData = await fetch(
    `http://localhost:5000/api/events/${filterChannelName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

export default [getToday, getTomorrow, getThisWeek, getThisMonth, getLater];
