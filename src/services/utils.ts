export interface TimeType {
  value?: string;
  text?: string;
  korean?: string;
}

export function formatDate(date: Date): string {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
}

export const timeOptions = (): any[] => {
  const value = [...Array(48).keys()];
  return value.map((item) => {
    const iter = item;
    const time = iter % 12 <= 1 ? 12 : Math.floor(iter / 2) % 12;
    const minute = iter % 2 == 0 ? "00" : "30";
    return {
      value: iter,
      text: `${iter > 23 ? "PM" : "AM"} ${
        time < 10 ? "0" + time : time
      }:${minute}`,
      korean: `${iter > 23 ? "오후" : "오전"} ${
        time < 10 ? "0" + time : time
      }:${minute}`,
    };
  });
};

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
