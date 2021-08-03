export function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
}

export const timeOptions = () => {
  const value = [...Array(48).keys()];
  return value.map((item) => {
    const iter = item + 1;
    const time =
      iter == 48
        ? 12
        : iter > 24
        ? Math.floor(iter / 2) % 12
        : Math.floor(iter / 2);
    const minute = (item % 2) * 30;
    return {
      value: iter,
      text: `${iter > 24 ? "PM" : "AM"} ${time < 10 ? "0" + time : time}:${
        minute ? "00" : "30"
      }`,
    };
  });
};
