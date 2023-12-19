export default function FormatDate(date: number) {
  const milliSeconds = new Date(date);
  const year = milliSeconds.getFullYear();
  const month = milliSeconds.getMonth() + 1;
  const day = milliSeconds.getDate();
  const hours = milliSeconds.getHours();
  const minutes = milliSeconds.getMinutes();
  const seconds = milliSeconds.getSeconds();
  const string = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return string;
}
